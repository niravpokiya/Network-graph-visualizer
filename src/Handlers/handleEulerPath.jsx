import EulerPath from "../Algorithms/EulerianPath";

async function handleEulerPath(nodes, links, setNodes, setLinks, speedrun, isDirected, setResult) {
    let delay = 500;
    await EulerPath(nodes, links,  setNodes, setLinks, 500, speedrun, isDirected, setResult);
    speedrun.current = ""
}

export default handleEulerPath