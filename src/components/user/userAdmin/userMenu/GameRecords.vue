<template>
  <!-- 游戏记录 -->
  <div class="contentMain">
    <div class="contentMainContent gameRecords">
      <el-row class="container">
        <el-row class="payNav">
          <span></span>游戏记录
        </el-row>
        <el-row class="contentMainTable">
          <el-row>
              <el-col :span="24">
            <span class="common-color">类型：</span>
            <el-select v-model="chooseType" placeholder="请选择">
              <el-option
                v-for="item in gameType"
                :key="item.id"
                :label="item.desc"
                :value="item.id"
              ></el-option>
            </el-select>
            <span class="common-color">平台：</span>
            <el-select v-model="choosePlatform" placeholder="请选择">
              <el-option
                v-for="item in gamePlatform"
                :key="item.id"
                :label="item.desc"
                :value="item.id"
              ></el-option>
            </el-select>
            <span class="common-color">状态：</span>
            <el-select v-model="chooseStatus" placeholder="请选择">
              <el-option
                v-for="item in gameStatus"
                :key="item.id"
                :label="item.desc"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="24">
            <span class="common-color">时间：</span>
            <el-date-picker
              v-model="dataStart"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
            <span class="common-color" style="text-align:Center;">至：</span>
            <el-date-picker
              v-model="dataEnd"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
            <el-button type="primary" class="btnColor" @click="searchRecords">查询</el-button>
          </el-col>
          </el-row>
      
          <el-row>
            <el-table
              :data="tableData"
              stripe
              style="width: 100%"
              class="recoredTable"
              empty-text="暂无记录"
            >
              <el-table-column prop="record_id" label="序号" width></el-table-column>
              <el-table-column prop="game_type.desc" label="游戏名称" width></el-table-column>
              <el-table-column prop="bet_amount" label="投注金额"></el-table-column>
              <el-table-column prop="win_amount" label="盈亏金额"></el-table-column>
              <el-table-column prop="real_bet_amount" label="有效投注"></el-table-column>
              <el-table-column prop="bet_time" label="游戏时间"></el-table-column>
            </el-table>
            <div v-if="tableData.length!=0?false:true" class="noContent">
              <img src="../../../../assets/noContent.png" alt />
            </div>
          </el-row>
        </el-row>

        <el-row class="text-center">
          <el-pagination
          v-if="tableData.length!=0?true:false"
            background
            layout="prev, pager, next"
            :current-page.sync="recordsPage"
            :total="recordsTotal"
            :page-size="pageSize"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </el-row>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataStart: "",
      dataEnd: "",
      tableData: [],
      gameType: [],
      gamePlatform: [],
      gameStatus: [],
      chooseType: "",
      choosePlatform: "",
      chooseStatus: "",
      recordsPage: 1,
      pageSize: 5,
      recordsTotal: 0
    };
  },
  mounted() {
    this.gameType = this.$store.state.dictionariesData.table_map.game_record.game_type;
    this.gamePlatform = this.$store.state.dictionariesData.table_map.game_record.platform;
    this.gameStatus = this.$store.state.dictionariesData.table_map.game_record.game_status;
    this.getRecords();
  },
  methods: {
    searchRecords() {
      this.recordsPage = 1;
      this.getRecords();
    },
    getRecords() {
      var params = {
        platform: this.choosePlatform,
        game_type: this.chooseType,
        game_status: this.chooseStatus,
        page: this.recordsPage,
        limit:this.pageSize
      };
      if (this.dataStart && this.dataStart != "") {
        params.start = this.dataStart;
      }
      if (this.dataEnd && this.dataEnd != "") {
        params.end = this.dataEnd;
      }
      this.post(this.apiUrl.apiGameRecordList, params).then(response => {
        if (response.code == 0) {
          this.tableData = response.data.items;
          this.recordsTotal = response.data.total;
        } else {
          this.tableData = [];
        }
      });
    },
    handleCurrentChange(curPage) {
      this.recordsPage = curPage;
      this.getRecords();
    }
  }
};
</script>
 <style>
@import "../../../../assets/search.css";
.gameRecords .el-date-editor.el-input,
.gameRecords .el-select {
  width: 140px;
  margin-right: 10px;
}

.gameRecords .el-date-editor .el-input__inner,
.gameRecords .el-select .el-input__inner {
  width: 100%;
}
.gameRecords .contentMain {
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
}
.gameRecords .recoredTable {
  margin-top: 30px;
}
.gameRecords .el-input__inner {
  border-color: #836426;
}
.gameRecords .el-table__header,
.gameRecords .el-table__body {
  width: 100% !important;
}
.gameRecords .el-col-24{margin-bottom:5px;}
.gameRecords .common-color{
  display: inline-block;width:60px;
  text-align: right;
}
.gameRecords .el-button{margin-left:20px;}
</style>


