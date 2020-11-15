<template>
  <div>
    <ul
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-12"
    >
      <CardAlbum
        v-for="playlist in playlists"
        :key="playlist.id"
        :artworkUrl="playlist.images[0].url"
        :trackCount="playlist.tracks.total"
      />
    </ul>

    <button
      class="bg-blue-400 rounded-lg p-3 px-5 mt-12 cursor-pointer"
      @click="handleShowClick"
    >
      Show
    </button>
  </div>
</template>

<script lang="ts">
import { onMounted } from "@nuxtjs/composition-api";
import useSpotify from "../hooks/useSpotify";
import useAppState from "../hooks/useAppState";

export default {
  middleware: "auth",
  setup() {
    const { accessToken, getPlaylists, playlists } = useSpotify();
    const { slideOverSpotifyAuthShow } = useAppState();

    onMounted(async () => {
      await getPlaylists(10);
      console.log(playlists.value);
    });

    const handleShowClick = () => {
      slideOverSpotifyAuthShow();
    };

    return { accessToken, playlists, handleShowClick };
  }
};
</script>
