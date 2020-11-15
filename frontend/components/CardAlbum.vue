<template>
  <li
    @click="handleCardFlip"
    class="col-span-1 flex flex-col rounded-lg shadow mx-auto hover:shadow-lg bg-white card-album
    transform hover:-translate-y-1 md:hover:scale-110 transition ease-in-out duration-300 cursor-pointer"
  >
    <div v-if="!flipCompleted">
      <div>
        <img class="text-center w-48 h-48 mx-auto" :src="artworkUrl" alt="" />
      </div>
      <div class="mx-auto">
        <div class="">
          <div class="mt-2 select-none">
            <span class=" text-gray-500">{{ trackInfo }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>flip complete!</p>
    </div>
  </li>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref
} from "@nuxtjs/composition-api";
import useGSAP from "../hooks/useGSAP";

export default defineComponent({
  props: {
    artworkUrl: String,
    trackCount: Number
  },
  setup(props) {
    const { flipCard } = useGSAP();

    const flipCompleted = ref(false);

    const trackInfo = computed(
      () => `${props.trackCount} track${props.trackCount > 1 ? "s" : ""}`
    );

    const handleCardFlip = (event: { target: HTMLElement }) => {
      if (event.target.closest("li")) {
        flipCard(event.target.closest("li"), onCardFlipCompleted);
      }
    };

    const onCardFlipCompleted = () => {
      flipCompleted.value = true;
    };

    return { trackInfo, flipCard, handleCardFlip, flipCompleted };
  }
});
</script>
