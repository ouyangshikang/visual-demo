<template>
  <div class="workflow-container">
    <WorkflowEditor
      ref="workflowRef"
      :initial-nodes="initialNodes"
      :initial-edges="initialEdges"
      @nodeClick="onNodeClick"
      @edgeClick="onEdgeClick"
      @nodesChange="onNodesChange"
      @edgesChange="onEdgesChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import WorkflowEditor from './components/workflow-editor.vue';
import { Position } from '@vue-flow/core';

// 工作流编辑器组件引用
const workflowRef = ref(null);

// 初始节点示例
const initialNodes = [
  {
    id: 'node-1',
    type: 'input',
    label: '输入节点',
    position: { x: 100, y: 100 },
    sourcePosition: Position.Right,
    data: { content: '从这里开始工作流' }
  },
  {
    id: 'node-2',
    type: 'default',
    label: '处理节点',
    position: { x: 300, y: 100 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { content: '处理数据' }
  },
  {
    id: 'node-3',
    type: 'output',
    label: '输出节点',
    position: { x: 500, y: 100 },
    targetPosition: Position.Left,
    data: { content: '最终输出' }
  },
  {
    id: 'node-4',
    type: 'custom',
    label: '自定义节点',
    position: { x: 300, y: 250 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { content: '这是一个自定义节点' }
  }
];

// 初始连线示例
const initialEdges = [
  {
    id: 'edge-1-2',
    source: 'node-1',
    target: 'node-2',
    animated: true
  },
  {
    id: 'edge-2-3',
    source: 'node-2',
    target: 'node-3'
  },
  {
    id: 'edge-2-4',
    source: 'node-2',
    target: 'node-4'
  }
];

// 节点点击处理
const onNodeClick = (node: any) => {
  console.log('节点被点击:', node);
};

// 连线点击处理
const onEdgeClick = (edge: any) => {
  console.log('连线被点击:', edge);
};

// 节点变化处理
const onNodesChange = (nodes: any[]) => {
  console.log('节点已变更:', nodes);
};

// 连线变化处理
const onEdgesChange = (edges: any[]) => {
  console.log('连线已变更:', edges);
};
</script>

<style scoped>
.workflow-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}
</style>
