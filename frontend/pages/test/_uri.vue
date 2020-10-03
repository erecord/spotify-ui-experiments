<template>
  <div>
    <!-- Buttons -->
    <DeviceController
      v-for="(device, index) in devices.devices"
      :key="index"
      :device="device"
      :trackUri="trackUri"
    />
  </div>
</template>

<script>
import useSpotify from "../../hooks/useSpotify";
import { useContext, ref } from "@nuxtjs/composition-api";

const isPlaying = ref(false);
export default {
  setup() {
    const { devices, getDevices } = useSpotify();
    const { app, params } = useContext();

    const trackUri = params.value.uri;

    const wrapper = async () => await getDevices();

    wrapper();

    return { devices, trackUri };
  }
};
</script>
