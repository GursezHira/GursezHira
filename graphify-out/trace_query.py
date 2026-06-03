import json, sys
import networkx as nx
from networkx.readwrite import json_graph
from pathlib import Path

data = json.loads(Path('graphify-out/graph.json').read_text())
G = json_graph.node_link_graph(data, edges='links')

def find_node(term):
    term = term.lower()
    scored = sorted(
        [(sum(1 for w in term.split() if w in G.nodes[n].get('label','').lower()), n)
         for n in G.nodes()],
        reverse=True
    )
    return scored[0][1] if scored and scored[0][0] > 0 else None

# Path between Gursez and deploy pipeline
src = find_node('gursez')
tgt = find_node('deploy')
src_label = G.nodes[src].get('label', src) if src else None
tgt_label = G.nodes[tgt].get('label', tgt) if tgt else None
print(f'Source: {src} -> {src_label}')
print(f'Target: {tgt} -> {tgt_label}')

if src and tgt:
    try:
        path = nx.shortest_path(G, src, tgt)
        print(f'Shortest path ({len(path)-1} hops):')
        for i, nid in enumerate(path):
            label = G.nodes[nid].get('label', nid)
            if i < len(path) - 1:
                _raw = G[nid][path[i+1]]
                edge = next(iter(_raw.values()), {}) if isinstance(G, nx.MultiGraph) else _raw
                rel = edge.get('relation', '')
                conf = edge.get('confidence', '')
                print(f'  {label} --{rel}--> [{conf}]')
            else:
                print(f'  {label}')
    except nx.NetworkXNoPath:
        print('No path found')
    except Exception as e:
        print(f'Error: {e}')

# BFS from family tree nodes
family_terms = ['tree_layout', 'family_grid', 'family_branch', 'family_tree_data', 'tree_controls', 'tree_nodes']
for term in family_terms:
    nid = find_node(term)
    if nid:
        neighbors = list(G.neighbors(nid))
        label = G.nodes[nid].get('label', nid)
        print(f'\n{term} -> {label} (degree {G.degree(nid)})')
        for nb in neighbors:
            _raw = G[nid][nb]
            edge = next(iter(_raw.values()), {}) if isinstance(G, nx.MultiGraph) else _raw
            nb_label = G.nodes[nb].get('label', nb)
            rel = edge.get('relation', '')
            conf = edge.get('confidence', '')
            print(f'  --{rel}--> {nb_label} [{conf}]')

# Cross-community edges
print('\nCross-community connections:')
analysis_raw = Path('graphify-out/.graphify_analysis.json').read_text()
analysis = json.loads(analysis_raw)
communities = {int(k): set(v) for k, v in analysis['communities'].items()}
labels_raw = Path('graphify-out/.graphify_labels.json').read_text()
labels_data = json.loads(labels_raw)
comm_labels = {int(k): v for k, v in labels_data.items()}

for u, v in G.edges():
    cu = next((c for c, members in communities.items() if u in members), None)
    cv = next((c for c, members in communities.items() if v in members), None)
    if cu is not None and cv is not None and cu != cv:
        _raw = G[u][v]
        edge = next(iter(_raw.values()), {}) if isinstance(G, nx.MultiGraph) else _raw
        lu = G.nodes[u].get('label', u)
        lv = G.nodes[v].get('label', v)
        rel = edge.get('relation', '')
        conf = edge.get('confidence', '')
        cu_label = comm_labels.get(cu, f'C{cu}')
        cv_label = comm_labels.get(cv, f'C{cv}')
        print(f'  {cu_label} -> {cv_label}: {lu} --{rel}--> {lv} [{conf}]')
