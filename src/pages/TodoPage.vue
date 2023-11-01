<template>
    <div>
      <section id="header" class="navbar-mobile">
        <Navbar 
        @toggle-menu="(state:boolean) => toggleMenu(state)"
        :menu-state="menuState"
        />
      </section>
      <section id="body" class="bg-theme window-height">
        <div class="container-fluid row">
            <div 
              v-if="menuState == true"
              class="sidenav-mobile" 
              style="padding: 0;"
            >
                <SideNavMobile
                @toggle-menu="(state:boolean) => toggleMenu(state)"
                :menu-state="menuState"
                />
            </div>
            <div 
            class="col-md-3 sidenav-big-screen" 
            style="padding: 0;"
            >
                <SideNav/>
            </div>
            <div 
            class="col-12 col-md-9 pt-4"
            >
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

                <div v-if="menuState == true" class="overlay"></div>

                <h4 class="text-theme2">
                  Tâche du jour
                </h4>
                <ListTask
                :type-list="TypeList.UNDONE"
                :tasks="taskList"
                @submit-task="onSubmit"
                @edit-task="(task:TaskItem) => onEdit(task)"
                @delete-task="(task:TaskItem) => openDeleteModal(task)"
                />
                <ListTask
                class="mt-4"
                :type-list="TypeList.DONE"
                :tasks="taskList"
                @submit-task="onSubmit"
                @edit-task="(task:TaskItem) => onEdit(task)"
                @delete-task="(task:TaskItem) => openDeleteModal(task)"
                />
            </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  //import Navbar from '../components/Navbar.vue';
  import ListTask from '../components/ListTask.vue'
  import Modal from '../components/Modal.vue';
  import SideNav from '../components/SideNav.vue';
  import SideNavMobile from '../components/SideNavMobile.vue';
  import FormTask from '../components/FormTask.vue';
  import {getEmptyTask, getEmptyTaskList} from '../utils/getEmptyTask'
  import { CrudAction } from '../enums/CrudAction.enum';
  import { Task,TaskItem } from '../model/Task.interface';
  import { TypeList } from '../enums/TypeList.enum';
  import Navbar from '../components/Navbar.vue';
  
  const deletedTask = ref<String>('')
  const showModal = ref<boolean>(false)
  const showDeleteModal = ref<boolean>(false)
  const taskItem = ref(getEmptyTask())
  const taskList = ref(getEmptyTaskList())
  const selectedTaskIndex = ref(0)
  const taskMode = ref(CrudAction.CREATE)
  const menuState = ref(false)
  
  function toggleMenu(state:boolean){
    console.log(state)
    menuState.value = state
  }
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
    console.log('submitted',task);
      switch (taskMode.value){
        case CrudAction.CREATE:
            if(task.name != ''){
              addTask(task,taskList.value)
            }
            break;
        case CrudAction.UPDATE:
            editTask(task,taskList.value)
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

  function addTask(task: Task, tasks: Task[]) {
    const lastTask = tasks.length > 0 ? tasks[tasks.length - 1] : null;
    task.id = lastTask ? lastTask.id + 1 : 1;
    taskList.value.push({ ...task });
  }

  function editTask(task:Task,tasks:Task[]){
    const indexToEdit = tasks.findIndex(task => task.id === selectedTaskIndex.value);
    
    if (indexToEdit !== -1) {
      const taskToEdit = tasks[indexToEdit];
      taskToEdit.name = task.name;
      taskItem.value = getEmptyTask();
    }
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
    background: #E8F1F5;
  }

  .bg-theme2{
    background: #004A7C;
  }

  .text-theme2{
    color: #004A7C;
  }
  
  .window-height{
    min-height: 100vh;
  }
  
  .window-width{
    min-width: 100vh;
  }

  .navbar-mobile{
    display: block;
  }

  .sidenav-big-screen{
    display: none;
  }

  .sidenav-mobile{
      display: block;
      position: absolute;
      z-index: 1;
  }

  .overlay{
      background: rgba(0,0,0,0.5);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
  }

  @media (min-width:768px) {
    .navbar-mobile{
      display: none;
    }
    .sidenav-big-screen{
      display: block;
    }
  }
  </style>
  