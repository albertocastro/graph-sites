import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Explorer from "./business/Explorer/Explorer"
import Graph from "react-graph-vis";

const e = new Explorer("https://www.amazon.com")
let myGraph  = {
  nodes: [
    { id: 1, label: "Node 1", title: "node 1 tootip text" },
    { id: 2, label: "Node 2", title: "node 2 tootip text" },
    { id: 3, label: "Node 3", title: "node 3 tootip text" },
    { id: 4, label: "Node 4", title: "node 4 tootip text" },
    { id: 5, label: "Node 5", title: "node 5 tootip text" }
  ],
  edges: [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 2, to: 5 }
  ]
};
const options = {
  layout: {
    improvedLayout: true
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
function App() {
  const [graph,setGraph] = useState({})
  const [graphSigma,setGraphSigma] = useState({
    nodes:[{id:"apple",label:"apple"},{id:"dos",label:"dos"}],
    edges:[{from:"apple",to:"dos"}]
})
  useEffect(()=>{
    e.explore(3).then(()=>{
      setGraph(e.getGraph)
      const myGraph = e.getGraph()
      let edges = []
      const nodes = Object.keys(e.getGraph())
      .map(elem=>{
        console.log(myGraph)
        for(let neighbor of myGraph[elem]){
          console.log({neighbor})
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
  },[])
  return (
    <div className="" style={{width:800}}>
      <label>Enter site:</label>
      <input ></input>
      <br/>
      <label>Jumps</label>
      <input type="number"/>
      <button>Explore</button>
<pre >
      {
        JSON.stringify(graph)
      }
      </pre>
      <pre >
      {
        JSON.stringify(graphSigma)
      }
      </pre>
      <Graph
      graph={graphSigma}
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
