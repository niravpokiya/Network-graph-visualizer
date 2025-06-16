import Reset from "../components/ResetColors";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function EulerPath(
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
  const inDeg = {},
    outDeg = {},
    degree = {};

  // Track visited edges to avoid duplicates
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

  let startNode = nodes[0].id;

  if (isDirected) {
    let start = null,
      end = null;
    for (const node of nodes) {
      const id = node.id;
      const inD = inDeg[id] || 0;
      const outD = outDeg[id] || 0;

      if (outD - inD === 1) {
        if (start !== null) return alert("❌ No Eulerian Path");
        start = id;
      } else if (inD - outD === 1) {
        if (end !== null) return alert("❌ No Eulerian Path");
        end = id;
      } else if (inD !== outD) {
        return alert("❌ No Eulerian Path");
      }
    }
    if (start !== null) startNode = start;
  } else {
    const odd = Object.entries(degree).filter(([_, d]) => d % 2 === 1);
    if (odd.length === 2) {
      startNode = odd[0][0];
    } else if (odd.length !== 0) {
      return alert("❌ No Eulerian Path");
    }
  }

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
  let ResultPath = [path[0]]
  // ✅ VISUALIZATION with correct arrow tracking
  // console.log(path);
  
  for (let i = 0; i < path.length - 1; i++) {
    const u = path[i];
    const v = path[i + 1];
    ResultPath.push(path[i + 1])
    setResult("Euler Path : " + ResultPath.join(" -> "))
    // 🔁 Force the traversal direction u → v
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
        // 🔁 Regardless of edge storage, force arrow u → v
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
