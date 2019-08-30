<template>
  <!-- 团队总览 -->
  <div class="contentMain subordAdmin">
    <div class="contentMainContent">
      <el-row class="container">
        <el-row class="payNav">
          <span></span>下级管理
        </el-row>
        <el-row class="contentMainTable">
          <span class="common-color">下级管理：</span>
          <el-input v-model="playerAccount" placeholder="输入玩家账号" class="mg-r-20"></el-input>
          <el-button type="primary" class="btnColor" @click="searchSubord">查询</el-button>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            class="recoredTable mg-t-30 mg-b-20"
            empty-text="暂无记录"
          >
            <el-table-column prop="member_id" label="ID" width></el-table-column>
            <el-table-column prop="username" label="账号" width></el-table-column>
            <el-table-column prop="username" label="姓名"></el-table-column>
            <el-table-column prop="money" label="余额"></el-table-column>
                <el-table-column prop="month_team_amount" label="团队业绩"></el-table-column>
            <el-table-column prop="children_number" label="下级总数"></el-table-column>
            <el-table-column prop="created_at" label="创建时间"></el-table-column>
          </el-table>
            <div class="noContent" v-if="tableData.length!=0?false:true">
             <img src="../../../../assets/noContent.png" alt="">
           </div>
          <el-row class="text-center">
          <el-pagination v-if="tableData.length!=0?true:false" background layout="prev, pager, next" :current-page.sync="recordsPage" :total="recordsTotal" :page-size="pageSize" @current-change="handleCurrentChange"></el-pagination>
        </el-row>
        </el-row>
        <el-row class="ewmShare">
          <ewm-share></ewm-share>
        </el-row>
      </el-row>
    </div>
  </div>
</template>
<script>
import EwmShare from "@/components/user/userAdmin/userMenu/EwmShare";
export default {
  data() {
    return {
      playerAccount: "",
      tableData: [],
      recordsPage:1,
      pageSize:6,
      recordsTotal:0,
    };
  },
  mounted() {
    this.getRecords();
    console.log(this.tableData);
    
  },
  methods: {
    searchSubord(){
      this.recordsPage = 1;
      this.getRecords();
    },
    getRecords(){
      var params = {
          limit: this.pageSize,
          page:this.recordsPage,
      }
      if(this.playerAccount!=''){
        params.username = this.playerAccount;
      }
      this.post(this.apiUrl.apiTeamLowerLevel, params).then(response => {
          if (response.code == 0) {
            this.tableData = response.data.items;
            this.recordsTotal = response.data.total;
          } else {
            this.tableData = [];
          }
        });
    },
    handleCurrentChange(curPage){
      this.recordsPage = curPage;
      console.log(curPage);
      
      this.getRecords()
    }
  },
  components: {
    EwmShare: EwmShare
  }
};
</script>
<style>
/* @import "../../../../assets/search.css"; */
.subordAdmin .el-date-editor.el-input,
.subordAdmin .el-date-editor.el-input__inner {
  width: 140px;
}
.subordAdmin .contentMain {
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
}
.subordAdmin .payNav {
  display: flex;
  padding-left: 35px;
  align-items: center;
  color: #836426;
  padding: 18px 0 0 35px;
}
.subordAdmin .payNav span {
  height: 14px;
  border-right: 4px solid #836426;
  margin-right: 5px;
}
.subordAdmin .subordAdmin .el-input {
  width: 200px;
}
.subordAdmin .container {
  height: 100%;
}
.subordAdmin .el-input__inner {
  border-color: #836426;
}
.subordAdmin .el-input{
  width: auto;
}
.subordAdmin .el-table__header , .subordAdmin .el-table__body{width:100%!important;}
.subordAdmin .contentMainTable{min-height:500px;}
</style>


