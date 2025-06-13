import React, { useState } from "react";
import handleDFS from './handleDfs';
import handleBFS from "./handleBfs";

function Input({ onInputChange, nodes, setNodes, adjList }) {
  const [source, setSource] = useState('');

  return (
    <div className="inputSection">
      <h1>Network Graph Visualizer</h1>
      <h3>Input format:</h3>
      <ul>
        <li>Edges between nodes (one per line), e.g., `1 2`</li>
      </ul>

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
      </div>
    </div>
  );
}

export default Input;
