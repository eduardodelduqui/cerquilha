<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import NavBar from './components/NavBar.vue'

export default {
  components: {
    NavBar
  },
  name: 'app',
  
  computed: {
    hasSearchMenu() {
      return this.$route.matched[0].props.default && this.$route.matched[0].props.default.hasSearchMenu
    }
  },

}
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

* {
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
  color: inherit;
}

ul {
  padding: 0;
  list-style: none;
}

button {
  background: transparent;
  border: none;
}

</style>
