<template>
    <div class="homepage-container">
        <div class="content-wrapper">
            <!-- 标题区域 -->
            <h1 class="page-title">工作区-数据中心-缺省</h1>

            <!-- 主要内容区域 -->
            <div class="main-content">
                <!-- 返回按钮 -->
                <div class="back-button">
                    <span class="back-icon">
                        <i class="el-icon-arrow-left"></i> 返回
                    </span>
                </div>

                <!-- 用户信息和导航 -->
                <div class="user-info">
                    <div class="avatar-wrapper">
                        <img :src="avatarUrl" alt="用户头像" class="avatar" />
                    </div>
                    <div class="user-details">
                        <div class="user-name">工作区</div>
                        <div class="user-role">
                            <span class="role-active">数据中心</span>
                        </div>
                    </div>
                </div>

                <!-- 功能按钮栏 -->
                <div class="action-buttons">
                    <div class="left-buttons">
                        <button class="action-btn upload-btn">
                            <i class="el-icon-plus"></i> 上传文件
                        </button>
                        <span class="divider">|</span>
                        <button class="action-btn download-btn">
                            <i class="el-icon-download"></i> 下载
                        </button>
                        <span class="divider">|</span>
                        <button class="action-btn delete-btn">
                            <i class="el-icon-delete"></i> 删除
                        </button>
                    </div>
                    <div class="right-buttons">
                        <span class="refresh-btn">
                            <i class="el-icon-refresh"></i> 刷新
                        </span>
                        <span class="sort-btn">
                            <i class="el-icon-sort"></i> 按时间升序
                        </span>
                    </div>
                </div>

                <!-- 安全提示 -->
                <div class="warning-alert">
                    <i class="el-icon-warning-outline"></i>
                    <span>请放心探护端机安全，采用网望云安全储存，加密传输，不泄漏任何信息</span>
                </div>

                <!-- 上传步骤区域 -->
                <div class="steps-container">
                    <!-- 第一步 -->
                    <div class="step-box">
                        <h3 class="step-title">第一步 上传文件要求</h3>
                        <ul class="step-list">
                            <li class="checked-item">
                                <i class="el-icon-check"></i> 
                                <div class="item-content">
                                    <span>仅支持上传单个文件，请将多个数据集打包后上传</span>
                                    <div class="format-hint">支持格式: tar、zip、rar、7z</div>
                                </div>
                            </li>
                            <li class="checked-item">
                                <i class="el-icon-check"></i> 
                                <div class="item-content">
                                    <span>请以英文和数字命名，文件名不能含中文和特殊字符和空格，不能以点开头</span>
                                </div>
                            </li>
                            <li class="checked-item">
                                <i class="el-icon-check"></i> 
                                <div class="item-content">
                                    <span>根据分析类型查询不同的打包要求，请查看帮助后进行打包上传</span>
                                </div>
                            </li>
                        </ul>
                        <div class="example-links">
                            <a href="#">单细胞转录组示例</a>
                            <a href="#">单细胞空间转录组示例</a>
                            <a href="#">单细胞ATAC转录组示例</a>
                        </div>
                    </div>

                    <!-- 第二步 -->
                    <div class="step-box">
                        <h3 class="step-title">第二步</h3>
                        <div class="upload-options">
                            <div class="upload-buttons">
                                <button class="upload-tab active">本地上传</button>
                                <button class="upload-tab">网盘上传</button>
                            </div>
                            <div class="upload-content">
                                <div class="checked-item upload-requirement">
                                    <i class="el-icon-check"></i>
                                    <span>请不要上传超过1GB文件，超过请选择百度网盘上传</span>
                                    <span class="progress">132M</span>
                                </div>
                                <div class="checked-item upload-requirement">
                                    <i class="el-icon-check"></i>
                                    <span>单人上传存储空间500GB，超过将不能继续上传</span>
                                </div>
                                <div class="upload-note">
                                    <span>超过1GB的文件请选择百度网盘上传</span>
                                    <span class="note-highlight">*单人上传存储空间为个人工作目录上传</span>
                                </div>
                                <div class="upload-area">
                                    <div class="upload-icon">
                                        <i class="el-icon-upload"></i>
                                    </div>
                                    <div class="upload-text">拖拽文件到这里，或<a href="#">点此添加</a></div>
                                </div>
                                <div class="upload-tip">
                                    <span>请将链接粘贴在这里</span>
                                </div>
                                <div class="upload-actions">
                                    <button class="confirm-btn">确认上传</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            avatarUrl: 'https://ai-public.mastergo.com/ai/img_res/82c2fd3217bae43f3d2676b8af2a43cc.jpg'
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        }
    }
};
</script>

