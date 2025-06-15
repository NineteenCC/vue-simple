<template>
  <div class="home">
    <div class="card">
      <div class="header">
        <img src="https://i.pravatar.cc/100" alt="avatar" class="avatar"/>
        <h2>欢迎回来，{{ userInfo?.name || '用户' }}！</h2>
      </div>

      <div style="margin-bottom: 10px">
        <el-button type="primary" @click="showForm = true">
          申请请假
        </el-button>

        <LeaveFormDialog
            :visible.sync="showForm"
            @submitted="refresh"
        />
      </div>

      <div class="table-wrapper">
        <el-card>
          <h3>请假记录列表</h3>
          <el-table :data="leaveList" border stripe style="width: 100%">
            <el-table-column prop="id" label="ID" width="50"/>
            <el-table-column prop="applicant" label="请假人" width="80"/>
            <el-table-column prop="reason" label="请假理由"/>
            <el-table-column prop="startTime" label="开始时间" width="100"/>
            <el-table-column prop="endTime" label="结束时间" width="100"/>
            <el-table-column prop="days" label="请假天数" width="90"/>
            <el-table-column prop="flowState" label="流程状态" width="80"/>
            <el-table-column prop="createTime" label="创建时间" width="180"/>
            <el-table-column prop="processInstanceId" label="流程实例ID" width="200"/>
            <!-- 操作列 -->
            <el-table-column label="操作" width="250">
              <template v-slot="scope">
                <el-button
                    type="primary"
                    size="mini"
                    @click="handleApproveRecord(scope.row)"
                >
                  审批日志
                </el-button>
                <el-button
                    type="primary"
                    :loading="processTraceLoading"
                    @click="openProcessTrace(scope.row)"
                >
                  流程跟踪
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>


      <div class="table-wrapper">
        <el-card>
          <h3>待办列表</h3>
          <el-table :data="todoList" border stripe style="width: 100%">
            <el-table-column prop="id" label="ID" width="50"/>
            <el-table-column prop="applicant" label="请假人" width="80"/>
            <el-table-column prop="reason" label="请假理由"/>
            <el-table-column prop="startTime" label="开始时间" width="100"/>
            <el-table-column prop="endTime" label="结束时间" width="100"/>
            <el-table-column prop="days" label="请假天数" width="90"/>
            <el-table-column prop="flowState" label="流程状态" width="80"/>
            <el-table-column prop="createTime" label="创建时间" width="180"/>
            <el-table-column prop="processInstanceId" label="流程实例ID" width="200"/>
            <!-- 操作列 -->
            <el-table-column label="操作" width="150">
              <template v-slot="scope">
                <el-button
                    type="primary"
                    size="mini"
                    @click="handleApproveRecord(scope.row)"
                >
                  审批
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>

      <el-dialog
          title="流程跟踪"
          :visible.sync="showProcessTrace"
          center
          width="90%"
      >
          <ProcessViewer
              :xml="bpmnXml"
              :finishedInfo="processNodeInfo"
              :allCommentList="commentList"
              :showInfoIcon="true"
              style="height: 600px"
          />
      </el-dialog>


      <el-dialog
          title="审批日志"
          :visible.sync="approvalDialogVisible"
          width="400px"
          center
      >
        <el-steps direction="vertical" :active="approvalLogs.length" finish-status="success" :space="80">
          <el-step
              v-for="(log, index) in approvalLogs"
              :key="index"
              :title="`${log.nodeName}(${log.nodeCode})`"
              :description="`审批人: ${log.approver}\n审批时间: ${log.approvalTime}`"
          />
        </el-steps>
      </el-dialog>

    </div>

  </div>
</template>

<script>

import LeaveFormDialog from "@/components/LeaveFormDialog.vue";
import ProcessViewer from "@/ProcessViewer/ProcessViewer.vue";

export default {
  components: {ProcessViewer, LeaveFormDialog},
  data() {
    return {

      leaveList: [], // 新增：存储从服务端获取的请假列表
      todoList: [], // 新增：存储从服务端获取的请假列表
      userInfo: null,
      showForm: false,
      showProcessTrace: false,
      leaveForm: {
        reason: '',
        startDate: '',
        endDate: '',
        processId: ''
      },

      leaveRequests: [],
      approvalRecords: [],
      approvalDialogVisible: false,
      approvalLogs: [],

      //流程跟踪相关的数据
      processTraceLoading: false, // 新增：控制流程跟踪按钮的加载状态
      bpmnXml: '',
      commentList: [],
      processNodeInfo: {},
    }
  },
  mounted() {
    this.userInfo = this.$store.state.currentUser;
    this.fetchLeaveList(); // 新增：调用接口获取请假列表
    this.fetchTodoList(); // 新增：调用接口获取请假列表
  },

  methods: {

    openProcessTrace(row){
      this.processTraceLoading = true; // 开始加载
      this.queryProcessTrace(row)
      this.processTraceLoading = false; // 结束加载
    },

    async queryProcessTrace(row) {
      const processTrace = this.$http.get('/leave/queryProcessTraceDetail?processInstanceId=' + row.processInstanceId);
      processTrace.then(
          (response) => {
            this.bpmnXml = response.bpmnXml;
            // this.commentList = response.historyProcNodeList;
            this.processNodeInfo = response.flowViewer;
            this.showProcessTrace = true;
          }
      )
    },


    async fetchLeaveList() {
      this.leaveList = await this.$http.get('/leave/list'); // 调用服务端接口
    },

    async fetchTodoList() {
      const todoList = await this.$http.get('/leave/getPendingTasks');
      this.todoList = todoList.records; // 调用服务端接口
    },

    refresh() {
      this.fetchLeaveList();
      this.fetchTodoList();
    },

    async handleApproveRecord(row) {
      this.approvalDialogVisible = true;
      // 模拟加载审批日志数据
      this.approvalLogs = await this.$http.get('/approvalRecord/getByProcessInstanceId?processInstanceId=' + row.processInstanceId); // 调用服务端接口

    },

  }
};
</script>

<style scoped>


el-card {
  margin: 20px;
}

.home {
  text-align: center;
  margin-top: 50px;
}

.card {
  background: linear-gradient(135deg, #ffffff, #f5f7fa);
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 80%;
  margin: 0 auto;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

h2 {
  font-weight: 600;
  font-size: 1.5rem;
  margin: 0;
}

button {
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  font-size: 0.9rem;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
}

.form-group select,
.form-group input {
  width: 100%;
  padding: 8px 10px;
  border-radius: 5px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 500;
  transition: transform 0.2s ease;
}

li:hover {
  transform: scale(1.02);
}


/* 移动端适配 */
@media (max-width: 600px) {
  .card {
    padding: 15px;
    max-width: 100%;
  }

  h2 {
    font-size: 1.2rem;
  }

  button {
    font-size: 0.8rem;
    padding: 8px 12px;
  }
}
</style>
