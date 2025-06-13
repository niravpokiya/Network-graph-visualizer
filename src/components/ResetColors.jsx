export default function Reset(prevNodes) {
  const resetNodes = prevNodes.map(node => {
    node.color = '#4f46e5';
    return node;
  });
  return resetNodes
}