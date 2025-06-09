<template>
  <div class="home">
    <div class="card">
      <div class="header">
        <img src="https://i.pravatar.cc/100" alt="avatar" class="avatar" />
        <h2>欢迎回来，{{ userInfo?.name || '用户' }}！</h2>
      </div>

      <div>
        <el-button type="primary" @click="showForm = true">
          申请请假
        </el-button>
        <LeaveFormDialog
            :visible.sync="showForm"
            @submitted="refresh"
        />
      </div>

      <div>
        <el-card>
          <h3>请假记录列表</h3>
          <el-table :data="leaveList" border stripe style="width: 100%">
            <el-table-column prop="id" label="ID" width="50" />
            <el-table-column prop="applicant" label="请假人" width="80"/>
            <el-table-column prop="reason" label="请假理由"/>
            <el-table-column prop="startTime" label="开始时间" width="100"/>
            <el-table-column prop="endTime" label="结束时间" width="100"/>
            <el-table-column prop="days" label="请假天数" width="90" />
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
                  查看审批日志
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>

    </div>
  </div>
</template>

<script>

import LeaveFormDialog from "@/components/LeaveFormDialog.vue";

export default {
  components: {LeaveFormDialog},
  data() {
    return {
      leaveList: [], // 新增：存储从服务端获取的请假列表
      userInfo: null,
      showForm: false,
      leaveForm: {
        reason: '',
        startDate: '',
        endDate: '',
        processId: ''
      },

      leaveRequests: [],
      approvalRecords: []
    };
  },
  mounted() {
    this.userInfo = this.$store.state.currentUser;
    this.fetchLeaveList(); // 新增：调用接口获取请假列表
  },

  methods: {
    async fetchLeaveList() {
      this.leaveList = await this.$http.get('/leave/list'); // 调用服务端接口
    },

    refresh(){
      this.fetchLeaveList();
    },

    handleApproveRecord(row) {
      console.log('查看审批记录:', row);

    },

    approveRequest(index) {
      const approvedRequest = this.leaveRequests.splice(index, 1)[0];
      this.approvalRecords.push(
          `${approvedRequest.requester} 的请假已由 ${this.userInfo.name} 审批通过`
      );
    }
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
.add-leave-btn {
  margin-bottom: 20px;
}
.leave-form {
  max-width: 400px;
  margin: 0 auto 30px;
  text-align: left;
}
.form-group {
  margin-bottom: 15px;
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


.submit-btn {
  width: 100%;
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

/* 淡入淡出动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
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
