import React, { useRef, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { addTask, removeTask, updateTask, updateTaskStatus } from '../store/taskSlice'
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

import { DragDropContext,Draggable,Droppable } from 'react-beautiful-dnd'

export default function KanbanBoard() {
    const [input,setInput]=useState('')
    const [editId,setEditId]=useState(null)
    const [editText,setEditText]=useState('')
    const status=['pending' ,'processing','completed']
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
   
   const handleDrag=(result)=>{
    const {destination,source,draggableId}=result
    if(!destination){
      return ;
    }
   const draggedTaskId=draggableId
   const newStatus=destination.droppableId;
   dispatch(updateTaskStatus({id:draggedTaskId,status:newStatus}))
   }
   const deleteTodo=(id)=>{
    dispatch(removeTask(id))
   }
   const editTodo=(id)=>{
    const task=tasks.find((task)=>task.id===id)
    if(task){
        setEditId(id)
        setEditText(task.text)
    }
   }
   const handleEditChange=(e)=>{
         setEditText(e.target.value)
   }
   const saveEdit=(id)=>{
       dispatch(updateTask({id,newText:editText}))
       setEditId(null)
       setEditText('')
   }
  return (
    <div className='mainTask h-screen	'>
       <div className='flex justify-center '>
       <h1 className='text-7xl font-black text-gray-900 dark:text-white	'>Kanban</h1>
       </div>
       <div className='addTodobtn '>
       <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={showInput}>Add Todo</button>
       <div ref={divRef} style={{ display: 'none' }}>
  <input    id="inputText"type="text"value={input} onChange={handlChage}className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
  <button    onClick={saveTask}className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
    Save
  </button>
</div>
       </div>
         <DragDropContext onDragEnd={handleDrag}>
       <div className='flex '>
        {status.map((status)=>(
            <Droppable droppableId={status} key={status}>
           {(provided)=>(
            <div className='statusDiv border-4  w-1/3 h-screen' {...provided.droppableProps} ref={provided.innerRef} key={status}>
                <h2 className='h-12 text-center text-3xl font-semibold border-4'>{status}</h2>
                <div className='bg-sky-100'>
                    {tasks.filter((task)=>task.status===status).map((item,index)=>(
                        <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                        {(provided)=>(
                            <div className='statusItem flex justify-center bg-sky-100	 '>
                            <div className=' w-1/2 border-4 border-blue-300 h-24 item-center flex justify-center items-center bg-sky-200'>
                                {editId===item.id ?(
                                    <>
                                    <input type="text" value={editText} onChange={handleEditChange} />
                                    <button className='border-2	 border-black' onClick={()=>saveEdit(item.id)}>saveEdit</button>
                                    </>
                                ):(
                                    <>
                                    <h2 className='text-xl'  {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>{item.text}</h2>
                                    <div>
                                    <button className='' onClick={()=>deleteTodo(item.id)}><FaTrashCan/></button>
                                    <button className='' onClick={()=>editTodo(item.id)}><FaEdit/></button>
                                    </div>
                                    </>
                                )}                
                        </div>
                        </div>
                    )}
                        </Draggable>
                    ))}
                        {provided.placeholder}
                </div>
            </div>
            )}
            </Droppable>
        ))}
       </div>
       </DragDropContext>
   </div>
  )
}
