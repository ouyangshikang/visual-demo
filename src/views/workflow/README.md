# Vue Flow 工作流编辑器

基于vue-flow的工作流编辑器组件，用于创建和管理工作流图表。

## 功能特点

- 可拖拽和连接的节点
- 用于导航的交互式小地图
- 缩放和平移控件
- 可自定义工具栏
- 节点大小调整
- 不同类型的节点（输入、输出、处理、自定义）

## 依赖项

本组件需要以下依赖项：

```bash
npm install @vue-flow/core @vue-flow/background @vue-flow/minimap @vue-flow/controls @vue-flow/node-resizer
```

## 使用方式

```vue
<script setup lang="ts">
import { ref } from 'vue'
import WorkflowEditor from '@/views/flow/components/workflow-editor.vue'
import { Position } from '@vue-flow/core'

// 工作流编辑器组件引用
const workflowRef = ref(null)

// 初始节点示例
const initialNodes = [
  {
    id: 'node-1',
    type: 'input',
    label: '输入节点',
    position: { x: 100, y: 100 },
    sourcePosition: Position.Right,
    data: { content: '从这里开始工作流' }
  }
]

// 初始连线示例
const initialEdges = []

// 事件处理函数
const onNodeClick = (node) => {
  console.log('节点被点击:', node)
}
</script>

<template>
  <div class="workflow-container">
    <WorkflowEditor
      ref="workflowRef"
      :initial-nodes="initialNodes"
      :initial-edges="initialEdges"
      @node-click="onNodeClick"
    />
  </div>
</template>

<style scoped>
.workflow-container {
  width: 100%;
  height: 600px;
}
</style>
```

## 组件说明

### 工作流编辑器（workflow-editor.vue）

主要组件，渲染流程编辑器。

**属性：**
- `initialNodes`: 用于初始化编辑器的节点数组
- `initialEdges`: 用于初始化编辑器的连线数组

**事件：**
- `nodeClick`: 当节点被点击时触发
- `edgeClick`: 当连线被点击时触发
- `paneClick`: 当面板/背景被点击时触发
- `nodesChange`: 当节点变化时触发
- `edgesChange`: 当连线变化时触发

**暴露的方法：**
- `addNode(node)`: 向编辑器添加新节点
- `addEdge(edge)`: 向编辑器添加新连线
- `getNode(id)`: 通过ID获取节点
- `getEdges()`: 获取所有连线
- `zoomIn()`: 放大
- `zoomOut()`: 缩小
- `fitView()`: 调整视图以显示所有节点

### 工作流工具栏（workflow-toolbar.vue）

带有添加节点和控制视图按钮的工具栏组件。

**事件：**
- `addNode`: 当选择要添加的节点类型时触发
- `fitView`: 当点击适应视图按钮时触发
- `zoomIn`: 当点击放大按钮时触发
- `zoomOut`: 当点击缩小按钮时触发

### 工作流节点（workflow-node.vue）

可用于渲染不同类型节点的自定义节点组件。

**属性：**
- 所有标准vue-flow节点属性
- `data`: 包含节点数据的对象，如标签和内容

## 自定义样式

可以通过修改`workflow.css`中的CSS变量来自定义工作流编辑器的外观。

## 许可证

MIT