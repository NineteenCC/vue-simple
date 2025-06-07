<template>
  <div class="home">
    <h2>{{ user }} 的主页</h2>
    <div v-if="user === '张三'">
      <h3>发起请假</h3>
      <input v-model="leaveReason" placeholder="请假理由" />
      <button @click="submitLeaveRequest">提交</button>
    </div>
    <div v-else>
      <h3>待审批的请假申请</h3>
      <ul>
        <li v-for="(request, index) in leaveRequests" :key="index">
          {{ request.reason }} - 发起人: {{ request.requester }}
          <button @click="approveRequest(index)">审批通过</button>
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
</template>

<script>export default {
  props: {
    user: String
  },
  data() {
    return {
      leaveReason: "",
      leaveRequests: [],
      approvalRecords: []
    };
  },
  methods: {
    submitLeaveRequest() {
      this.leaveRequests.push({ reason: this.leaveReason, requester: this.user });
      this.leaveReason = "";
    },
    approveRequest(index) {
      const approvedRequest = this.leaveRequests.splice(index, 1)[0];
      this.approvalRecords.push(
          `${approvedRequest.requester} 的请假已由 ${this.user} 审批通过`
      );
    }
  }
};
</script>

<style scoped>.home {
  text-align: center;
  margin-top: 50px;
}
input {
  padding: 10px;
  margin: 10px;
}
button {
  padding: 10px 20px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 10px 0;
}
</style>