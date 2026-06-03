import json
from pathlib import Path

data = json.loads(Path('graphify-out/graph.json').read_text())
print('Links (edges) in final graph:')
for link in data.get('links', []):
    idx = link['source']
    source = data['nodes'][idx]['label'] if isinstance(idx, int) else idx
    idx = link['target']
    target = data['nodes'][idx]['label'] if isinstance(idx, int) else idx
    rel = link.get('relation', '')
    print(f'  {source} --{rel}--> {target}')
total = len(data.get('links', []))
print(f'\nTotal: {total} edges')
