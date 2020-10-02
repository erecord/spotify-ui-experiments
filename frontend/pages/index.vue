<template>
  <client-only>
    <div>
      <div v-if="html"><span v-html="response"></span></div>
      <div class="text-white text-center mt-10">
        <h2 class="text-3xl">Log In Below</h2>
        <!-- <button class="px-2 bg-gray-300 text-black mt-4" @click="handleLogin">
          Click me!
        </button> -->

        <div class="mt-4" v-if="error">
          <p>{{ err }}</p>
        </div>
        <p>{{ response }}</p>

        <a :href="spotifyAuthUrl">Authorise</a>
        <!-- <button @click="handleLogin">Authorise</button> -->
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

      redirect_uri: "http://localhost:3000/spotifyAuth",
      scopes:
        "user-read-private user-read-email playlist-read-private streaming",
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
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
