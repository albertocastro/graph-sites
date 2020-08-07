let graph = {

}
export const getNode = (node)=>{

    return graph[node] || null
}
export const addNeighbor = (node,neighbor)=>{
    if(!graph[node]) return false
    if(!graph[node].some((e)=>(e===neighbor))){
        graph[node].push(neighbor)
        if(!graph[neighbor])graph[neighbor] = []
        return true
    }
    return false
}
export const addNeighbors = (node,neighbors)=>{
    for(let neighbor of neighbors){
        addNeighbor(node,neighbor)
    }
}
export const addNode = (node,neighbors=null)=>{
    if(graph[node]) return false

    graph[node] = neighbors || []
}
export const setGraph = (newGraph)=> graph = newGraph
export const getGraph = ()=>graph

export const BFS =   async(root,visit=null)=>{
    let marked = {}
    
    let queue = [root]
    marked[root] = true

    while(queue.length){

        const node = queue.shift()
        if(visit) {
            await visit(node)
        }
        else{
            console.log(node)
        }
        if(graph[node]){
            for(let current of graph[node]){
                if(!marked[current]){
                    marked[current] = true

                    queue.push(current)
                }
            }
        }
    
    }
    
}