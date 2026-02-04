<template>
    <div class="bloc-modale">
        <div class="overlay"></div>
        <div class="modale">
            <h2 class="modale-title">Resultats</h2>
            <div>{{ wordFoundByUserLenght }} mots trouvés dans la grille</div>
            <div>{{ score }}</div>
            <div>
                {{ [...wordInGrille] }}
            </div>
            <button class="leave-button" @click="emitsClose">Quitter</button>
            <button class="replay-button" @click="emitsReplay">Rejouer</button>
        </div>
    </div> 
</template>
<script setup>
const props = defineProps({
    wordFoundByUserLenght: Number,
    wordFound: Object,
    score: Number,
    wordInGrille: Object
})

const emits = defineEmits(['close', 'restart'])

function emitsClose() {
    emits('close');
}

function emitsReplay() {
    emits('restart');
}
</script>
<style>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}

.modale {
  position: relative;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
  padding: 30px;
  z-index: 1;
}
</style>