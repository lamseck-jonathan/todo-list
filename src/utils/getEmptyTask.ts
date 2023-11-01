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

export function getEmptyTaskListPrefilled() : Task[]{
    return [
        {
            id:1,
            name:'Travailler',
            isDone:false
        },
        {
            id:2,
            name:'Prier',
            isDone:false
        },
        {
            id:3,
            name:'Manger',
            isDone:false
        }
    ]
}