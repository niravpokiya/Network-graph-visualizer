import Reset from "../components/ResetColors";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function EulerCircuit(
  nodes,
  links,
  setNodes,
  setLinks,
  delay,
  speedrun,
  isDirected,
  setResult
) {
  const [resetNodes, resetLinks] = Reset(nodes, links);
  setNodes(resetNodes);
  setLinks(resetLinks);
  nodes = resetNodes;
  links = resetLinks;

  const nodeById = {};
  nodes.forEach((n) => (nodeById[n.id] = n));

  const adj = {};
  const edgeMap = {};
  const inDeg = {}, outDeg = {}, degree = {};
  const visitedEdges = new Set();

  for (const link of links) {
    const u = link.source.id || link.source;
    const v = link.target.id || link.target;

    if (!adj[u]) adj[u] = [];
    adj[u].push(v);

    const key = `${u}-${v}`;
    if (!edgeMap[key]) edgeMap[key] = [];
    edgeMap[key].push(link);

    if (!isDirected) {
      if (!adj[v]) adj[v] = [];
      adj[v].push(u);

      const revKey = `${v}-${u}`;
      if (!edgeMap[revKey]) edgeMap[revKey] = [];
      edgeMap[revKey].push(link);

      degree[u] = (degree[u] || 0) + 1;
      degree[v] = (degree[v] || 0) + 1;
    } else {
      outDeg[u] = (outDeg[u] || 0) + 1;
      inDeg[v] = (inDeg[v] || 0) + 1;
    }
  }

  // ✅ Eulerian Circuit check
  if (isDirected) {
    for (const node of nodes) {
      const id = node.id;
      if ((inDeg[id] || 0) !== (outDeg[id] || 0)) {
        return alert("❌ No Eulerian Circuit");
      }
    }
  } else {
    for (const d of Object.values(degree)) {
      if (d % 2 !== 0) {
        return alert("❌ No Eulerian Circuit");
      }
    }
  }

  const startNode = nodes[0].id;
  const path = [];
  const stack = [startNode];
  const adjCopy = {};
  for (let u in adj) adjCopy[u] = [...adj[u]];

  while (stack.length > 0) {
    const u = stack[stack.length - 1];
    const neighbors = adjCopy[u];

    if (neighbors && neighbors.length > 0) {
      const v = neighbors.pop();
      if (!isDirected) {
        adjCopy[v] = adjCopy[v]?.filter((nbr) => nbr !== u);
      }
      stack.push(v);
    } else {
      path.push(stack.pop());
    }
  }

  path.reverse();
  let resultpath = []
  // 🔁 VISUALIZATION
  resultpath.push(path[0])
  for (let i = 0; i < path.length - 1; i++) {
    const u = path[i];
    const v = path[i + 1];
    resultpath.push(path[i + 1])
    setResult("Euler Circuit path: " + resultpath.join(" -> "))
    let link = null;
    if (edgeMap[`${u}-${v}`]) {
      link = edgeMap[`${u}-${v}`].find((l) => !visitedEdges.has(l));
    }
    if (!link && edgeMap[`${v}-${u}`]) {
      link = edgeMap[`${v}-${u}`].find((l) => !visitedEdges.has(l));
    }

    if (!link) continue;
    visitedEdges.add(link);

    setLinks((prevLinks) =>
      prevLinks.map((l) => {
        const src = l.source.id || l.source;
        const tgt = l.target.id || l.target;
        if (
          ((src === u && tgt === v) ||
            (!isDirected &&
              ((src === v && tgt === u) || (src === u && tgt === v)))) &&
          !l.arrow
        ) {
          l.arrow = true;
          l.setDirection = {
            source: nodeById[u],
            target: nodeById[v],
          };
        }
        return l;
      })
    );

    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === u || n.id === v) {
          n.color = "#15803d";
        }
        return n;
      })
    );

    if (speedrun.current === "fast") delay = 100;
    else if (speedrun.current === "skip") delay = 0;
    await sleep(delay);
  }
}
