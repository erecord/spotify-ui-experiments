<template>
  <div class="container mx-auto">
    <Nuxt />

    <SlideOverSpotifyAuth
      :hidden="slideOverSpotifyAuthHidden"
      @slide-over-close="slideOverSpotifyAuthHide"
    />
  </div>
</template>

<script>
import { defineComponent } from "@nuxtjs/composition-api";
import useAppState from "../hooks/useAppState";
export default defineComponent({
  setup() {
    const {
      slideOverSpotifyAuthHidden,
      slideOverSpotifyAuthHide
    } = useAppState();

    return { slideOverSpotifyAuthHidden, slideOverSpotifyAuthHide };
  }
});
</script>

<style>
html {
  font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

body {
  background: #2191a5;
}
</style>
