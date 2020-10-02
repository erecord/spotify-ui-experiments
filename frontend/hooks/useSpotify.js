import qs from "qs";
import { reactive, useContext, toRefs, ref } from "@nuxtjs/composition-api";

// import axios from "axios";

const accessToken = ref("");
const refreshToken = ref("");
const playlists = ref([]);
const playlist = ref({});

export default function() {
  // const state = reactive({ accessToken: "", refreshToken: "", playlists: [] });

  const { app } = useContext();

  if (process.browser) {
    accessToken.value = localStorage.getItem("accessToken");
    refreshToken.value = localStorage.getItem("refreshToken");
  }

  const setAuthTokens = async (code, redirectUri) => {
    let resultSuccess = false;

    const clientId = "65ccdc6f18874cb78e134e15b9465098";
    const clientSecret = "7ad289318252493f9d34ca93b93908a3";

    const headers = {
      headers: {
        Authorization: `Basic ${Buffer.from(
          clientId + ":" + clientSecret
        ).toString("base64")}`
      }
    };

    const data = {
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri
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

      localStorage.setItem("accessToken", accessToken.value);
      localStorage.setItem("refreshToken", refreshToken.value);

      resultSuccess = true;
    } catch (error) {
      console.log(error);
    }

    return resultSuccess;
  };

  const getPlaylists = async () => {
    try {
      const response = await app.$axios.$get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: `Bearer ${accessToken.value}`
          }
        }
      );

      playlists.value = response.items;
    } catch (err) {
      console.log(err);
    }
  };

  const getPlaylist = async id => {
    try {
      const response = await app.$axios.$get(
        `https://api.spotify.com/v1/playlists/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken.value}`
          }
        }
      );

      console.log(response);

      playlist.value = response.tracks.items;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    playlists,
    accessToken,
    setAuthTokens,
    getPlaylists,
    getPlaylist,
    playlist
  };
}
