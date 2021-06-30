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
      <el-form-item label="课程讲师">
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
        <el-input v-model="courseVo.description" placeholder=" " />
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
import { saveCourse } from "@/api/course";

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
      teacherList: [],
      subjectOneList: [],
      subjectTwoList: [],
    };
  },
  created() {
    this.getTeacher(), this.getSubjectList();
    console.log("info created");
  },
  methods: {
    beforeAvatarUpload() {},
    handleAvatarSuccess() {},
    subjectLevelOneChanged() {},
    //获取讲师列表
    getTeacher() {
      getTeacherList().then((res) => {
        console.log(res);
        this.teacherList = res.data.item;
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

          this.courseVo.subjectId = "";
        }
      }
    },
    next() {
      console.log("next");
      this.$router.push({ path: "/edu/course/chapter/1" });
    },
    saveOrUpdate() {
      saveCourse(this.courseVo).then((res) => {
        this.$message({
          type: "success",
          message: "添加课程信息成功!",
        });
         this.$router.push({ path: "/edu/course/chapter/"+res.data.courseId });
      });
    },
  },
};
</script>