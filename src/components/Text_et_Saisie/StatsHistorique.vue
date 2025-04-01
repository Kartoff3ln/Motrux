<template>
  <div class="card-hist">
    <div class="line">
      <p class="val-container">Temps moyen :</p>
      <div class="cont_val">{{tempsMoyen[0]}}:{{tempsMoyen[1]}}</div>
    </div>
    <div class="line">
      <p class="val-container">Coup moyen :</p>
      <div class="cont_val">{{tentativeMoyenne}}</div>
    </div>
    <div class="line">
      <p class="val-container">Taux de victoire :</p>
      <div class="cont_val" v-if="winRate[0]+winRate[1] >= 1">{{winRate[0]/(winRate[0]+winRate[1])*100}}%</div>
      <div class="cont_val" v-else>0%</div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "Stats",
    data(){
      return{
        tempsMoyen : [0, 0],
        tentativeMoyenne : 0,
        winRate : [0, 0],
        lesParties: [],
      }
    },
    computed: {
      ...mapGetters([
        "getHistorique_tentativeMoy",
        "getHistorique_tempMoy",
        "getHistorique_lesParties",
        "getHistorique_winRate",
      ])
    },
    mounted() {
      this.tempsMoyen = this.getHistorique_tempMoy;
      this.tentativeMoyenne = this.getHistorique_tentativeMoy;
      this.winRate = this.getHistorique_winRate;
      this.lesParties = this.getHistorique_lesParties;
    },
  }
</script>