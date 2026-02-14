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
    display: flex;
    flex-direction: column;
    margin: 5px;
    padding: 5px;
    border: 3px solid black;
    border-radius: 6px;
    height: 50dvh;
    overflow-y: auto;
}

@media (min-width: 769px) {
    .words-found-container {
        display: grid;
        height: 50vh;
        grid-template-rows: repeat(8, 1fr);
        grid-template-columns: repeat(3, 1fr);
    }
}

.word-found {
    font-size: 5vh;
}
</style>