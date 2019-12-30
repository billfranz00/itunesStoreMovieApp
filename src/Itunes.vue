<template>
  <div id="itunes">
    <h1>{{ title }}</h1>
    <ItunesForm @resetSeeAll="seeAll = false" />
    <h4 v-if="searchInProcess" class="itunes__dots">
      {{ searching }}
      <span class="itunes__dots-dot">.</span>
      <span class="itunes__dots-dot">.</span>
      <span class="itunes__dots-dot">.</span>
      <span class="itunes__dots-dot">.</span>
    </h4>
    <h4 v-else-if="noDataFound">
      {{ noResultsFound }}
    </h4>
    <h4 v-else-if="badRequest">
      There was a problem responding to your request.
    </h4>
    <ul class="itunes__list">
      <transition-group name="fade">
        <ItunesItem v-for="movie in movies" :key="movie.trackId" :movie="movie" />  
      </transition-group>
    </ul>
    <a v-if="seeMore && movieData.length > listLength - 1"
       @click="seeMoreItems"
       class="itunes__expand">See More +</a>
  </div>
</template>

<script>
import ItunesItem from './components/ItunesItem';
import ItunesForm from './components/ItunesForm';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      title: "Welcome to The Itunes Movie App",
      searching: "Searching",
      noResultsFound: "Your search did not find any results :(",
      seeAll: false,
      listLength: 6
    }
  },
  name: 'itunes',
  components: {
    ItunesItem,
    ItunesForm
  },
  computed: {
    ...mapState({
      movieData: 'movieData',
      searchInProcess: "searchInProcess",
      noDataFound: "noDataFound",
      seeMore: 'seeMore',
      badRequest: 'badRequest'
    }),
    movies() {
      return this.seeAll ? this.movieData : this.movieData.slice(0, this.listLength);
    }
  },
  methods: {
    seeMoreItems() {
      this.seeAll = true;
      this.$store.state.seeMore = false;
    }
  }
}
</script>

<style lang="scss">
#itunes {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.itunes__list {
  text-align: left;
  width: 660px;
  margin: 0 auto;
  padding: 0;
  opacity: 1;
}
@keyframes dot {
  0% {
    color: hidden;
  }
  25% {
    color: black;
  }
  100% {
    color: white;
  }
}
.itunes__dots {
  &-dot {
    color: white;
    animation-name: dot;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
    &:nth-child(2) {
      animation-delay: 0.25s;
    }
    &:nth-child(3) {
      animation-delay: 0.5s;
    }
    &:nth-child(4) {
      animation-delay: 0.75s;
    }
  }
}
.itunes__expand {
  display: block;
  margin: 10px auto;
  cursor: pointer;
  &:hover {
    color: blue;
  }
}
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: all ease 1s;
}
.fade-leave-active {
  opacity: 0;
  position: absolute;
}
@media only screen and (max-width: 660px) {
 .itunes__list {
  width: 100%;
 } 
}
</style>
