<template>
    <div>
      <section id="navbar">
        <Navbar/>
      </section>
      <section id="body" class="bg-theme window-height pt-4">
        <div class="container row">
            <div class="col-md-4">
                <SideNav/>
            </div>
            <div class="col-md-8">
                <Modal
                :modal-title="taskMode === CrudAction.CREATE ? 'Ajouter une tâche' : 'Modifier une tâche'" 
                :show-modal="showModal"
                @close="closeModal"
                >
                    <template #body>
                        <FormTask
                        :mode="taskMode"
                        v-model="taskItem"
                        @submit="onSubmit"
                        />
                    </template>
                </Modal>
                <Modal
                modal-title="Supprimer une tache" 
                :show-modal="showDeleteModal"
                @close="closeDeleteModal"
                >
                    <template #body>
                    <div>
                        <div class="pt-2">
                        Êtes vous sur de vouloir supprimer la tache nommée "{{ deletedTask }}" ? 
                        </div>
                        <div class="d-flex flex-row-reverse pt-2">
                            <button @click="confirmDelete" type="button" class="btn btn-danger">Supprimer</button>
                        </div>
                    </div>
                    </template>
                </Modal>
                <SimpleTransitionGroup>
                    <div class="header d-flex flex-row align-items-center justify-content-center justify-content-md-end">
                    <div class="col-8 col-md-3">
                        <input 
                        type="email" 
                        class="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        placeholder="Chercher une tâche"
                        v-model="searchText"
                        >
                    </div>
                    <div class="col-4 col-md-3">
                        <div class="btn btn-primary" @click="createTask">
                            Ajouter
                        </div>
                    </div>
                    </div>
                </SimpleTransitionGroup>
                <TodoList
                :tasks="filteredTaskList"
                @edit="(task:TaskItem) => onEdit(task)"
                @delete="(task:TaskItem) => openDeleteModal(task)"
                />
            </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, ref } from 'vue';
  import Navbar from '../components/Navbar.vue';
  import TodoList from '../components/TodoList.vue'
  import Modal from '../components/Modal.vue';
import SideNav from '../components/SideNav.vue';
  import FormTask from '../components/FormTask.vue';
  import {getEmptyTask, getEmptyTaskList} from '../utils/getEmptyTask'
  import { CrudAction } from '../enums/CrudAction.enum';
  import { Task,TaskItem } from '../model/Task.interface';
  import SimpleTransitionGroup from '../components/Transition/SimpleTransitionGroup.vue'
  
  const searchText = ref<String>('')
  const deletedTask = ref<String>('')
  const showModal = ref<boolean>(false)
  const showDeleteModal = ref<boolean>(false)
  const taskItem = ref(getEmptyTask())
  const taskList = ref(getEmptyTaskList())
  const selectedTaskIndex = ref(0)
  const taskMode = ref(CrudAction.CREATE)
  
  const filteredTaskList = computed(() => {
    const searchValue = searchText.value.trim(); // Remove leading/trailing whitespace
    if (searchValue !== '') {
      return taskList.value.filter(task => task.name.includes(searchText.value.toLowerCase()));
    } else {
      return taskList.value; // Return the original taskList if searchText is empty
    }
  });
  
  
  function openModal(){
    showModal.value = true
  }
  function closeModal(){
    showModal.value = false
  }
  
  function closeDeleteModal(){
    showDeleteModal.value = false
    deletedTask.value = ""
  }
  
  function createTask(){
    taskMode.value = CrudAction.CREATE
    taskItem.value = getEmptyTask(taskList.value.length+1)
    openModal()
  }
  
  function onEdit(item:TaskItem){
    console.log(item.index,item.task)
    taskItem.value = {...item.task}
    taskMode.value = CrudAction.UPDATE
    selectedTaskIndex.value = item.task.id
    openModal()
  }
  
  function openDeleteModal(item:TaskItem){
    showDeleteModal.value = true
    deletedTask.value = item.task.name
    selectedTaskIndex.value = item.task.id
  }
  
  function onSubmit(task:Task){
      switch (taskMode.value){
        case CrudAction.CREATE:
          taskList.value.push({...task})
          taskItem.value = getEmptyTask()
          closeModal();
          break;
        case CrudAction.UPDATE:
          const indexToEdit = taskList.value.findIndex(task => task.id === selectedTaskIndex.value);
  
          if (indexToEdit !== -1) {
            const taskToEdit = taskList.value[indexToEdit];
            taskToEdit.name = taskItem.value.name;
            taskItem.value = getEmptyTask();
          } else {
            console.error('Tâche avec ID ' + selectedTaskIndex.value + " n'a pas été trouvé.");
          }
          closeModal();
          break;
      }
  }
  
  function confirmDelete(){
    const indexToDelete = taskList.value.findIndex(task => task.id === selectedTaskIndex.value);
    if (indexToDelete !== -1) {
      taskList.value.splice(indexToDelete, 1);
    } 
    else {
      console.error('Task with ID '+ selectedTaskIndex.value +' not found.');
    }
    closeDeleteModal()
  }
  </script>
  
  <style scoped>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
  
  .bg-theme{
    background: #fdfdfdaa;
  }
  
  .window-height{
    min-height: 100vh;
  }
  
  .window-width{
    min-width: 100vh;
  }
  </style>
  