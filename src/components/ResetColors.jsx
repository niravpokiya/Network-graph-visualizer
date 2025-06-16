export default function Reset(prevNodes, prevLinks) {
  const resetNodes = prevNodes.map(node => {
    node.color = '#4f46e5';
    return node;
  });

  const resetLinks = prevLinks.map((link) => {
    link.inMST = false;
    link.arrow = false;                 // Reset arrow if used in Euler path
    link.setDirection = undefined;     // Remove forced direction rendering
    link.color = '#999';               // Optional: reset to default edge color
    return link;
  });

  return [resetNodes, resetLinks];
}
