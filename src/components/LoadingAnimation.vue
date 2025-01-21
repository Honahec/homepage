<template>
  <div class="loadBox" v-show="isLoading">
    <main class="loader-container">
      <div class="loader-state">
        <svg
          class="nyan"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 47 20"
        >
          <!-- 参考 index.html 第40-104行的SVG内容 -->
          <defs>
            <linearGradient id="rainbow-colors" x1="0.5" x2="0.5" y2="1">
              <stop class="rainbow-color1" offset="0" />
              <stop class="rainbow-color1" offset="0.167" />
              <stop class="rainbow-color2" offset="0.167" />
              <stop class="rainbow-color2" offset="0.335" />
              <stop class="rainbow-color3" offset="0.335" />
              <stop class="rainbow-color3" offset="0.5" />
              <stop class="rainbow-color4" offset="0.5" />
              <stop class="rainbow-color4" offset="0.669" />
              <stop class="rainbow-color5" offset="0.669" />
              <stop class="rainbow-color5" offset="0.833" />
              <stop class="rainbow-color6" offset="0.833" />
              <stop class="rainbow-color6" offset="1" />
            </linearGradient>
          </defs>
          <g class="rainbow">
            <rect />
            <rect />
            <rect />
            <rect />
            <rect />
            <rect />
          </g>
          <g class="pig">
            <g class="foot" transform="translate(52)">
              <rect width="1" height="3" transform="translate(6 13)" />
              <rect width="1" height="3" transform="translate(8 13)" />
              <rect width="1" height="3" transform="translate(14 13)" />
              <rect width="1" height="3" transform="translate(12 13)" />
            </g>
            <g class="tail">
              <rect width="1" height="1" transform="translate(4 10)" />
              <rect width="1" height="1" transform="translate(3 11)" />
            </g>
            <g transform="translate(52)">
              <rect
                class="body1"
                width="8"
                height="8"
                transform="translate(7 6)"
              />
              <rect
                class="body1"
                width="10"
                height="8"
                transform="translate(6 7)"
              />
              <rect
                class="body1"
                width="12"
                height="6"
                transform="translate(5 8)"
              />
              <rect
                class="body2"
                width="8"
                height="6"
                transform="translate(7 7)"
              />
              <rect
                class="stains"
                width="4"
                height="1"
                transform="translate(7 13)"
              />
              <rect
                class="stains"
                width="2"
                height="1"
                transform="translate(8 12)"
              />
              <rect
                class="stains"
                width="2"
                height="1"
                transform="translate(6 9)"
              />
              <rect
                class="stains"
                width="3"
                height="1"
                transform="translate(6 8)"
              />
              <rect
                class="stains"
                width="3"
                height="1"
                transform="translate(7 7)"
              />
              <rect
                class="stains"
                width="1"
                height="1"
                transform="translate(14 7)"
              />
            </g>
            <g class="ears" transform="translate(52)">
              <rect width="1" height="3" transform="translate(10 5)" />
              <rect width="1" height="3" transform="translate(15 5)" />
            </g>
            <g class="snout">
              <rect
                class="snout1"
                width="5"
                height="3"
                transform="translate(13 10)"
              />
              <rect
                class="snout-holes"
                width="1"
                height="3"
                transform="translate(17 11) rotate(90)"
              />
              <rect
                class="snout2"
                width="1"
                height="1"
                transform="translate(16 11) rotate(90)"
              />
            </g>
            <g class="eyes">
              <rect width="1" height="1" transform="translate(12 9)" />
              <rect width="1" height="1" transform="translate(15 9)" />
            </g>
          </g>
        </svg>
      </div>
      <span class="loader-text">Loading...</span>
      <div class="background-container">
        <div class="stars"></div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "LoadingAnimation",
  props: {
    isLoading: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
