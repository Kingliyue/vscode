<template>
  <div>
    教师列表
    <el-form :inline="true" 
      ref="queryTeacher"
      :model="queryTeacher"
      label-width="80px"
    >
      <el-form-item style="with:50%" >
        <el-input placeholder="姓名" v-model="queryTeacher.name"></el-input>
      </el-form-item>
      <el-form-item >
        <el-select v-model="queryTeacher.intro" placeholder="头衔">
          <el-option label="高级讲师" value="1"></el-option>
          <el-option label="中级讲师" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="queryTeacher.gmtCreate"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker
            placeholder="选择日期"
            v-model="queryTeacher.gmtModified"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-button stype="primary" @click="onSubmit()"> 查询</el-button>
      <el-button stype="primary" @click="clean()"> 清空</el-button>
    </el-form>
    <el-table :data="list" border style="width: 100%" v-loading="loading">
      <el-table-column 
        label="序号"
        type="index"
        :index="indexmethod()"
        width="150"
      >
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="level" label="头衔" width="120">
        <template slot-scope="scope">
          {{ scope.row.level === 1 ? "高级教师" : "中级讲师" }}
        </template>
      </el-table-column>
      <el-table-column prop="intro" label="资历" width="480"> </el-table-column>
      <el-table-column prop="gmtCreate" label="创建时间" width="200">
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="80"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="240">
        <template slot-scope="list">
          <el-button @click="handleClick(list.row.id)" type="danger" size="mini"
            >删除</el-button
          >
          <el-button
           @click="update(list.row.id)" type="info" size="mini">编辑</el-button>
           
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      layout="total , pager, next, jumper"
      style="padding: 30px 0; text-align: center"
      :total="total"
      :page-size="limit"
      :current-page="page"
      @current-change="getListTeacher"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getList,deleteTeacher } from "../../api/teacher";
export default {
  data() {
    return {
      list: null,
      page: 1,
      limit: 10,
      queryTeacher: {},
      total: 0,
     loading:false
    };
  },
  created() {
    this.getListTeacher();
  },
  methods: {
    indexmethod() {
      return 1 * 1;
    },
    getListTeacher(page = 1) {
      this.page = page;
      console.log(this.queryTeacher)
      this.loading =true
      getList(this.page, this.limit,this.queryTeacher)
        .then((res) => {
          this.loading =false
          this.list = res.data.ippage.records;
          this.total = res.data.ippage.total;
        })
        .catch((err) => {});
    },
    //删除
    handleClick(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteTeacher(id).then(res=>{
               this.$message({
              type: 'success',
              message: '删除成功!'
            });
                this.getListTeacher()
            }).catch(err=>{
               
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
    },
    update(id) {
      console.log(id)
      this.$router.push({path:"/teacher/addTeacher",query:{id:id}})
    },
    //查询
    onSubmit(){
      this.$refs.queryTeacher.validate(valid=>{
        console.log(valid)
          if(valid){
            this.getListTeacher()
          }
      })}
      ,
    //清空
    clean(){
      this.queryTeacher ={},

      this.getListTeacher()
    }
  },
};
</script>
   

<style>
</style>