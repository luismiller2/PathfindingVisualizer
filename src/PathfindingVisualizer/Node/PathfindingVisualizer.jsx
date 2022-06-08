import React, {Component} from "react";
import Node from './Node';
import {dijkstra, getNodesInShortestPathOrder} from '/src/algorithms/dijkstra.js';
import './PathfindingVisualizer.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
            mouseIsPressed: false,
        };
    }

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({grid});
    }

    animateDijkstra(visitedNodesInOrder) {
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            const node = visitedNodesInOrder[i];
            const newGrid = this.state.grid.slice();
            const newNode = {
                ...node,
                isVisited: true,
            };
            newGrid[node.row][node.col] = newNode;
            setTimeout(() => {
                this.setState({grid: newGrid});
            }, 1000 * i);
        }
    }

    visualizeDijkstra() {
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        this.animateDijkstra(visitedNodesInOrder)
    }

    render() {
        const {grid} = this.state;

        return(
            <>
                <button onClick={() => this.visualizeDijkstra()}>
                    Visualize Dijkstra's Algorithm
                </button>
                <div className="grid"> 
                {grid.map((row, rowIdx) => {
                return (
                <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                    const {isStart, isFinish, isVisited} = node;
                    return (
                        <Node
                        key = {nodeIdx}
                        isStart = {isStart}
                        isFinish = {isFinish}
                        isVisited = {isVisited}></Node>
                    );
                })}
                </div>
                );
            })}
            </div>
            </>
        )
    }

    handleMouseDown(row, col) {
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid, mouseIsPressed: true});
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid});
    }

    handleMouseUp() {
        this.setState({mouseIsPressed: false});
    }
}

//         for (let row = 0; row < 20; row++) {
//             const currentRow = [];
//             for (let col = 0; col < 50; col++) {
//                 const currentNode = {
//                     col,
//                     row,
//                     isStart: row === 10 && col === 5,
//                     isFinish: row === 10 && col === 45,
//                 };
//                 currentRow.push(currentNode);
//             }
//             nodes.push(currentRow);
//         }
//         this.setState({nodes})
//     }

//     render() {
//         const {nodes} = this.state;
//         console.log(nodes)

//         return (
//             <div className="grid"> 
//             {grid.map((row, rowIdx) => {
//                 return (
//                 <div key={rowIdx}>
//                 {row.map((node, nodeIdx) => {
//                     const {isStart, isFinish} = node;
//                     return (
//                         <Node
//                         key = {nodeIdx}
//                         isStart = {isStart}
//                         isFinish = {isFinish}
//                         test={'foo'}
//                         tests={'kappa'}></Node>
//                     );
//                 })}
//                 </div>
//                 );
//             })}
//             </div>
//         );
//     }