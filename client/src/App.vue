<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="search-wrap">
            <SearchInput />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchInput from "./components/SearchInput.vue";

export default {
  name: "App",
  components: {
    SearchInput,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.search-wrap {
  width: 100%;
  display: flex;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  padding: 20px;
}
</style>
