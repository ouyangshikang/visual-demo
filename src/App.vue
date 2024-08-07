<template>
  <n-config-provider
    :theme="naiveTheme"
    :theme-overrides="getThemeOverrides()"
    :locale="zhCN"
    :date-locale="dateZhCN"
    inline-theme-disabled
    class="h-full"
  >
    <naive-provider>
      <router-view />
    </naive-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed, onUnmounted, watch } from 'vue';
import { dateZhCN, zhCN, darkTheme } from 'naive-ui';
import { darkMode, getThemeOverrides, handleCssDarkMode } from '@/theme';

const { addDarkClass, removeDarkClass } = handleCssDarkMode();

const naiveTheme = computed(() => (darkMode ? darkTheme : undefined));

// 监听暗黑模式
const stopDarkMode = watch(
  () => darkMode,
  (newValue) => {
    if (newValue) {
      addDarkClass();
    } else {
      removeDarkClass();
    }
  },
  {
    immediate: true
  }
);

onUnmounted(() => {
  stopDarkMode();
});
</script>

<style scoped></style>
