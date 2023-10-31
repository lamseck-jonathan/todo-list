<template>
    <div>
        <ul class="list-group list-group-light mt-3">
            <div class="container">
                Tache Non Terminée 
                <span class="badge badge-warning">
                    {{ tasksUncompleted.length }} sur {{ props.tasks.length }}
                </span> 
            </div>
            <li 
            v-if="tasksUncompleted.length >= 1" 
            class="mt-2 container"
            >
                <div 
                class="card my-2 py-2 task-undone" 
                v-for="(task,index) in tasksUncompleted" 
                :key="task.name"
                >
                    <div class="d-flex flex-row justify-content-between align-items-center">
                        <div class="col-md-4">
                            {{task.name}}
                        </div>
                        <div class="col-6 col-md-6 d-flex flex-row justify-content-end align-items-center">
                            <input 
                            class="form-check-input mx-md-4 mx-1" 
                            type="checkbox" 
                            v-model="task.isDone" 
                            id="defaultCheck1"
                            @click="toggleTask(task)"
                            >
                            <button 
                            @click="emits('edit',{index:index,task:task})"
                            type="button" 
                            class="btn btn-info btn-floating mx-md-4 mx-1"
                            >
                                <i class="fas fa-pen"></i>
                            </button>
                            <button 
                            @click="emits('delete',{index:index,task:task})"
                            type="button" 
                            class="btn btn-danger btn-floating mx-md-4 mx-1"
                            >
                                <i class="fas fa-trash-can"></i>
                            </button>
                        </div>
                    </div>
                    
                </div>
            </li>
            <li 
            v-else
            class="mt-2 container"
            >
                <div 
                class="card my-2 px-3 py-3 task-undone text-center" 
                >
                    {{textForEmptyTask}}
                </div>
            </li>
           
        </ul>
        <ul 
        v-if="tasksDone.length >= 1" 
        class="list-group list-group-light mt-3"
        >
            <div class="container">
                Tache Terminée 
                <span class="badge badge-success">
                    {{ tasksDone.length }} sur {{ props.tasks.length }}
                </span>
            </div>
            <li 
            v-if="tasksDone.length >= 1" 
            class="mt-2 container"
            >
                <div 
                class="card my-2 py-2 task-done" 
                v-for="(task,index) in tasksDone" 
                :key="task.name"
                >
                    <div class="d-flex flex-row justify-content-end justify-content-md-between align-items-center">
                        <div class="col-6 col-md-4">
                            <s>{{task.name}}</s>
                        </div>
                        <div class="col-6 col-md-6 d-flex flex-row justify-content-end align-items-center">
                            <input 
                            class="form-check-input mx-md-4 mx-1" 
                            type="checkbox" 
                            v-model="task.isDone" 
                            id="defaultCheck1"
                            @click="toggleTask(task)"
                            >
                            <button 
                            @click="emits('edit',{index:index,task:task})"
                            type="button" 
                            class="btn btn-info btn-floating mx-1 mx-md-4"
                            >
                                <i class="fas fa-pen"></i>
                            </button>
                            <button 
                            @click="emits('delete',{index:index,task:task})"
                            type="button" 
                            class="btn btn-danger btn-floating mx-1 mx-md-4"
                            >
                                <i class="fas fa-trash-can"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue';
import { Task } from '../model/Task.interface';
import SimpleTransitionGroup from '../components/Transition/SimpleTransitionGroup.vue'

const props = defineProps({
    tasks:{
        type:Array as PropType<Task[]>,
        required:true
    }
})

const emits = defineEmits(['edit','delete','toggle'])

const tasksDone = computed(() => {
    return props.tasks.filter((task:Task) => task.isDone === true)
})
const tasksUncompleted = computed(() => {
    return props.tasks.filter((task:Task) => task.isDone === false)
})

const textForEmptyTask = computed(() => {
    if(tasksUncompleted.value.length <1 && tasksDone.value.length>=1){
        return "Vous avez terminée toutes vos tâches, rajoutez d'autre tâche"
    }
    else if(tasksUncompleted.value.length <1 && tasksDone.value.length<1){
        return "Vous n'avez pas encore de tâche !"
    }
})

function toggleTask(task:Task){
    task.isDone = !task.isDone
}

</script>

<style scoped>
.task-undone:hover {
  filter: drop-shadow(0 0 7px #5dc4ffaa);
  transition: all 0.5s ease-in-out;
}

.task-done:hover {
  filter: drop-shadow(0 0 7px #39fd8baa);
  transition: all 0.5s ease-in-out;
}

.task-undone{
    transition: all 0.5s ease-in-out;
}

.task-done{
    transition: all 0.5s ease-in-out;
}
</style>