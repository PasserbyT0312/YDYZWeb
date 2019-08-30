<template>
  <!-- 资金往来 -->
  <div class="contentMain">
    <div class="contentMainContent moneyDealing">
      <el-row class="container">
        <el-row class="payNav">
          <span></span>资金往来
        </el-row>
        <el-row class="contentMainTable">
          <el-row class="pd-l-20">
            <el-col :md="8" :sm="24">
              <span class="common-color timeLabel">类型：</span>
              <el-select v-model="dealignTypes" placeholder="请选择" @change="chooseType">
                <el-option
                  v-for="item in dealingsType"
                  :key="item.id"
                  :label="item.desc"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :md="16" :sm="24">
              <span class="common-color timeLabel">时间段：</span>
              <el-date-picker
                v-model="dataStart"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="年/月/日  时/分/秒"
                class="datePicker"
                @change="getStartData"
              ></el-date-picker>
              <span class="common-color">——</span>
              <el-date-picker
                v-model="dataEnd"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="年/月/日  时/分/秒"
                class="datePicker"
                @change="getEndData"
              ></el-date-picker>
              <el-button type="primary" class="btnColor" @click="searchRecords">查询</el-button>
            </el-col>
          </el-row>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            class="recoredTable mg-t-30"
            empty-text="暂无记录"
          >
            <el-table-column prop="created_at" label="日期" width></el-table-column>
            <el-table-column prop="type.desc" label="交易类别"></el-table-column>
            <el-table-column prop="money" label="交易金额"></el-table-column>
            <el-table-column prop="after_money" label="余额"></el-table-column>
            <el-table-column prop="note" label="备注"></el-table-column>
          </el-table>
          <div class="noContent" v-if="tableData.length!=0?false:true">
            <img src="../../../../assets/noContent.png" alt />
          </div>
        </el-row>
        <!-- 分页 -->
        <el-row class="text-center" v-if="tableData.length!=0?true:false">
          <el-pagination
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
      dealingsType: [],
      dealignTypes: "",
      recordsPage: 1,
      pageSize: 10,
      recordsTotal: 0
    };
  },
  mounted() {
    this.dealingsType = this.$store.state.dictionariesData.table_map.member_money_logs.type;
    this.getRecords();
  },
  methods: {
    searchRecords() {
      this.recordsPage = 1;
      this.getRecords();
    },
    getStartData(val) {
      this.dataStart = val;
    },
    getEndData(val) {
      this.dataEnd = val;
    },
    getRecords() {
      var params = {
        size: this.pageSize,
        type: this.dealignTypes,
        page: this.recordsPage
      };
      if (this.dataStart != "") {
        params.start = this.dataStart;
      }
      if (this.dataEnd != "") {
        params.end = this.dataEnd;
      }
      this.post(this.apiUrl.apiMoneyList, params).then(response => {
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
    },
    chooseType() {
      this.recordsPage = 1;
      this.getRecords();
    }
  }
};
</script>
 <style>
@import "../../../../assets/search.css";
.moneyDealing .el-date-editor.el-input,
.moneyDealing .el-date-editor.el-input__inner {
  width: 140px;
  margin: 0 10px;
}
.moneyDealing .contentMain {
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
}
.moneyDealing .el-tabs__content {
  margin-top: 30px;
  margin-bottom: 20px;
}
/* .moneyDealing .timeLabel {
  margin-left: 78px;
} */
.moneyDealing .el-date-editor.datePicker.el-input {
  width: 200px;
}
.moneyDealing .el-input__inner {
  border-color: #836426;
}
.moneyDealing .el-table__header,
.moneyDealing .el-table__body {
  width: 100% !important;
}
@media screen and (max-width:1800px){
  .moneyDealing .timeLabel {
    margin:0;
 display: inline-block;width:60px;text-align: right;
}
.moneyDealing .pd-l-20 .el-col-md-8{
  width:100%;
  margin-bottom:5px;
}
.moneyDealing .pd-l-20 .el-col-md-16{
  width:100%;

}
.moneyDealing .el-date-editor.el-input, .moneyDealing .el-date-editor.el-input__inner{margin:0;}
.moneyDealing .el-date-editor.datePicker.el-input{width:217px;}
.moneyDealing .el-date-editor.el-input,
.moneyDealing .el-date-editor.el-input__inner {
  width: 140px;

}
}
</style>


