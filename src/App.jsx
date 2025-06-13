import { useEffect, useState } from 'react';
import './App.css';
import GraphVisualizer from './components/GraphVisualizer';
import Input from './components/Input';
import parseGraphInput from './Hooks/DataFetch';
import Dfs from './Algorithms/Dfs';
import Bfs from './Algorithms/Bfs';

function App() {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [adjList, setAdjList] = useState({});
  const [isDirected, setIsDirected] = useState(false)
  const [inputText, setInputText] = useState("");
  const [cycleDetected, setCycleDetected] = useState(false)


  
  useEffect(() => {
    const { nodes, links, adjList } = parseGraphInput(inputText, isDirected);
    setNodes(nodes);
    setLinks(links);
    setAdjList(adjList);
  }, [inputText, isDirected]);

  const handleInputChange = (e) => {
    setInputText(e.target.value); // <-- just set text
  };
 
  return (
    <>
      <div className="container">
        <Input
        onInputChange={handleInputChange}
        nodes={nodes}
        setNodes={setNodes}
        setIsDirected={setIsDirected}
        isDirected={isDirected}
        adjList={adjList}
        />
        <div className="graphSection">
          <GraphVisualizer nodesData={nodes} linksData={links} isDirected={isDirected} />
        </div>
      </div>
    </>
  );
}

export default App;
