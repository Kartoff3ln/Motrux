<template>
  <div>
    <button class="button_cust" @click="Gamehisto">Historique des parties</button>
  </div>
</template>

<script>
export default {
  name: 'HistoriquePartie',
  methods:{
    Gamehisto: function(){
      this.$router.push({ name: "PageHistorique" });//retour à la page Home
    },
  },
};
</script>

<style scoped>
.button_cust {
  background: #af904c;
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
  background: #a07c45;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Ombre au survol */
}

.button_cust:active {
  transform: scale(0.98); /* Réduction légère au clic */
}
</style>