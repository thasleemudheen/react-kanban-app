
// import React, { useRef, useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { addTask, removeTask, updateTask, updateTaskStatus } from '../store/taskSlice'
// import { FaTrashCan } from "react-icons/fa6"
// import { FaEdit } from "react-icons/fa"
// import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

// export default function KanbanBoard() {
//     const [input, setInput] = useState('')
//     const [editId, setEditId] = useState(null)
//     const [editText, setEditText] = useState('')
//     const status = ['Pending', 'Processing', 'Completed']
//     const tasks = useSelector((state) => state.tasks)
//     const dispatch = useDispatch()
//     const divRef = useRef()

//     const handleChange = (e) => {
//         setInput(e.target.value)
//     }

//     const saveTask = () => {
//         dispatch(addTask(input))
//         setInput('')
//         divRef.current.style.display = 'none'
//     }

//     const showInput = () => {
//         divRef.current.style.display = 'block'
//     }

//     const handleDrag = (result) => {
//         const { destination, draggableId } = result
//         if (!destination) {
//             return
//         }
//         const draggedTaskId = draggableId
//         const newStatus = destination.droppableId
//         dispatch(updateTaskStatus({ id: draggedTaskId, status: newStatus }))
//     }

//     const deleteTodo = (id) => {
//         dispatch(removeTask(id))
//     }

//     const editTodo = (id) => {
//         const task = tasks.find((task) => task.id === id)
//         if (task) {
//             setEditId(id)
//             setEditText(task.text)
//         }
//     }

//     const handleEditChange = (e) => {
//         setEditText(e.target.value)
//     }

//     const saveEdit = (id) => {
//         dispatch(updateTask({ id, newText: editText }))
//         setEditId(null)
//         setEditText('')
//     }

//     return (
//         <div className="bg-gray-100 min-h-screen p-8">
//             <div className="max-w-7xl mx-auto">
//                 <h1 className="text-5xl font-bold text-center text-gray-800 mb-10">Kanban Board</h1>
//                 <div className="mb-8 text-center">
//                     <button
//                         type="button"
//                         className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//                         onClick={showInput}
//                     >
//                         Add Todo
//                     </button>
//                     <div ref={divRef} className="mt-4 hidden">
//                         <input
//                             type="text"
//                             value={input}
//                             onChange={handleChange}
//                             className="border-2 border-gray-300 rounded-lg px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             placeholder="Enter a new task"
//                         />
//                         <button
//                             onClick={saveTask}
//                             className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
//                         >
//                             Save
//                         </button>
//                     </div>
//                 </div>
//                 <DragDropContext onDragEnd={handleDrag}>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                         {status.map((columnStatus) => (
//                             <Droppable droppableId={columnStatus} key={columnStatus}>
//                                 {(provided) => (
//                                     <div
//                                         {...provided.droppableProps}
//                                         ref={provided.innerRef}
//                                         className="bg-white rounded-lg shadow-md overflow-hidden"
//                                     >
//                                         <h2 className="text-xl font-semibold p-4 bg-gray-200 text-gray-800">
//                                             {columnStatus}
//                                         </h2>
//                                         <div className="p-4 min-h-[200px]">
//                                             {tasks
//                                                 .filter((task) => task.status === columnStatus.toLowerCase())
//                                                 .map((item, index) => (
//                                                     <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
//                                                         {(provided) => (
//                                                             <div
//                                                                 {...provided.draggableProps}
//                                                                 {...provided.dragHandleProps}
//                                                                 ref={provided.innerRef}
//                                                                 className="bg-gray-50 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition duration-300 ease-in-out"
//                                                             >
//                                                                 {editId === item.id ? (
//                                                                     <div className="flex items-center">
//                                                                         <input
//                                                                             type="text"
//                                                                             value={editText}
//                                                                             onChange={handleEditChange}
//                                                                             className="flex-grow border-2 border-gray-300 rounded-lg px-3 py-1 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                                                         />
//                                                                         <button
//                                                                             onClick={() => saveEdit(item.id)}
//                                                                             className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded-lg transition duration-300 ease-in-out"
//                                                                         >
//                                                                             Save
//                                                                         </button>
//                                                                     </div>
//                                                                 ) : (
//                                                                     <div className="flex items-center justify-between">
//                                                                         <span className="text-gray-800">{item.text}</span>
//                                                                         <div className="flex space-x-2">
//                                                                             <button
//                                                                                 onClick={() => editTodo(item.id)}
//                                                                                 className="text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out"
//                                                                             >
//                                                                                 <FaEdit />
//                                                                             </button>
//                                                                             <button
//                                                                                 onClick={() => deleteTodo(item.id)}
//                                                                                 className="text-red-500 hover:text-red-600 transition duration-300 ease-in-out"
//                                                                             >
//                                                                                 <FaTrashCan />
//                                                                             </button>
//                                                                         </div>
//                                                                     </div>
//                                                                 )}
//                                                             </div>
//                                                         )}
//                                                     </Draggable>
//                                                 ))}
//                                             {provided.placeholder}
//                                         </div>
//                                     </div>
//                                 )}
//                             </Droppable>
//                         ))}
//                     </div>
//                 </DragDropContext>
//             </div>
//         </div>
//     )
// }