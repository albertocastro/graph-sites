import { addNode, getGraph, addNeighbors,addNeighbor, BFS, setGraph } from "../Graph/Graph"
import LinkGrabber from "../LinkGrabber/LinkGrabber"

class Explorer{

    constructor(initialSite){
        addNode(initialSite)
        this.initialSite =initialSite
    }
    setGraph(newGraph){
        return setGraph(newGraph)
    }
    getGraph(){
        return getGraph()
    }
    async start(){
        const lg = new LinkGrabber(this.initialSite)
        try{

            const neighbors = await lg.getOutsideNonRepeatedLinks()
            addNeighbors(this.initialSite,neighbors)
        }catch(e){
            console.log(e)
            addNeighbor(this.initialSite,"http://404.com")
        }

    }
    async explore(jumps){
        let i =0;
        await this.start()
        await BFS(this.initialSite,async(node)=>{
            if(i<jumps){
                const nodeExplorer = new Explorer(node)
                await nodeExplorer.start()
                i++
            }
        })
    }
    getLength(){
        return Object.keys(this.getGraph()).length
    }
    
}

export default Explorer