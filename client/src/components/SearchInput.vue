<template>
  <div class="main">
    <div class="inputs">
      <div class="input-wrap">
        <label for="search">Movie name:</label>
        <b-form-input
          v-model="movieName"
          placeholder="Enter movie name"
          debounce="1000"
          id="search"
        ></b-form-input>
      </div>
      <div class="input-wrap">
        <label for="year">Year:</label>
        <b-form-input
          v-model="year"
          placeholder="Year"
          debounce="1000"
          id="year"
          type="number"
        ></b-form-input>
      </div>
      <div class="input-wrap">
        <label for="type">Type:</label>
        <b-form-select v-model="type" :options="typeOptions" id="type">
          <template #first>
            <b-form-select-option value=""
              >-- Please select type --</b-form-select-option
            >
          </template>
        </b-form-select>
      </div>
    </div>
    <div class="results">
      <div v-if="loading" class="text-center">
        <b-spinner variant="dark" label="Text Centered"></b-spinner>
      </div>
      <div v-else>
        <p v-if="error">{{ error }}</p>
        <b-table v-else stacked :items="resultsFiltered">
          <template #cell(poster)="data">
            <img :src="data.item.Poster" alt="Poster" />
          </template>
          <template #cell(ratings)="data">
            <b-table stacked borderless :items="data.item.Ratings"> </b-table>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchInput",
  data() {
    return {
      movieName: "",
      year: "",
      type: "",
      typeOptions: ["movie", "series", "episode"],
      baseUrl: "http://www.omdbapi.com/?i=tt3896198&apikey=f68f2cab",
      loading: null,
      results: [],
      error: "",
    };
  },
  computed: {
    url() {
      return (
        this.baseUrl +
        `&t=${this.movieName}` +
        `${this.year && `&y=${this.year}`}` +
        `${this.type && `&type=${this.type}`}`
      );
    },
    resultsFiltered() {
      if (this.results.length) {
        delete this.results[0].Response;
        return this.results;
      }
      return [];
    },
  },
  methods: {
    async getMovie() {
      this.results = [];
      this.error = "";
      try {
        this.loading = true;
        const { data } = await this.axios.get(this.url);
        if (data.Error) this.error = data.Error;
        this.results.push(data);
      } catch (e) {
        this.error = "Error occured, try later";
      } finally {
        this.loading = false;
      }
    },
  },
  watch: {
    movieName(newValue) {
      if (newValue) this.getMovie();
    },
    year() {
      if (this.movieName) this.getMovie();
    },
    type() {
      if (this.movieName) this.getMovie();
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: block;
  width: 100%;
}
.inputs {
  display: flex;
  padding: 30px 20px;
  margin-top: 16px;
}

.input-wrap {
  display: flex;
  align-items: center;

  label {
    white-space: nowrap;
    margin-left: 1rem;
    margin-right: 0.5rem;
    margin-bottom: 0;
  }
}
</style>
