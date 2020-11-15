import useAppState from "../hooks/useAppState";

export default function ({}) {
  const { slideOverSpotifyAuthShow } = useAppState();

  let accessTokenFromLocalStorage = localStorage.getItem("accessToken");

  if (!accessTokenFromLocalStorage) {
    slideOverSpotifyAuthShow();
  }
}
