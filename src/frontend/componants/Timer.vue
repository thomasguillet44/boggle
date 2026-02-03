<template>
    <div class="clock">
        <div class="progress" :class="{ active: isStarted }"></div>
        <div  class="button-start-container">
            <button v-if="!isStarted" @click="start" class="button-start">▶</button>
        </div>
    </div>
</template>
<script setup>
import { ref} from 'vue';

const isStarted = ref(false);

const emit = defineEmits(['start']);

async function start() {
  isStarted.value = false;

  isStarted.value = true;

  emit('start');

  setTimeout(() => {
    isStarted.value = false;
  }, 180000);
}

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
}
</style>