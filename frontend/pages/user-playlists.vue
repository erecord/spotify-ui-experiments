<template>
  <div>
    <h2>Hello user</h2>
    <div
      class="w-1/2 flex mx-auto items-center my-4 bg-secondary"
      v-for="(playlist, index) in playlists"
      :key="index"
    >
      <img :src="playlist.images[0].url" alt="Playlist Image" />
      <div class="text-white ml-2">
        <p class="font-semibold">
          {{ playlist.name }}
        </p>
        <p class="font-light">{{ playlist.tracks.total }} Tracks</p>
      </div>
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
      await getPlaylists(50);
    });
    console.log(playlists);
    return { accessToken, playlists };
  },
};
</script>

<style>
img {
  width: 10%;
}
</style>