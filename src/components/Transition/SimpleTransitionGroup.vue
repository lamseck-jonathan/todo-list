<template>
    <transition-group name="simple" appear>
        <slot></slot>
    </transition-group>
</template>

<script setup lang="ts">

</script>

<style>
    .simple-enter-from{
        opacity: 0;
    }
    .simple-enter-to{
        opacity: 1;
    }
    .simple-enter-active{
        transition: all 0.5s ease-in-out;
    }
</style>