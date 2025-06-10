<template>
  <el-dialog
      title="请假申请"
      :visible="visible"
      width="500px"
      :before-close="handleClose"
  >
    <el-form :model="formData" label-width="80px" ref="formRef">
      <el-form-item label="请假理由" required>
        <el-input v-model="formData.reason" placeholder="请输入请假理由" />
      </el-form-item>

      <el-form-item label="开始日期" required>
        <el-date-picker
            v-model="formData.startTime"
            type="date"
            placeholder="请选择开始日期"
            class="full-width"
        />
      </el-form-item>

      <el-form-item label="结束日期" required>
        <el-date-picker
            v-model="formData.endTime"
            type="date"
            placeholder="请选择结束日期"
            class="full-width"
        />
      </el-form-item>

      <el-form-item label="审批流程" required>
        <el-select v-model="formData.useFlowKey"
                   placeholder="请选择审批流程"
                   class="full-width"
        >
          <el-option
              v-for="process in approvalProcesses"
              :key="process.code"
              :label="`${process.name} (${process.code})`"
              :value="process.code"
          />
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="submit">提交申请</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { Message } from 'element-ui';
import dayjs from 'dayjs';

export default {
  name: "LeaveFormDialog",
  props: {
    visible: {
      type: Boolean,
      required: true
    },
  },
  data() {
    return {
      formData: {
        reason: '',
        startTime: '',
        endTime: '',
        days: '',
        useFlowKey: ''
      },
      approvalProcesses: [
        { id: 1, name: '普通请假流程', code: 'PROC_796222791258054016' },
        { id: 1, name: '演示-请假流程', code: 'PROC_800211638593625728' },
        { id: 2, name: '流程B', code: 'PB002' },
        { id: 3, name: '流程C', code: 'PC003' }
      ],
    };
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false);
    },

    async submit() {

      if (this.formData.endTime < this.formData.startTime) {
        Message.warning('结束日期不能早于开始日期');
        return;
      }

      //计算两个日期相差的天数
      const start = dayjs(this.formData.startTime);
      const end = dayjs(this.formData.endTime);
      const days = end.diff(start, 'day') + 1; // 返回整数天数


      const payload = {
        ...this.formData,
        startTime: dayjs(this.formData.startTime).format('YYYY-MM-DD'),
        endTime: dayjs(this.formData.endTime).format('YYYY-MM-DD'),
        days
      };

      await this.$http.post('/leave/add', payload);

      this.handleClose();

      // 通知父组件已提交成功
      this.$emit('submitted');
    }
  }
};
</script>

<style scoped>
.full-width {
  width: 100%;
}
.el-form {
  width: 100%;
}
.el-date-editor {
  width: 100% !important;
}
</style>
