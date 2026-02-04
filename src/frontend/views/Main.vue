<template>
  <ModalResults 
    v-show="isModalResultsOpened"
    :wordFoundByUserLenght="wordFoundByUserLenght"
    :wordFound="wordFound"
    :score="score"
    :wordInGrille="wordInGrille"
    @close="close"
    @restart="restart"
  ></ModalResults>
  <div class="timer-container">
    <Timer @end="hasEnded" @start="isStarted = true" :isStarted="isStarted"></Timer>
  </div>
  <div class="main-grid">
    <div>
      <WordsFoundContainer :isStarted="isStarted" :wordFound="wordFound"></WordsFoundContainer>
    </div>
    <div class="grid-container">
      <DicesContainer ref="diceContainerRef" :isStarted="isStarted" :grille="grille"/>
      <InputWord :status="inputStatus" :isStarted="isStarted" @word="handleReceiptWord" @updateStatus="inputStatus = ''"></InputWord>
    </div>   
    <div>
      <WordsInGrilleContainer :isStarted="isStarted" :wordFoundByUserLenght="wordFoundByUserLenght" :wordsInGrilleLenght="wordsInGrilleLenght"></WordsInGrilleContainer>      
    </div>  
  </div>
</template>
<script setup>
import Timer from '../componants/Timer.vue';
import DicesContainer from '../componants/DicesContainer.vue';
import WordsInGrilleContainer from '../componants/WordsInGrilleContainer.vue';
import WordsFoundContainer from '../componants/WordsFoundContainer.vue';
import InputWord from '../componants/InputWord.vue';
import ModalResults from '../componants/modal/ModalResults.vue';
import {trie} from '../services/trieService'
import { getWordFromGrille } from '../services/wordServices';
import { DES_BOGGLE_4X4 } from '../enum/DES_BOGGLE_4X4';
import { ref, watch, computed } from 'vue';

const isStarted = ref(false);

//on génère la grille depuis le main 
const dices = DES_BOGGLE_4X4;

const grille = ref(
  Array.from({ length: 4 * 4 }, () => "")
);

const wordInGrille = ref(new Set());
const wordFound = ref(new Set());

const wordFoundByUserLenght = computed(() => {
  return wordFound.value.size
})
const wordsInGrilleLenght = computed(() => {
  return wordInGrille.value.size
})

const isModalResultsOpened = ref(false);

const score = ref(0);

const inputStatus = ref('');

function lettreAleatoire(dice) {  
  return dice[Math.floor(Math.random() * dice.length)];
}

function generateGrille() {
  grille.value = dices.map(dice => lettreAleatoire(dice));
}

function toGrid4x4(flatGrid) {
  const grid = []

  for (let i = 0; i < flatGrid.length; i += 4) {
    grid.push(flatGrid.slice(i, i + 4))
  }

  return grid
}

function findWordsInGrille() {
  const grid4x4 = toGrid4x4(grille.value);
  wordInGrille.value = getWordFromGrille(grid4x4, trie);
  console.log(wordInGrille.value)
}

function handleReceiptWord(data) {
  const word = data.newWord;
  if(wordInGrille.value.has(word)) {
    if(wordFound.value.has(word)) {
      inputStatus.value = 'warning';
    } else {
      wordFound.value.add(word);
      inputStatus.value = '';
    }
  } else {
    inputStatus.value = 'error';
  }
}

function calculateScore() {
  let score = 0;
  for (let word of [...wordFound.value]) { //[...] transforme en array donc iterable
    const l = word.length;
    if (l < 5) {
      score +=1;
    }
    if (l === 5) {
      score+=2;
    }
    if (l === 6) {
      score+=3;
    }
    if (l === 7) {
      score+=5;
    }
    if (l > 7) {
      score+=11;
    }
  };
  return score;
}

function resetRef() {
  grille.value = Array.from({ length: 4 * 4 }, () => "");
  wordInGrille.value = new Set();
  wordFound.value = new Set();  
}

function hasEnded() {
  score.value = calculateScore();
  isStarted.value = false;
  isModalResultsOpened.value = true;
}

function restart() {
  isModalResultsOpened.value = false;
  isStarted.value=true;
  resetRef();
}

function close() {
  isModalResultsOpened.value = false;
  resetRef();
}

watch(isStarted, (started) => {
  if (started) {
    generateGrille();
    findWordsInGrille();
  } 
})
</script>
<style scoped>
.main-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* on definit ici la structure de la grille au niveau des colonnes (3 colonnes, la colonne du milieu deux fois plus large que les deux autres) */
  gap: 16px;
  align-items: start;
  width: 100%;
}

.grid-container {
  display: grid; 
  grid-template-columns: 50vh;
  grid-template-rows: 6fr 1fr;
  justify-content: center;
}

.timer-container {
  width: 150vh;
  margin-bottom: 5vh;
}

.bloc-modale {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1002;
}
</style>