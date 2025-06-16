export default function Reset(prevNodes, prevLinks) {
  const resetNodes = prevNodes.map(node => {
    node.color = '#4f46e5';
    return node;
  });

  const resetLinks = prevLinks.map((link) => {
    link.inMST = false
    return link;
  })

  return [resetNodes, resetLinks]
}
