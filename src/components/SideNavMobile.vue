<template>
    <FromLeftTransitionGroup v-if="props.menuState == true">
        <div class="sidenav-mobile-phone p-4 d-flex flex-column justify-between">
            <div class="card-body pb-4">
                <h5 class="card-title pt-4">
                    Menu
                </h5>
                <div class="pb-4 bottom-separator-sidenav">
                    <ul class="list-group list-group-light pt-2 ">
                        <li 
                        @click="toggleMenu"
                        class="cursor-pointer list-group-item list-group-item-info px-3 border-0 rounded-3 mb-2 d-flex justify-content-between" aria-current="true">
                            <div>
                                <i class="fa-regular fa-calendar-check pr-2"></i>
                                Tache du jour
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <a 
            target="_blank" 
            href="https://lamseck-jonathan.netlify.app/"
            @click="toggleMenu"
            >
                    &copy;Company Lam Seck
            </a>
        </div>
    </FromLeftTransitionGroup>
</template>

<script setup lang="ts">
import FromLeftTransitionGroup from '../components/Transition/FromLeftTransitionGroup.vue';

const emits = defineEmits(['toggle-menu'])
const props = defineProps({
    menuState:{
        type:Boolean,
        required:true
    }
})


function toggleMenu(){
    emits('toggle-menu',!props.menuState)
}
</script>

<style>
    .sidenav-mobile-phone{
        height: 100vh;
        width: 75%;
        background-color: white;
        z-index: 1;
    }

    .bottom-separator-sidenav{
        border-bottom: 2px solid #54B4D3;
    }
    .cursor-pointer {
        cursor: pointer;
    }
    .overlay{
        background: rgba(0,0,0,0.5);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
</style>