<template>
  <div :class="['workflow-node', `workflow-node-${props.type}`]" :style="nodeStyle">
    <!-- 节点调整器，用于调整节点大小 -->
    <NodeResizer :min-width="100" :min-height="30" :is-visible="props.selected" />

    <!-- 源连接点 -->
    <Handle
      v-if="showSourceHandle"
      type="source"
      :position="Position.Right"
      :style="{ background: '#555' }"
    />

    <!-- 目标连接点 -->
    <Handle
      v-if="showTargetHandle"
      type="target"
      :position="Position.Left"
      :style="{ background: '#555' }"
    />

    <!-- 节点内容 -->
    <div class="workflow-node-content">
      <div class="workflow-node-header">
        <strong>{{ props.data?.label || props.label }}</strong>
      </div>
      <div class="workflow-node-body" v-if="props.data?.content">
        {{ props.data.content }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Handle, Position } from '@vue-flow/core';
import { NodeResizer } from '@vue-flow/node-resizer';
import '@vue-flow/node-resizer/dist/style.css';

// 节点数据接口
interface NodeData {
  label?: string;
  content?: string;
}

// 获取父组件中的节点数据
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'default'
  },
  selected: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object as () => NodeData,
    default: () => ({})
  },
  label: {
    type: String,
    default: ''
  }
});

// 根据类型确定节点样式
const nodeStyle = computed(() => {
  const baseStyle = {
    padding: '10px',
    borderRadius: '3px',
    fontSize: '12px',
    color: '#222',
    textAlign: 'center',
    width: '180px'
  };

  const styles: Record<string, any> = {
    input: {
      background: '#d4f8d4',
      border: '1px solid #95d895'
    },
    output: {
      background: '#ffebeb',
      border: '1px solid #ffb5b5'
    },
    default: {
      background: '#f0f0f0',
      border: '1px solid #ddd'
    },
    custom: {
      background: '#e6f7ff',
      border: '1px solid #a6d8ff'
    }
  };

  return {
    ...baseStyle,
    ...(styles[props.type] || styles.default)
  };
});

// 确定是否显示连接点
const showSourceHandle = computed(() => {
  return props.type !== 'output';
});

const showTargetHandle = computed(() => {
  return props.type !== 'input';
});
</script>

<style scoped>
.workflow-node {
  position: relative;
  min-height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.workflow-node-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.workflow-node-header {
  font-weight: 500;
}

.workflow-node-body {
  font-size: 11px;
  opacity: 0.8;
}
</style>
