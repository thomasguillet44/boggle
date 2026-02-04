<template>
  <div v-show ="isStarted" class="number-word-found-container">
    <div class="number-word-found">{{wordFoundByUserLenght}} / {{ wordsInGrilleLenght }}</div>
  </div>
</template>
<script setup>
const props = defineProps({
  isStarted: Boolean,
  wordFoundByUserLenght: Number,
  wordsInGrilleLenght: Number
});
</script>
<style>
.number-word-found-container {
  display: flex;
  justify-content: center;
  height: 50vh;
  align-items: center;
}

.number-word-found {
  font-size: 13vh;
  font-family:fantasy;
}
</style>