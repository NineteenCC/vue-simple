<template>
  <div class="home">
    <div class="card">
      <!-- 欢迎语和头像 -->
      <div class="header">
        <img src="https://i.pravatar.cc/100" alt="avatar" class="avatar" />
        <h2>欢迎回来，{{ userInfo.name }}！</h2>
      </div>

      <!-- 如果是张三，显示发起请假 -->
      <div v-if="userInfo.name === '张三'">
        <h3>发起请假</h3>
        <input v-model="leaveReason" placeholder="请假理由" />
        <button @click="submitLeaveRequest" :disabled="!leaveReason.trim()">提交</button>
      </div>

      <!-- 其他用户显示待审批申请 -->
      <div v-else>
        <h3>待审批的请假申请</h3>
        <ul>
          <li v-for="(request, index) in leaveRequests" :key="index">
            {{ request.reason }} - 发起人: {{ request.requester }}
            <button @click="approveRequest(index)">
              <i class="fas fa-check"></i> 审批通过
            </button>
          </li>
          <li v-if="leaveRequests.length === 0">暂无待审批的请假申请</li>
        </ul>
      </div>

      <!-- 审批记录 -->
      <h3>审批记录</h3>
      <ul>
        <li v-for="(record, index) in approvalRecords" :key="index">
          {{ record }}
        </li>
        <li v-if="approvalRecords.length === 0">暂无审批记录</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {name:"..."},
      leaveReason: "",
      leaveRequests: [],
      approvalRecords: []
    };
  },
  mounted() {
    // 假设当前用户信息存储在vuex里
    this.userInfo = this.$store.state.currentUser;

    // 模拟初始化待审批申请（除张三外才能审批）
    if (this.userInfo.name !== '张三') {
      this.leaveRequests = [
        { reason: "家中有事", requester: "张三" },
        { reason: "身体不适", requester: "李四" }
      ];
    }
  },
  methods: {
    submitLeaveRequest() {
      if (!this.leaveReason.trim()) return;

      // 张三发起请假，加入待审批列表（这里为了简化，直接push，实际项目可请求后端）
      this.leaveRequests.push({
        reason: this.leaveReason.trim(),
        requester: this.userInfo.name
      });
      this.leaveReason = "";
      alert("请假申请已提交，等待审批");
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

input {
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid #cccccc;
}

button {
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  font-size: 0.9rem;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
  transform: scale(1.05);
}

button i {
  margin-right: 5px;
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
