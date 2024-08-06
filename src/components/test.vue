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

interface Emits {
  (e: 'visible', visible: boolean): void;
}
const emit = defineEmits<Emits>();

const message = computed(() => props.msg);
onMounted(() => {});
</script>

<style scoped></style>
