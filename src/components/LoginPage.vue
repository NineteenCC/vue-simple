<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="login-title">用户登录</h2>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">用户名</label>
          <input
              type="text"
              id="username"
              v-model="username"
              placeholder="请输入用户名"
              required
              class="form-input"
          />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input
              type="password"
              id="password"
              v-model="password"
              placeholder="请输入密码"
              required
              class="form-input"
          />
        </div>
        <button type="submit" class="login-button">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "张三",
      password: "1234",
      users:[
        {id:1,name:"张三"},
        {id:2,name:"李四"},
        {id:3,name:"王五"},
        {id:4,name:"赵六"},
        {id:5,name:"老八"},
      ]
    };
  },
  methods: {
    handleLogin() {
      const matchedUser = this.users.find(e => e.name === this.username);

      if (matchedUser) {
        const loginInfo = {
          ...matchedUser,
          loginTime: new Date().toISOString()
        };
        this.$emit("login", loginInfo);
      } else {
        alert("用户名或密码错误！");
      }

    },
  },
  mounted() {
    this.$store.dispatch('logout');
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  padding: 0; /* 修改：移除上下内边距，确保背景色撑满全屏 */
}

.login-box {
  background: #ffffff;
  padding: 30px 40px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: left;
}

.form-group {
  margin-bottom: 15px; /* 新增：增加输入框之间的间距 */
}

.form-input {
  box-sizing: border-box;
  width: 100%;
  padding: 12px; /* 增加内边距 */
  font-size: 16px; /* 增大字体 */
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease; /* 添加过渡动画 */
}

.form-input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.2); /* 更柔和的聚焦阴影 */
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease; /* 新增缩放动画 */
}

.login-button:hover {
  background-color: #0056b3;
  transform: scale(1.05); /* 悬停时放大按钮 */
}
.login-title{
  text-align: center;
}
</style>