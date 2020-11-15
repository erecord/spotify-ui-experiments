<script lang="ts">
import {
  useContext,
  defineComponent,
  onMounted
} from "@nuxtjs/composition-api";
import useSpotify from "../hooks/useSpotify";

export default defineComponent({
  setup() {
    const { query, redirect } = useContext();
    const { setAuthTokens } = useSpotify();

    const code: string = query.value.code;

    const resultSuccess = async () => await setAuthTokens(code);

    resultSuccess()
      .then(() => redirect("/"))
      .catch(() => console.error("spotifyAuth failed to set auth tokens"));
  }
});
</script>
