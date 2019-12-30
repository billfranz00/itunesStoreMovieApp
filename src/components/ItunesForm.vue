<template>
	<form>
		<div class="itunes__form-group">
			<input class="itunes__input"
           type="text"
           name="search"
           placeholder="Search Movie Title" 
           v-model="searchTerm"
           @keydown="clearNoResults"
           @keydown.enter.prevent="getMovieData">
      <button v-show="searchTerm"
      				@click.prevent="searchTerm = ''"
      				class="itunes__cancel">X</button>
	    <button class="itunes__search"
	    				@click.prevent="getMovieData">
	    	<span class="itunes__search-icon">&#9906;</span></button>
		</div>
    <button v-if="movieData.length"
    				@click.prevent="clearSearch"
    				class="itunes__clear">Clear Current Search</button>
	</form>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		data() {
			return {
				searchTerm: ""
			}
		},
		name: "itunesForm",
		computed: {
			...mapState({
				movieData: 'movieData'
			})
		},
		methods: {
	    getMovieData() {
	    	if (this.searchTerm) {
	    		document.activeElement.blur();
		    	this.$emit('resetSeeAll');
		      this.$store.dispatch('getMovies', this.searchTerm);
	    	}
	    },
	    clearSearch() {
	    	this.$emit('resetSeeAll');
	    	this.$store.commit('clearMovieData');
	    },
	    clearNoResults() {
	    	if (this.$store.state.noDataFound) {
	    		this.$store.commit('setNoDataFound', false);
	    	}
	    }
	  }
	}
</script>

<style lang="scss" scoped>
	.itunes__form-group {
		position: relative;
		margin-bottom: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 450px;
		margin: 0 auto;
	}
	.itunes__input {
		width: 400px;
		padding-left: 5px;
		height: 31px;
		font-size: 16px;
		border: 1px solid #000;
		border-right: 0;
		border-bottom-left-radius: 5px;
		border-top-left-radius: 5px;
		&:focus {
			outline: none;
			box-shadow: 0 0 0 1pt #006400;
			height: 28px;
		}
	}
	.itunes__cancel {
		position: absolute;
		background-color: transparent;
		border: none;
		font-weight: 700;
		height: 30px;
		right: 50px;
		cursor: pointer;
	}
	.itunes__search {
		background-color: #00FF00;
		border: 1px solid #006400;
		width: 40px;
		font-size: 20px;
		height: 35px;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
		line-height: 1rem;
		cursor: pointer;
		&-icon {
			display: block;
			transform: rotate(45deg);
		}
	}
	.itunes__clear {
		border-radius: 10px;
		border: 2px solid purple;
		color: purple;
		background-color: #fff;
		cursor: pointer;
		margin-top: 15px;
		width: 175px;
		height: 30px;
		font-size: 16px;
		&:hover {
			color: #fff;
			background-color: purple;
		}
	}
	@media only screen and (max-width: 479px) {
		.itunes__form-group {
			width: 300px;
		}
		.itunes__input {
			width: 250px;
		}
	}
</style>