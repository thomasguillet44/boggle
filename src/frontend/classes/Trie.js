import TrieNode from './TrieNode.js'

export default class Trie {
    constructor() {
        this.root = new TrieNode(); //le point de depart de notre trie est un noeud
    }

    // on va parcourir le trie noeud par noeud et enfant de noeud par enfant de noeud pour ajouter le nouveau 
    // mot a partir des mots deja existants, c'est a dire avec les mots dont le prefixes est commun 
    insert(word) {
        let node = this.root; 
        for (const char of word) {
            if (!node.children[char]) { 
                node.children[char] = new TrieNode(); 
            }

            node = node.children[char];
        }
        node.isWord = true;
    }

    search(word) {
        let node = this.root; 
        for (const char of word) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return node.isWord; //si on arrive ici on a true uniquement si le mot est complet, on aura false si on un debut de mot qui existe mais pas complété
    }

    startsWith(prefix) {
        let node = this.root;
        for (const char of prefix) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return true; // la seule différence avec search classique, si incomplet return true quand meme
    }


}