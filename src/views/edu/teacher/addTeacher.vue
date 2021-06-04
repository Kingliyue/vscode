<template>
  <div class="app-container">
    讲师表单
 <!-- 讲师头像：TODO -->
    <el-form label-width="120px">
        <el-form-item label="讲师头像">
          <!-- 头衔缩略图 -->
          <pan-thumb :image="teacher.avatar"/>
          <!-- 文件上传按钮 -->
          <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">上传头像
          </el-button>
          <!--
              v-show：是否显示上传组件
              :key：类似于id，如果一个页面多个图片上传控件，可以做区分
              :url：后台上传的url地址
              @close：关闭上传组件
              @crop-upload-success：上传成功后的回调 
                <input type="file" name="file"/>
              -->
          <image-cropper
                        ref="imgcropper"
                        v-show="imagecropperShow"
                        :width="300"
                        :height="300"
                        :key="imagecropperKey"
                        :url= BASE_API
                        field="file"
                        @close="close"
                        @crop-upload-success="cropSuccess"/>
      </el-form-item>

      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number
          v-model="teacher.sort"
          controls-position="right"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career" />
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImageCropper from  "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";
import { addTeacher, getTeacher, updateTeacher } from "@/api/teacher";
import BaseUrl from '@/api/config';
export default {
  components:{ImageCropper,PanThumb},
  data() {
    return {
      teacher: {
        name: "",
        sort: 0,
        level: 1,
        career: "",
        intro: "",
        avatar: "",
      },
      saveBtnDisabled: false,
      min: "0",
    // 上传头像的属性
    //是否打开弹窗
    imagecropperShow :false,
    //唯一标识
    imagecropperKey  :0,

    BASE_API:BaseUrl.ossUpload


    };
  },
  watch: {
    $route(to, from) {
      this.init();
    },
  },

  created() {
    this.init();
  },
  methods: {
    //当路由中的有参数的时候根据id获取值
    init() {
      console.log(this.$route.query.id);
      if (this.$route.query && this.$route.query.id) {
        let id = this.$route.query.id;
        //根据id 查询信息
        getTeacher(id).then((res) => {
          this.teacher = res.data.teacher;
        });
      }
    },

    saveOrUpdate() {
      if (this.teacher.id) {
        this.update();
      } else {
        this.save();
      }
    },
    update() {
      updateTeacher(this.teacher).then((res) => {
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        //添加成功之后跳转路由
        this.$router.push({ path: "/edu/teacher/listTeacher" });
      });
    },
    save() {
      addTeacher(this.teacher).then((res) => {
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        //添加成功之后跳转路由
        this.$router.push({ path: "/edu/teacher/listTeacher" });
      });
    },
      //进度条
     

    //上传头像关闭窗口
    close(){
        this.imagecropperShow =false
        this.imagecropperKey +=1
    },
    //上传头像成功返回的方法
    cropSuccess(data){
      this.teacher.avatar = data.url
      console.log( this.teacher.avatar);
      this.$message({
          type: "success",
          message: "上传成功!",
        });
    }

  }
}


</script>