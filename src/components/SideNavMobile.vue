<template>
    <Transition name="fromleft" mode="in-out">
        <div v-if="props.menuState" class="sidenav-mobile-phone p-4 d-flex flex-column justify-between">
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
    </Transition>
</template>

<script setup lang="ts">
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

    .fromleft-enter-from{
        opacity: 1;
        transform: translateX(-100%);
    }
    .fromleft-enter-to{
        opacity: 1;
        transform: translateX(0);
    }
    .fromleft-enter-active{
        transition: all 0.2s ease;
    }

    .fromleft-leave-from{
        opacity: 1;
        transform: translateX(0);
    }
    .fromleft-leave-to{
        opacity: 1;
        transform: translateX(-100%);
    }
    .fromleft-leave-active{
        transition: all 0.2s ease;
    }
    .fromleft-move{
        transition: all 0.3s ease;
    }
</style>