<template>
  <div class="leave-form">
    <transition name="fade">
      <div v-if="showForm">
        <div class="form-group">
          <label>请假类型：</label>
          <select v-model="form.type">
            <option value="事假">事假</option>
            <option value="病假">病假</option>
            <option value="年假">年假</option>
          </select>
        </div>
        <div class="form-group">
          <label>开始时间：</label>
          <input type="datetime-local" v-model="form.startTime" />
        </div>
        <div class="form-group">
          <label>结束时间：</label>
          <input type="datetime-local" v-model="form.endTime" />
        </div>
        <div class="form-group">
          <label>请假原因：</label>
          <textarea v-model="form.reason" rows="3"></textarea>
        </div>
        <button class="submit-btn" @click="submitForm">提交申请</button>
      </div>
    </transition>
    <button class="add-leave-btn" @click="showForm = !showForm">
      {{ showForm ? '取消' : '新增请假申请' }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'LeaveForm',
  emits: ['submit'],
  data() {
    return {
      showForm: false,
      form: {
        type: '',
        startTime: '',
        endTime: '',
        reason: ''
      }
    }
  },
  methods: {
    submitForm() {
      this.$emit('submit', { ...this.form });
      this.form = { type: '', startTime: '', endTime: '', reason: '' };
      this.showForm = false;
    }
  }
}
</script>

<style scoped>
.leave-form {
  margin-bottom: 20px;
}
.form-group {
  margin-bottom: 10px;
}
.add-leave-btn,
.submit-btn {
  background-color: #409eff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
}
.add-leave-btn:hover,
.submit-btn:hover {
  background-color: #66b1ff;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
