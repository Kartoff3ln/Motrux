<template>
    <div>
    <button class="button_cust" @click="goHome">Retour à l'accueil</button>
  </div>

  </template>
  
  <script>
  
  import {mapMutations} from "vuex";

  export default {
    name: 'goHome',
    methods:{
      ...mapMutations([
        "setIsChrono"
      ]),

      goHome: function(){
        this.$router.push({ name: "Accueil" });//retour à la page Home
        this.setIsChrono(0);
      },
    },
  };
  </script>

<style scoped>
.button_cust {
  background: #4c7eaf;
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
  background: #4577a0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Ombre au survol */
}

.button_cust:active {
  transform: scale(0.98); /* Réduction légère au clic */
}
</style>