<template>
    <div>
      <h2>📝 Jupyter 代码执行器</h2>
      <MonacoEditor
        ref="monacoEditor"
        v-model="code"
        :options="{ 
            language: 'python',
            theme: 'vs-dark',

        }"
        width="600"
        height="300"
      />
      <button @click="executeCode">执行代码</button>
      <h3>✅ 执行结果：</h3>
      <pre>{{ executionResult }}</pre>
    </div>
  </template>
  
  <script>
  import axios from "axios";
//   import * as monaco from "monaco-editor";
import MonacoEditor from 'monaco-editor-vue';

  export default {
    components: {
        MonacoEditor
    },
    data() {
        
      return {
        JUPYTER_SERVER_URL: "http://localhost:8888",
        kernelId: null,
        ws: null,
        code: "",
        executionResult: "",
      };
    },
    
    async mounted() {


      try {
        const response = await axios.post(`${this.JUPYTER_SERVER_URL}/api/kernels`);
        this.kernelId = response.data.id;
        console.log("✅ Jupyter 内核创建成功:", this.kernelId);
  
        this.ws = new WebSocket(
          `${this.JUPYTER_SERVER_URL.replace("http", "ws")}/api/kernels/${this.kernelId}/channels`
        );
  
        this.ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.msg_type === "execute_result" || data.msg_type === "stream") {
            this.executionResult += "\n" + (data.content.data ? data.content.data["text/plain"] : data.content.text);
          }
        };
      } catch (error) {
        console.error("❌ 内核创建失败:", error);
      }
    },
    methods: {
      executeCode() {
        if (!this.ws || !this.kernelId) {
          console.error("⛔ WebSocket 未连接");
          return;
        }
  
        const message = {
          header: { msg_id: "123", msg_type: "execute_request" },
          parent_header: {},
          metadata: {},
          content: { code: this.code, silent: false },
        };
        this.ws.send(JSON.stringify(message));
      },
    },
  };
  </script>
  
  <style>
  button {
    margin-top: 10px;
    padding: 10px;
    font-size: 16px;
  }
  pre {
    background: #222;
    color: #fff;
    padding: 10px;
    white-space: pre-wrap;
  }
  </style>
  