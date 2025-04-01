<template>
  <div class="grille-mots">
    <!-- Grille de mots (5 colonnes, 6 lignes) -->
    <div v-for="(row, rowIndex) in grille" :key="`row-${rowIndex}`" class="grille-row">
        <div v-for="(cell, cellIndex) in row"
             :key="`cell-${rowIndex}-${cellIndex}`"
             :class="[
                LetterStatus[rowIndex]?.[cellIndex] === 2 ? 'grille-cell': '', // Classe par défaut
                LetterStatus[rowIndex]?.[cellIndex] === 0 ? 'grille-cell-bienplacee': '',
                LetterStatus[rowIndex]?.[cellIndex] === 1 ? 'grille-cell-malplacee': '',
             ]"
             class="grille-cell"
        >
          {{ cell }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GrilleMots",
  props: {
    grille: {
      type: Array,
      required: true,
    },
    LetterStatus: {
      type: Array,
      required: true,
    },
  },
  data: function (){
      return {
      ClassName: '',
      }
    },
  };
</script>

<style scoped>

.grille-mots {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 1.5vh;
  z-index: 1;
  width: 35%;
}

.grille-row {
  display: flex;
  justify-content: center;
  gap: 1.5vh; /* Espace proportionnel entre les cellules */
  width: 100%; /* Les lignes occupent toute la largeur du conteneur */
}

.grille-cell {
  display: flex;
  aspect-ratio: 1; /* Rend les cellules carrées */
  justify-content: center;
  align-items: center;
  border: none;
  height: 100%;
  width: 100%;
  font-size: 2vw; /* Taille de police adaptative en fonction de la largeur de la fenêtre */
  text-transform: uppercase;
  background-color: white;
}

.grille-cell-bienplacee {
  display: flex;
  aspect-ratio: 1; /* Rend les cellules carrées */
  justify-content: center;
  align-items: center;
  border: none;
  height: 100%;
  width: 100%;
  font-size: 2vw; /* Taille de police adaptative en fonction de la largeur de la fenêtre */
  text-transform: uppercase;
  background-color: #85ff33;
}

.grille-cell-malplacee {
  display: flex;
  aspect-ratio: 1; /* Rend les cellules carrées */
  justify-content: center;
  align-items: center;
  border: none;
  height: 100%;
  width: 100%;
  font-size: 2vw; /* Taille de police adaptative en fonction de la largeur de la fenêtre */
  text-transform: uppercase;
  box-sizing: border-box; /* Inclut les bordures dans la taille totale */
  background-color: #ff9933;
}
</style>
