<template>
<div>
  <div class="inicio">
      <h1 class="pt-5">{{enviarTitulo}}</h1>
      <h2>{{enviarSubtitulo}}</h2>
    </div>
    <div class="footer text-center bg-info text-light p-4">
        <p>Página realizada por Sebastian Araos™</p>
    </div>
</div>
  
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'Inicio',

  computed: {
    ...mapGetters(['enviarTitulo','enviarSubtitulo'])

    /*mostrarTitulo(){
      return this.$store.getters.enviarTitulo
    },
    mostrarSubtitulo(){
      return this.$store.getters.enviarSubtitulo
    },*/
  }
}
</script>

<style>
  .inicio{
    background-image: url('../assets/fondoinicio.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 70vh;
    color: white;
    text-shadow: -1px -1px 1px #000, 1px 1px 1px #000, -1px 1px 1px #000, 1px -1px 1px #000;
  }
 
</style>