<template>
   <div class="clavier">
    <!-- Parcours de toutes les lignes du clavier -->
    <div v-for="(row, rowIndex) in layout" :key="rowIndex" class="clavier-row">
      <button
        v-for="(key, keyIndex) in row"
        :key="keyIndex"
        class="clavier-key"
        @click="handleKeyPress(key)"
      >
        {{ key }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Définition de l'événement pour le parent
const emit = defineEmits(['key-press']);

// Disposition des touches du clavier AZERTY
const layout = ref([
  ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'],
  ['←', 'W', 'X', 'C', 'V', 'B', 'N', '↵']
]);

const handleKeyPress = (key) => {
  emit('key-press', key); // Émet la touche pressée vers le parent
};
</script>

<style scoped>
.clavier {
  display: flex;
  flex-direction: column;
  padding: 1.5vh;
  gap: 0.6vh;
}

.clavier-row {
  display: flex;
  justify-content: center; /* Centre les touches */
  gap: 0.6vh; /* Espacement entre les touches */
}

.clavier-key {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 4vw;
  height: 4vw; /* Hauteur proportionnelle à l’écran */
  font-size: 1.5vw;
  border-radius: 0.4vw;
  border: none;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  transition: all 0.2s ease-in-out;
}


.clavier-key:hover {
  background-color: rgb(166, 166, 166); /* Fond blanc au survol */
}

.clavier-key:active {
  transform: translateY(2px); /* Effet de clic */
}

</style>