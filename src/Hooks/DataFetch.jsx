import { useEffect, useState } from "react";

function parseGraphInput(input) {
  const lines = input.trim().split('\n').map(line => line.trim()).filter(Boolean);
  if (lines.length < 2) return { nodes: [], links: [] };

  const links = lines.slice(1).map(line => {
    const [source, target] = line.trim().split(/\s+/);
    return { source, target };
  });

  const uniqueNodes = Array.from(
    new Set(links.flatMap(({ source, target }) => [source, target]))
  ).map(id => ({ id }));

  return {
    nodes: uniqueNodes,
    links,
  };
}


export default parseGraphInput;
