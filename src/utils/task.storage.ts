import { Task } from "../model/Task.interface";

const taskStorage = {
    setListTask : (value:Task) => localStorage.set("list_task",value),
    getListTask : () => localStorage.getItem("list_task"),

    setTask : (value:Task) => localStorage.set("task",value),
    getTask : ()   => localStorage.getItem("task"),
}

export default taskStorage;