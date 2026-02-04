<template>
    <div class="grid">
        <DiceLetter 
            v-for="(letter, index) in grille"
            :key="index"
            class="cell"
            :letter="letter"
            :isStarted="isStarted"/>
    </div>
</template>
<script setup>
import DiceLetter from '../componants/DiceLetter.vue';

const props = defineProps({
    isStarted: Boolean,
    grille: Object
})
</script>
<style>
.grid {
    display: grid;
    gap: 0.5vh;
    grid-template-columns: repeat(4, 1fr);
}

.cell {
    aspect-ratio: 1 / 1;
    display: grid;
    place-items: center;
    margin: 0;
}
</style>