import {getNode, addNode, setGraph, getGraph, addNeighbor, BFS} from "./Graph"

describe("Graph Structure",()=>{

    it("should create a graph",()=>{
        const node = getNode("test")
        expect(node).toBe(null)
    })
    it("should add a node to a graph",()=>{
        addNode("test2",["1"])
        const node = getNode("test2")
        expect(node[0]).toBe("1")
    })
    it("should not let add a repeated node to a graph",()=>{
        addNode("test")
        const result = addNode("test")
        expect(result).toBe(false)
    })
    it("should set and get a graph",()=>{
        const graph = {
            "test1":["1","2"],
            "2":["test1","6"]
        }
        setGraph(graph)
        const newGraph = getGraph()
      
        expect(newGraph).toBe(graph)
    })
    it("should add a neighbor to an existing node",()=>{
        const graph = {
            "test1":["1","2"],
            "2":["test1","6"]
        }
        setGraph(graph)
        const newGraph = getGraph()
        expect(newGraph).toBe(graph)
    })
})
describe("BFS",()=>{
    const template = {
        'https://apple.com': [ 'goldmansachs.com', 'icloud.com' ],
        'goldmansachs.com': [1,2,3,4,5],
        'icloud.com': [6,7,8,9,10]
      }

    // it("should BFS",()=>{
    //     setGraph(template)
    //     BFS("https://apple.com")
    // })
})