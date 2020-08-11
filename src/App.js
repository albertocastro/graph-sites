import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Explorer from "./business/Explorer/Explorer"
import Graph from "react-graph-vis";
import axios from "axios"

const options = {
  layout: {
    hierarchical: true
  },
  edges: {
    color: "#000000"
  },
  height: "500px"
};

const events = {
  select: function(event) {
    var { nodes, edges } = event;
  }
};
let network
const graph = {
  nodes: [
  
  ],
  edges: [
   
  ]
};
function App() {
  const [url,setUrl] = useState("https://apple.com")
  const [jumps,setJumps] = useState(1)
  const load= ()=>{
    axios.get("http://localhost:3001",{params:{q:url,j:jumps}}).then(response=>{
      const myGraph = response.data
      console.log({myGraph})
      let edges = []
      const nodes = Object.keys(myGraph)
      .map(elem=>{
        for(let neighbor of myGraph[elem]){
          edges.push({from:elem,to:neighbor})
        }


        return {id:elem,label:elem}
      })
      console.log(edges)
      network.setData({
        nodes,
        edges
      })

    })
  }
  useEffect(()=>{
   load()
  },[])

  return (
    <div>
      <label>Enter site:</label>
      <input value={url} onChange={(e=>setUrl(e.target.value))}></input>
      <br/>
      <label>Jumps</label>
      <input value={jumps} onChange={(e=>setJumps(e.target.value))} type="number"/>
      <button onClick={load}>Explore</button>

      <Graph
      graph={graph}
      options={options}
      getNetwork={n => {
        network = n
        //  if you want access to vis.js network api you can set the state in a parent component using this property
      }}
    />
      </div>
  );
}

export default App;
