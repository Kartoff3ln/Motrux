import {createStore} from 'vuex'

export const store = createStore({
    state() {
        return {
            targetWord: '', // Mot choppé grâce à l'API
            words: [], // liste des mots essayés
            maxAttempts: 6, // nb d'essais max
            currentAttempt: '', // essai en cours
            isWordValid: true, // Check si le mot rentré est valide
            gameState: '', // résultat de la partie
            letters: [], // liste des lettres
            
            tmp_min : 0,
            tmp_snd : 0,

            historique_nbPartie : 0,
            historique_tempsMoyen : [0, 0],
            historique_tentativeMoyenne : 0,
            historique_winRate : [0, 0],
            historique_lesParties: [], // {date : "", nbTentative : 0, tmpJeux : "", typeFinPartie : "", mot : ""}

            isChono : 0,
        }
    },

    getters: {
        getState(state){
            return state.words;
        },
        getAttemptsLeft(state){
            return state.maxAttempts - state.words.length; //Chopper le nombre d'essais restant
        },
        getGameState(state){
            return state.gameState;

        },
        getLetterStatus(state){ // Chopper le statut des lettres
            return state.letters;
        },
        getHistorique_tempMoy(state) {
            return state.historique_tempsMoyen;
        },
        getHistorique_tentativeMoy(state) {
            return state.historique_tentativeMoyenne;
        },
        getHistorique_winRate(state) {
            return state.historique_winRate;
        },
        getHistorique_lesParties(state) {
            return state.historique_lesParties;
        },
        getisChrono(state){
          return state.isChono;
        },
    },

    mutations: {
        SetTargetWord(state, word){ // Fonction qui stock le mot généré par l'API
            state.targetWord = word;
        },
        AddWord(state, word){ // Fonction qui stock les mots essayés
            if (state.words.length < state.maxAttempts){
                state.words.push(word);
                state.currentAttempt = '';
            }
        },
        UpdateCurrentAttempt(state, letter) { // Fonction qui ajoute la lettre entrée au mot de l'essai en cours
            if (state.currentAttempt.length < state.targetWord.length) {
                state.currentAttempt += letter;
            }
        },
        RemoveLastLetter(state){ // Fonction qui supprime la dernière lettre entrée au mot de l'essai en cours
            state.currentAttempt = state.currentAttempt.slice(0, -1);
        },
        SetWordValid(state, isValid){ // Fonction qui stock si le mot entré est valide ou pas
            state.isWordValid = isValid;
        },

        ResetGame(state){ // Reset la game donc le store
            //state.targetWord = '';
            state.words = [];
            state.currentAttempt = '';
            state.isWordValid = true;
            state.gameState = '';
            state.letters = [];
        },

        SetGameState(state, gameState){
            state.gameState = gameState;
        },

        SetLetterStatus(state, letterStatus){
            state.letters.push(letterStatus);
        },
            
        setTmp_min(state, s_min){
            state.tmp_min = 9 - s_min;
        },

        setTmp_snd(state, s_snd){
            console.log(s_snd);
            if(s_snd === 0){
                state.tmp_snd = 0;
                state.tmp_min += 1;
            }
            else {
                state.tmp_snd = 60 - s_snd;
            }

        },

        setIsChrono(state, n){
          state.isChono = n
        },

        SetHistorique(state) {
            state.historique_nbPartie += 1;

            if(state.gameState === 'Victoire') {
                state.historique_winRate[0] += 1;
            }
            else{
                state.historique_winRate[1] += 1;
            }

            let mintemp = (state.tmp_min + state.historique_tempsMoyen[0] * (state.historique_nbPartie - 1)) / state.historique_nbPartie;
            let sndtemp =  (state.tmp_snd + state.historique_tempsMoyen[1] * (state.historique_nbPartie - 1)) / state.historique_nbPartie;
            if(mintemp % 1 !== 0){
                let str_mintemp = mintemp.toFixed(2);
                let temp = (str_mintemp+"").split('.');
                let retenu = parseInt(temp[1]);
                if(temp[1].length === 1){
                    retenu = retenu*10;
                }
                if(retenu >= 0){
                    sndtemp += 60*(retenu/100);
                    if(sndtemp >= 60){
                        mintemp += 1;
                        sndtemp -= 60;
                    }
                }
                mintemp = Math.trunc(mintemp);
            }
            if(sndtemp % 1 !== 0){
                sndtemp = Math.ceil(sndtemp);
            }
            state.historique_tempsMoyen[0] = mintemp;
            state.historique_tempsMoyen[1] = sndtemp;

            state.historique_tentativeMoyenne = Math.ceil(state.historique_tentativeMoyenne * (1/state.historique_nbPartie) + state.words.length * (1/state.historique_nbPartie));

            let date = new Date().toLocaleDateString();
            let newPartie = {date : date, nbTentative : state.words.length, tmpJeux : state.tmp_min + ":" + state.tmp_snd, typeFinPartie : state.gameState, mot : state.targetWord};
            state.historique_lesParties.push(newPartie);
        },
    },
})
