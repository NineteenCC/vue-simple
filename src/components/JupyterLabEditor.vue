<template>
    <div>
      <h2>📝 Jupyter 代码执行器</h2>
    </div>
  </template>
  
  <script>
import { Kernel } from '@jupyterlab/services';
import { KernelManager } from '@jupyterlab/services';
export default {

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
      const kernelManager = new KernelManager();
  const kernel = await kernelManager.startNew({ name: 'python3' }); // 确保 Jupyter 服务器支持 python3
  console.log('Kernel started:', kernel.id);
    },
    async connectToKernel() {
          try {
            const kernel = await Kernel.startNew();
            console.log('Kernel started:', kernel);
            // 使用kernel执行代码等操作
          } catch (error) {
            console.error('Failed to start kernel:', error);
          }
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
  