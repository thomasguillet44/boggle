<template>
    <div class="clock">
        <div class="progress" :class="{ active: isStarted }"></div>
        <div  class="button-start-container">
            <button v-if="!isStarted" @click="emitStart" class="button-start">▶</button>
        </div>
    </div>
</template>
<script setup>
import { watch } from 'vue';

const props = defineProps({
  isStarted: Boolean
})

const emit = defineEmits(['start', 'end']);

// timer id pour eviter l'exister parallele de deux timer, 
// au cas plus tard on veut ajouter la possibilité de restart en cours de partie (idem pour le reset)
let timerId = null

function emitStart() {
  emit('start');
}

function startTimer() {
  clearTimeout(timerId);

  timerId = setTimeout(() => {
    emit('end');
  }, 180000);
}

function resetTimer() {
  clearTimeout(timerId)
  timerId = null
}

watch(() => props.isStarted, (started) => {
    if (started) {
      startTimer()
    } else {
      resetTimer()
    }
  }
)
</script>
<style scoped>
.clock {
    position: relative;
    width: 100%;
    height: 10vh;
    background-color: #feb6fa;
    overflow: hidden;
    border: 5px solid antiquewhite;
    border-radius: 10px;
}

.progress {
  position: absolute;
  inset: 0;
  background-color: antiquewhite;
  transform: scaleX(0);
  transform-origin: left;
}

.progress.active {
  animation: fill 180s linear forwards;
}

@keyframes fill {
  to {
    transform: scaleX(1);
  }
}

.button-start-container {
    display: flex;
    justify-content: center;
    height: 100%;
}

.button-start {
  border: none;
  background-color: #feb6fa;
  color: antiquewhite;
  width: 100%;
  font-size: 5vh;
}

.button-start:hover{
  background-color: #f9cef7;
  cursor: pointer;
  transform: translateY(-2px) translateX(-2px);
}
</style>