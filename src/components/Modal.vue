<template>
    <SimpleTransitionGroup>
        <div 
        class="custom-modal"
        v-if="props.showModal"
        >
            <div class="overlay"></div>
            <div class="card modal-size" role="document">
                <div class="card-body">
                    <div class="modal-header">
                        {{props.modalTitle}}
                        <a @click="emits('close')" style="color: #3f3f3f;" href="#!" role="button">
                            <i class="fas fa-xmark fa-lg"></i>
                        </a>
                    </div>
                    <hr class="hr" />
                    <div class="modal-body">
                        <slot name="body"></slot>
                    </div>
                </div>
            </div>
        </div>
    </SimpleTransitionGroup>
</template>

<script setup lang="ts">
import SimpleTransitionGroup from '../components/Transition/SimpleTransitionGroup.vue';

const props = defineProps({
    showModal:{
        type:Boolean,
        default:false
    },
    modalTitle:{
        type:String,
        default:'Title'
    }
})

const emits = defineEmits(['close'])
</script>

<style scoped>
    .custom-modal{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
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

    .modal-size{
        width: 300px;
    }

    @media (min-width:600px) {
        .modal-size{
            width: 600px;
        }
    }
</style>