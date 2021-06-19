<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container" style="margin: 65px 0 10px 0;">
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="changeFreezeState">冻结（解冻）用户管理</el-button>
      <el-button class="filter-item" type="warning" icon="el-icon-star-on" @click="changeMuteState">禁言（解禁）用户管理</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="changeRecipeState">推荐菜谱管理</el-button>

<!--      <el-input placeholder=" "  icon="search" v-model="keyword" :on-icon-click="handleIconClick" @keyup.enter.native="searchEnterFun"> </el-input>-->

<!--      <input style="left: auto" placeholder="搜索" type="text" @keyup.enter="searchEnterFun">-->

<!--      <el-input style="width: 15%"-->
<!--                type="warning"-->
<!--                placeholder="想搜点什么呢.."-->
<!--                prefix-icon="el-icon-search"-->
<!--                v-model="keyword"-->
<!--                v-on:keyup.enter="search"-->
<!--      ></el-input>-->

    </div>
    <el-table v-if="freeze_visible" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection"/>
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户id" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user_id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户名" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="冻结状态" width="150" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.freeze == 'z'">
            <span>正常</span>
          </template>
          <template v-if="scope.row.freeze == 'd'">
            <span>冻结</span>
          </template>
          <template v-if="scope.row.freeze == 2">
            <span>解冻</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" min-width="230">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handlePass1(scope.row)">冻结
          </el-button>
          <el-button type="error" size="small" @click="handleFail(scope.row)">解冻
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-table v-if="mute_visible" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection"/>
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户id" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user_id}}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户名" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user_name}}</span>
        </template>
      </el-table-column>

      <el-table-column label="禁言状态" width="150" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.mute == 'z'">
            <span>正常</span>
          </template>
          <template v-if="scope.row.mute == 'j'">
            <span>禁言</span>
          </template>
          <template v-if="scope.row.mute == 2">
            <span>解禁</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" min-width="230">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handlePass2(scope.row)">禁言
          </el-button>
          <el-button type="error" size="small" @click="handleFail2(scope.row)">解禁
          </el-button>
        </template>
      </el-table-column>

      <!--      <el-table-column label="操作" fixed="right" min-width="230">-->
      <!--        <template slot-scope="scope">-->
      <!--          <el-button v-permission="'/blogSort/stick'" type="warning" size="small" @click="handleStick(scope.row)">审核成功</el-button>-->
      <!--          <el-button v-permission="'/blogSort/edit'" type="primary" size="small" @click="handleEdit(scope.row)">审核失败</el-button>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
    </el-table>

    <el-table v-if="recipe_visible" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection"/>
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="菜谱ID" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.recipe_id }}</span>
        </template>
      </el-table-column>


      <el-table-column label="操作" fixed="right" min-width="230">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handlePass(scope.row)">推荐
          </el-button>
        </template>
      </el-table-column>

      <!--      <el-table-column label="操作" fixed="right" min-width="230">-->
      <!--        <template slot-scope="scope">-->
      <!--          <el-button v-permission="'/blogSort/stick'" type="warning" size="small" @click="handleStick(scope.row)">审核成功</el-button>-->
      <!--          <el-button v-permission="'/blogSort/edit'" type="primary" size="small" @click="handleEdit(scope.row)">审核失败</el-button>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
    </el-table>

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="活动名" prop="sortName">
          <el-input v-model="form.sortName" auto-complete="off"/>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="活动介绍" prop="content">
          <el-input v-model="form.description" auto-complete="off"/>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="起始时间" prop="sort">
          <!--          <el-input v-model="form.startTime" auto-complete="off"/>-->
          <el-date-picker
            v-model="form.startTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="终止时间" prop="sort">
          <!--          <el-input v-model="form.endTime" auto-complete="off"/>-->
          <el-date-picker
            v-model="form.endTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="奖励个人积分" prop="sort">
          <el-input v-model="form.credit" auto-complete="off"/>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {deleteBatchBlogSort} from '@/api/blogSort'
  import {
    FreezeUser,
    getFreezeList,
    getMuteList,
    getRecipeList, MuteUser,
    RecommendRecipe,
    UnfreezeUser, UnmuteUser,
    workReport
  } from '../api/report'
  import {addBlogSort} from '../api/blogSort'
  export default {
    data () {
      return {
        recipe_visible: false,
        mute_visible: false,
        freeze_visible: true,
        multipleSelection: [], // 多选，用于批量删除
        tableData: [],
        keyword: '',
        currentPage: 1,
        pageSize: 10,
        total: 0, // 总数量
        title: '增加分类',
        dialogFormVisible: false, // 控制弹出框
        formLabelWidth: '120px',
        isEditForm: false,
        form: {
          sortName: '',
          description: '',
          startTime: '',
          endTime: '',
          credit: 0
        },
        rules: {
          sortName: [
            {required: true, message: '活动名称不能为空', trigger: 'blur'},
            {min: 1, max: 10, message: '长度在1到10个字符'}
          ]
          // startTime: [
          //   { required: true, message: '起始时间不能为空', trigger: 'blur' },
          //   { pattern: /^[0-9]\d*$/, message: '排序字段只能为自然数' }
          // ],
          // endTime: [
          //   { required: true, message: '结束时间不能为空', trigger: 'blur' },
          //   { pattern: /^[0-9]\d*$/, message: '排序字段只能为自然数' }
          // ]
        }
      }
    },
    created () {
      this.freezeList()
    },
    methods: {
      // 搜索
      search: function () {
        if (this.keyword === '' || this.keyword.trim() === '') {
          this.$notify.error({
            title: '错误',
            message: '关键字不能为空',
            type: 'success',
            offset: 100
          })
          return
        }
        this.$router.push({path: '/list', query: {keyword: this.keyword}})
      },
      freezeList: function () {
        getFreezeList().then(response => {
          //console.log(response.data.obj)
          this.tableData = response.data.obj
        }).catch(error => {
          console.log(error)
          this.tableData = [{
            uid: '1111',
            status: 'z'
          }, {
            uid: '222',
            status: 'z'
          }]
        })
      },
      searchEnterFun:function(e){
        var keyCode = window.event? e.keyCode:e.which;
        // console.log('回车搜索',keyCode,e);
        if(keyCode == 13 && this.input){
          this.$router.push({path:'/list', query: {keyword: this.keyword}});
        }

      },
      muteList: function () {
        getMuteList().then(response => {
          this.tableData = response.data.obj
        }).catch(error => {
          console.log(error)
          this.tableData = [{
            uid: '10085',
            status: 'z'
          }, { uid: '10086',
            status: 'z'}
          ]
        })
      },
      recipeList: function () {
        getRecipeList().then(response => {
          this.tableData = response.data.obj
        }).catch(error => {
          console.log(error)
          this.tableData = [{
            uid: '1',
            status: '0'
          }, { uid: '1',
            status: '0'}
          ]
        })
      },
      changeFreezeState: function () {
        this.freeze_visible = true
        this.mute_visible = false
        this.recipe_visible = false
        this.freezeList()
      },
      changeMuteState: function () {
        this.freeze_visible = false
        this.mute_visible = true
        this.recipe_visible = false
        this.muteList()
      },
      changeRecipeState: function () {
        this.freeze_visible = false
        this.mute_visible = false
        this.recipe_visible = true
        this.recipeList()
      },
      handlePass: function (row) {
        var params = new URLSearchParams()
        params.append('recipe_id', row.recipe_id)
        RecommendRecipe(params).then(response => {
          if (response.data.code == this.$ECode.SUCCESS) {
            this.$message({
              type: 'success',
              message: response.data.message
            })
            // window.location.reload()
            this.recipeList()
          }
        })
      },
      handlePass1: function (row) {
        row.status='d'
        var params = new URLSearchParams()
        var that = this
        params.append('user_id', row.user_id)
        this.$commonUtil.message.info(row.user_id)
        FreezeUser(params).then(response => {
          if (response.data.code == this.$ECode.SUCCESS) {
            this.$message({
              type: 'success',
              message: response.data.message
            })
            //window.location.reload()
            that.freezeList()
          }
        })
      },
      handlePass2: function (row) {
        row.status='j'
        var params = new URLSearchParams()
        params.append('user_id', row.user_id)
        MuteUser(params).then(response => {
          if (response.data.code == this.$ECode.SUCCESS) {
            this.$message({
              type: 'success',
              message: response.data.message
            })
            // window.location.reload()
            this.muteList()
          }
        })
      },
      handleFail: function (row) {
        row.status='z'
        var params = new URLSearchParams()
        params.append('user_id',row.user_id)
        UnfreezeUser(params).then(response => {
          if (response.data.code == this.$ECode.SUCCESS) {
            this.$message({
              type: 'success',
              message: response.data.message
            })
            // window.location.reload()
            this.freezeList()
          }
        })
      },
      // handleFail1: function (row) {
      //   row.status=0
      //   let params = row
      //   workReport(params).then(response => {
      //     if (response.data.code == this.$ECode.SUCCESS) {
      //       this.$message({
      //         type: 'success',
      //         message: response.data.message
      //       })
      //       window.location.reload()
      //     }
      //   })
      // },
      handleFail2: function (row) {
        row.status='z'
        var params = new URLSearchParams()
        params.append('user_id', row.user_id)
        UnmuteUser(params).then(response => {
          if (response.data.code == this.$ECode.SUCCESS) {
            this.$message({
              type: 'success',
              message: response.data.message
            })
            // window.location.reload()
            this.muteList()
          }
        })
      },
      getFormObject: function () {
        let formObject = {
          uid: '',
          state: ''
        }
        return formObject
      },
      handleDeleteBatch: function () {
        var that = this
        if (that.multipleSelection.length <= 0) {
          this.$commonUtil.message.error('请先选中需要删除的内容!')
          return
        }
        this.$confirm('此操作将把选中的分类删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            deleteBatchBlogSort(that.multipleSelection).then(response => {
              if (response.data.code == this.$ECode.SUCCESS) {
                this.$commonUtil.message.success(response.message)
              } else {
                this.$commonUtil.message.error(response.message)
              }
              that.blogSortList()
            })
          })
          .catch(() => {
            this.$commonUtil.message.info('已取消删除！')
          })
      },
      handleCurrentChange: function (val) {
        this.currentPage = val
        this.blogSortList()
      },
      submitForm: function () {
        this.$refs.form.validate((valid) => {
          if (!valid) {
            console.log('校验失败')
          } else {
            addBlogSort(this.form).then(response => {
              if (response.data.code == this.$ECode.SUCCESS) {
                this.$commonUtil.message.success(response.message)
                this.dialogFormVisible = false
                this.sortList()
              } else {
                this.$commonUtil.message.error(response.message)
              }
            })
          }
        })
      },
      // 改变多选
      handleSelectionChange (val) {
        this.multipleSelection = val
      }
    }
  }
</script>
<style>
</style>
