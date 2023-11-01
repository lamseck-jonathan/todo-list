<template>
    <div>
        <div 
        @click="openAddForm"
        v-if="!formActive" 
        type="button" 
        class="add-button d-flex flex-row"
        >
            <i class="fas fa-plus fa-md pr-2 pt-1 col-1"></i>
            <div class="col">
                Ajouter une tache
            </div>
        </div>
        <div 
        v-else 
        class="add-button-active d-flex flex-row justify-content-between"
        >
            <div class="align-self-start w-100">
                <div>
                    <input 
                    ref="taskInput" 
                    type="text" 
                    class="form-task" 
                    placeholder="Nom de la tache" 
                    v-model="task.name"
                    />
                </div>
            </div>
            <div class="d-flex flex-row justify-content-around">
                <div class="desktop-responsive">
                    <button 
                    type="button"
                    @click="submit" 
                    class="btn btn-primary btn-sm align-self-center mr-4"
                    >
                        Enregistrer
                    </button>
                </div>
                <div class="mobile-responsive">
                    <button 
                    type="button"
                    @click="submit" 
                    class="btn btn-primary btn-sm align-self-center mr-3"
                    >
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
                <div 
                class="align-self-center" 
                @click="closeAddForm"
                >
                    <a style="color: #3b5998;" role="button">
                        <i class="fa-solid fa-xmark"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType, Ref, ref, watch, watchEffect } from 'vue';
import { Task } from '../model/Task.interface';

const props = defineProps({
    modelValue:{
        type:Object as PropType<Task>,
        required:true
    },
})
const emits = defineEmits(['submit','update:modelValue'])

const task = ref<Task>(props.modelValue);
const formActive = ref(false)
const taskInput : Ref<HTMLInputElement | null> = ref(null);

function openAddForm(){
    formActive.value = true
    console.log("opening",taskInput.value)
    if (taskInput.value) {
        taskInput.value.focus(); // Focus the input element
    }
}

function closeAddForm(){
    formActive.value = false
}

function submit(){
    emits('submit',task.value)
}

watch(
    () => props.modelValue,
    () => {
      task.value = props.modelValue
    },
    { deep: true }
  );

watchEffect(() => {
    emits('update:modelValue', task.value)
});
</script>

<style>
.add-button{
    background-color: #f8f8f8;
    padding: 11px 15px 11px 15px;
    border: 1px solid #d6d6d6;
    border-radius: 10px;
}

.add-button-active{
    background-color: #f8f8f8;
    padding: 10px 15px 10px 15px;
    border: 1px solid #c4e9ff;
    border-radius: 10px;
}

.form-task{
    border: none; /* Remove the default border */
    outline: none;
    width: 100%;
    background-color: #f8f8f8;
}

.mobile-responsive{
    display: block;
}
.desktop-responsive{
    display: none;
}

@media (min-width:768px) {
    .mobile-responsive{
        display: none;
    }
    .desktop-responsive{
        display: block;
    }
}
</style>