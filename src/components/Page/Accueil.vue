<template>
  <div class="animated-background">
   <div class="page-container1">
     <div>
       <h1 class="title1">{{ Title }}</h1>
       <p class="subtitle1">Hector Rouzaud, Mael Schiemsky, Lilian Refour&nbsp;!</p>
       <div class="buttons1">
         <CommencerPartie/>
         <HistoriquePartie/>
       </div>
     </div>
   </div>
  </div>
</template>

<script>

import CommencerPartie from "@/components/Bouton/CommencerPartie.vue";
import HistoriquePartie from "@/components/Bouton/HistoriquePartie.vue";

export default {
  name: "Accueil",
  components: { CommencerPartie, HistoriquePartie },
  data() {
    return {
      Title: "MATRUX",
      letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    };
  },
  mounted() {
    this.generateLetters();
  },
  methods: {
    generateLetters() {
      const background = document.querySelector(".animated-background");// Sélectionne le conteneur de fond
      for (let i = 0; i < 52; i++) {// Génère 50 lettres animées
        const span = document.createElement("span");// Crée un élément HTML <span>
        span.textContent = this.letters[Math.floor(Math.random() * this.letters.length)];// Prend une lettre au hasard
        // Place la lettre horizontalement de façon aléatoire
        span.style.left = `${Math.random() * 100}%`;
        // Ajoute un délai d'animation aléatoire
        span.style.animationDelay = `${Math.random() * 5}s`;
        // taille de police aléatoire
        span.style.fontSize = `${Math.random() * 2 + 1}vw`;
        background.appendChild(span);// Ajoute la lettre animée au fond
      }
    },
  },
};
</script>

<style>
/* Arrière-plan animé */
.animated-background {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364); /* Fond dégradé */
}

/* Lettres animées */
.animated-background span {
  position: absolute;
  font-weight: bold;
  color: rgba(0, 179, 15, 0.75);
  animation: float 5s infinite ease-in-out;
  pointer-events: none;/* Les lettres ne bloquent pas les clics */
  z-index: 0;
}

/* Animation des lettres */
@keyframes float {
  0% {
    transform: translateY(100vh) scale(0.5); /*apparait en bas avec une taille*/
    opacity: 0; /* invisible au début */
  }
  50% {
    opacity: 1; /* visible au milieu*/
  }
  100% {
    transform: translateY(-100vh) scale(1);
    opacity: 0; /* Invisible */
  }
}

/* Conteneur général */
.page-container1 {
  margin-top: 15%;
  margin-bottom: 17%;
  display: flex; /* Flexbox pour le centrage */
  justify-content: center; /* Centre horizontalement */
  align-items: center; /* Centre verticalement */
  height: 100%; /* Prend toute la hauteur de l'écran */
  width: 100%; /* Prend toute la largeur */
  z-index: 2; /* La carte est au-dessus des lettres */
}

/* Titre principal */
.title1 {
  font-size: 4vw; /* Taille de 4rem */
  font-weight: bold; /* Gras */
  color: #4caf50;
  text-transform: uppercase; /* ça met toutes en majuscule*/
  letter-spacing: 0.15vw; /* Espacement entre les lettres */
  margin-bottom: 1.5vh; /* Espace entre le titre et le sous-titre */
}

/* Sous-titre */
.subtitle1 {
  font-size: 1.05vw;
  color: #7f8c8d;
  margin-bottom: 3vh;
}

/* Conteneur des boutons */
.buttons1 {
  display: flex;
  flex-direction: column; /* Empile les boutons verticalement */
  align-items: center; /* Centre les boutons horizontalement */
  gap: 1.5vh; /* Espacement entre les boutons */
  height: 100%;
  width: 100%; /* S'assure que le conteneur prend toute la largeur disponible */
}
</style>