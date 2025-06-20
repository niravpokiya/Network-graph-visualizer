import dijkstra from "../Algorithms/Dijkstra";

const handleDijkstra = (
  source,
  nodes,
  links,
  isWeighted,
  isDirected,
  setResult,
  setResultReady
) => {
  dijkstra(nodes, links, source, isWeighted, isDirected, setResult);

  setResultReady(true);

  setTimeout(() => {
    setResultReady(false);
  }, 7000);
};

export default handleDijkstra;
