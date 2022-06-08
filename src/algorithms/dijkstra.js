// const node = {
//     row,
//     col,
//     isVisited,
//     distance,
// };

export function dijkstra(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        // HANDLE WALLS LATER
        // while (currentNode.status === "wall" && unvisitedNodes.length) {
        //     currentNode = getClosestNode(nodes, unvisitedNodes)
        // }
        // HANDLE IMPOSIBLE LATER
        // if (closestNode.distance === Infinity) return false;
        // ANIMATE LATER
        // nodesToAnimate.push(closestNode);
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, grid);
    }
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateNeighbors(node, grid) {
    const neighbors = getNeighbors(node, grid);
    for (const neighbor of neighbors) {
        neighbor.distance = node.distance + 1;
    }
}

function getNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row -1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
}









//     nodes[start].direction = "right";
//     let unvisitedNodes = Object.keys(nodes);
//     while (unvisitedNodes.length) {
//         let currentNode = closestNode(nodes, unvisitedNodes);
//         while (currentNode.status === "wall" && unvisitedNodes.length) {
//             currentNode = closestNode(nodes, unvisitedNodes)
//         }
//         if (currentNode.distance === Infinity) {
//             return false;
//         }
//         nodesToAnimate.push(currentNode);
//         currentNode.status = "visited";
//         if (currentNode.id === target) return "success!";
//         if (name === "CLA" || name === "greedy") {
//             updateNeighbors(nodes, currentNode, boardArray, target, name, start, heuristic);
//         } else if (name === "dijkstra") {
//             updateNeighbors(nodes, currentNode, boardArray);
//         }
//     }
// }