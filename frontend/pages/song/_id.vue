<template>
  <div>
    <div class="w-3/4 mx-auto mt-20 text-center text-white text-lg">
      <img
        v-if="track.album.images"
        class="mx-auto album-img"
        :src="track.album.images[0].url"
        alt="Album Cover"
      />
      <h1 class="mt-4">{{ track.name }}</h1>
      <div class="flex justify-center">
        <p
          class="font-light mt-4"
          v-for="(artist, index) in track.artists"
          :key="index"
        >
          {{ artist.name }}
        </p>
      </div>
    </div>
    <!-- Buttons -->
    <div class="text-center mt-10">
      <button @click="handlePrevTrack">
        <svg class="w-16 h-16" viewBox="0 0 172 172">
          <path
            d="M72.5625,82.27109l50.25625,-30.87266c1.37734,-0.83984 3.19141,-0.87344 4.56875,-0.10078c1.44453,0.80625 2.31797,2.31797 2.31797,3.96406v61.44297c0,1.64609 -0.87344,3.15781 -2.31797,3.96406c-0.67187,0.36953 -1.44453,0.57109 -2.21719,0.57109c-0.83984,0 -1.64609,-0.23516 -2.35156,-0.67187l-50.22266,-30.60391c-1.34375,-0.80625 -2.18359,-2.28437 -2.18359,-3.86328c0,-1.54531 0.83984,-3.02344 2.15,-3.82969zM45.18359,49.38281h17.30078c1.57891,0 2.88906,1.27656 2.88906,2.88906v67.48984c0,1.57891 -1.27656,2.88906 -2.88906,2.88906h-17.30078c-1.57891,0 -2.88906,-1.27656 -2.88906,-2.88906v-67.48984c0,-1.6125 1.27656,-2.88906 2.88906,-2.88906z"
            fill="#ffffff"
          ></path>
        </svg>
      </button>
      <button @click="handleTogglePlay">
        <svg class="w-16 h-16" viewBox="0 0 172 172">
          <path d="M0,172v-172h172v172z" fill="none"></path>

          <path
            d="M169.34609,86c0,-46.02344 -37.32266,-83.34609 -83.34609,-83.34609c-46.02344,0 -83.34609,37.32266 -83.34609,83.34609c0,46.02344 37.32266,83.34609 83.34609,83.34609c46.02344,0 83.34609,-37.32266 83.34609,-83.34609z"
            fill="#92d1c3"
          ></path>
          <path
            d="M127.21953,81.7l-58.75547,-36.11328c-1.6125,-0.97422 -3.72891,-1.04141 -5.375,-0.10078c-1.67969,0.94063 -2.72109,2.72109 -2.72109,4.63594v71.89063c0,1.91484 1.04141,3.69531 2.6875,4.63594c0.80625,0.43672 1.67969,0.67188 2.58672,0.67188c0.97422,0 1.91484,-0.26875 2.75469,-0.77266l58.75547,-35.81094c1.57891,-0.94063 2.55312,-2.6875 2.55312,-4.50156c0.06719,-1.84766 -0.90703,-3.59453 -2.48594,-4.53516z"
            fill="#ffffff"
          ></path>
        </svg>
      </button>
      <button @click="handleNextTrack">
        <svg class="w-16 h-16" viewBox="0 0 172 172">
          <path
            d="M99.4375,82.27109l-50.25625,-30.87266c-1.37734,-0.83984 -3.19141,-0.87344 -4.56875,-0.10078c-1.44453,0.80625 -2.31797,2.31797 -2.31797,3.96406v61.44297c0,1.64609 0.87344,3.15781 2.31797,3.96406c0.67188,0.36953 1.44453,0.57109 2.21719,0.57109c0.83984,0 1.64609,-0.23516 2.35156,-0.67187l50.22266,-30.60391c1.34375,-0.80625 2.18359,-2.28437 2.18359,-3.86328c0,-1.54531 -0.83984,-3.02344 -2.15,-3.82969zM126.81641,49.38281h-17.30078c-1.57891,0 -2.88906,1.27656 -2.88906,2.88906v67.48984c0,1.57891 1.27656,2.88906 2.88906,2.88906h17.30078c1.57891,0 2.88906,-1.27656 2.88906,-2.88906v-67.48984c0,-1.6125 -1.27656,-2.88906 -2.88906,-2.88906z"
            fill="#ffffff"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import useSpotify from "../../hooks/useSpotify";

import { useContext } from "@nuxtjs/composition-api";
export default {
  setup() {
    const { accessToken, getTrack, track } = useSpotify();
    const { app, params } = useContext();

    const trackId = params.value.id;

    console.log(trackId);

    getTrack(trackId).then(() => console.log("this is the", track.value));

    let player;

    const onSpotifyWebPlaybackSDKReady = () => {
      const token = accessToken.value;
      player = new Spotify.Player({
        name: "Get Fucked Cuck",
        getOAuthToken: (cb) => {
          cb(token);
        },
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
      player.addListener("player_state_changed", (state) => {
        console.log(state);
      });

      // Ready
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);

        app.$axios.$put(
          `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
          {
            uris: [`spotify:track:${trackId}`],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken.value}`,
            },
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

    const handlePrevTrack = () => {
      if (player) {
        player.previousTrack();
      }
    };
    const handleNextTrack = () => {
      if (player) {
        player.nextTrack();
      }
    };

    return { handleTogglePlay, handleNextTrack, handlePrevTrack, track };
  },
  head() {
    return {
      title: ":) || ", // Other meta information
      script: [
        {
          hid: "stripe",
          src: "https://sdk.scdn.co/spotify-player.js",
          defer: true,
        },
      ],
    };
  },
};
</script>
<style scoped>
.album-img {
  height: 45%;
  width: 45%;
}

@media only screen and (max-width: 800px) {
  .album-img {
    height: 80%;
    width: 80%;
  }
}
@media only screen and (min-width: 800px) and (max-width: 1000px) {
  .album-img {
    height: 60%;
    width: 60%;
  }
}
</style>
