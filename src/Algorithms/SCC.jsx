import Reset from "../components/ResetColors";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 25 distinct colors (you can change these as needed)
const SCC_COLORS = [
  "#e6194b", "#3cb44b", "#ffe119", "#4363d8", "#f58231",
  "#911eb4", "#46f0f0", "#f032e6", "#bcf60c", "#fabebe",
  "#008080", "#e6beff", "#9a6324", "#fffac8", "#800000",
  "#aaffc3", "#808000", "#ffd8b1", "#000075", "#808080",
  "#dcbeff", "#a9a9a9", "#ffb6c1", "#b0e0e6", "#20b2aa"
];

async function findSCC(prevNodes, onNodesChange, adjList) {
  const reset = Reset(prevNodes); // Reset colors
  onNodesChange(reset);
  prevNodes = reset

  const visited = new Set();
  const stack = [];

  // ---------- Step 1: DFS to fill stack ----------
  async function dfs1(nodeId) {
    visited.add(nodeId);
    for (const neighbor of adjList[nodeId] || []) {
      if (!visited.has(neighbor)) {
        await dfs1(neighbor);
      }
    }
    stack.push(nodeId);
  }

  for (const node of prevNodes) {
    if (!visited.has(node.id)) {
      await dfs1(node.id);
    }
  }

  // ---------- Step 2: Transpose the graph ----------
  const transpose = {};
  for (const key in adjList) {
    for (const neighbor of adjList[key]) {
      if (!transpose[neighbor]) transpose[neighbor] = [];
      transpose[neighbor].push(key);
    }
  }

  // ---------- Step 3: DFS on transposed graph ----------
  visited.clear();
  let colorIndex = 0;

  async function dfs2(nodeId, color) {
    visited.add(nodeId);
    const updated = prevNodes.map(n => {
      if (n.id === nodeId) n.color = color;
      return n;
    });
    onNodesChange(updated);
    await sleep(500);

    for (const neighbor of transpose[nodeId] || []) {
      if (!visited.has(neighbor)) {
        await dfs2(neighbor, color);
      }
    }
  }

  while (stack.length > 0) {
    const nodeId = stack.pop();
    if (!visited.has(nodeId)) {
      const color = SCC_COLORS[colorIndex % SCC_COLORS.length];
      colorIndex++;
      await dfs2(nodeId, color);
    }
  }
}

export default findSCC;
