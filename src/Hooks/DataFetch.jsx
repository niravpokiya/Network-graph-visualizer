import buildAdjList from "../components/BuildAdjList";

function parseGraphInput(input, isDirected) {
  const lines = input
    .trim()
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);

  const links = lines.map(line => {
    const [source, target] = line.split(/\s+/);
    return { source, target };
  });

  const nodeIds = new Set();
  links.forEach(({ source, target }) => {
    nodeIds.add(source);
    nodeIds.add(target);
  });

  const nodes = Array.from(nodeIds).map(id => ({ id, color: '#4f46e5' }));
  const adjList = buildAdjList(links.map(({ source, target }) => [source, target]), isDirected);
  
  return { nodes, links, adjList };
}

export default parseGraphInput;
