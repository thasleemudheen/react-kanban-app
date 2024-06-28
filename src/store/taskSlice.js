import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const taskSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
        addTask: (state, action) => {
            state.push({id:uuidv4() ,text:action.payload,status:'pending'});
        },
        removeTask:(state,action)=>{
           return state.filter(task=>task.id!==action.payload)
        },
        updateTask:(state,action)=>{
            const {id,newText}=action.payload
            const task=state.find(task=>task.id===id)
            if(task){
                task.text=newText
            }
        },
        updateTaskStatus:(state, action) => {
            const { id, status } = action.payload;
          const task=state.find(task=>task.id===id)

          if(task){
            task.status=status
          }
        }
    }
});

export const { addTask ,updateTaskStatus,removeTask,updateTask} = taskSlice.actions;
export default taskSlice.reducer;
