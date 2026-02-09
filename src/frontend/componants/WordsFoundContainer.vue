<template>
    <div v-show ="isStarted" class="words-found-container">
        <div class="word-found" v-for="word in [...wordFound]" :key="word">
            {{ word }}
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    isStarted: Boolean,
    wordFound: Set
})
</script>
<style>
.words-found-container {
    display: grid;
    grid-template-rows: repeat(8, 1fr);
    grid-template-columns: repeat(3, 1fr);
    margin: 5px;
    padding: 5px;
    border: 3px solid black;
    border-radius: 6px;
    height: 50vh;
    overflow-y: auto;
}

.word-found {
    font-size: 5vh;
}
</style>