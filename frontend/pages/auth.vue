<template>
  <client-only>
    <div class="container w-screen">
      <img src="../assets/public/imgs/cassette_2.jpg" />
      <div v-if="html"><span v-html="response"></span></div>
      <div class=" login-text">
        <h2 class="text-3xl md:text-5xl mb-8">Log In Below</h2>

        <div class="mt-4" v-if="error">
          <p>{{ err }}</p>
        </div>
        <a class="btn md:text-2xl" :href="spotifyAuthUrl">Authorise</a>
      </div>
    </div>
  </client-only>
</template>

<script>
export default {
  data() {
    return {
      client_id: "65ccdc6f18874cb78e134e15b9465098",
      client_secret: "7ad289318252493f9d34ca93b93908a3",
      redirect_uri: `${process.env.NUXT_ENV_FRONTEND_URL}/spotifyAuth`,
      scopes:
        "user-read-private user-read-email playlist-read-private streaming user-modify-playback-state user-read-playback-state",
      error: false,
      err: "",
      cors: "https://intense-lake-39668.herokuapp.com",
      response: "",
      html: false
    };
  },
  computed: {
    spotifyAuthUrl: function() {
      return (
        "https://accounts.spotify.com/authorize" +
        "?response_type=code" +
        "&client_id=" +
        this.client_id +
        (this.scopes ? "&scope=" + encodeURIComponent(this.scopes) : "") +
        "&redirect_uri=" +
        encodeURIComponent(this.redirect_uri)
      );
    }
  }
};
</script>

<style>
*/ .container {
  position: relative;
  text-align: center;
  color: white;
  width: 100vw;
  height: 100vh;
}
img {
  object-fit: cover;
  object-position: center;
  min-width: 100vw;
  height: 100vh;
}

.login-text {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  @apply text-white text-center absolute;
}
.btn {
  background: rgb(0, 104, 104);
  @apply px-2 py-1 rounded-sm;
}
</style>
