import { useEffect, useState } from 'react';
import './App.css';
import GraphVisualizer from './components/GraphVisualizer';
import Input from './components/Input';
import parseGraphInput from './Hooks/DataFetch';
import Dfs from './Algorithms/Dfs';
import Bfs from './Algorithms/Bfs';
import { link } from 'd3';
import DarkModeToggle from './components/DarkMode';
import { Result } from 'postcss';

function App() {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [adjList, setAdjList] = useState({});
  const [isDirected, setIsDirected] = useState(false);
  const [inputText, setInputText] = useState("");
  const [cycleDetected, setCycleDetected] = useState(false);
  const [weighted, setWeighted] = useState(false);
  const [result, setResult] = useState("")

  useEffect(() => {
    const { nodes, links, adjList } = parseGraphInput(inputText, isDirected, weighted);
    setNodes(nodes);
    setLinks(links);
    setAdjList(adjList);
  }, [inputText, isDirected, weighted]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto p-4 bg-gray-300 dark:bg-gray-900 rounded-xl shadow-md">
        <Input
          onInputChange={handleInputChange}
          nodes={nodes}
          setNodes={setNodes}
          setIsDirected={setIsDirected}
          isDirected={isDirected}
          adjList={adjList}
          isWeighted={weighted}
          setIsWeighted={setWeighted}
          links={links}
          setLinksData={setLinks}
          result = {result}
          setResult = {setResult}
        />
        <div className="graphSection bg-gray-400 dark:bg-gray-900 rounded-xl shadow-md h-max ">
          <GraphVisualizer
            nodesData={nodes}
            linksData={links}
            isDirected={isDirected}
            isWeighted={weighted}
          />
         <div className="mt-4 text-white text-lg font-mono">
            {result}
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
