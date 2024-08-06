<template>
  <div>{{ message }}</div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';

defineOptions({ name: '' });
interface Props {
  msg?: string;
}
const props = withDefaults(defineProps<Props>(), {
  msg: 'hello'
});

const message = computed(() => props.msg);
onMounted(() => {});
</script>

<style scoped></style>
