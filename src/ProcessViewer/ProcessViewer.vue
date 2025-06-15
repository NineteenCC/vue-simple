<template>
  <div class="process-viewer">
    <div class="process-canvas" style="height: 100%;" ref="processCanvas" v-show="!isLoading" />
    <!-- 自定义箭头样式，用于成功状态下流程连线箭头 -->
    <defs ref="customSuccessDefs">
      <marker id="sequenceflow-end-white-success" viewBox="0 0 20 20" refX="11" refY="10" markerWidth="10" markerHeight="10" orient="auto">
        <path class="success-arrow" d="M 1 5 L 11 10 L 1 15 Z" style="stroke-width: 1px; stroke-linecap: round; stroke-dasharray: 10000, 1;"></path>
      </marker>
      <marker id="conditional-flow-marker-white-success" viewBox="0 0 20 20" refX="-1" refY="10" markerWidth="10" markerHeight="10" orient="auto">
        <path class="success-conditional" d="M 0 10 L 8 6 L 16 10 L 8 14 Z" style="stroke-width: 1px; stroke-linecap: round; stroke-dasharray: 10000, 1;"></path>
      </marker>
    </defs>
    <!-- 自定义箭头样式，用于失败状态下流程连线箭头 -->
    <defs ref="customFailDefs">
      <marker id="sequenceflow-end-white-fail" viewBox="0 0 20 20" refX="11" refY="10" markerWidth="10" markerHeight="10" orient="auto">
        <path class="fail-arrow" d="M 1 5 L 11 10 L 1 15 Z" style="stroke-width: 1px; stroke-linecap: round; stroke-dasharray: 10000, 1;"></path>
      </marker>
      <marker id="conditional-flow-marker-white-fail" viewBox="0 0 20 20" refX="-1" refY="10" markerWidth="10" markerHeight="10" orient="auto">
        <path class="fail-conditional" d="M 0 10 L 8 6 L 16 10 L 8 14 Z" style="stroke-width: 1px; stroke-linecap: round; stroke-dasharray: 10000, 1;"></path>
      </marker>
    </defs>
    <!-- 已完成节点悬浮弹窗 -->
    <el-dialog class="comment-dialog" :title="dlgTitle || '审批记录'" :visible.sync="dialogVisible">
      <el-row>
        <el-table :data="taskCommentList" size="mini" border header-cell-class-name="table-header-gray">
          <el-table-column label="序号" header-align="center" align="center" type="index" width="55px" />
          <!-- <el-table-column label="候选办理" prop="candidate" width="150px" align="center"/> -->
          <el-table-column label="实际办理" prop="assigneeName" width="100px" align="center"/>
          <el-table-column label="所属网点" prop="assigneeNetworkCode" width="100px" align="center"/>
          <el-table-column label="所属网点名称" prop="assigneeNetworkName" min-width="100px" align="center"/>
          <el-table-column label="处理时间" prop="createTime" width="140px" align="center"/>
          <el-table-column label="办结时间" prop="endTime" width="140px" align="center" />
          <el-table-column label="耗时" prop="duration" width="100px" align="center"/>
          <el-table-column label="审批意见" align="center">
            <template slot-scope="scope">
              {{scope.row.commentList&&scope.row.commentList[0]?scope.row.commentList[0].fullMessage:''}}
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-dialog>
    <div style="position: absolute; top: 0px; left: 0px; width: 100%;">
      <el-row type="flex" justify="space-between">
        <div class="flex-icon">
          <template v-if="showInfoIcon">
            <div class="flex-icon-item"><i class="info-icon green"></i><span>已经过的节点</span></div>
            <div class="flex-icon-item"><i class="info-icon"></i><span>未经过的节点</span></div>
            <div class="flex-icon-item"><i class="info-icon blue"></i><span>当前节点</span></div>
            <div class="flex-icon-item"><i class="info-icon red"></i><span>已退回的节点</span></div>
            <div class="flex-icon-item"><svg width="45" height="16">
              <line class="line" x1="0" y1="10" x2="35" y2="10" stroke="rgb(78,184,25)" stroke-width="2" />
              <path d="M 0,10 L 40,10 M 30,5 L 40,10 L 30,15" fill="rgb(78,184,25)"></path>
            </svg><span>已经过出口</span></div>
            <div class="flex-icon-item"><svg width="45" height="16">
              <line class="line" x1="0" y1="10" x2="35" y2="10" stroke="rgb(34, 36, 42)" stroke-width="2" />
              <path d="M 0,10 L 40,10 M 30,5 L 40,10 L 30,15" fill="rgb(34, 36, 42)"></path>
            </svg><span>未经过出口</span></div>
            <div class="flex-icon-item"><svg width="45" height="16">
              <line class="line" x1="0" y1="10" x2="35" y2="10" stroke="#E6A23C" stroke-width="2" />
              <path d="M 0,10 L 40,10 M 30,5 L 40,10 L 30,15" fill="#E6A23C"></path>
            </svg><span>已退回经过的出口</span></div>
          </template>
        </div>
        <el-button-group key="scale-control" size="medium">
          <el-button size="medium" type="default" :plain="true" :disabled="defaultZoom <= 0.3" icon="el-icon-zoom-out" @click="processZoomOut()" />
          <el-button size="medium" type="default" style="width: 90px;">{{ Math.floor(this.defaultZoom * 10 * 10) + "%" }}</el-button>
          <el-button size="medium" type="default" :plain="true" :disabled="defaultZoom >= 3.9" icon="el-icon-zoom-in" @click="processZoomIn()" />
          <el-button size="medium" type="default" icon="el-icon-c-scale-to-original" @click="processReZoom()" />
          <slot />
        </el-button-group>
      </el-row>
    </div>
  </div>
