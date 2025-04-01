<script>
import { mapMutations } from "vuex";

export default {
  name: 'MotATrouver',
  mounted() {
  fetch('https://vue-project-backend-eta.vercel.app/api/new-game')
    .then((res) => res.json())
    .then((data) => {
      this.SetTargetWord(data.word);
      console.log("Mot cible: ", data.word)
    })
    .catch((err) => console.error('Erreur lors de la récupération du mot :', err));
  },
  methods: {
    ...mapMutations(['SetTargetWord']),
  },
};
</script>