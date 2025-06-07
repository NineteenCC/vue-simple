<template>
  <div>
    <h3>我待处理的申请：</h3>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        {{ item.type }} | {{ item.startTime }} - {{ item.endTime }} | {{ item.reason }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ApprovalList',
  props: {
    list: Array
  }
}
</script>

<style scoped>
h3 {
  margin-top: 20px;
}
ul {
  padding-left: 20px;
}
li {
  margin-bottom: 5px;
}
</style>
