<template>
  <div class="workflow-toolbar">
    <div class="toolbar-section">
      <h3>添加节点</h3>
      <div class="node-buttons">
        <button
          v-for="nodeType in nodeTypes"
          :key="nodeType.type"
          @click="addNewNode(nodeType.type)"
          class="node-button"
        >
          {{ nodeType.label }}
        </button>
      </div>
    </div>

    <div class="toolbar-section">
      <h3>连线样式</h3>
      <div class="edge-buttons">
        <button
          v-for="edgeType in edgeTypes"
          :key="edgeType.type"
          @click="changeEdgeType(edgeType.type)"
          class="edge-button"
          :class="{ 'edge-button-active': activeEdgeType === edgeType.type }"
        >
          {{ edgeType.label }}
        </button>
      </div>
    </div>

    <div class="toolbar-section">
      <h3>历史记录</h3>
      <div class="history-buttons">
        <button
          @click="handleUndo"
          class="control-button"
          :disabled="!props.canUndo"
          :class="{ 'button-disabled': !props.canUndo }"
        >
          撤销
        </button>
        <button
          @click="handleRedo"
          class="control-button"
          :disabled="!props.canRedo"
          :class="{ 'button-disabled': !props.canRedo }"
        >
          重做
        </button>
      </div>
    </div>

    <div class="toolbar-section">
      <h3>控制</h3>
      <div class="control-buttons">
        <button @click="handleZoomIn" class="control-button">放大</button>
        <button @click="handleZoomOut" class="control-button">缩小</button>
        <button @click="handleFitView" class="control-button">适应视图</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Position } from '@vue-flow/core';

const emit = defineEmits([
  'addNode',
  'fitView',
  'zoomIn',
  'zoomOut',
  'changeEdgeType',
  'undo',
  'redo'
]);

const props = defineProps({
  canUndo: {
    type: Boolean,
    default: false
  },
  canRedo: {
    type: Boolean,
    default: false
  }
});

// 节点类型
const nodeTypes = [
  { label: '默认节点', type: 'default' },
  { label: '输入节点', type: 'input' },
  { label: '输出节点', type: 'output' },
  { label: '自定义节点', type: 'custom' }
];

// 连线类型
const edgeTypes = [
  { label: '直线', type: 'default' },
  { label: '平滑曲线', type: 'smoothstep' },
  { label: '贝塞尔曲线', type: 'bezier' },
  { label: '直角线', type: 'step' }
];

// 当前选择的连线类型
const activeEdgeType = ref('smoothstep');

// 为新节点生成唯一ID
const generateId = () => `node_${Date.now()}`;

// 添加新节点
const addNewNode = (type: string) => {
  const id = generateId();

  // 获取随机位置，避免节点重叠
  const position = {
    x: 100 + Math.floor(Math.random() * 200),
    y: 100 + Math.floor(Math.random() * 200)
  };

  const newNode = {
    id,
    type,
    label: `${type === 'custom' ? '自定义' : type.charAt(0).toUpperCase() + type.slice(1)} 节点`,
    position,
    ...(type === 'input' && { sourcePosition: Position.Right }),
    ...(type === 'output' && { targetPosition: Position.Left }),
    ...(type === 'default' && {
      sourcePosition: Position.Right,
      targetPosition: Position.Left
    }),
    ...(type === 'custom' && {
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      data: { content: '这是一个自定义节点' }
    })
  };

  emit('addNode', newNode);
};

// 处理缩放操作
const handleZoomIn = () => {
  emit('zoomIn');
};

const handleZoomOut = () => {
  emit('zoomOut');
};

// 调整视图以查看所有节点
const handleFitView = () => {
  emit('fitView', { padding: 0.2 });
};

// 切换连线类型
const changeEdgeType = (type: string) => {
  activeEdgeType.value = type;
  emit('changeEdgeType', type);
};

// 撤销操作
const handleUndo = () => {
  emit('undo');
};

// 重做操作
const handleRedo = () => {
  emit('redo');
};
</script>

<style scoped>
.workflow-toolbar {
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 150px;
}

.toolbar-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.toolbar-section h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #555;
}

.node-buttons,
.edge-buttons,
.history-buttons,
.control-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.node-button,
.edge-button,
.control-button {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.edge-button-active {
  background-color: #e6f7ff;
  border-color: #5b8ff9;
  color: #1890ff;
  font-weight: 600;
}

.button-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.node-button:hover,
.edge-button:hover,
.control-button:not(.button-disabled):hover {
  background-color: #e8e8e8;
  border-color: #ccc;
}
</style>
