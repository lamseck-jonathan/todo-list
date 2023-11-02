<template>
    <TransitionGroup name="fromleft">
        <slot></slot>
    </TransitionGroup>
</template>

<script setup lang="ts">

</script>

<style>
    .fromleft-enter-active {
        animation: fromleft 0.8s ease;
    }

    .fromleft-leave-active {
        animation: fromRight 0.8s ease; /* Use the same animation for leave as well */
    }

    /*.fromleft-enter-from,
    .fromleft-enter-to,
    .fromleft-leave-from,
    .fromleft-leave-to {
        opacity: 1;
        transform: translateX(-100%);
    }*/

    @keyframes fromleft {
        0% {
            transform: translateX(-100%);
            opacity: 1;
        }
        100% {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes fromRight {
        0% {
            transform: translateX(0);
            opacity: 1;
        }
        100% {
            transform: translateX(-100%);
            opacity: 1;
        }
    }
</style>
