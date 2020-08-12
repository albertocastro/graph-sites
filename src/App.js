import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Explorer from "./business/Explorer/Explorer"
import Graph from "react-graph-vis";
import axios from "axios"
import "./styles.css";
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
  const [loading,setLoading] = useState(false)
  const [jumps,setJumps] = useState(1)
  const load= ()=>{
    setLoading(true)
    axios.get("http://localhost:3001/explore",{params:{q:url,j:jumps}}).then(response=>{
      const myGraph = response.data
      console.log({myGraph})
      let edges = []
      const nodes = Object.keys(myGraph)
      .map(elem=>{
        for(let neighbor of myGraph[elem]){
          edges.push({from:elem,to:neighbor,color:"#8963BA",width:3})
        }


        return {id:elem,label:elem,color:"#90c290",shape:"dot"}
      })
      console.log(edges)
      network.setData({
        nodes,
        edges
      })
      setLoading(false)
    })
  }
  useEffect(load,[])

  return (
    <div>
      <div className="inputContainer">

        <label>Enter site:</label>
        <input value={url} onChange={(e=>setUrl(e.target.value))}></input>
        <br/>
        <label>Levels</label>
        <input value={jumps} onChange={(e=>setJumps(e.target.value))} type="number"/>
        <br/>
        <div className="buttonSection">
        {
          loading &&  <button>Loading</button>
        }
      {
          !loading &&  <button onClick={load}>Explore</button>
        }
        </div>
       
      </div>

   
      
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
