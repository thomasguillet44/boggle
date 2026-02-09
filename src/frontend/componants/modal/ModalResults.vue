<template>
    <div class="bloc-modale">
        <div class="overlay"></div>
        <div class="modale">
            <h2 class="modale-title">Resultats</h2>
            <div class="text-word-found"><span class="highlight">{{ wordFoundByUserLenght }}</span> mots trouvés dans la grille</div>
            <div class="score-container">
                <div class="score">{{ score }} pts</div>
            </div>
            <div class="words-in-grillle-title">Mots présents dans la grille :</div>
            <div class="words-container">
                <div class="word-in-grid" v-for="word in [...wordInGrille]">
                    {{ word }}
                </div>
            </div>
            <div class="button-container">
                <button class="button leave-button" @click="emitsClose">X</button>
                <button class="button replay-button" @click="emitsReplay">⟳</button>
            </div>
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

.words-container {
    max-height: 50vh;
    overflow-y: auto; 
    margin: 1vh 0;
    padding: 1vh;
    background: rgba(255, 107, 245, 0.12);
    border-radius: 6px;
    font-size: 1.1rem;
}

.modale-title {
    display: flex;
    justify-content: center;
}

.text-word-found {
    margin: 1vh 0;
    padding: 1vh;
    background: rgba(255, 107, 245, 0.12);
    border-radius: 6px;
    font-size: 1.1rem;
}

.text-word-found .highlight {
    font-weight: bold;
    color: rgb(216, 46, 160);
}

.score {
    font-size: 10vh;
    margin: 1vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    padding: 1vh;
    width: 30vh;   
    animation: pulse 1.8s infinite ease-in-out;
}

.score-container {
    display: flex;
    justify-content: center;
}

.button {
    margin: 3px;
    padding: 2px;
    width: 10vh;
}

.button-container {
    display: flex;
    justify-content: end;
    margin: 1vh;
}

.leave-button {
    color: white;
    background-color: rgb(216, 46, 46);
    border-radius: 5px;
    border: 0px;
}

.replay-button {
    color: white;
    background-color: rgb(63, 120, 39);
    border-radius: 5px;
    border: 0px;
}

.leave-button:hover {
    background-color: rgb(250, 15, 15);
    cursor: pointer;
}

.replay-button:hover {
    background-color: green;
    cursor: pointer;
}

.words-in-grillle-title {
    margin-top: 2vh;
    margin-bottom: 1vh;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.9rem;
    letter-spacing: 1px;
    color: rgb(120, 60, 115);
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}
</style>