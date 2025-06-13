import React from "react";

function buildAdjList(edges, isDirected) {
  const adj = {};

  edges.forEach(([a, b]) => {
    if (!adj[a]) adj[a] = [];
    if (!adj[b]) adj[b] = [];

    adj[a].push(b);
    if(!isDirected)
      adj[b].push(a); // undirected graph
  });
  return adj;
}
export default buildAdjList
