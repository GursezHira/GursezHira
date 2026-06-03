import json
import networkx as nx
from networkx.readwrite import json_graph
from pathlib import Path

data = json.loads(Path('graphify-out/graph.json').read_text())
G = json_graph.node_link_graph(data, edges='links')

labels = {}
for nid, ndata in G.nodes(data=True):
    labels[nid] = ndata.get('label', nid)

# Find all community IDs from community attr on nodes
comm_nodes = {}
for nid, ndata in G.nodes(data=True):
    cid = ndata.get('community')
    if cid is not None:
        comm_nodes.setdefault(cid, []).append(nid)

print(f'Total communities in graph: {len(comm_nodes)}')
for cid, members in sorted(comm_nodes.items(), key=lambda x: len(x[1]), reverse=True):
    labels_list = [G.nodes[m].get('label', m) for m in members]
    print(f'  Community {cid} ({len(members)} nodes): {", ".join(labels_list[:5])}')

# Check connected components
components = list(nx.connected_components(G))
print(f'\nConnected components: {len(components)}')
for i, comp in enumerate(components):
    comp_labels = [G.nodes[n].get('label', n) for n in comp]
    print(f'  Component {i}: {len(comp)} nodes - {", ".join(comp_labels[:8])}')

# Cross-community edges (community attr from graph)
print('\nCross-community edges:')
seen = set()
for u, v in G.edges():
    cu = G.nodes[u].get('community')
    cv = G.nodes[v].get('community')
    if cu is not None and cv is not None and cu != cv:
        key = tuple(sorted([cu, cv]))
        if key not in seen:
            seen.add(key)
            _raw = G[u][v]
            edge = next(iter(_raw.values()), {}) if isinstance(G, nx.MultiGraph) else _raw
            lu = G.nodes[u].get('label', u)
            lv = G.nodes[v].get('label', v)
            rel = edge.get('relation', '')
            conf = edge.get('confidence', '')
            print(f'  C{cu}: {lu} --{rel}--> C{cv}: {lv} [{conf}]')

# Summary
print(f'\nGraph: {G.number_of_nodes()} nodes, {G.number_of_edges()} edges')
