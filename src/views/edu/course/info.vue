<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps
      :active="1"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="提交审核" />
    </el-steps>
    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input
          v-model="courseVo.title"
          placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"
        />
      </el-form-item>

      <!-- 所属分类 TODO -->
      <el-form-item label="课程分类">
        <el-select
          v-model="courseVo.subjectParentId"
          placeholder="一级分类"
          @change="subjectLevelOneChanged"
        >
          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>

        <!-- 二级分类 -->
        <el-select v-model="courseVo.subjectId" placeholder="二级分类">
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>

      <!-- 课程讲师 TODO -->
      <!-- 课程讲师 -->
      <el-form-item label="课程讲师" prop="teacherList">
        <el-select v-model="courseVo.teacherId" placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number
          :min="0"
          v-model="courseVo.lessonNum"
          controls-position="right"
          placeholder="请填写课程的总课时数"
        />
      </el-form-item>

      <!-- 课程简介 TODO -->
      <el-form-item label="课程简介">
        <el-input v-model="courseVo.description" placeholder=" 课程简介" />
      </el-form-item>

      <!-- 课程封面 TODO -->
      <!-- 课程封面-->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API"
          class="avatar-uploader"
        >
          <img :src="courseVo.cover" />
        </el-upload>
      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number
          :min="0"
          v-model="courseVo.price"
          controls-position="right"
          placeholder="免费课程请设置为0元"
        />
        元
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存并下一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import BaseUrl from "@/api/config";
import { getTeacherList } from "@/api/teacher";
import { getSubject } from "@/api/subject";
import { saveCourse, getCourse, updateCourse } from "@/api/course";

export default {
  data() {
    return {
      BASE_API: BaseUrl.ossUpload,
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseVo: {
        title: "",
        subjectId: "", //二级分类id
        subjectParentId: "", //一级分类id
        teacherId: "",
        lessonNum: 0,
        description: "",
        cover: "/static/01.jpg",
        price: 0,
      },

      subjectOneList: [],
      subjectTwoList: [],
      teacherList: [],
    };
  },
  watch: {
    $route(to, from) {
      this.init();
    },
  },
  created() {
    //初始化信息
    this.init();
  },
  methods: {
    //初始化路由离得值
    init() {
      //老师列表
      //课程全部列表信息
      this.getSubjectList();
      this.getTeacher();

      if (this.$route.params && this.$route.params.id) {
          this.courseId = this.$route.params.id;
        getCourse(this.courseId).then((res) => {
          this.courseVo = res.data.courseVo;
          this.subjectLevelOneChanged(this.courseVo.subjectParentId);
        });
      }
    },
    //上传封面格式大小设定
    beforeAvatarUpload(file) {
      let types = ["image/jpeg", "image/jpg", "image/png"];
      const isImage = types.includes(file.type);
      const isLtSize = file.size / 1024 / 1024 < 5;
      if (!isImage) {
        this.$message.error("上传图片只能是 JPG、JPEG、PNG 格式!");
      }

      if (!isLtSize) {
        this.$message.error("上传图片大小不能超过 5MB!");
      }
      return isImage && isImage;
    },
    handleAvatarSuccess(data) {},
    //获取讲师列表
    getTeacher() {
      getTeacherList().then((res) => {
        this.teacherList = res.data.list;
        console.log(this.teacherList);
      });
    },
    //获取课程列表
    getSubjectList() {
      getSubject().then((res) => {
        this.subjectOneList = res.data.list;
      });
    },
    //课程级联选择
    subjectLevelOneChanged(value) {
      for (let i = 0; i < this.subjectOneList.length; i++) {
        if (this.subjectOneList[i].id === value) {
          this.subjectTwoList = this.subjectOneList[i].children;
          if (!this.courseId) {
            this.courseVo.subjectId = "";
          }
        }
      }
    },
    save() {
      console.log(this.courseVo);
      saveCourse(this.courseVo).then((res) => {
        this.$message({
          type: "success",
          message: "添加课程信息成功!",
        });
        this.$router.push({ path: "/edu/course/chapter/" + res.data.courseId });
      });
    },
    update() {
      
      updateCourse(this.courseVo).then((res) => {
        this.$message({
          type: "success",
          message: "修改课程信息成功!",
        });
        this.$router.push({ path: "/edu/course/chapter/" + this.courseId });
      });
    },
    //保存或者修改课程信息
    saveOrUpdate() {
      if (this.courseId) {
        this.update();
      } else {
        this.save();
      }
    },
  },
};
</script>