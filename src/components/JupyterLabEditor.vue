<template>
  <div>
    <h2>📝 Jupyter 代码执行器</h2>
    <div ref="editorContainer"></div>
    <button @click="executeCode">执行代码</button>
    <h3>✅ 执行结果：</h3>
    <pre>{{ executionResult }}</pre>
  </div>
</template>

<script>
import { KernelManager, ServerConnection } from '@jupyterlab/services';

import { EditorView, basicSetup } from 'codemirror';
import { python } from '@codemirror/lang-python';

export default {

  data() {

    return {
      kernel: null,
      JUPYTER_SERVER_URL: "http://192.168.0.21:8888/",
      kernelId: null,
      ws: null,
      code: "",
      executionResult: "",
      kernelManager: null,
    };
  },

  async mounted() {
    // Initialize CodeMirror editor
    this.editorView = new EditorView({
      doc: this.code,
      extensions: [basicSetup, python()],
      parent: this.$refs.editorContainer
    });

    // 创建服务器连接设置
    const settings = ServerConnection.makeSettings({
      baseUrl: this.JUPYTER_SERVER_URL,
      wsUrl: this.JUPYTER_SERVER_URL.replace('http', 'ws'),
      token: 'db414565dbe6e3eeea4bd3f5d002a4714c20bd79e17086f5',
    });

    this.kernelManager = new KernelManager({ serverSettings: settings });
    this.kernel = await this.kernelManager.startNew({ name: 'ir' }); // 确保 Jupyter 服务器支持 python3
    console.log('Kernel started:', this.kernel.id);

  },
  methods: {
    async executeCode() {
      console.log('Kernel executeCode:', this.kernel.id);

      if (!this.kernel) return;

      console.log('Kernel executeCode 开始执行:', this.editorView.state.doc.toString());

      const future = this.kernel.requestExecute({
        code: this.editorView.state.doc.toString(),
        silent: false
      });

      future.onIOPub = (msg) => {
        console.log('Kernel executeCode 执行结果:', msg);
        if (msg.content.text) {
          this.executionResult += msg.content.text + '\n';
        }
      };
    },

    async connectToKernel() {
      try {
        if (!this.kernelId) return;

        this.kernel = await this.kernelManager.connectTo(this.kernelId);
  
      } catch (error) {
        console.error('Failed to connect to kernel:', error);
      }
    },
  }
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