</template>

<script>
import './plugins/package/theme/index.scss';
import BpmnViewer from 'bpmn-js/lib/Viewer';
import MoveCanvasModule from 'diagram-js/lib/navigation/movecanvas';

export default {
  props: {
    xml: {
      type: String
    },
    finishedInfo: {
      type: Object
    },
    // 所有节点审批记录
    allCommentList: {
      type: Array
    },
    showInfoIcon: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialogVisible: false,
      dlgTitle: undefined,
      defaultZoom: 1,
      // 是否正在加载流程图
      isLoading: false,
      bpmnViewer: undefined,
      // 已完成流程元素
      processNodeInfo: undefined,
      // 当前任务id
      selectTaskId: undefined,
      // 任务节点审批记录
      taskCommentList: [],
      // 已完成任务悬浮延迟Timer
      hoverTimer: null
    }
  },
  watch: {
    xml: {
      handler(newXml) {
        this.importXML(newXml);
      },
      immediate: true
    },
    finishedInfo: {
      handler(newInfo) {
        this.setProcessStatus(newInfo);
      },
      immediate: true
    }
  },
  created() {
    this.$nextTick(() => {
      this.importXML(this.xml)
      this.setProcessStatus(this.finishedInfo);
    })
  },
  methods: {
    processReZoom() {
      this.defaultZoom = 1;
      try {
        this.bpmnViewer.get('canvas').zoom('fit-viewport', 'auto');
        this.bpmnViewer.get('canvas').zoom('fit-viewport', 'auto');
      } catch (error) {
        console.log(error);
      }
    },
    processZoomIn(zoomStep = 0.1) {
      const newZoom = Math.floor(this.defaultZoom * 100 + zoomStep * 100) / 100;
      if (newZoom > 4) {
        throw new Error('[Process Designer Warn ]: The zoom ratio cannot be greater than 4');
      }
      this.defaultZoom = newZoom;
      this.bpmnViewer.get('canvas').zoom(this.defaultZoom);
    },
    processZoomOut(zoomStep = 0.1) {
      const newZoom = Math.floor(this.defaultZoom * 100 - zoomStep * 100) / 100;
      if (newZoom < 0.2) {
        throw new Error('[Process Designer Warn ]: The zoom ratio cannot be less than 0.2');
      }
      this.defaultZoom = newZoom;
      this.bpmnViewer.get('canvas').zoom(this.defaultZoom);
    },
    getOperationTagType() {
      return 'success';
      // switch (type) {
      //   case this.SysFlowTaskOperationType.AGREE:
      //   case this.SysFlowTaskOperationType.MULTI_AGREE:
      //     return 'success';
      //   case this.SysFlowTaskOperationType.REFUSE:
      //   case this.SysFlowTaskOperationType.PARALLEL_REFUSE:
      //   case this.SysFlowTaskOperationType.MULTI_REFUSE:
      //     return 'warning';
      //   case this.SysFlowTaskOperationType.STOP:
      //     return 'danger'
      //   default:
      //     return 'primary';
      // }
    },
    // 流程图预览清空
    clearViewer() {
      if (this.$refs.processCanvas) {
        this.$refs.processCanvas.innerHTML = '';
      }
      if (this.bpmnViewer) {
        this.bpmnViewer.detach();
      }
      this.bpmnViewer = null;
    },
    // 添加自定义箭头
    addCustomDefs() {
      const canvas = this.bpmnViewer.get('canvas');
      const svg = canvas._svg;
      const customSuccessDefs = this.$refs.customSuccessDefs;
      const customFailDefs = this.$refs.customFailDefs;
      svg.appendChild(customSuccessDefs);
      svg.appendChild(customFailDefs);
    },
    // 任务悬浮弹窗
    onSelectElement(element) {
      this.selectTaskId = undefined;
      this.dlgTitle = undefined;

      if (this.processNodeInfo == null || this.processNodeInfo.finishedTaskSet == null) return;

      if (element == null || this.processNodeInfo.finishedTaskSet.indexOf(element.id) === -1) {
        return;
      }

      this.selectTaskId = element.id;
      this.dlgTitle = element.businessObject ? element.businessObject.name : undefined;
      // 计算当前悬浮任务审批记录，如果记录为空不显示弹窗
      this.taskCommentList = (this.allCommentList || []).filter(item => {
        return item.activityId === this.selectTaskId;
      });
      this.dialogVisible = true;
    },
    // 显示流程图
    async importXML(xml) {
      this.clearViewer();
      if (xml != null && xml !== '') {
        try {
          this.bpmnViewer = new BpmnViewer({
            additionalModules: [
              // 移动整个画布
              MoveCanvasModule
            ],
            container: this.$refs.processCanvas
          });
          // 任务节点悬浮事件
          this.bpmnViewer.on('element.click', ({ element }) => {
            this.onSelectElement(element);
          });

          this.isLoading = true;
          await this.bpmnViewer.importXML(xml);
          console.log(this.bpmnViewer);
          this.addCustomDefs();
        } catch (e) {
          this.clearViewer();
        } finally {
          this.isLoading = false;
          this.setProcessStatus(this.processNodeInfo);
        }
      }
    },
    // 设置流程图元素状态
    setProcessStatus (processNodeInfo) {
      this.processNodeInfo = processNodeInfo;
      if (this.isLoading || this.processNodeInfo == null || this.bpmnViewer == null) return;
      const { finishedTaskSet, rejectedTaskSet, unfinishedTaskSet, finishedSequenceFlowSet } = this.processNodeInfo;
      const canvas = this.bpmnViewer.get('canvas');
      const elementRegistry = this.bpmnViewer.get('elementRegistry');
      if (Array.isArray(finishedSequenceFlowSet)) {
        finishedSequenceFlowSet.forEach(item => {
          if (item != null) {
            canvas.addMarker(item, 'success');
            const element = elementRegistry.get(item);
            const conditionExpression = element.businessObject.conditionExpression;
            if (conditionExpression) {
              canvas.addMarker(item, 'condition-expression');
            }
          }
        });
      }
      if (Array.isArray(finishedTaskSet)) {
        finishedTaskSet.forEach(item => canvas.addMarker(item, 'success'));
      }
      if (Array.isArray(unfinishedTaskSet)) {
        unfinishedTaskSet.forEach(item => canvas.addMarker(item, 'primary'));
      }
      if (Array.isArray(rejectedTaskSet)) {
        rejectedTaskSet.forEach(item => {
          if (item != null) {
            const element = elementRegistry.get(item);
            if (element.type.includes('Task')) {
              canvas.addMarker(item, 'danger');
            } else {
              canvas.addMarker(item, 'warning');
            }
          }
        })
      }
    }
  },
  destroyed() {
    this.clearViewer();
  }
}
</script>

<style lang="scss" scoped>
.info-icon {
  display: inline-block;
  width: 10px;
  height: 10px;
  border: 1px solid;
  margin-right: 4px;
  &.green {
    border-color: rgb(78,184,25);
    background-color: rgba(78,184,25,0.15);
  }
  &.blue {
    border-color: rgb(64,158,255);
    background-color: rgba(64,158,255,0.15);
  }
  &.red {
    border-color: rgb(245,108,108);
    background-color: rgba(245,108,108,0.15);
  }
}
.flex-icon {
  display: flex;
  padding: 8px;
  &-item {
    margin-right: 18px;
  }
}
</style>
<style type="scss" scope>
a.bjs-powered-by {
  display: none;
}
</style>

