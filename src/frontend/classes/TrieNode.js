export default class TrieNode {
    constructor() {
        this.children = {}; // au niveau de chaque lettre -> un noeud enfant 
        this.isWord = false;  // passe a true si le chemin constitue un mot
    }
}