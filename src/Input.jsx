import React from "react";

function Input({ onInputChange }) {
  return (
  <div className="inputSection">
      <h1>Network Graph Visualizer</h1>
      <h3>Input format:</h3>
      <ul>
        <li>First line: number of nodes</li>
        <li>Next lines: edges between nodes (one per line)</li>
      </ul>
      <div className="inputArea">
        <textarea
          name="input"
          id="input"
          onChange={(e) => onInputChange(e)}
        ></textarea>
      </div>
    </div>
  );
}
export default Input;