<style scoped>
.homepage-container {
    min-height: 100vh;
    background-color: #f9fafb;
    display: flex;
    justify-content: center;
    padding: 0;
}

.content-wrapper {
    max-width: 1200px;
    width: 100%;
    background: white;
    border-radius: 0;
    box-shadow: none;
}

.page-title {
    color: #1d4ed8;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 20px;
}

.back-button {
    margin-bottom: 15px;
    padding: 10px 0;
}

.back-icon {
    color: #666;
    cursor: pointer;
    font-size: 14px;
}

.user-info {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
}

.avatar-wrapper {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    overflow: hidden;
    margin-right: 10px;
}

.avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.user-details {
    display: flex;
    flex-direction: column;
}

.user-name {
    font-weight: bold;
    font-size: 14px;
}

.user-role {
    font-size: 14px;
    margin-top: 5px;
}

.role-active {
    color: #1d4ed8;
    border-bottom: 2px solid #1d4ed8;
    padding-bottom: 2px;
}

.action-buttons {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    align-items: center;
}

.left-buttons {
    display: flex;
    gap: 10px;
}

.action-btn {
    padding: 8px 15px;
    border-radius: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 14px;
}

.action-btn i {
    margin-right: 5px;
}

.upload-btn {
    color: #409eff;
}

.download-btn {
    color: #606266;
}

.delete-btn {
    color: #f56c6c;
}

.divider {
    color: #dcdfe6;
    margin: 0 5px;
    font-weight: 300;
}

.right-buttons {
    display: flex;
    align-items: center;
    gap: 15px;
    color: #606266;
    font-size: 14px;
}

.refresh-btn, .sort-btn {
    cursor: pointer;
}

.warning-alert {
    background-color: #fff8f0;
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    color: #e6a23c;
}

.warning-alert i {
    margin-right: 10px;
    color: #e6a23c;
}

.steps-container {
    display: flex;
    gap: 20px;
}

.step-box {
    flex: 1;
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 15px;
}

.step-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
}

.step-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.checked-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 15px;
}

.checked-item i {
    color: #67c23a;
    margin-right: 8px;
    margin-top: 3px;
    flex-shrink: 0;
}

.item-content {
    flex: 1;
}

.format-hint {
    color: #666;
    font-size: 12px;
    margin-top: 3px;
}

.example-links {
    margin-top: 15px;
}

.example-links a {
    display: block;
    color: #1d4ed8;
    text-decoration: none;
    margin-top: 8px;
    font-size: 14px;
}

.upload-options {
    margin-top: 10px;
}

.upload-buttons {
    display: flex;
    margin-bottom: 15px;
}

.upload-tab {
    padding: 8px 15px;
    cursor: pointer;
    border: none;
    background: none;
    font-size: 14px;
}

.upload-tab.active {
    background-color: #f0f0f0;
    border-radius: 4px;
}

.upload-requirement {
    margin-bottom: 10px;
    font-size: 14px;
}

.progress {
    color: #999;
    margin-left: 10px;
}

.upload-note {
    margin: 15px 0;
    font-size: 14px;
}

.note-highlight {
    color: #e6a23c;
    display: block;
    margin-top: 5px;
}

.upload-area {
    border: 2px dashed #ddd;
    border-radius: 4px;
    padding: 30px;
    text-align: center;
    margin: 20px 0;
    background-color: #f9f9f9;
}

.upload-icon {
    font-size: 40px;
    color: #909399;
    margin-bottom: 10px;
}

.upload-text {
    color: #606266;
    font-size: 14px;
}

.upload-text a {
    color: #1d4ed8;
    text-decoration: none;
}

.upload-tip {
    color: #999;
    font-size: 14px;
    text-align: center;
    margin-bottom: 15px;
}

.upload-actions {
    display: flex;
    justify-content: flex-end;
}

.confirm-btn {
    background-color: #409eff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 20px;
    cursor: pointer;
}
.upload-btn i.el-icon-plus {
    font-size: 16px;
    font-weight: bold;
}
</style>
