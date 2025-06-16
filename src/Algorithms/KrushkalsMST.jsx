import Reset from "../components/ResetColors";

export default function Kruskal(nodes, links, setNodes, setLinks, delay, speedrun) {

  const [resetNodes, resetLinks] = Reset(nodes, links); // Reset colors
    setNodes(resetNodes);
    setLinks(resetLinks)
    nodes = resetNodes
    links= resetLinks

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  class DSU {
    constructor(n) {
      this.parent = Array(n).fill(0).map((_, i) => i);
    }
    find(x) {
      if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
      return this.parent[x];
    }
    union(x, y) {
      const xr = this.find(x);
      const yr = this.find(y);
      if (xr !== yr) {
        this.parent[yr] = xr;
        return true;
      }
      return false;
    }
  }

  const run = async () => {
    const idToIndex = {};
    nodes.forEach((node, index) => {
      idToIndex[node.id] = index;
    });

    const dsu = new DSU(nodes.length);
    const sortedLinks = [...links].sort((a, b) => a.weight - b.weight);
    const mstLinks = new Set();
    const mstNodes = new Set();

    for (const link of sortedLinks) {
      const uId = link.source.id || link.source;
      const vId = link.target.id || link.target;
      const u = idToIndex[uId];
      const v = idToIndex[vId];

      if (dsu.union(u, v)) {
        mstLinks.add(`${uId}-${vId}`);
        mstLinks.add(`${vId}-${uId}`);
        mstNodes.add(uId);
        mstNodes.add(vId);
 
        setLinks(prevLinks =>
          prevLinks.map(link => {
            const src = link.source.id || link.source;
            const tgt = link.target.id || link.target;
            if (mstLinks.has(`${src}-${tgt}`)) {
              link.inMST = true;
            }
            return link;
          })
        );
 
        setNodes(prevNodes => {
          return prevNodes.map(node => {
            node.color = mstNodes.has(node.id) ? "#16a34a" : "#4f46e5";
            node.inMST = mstNodes.has(node.id);
            return node;
          });
        });

        if (speedrun.current === "fast") {
          delay = 100;
        } else if (speedrun.current === "skip") {
          delay = 0;
        }

        await sleep(delay);
      }
    }
  };

  return run();
}