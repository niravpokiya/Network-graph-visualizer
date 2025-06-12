import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GraphVisualizer from './GraphVisualizer'
import Input from './Input'
import parseGraphInput from './Hooks/DataFetch'

function App() {
  const [count, setCount] = useState(0)
  let [nodes, setNodes] = useState([{id : '1'}])
  let [links, setLinks] = useState([])
  let [data, setData] = useState()
  // useDataFetch(data, setNodes, setLinks, nodes.length)

const handleInputChange = (e) => {
  const input = e.target.value;
  const { nodes, links } = parseGraphInput(input);
  setNodes(nodes);
  setLinks(links);
};
//   const nodes = [
//  { id: '1' },
//  { id: '2' },
//  { id: '3' },
//  { id: '4' },
//  { id: '5' },
// ];

// const links = [
//  { source: '1', target: '2' },
//  { source: '2', target: '3' },
//  { source: '2', target: '4' },
//  { source: '2', target: '5' },
//  { source: '3', target: '5' },
//  { source: '4', target: '5' },
// ];


    return (
      <>
        <div className="container">
          <Input onInputChange={handleInputChange} />
          <div className="graphSection">
            <GraphVisualizer nodesData={nodes} linksData={links} />
          </div>
        </div>
      </>
    )
}

  export default App
