import React, { useState } from "react";

export default function DijkstraResultModal({ result }) {
  const [isOpen, setIsOpen] = useState(false);

  // Close modal when background is clicked
  const handleOverlayClick = () => setIsOpen(false);

  // Prevent closing when modal content is clicked
  const handleContentClick = (e) => e.stopPropagation();

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Show result
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={handleOverlayClick} // background click closes
        >
          <div
            className="bg-gray-900 text-white rounded-lg shadow-lg p-6 w-[90%] max-w-3xl"
            onClick={handleContentClick} // prevent bubbling
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Dijkstra Result</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white text-2xl font-bold"
              >
                &times;
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              <pre className="whitespace-pre-wrap font-mono text-sm">
                {result}
              </pre>
            </div>

            <div className="mt-4 text-right">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
