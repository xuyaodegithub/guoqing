<template>
  <div id="app">
    <transition name="van-slide-left">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
.slide-enter-active {
  transform: translateX(100%);
  transition: all .2s linear;
}
.slide-leave-active {
  transform: translateX(100%);
  transition: all .2s linear;
}
</style>
