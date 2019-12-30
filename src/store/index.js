import Vue from 'vue'
import Vuex from 'vuex'
import searchService from '../services/searchService';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	movieData: [],
    noDataFound: false,
    searchInProcess: false,
    seeMore: false,
    badRequest: false
  },
  mutations: {
  	setMovieData(state, data) {
  		state.movieData = data.results;
      if (data.resultCount > 6) {
        state.seeMore = true;
      }
  	},
    clearMovieData(state) {
      state.movieData = [];
      state.searchInProcess = false;
      state.noDataFound = false;
      state.seeMore = false;
    },
    setNoDataFound(state, results) {
      state.noDataFound = results;
    },
    setSearchInProcess(state, inProcess) {
      state.searchInProcess = inProcess;
    },
    setBadRequest(state, badRequest) {
      state.badRequest = badRequest;
    }
  },
  actions: {
  	async getMovies({ commit }, searchTerm) {
      commit('setNoDataFound', false);
      commit('setSearchInProcess', true);
      commit('setBadRequest', false);
  		await searchService(searchTerm)
        .then(res => {
          console.log(res);
          commit('setSearchInProcess', false);
          if (!res.data.resultCount) {
            commit('setNoDataFound', true);
          } else {
            commit('setMovieData', res.data);
          }
  			})
        .catch(err => {
          commit('setBadRequest', true);
          console.log(err);
        });
  	}
  }
});
