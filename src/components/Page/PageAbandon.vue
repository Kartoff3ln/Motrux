<template>
  <div class="animated-background">
    <div class="page-container1">
      <div>
        <p class="title1">{{ Title }}</p>
        <p class="title2">Le mot à deviner était : {{ targetWord }}</p>
        <div class="buttons1">
          <goHome/>
          <CommencerPartie/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import goHome from "@/components/Bouton/goHome.vue";
import CommencerPartie from "@/components/Bouton/CommencerPartie.vue";

export default {
  components: {CommencerPartie, goHome},
  data() {
    return {
      Title: "Abandon",
    };
  },
  computed: {
    targetWord() {
      console.log("Mot cible récupéré depuis Vuex :", this.$store.state.targetWord);
      return this.$store.state.targetWord; // Assurez-vous que targetWord existe dans Vuex
    },
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<style scoped>
.title1 {
  color: #af4c4c;
}

.title2{
  color: #af4c4c;
}
</style>