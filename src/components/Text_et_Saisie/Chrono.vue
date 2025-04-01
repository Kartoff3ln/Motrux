<template>
  <div class="chrono-container">
    <p>{{min}}:{{snd}}</p>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: 'Accueil',
  data(){
    return {
      timerId : 0,
      min : 10,
      snd : 0,
    }
  },

  mounted() {
    this.startChrono()
  },
  methods: {
    ...mapGetters([
       "getisChrono"
    ]),
    ...mapMutations([
       "setTmp_min",
       "setTmp_snd",
       "SetGameState",
       "ResetGame",
       "SetHistorique",
       "setIsChrono",
    ]),

    finDuChrono() {
      this.setIsChrono(0);
      this.SetGameState('fin du temps');
      this.SetHistorique();
      this.ResetGame();
      this.$router.push({ name: "PageFinTemps" });
    },

    editTmp() {
      this.snd -= 1;
      if (this.snd === -1) {
        this.snd = 59;
        this.min -= 1;
      }
      this.setTmp_min(this.min);
      this.setTmp_snd(this.snd);
    },

    isFin(id_timer1, id_timer2){
      if(this.getisChrono() === 0){
        clearInterval(id_timer1);
        clearInterval(this.timerId);
        clearTimeout(id_timer2);
      }
    },

    startChrono() {
      this.timerId = setInterval(() => this.editTmp(), 1000);
      let timeout = setTimeout(() => { clearInterval(this.timerId); clearInterval(checkFin); this.finDuChrono(); }, 10*60*1000);
      let checkFin = setInterval(()=> this.isFin(checkFin, timeout), 1000);
    },
  }

};
</script>

<style scoped>
.chrono-container {
  display: flex;
  justify-content: center;
  font-weight: bold; /* Texte en gras */
  font-size: 2vw; /* Taille du texte */
  width: 100%; /* Prend toute la largeur de la card */
  padding: 10%; /* Espacement interne */
  border-radius: 0.6vw; /* Coins arrondis */
  text-align: center; /* Centrage du texte */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* Ombre douce */
  background: rgba(0, 0, 0, 0.8); /* Fond sombre */
  color: #ffffff; /* Texte en blanc */
}

.chrono-container p {
  margin: 0; /* Supprime les marges par défaut */
  letter-spacing: 0.15vw; /* Espacement entre les chiffres */
}
</style>