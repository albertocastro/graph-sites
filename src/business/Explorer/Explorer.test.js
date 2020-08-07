/**
 * @jest-environment node
 */
import Explorer from "./Explorer"
import { BFS, getGraph, setGraph } from "../Graph/Graph";

it("should start Explorer Object with initial site",async ()=>{
    jest.setTimeout(3000000);

    const explorer = new Explorer("https://apple.com");
    await explorer.start()
    const graph = explorer.getGraph()

    expect(Object.keys(graph).length>0)
})

it("should explorer with a given number of jumps",async()=>{
    setGraph({})
    const explorer = new Explorer("https://apple.com");
    await explorer.explore(5)
    console.log(explorer.getLength() )
    console.log(explorer.getGraph())
    expect(explorer.getLength() >5)
})