<template>
  <div>
    <div v-for="(track, index) in playlist" :key="index">
      <nuxt-link :to="{ name: 'song-uri', params: { uri: track.track.uri } }">
        <p class="text-white">{{ track.track.name }}</p></nuxt-link
      >
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
