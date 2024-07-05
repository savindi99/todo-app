import { useEffect, useState } from "react"
import "./Style.css"
import { NewTodoForm } from "./NewTodoForm"
import { ToDoList } from "./ToDoList.jsx"

export default function App(){
    
    const [todos, setToDos] = useState(()=> {
        const localvalue = localStorage.getItem("ITEMS")
        if(localvalue == null) return []

        return JSON.parse(localvalue)
    })

    
    useEffect(() => {
        localStorage.setItem("ITEMS", JSON.stringify(todos))
    }, [todos])

    function addToDo(title){
        setToDos(currentToDos => {
            return [
                ...currentToDos,
                {id: crypto.randomUUID(), title, completed: false
                },
            ]

        })
    }
    

    function toggleToDo(id, completed){
        setToDos(currentToDos => {
            return currentToDos.map(todo => {
                if (todo.id == id){
                    return {...todo, completed}
                }

                return todo
            })
        })

    }

    function deleteToDo(id){
        setToDos(currentToDos => {
            return currentToDos.filter(todo => todo.id != id)
        })
    }

    return (
        <>
        <NewTodoForm onSubmit={addToDo}/>
        <h1 className="header">To Do List</h1>
        <ToDoList 
        todos = {todos} 
        toggleToDo = {toggleToDo}
        deleteToDo = {deleteToDo}/>
        </>
        
    )
}
