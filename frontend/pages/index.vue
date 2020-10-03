<template>
  <div class="bg-primary">
    <div class="text-center text-white text-3xl py-5">
      <h1>Spotify PWA</h1>
    </div>
    <div class="md:mx-32 mx-5">
      <div>
        <nuxt-link to="/user-playlists"
          ><h2 class="text-white text-2xl font-light">Playlists</h2></nuxt-link
        >
      </div>
      <div
        v-if="playlists"
        class="text-white md:grid md:grid-cols-5 grid grid-cols-2 gap-5 mt-1"
      >
        <div
          class="grid bg-secondary pb-2 rounded-md card"
          v-for="(playlist, index) in playlists"
          :key="index"
        >
          <nuxt-link :to="{ name: 'playlist-id', params: { id: playlist.id } }">
            <img :src="playlist.images[0].url" />
            <p class="text-center md:text-xl pt-2 px-1">
              {{ playlist.name }}
            </p></nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "@nuxtjs/composition-api";
import useSpotify from "../hooks/useSpotify";

export default {
  middleware: "auth",
  setup() {
    const { accessToken, getPlaylists, playlists } = useSpotify();

    onMounted(async () => {
      await getPlaylists(10);
    });

    return { accessToken, playlists };
  },
};
</script>

<style>
.card:hover {
  opacity: 0.9;
  transform: translateY(-1%);
}
</style>
