import React, { useRef, useState } from "react";
import handleDFS from "../Handlers/handleDfs";
import handleBFS from "../Handlers/handleBfs";
import handleCycleDetection from "../Handlers/handleCycleDetection";
import handleSCC from "../Handlers/handleSCC";
import handlePrims from "../Handlers/handlePrims";
import DarkModeToggle from "./DarkMode";

function Input({
  onInputChange,
  nodes,
  setNodes,
  adjList,
  isDirected,
  setIsDirected,
  cycleDetected,
  setCycleDetected,
  isWeighted,
  setIsWeighted,
  links,
  setLinksData,
}) {
  const [source, setSource] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const speedrunRef = useRef(false);

  const runWithLock = async (fn) => {
    if (isRunning) return;
    setIsRunning(true);
    try {
      await fn();
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="inputSection bg-white dark:bg-gray-800 text-black dark:text-gray-100 p-4 rounded-xl shadow-lg">
      <div className="head flex items-center justify-between mb-4">
        <h1 className="font-bold text-2xl text-blue-700 dark:text-blue-600">Network Graph Visualizer</h1>
        <DarkModeToggle />
      </div>

      <details className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-xl shadow-md p-4 border border-gray-200 mb-4 text-black dark:text-white">
        <summary className="cursor-pointer text-lg font-semibold text-blue-700 dark:text-blue-400 hover:underline">
          📘 How to use
        </summary>
        <div className="mt-3">
          <h3 className="font-bold mb-2 text-gray-900 dark:text-white">
            Input format:
          </h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-800 dark:text-white">
            <li>
              Edges between nodes (one per line), e.g.,{" "}
              <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded text-sm text-black dark:text-white">
                1 2
              </code>
            </li>
            <li>Select which type of graph you are inputting</li>
            <li>For finding SCCs, graph should be directed</li>
            <li>For visualizing DFS, BFS, source should be given</li>
            <li>For visualizing Prims, the graph should be weighted</li>
          </ul>
        </div>
      </details>

      <span className="text-gray-800 dark:text-gray-300">
        You cannot interact with UI while algorithm is running. You can use
        speed run button.
      </span>

      {/* Graph Type */}
      <div className="flex items-center gap-6 my-4">
        <label className="flex items-center space-x-2 font-medium">
          <input
            type="radio"
            name="graphType"
            value="undirected"
            checked={!isDirected}
            disabled={isRunning}
            onChange={() => setIsDirected(false)}
            className="form-radio text-blue-600 dark:bg-gray-600 dark:border-gray-500 w-4 h-4"
          />
          <span>Undirected</span>
        </label>

        <label className="flex items-center space-x-2 font-medium">
          <input
            type="radio"
            name="graphType"
            value="directed"
            checked={isDirected}
            disabled={isRunning}
            onChange={() => setIsDirected(true)}
            className="form-radio text-blue-600 dark:bg-gray-600 dark:border-gray-500 w-4 h-4"
          />
          <span>Directed</span>
        </label>
      </div>

      {/* Weighted/Unweighted */}
      <div className="flex items-center gap-6 my-4">
        <label className="flex items-center space-x-2 font-medium">
          <input
            type="radio"
            name="weighted"
            value="unweighted"
            checked={!isWeighted}
            disabled={isRunning}
            onChange={() => setIsWeighted(false)}
            className="form-radio text-blue-600 dark:bg-gray-600 dark:border-gray-500 w-4 h-4"
          />
          <span>Unweighted</span>
        </label>

        <label className="flex items-center space-x-2 font-medium">
          <input
            type="radio"
            name="weighted"
            value="weighted"
            checked={isWeighted}
            disabled={isRunning}
            onChange={() => setIsWeighted(true)}
            className="form-radio text-blue-600 dark:bg-gray-600 dark:border-gray-500 w-4 h-4"
          />
          <span>Weighted</span>
        </label>
      </div>

      {/* Input Textarea */}
      <div className="inputArea my-4">
        <label
          htmlFor="input"
          className="block font-medium mb-2 text-gray-800 dark:text-gray-200"
        >
          ✏️ Enter edges:
        </label>
        <textarea
          name="input"
          id="input"
          placeholder={`eg.\n1 2\n3 4`}
          onChange={(e) => onInputChange(e)}
          className="w-full min-h-[120px] p-4 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        ></textarea>
      </div>

      {/* Source Input */}
      <div className="sourceInput mt-4">
        <label htmlFor="sourceNode" className="mr-2">
          Start Node:
        </label>
        <input
          id="sourceNode"
          type="text"
          placeholder="e.g. 1"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Algorithm Buttons */}
      <div className="algorithm-visualization flex flex-wrap gap-3 mt-4">
        {[
          {
            label: "DFS",
            onClick: () =>
              runWithLock(() =>
                handleDFS(source, nodes, setNodes, adjList, speedrunRef)
              ),
            disabled: !source || isRunning,
          },
          {
            label: "BFS",
            onClick: () =>
              runWithLock(() =>
                handleBFS(source, nodes, setNodes, adjList, speedrunRef)
              ),
            disabled: !source || isRunning,
          },
          {
            label: "Strongly Connected Components",
            onClick: () =>
              runWithLock(() =>
                handleSCC(nodes, setNodes, adjList, isDirected, speedrunRef)
              ),
            disabled: !isDirected || isRunning,
          },
          {
            label: "Cycle Detection",
            onClick: () =>
              runWithLock(() =>
                handleCycleDetection(
                  1,
                  nodes,
                  setNodes,
                  adjList,
                  isDirected,
                  setCycleDetected,
                  speedrunRef
                )
              ),
            disabled: isRunning,
          },
          {
            label: "Prims MST",
            onClick: () =>
              runWithLock(() =>
                handlePrims(
                  1,
                  nodes,
                  setNodes,
                  adjList,
                  links,
                  setLinksData,
                  speedrunRef
                )
              ),
            disabled: !isWeighted || isRunning,
          },
        ].map(({ label, onClick, disabled }) => (
          <button
            key={label}
            onClick={onClick}
            disabled={disabled}
            className={`px-5 py-2 rounded-lg text-white font-medium transition ${
              disabled
                ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 active:scale-95"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Speed Run Button */}
      <button
        disabled={!isRunning}
        onClick={() => (speedrunRef.current = true)}
        className={`mt-4 px-4 py-2 rounded-lg font-semibold transition ${
          isRunning
            ? "bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white cursor-pointer"
            : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
        }`}
      >
        ⚡ Speed Run
      </button>
    </div>
  );
}

export default Input;
