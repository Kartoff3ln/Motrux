<template>
  <div class="animated-background">
    <div class="page-container1">
      <div>
        <p class="title1">{{ Title }}</p>
        <p class="title2">Vous avez trouvé le mot !!!</p>
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
  name: 'finDePartie',
  components: {CommencerPartie, goHome},
  data(){
    return {
      Title: "Vous avez gagné !",
    };
  },
  computed: {
    targetWord() {
      console.log(this.$store.state.targetWord);
      return this.$store.state.targetWord; // Assurez-vous que targetWord existe dans Vuex
    },
  },
};
</script>

