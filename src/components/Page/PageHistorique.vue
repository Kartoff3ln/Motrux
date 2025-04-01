<template>
  <div class="animated-background">
    <div class="page-container1">
      <div>
        <h1 class="title1">{{ Title }}</h1>
        <StatsHistorique/>
        <div class="card-hist2">
          <go-home/>
        </div>
        <parties-historique/>
      </div>
    </div>
  </div>
</template>

<script>

import GoHome from "@/components/Bouton/goHome.vue";
import StatsHistorique from "@/components/Text_et_Saisie/StatsHistorique.vue";
import PartiesHistorique from "@/components/Text_et_Saisie/partiesHistorique.vue";

export default {
  name: "Accueil",
  components: {PartiesHistorique, StatsHistorique, GoHome},
  data() {
    return {
      Title: "Statistique",
      letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    };
  },
  mounted() {
    this.tempsMoyen = this.getHistorique_tempMoy;
    this.tentativeMoyenne = this.getHistorique_tentativeMoy;
    this.winRate = this.getHistorique_winRate;
    this.lesParties = this.getHistorique_lesParties;
    this.generateLetters();
  },
  methods: {
    generateLetters() {
      const background = document.querySelector(".animated-background");// Sélectionne le conteneur de fond
      for (let i = 0; i < 50; i++) {// Génère 50 lettres animées
        const span = document.createElement("span");// Crée un élément HTML <span>
        span.textContent = this.letters[Math.floor(Math.random() * this.letters.length)];// Prend une lettre au hasard
        // Place la lettre horizontalement de façon aléatoire
        span.style.left = `${Math.random() * 100}%`;
        // Ajoute un délai d'animation aléatoire
        span.style.animationDelay = `${Math.random() * 5}s`;
        // taille de police aléatoire
        span.style.fontSize = `${Math.random() * 2 + 1}rem`;
        background.appendChild(span);// Ajoute la lettre animée au fond
      }
    },
  },
};
</script>

<style>
.val-container {
  color: #fff;
  font-size: 1.5vw;
  height: 100%;
  width: 100%; /* Adapte la largeur des boutons à celle du conteneur */
}

.card-hist {
  display: flex;
  flex-direction: column; /* Empile les boutons verticalement */
  padding-right: 2vw;
  height: 100%;
  width: 100%; /* S'assure que le conteneur prend toute la largeur disponible */
}

.card-hist2 {
  display: flex;
  flex-direction: column; /* Empile les boutons verticalement */
  align-items: center;
  height: 100%;
  width: 100%; /* S'assure que le conteneur prend toute la largeur disponible */
}

.cont_val {
  display: flex;
  justify-content: center;
  font-weight: bold; /* Texte en gras */
  font-size: 1.5vw; /* Taille du texte */
  width: 100%; /* Prend toute la largeur de la card */
  padding: 2%; /* Espacement interne */
  border-radius: 0.6vw; /* Coins arrondis */
  text-align: center; /* Centrage du texte */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* Ombre douce */
  background: rgba(0, 0, 0, 0.8); /* Fond sombre */
  color: #ffffff; /* Texte en blanc */
}

.line {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5vw;
}
</style>