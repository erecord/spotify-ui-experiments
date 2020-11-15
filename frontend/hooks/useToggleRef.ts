import { ref } from "@nuxtjs/composition-api";

export default function(defaultState: boolean = false) {
  const value = ref(defaultState);
  const setOn = () => (value.value = true);
  const setOff = () => (value.value = false);
  const toggle = () => (value.value = !value.value);

  return {
    value,
    setOn,
    setOff,
    toggle
  };
}
