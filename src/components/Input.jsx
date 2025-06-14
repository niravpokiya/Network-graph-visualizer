import React, { useState } from "react";
import handleDFS from '../Handlers/handleDfs';
import handleBFS from "../Handlers/handleBfs";
import handleCycleDetection from "../Handlers/handleCycleDetection";
import handleSCC from "../Handlers/handleSCC";
import handlePrims from "../Handlers/handlePrims"
function Input({ onInputChange, nodes, setNodes, adjList, isDirected, setIsDirected, cycleDetected, setCycleDetected, isWeighted, setIsWeighted, links, setLinksData }) {
  const [source, setSource] = useState('');

  return (
    <div className="inputSection">
      <h1 className="font-bold">Network Graph Visualizer</h1>
      <h3 className="font-bold">Input format:</h3>
      <ul className="list-disc pl-5 text-black">
        <li>Edges between nodes (one per line), e.g., `1 2`</li>
        <li>Select which type of graph you are inputting ? </li>
        <li>For finding SCCs, graph should be directed. </li>
        <li>For visualizing DFS, BFS, source should be given. </li>
        <li>For visualizing Prims, there should weighted graph.</li>
      </ul>

            {/* 🔘 Radio Buttons for graph type */}
      <div className="flex items-center gap-6 my-4">
      <label className="flex items-center space-x-2 text-black font-medium">
        <input
          type="radio"
          name="graphType"
          value="undirected"
          checked={!isDirected}
          onChange={() => {setIsDirected(false) }}
          className="form-radio text-blue-600 w-4 h-4"
        />
        <span>Undirected</span>
      </label>

      <label className="flex items-center space-x-2 text-black font-medium">
        <input
          type="radio"
          name="graphType"
          value="directed"
          checked={isDirected}
          onChange={() => setIsDirected(true)}
          className="form-radio text-blue-600 w-4 h-4"
        />
        <span>Directed</span>
      </label>
    </div>
     
     {/* Radio buttons for weighted */}

      <div className="flex items-center gap-6 my-4">
      <label className="flex items-center space-x-2 text-black font-medium">
        <input
          type="radio"
          name="weighted"
          value="unweighted"
          checked={!isWeighted}
          onChange={() => {setIsWeighted(false) }}
          className="form-radio text-blue-600 w-4 h-4"
        />
        <span>Unweighted</span>
      </label>

      <label className="flex items-center space-x-2 text-black font-medium">
        <input
          type="radio"
          name="weighted"
          value="weighted"
          checked={isWeighted}
          onChange={() => setIsWeighted(true)}
          className="form-radio text-blue-600 w-4 h-4"
        />
        <span>Weighted</span>
      </label>
    </div>
    
    

      <div className="inputArea">
        <textarea
          name="input"
          id="input"
          placeholder="eg.
1 2
3 4"
          onChange={(e) => onInputChange(e)}
        ></textarea>
      </div>

      <div className="sourceInput">
        <label htmlFor="sourceNode">Start Node: </label>
        <input
          id="sourceNode"
          type="text"
          placeholder="e.g. 1"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
      </div>

      <div className="algorithm-visualization">
        <button
          onClick={() => handleDFS(source, nodes, setNodes, adjList)}
          disabled={!source}
        >
          DFS
        </button>
        <button
          onClick={() => handleBFS(source, nodes, setNodes, adjList)}
          disabled={!source}
        >
          BFS
        </button>
        <button
          onClick={() => handleSCC(nodes, setNodes, adjList)}
          disabled={!isDirected}
        >
          Strongly Connected Components
          {/* <p className="text-red-500" hidden={isDirected}> Graph should be directed. </p> */}
        </button>
        <button
          onClick={() => handleCycleDetection(1, nodes, setNodes, adjList, isDirected, setCycleDetected)}
        >
          Cycle Detection
        </button>
        <button
          onClick={() => handlePrims(1, nodes, setNodes, adjList, links, setLinksData  )}
          disabled={!isWeighted}
        >
          Prims MST
        </button>
      </div>
    </div>
  );
}

export default Input;
