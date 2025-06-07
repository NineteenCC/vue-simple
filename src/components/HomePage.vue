<template>
  <div class="home">
    <div class="card">
      <div class="header">
        <img src="https://i.pravatar.cc/100" alt="avatar" class="avatar" />
        <h2>欢迎回来，{{ userInfo?.name || '用户' }}！</h2>
      </div>

      <div v-if="userInfo?.name === '张三'">
        <!-- 新增请假按钮 -->
        <button @click="toggleForm" class="add-leave-btn">
          {{ showForm ? '关闭请假表单' : '新增请假申请' }}
        </button>

        <!-- 请假表单 -->
        <transition name="fade">
          <form v-if="showForm" @submit.prevent="submitLeaveRequest" class="leave-form">
            <div class="form-group">
              <label>请假理由：</label>
              <input v-model="leaveForm.reason" required placeholder="请输入请假理由" />
            </div>
            <div class="form-group">
              <label>开始日期：</label>
              <input type="date" v-model="leaveForm.startDate" required />
            </div>
            <div class="form-group">
              <label>结束日期：</label>
              <input type="date" v-model="leaveForm.endDate" required />
            </div>
            <!-- 其他表单项 -->
            <div class="form-group">
              <label>审批流程：</label>
              <select v-model="leaveForm.processId" required>
                <option disabled value="">请选择审批流程</option>
                <option v-for="process in approvalProcesses" :key="process.id" :value="process.id">
                  {{ process.name }}  ({{ process.code }})
                </option>
              </select>
            </div>

            <button type="submit" class="submit-btn">提交申请</button>
          </form>
        </transition>
      </div>

      <div v-else>
        <h3>待审批的请假申请</h3>
        <ul>
          <li v-for="(request, index) in leaveRequests" :key="index">
            {{ request.reason }} ({{ request.startDate }} 至 {{ request.endDate }}) - 发起人: {{ request.requester }}
            <button @click="approveRequest(index)">
              <i class="fas fa-check"></i> 审批通过
            </button>
          </li>
        </ul>
      </div>

      <h3>审批记录</h3>
      <ul>
        <li v-for="(record, index) in approvalRecords" :key="index">
          {{ record }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: null,
      showForm: false,
      leaveForm: {
        reason: '',
        startDate: '',
        endDate: '',
        processId: ''
      },
      approvalProcesses: [
        { id: 1, name: '普通请假流程', code: 'PROC_796222791258054016' },
        { id: 2, name: '流程B', code: 'PB002' },
        { id: 3, name: '流程C', code: 'PC003' }
      ],
      leaveRequests: [],
      approvalRecords: []
    };
  },
  mounted() {
    this.userInfo = this.$store.state.currentUser;
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
    },
    submitLeaveRequest() {
      // 简单校验：结束日期不能早于开始日期
      if (this.leaveForm.endDate < this.leaveForm.startDate) {
        alert('结束日期不能早于开始日期');
        return;
      }
      // 添加新请假申请
      this.leaveRequests.push({
        reason: this.leaveForm.reason,
        startDate: this.leaveForm.startDate,
        endDate: this.leaveForm.endDate,
        requester: this.userInfo.name
      });
      // 重置表单
      this.leaveForm.reason = '';
      this.leaveForm.startDate = '';
      this.leaveForm.endDate = '';
      this.showForm = false;
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

select {
  width: 100%;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.5px;
  /* 不能单独控制option里的文字颜色和对齐 */
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
  max-width: 600px;
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
