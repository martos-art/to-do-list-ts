import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

const tasks1= [
    {id:1, title:"JS", isDone:true},
    {id:2, title:"JSX", isDone:true},
    {id:3, title:"TSX", isDone:true}
]
const tasks2 = [
    {id:1, title:"YO", isDone:false},
    {id:2, title:"FCN", isDone:false},
    {id:3, title:"ACAB", isDone:false}
]
function App() {
    return (
        <div className="App">
            <Todolist title="4to po 4em?" tasks={tasks1}/>
            <Todolist title="Houmie" tasks={tasks2}/>
        </div>
    );
}
export default App;
