<template>
    <div>
        <div class="form-group">
            <div class="mb-3">
                <input 
                    type="text" 
                    class="form-control" 
                    id="exampleInputEmail1" 
                    aria-describedby="emailHelp" 
                    placeholder="Nom de la tache"
                    v-model="task.name"
                >
            </div>
            <div class="d-flex flex-row justify-content-start justify-content-md-between align-items-center">
                <div class="col-6"></div>
                <div class="col-6 col-md-3">
                    <button class="btn btn-primary" @click="onSubmit">
                        {{props.mode === CrudAction.CREATE ? 'Ajouter' : 'Modifier'}}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch, watchEffect } from 'vue';
import { Task } from '../model/Task.interface';
import { CrudAction } from '../enums/CrudAction.enum';

const props = defineProps({
    modelValue:{
        type:Object as PropType<Task>,
        required:true
    },
    mode:{
        type:String as PropType<CrudAction>,
        required:true
    }
})

const emit = defineEmits(['update:modelValue', 'submit']);

const task = ref<Task>(props.modelValue);

function onSubmit(){
    emit('submit',task.value)
}

watch(
    () => props.modelValue,
    () => {
      task.value = props.modelValue
    },
    { deep: true }
  );
  
watchEffect(() => {
    emit('update:modelValue', task.value)
});


</script>