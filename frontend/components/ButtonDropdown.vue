<template>
  <div class="relative inline-block text-left">
    <button
      @click.stop="$emit('click')"
      type="button"
      class="inline-flex items-center p-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-400 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
    >
      <!-- Heroicon name: dots-vertical -->
      <svg
        class="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
        />
      </svg>
    </button>

    <!--
    Dropdown panel, show/hide based on dropdown state.
    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div v-if="!dropdownHidden">
        <div
          class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
        >
          <div class="rounded-md bg-white shadow-xs">
            <div
              class="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <a
                href="#"
                class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                role="menuitem"
                >View profile</a
              >
              <a
                href="#"
                class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                role="menuitem"
                >Copy profile link</a
              >
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { defineComponent } from "@nuxtjs/composition-api";
import useToggleRef from "../hooks/useToggleRef";

export default defineComponent({
  props: {
    dropdownHidden: Boolean
  }
});
</script>
