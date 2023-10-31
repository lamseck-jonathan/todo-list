export interface Task {
    id:number,
    name: string;
    isDone: boolean;
}

export interface TaskItem {
    index:number;
    task: Task;
}