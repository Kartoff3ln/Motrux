<template>
  <div>
    <button class="button_cust" @click="abandonner">Abandonner</button>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: 'abandon',
  methods:{
    ...mapMutations([
       "SetGameState",
       "ResetGame",
       "SetHistorique",
       "setIsChrono",
    ]),

    abandonner: function(){
      this.setIsChrono(0);
      this.SetGameState('Abandon');
      this.SetHistorique();
      this.ResetGame();
      this.$router.push({ name: "PageAbandon" });
    },
  },
};
</script>

<style scoped>
.button_cust {
  background: #af4c4c;
  color: #fff;
  border: none;
  border-radius: 1vw;
  padding: 1.5vh 2.5vw;
  font-size: 1.5vw;
  cursor: pointer; /* Change le curseur au survol */
  height: 100%;
  width: 100%; /* Adapte la largeur des boutons à celle du conteneur */
  transition: all 0.3s ease;
}

.button_cust:hover {
  background: #a04545;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0); /* Ombre au survol */
}

.button_cust:active {
  transform: scale(0.98); /* Réduction légère au clic */
}
</style>