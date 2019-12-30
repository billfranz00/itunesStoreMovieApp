<template>
	<a :href="isCollectionType ? movie.collectionViewUrl : movie.trackViewUrl"
     target="__blank" 
     class="itunes__content">
      <h3 class="itunes__sub-title">
      	{{ isCollectionType ? movie.collectionName : movie.trackName }}
      </h3>
      <p class="itunes__price">
      	<strong>
      		${{ isCollectionType ? movie.collectionPrice : movie.trackPrice }}
      	</strong>
      </p>
      <p v-if="movie.shortDescription"
         class="itunes__description">
        {{ movie.shortDescription }}
      </p>
    </a>
</template>

<script>
	export default {
		name: "itunesItemContent",
		props: {
			movie: {
				type: Object,
				required: true
			}
		},
		computed: {
			isCollectionType() {
				return this.movie.wrapperType === 'collection';
			}
		}
	}
</script>

<style lang="scss" scoped="">
.itunes__sub-title {
  margin-bottom: 5px;
}
.itunes__content {
  margin-left: 30px;
  text-decoration: none;
  cursor: pointer;
  color: #000;
}
.itunes__price {
  margin: 5px auto;
  font-size: 14px;
}
.itunes__description {
  margin-top: 0;
  font-size: 12px;
}
@media only screen and (max-width: 660px) {
	.itunes__sub-title {
    font-size: 16px;
    margin-top: 0;
  }
  .itunes__price {
    font-size: 12px;
  }
  .itunes__description {
    font-size: 10px;
  }
}
</style>