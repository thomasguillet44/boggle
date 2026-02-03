<template>
    <input v-model=word class="input-player" type="text">
    <button :disabled="!isStarted" @click="emitsWord"> Valider </button>
</template>
<script setup>
import { ref } from 'vue';

const props = defineProps({
    isStarted: Boolean
})

const word = ref("");

const emit = defineEmits(['word'])

function resetElement() {
    word.value="";
}

const emitsWord = () => {
    emit('word', {newWord : word.value});
    resetElement();
};
</script>
<style>
.input-player {
  margin: 1vh;
  width: 50vh;
  font-size: 5vh;
}
</style>