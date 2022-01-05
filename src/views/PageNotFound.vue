<template>
  <div>
    <NavBar/>
    <div data-page="page-not-found">
      <img class="page-not-found" src="@/assets/pagenotfound.png">
    </div>
  </div>
</template>

<script>

import NavBar from "../components/NavBar.vue"

export default {

  components: {
    NavBar
  }

}
</script>

<style lang="scss" scoped>

[data-page="page-not-found"] {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 72px);

  .page-not-found {
    max-width: 900px;
    width: 100%;
  }
}

</style>