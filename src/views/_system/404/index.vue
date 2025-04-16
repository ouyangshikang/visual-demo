<template>
  <div class="flex-col-center w-screen h-screen">
    <div class="text-primary p-20px">
      <icon-local-404 />
    </div>
    <router-link :to="{ name: 'home' }">
      <n-button type="primary">返回首页</n-button>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: '404' });
</script>
