<template>
  <div>
    <div class="text-center text-white text-2xl mt-5 mb-10">
      <h3>
        {{ playlistInfo.name }}
      </h3>
      <h4 v-if="playlistInfo.owner" class="text-sm font-light">
        Created By {{ playlistInfo.owner.display_name }}
      </h4>
    </div>
    <div class="w-full">
      <div
        v-for="(track, index) in playlist"
        :key="index"
        class="flex justify-center card mx-auto"
      >
        <!-- <nuxt-link :to="{ name: 'song-uri', params: { uri: track.track.uri } }"> -->
        <nuxt-link :to="{ name: 'song-id', params: { id: track.track.id } }">
          <div class="flex my-2 items-center bg-secondary rounded-sm">
            <img :src="track.track.album.images[0].url" class="" />
            <div class="flex-cols ml-4">
              <p class="text-white overflow-x">{{ track.track.name }}</p>
              <div class="flex">
                <p
                  class="text-white font-light max-width"
                  v-for="(artist, index) in track.track.artists"
                  :key="index"
                >
                  {{ artist.name }}
                </p>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useContext, onMounted } from "@nuxtjs/composition-api";
import useSpotify from "../../hooks/useSpotify.js";
export default {
  setup() {
    const { params } = useContext();
    const { getPlaylist, playlist, playlistInfo } = useSpotify();

    const playlistId = params.value.id;

    onMounted(async () => {
      await getPlaylist(playlistId);
    });

    return { playlist, playlistInfo };
  },
};
</script>

<style scoped>
img {
  width: 25%;
  height: 25%;
}

.card {
  max-width: 80%;
}

@media only screen and (min-width: 600px) {
  .card {
    width: 500px;
  }
}
</style>
