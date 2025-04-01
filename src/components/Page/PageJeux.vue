<template>
  <div class="animated-background">
    <div class="page-container2">
      <div class="side-left-card">
        <goHome />
      </div>
      <div class="main-card">
        <p class="title2">{{ Title }}</p>
        <GrilleMots :grille="grille" :LetterStatus="letters"/>
        <ClavierVirtu @key-press="handleKeyPress" />
      </div>
      <div class="side-right-card">
        <div v-if="MsgError" class="msgerror">
          {{ MsgError }}
        </div>
        <Chrono/>
        <Surrend/>
      </div>
      <MotATrouver/>
      <Mots/>
      <MotValide ref="motValide"/>
      <StatutLettre/>
    </div>
  </div>
</template>

<script>
import goHome from "@/components/Bouton/goHome.vue";
import GrilleMots from "@/components/Text_et_Saisie/GrilleMots.vue";
import ClavierVirtu from "@/components/Text_et_Saisie/ClavierVirtu.vue";
import Chrono from "@/components/Text_et_Saisie/Chrono.vue";
import Surrend from "@/components/Bouton/Surrend.vue";
import Mots from "@/components/Text_et_Saisie/Mots.vue";
import MotValide from "@/components/Text_et_Saisie/MotValide.vue";
import MotATrouver from "@/components/Text_et_Saisie/MotATrouver.vue";
import StatutLettre from "@/components/Text_et_Saisie/StatutLettre.vue";

import {mapState, mapMutations, mapGetters} from "vuex";

