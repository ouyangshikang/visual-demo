<template>
  <div class="workflow-editor">
    <VueFlow
      ref="flowRef"
      :defaultNodes="props.initialNodes"
      :defaultEdges="props.initialEdges"
      @nodeClick="onNodeClick"
      @edgeClick="onEdgeClick"
      @paneClick="onPaneClick"
      @nodesChange="onNodesChange"
      @edgesChange="onEdgesChange"
      @connect="onConnect"
      @nodeDragStart="onNodeDragStart"
      @nodeDragStop="onNodeDragStop"
      :nodeTypes="nodeTypes"
      :defaultViewport="{ x: 0, y: 0, zoom: 1 }"
      :defaultEdgeOptions="{
        type: currentEdgeType,
        animated: true,
        style: {
          strokeWidth: 2,
          stroke: '#5B8FF9'
        },
        labelBgPadding: [8, 4],
        labelBgBorderRadius: 4
      }"
      :connectOnClick="true"
      class="workflow-container"
    >
      <!-- 背景 -->
      <Background pattern-color="#aaa" :gap="20" variant="dots" />

      <!-- 控制面板 -->
      <Controls position="top-right" />

      <!-- 小地图 -->
      <MiniMap position="bottom-right" />

      <!-- 节点工具栏 -->
      <NodeToolbar v-if="selectedNodeId" :nodeId="selectedNodeId" :position="Position.Top">
        <div class="node-toolbar">
          <button @click="duplicateNode(selectedNodeId)" class="toolbar-button">
            <span class="toolbar-icon">⎘</span>
            <span class="toolbar-text">复制</span>
          </button>
          <button @click="deleteNode(selectedNodeId)" class="toolbar-button delete">
            <span class="toolbar-icon">✕</span>
            <span class="toolbar-text">删除</span>
          </button>
        </div>
      </NodeToolbar>

      <!-- 工具栏面板 -->
      <Panel position="top-left" class="workflow-toolbar-panel">
        <WorkflowToolbar
          @add-node="addNode"
          @fit-view="fitView"
          @zoom-in="zoomIn"
          @zoom-out="zoomOut"
          @change-edge-type="changeEdgeType"
          @undo="handleUndo"
          @redo="handleRedo"
          :can-undo="canUndo"
          :can-redo="canRedo"
        />
      </Panel>
    </VueFlow>
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw, onMounted } from 'vue';
import { VueFlow, Panel, Position } from '@vue-flow/core';
import type {
  NodeMouseEvent,
  EdgeMouseEvent,
  Connection,
  Edge,
  Node,
  NodeChange,
  EdgeChange
} from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { MiniMap } from '@vue-flow/minimap';
import { Controls } from '@vue-flow/controls';
import { NodeToolbar } from '@vue-flow/node-toolbar';
import WorkflowToolbar from './workflow-toolbar.vue';
import WorkflowNode from './workflow-node.vue';
import { useHistoryState } from '@/composables/useHistoryState';
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import '@vue-flow/minimap/dist/style.css';
import '@vue-flow/controls/dist/style.css';
import './workflow.css';

// Vue Flow 实例引用 - 明确类型
const flowRef = ref<InstanceType<typeof VueFlow> | null>(null);

// 使用历史记录组合式函数
const { canUndo, canRedo, saveState, undo, redo, isApplyingHistory } = useHistoryState<{
  nodes: Node[];
  edges: Edge[];
}>();

// 节点拖动状态
let isNodeDragging = false;

const props = defineProps({
  initialNodes: {
    type: Array as () => Node[],
    default: () => []
  },
  initialEdges: {
    type: Array as () => Edge[],
    default: () => []
  }
});

const emit = defineEmits(['nodeClick', 'edgeClick', 'paneClick', 'nodesChange', 'edgesChange']);

// 定义节点类型
// 使用类型断言解决类型不匹配问题
const nodeTypes = {
  custom: markRaw(WorkflowNode) as any
};

// 当前连线类型
const currentEdgeType = ref('smoothstep');

// 选中的节点ID
const selectedNodeId = ref<string | null>(null);

// 初始化
onMounted(() => {
  // 需要确保在VueFlow组件初始化后再执行
  setTimeout(() => {
    if (flowRef.value) {
      // 保存初始状态到历史记录
      saveToHistory();
    }
  }, 100);
});

