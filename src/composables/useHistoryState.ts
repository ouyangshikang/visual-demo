import { ref } from 'vue';

/**
 * 提供历史记录管理功能的组合式函数
 * @param maxHistoryLength 历史记录最大长度限制
 * @returns 历史记录相关的状态和方法
 */
export function useHistoryState<T extends Record<string, any>>(maxHistoryLength = 50) {
  // 历史记录状态 - 使用any[]类型暂时绕过类型检查问题
  const history = ref<any[]>([]);
  const historyIndex = ref(-1);
  const canUndo = ref(false);
  const canRedo = ref(false);

  // 是否正在应用历史记录
  let isApplyingHistory = false;

  // 更新历史状态
  const updateHistoryState = () => {
    canUndo.value = historyIndex.value > 0;
    canRedo.value = historyIndex.value < history.value.length - 1;

    console.log(
      `历史状态: canUndo=${canUndo.value}, canRedo=${canRedo.value}, index=${historyIndex.value}, length=${history.value.length}`
    );
  };

  // 深拷贝对象
  const deepClone = <Type>(obj: Type): Type => {
    // 使用JSON序列化再解析的方式进行深拷贝
    return JSON.parse(JSON.stringify(obj));
  };

  // 保存当前状态到历史记录
  const saveState = (currentState: T) => {
    if (isApplyingHistory) {
      console.log('正在应用历史记录，忽略保存操作');
      return;
    }

    // 深拷贝当前状态，避免响应式引用问题
    const stateToSave = deepClone(currentState);

    // 如果历史记录为空，直接添加
    if (history.value.length === 0) {
      history.value.push(stateToSave);
      historyIndex.value = 0;
      updateHistoryState();
      console.log('首次保存历史');
      return;
    }

    // 检查新状态是否与当前状态相同，如果相同则不保存
    const currentHistoryState = history.value[historyIndex.value];
    if (JSON.stringify(currentHistoryState) === JSON.stringify(stateToSave)) {
      console.log('状态未变化，不保存历史');
      return; // 状态没有变化，不保存
    }

    // 如果在历史中间进行了操作，删除当前位置之后的历史
    if (historyIndex.value < history.value.length - 1) {
      console.log(
        `在历史中间进行操作，删除后续历史: 当前=${historyIndex.value}, 总长=${history.value.length}`
      );
      history.value = history.value.slice(0, historyIndex.value + 1);
    }

    // 限制历史记录长度，防止内存溢出
    if (history.value.length >= maxHistoryLength) {
      history.value = history.value.slice(history.value.length - maxHistoryLength + 1);
      historyIndex.value = history.value.length - 1;
      console.log(`历史记录超出限制，裁剪至${maxHistoryLength}项`);
    }

    // 添加新状态到历史并更新索引
    history.value.push(stateToSave);
    historyIndex.value = history.value.length - 1;

    // 更新撤销/重做按钮状态
    updateHistoryState();

    console.log(`保存历史成功: 索引=${historyIndex.value}, 长度=${history.value.length}`);
  };

  // 将操作应用到指定历史记录状态
  const applyState = (index: number, callback: (state: T) => void) => {
    if (index < 0 || index >= history.value.length) {
      console.error(`无法应用历史状态: 索引=${index}, 长度=${history.value.length}`);
      return;
    }

    // 获取目标状态
    const state = history.value[index];

    // 标记为正在应用历史记录，防止触发新的历史保存
    isApplyingHistory = true;

    try {
      // 通过回调应用状态 - 使用深拷贝避免引用问题
      callback(deepClone(state));

      // 更新当前索引
      historyIndex.value = index;

      console.log(`应用历史状态: 索引=${index}`);
    } catch (error) {
      console.error('应用历史状态失败:', error);
    } finally {
      // 重置标记
      setTimeout(() => {
        isApplyingHistory = false;
      }, 100);

      // 更新按钮状态
      updateHistoryState();
    }
  };

  // 撤销操作
  const undo = (callback: (state: T) => void) => {
    if (historyIndex.value <= 0) {
      console.warn('无法撤销: 已经是最早的历史记录');
      return;
    }

    // 应用前一个历史状态
    applyState(historyIndex.value - 1, callback);
  };

  // 重做操作
  const redo = (callback: (state: T) => void) => {
    if (historyIndex.value >= history.value.length - 1) {
      console.warn('无法重做: 已经是最新的历史记录');
      return;
    }

    // 应用后一个历史状态
    applyState(historyIndex.value + 1, callback);
  };

  return {
    // 状态
    canUndo,
    canRedo,
    // 是否应用中
    isApplyingHistory: () => isApplyingHistory,
    // 方法
    saveState,
    undo,
    redo
  };
}
