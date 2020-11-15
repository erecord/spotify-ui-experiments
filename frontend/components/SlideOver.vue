<template>
  <div>
    <transition
      enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
      enter-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
      leave-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
      <div
        class="fixed inset-0 overflow-hidden "
        @click="$emit('click')"
        v-if="!hidden"
      >
        <div class="absolute inset-0 overflow-hidden ">
          <section
            class="absolute inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16"
          >
            <!--
        Slide-over panel, show/hide based on slide-over state.

        Entering: "transform transition ease-in-out duration-500 sm:duration-700"
          From: "translate-x-full"
          To: "translate-x-0"
        Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
          From: "translate-x-0"
          To: "translate-x-full"
      -->
            <div
              :class="`w-screen max-w-md ${fullHeight ? 'h-full' : ''}`"
              ref="slideOverElement"
            >
              <div
                class="h-full flex flex-col bg-white shadow-xl overflow-y-scroll"
              >
                <header class="px-4 py-6 sm:px-6">
                  <div class="flex items-start justify-between space-x-3">
                    <h2 class="text-lg leading-7 font-medium text-gray-900">
                      {{ heading }}
                    </h2>
                    <div class="h-7 flex items-center">
                      <button
                        @click="$emit('slide-over-close')"
                        aria-label="Close panel"
                        class="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150"
                      >
                        <!-- Heroicon name: x -->
                        <svg
                          class="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </header>

                <!-- Main -->
                <slot />
              </div>
            </div>
          </section>
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref
} from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    hidden: Boolean,
    heading: String,
    fullHeight: Boolean
  },
  setup(_, { emit }) {
    const slideOverElement = ref<HTMLElement>();

    const handleDocumentClick = (event: MouseEvent) => {
      let documentElement = event.target as HTMLElement;

      let mouseClickOutsideSlideOver = documentElement.contains(
        slideOverElement.value!
      );

      if (mouseClickOutsideSlideOver) {
        emit("slide-over-close");
      }
    };

    onMounted(() => document.addEventListener("click", handleDocumentClick));
    onUnmounted(() =>
      document.removeEventListener("click", handleDocumentClick)
    );

    return { slideOverElement };
  }
});
</script>
