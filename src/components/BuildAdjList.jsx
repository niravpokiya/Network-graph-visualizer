import React from "react";

function buildAdjList(edges) {
  const adj = {};

  edges.forEach(([a, b]) => {
    if (!adj[a]) adj[a] = [];
    if (!adj[b]) adj[b] = [];

    adj[a].push(b);
    adj[b].push(a); // undirected graph
  });
  return adj;
}
export default buildAdjList
