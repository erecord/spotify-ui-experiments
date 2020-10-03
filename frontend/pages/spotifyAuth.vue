<template>
  <div />
</template>

<script>
import {
  useContext,
  defineComponent,
  onMounted
} from "@nuxtjs/composition-api";
import useSpotify from "../hooks/useSpotify";

export default defineComponent({
  setup() {
    const { query, redirect } = useContext();
    const code = query.value.code;

    const { setAuthTokens } = useSpotify();

    onMounted(() => {
      const resultSuccess = setAuthTokens(
        code,
        // "http://localhost:3000/spotifyAuth"
        "https://spotify-pwa-enl.netlify.app/home"
      ).then(() => {
        console.log(code);
      });

      if (resultSuccess) {
        redirect("/home");
      } else {
        console.error("spotifyAuth failed to set auth tokens");
      }
    });
  }
});
</script>
