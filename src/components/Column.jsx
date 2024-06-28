import React, { useRef, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { addTask, removeTask, updateTask } from '../store/taskSlice'
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { DragDropContext,Draggable,Droppable } from 'react-beautiful-dnd';

export default function KanbanBoard() {
    const [input,setInput]=useState('')
    const [editIndex,setEditIndex]=useState(null)
    const [editText,setEditText]=useState('')
    const tasks=useSelector((state)=>state.tasks)
    const dispatch=useDispatch()
    let divRef=useRef()
    const handlChage=(e)=>{
          setInput(e.target.value)
    }
    const saveTask=()=>{

        dispatch(addTask(input))
        setInput('')
        divRef.current.style.display='none'
    }
    const showInput=()=>{
        divRef.current.style.display='block'
    }
    const deletedTodo=(id)=>{
        dispatch(removeTask(id))       
    }
    const editTodo=(id,text)=>{
        setEditIndex(id)
        setEditText(text)

    }

    const handleSave=(id)=>{
      dispatch(updateTask({id,newText:editText}))
      setEditIndex(null)
      setEditText('')
    }
    const dragEnd=(result)=>{
      const {destination,source}=result
      if(!destination){
        return ;
      }
      const items=Array.from(tasks)
      const [recordedItem]=items.splice(source.index,1)
      items.splice(destination.index,0,recordedItem)
      dispatch(updateTask(items))
}
    const renderTasksByStatus = (status) => {
        return tasks
            .filter((task) => task.status === status)
            .map((task,index) => (
                <DragDropContext onDragEnd={dragEnd}>
                    <Droppable droppableId='dragAndDrop'>
                        {(provided)=>(
                <div className='dragAndDrop' {...provided.droppableProps} ref={provided.innerRef}>

                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                        {(provided)=>(

                        
                
                <div   style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px',backgroundColor:'lightgray' }}>
                      {editIndex === task.id ? (
                        <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onBlur={() => handleSave(task.id)}
                            autoFocus
                            style={{backgroundColor:'lightblue',width:'100%',minHeight:'50px',textAlign:'center'}}
                        />
                            ) : (
                                
                                <input {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} type="text" readOnly value={task.text} style={{backgroundColor:'lightblue',width:'100%',minHeight:'50px',textAlign:'center'}} />
                            )}
                                    
                <div>
                < FaTrashCan onClick={()=>deletedTodo(task.id)} style={{cursor:'pointer'}}/>
                <FaEdit onClick={()=>editTodo(task.id,task.text)} style={{cursor:'pointer'}} />
                </div>
                
                </div> 
                )}
                </Draggable>
                {provided.placeholder}
                </div>  
                 )}
                </Droppable>
                </DragDropContext>        
          ));
    };
  return (
    <div className='mainTask h-screen	'>
       <div className='flex justify-center '>
       <h1 className='text-5xl	'>Kanban</h1>
       </div>
       <div className='addTodobtn'>
       <button className='bg-sky-400 border border-indigo-600 rounded-lg ' onClick={showInput}>ADD TODO</button>
       <div ref={divRef} style={{display:'none'}}>
       <input  id='inputText' type="text" value={input} onChange={handlChage} />
       <button onClick={saveTask}>save</button>
       </div>
       </div>
      <div className='w-3/4 ms-auto		'>
      
        <div className="w-full max-w-4xl flex justify-between  ">
                <div className="mb-4 w-1/3 border-2">
                    <h3 className="text-xl mb-2 text-center border-b-4 text-3xl	font-semibold	">Pending</h3>
                    <ul>
                        {renderTasksByStatus('pending')}
                    </ul>
                </div>
                <div className="mb-4 w-1/3 border-2">
                    <h3 className="text-xl mb-2  text-center border-b-4 text-3xl font-semibold	">Processing</h3>
                    <ul>
                        {renderTasksByStatus('processing')}
                    </ul>
                </div>
                <div className="mb-4 w-1/3 border-2">
                    <h3 className="text-xl mb-2  text-center border-b-4 text-3xl font-semibold	">Completed</h3>
                    <ul>
                        {renderTasksByStatus('completed')}
                    </ul>
                </div>
            </div>
      </div>
    </div>
  )
}
