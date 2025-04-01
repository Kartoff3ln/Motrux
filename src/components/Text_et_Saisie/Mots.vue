<script>
import { mapGetters } from "vuex";

export default {
  name: 'Mots',
  computed: {
    ...mapGetters(['getState', 'getAttemptsLeft']),
    words(){
      return this.getState;
    },
    attemptsLeft(){
      return this.getAttemptsLeft;
    },
  },
};
</script>