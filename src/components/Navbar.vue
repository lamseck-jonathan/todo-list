<template>
    <nav class="navbar navbar-light bg-white z-10">
        <div class="container-fluid d-flex flex-row justify-content-between align-items-center">
            <a class="navbar-brand" href="#">
                <img
                    src="../assets/lamseck.png"
                    class="me-2"
                    height="30"
                    alt="MDB Logo"
                    loading="lazy"
                />
                <h5 class="text-secondary text-center pt-2">TickTask</h5>
            </a>
            <button
            @click="toggleMenu"
            type="button" 
            class="btn btn-primary btn-floating"
            >
                <i 
                :class="props.menuState === false ? 'fa-solid fa-bars':'fa-solid fa-xmark'"
                >
                </i>
            </button>
        </div>
    </nav>
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
.text-theme{
    color: #1D5D9B;
}

.text-theme2{
    color:#75C2F6;
}

.bg-navbar{
    background-color:#F1EFEF
}

.z-10{
    z-index: 10;
}
</style>