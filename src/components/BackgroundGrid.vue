<template>
  <div class="bgGrid">
    <div
      class="Grid"
      v-motion
      :initial="{ opacity: 0, y: -25 }"
      :enter="{ opacity: 1, y: 0 }"
      :duration="1000"
    >
      <div class="mask"></div>
      <div class="itemGrid-row" v-for="i in rows" :key="i">
        <div class="itemGrid-cols" v-for="j in cols" :key="j"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BackgroundGrid",
  props: {
    rows: {
      type: Number,
      default: 9,
    },
    cols: {
      type: Number,
      default: 5,
    },
  },
};
</script>
