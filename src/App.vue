<template>
  <div id="app">
    <div id="nav" class="bg-info">
      32-Bits <img src="./assets/joystick.png" alt="logo"> |
      <router-link to="/">Inicio</router-link> |
      <router-link :to="{name: 'Busqueda'}">Búsqueda</router-link> |
      <router-link :to="{name: 'Ventas'}">Ventas</router-link> |
      <router-link :to="{name: 'Total'}">Total</router-link>
    </div>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style>

@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

#app {
  font-family: 'Press Start 2P', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: white;
}

#nav img{
  width: 80px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
