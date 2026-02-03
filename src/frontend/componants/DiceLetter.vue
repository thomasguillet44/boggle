<template>
    <div class="letter" :style="{ transform: randomRotate }" >{{ isStarted ? letter : "?"}}</div>
</template>
<script setup>
const props = defineProps({
    letter: String,
    isStarted: Boolean
})

const rotatePossibilities = ["rotate(0deg)", "rotate(90deg)", "rotate(180deg)", "rotate(270deg)"];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const randomRotate = rotatePossibilities[getRandomInt(4)]; 
</script>
<style scoped>
.letter {
    font-size: 8vh;
    font-weight: 900;
    border: 2px solid black;
    border-radius: 5px;
}
</style>