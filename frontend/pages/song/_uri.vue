<template>
  <div>
    <!-- Buttons -->
    <div>
      <button @click="handleTogglePlay">Play</button>
    </div>
  </div>
</template>

<script>
import useSpotify from "../../hooks/useSpotify";

import { useContext } from "@nuxtjs/composition-api";
export default {
  setup() {
    const { accessToken } = useSpotify();
    const { app, params } = useContext();

    const trackUri = params.value.uri;

    let player;

    const onSpotifyWebPlaybackSDKReady = () => {
      const token = accessToken.value;
      player = new Spotify.Player({
        name: "Get Fucked Cuck",
        getOAuthToken: cb => {
          cb(token);
        }
      });

      // Error handling
      player.addListener("initialization_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("authentication_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("account_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("playback_error", ({ message }) => {
        console.error(message);
      });

      // Playback status updates
      player.addListener("player_state_changed", state => {
        console.log(state);
      });

      // Ready
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);

        app.$axios.$put(
          `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
          {
            uris: [trackUri]
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken.value}`
            }
          }
        );
      });

      // Not Ready
      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      // Connect to the player!
      player.connect();
    };

    if (process.browser) {
      window.onSpotifyWebPlaybackSDKReady = onSpotifyWebPlaybackSDKReady;
    }

    const handleTogglePlay = () => {
      if (player) {
        player.togglePlay();
      }
    };

    return { handleTogglePlay };
  },
  head() {
    return {
      title: ":) || ", // Other meta information
      script: [
        {
          hid: "stripe",
          src: "https://sdk.scdn.co/spotify-player.js",
          defer: true
        }
      ]
    };
  }
};
</script>
