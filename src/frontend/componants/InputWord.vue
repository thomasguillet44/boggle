<template>
    <div class="flex-container">
        <input v-model=word class="input-player" :class="statusClass" type="text" @keyup.enter="emitsWord">
        <button class="input-word-button" :disabled="!isStarted" @click="emitsWord"> ✓ </button>
    </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
    isStarted: Boolean,
    status: String
})

const word = ref("");

const emit = defineEmits(['word', 'updateStatus'])

function resetElement() {
    word.value="";
}

const emitsWord = () => {
    if(props.isStarted) {
        emit('word', {newWord : word.value.toLowerCase()});
        resetElement();
    }
};

// computed pour determiner si l'utilisateur a envoyé un mot erroné, et animer en fonction l'input
const statusClass = computed(() => {
  return {
    'input-error': props.status === 'error',
    'input-warning': props.status === 'warning'
  }
});

watch(() => props.status, (val) => {
  if (val) {
    setTimeout(() => emit('updateStatus'), 500);
  }
});
</script>
<style>
.flex-container {
    display: flex;
    justify-content: center;
}

.input-player {
  margin: 1vh;
  width: 35vh;
  font-size: 5vh;
  border-radius: 6px;
}

.input-word-button { 
    width: 10vh; 
    margin-top: 1vh;
    margin-bottom: 1vh;
    padding: 0.5em 1em;
    font-size: 2.5vh;
    border-radius: 6px;
    border: none;
    background-color:#b7eda5;
    cursor: pointer;
    color: black;
}

.input-word-button:hover {
  background-color: #b2ffa8;
  transform: translateY(-1px);
}

@keyframes shake {
  0% { transform: translateX(0); }
  20% { transform: translateX(-5px); }
  40% { transform: translateX(5px); }
  60% { transform: translateX(-5px); }
  80% { transform: translateX(5px); }
  100% { transform: translateX(0); }
}

.input-error {
  animation: shake 0.3s;
}

.input-warning {
  animation: shake 0.3s;
}
</style>