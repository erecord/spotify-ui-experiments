<template>
  <div>
    <div>
      <h3>aa{{ playlist.name }}</h3>
    </div>
    <div v-for="(track, index) in playlist" :key="index" class="flex mx-4">
      <nuxt-link :to="{ name: 'song-uri', params: { uri: track.track.uri } }">
        <div class="flex my-2 items-center bg-secondary rounded-sm">
          <img :src="track.track.album.images[0].url" class="w-1/4 h-1/4" />
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
</template>

<script>
import { useContext, onMounted } from "@nuxtjs/composition-api";
import useSpotify from "../../hooks/useSpotify.js";
export default {
  setup() {
    const { params } = useContext();
    const { getPlaylist, playlist } = useSpotify();

    const playlistId = params.value.id;

    onMounted(async () => {
      await getPlaylist(playlistId);
    });

    return { playlist };
  }
};
</script>

<style></style>
