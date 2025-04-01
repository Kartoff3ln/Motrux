<script>

export default {
  name: 'StatutLettre',
  methods: {
    getClass(status) {
      switch (status) {
        case 0: return 'bienplace';
        case 1: return 'malplace';
        case 2: return '';
        default: '';
      }
    },
  },
};
</script>

<style scoped>

.bienplace { color: #4caf50; }
.malplace { color: yellow; }
</style>
