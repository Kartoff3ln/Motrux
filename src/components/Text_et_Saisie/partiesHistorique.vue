<template>
  <div v-if="lesParties.length > 0">
    <div v-for="(row, index) in lesParties" :key="`row-${index}`" class="line">
      <p class="cont_val">{{row["mot"]}}</p>
      <p class="cont_val">{{row["nbTentative"]}}</p>
      <p class="cont_val">{{row["tmpJeux"]}}</p>
      <p class="cont_val" v-if="row.typeFinPartie===Victoire" style="color: green">{{row.typeFinPartie}}</p>
      <p class="cont_val" v-else style="color: red">{{row.typeFinPartie}}</p>
      <p class="cont_val">{{row["date"]}}</p>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Les Parties",
  data(){
    return{
      lesParties: [],
      Victoire: "Victoire"
    }
  },
  computed: {
    ...mapGetters([
      "getHistorique_lesParties",
    ])
  },
  mounted() {
    this.lesParties = this.getHistorique_lesParties;
    console.log()
  },
}
</script>