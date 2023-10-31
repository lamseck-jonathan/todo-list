<template>
    <transition-group name="fromleft" appear>
        <slot></slot>
    </transition-group>
</template>

<script setup lang="ts">

</script>

<style>
    .fromleft-enter-from{
        opacity: 0;
    }
    .fromleft-enter-to{
        opacity: 1;
    }
    .fromleft-enter-active{

        animation: fromleft 0.8s ease;
    }

    @keyframes fromleft{
        0% {transform: translateX(-80px);opacity: 0}
        100% {transform: translateX(0px);opacity: 1}
    }
</style>