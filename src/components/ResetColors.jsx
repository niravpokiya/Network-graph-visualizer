export default function Reset(nodes, setNodes) {
  const resetNodes = nodes.map(node => ({
    id: node.id,            // MUST preserve same id type (usually string)
    color: '#4f46e5',       // Reset to original
  }));
  setNodes(resetNodes);
}
