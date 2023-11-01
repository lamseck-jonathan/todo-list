import {defineStore} from "pinia"
import { Task } from "../model/Task.interface"
import { getEmptyTask, getEmptyTaskList } from "../utils/getEmptyTask"

export const useTaskStore = defineStore('task', {
    state : () => {
        return {
            task : getEmptyTask(),
            tasks : getEmptyTaskList(),
            lastTask: {} as Task
        }
    },
    getters:{
        getTask : (state) => state.task,
        getListeTask : (state) => state.tasks
    },
    actions : {
        getLastTask(){
            this.lastTask = this.tasks[this.tasks.length-1]
        },
        addTask(task:Task){
            console.log(this.lastTask)
            if(this.lastTask.id > 0){
                task.id = this.lastTask.id + 1
                this.tasks.push({...task})
            }
            else{
                this.tasks.push({...task})
            }
            console.log(this.tasks) 
        },
        editTask(index:number,task:Task){
            const taskToEdit = this.tasks[index]
            taskToEdit.name = task.name
        },
        deleteTask(index:number){
            const indexToDelete = this.tasks.findIndex(task => task.id === index);
            if (indexToDelete !== -1) {
                this.tasks.splice(indexToDelete, 1);
            } 
            else {
            console.error('Task with ID '+ index +' not found.');
            }
        },
    },

})
