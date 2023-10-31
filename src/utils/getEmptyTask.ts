import { Task } from "../model/Task.interface";

export function getEmptyTask(id?:number) : Task{
    return {
        id:id||1,
        name:'',
        isDone:false
    }
}

export function getEmptyTaskList() : Task[]{
    return [
        
    ]
}