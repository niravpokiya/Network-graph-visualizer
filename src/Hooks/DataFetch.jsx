import buildAdjList from "../components/BuildAdjList";

function parseGraphInput(input, isDirected, isWeighted) {
  const lines = input
    .trim()
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);

  const links = lines.map(line => {
    const parts = line.split(/\s+/);
    const source = parts[0];
    const target = parts[1];
    const weight = isWeighted ? parseFloat(parts[2]) : undefined;

    return isWeighted
      ? { source, target, weight }
      : { source, target };
  });

  const nodeIds = new Set();
  links.forEach(({ source, target }) => {
    nodeIds.add(source);
    nodeIds.add(target);
  });

  const nodes = Array.from(nodeIds).map(id => ({ id, color: '#4f46e5' }));

  // Build adjacency list with optional weight
  const edgeTuples = links.map(({ source, target, weight }) =>
    isWeighted ? [source, target, weight] : [source, target]
  );

  const adjList = buildAdjList(edgeTuples, isDirected, isWeighted);

  return { nodes, links, adjList };
}

export default parseGraphInput;