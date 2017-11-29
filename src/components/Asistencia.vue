<template>
  <v-container grid-list-md >
    <p class="headline text-xs-center mt-0 mb-1" :class="`${theme.defaulttheme.color.first}--text`">{{title}}</p>
    <v-divider class="mb-3"></v-divider>
    <v-layout row wrap>
      <v-flex class="text-xs-center" >
        <v-date-picker style="margin: auto" actions @click="send(picker)" locale :color="`${theme.defaulttheme.color.first}`" v-model="asistencia.fecha" :header-color="`${theme.defaulttheme.color.first}`"></v-date-picker>
      </v-flex>
      <v-flex xs12 class="text-xs-center">
        <v-btn  outline :color="`${theme.defaulttheme.color.first}`" @click="selecDate(asistencia.fecha)">Asistencia</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

  import { mapState } from 'vuex';

  export default {
    mounted() {
      const idC = this.$route.params.idC;
      const idD = this.$route.params.id;
      this.$store.dispatch('LOAD_ESTUDENT_COURSE', { idD, idC });
    },
    data() {
      return {
        showDatapicker: false,
        hola: 'PRESENTE',
        picker: null,
        title: 'Seleccionar Fecha',
      };
    },
    methods: {
      selecDate(fecha) {
        console.log('=========================================');
        const idC = this.$route.params.idC;
        const idD = this.$route.params.id;
        this.$store.dispatch('SAVE_ASISTENCIA_ESTUDENT', { idD });
        this.$router.push({ name: 'Rasistencia', params: { id: idD, idC, fecha } });
      },
    },
    computed: {
      ...mapState(['theme']),
      ...mapState(['asistencia']),
    },
  };

</script>

<style>
  .active{
  }
</style>
