<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
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
  list-style-type: none;
}

button {
  background: transparent;
  border: none;
}

/* Medium Editor */
.insert-image-container {
  pointer-events: none;
}

.medium-editor-toolbar {
  transition: 100ms;
}

.medium-editor-container h6 {
  background-color: #2b303b;
  color: #ebcb8b;
  font-weight: 400;
  margin: 0 auto !important;
  max-width: 800px !important;
  padding: 10px;
}

</style>