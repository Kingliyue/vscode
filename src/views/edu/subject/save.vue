<template>
  <div>
     <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">excel模版说明</el-tag>
        <el-tag>
          <i class="el-icon-download"/>
          <a :href="'/static/下载模板.xlsx'">点击下载模版</a>
        </el-tag>
      </el-form-item>
      <el-form-item label="选择Excel">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importBtnDisabled"
          :limit="1"
          :action="BASE_API"
          name="file"
          accept="application/vnd.ms-excel">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button
            :loading="loading"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload">{{ fileUploadBtnText }}</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import BaseUrl from '@/api/config'

export default {
  data() {
    return {
       BASE_API: BaseUrl.excelUpload, // 接口API地址
      // OSS_PATH: process.env.OSS_PATH, // 阿里云OSS地址
        fileUploadBtnText: '上传到服务器', // 按钮文字
        importBtnDisabled: false, // 按钮是否禁用,
        loading: false
    
    
    };
  },
  methods: {
    submitUpload() {
      this.fileUploadBtnText = '正在上传'
      this.importBtnDisabled = true
      this.loading = true
      this.$refs.upload.submit()
    },
    fileUploadSuccess(data) {
      console.log(data);
      this.fileUploadBtnText = '上传成功'
      this.importBtnDisabled = false
      this.loading = false
     
    },
    fileUploadError(data) {
      console.log(file);
    },
  },
};
</script>
<style scoped>
</style>