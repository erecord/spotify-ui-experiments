<template>
  <div class="text-white grid grid-cols-3 gap-2">
    <div class="grid" v-for="(playlist, index) in playlists" :key="index">
      <img :src="playlist.images[0].url" class="w-64 h-64" />
      <nuxt-link :to="{ name: 'playlist-id', params: { id: playlist.id } }">
        <p>{{ playlist.name }}</p></nuxt-link
      >
    </div>
  </div>
</template>

<script>
import { onMounted } from "@nuxtjs/composition-api";
import useSpotify from "../hooks/useSpotify";

export default {
  setup() {
    const { accessToken, getPlaylists, playlists } = useSpotify();

    onMounted(async () => {
      await getPlaylists();
    });

    console.log(playlists);

    return { accessToken, playlists };
  }
};
</script>

<style></style>
