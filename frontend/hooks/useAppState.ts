import useToggleRef from "./useToggleRef";

const {
  value: slideOverSpotifyAuthHidden,
  setOn: slideOverSpotifyAuthHide,
  setOff: slideOverSpotifyAuthShow
} = useToggleRef(true);

export default function() {
  return {
    slideOverSpotifyAuthHidden,
    slideOverSpotifyAuthShow,
    slideOverSpotifyAuthHide
  };
}
