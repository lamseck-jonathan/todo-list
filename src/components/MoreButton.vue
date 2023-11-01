<template>
    <div>
        <button
        @click="toggleButton"
        :id="props.buttonId"
        type="button"
        class="btn btn-link"
        data-mdb-toggle="dropdown"
        aria-expanded="false"
        >
            <i v-if="props.icon" :class="props.icon"></i>
            {{props.buttonLabel}}
        </button>
        <ul 
        v-if="active == true" 
        class="more-list py-2"
        >
            <li 
            class="py-1"
            @click="emits('edit-task')">
                <a class="dropdown-item" href="#">
                    <i class="fas fa-pen"></i>
                    Modifier
                </a>
            </li>
            <li 
            class="py-1"
            @click="emits('delete-task')">
                <a class="dropdown-item" href="#">
                    <i class="fas fa-trash-can"></i>
                    Supprimer
                </a>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

    const props = defineProps({
        buttonId:{
            type:String,
            required:true
        },
        buttonLabel:{
            type:String,
            default:''
        },
        icon:{
            type:String,
        },
        dropdownList:{
            type:Array,
            required:true
        }
})  

const emits = defineEmits(['edit-task','delete-task'])

const active = ref(false)

function toggleButton(){
    
    if(active.value == true){
        active.value = false
    }
    else{
        active.value = true
    }
    console.log(active.value)
}

onMounted(() => {
  document.addEventListener('click', closeDropdown);
});

// Remove the click event listener when the component is unmounted
onUnmounted(() => {
  document.removeEventListener('click', closeDropdown);
});

// Close the dropdown if a click occurs outside the component
const closeDropdown = (event: MouseEvent) => {
  if (active.value) {
    const dropdown = document.getElementById(props.buttonId) as HTMLElement;

    if (dropdown && !dropdown.contains(event.target as Node)) {
      active.value = false;
    }
  }
};
</script>

<style>
    .more-list{
        position: absolute;
        right:0;
        z-index: 1;
        background-color: white;
        border-radius: 5px;
        border: 1px solid #F1EFEF;
        padding-right: 30px;
    }
</style>