// 保存当前状态到历史记录
const saveToHistory = () => {
  if (!flowRef.value) {
    console.log('无法保存历史: 流程实例不存在');
    return;
  }

  // 获取当前状态
  const currentState = {
    nodes: JSON.parse(JSON.stringify(flowRef.value.nodes)),
    edges: JSON.parse(JSON.stringify(flowRef.value.edges))
  };

  // 保存到历史
  saveState(currentState);
};

// 撤销操作
const handleUndo = () => {
  if (!flowRef.value) {
    console.warn('无法撤销: 流程实例不存在');
    return;
  }

  undo((state) => {
    // 应用节点和边
    flowRef.value!.setNodes(state.nodes);
    flowRef.value!.setEdges(state.edges);
  });
};

// 重做操作
const handleRedo = () => {
  if (!flowRef.value) {
    console.warn('无法重做: 流程实例不存在');
    return;
  }

  redo((state) => {
    // 应用节点和边
    flowRef.value!.setNodes(state.nodes);
    flowRef.value!.setEdges(state.edges);
  });
};

// 事件处理函数
const onNodeClick = (event: NodeMouseEvent) => {
  // 设置选中的节点ID
  selectedNodeId.value = event.node.id;
  emit('nodeClick', event.node);
};

const onEdgeClick = (event: EdgeMouseEvent) => {
  emit('edgeClick', event.edge);
};

const onPaneClick = () => {
  // 清除选中的节点
  selectedNodeId.value = null;
  emit('paneClick');
};

// 跟踪节点拖动开始
const onNodeDragStart = () => {
  if (isApplyingHistory()) return;

  isNodeDragging = true;
  // 拖动开始时保存一次历史
  saveToHistory();
  console.log('节点拖动开始');
};

// 跟踪节点拖动结束
const onNodeDragStop = () => {
  if (isApplyingHistory()) return;

  if (isNodeDragging) {
    isNodeDragging = false;
    // 拖动结束时保存一次历史
    saveToHistory();
    console.log('节点拖动结束');
  }
};

const onNodesChange = (changes: NodeChange[]) => {
  emit('nodesChange', changes);

  // 如果正在应用历史或没有实质性变化，不保存历史
  if (isApplyingHistory() || changes.length === 0) return;

  // 只有在非拖动状态下才保存历史（因为拖动有专门的处理）
  if (!isNodeDragging) {
    // 筛选出真正重要的操作:
    // - add: 添加节点
    // - remove: 删除节点
    // - position: 位置变化(不是拖动过程中的)
    // - dimensions: 尺寸变化
    const importantChanges = changes.filter((change) => {
      // 忽略选择状态变化
      if (change.type === 'select') return false;

      // 位置变更时，只保存最终位置（而不是拖动过程中的每个位置）
      if (change.type === 'position' && isNodeDragging) return false;

      // 只保存添加、删除、位置最终变化和维度变化
      return ['add', 'remove', 'position', 'dimensions'].includes(change.type);
    });

    if (importantChanges.length > 0) {
      // 对于添加/删除/位置变更/尺寸变更节点，立即保存
      saveToHistory();
    }
    // 其他变化如单纯的选择变化不保存历史
  }
};

const onEdgesChange = (changes: EdgeChange[]) => {
  emit('edgesChange', changes);

  // 如果正在应用历史或没有实质性变化，不保存历史
  if (isApplyingHistory() || changes.length === 0) return;

  // 筛选出真正重要的操作:
  // - add: 添加连线
  // - remove: 删除连线
  // 忽略选择状态变化
  const importantChanges = changes.filter((change) => {
    // 忽略选择状态变化
    if (change.type === 'select') return false;

    // 只保存添加、删除连线
    return ['add', 'remove'].includes(change.type);
  });

  if (importantChanges.length > 0) {
    // 对于添加/删除边，立即保存
    saveToHistory();
  }
  // 其他变化如单纯的选择变化不保存历史
};

