export default function Dijkstra(nodes, links, source, isWeighted, isDirected, setResult) {
  const hasNegativeWeight = links.some(link => {
    const weight = isWeighted ? link.weight : 1;
    return weight < 0;
  });

  if (hasNegativeWeight) {
    setResult("⚠️ Error: Negative weight detected. Dijkstra cannot handle negative weights or negative cycles.");
    return;
  }
  if (!isWeighted) {
  setResult(
    "⚠️ Graph is unweighted. Dijkstra will treat all edges with weight = 1.\n" +
    "Consider using BFS for optimal performance on unweighted graphs.\n"
  );
  return;
}

  const adj = {};
  const dist = {};
  const prev = {};
  const visited = new Set();

  nodes.forEach((node) => {
    adj[node.id] = [];
    dist[node.id] = Infinity;
    prev[node.id] = null;
  });

  links.forEach((link) => {
    const u = link.source.id || link.source;
    const v = link.target.id || link.target;
    const w = isWeighted ? link.weight : 1;

    adj[u].push([v, w]);
    if (!isDirected) adj[v].push([u, w]);
  });

  dist[source] = 0;

  const queue = [{ node: source, dist: 0 }];

  while (queue.length > 0) {
    queue.sort((a, b) => a.dist - b.dist);
    const { node: u } = queue.shift();

    if (visited.has(u)) continue;
    visited.add(u);

    for (const [v, weight] of adj[u]) {
      const newDist = dist[u] + weight;
      if (newDist < dist[v]) {
        dist[v] = newDist;
        prev[v] = u;
        queue.push({ node: v, dist: newDist });
      }
    }
  }

  const result = nodes.map(({ id }) => {
    const label = id.padEnd(8, ' ');
    if (dist[id] === Infinity) return `${label}: unreachable`;

    const path = [];
    let cur = id;
    while (cur !== null) {
      path.push(cur);
      cur = prev[cur];
    }
    path.reverse();

    const pathStr = path.join(' → ');
    const costStr = `(cost: ${dist[id]})`;
    return `${label}: ${pathStr.padEnd(30, ' ')} ${costStr}`;
  }).join('\n');

  setResult(result);
}
