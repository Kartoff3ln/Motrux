<script>
import { mapMutations } from 'vuex';

export default {
  name: 'MotValide',
  methods: {
    ...mapMutations([
        "SetWordValid"
    ]),
    async verifWord(word) {
      try {
        const body = JSON.stringify({word} )
        const response = await fetch('https://vue-project-backend-eta.vercel.app/api/check-word', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        });

        const data = await response.json();
        console.log("Réponse API :", data);

        this.SetWordValid(data.isWord);
        return data.isWord;
      } catch (error) {
        console.error("Erreur dans verifWord:", error.message);
        this.SetWordValid(false);
      }


    },
    ...mapMutations(['SetWordValid']),
  },
};
</script>
