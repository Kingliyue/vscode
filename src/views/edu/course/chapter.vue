<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>

    <el-steps
      :active="2"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>

    <el-button type="text" @click="openChapterDialog()">添加章节</el-button>
    <!-- 章节 -->
    <ul class="chanpterList">
      <li v-for="chapter in chapterVideoList" :key="chapter.id">
        <p>
          {{ chapter.title }}

          <span class="acts">
            <el-button style="" type="text" @click="openVideo(chapter.id)"
              >添加小节</el-button
            >
            <el-button style="" type="text" @click="openEditChatper(chapter.id)"
              >编辑</el-button
            >
            <el-button type="text" @click="removeChapter(chapter.id)"
              >删除</el-button
            >
          </span>
        </p>

        <!-- 视频 -->
        <ul class="chanpterList videoList">
          <li v-for="video in chapter.children" :key="video.id">
            <p>
              {{ video.title }}

              <span class="acts">
                <el-button style="" type="text">编辑</el-button>
                <el-button type="text" @click="removeVideo(video.id)"
                  >删除</el-button
                >
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <div>
      <el-button @click="previous">上一步</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next"
        >下一步</el-button
      >
    </div>

    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title" />
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number
            v-model="chapter.sort"
            :min="0"
            controls-position="right"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加和修改课时表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
      <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
          <el-input v-model="video.title" />
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number
            v-model="video.sort"
            :min="0"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.free">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <!-- TODO -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button
          :disabled="saveVideoBtnDisabled"
          type="primary"
          @click="saveOrUpdateVideo"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  saveChapter,
  getChapterList,
  deleteChapter,
  updateChapter,
  getChapter
} from "@/api/chapter";
import {saveVideo,getVideo,updateVideo,deleteVideo} from '@/api/video'
export default {
  data() {
    return {
      saveBtnDisabled: false,
      courseId: "", //课程id
      chapterVideoList: [],
      chapter: {
        //封装章节数据
        title: "",
        sort: 0
      },
      video: {
        title: "",
        sort: 0,
        free: 0,
        videoSourceId: ""
      },
      dialogChapterFormVisible: false, //章节弹框
      dialogVideoFormVisible: false, //小节弹框
      saveVideoBtnDisabled: false
    };
  },
  watch: {
    $route(to, from) {
      this.inint();
    }
  },
  created() {
    this.inint();
  },
  methods: {
    inint() {
      console.log("初始化");
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id;
        this.getChapterListInfo();
      }
    },
    //取消
    previous() {
      console.log(this.courseId);
      this.$router.push({ path: "/edu/course/info/" + this.courseId });
    },
    next() {
      //跳转到第二步
      this.$router.push({ path: "/edu/course/publish/" + this.courseId });
    },
    //添加章节的弹窗
    openChapterDialog() {
      //属性为true 打开弹窗
      this.dialogChapterFormVisible = true;
      this.chapter.title = "";
      this.chapter.sort = 0;
    },
    //保存章节
    saveChapterInfo() {
      this.chapter.courseId = this.courseId;
      saveChapter(this.chapter).then(res => {
        this.$message({
          type: "success",
          message: "添加成功"
        });
        //关闭弹窗
        this.dialogChapterFormVisible = false;
        this.getChapterListInfo();
        this.chapter.title = "";
        this.chapter.sort = 0;
      });
    },
    //获取章节和视频信息
    getChapterListInfo() {
      getChapterList(this.courseId).then(res => {
        this.chapterVideoList = res.data.list;
      });
    },
    //移除章节
    removeChapter(id) {
      deleteChapter(id).then(res => {
        this.$message({
          type: "success",
          message: "删除成功"
        });
        this.getChapterListInfo();
      });
    },
    //编辑章节
    openEditChatper(id) {
      this.chapter.id = id;
      this.dialogChapterFormVisible = true;
      getChapter(id).then(res => {
        this.chapter = res.data.chapter;
      });
    },
    //更新章节
    updateChapterInfo() {
      updateChapter(this.chapter).then(res => {
        this.$message({
          type: "success",
          message: "修改成功"
        });
        this.getChapterListInfo();
        this.dialogChapterFormVisible = false;
      });
    },
    //保存或者修改章节
    saveOrUpdate() {
      if (this.chapter.id) {
        this.updateChapterInfo();
      } else {
        this.saveChapterInfo();
      }
    },
    //添加小节
    openVideo(id){
      //打开小节的窗口
      this.dialogVideoFormVisible =true
      this.video.chapterId = id
    },
    //保存小节
    saveVideoInfo(){
        this.video.courseId = this.courseId
        console.log(this.video.courseId);
        
        console.log(  this.video.chapterId);
        saveVideo(this.video).then(res =>{
          this.$message({
            type:'success',
            message:'保存成功'
          })
        })
        this.dialogChapterFormVisible = false
    },
    saveOrUpdateVideo() {
      this.saveVideoInfo()
    }
  }
};
</script>
