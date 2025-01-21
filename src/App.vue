<template>
  <SpeedInsights />
  <div>
    <LoadingAnimation :isLoading="isLoading" />

    <div
      class="bgBox"
      v-motion
      :initial="{ opacity: 0, y: 25 }"
      :enter="{ opacity: 1, y: 0 }"
      :duration="1000"
    >
      <img
        src="https://misskey.s3.cn-north-1.jdcloud-oss.com/image/a7ca728f-40de-4480-bfd8-e97b7b697e40.webp"
        alt=""
      />
    </div>

    <BackgroundGrid :rows="gridRows" :cols="gridCols" />

    <div
      class="main"
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1 }"
      :duration="1000"
    >
      <div class="info">
        <div class="header">
          <img
            src="https://misskey.s3.cn-north-1.jdcloud-oss.com/image/3e96beeb-66b5-455a-a5d2-b757a3d961c1.jpeg"
            alt=""
          />
        </div>

        <div class="infoText">
          <h1>Hi,</h1>
          <h1>I'm <span class="name">Honahec</span></h1>
        </div>
      </div>

      <div class="typewriter">
        <i class="iconfont icon-quotesUp1"></i>
        <VueTyped
          :strings="typingTexts"
          :startDelay="300"
          :typeSpeed="100"
          :backSpeed="30"
          :loop="true"
          :showCursor="true"
        >
        </VueTyped>
        <i class="iconfont icon-quotesUp"></i>
      </div>

      <div class="btns">
        <a
          v-for="link in socialLinks"
          :key="link.animate"
          :href="link.href"
          target="_blank"
        >
          <vs-button type="gradient" :color="link.color" animation-type="scale">
            <i :class="`iconfont ${link.icon}`"></i>
            <template #animate>
              {{ link.animate }}
            </template>
          </vs-button>
        </a>

        <vs-button
          class="lastBtn"
          color="#457B9D"
          animation-type="scale"
          @click="showAbout = true"
        >
          <i class="iconfont icon-guanyu"></i>
          <template #animate> 关于 </template>
        </vs-button>
      </div>
    </div>

    <AboutDialog v-model="showAbout" v-model:theme="theme" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import LoadingAnimation from "./components/LoadingAnimation.vue";
import BackgroundGrid from "./components/BackgroundGrid.vue";
import AboutDialog from "./components/AboutDialog.vue";
import { ThemeManager } from "./utils/theme";
import { typingTexts, socialLinks, siteConfig } from "./config";
import { SpeedInsights } from "@vercel/speed-insights/vue";

export default {
  name: "App",
  components: {
    LoadingAnimation,
    BackgroundGrid,
    AboutDialog,
    SpeedInsights,
  },
  setup() {
    const isLoading = ref(true);
    const showAbout = ref(false);
    const theme = ref(ThemeManager.getTheme());
    const gridRows = ref(9);
    const gridCols = ref(5);

    onMounted(() => {
      ThemeManager.applyTheme(theme.value);
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", () => {
          ThemeManager.applyTheme(theme.value);
        });

      setTimeout(() => {
        isLoading.value = false;
      }, 1000);
    });

    return {
      isLoading,
      showAbout,
      theme,
      gridRows,
      gridCols,
      typingTexts,
      socialLinks,
      siteConfig,
    };
  },
};
</script>

<style lang="less">
@import url(//at.alicdn.com/t/c/font_4730772_pnwrh4bpjfl.css);
/* 阿里巴巴图标库 */
</style>
