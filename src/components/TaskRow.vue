<template>
    <ul 
    class="list-group list-group-light"
    >
        <li 
        class="mt-2"
        >
            <div 
            class="my-2 py-2 task-done bottom-separator" 
            v-for="(task,index) in props.tasks" 
            :key="task.name"
            >
                <div class="d-flex flex-row justify-content-between align-items-center">
                    <div>
                        <input 
                        class="form-check-input ml-1 mr-md-2 mr-1" 
                        type="checkbox" 
                        v-model="task.isDone" 
                        id="defaultCheck1"
                        @click="toggleTask(task)"
                        >
                            <span v-if="task.isDone">
                                <s>{{task.name}}</s>
                            </span>
                            <span v-else>
                                {{task.name}}
                            </span>
                    </div>
                    <div class="d-flex flex-row justify-content-end align-items-center">
                        <MoreButton
                        :button-id="taskRowId(index)"
                        icon="fa-solid fa-ellipsis fa-2x"
                        :dropdown-list="[]"
                        ref="dropdown"
                        @delete-task="emits('delete-task',{index:index,task:task})"
                        @edit-task="emits('edit-task',{index:index,task:task})"
                        />
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Task } from '../model/Task.interface';
import MoreButton from './MoreButton.vue';

const props = defineProps({
    tasks:{
        type:Array as PropType<Task[]>,
        required:true
    },
    isDone:{
        type:Boolean,
        default:false
    }
})

const emits = defineEmits(['toggle-task','edit-task','delete-task'])

function taskRowId(index:number){
    if(props.isDone == false){
        return 'buttonGroupUndone-' + index
    }
    else{
        return 'buttonGroupDone-' + index
    }
}

function toggleTask(task:Task){
    task.isDone = !task.isDone
}

</script>

<style>
    .bottom-separator{
        border-bottom: 2px solid #F1EFEF;
    }
</style>