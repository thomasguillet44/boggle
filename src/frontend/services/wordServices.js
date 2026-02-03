// permet d'avoir une liste des directions possibles à partir d'une lettre donnée, 
// en respectant les contraintes d'adjacences
const directions = [
    [-1,-1], [-1,0], [-1,1],
    [0,-1], [0,1],
    [1,-1], [1,0], [1,1]
];

// permet de tracker les lettres deja parcourues lors de la construction d'un mot
function createVisited() {
    const visited =[
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false]
    ];

    return visited;
}

function strNoAccent(a) {
  return a.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
} 

function dfs(i, j, length, currentWord, grille, visited, trie, wordFound) {
    visited[i][j] = true;
    length++;
    currentWord += strNoAccent(grille[i][j].toLowerCase());
    
    if (!trie.startsWith(currentWord)) {
        visited[i][j]=false;
        return;
    }

    if (length >= 3 && trie.search(currentWord)) {       
        wordFound.add(currentWord); //grace au fait que ca soit un set, on a pas besoin de verifier si le mot est deja présent, l'ajout sera defacto ignoré si c'est le cas
    }

    for (const currentDir of directions) {
        const dx = currentDir[0];
        const dy = currentDir[1];

        const newPosI = i + dx;
        const newPosY = j + dy;

        if ( newPosI >= 0 && newPosI <= 3 && newPosY >= 0 && newPosY <= 3 && !visited[newPosI][newPosY]) {
            dfs(newPosI, newPosY, length, currentWord, grille, visited, trie, wordFound);
        }
    }

    visited[i][j] = false;
}

export function getWordFromGrille(grille, trie) {
    const wordFound = new Set();   
    const visited = createVisited()
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){           
            dfs(i, j, 0, "", grille, visited, trie, wordFound);
        }
    }

    return wordFound;
}