export default {
  name: 'PageJeux',
  components: {
    Surrend,
    Chrono,
    ClavierVirtu,
    GrilleMots,
    goHome,
    Mots,
    MotATrouver,
    MotValide,
    StatutLettre,
  },
  data() {
    return {
      Title: "TROUVE LE MOT !",
      grille: Array.from({ length: 6 }, () => Array(5).fill("")), // Initialisation de la grille vide
      currentRow: 0,
      currentCol: 0,
      MsgError: "",
    };
  },
  computed: {
    ...mapState([
        "currentAttempt",
        "targetWord",
        "words",
        "maxAttempts",
        "letters",
    ]), // Connexion au store
    ...mapGetters([
        "getAttemptsLeft",
        "getGameState",
        "getLetterStatus",
        "getState"
    ]),
  },
  methods: {
    ...mapMutations([
        "AddWord",
        "RemoveLastLetter",
        "UpdateCurrentAttempt",
        "ResetGame",
        "SetGameState",
        "SetLetterStatus",
        "SetHistorique",
        "setIsChrono",
    ]),
    UpdateGameState(){
      let gameStatus = this.getGameState;
      if (this.words.includes(this.targetWord)){
        gameStatus = 'Victoire';
        this.SetGameState(gameStatus);
      } else if (this.words.length >= this.maxAttempts){
        gameStatus = 'Defaite';
        this.SetGameState(gameStatus);

      }
      console.log("GameState:", this.getGameState)
    },
    restartGame() {
      // Réinitialiser la game
      this.ResetGame();
      this.grille = Array.from({ length: 6 }, () => Array(5).fill("")); // Réinitialiser la grille
      this.currentRow = 0;
      this.currentCol = 0;
    },
    FinDeGame(){
      console.log("Mot cible avant fin de partie :", this.$store.state.targetWord);
      if(this.getGameState === 'Victoire'){
        this.setIsChrono(0);
        this.SetHistorique();
        setTimeout(() => {
          this.$router.push({ name: "Victoire" });
          this.restartGame();
        }, 2000);
        
      } else if(this.getGameState === 'Defaite') {
        this.setIsChrono(0);
        this.SetHistorique()
        setTimeout(() => {
          this.$router.push({ name: "Defaite" });
          this.restartGame();
        }, 2000);
      }
    },

  UpdateLetterStatus(){
    const lastAttempt = this.words[this.words.length -1];
    console.log("Dernier essai",lastAttempt);
    const wordStatus = Array(5).fill(2); // La liste de statut des mots essayés, par défault, on initialise à 2
    const targetWordStatus = Array(5).fill(false); // La liste de statut du mot recherché. Initialisée à False.
    lastAttempt.split('').map((letter, id) => { // On convertit le mot en un tableau de lettres séparés avec leur id
      if (letter === this.targetWord[id]) { // Lettre bien placée
        wordStatus[id] = 0;
        targetWordStatus[id] = true;
      } else if (this.targetWord.includes(letter)) { // Lettre mal placée mais dans le mot
        for(let j = 0; j < this.targetWord.length; j++) {
          if(this.targetWord[j] === letter && !targetWordStatus[j]){ // On vérifie que la lettre n'a pas déjà été marquée comme bien placée
            wordStatus[id] = 1;
            targetWordStatus[j] = true; // On marque true ici s'il reste une occurence de la lettre dans le mot
            break;
          }
        }
      } else {
        wordStatus[id] = 2; // Lettre pas dans le mot
      }
        })
          this.SetLetterStatus(wordStatus);
          console.log("letterStatus: ", wordStatus);
          console.log("letters", this.getLetterStatus);
  },
    
    async submitAttempt() {
      const motValideRef = this.$refs.motValide;
      // Vérification via l'API si le mot est valide
      if (motValideRef && typeof motValideRef.verifWord === "function") {
        const isValid = await motValideRef.verifWord(this.currentAttempt);
        if (isValid) {
          this.MsgError = "";
          this.AddWord(this.currentAttempt); // Ajouter le mot au store
          this.UpdateLetterStatus();
          this.UpdateGameState();
          this.FinDeGame();
          this.currentRow++; // Passer à la ligne suivante dans la grille
          this.currentCol = 0; // Réinitialiser la colonne
        } else {
          this.MsgError = "Votre mot n'est pas dans le dictionnaire";
        }
      }

      console.log("Tentative :", this.currentAttempt);
      console.log("Composant MotValide :", motValideRef);
    },
    handleKeyPress(key) {
      // Gestion des entrées clavier
      if (key === "←" || key === "Backspace") {
        // Suppression d'une lettre
        if (this.currentCol > 0) {
          this.currentCol--;
          this.grille[this.currentRow][this.currentCol] = "";
          this.RemoveLastLetter();
        }
      } else if (key === "↵" || key === "Enter") {
        // Validation du mot
        if (this.currentCol === 5) {
          console.log("Mot complet saisi :", this.grille[this.currentRow]);
          this.submitAttempt();
        }
        else {
          this.MsgError = "Votre mot est incomplet !";
          console.warn("Nombre de lettres saisies :", this.currentCol);
        }
        
      } else if (key.match(/^[A-Za-z]$/) && this.currentCol < 5) {
        // Ajout d'une lettre
        console.log("Avant ajout de la lettre, currentCol :", this.currentCol);
        this.grille[this.currentRow][this.currentCol] = key.toLowerCase();
        this.currentCol++;
        console.log("Après ajout de la lettre, currentCol :", this.currentCol);
        this.UpdateCurrentAttempt(key.toLowerCase()); // Màj dans le store
      }
    },


    handleGlobalKeydown(event) {
      this.handleKeyPress(event.key);
    },
  },
  mounted() {
    this.setIsChrono(1);
    // On écoute tout le temps pour le clavier
        window.addEventListener("keydown", this.handleGlobalKeydown);
  },
  beforeUnmount() {
    // On Retire l'écouteur global pour éviter les fuites de mémoire.
    window.removeEventListener("keydown", this.handleGlobalKeydown);
  },
};
</script>

<style>
.page-container2 {
  display: flex;
  justify-content: space-between; /* Espacement entre les sections */
  height: 100%; /* Prend toute la hauteur de la fenêtre */
  width: 100%; /* Prend toute la largeur de la fenêtre */
  min-height: 100vh;
}

.side-left-card {
  display: flex;
  align-items: center;
  width: 15%; /* Chaque card latérale occupe 15% de la largeur */
  padding: 1.5vw;
  margin-left: 1.5vw;
}

.side-right-card {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 1.5vh;
  width: 15%; /* Chaque card latérale occupe 15% de la largeur */
  padding: 1.5vw;
  margin-right: 1.5vw;
}

.main-card {
  display: flex;
  flex-direction: column; /* Les éléments sont empilés verticalement */
  justify-content: center; /* Centre horizontalement */
  align-items: center;
  height: 100vh;
  width: 70%;
}

.title2 {
  font-size: 2.75vw;
  font-weight: bold; /* Gras */
  color: #4caf50;
  text-transform: uppercase; /* ça met toutes en majuscule*/
  letter-spacing: 0.15vw; /* Espacement entre les lettres */
}

.msgerror{
  font-size: 1vw;
  font-weight: bold;
  color: #4caf50;
  text-transform: uppercase;
}
</style>
