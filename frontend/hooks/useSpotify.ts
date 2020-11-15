import qs from "qs";
import { reactive, useContext, toRefs, ref } from "@nuxtjs/composition-api";

// import axios from "axios";

const accessToken = ref("");
const refreshToken = ref("");
const playlists = ref([]);
const playlist = ref({});
const playlistInfo = ref({});
const devices = ref({});
const track = ref({});

export default function () {
  const { app, env } = useContext();

  const clientId = env.NUXT_ENV_SPOTIFY_CLIENT_ID;
  const clientSecret = env.NUXT_ENV_SPOTIFY_CLIENT_SECRET;
  const redirectUri = env.NUXT_ENV_SPOTIFY_REDIRECT_URI;
  const scopes = env.NUXT_ENV_SPOTIFY_SCOPES;

  const loadTokensFromLocalStorage = () => {
    if (process.browser) {
      const accessTokenFromLocalStorage = localStorage.getItem("accessToken");
      const refreshTokenFromLocalStorage = localStorage.getItem("refreshToken");

      if (accessTokenFromLocalStorage) {
        accessToken.value = accessTokenFromLocalStorage;
      }
      if (refreshTokenFromLocalStorage) {
        refreshToken.value = refreshTokenFromLocalStorage;
      }
    }
  };

  loadTokensFromLocalStorage();

  const setTokensToLocalStorage = () => {
    localStorage.setItem("accessToken", accessToken.value);
    localStorage.setItem("refreshToken", refreshToken.value);
  };

  const setAuthTokens = async (code: string) => {
    let resultSuccess = false;

    const headers = {
      headers: {
        Authorization: `Basic ${Buffer.from(
          clientId + ":" + clientSecret
        ).toString("base64")}`,
      },
    };

    const data = {
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    };

    try {
      const response = await app.$axios.$post(
        "https://accounts.spotify.com/api/token",
        qs.stringify(data),
        headers
      );

      console.log(response);

      accessToken.value = response.access_token;
      refreshToken.value = response.refresh_token;
      setTokensToLocalStorage();

      resultSuccess = true;
    } catch (error) {
      console.log(error);
    }

    return resultSuccess;
  };

  const getSpotifyAuthUrl = () => {
    return (
      "https://accounts.spotify.com/authorize" +
      "?response_type=code" +
      "&client_id=" +
      clientId +
      (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
      "&redirect_uri=" +
      encodeURIComponent(redirectUri)
    );
  };

  const getPlaylists = async (limit: number) => {
    try {
      const response = await app.$axios.$get(
        `https://api.spotify.com/v1/me/playlists?limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );

      playlists.value = response.items;
    } catch (err) {
      console.log(err);
    }
  };

  const getPlaylist = async (id: number) => {
    try {
      const response = await app.$axios.$get(
        `https://api.spotify.com/v1/playlists/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );

      playlistInfo.value = response;
      console.log(response);
      playlist.value = response.tracks.items;
    } catch (err) {
      console.log(err);
    }
  };

  const getTrack = async (id: number) => {
    try {
      const response = await app.$axios.$get(
        `https://api.spotify.com/v1/tracks/${id}`,
        { headers: { Authorization: `Bearer ${accessToken.value}` } }
      );

      track.value = response;
      console.log(track.value);
    } catch (err) {
      console.log(err);
    }
  };

  const getDevices = async () => {
    try {
      const response = await app.$axios.$get(
        `https://api.spotify.com/v1/me/player/devices`,
        {
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );

      devices.value = response;
    } catch (err) {
      console.log(err);
    }
  };

  const playSongOnDevice = async (id: number, trackUri: string) => {
    const response = await app.$axios.$put(
      `https://api.spotify.com/v1/me/player/play?device_id=${id}`,
      {
        uris: [trackUri],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.value}`,
        },
      }
    );
  };

  const play = async (id: number) => {
    const response = await app.$axios.$put(
      `https://api.spotify.com/v1/me/player/play?device_id=${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.value}`,
        },
      }
    );
  };

  const pause = async (id: number) => {
    const response = await app.$axios.$put(
      `https://api.spotify.com/v1/me/player/pause?device_id=${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.value}`,
        },
      }
    );
  };

  return {
    playlists,
    accessToken,
    setAuthTokens,
    getPlaylists,
    getPlaylist,
    playlist,
    playlistInfo,
    getDevices,
    devices,
    playSongOnDevice,
    play,
    pause,
    getTrack,
    track,
    getSpotifyAuthUrl,
  };
}
