import { useState } from 'react';
import './App.css';
import GraphVisualizer from './GraphVisualizer';
import Input from './Input';
import parseGraphInput from './Hooks/DataFetch';
import Dfs from './components/Dfs';
import Bfs from './components/Bfs';

function App() {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [adjList, setAdjList] = useState({});

  const handleInputChange = (e) => {
    const input = e.target.value;
    const { nodes, links, adjList } = parseGraphInput(input); // ⬅ Fix key name to match
    setNodes(nodes);
    setLinks(links);
    setAdjList(adjList);
  };

  const handleDFS = async () => {
    if (nodes.length === 0) return;
    const src = nodes[0].id;
    await Dfs(src, nodes, setNodes, adjList);
  };

  const handleBFS = async () => {
    if (nodes.length === 0) return;
    const src = nodes[0].id;
    await Bfs(src, nodes, setNodes, adjList);
  };

  return (
    <>
      <div className="container">
        <Input
        onInputChange={handleInputChange}
        nodes={nodes}
        setNodes={setNodes}
        adjList={adjList}
        />
        <div className="graphSection">
          <GraphVisualizer nodesData={nodes} linksData={links} />
        </div>
      </div>
    </>
  );
}

export default App;
