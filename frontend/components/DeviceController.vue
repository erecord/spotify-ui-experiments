<template>
  <div>
    <!-- Buttons -->
    <div>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="playSong(device.id)"
      >
        {{ device.name }}
      </button>
      <button v-if="!isPlaying" @click="handlePlay(device.id)">Play</button>
      <button v-else @click="handlePause(device.id)">Pause</button>
    </div>
  </div>
</template>

<script>
import useSpotify from "../hooks/useSpotify";
import { useContext, ref } from "@nuxtjs/composition-api";

export default {
  props: { device: Object, trackUri: String },

  setup(props) {
    const isPlaying = ref(false);
    const { accessToken, playSongOnDevice, play, pause } = useSpotify();
    const { app, params } = useContext();

    const handlePlay = () => {
      play(props.device.id);
      isPlaying.value = true;
    };
    const handlePause = () => {
      pause(props.device.id);
      isPlaying.value = false;
    };

    const playSong = () => {
      playSongOnDevice(props.device.id, props.trackUri);
      isPlaying.value = true;
    };

    return { handlePlay, handlePause, playSong, isPlaying };
  }
};
</script>

<style></style>
