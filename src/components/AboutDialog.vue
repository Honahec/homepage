<template>
  <vs-dialog
    overlay-blur
    width="550px"
    not-center
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template #header>
      <h2 class="not-margin">关于本站</h2>
    </template>
    <div class="con-content">
      <vs-alert
        color="#FE8599"
        type="gradient"
        v-model:hidden-content="techHidden"
      >
        <template #title>技术栈</template>
        <p>本站基于以下技术搭建和以下服务商部署</p>

        <vs-avatar-group class="aboutAva" float max="8">
          <vs-tooltip
            placement="top"
            v-for="tech in techStack"
            :key="tech.content"
          >
            <vs-avatar :color="tech.color">
              <i :class="`iconfont ${tech.icon}`"></i>
            </vs-avatar>
            <template #content>{{ tech.content }}</template>
          </vs-tooltip>
        </vs-avatar-group>
      </vs-alert>

      <vs-alert
        color="#00BCD4"
        type="gradient"
        v-model:hidden-content="aboutHidden"
      >
        <template #title>关于项目</template>
        <p>
          你可以从这里访问
          <b>我的博客、GitHub、哔哩哔哩、网易云歌单、ICS服务器论坛</b>
          以及给我发 <b>邮件</b> ！
        </p>
        <p>项目已经开源：</p>
        <p>
          <a href="https://github.com/Honahec/homepage" target="_blank"
            >https://github.com/Honahec/homepage</a
          >
        </p>
        <p>原作者：</p>
        <p>
          <a
            href="https://github.com/QNquenan/homepage-for-vue3"
            target="_blank"
            >https://github.com/QNquenan/homepage-for-vue3</a
          >
        </p>
      </vs-alert>
    </div>

    <template #footer>
      <div class="con-footer">
        <div class="reTheme">
          <input
            type="radio"
            id="light"
            name="theme"
            :checked="theme === 'light'"
          />
          <label @click="updateTheme('light')" for="light">
            <i class="iconfont icon-baitian"></i>
          </label>

          <input
            type="radio"
            id="system"
            name="theme"
            :checked="theme === 'system'"
          />
          <label @click="updateTheme('system')" for="system">
            <i class="iconfont icon-gensuixitong"></i>
          </label>

          <input
            type="radio"
            id="dark"
            name="theme"
            :checked="theme === 'dark'"
          />
          <label @click="updateTheme('dark')" for="dark">
            <i class="iconfont icon-yewan"></i>
          </label>

          <div class="checkedBg"></div>
        </div>

        <div class="footerBtn">
          <vs-button color="#fe8599" @click="showVersion" type="border"
            >当前版本</vs-button
          >
          <vs-button color="#fe8599" @click="$emit('update:modelValue', false)"
            >知道啦</vs-button
          >
        </div>
      </div>
    </template>
  </vs-dialog>
</template>

<script>
import { ref } from "vue";
import { VsNotification } from "vuesax-alpha";
import { techStack, siteConfig } from "../config";

export default {
  name: "AboutDialog",
  props: {
    modelValue: Boolean,
    theme: String,
  },
  emits: ["update:modelValue", "update:theme"],
  setup(props, { emit }) {
    const techHidden = ref(true);
    const aboutHidden = ref(true);

    const updateTheme = (theme) => {
      emit("update:theme", theme);
    };

    const showVersion = () => {
      VsNotification({
        icon: '<i class="iconfont icon-guanyu"></i>',
        progressAuto: true,
        position: "top-center",
        title: "当前的版本",
        color: "#FE8599",
        content: `现在是 ${siteConfig.upTime} 更新的 ${siteConfig.version}`,
      });
    };

    return {
      techHidden,
      aboutHidden,
      techStack,
      showVersion,
      updateTheme,
    };
  },
};
</script>
