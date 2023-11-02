<template>
    <Transition name="animation" appear>
        <div class="list-task container">
            <div class="d-flex flex-row justify-content-start align-items-center"> 
                <h5 class="text-theme pt-3 ml-3">
                    {{ listeTitle }}
                </h5>
                <span class="badge badge-info mt-2 ml-3">
                    {{ taskCount }} 
                    {{taskCount > 1 ? 'Tâches' : 'Tâche'}}
                </span> 
            </div>
            
            <AddButton
            class="px-3 py-3"
            v-if="props.typeList == TypeList.UNDONE"
            v-model="taskItem"
            @submit="((item :Task) => submitTask(item))"
            />
            <TaskRow
            :is-done="isDone"
            class="pb-4 px-3"
            :tasks="taskList.value"
            @delete-task="((item :Task) => emits('delete-task',item))"
            @edit-task="((item :Task) => emits('edit-task',item))"
            />
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { PropType, computed, ref } from 'vue';
import { getEmptyTask } from '../utils/getEmptyTask';
import TaskRow from './TaskRow.vue';
import AddButton from './AddButton.vue';
import { Task } from '../model/Task.interface';
import { TypeList } from '../enums/TypeList.enum';

const props = defineProps({
    tasks:{
        type:Array as PropType<Task[]>,
        required:true
    },
    typeList:{
        type: String,
        required:true
    }
})
const taskItem = ref(getEmptyTask())
const emits = defineEmits(['submit-task','edit-task','delete-task'])
const listeTitle = computed(() => {
    return  props.typeList == TypeList.UNDONE ? 'A FAIRE' : 'TERMINEE'
})
const isDone = computed(() => {
    return  props.typeList == TypeList.UNDONE ? false : true
})
const taskList = computed(() => {
    return props.typeList == TypeList.DONE ? tasksCompleted : tasksUncompleted
})
const tasksCompleted = computed(() => {
    return props.tasks.filter((task:Task) => task.isDone === true)
})
const tasksUncompleted = computed(() => {
    return props.tasks.filter((task:Task) => task.isDone === false)
})
const taskCount = computed(() => {
    return props.typeList == TypeList.DONE ? tasksCompleted.value.length : tasksUncompleted.value.length
})


function submitTask(item :Task){
    emits('submit-task',item)
    taskItem.value = getEmptyTask()
}
</script>

<style>
.list-task{
    border:2px solid #dadada;
    border-radius: 10px;
    background-color: white;
    transition: all 0.5s ease;
}

.text-theme{
    color: #015b97;
  }

    .animation-enter-from{
        opacity: 0;
        transform: scale(0.6);
    }
    .animation-enter-to{
        opacity: 1;
        transform: scale(1);
    }
    .animation-enter-active{
        transition: all 0.2s ease;
    }

    .animation-leave-from{
        opacity: 1;
        transform: scale(1);
    }
    .animation-leave-to{
        opacity: 0;
        transform: scale(0.6);
    }
    .animation-leave-active{
        transition: all 0.2s ease;
        position: absolute;
    }
    .animation-move{
        transition: all 0.3s ease;
    }
</style>