const onConnect = (connection: Connection) => {
  // 为连线生成唯一ID
  const id = `edge-${connection.source}-${connection.target}`;

  // 创建新的连线
  const newEdge: Edge = {
    id,
    source: connection.source,
    target: connection.target,
    // 应用边缘选项
    type: currentEdgeType.value,
    animated: true,
    // 添加连线样式
    style: {
      strokeWidth: 2,
      stroke: '#5B8FF9',
      strokeDasharray: '5,5' // 虚线样式，可以注释掉以显示实线
    },
    // 添加标签
    label: '连接',
    labelStyle: { fill: '#333', fontWeight: 700 },
    labelShowBg: true,
    labelBgStyle: { fill: '#FFFFFF', fillOpacity: 0.7 }
  };

  // 添加新的连线
  if (flowRef.value) {
    flowRef.value.addEdges([newEdge]);
    // 连线是重要操作，立即保存历史
    saveToHistory();
  }
};

// 更改连线类型
const changeEdgeType = (type: string) => {
  // 更新当前连线类型
  currentEdgeType.value = type;

  // 获取Vue Flow实例
  if (flowRef.value) {
    // 获取当前所有连线
    const existingEdges = flowRef.value.edges;

    // 创建更新后的连线数组
    const updatedEdges = existingEdges.map((edge: Edge) => {
      // 返回一个新的连线对象，保留原有属性但更新类型
      return {
        ...edge,
        type: type
      };
    });

    // 设置更新后的连线
    if (flowRef.value) {
      flowRef.value.setEdges(updatedEdges);
      // 更改连线类型是重要操作，立即保存历史
      saveToHistory();
    }

    console.log(`连线类型已更改为: ${type}，已更新 ${updatedEdges.length} 条连线`);
  }
};

// 公开的工作流控制方法
const zoomIn = () => {
  flowRef.value?.zoomIn();
};

const zoomOut = () => {
  flowRef.value?.zoomOut();
};

const fitView = (options: { padding: number } = { padding: 0.2 }) => {
  flowRef.value?.fitView(options);
};

const addNode = (node: Node) => {
  if (flowRef.value) {
    flowRef.value.addNodes([node]);
    // 添加节点是重要操作，立即保存历史
    saveToHistory();
  }
};

// 删除节点处理
const deleteNode = (nodeId: string) => {
  if (!flowRef.value) return;

  // 获取待删除节点的相关连线
  const relatedEdges = flowRef.value.edges.filter(
    (edge) => edge.source === nodeId || edge.target === nodeId
  );

  // 删除相关连线
  if (relatedEdges.length > 0) {
    // 使用正确的API删除边
    const newEdges = flowRef.value.edges.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId
    );
    flowRef.value.setEdges(newEdges);
  }

  // 删除节点
  const newNodes = flowRef.value.nodes.filter((node) => node.id !== nodeId);
  flowRef.value.setNodes(newNodes);

  // 清除选中节点
  selectedNodeId.value = null;

  // 保存历史
  saveToHistory();
};

// 复制节点处理
const duplicateNode = (nodeId: string) => {
  if (!flowRef.value) return;

  // 获取原节点
  const originalNode = flowRef.value.nodes.find((node) => node.id === nodeId);
  if (!originalNode) return;

  // 创建新节点，复制原节点属性
  const newNode: Node = {
    ...JSON.parse(JSON.stringify(originalNode)),
    id: `node_${Date.now()}`, // 新ID
    position: {
      x: originalNode.position.x + 50,
      y: originalNode.position.y + 50
    } // 偏移位置
  };

  // 添加新节点
  flowRef.value.addNodes([newNode]);

  // 选中新节点
  selectedNodeId.value = newNode.id;

  // 保存历史
  saveToHistory();
};

// 暴露方法
defineExpose({
  zoomIn,
  zoomOut,
  fitView,
  addNode,
  undo: handleUndo,
  redo: handleRedo,
  deleteNode
});
</script>

<style scoped>
.workflow-editor {
  width: 100%;
  height: 100%;
  position: relative;
}

.workflow-container {
  width: 100%;
  height: 100%;
  background-color: var(--vf-background-color);
}

.workflow-toolbar-panel {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 4px;
}

.node-toolbar {
  display: flex;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.toolbar-button {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
  transition: all 0.2s;
  color: #333;
  font-size: 12px;
}

.toolbar-button:hover {
  background-color: #f0f0f0;
}

.toolbar-button.delete:hover {
  background-color: #ffebeb;
  color: #f56c6c;
}

.toolbar-icon {
  margin-right: 4px;
  font-size: 14px;
}
</style>
