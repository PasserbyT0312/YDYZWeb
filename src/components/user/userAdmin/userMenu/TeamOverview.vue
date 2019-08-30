<template>
  <!-- 团队总览 -->
  <div class="contentMain">
    <div class="contentMainContent teamoverview">
      <el-row class="container">
        <el-row class="payNav">
          <span></span>当日数据统计
        </el-row>
        <el-row class="contentMainTable">
          <!-- <el-row class="pd-l-20">
            <span class="common-color">时间：</span>
            <el-date-picker
              v-model="dataStarrt"
              type="date"
              placeholder="年 \ 月 \ 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
            <span class="common-color">至：</span>
            <el-date-picker
              v-model="dataEnd"
              type="date"
              placeholder="年 \ 月 \ 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
            <el-button type="primary" class="btnColor">查询</el-button>
          </el-row>-->
          <el-table :data="teamData" stripe style="width: 100%" class="teamTable">
            <el-table-column prop="teamMoney" label="当前团队余额(元）" width></el-table-column>
            <el-table-column prop="teamRecharge" label="团队充值(元）" width></el-table-column>
            <el-table-column prop="teamWithdraw" label="团队提现(元）"></el-table-column>
            <el-table-column prop="teamMemberNum" label="总团队人数"></el-table-column>
            <el-table-column prop="teamFirstRecharge" label="首充人数"></el-table-column>
            <el-table-column prop="teamActiveMember" label="活跃人数"></el-table-column>
            <el-table-column prop="teamOnlineMember" label="在线人数"></el-table-column>
            <!-- <el-table-column prop="threePeople" label="3天未登录人数"></el-table-column> -->
            <el-table-column prop="teamActiveMember" label="当日登陆人数"></el-table-column>
          </el-table>
          
          <el-table
            :data="teamTableData"
            stripe
            style="width: 100%"
            class="recoredTable"
            empty-text="暂无数据"
          >
            <el-table-column prop="game_type.desc" label="游戏种类" width></el-table-column>
            <el-table-column prop="count" label="投注笔数" width></el-table-column>
            <el-table-column prop="real_bet_amount" label="有效投注"></el-table-column>
            <el-table-column prop="win_amount" label="实际亏盈"></el-table-column>
            <el-table-column prop="bet_amount" label="投注金额"></el-table-column>
          </el-table>
           <div class="noContent" v-if="teamTableData.length!=0?false:true">
             <img src="../../../../assets/noContent.png" alt="">
           </div>
          <!-- <div v-show="teamDataState">
              暂无相关记录
          </div>-->
        </el-row>
      </el-row>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["teamDatas"])
  },
  mounted() {
    this.getTeamData();
  },
  data() {
    return {
      teamDataState: false,
      dataStarrt: "",
      dataEnd: "",
      teamData: [],
      teamTableData:[],
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getTeamData() {
      //获取团队总览
      this.post(this.apiUrl.apiTeamData).then(res => {
        var data = res.data;
        this.teamData .push(data);
        this.teamTableData =data.teamGameRecord;  
      });
    }
  }
};
</script>
<style >
@import "../../../../assets/search.css";
.teamoverview .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: initial;
}
.teamoverview .el-date-editor.el-input,
.teamoverview .el-date-editor.el-input__inner {
  width: 140px;
  margin: 0 10px;
}
.contentMain {
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
}
.teamoverview .payNav {
  display: flex;
  padding-left: 35px;
  align-items: center;
  color: #836426;
  padding: 18px 0 0 35px;
}
.teamoverview .payNav span {
  height: 14px;
  border-right: 4px solid #836426;
  margin-right: 5px;
}
.teamoverview .teamTable {
  margin-top: 20px;
  margin-bottom: 30px;
  border: 1px solid #836426;
  border-top: 0;
}
.teamoverview .teamTable th {
  border-top: 1px solid #836426;
}
.teamoverview .teamTable th,
.teamTable tr,
.teamTable td {
  background: #f2efe9;
  font-size: 12px;
  color: #836426;
  text-align: center;
}
.teamoverview .teamTable td {
  font-size: 14px;
  border-top: 1px solid #836426;
}
.teamoverview .teamTable th > .cell {
  font-weight: normal;
}
.teamoverview .el-input__inner {
  border-color: #836426;
}
.teamoverview .el-table__header,
.teamoverview .el-table__body {
  width: 100% !important;
}
</style>


