<template>
  <div class="about">
    <h1>This is an mask page</h1>
    <!-- <n-button type="primary">啊啊啥快递</n-button> -->
    <!-- <n-date-picker type="date" /> -->
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'MaskTest' });
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
