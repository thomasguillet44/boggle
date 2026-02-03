<template>
    {{wordFoundByUserLenght}} / {{ wordsInGrilleLenght }}
</template>
<script setup>
const props = defineProps({
  wordFoundByUserLenght: Number,
  wordsInGrilleLenght: Number
});
</script>