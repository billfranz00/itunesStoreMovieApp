<template>
  <li class="itunes__item"
      :class="{'itunes__item--top': !movie.shortDescription}">
    <img :src="movie.artworkUrl100" class="itunes__img">
    <ItunesItemContent :movie="movie" />
  </li>
</template>

<script>
import ItunesItemContent from "./ItunesItemContent";

export default {
  name: 'ItunesItem',
  components: {
    ItunesItemContent
  },
  props: {
    movie: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
$lightGrayBorder: 1px solid lightgray;

.itunes__item {
  display: flex;
  margin: 0 auto;
  align-items: center;
  padding: 5px;
  border-bottom: $lightGrayBorder;
  &:first-child {
    border-top: $lightGrayBorder;
    margin-top: 10px;
  }
  &--top {
    align-items: normal;
  }
  &:hover {
    border: 1px solid #000;
  }
}
.itunes__img {
  border-radius: 50%;
  flex: 0;
}

@media only screen and (max-width: 660px) {
  .itunes__item {
    height: 100px;
    align-items: normal;
    &--top {
      align-items: center;
    }
  }
  .itunes__img {
    height: 75px;
  }
}
</style>
