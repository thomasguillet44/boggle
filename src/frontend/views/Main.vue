<template>
  <div class="main-grid">
    <div>
      <WordsFoundContainer :wordFound="wordFound"></WordsFoundContainer>
    </div>
    <div>
      <DicesContainer class="dices-container" ref="diceContainerRef" :isStarted="isStarted" :grille="grille"/>
      <InputWord :isStarted="isStarted" @word="handleReceiptWord"></InputWord>
    </div>   
    <div>
      <WordsInGrilleContainer :wordFoundByUserLenght="wordFoundByUserLenght" :wordsInGrilleLenght="wordsInGrilleLenght"></WordsInGrilleContainer>      
    </div>  
  </div>
</template>
<script setup>
import DicesContainer from './DicesContainer.vue';
import WordsInGrilleContainer from '../componants/WordsInGrilleContainer.vue';
import WordsFoundContainer from '../componants/WordsFoundContainer.vue';
import InputWord from '../componants/InputWord.vue';
import {trie} from '../services/trieService'
import { getWordFromGrille } from '../services/wordServices';
import { DES_BOGGLE_4X4 } from '../enum/DES_BOGGLE_4X4';
import { ref, watch, computed } from 'vue';

const props = defineProps({
  isStarted: Boolean
});

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
      console.log("mot deja trouvé")
    } else {
      wordFound.value.add(word);
    }
  } else {
    console.log("mot absent de la grille")
  }
}

watch(() => props.isStarted, (started) => {
  if (started) {
    generateGrille();
    findWordsInGrille();
  } 
})
</script>
<style scoped>
.main-grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* on definit ici la structure de la grille au niveau des colonnes (3 colonnes, la colonne du milieu deux fois plus large que les deux autres) */
  gap: 16px;
  align-items: start;
}

.dices-container {
  margin: 0.5vh; 
}
</style>