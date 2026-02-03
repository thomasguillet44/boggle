import Trie from '../classes/Trie'
import mots from '../mots.txt?raw'

function strNoAccent(a) {
  return a.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
} 

function createTrie() {
  const trie = new Trie()
  const lines = mots.split('\n')

  for (const word of lines) {
    const w = strNoAccent(word.trim().toLowerCase());
    if (w.length >= 3) {
      trie.insert(w)
    }
  }

  return trie
}

export const trie = createTrie()