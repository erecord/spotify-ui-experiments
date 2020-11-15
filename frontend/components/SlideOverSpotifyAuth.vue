<template>
  <div>
    <SlideOver
      :hidden="hidden"
      @click="dropdownHide"
      @slide-over-close="$emit('slide-over-close')"
      :heading="'Authorisation Request'"
      :fullHeight="true"
    >
      <div>
        <div class="pb-1 sm:pb-6">
          <div class="space-y-6">
            <div class="relative h-40 sm:h-56">
              <img
                class="absolute h-full w-full object-cover"
                src="https://blog.getsocial.io/wp-content/uploads/2015/08/open_graph_facebook-1280x720.png"
                alt=""
              />
            </div>
            <div
              class="px-4 space-y-6 sm:-mt-8 sm:flex sm:items-end sm:px-6 sm:space-x-6"
            >
              <div class="space-y-5 sm:flex-1">
                <div>
                  <div class="flex items-center space-x-2.5">
                    <h3
                      class="font-bold text-xl leading-7 text-gray-900 sm:text-2xl sm:leading-8"
                    >
                      Spotify API
                    </h3>
                  </div>
                </div>
                <div class="flex flex-wrap">
                  <span
                    class="flex-shrink-0 w-full inline-flex rounded-md shadow-sm sm:flex-1"
                  >
                    <a
                      :href="getSpotifyAuthUrl()"
                      type="button"
                      class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                    >
                      Authorise this App
                    </a>
                  </span>

                  <span
                    class="mt-3 ml-3 inline-flex rounded-md shadow-sm sm:mt-0"
                  >
                    <ButtonDropdown
                      :dropdownHidden="dropdownHidden"
                      @click="dropdownShow"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="px-4 pt-5 pb-5 sm:px-0 sm:pt-0">
          <dl class="space-y-8 px-4 sm:px-6 sm:space-y-6">
            <div class="space-y-1">
              <dt
                class="text-sm leading-5 font-medium text-gray-500 sm:w-40 sm:flex-shrink-0"
              >
                What's this?
              </dt>
              <dd class="text-sm leading-5 text-gray-900 sm:col-span-2">
                <p>
                  In order to access a range of content from Spotify, such as
                  albums, artworks, and even your very own playlists, we need
                  your permission to allow our app to request this content on
                  your behalf.<br />
                  But don't worry - It's all secured by Spotify's security
                  layers!
                </p>
              </dd>
              <dt
                class="text-sm leading-5 font-medium text-gray-500 sm:w-40 sm:flex-shrink-0"
              >
                What will happen?
              </dt>
              <dd class="text-sm leading-5 text-gray-900 sm:col-span-2">
                <p>
                  A page from Spotify will load, allowing you to login, check
                  you're happy with the permission we're requesting, and
                  authorise our app to hook into your Spotify!
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </SlideOver>
  </div>
</template>
<script lang="ts">
import { defineComponent, useContext } from "@nuxtjs/composition-api";
import useToggleRef from "../hooks/useToggleRef";
import useSpotify from "../hooks/useSpotify";

export default defineComponent({
  props: {
    hidden: Boolean
  },
  setup() {
    const { env } = useContext();
    const { getSpotifyAuthUrl } = useSpotify();

    const {
      value: dropdownHidden,
      setOn: dropdownHide,
      setOff: dropdownShow
    } = useToggleRef(true);

    return {
      dropdownHidden,
      dropdownHide,
      dropdownShow,
      getSpotifyAuthUrl
    };
  }
});
</script>
