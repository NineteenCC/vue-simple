<template>
    <div>
        <h2>首页</h2>
        <p>欢迎来到首页！</p>
        <button @click="jump('/upload')">上传文件</button>
        <button @click="jump('/editor')">代码编辑器</button>
        <button @click="jump('/JupyterLabEditor')">JupyterLabEditor</button>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    data() {
        return {
            
        }
    },
    methods: {
        jump(path) {
            this.$router.push(path)
        }
    }

};
</script>