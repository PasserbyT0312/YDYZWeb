<template>
  <div class="contentMain">
    <div class="contentMainDIv">
      <el-row class="container bankTab banktab">
        <el-row v-if="sss">
          <el-row class="payNav">
            <span></span>线上取款
          </el-row>
          <el-row v-if="moneyState">
            <el-row class="getMOney">
              <!-- <el-col :span="22">用户名：Ck chen</el-col> -->
              <el-col :span="22">
                账户余额
                <span
                  style="font-size:30px;padding-left:5px;"
                >{{this.$store.state.infoData.money}}</span>
              </el-col>
              <el-col :span="22">
                <el-button class="getMoneyBtn" @click="getMoney">取款</el-button>
              </el-col>
            </el-row>
            <el-row class="payNav">
              <span></span>团队余额
            </el-row>
            <el-row style="padding:0 32px;margin-top:19px;">
              <el-row class="cashsweepTable">
                <el-col :span="16">
                  <table border="0" cellspacing="0" cellpadding="0">
                    <thead>
                      <tr>
                        <td width="33%">游戏</td>
                        <td width="33%">余额</td>
                        <td width="33%">操作</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in this.$store.state.cashsweepData" :key="index">
                        <td>{{item.line_name}}</td>
                        <td>{{item.balance}}</td>

                        <td>
                          <el-button
                            class="yrBtn"
                            @click="cashsweepClick(item.line_id)"
                            :class="item.classState==true?'yrBtnZjgj':''"
                          >资金归集</el-button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div v-if="this.$store.state.cashsweepData.length!=0?false:true" class="noContent">
                    <img src="../../../../assets/noContent.png" alt />
                  </div>
                </el-col>
                <el-col
                  :span="8"
                  class="yjgj"
                  v-if="this.$store.state.cashsweepData.length==0?false:true"
                >
                  <img :src="zjgjImg" @click="yjZjgj" alt />
                  {{yjgjText}}
                </el-col>
              </el-row>
            </el-row>
          </el-row>
          <el-row v-else class="getMoneyModel">
            <el-row>
              <el-col :span="24" class="modelTips">自出款成功后，第一次存款起到现在所有产品的有效投注额</el-col>
            </el-row>
            <el-row class="listModel">
              <el-col :span="8" class="modelList">
                <span>{{getMoneyData.played_money}}</span>
                <span>区间存款额</span>
              </el-col>
              <el-col :span="8" class="modelList">
                <span>{{getMoneyData.audit}}元</span>
                <span>稽核量</span>
              </el-col>
              <el-col :span="8" class="modelList">
                <span>{{total}}元</span>
                <span>有效投注额</span>
              </el-col>
            </el-row>
            <el-row class="moneyCount">
              <el-col :span="4">
                取款次数：
                <span>{{getMoneyData.withraw_times}}次</span>
              </el-col>
              <el-col :span="18" style="padding-left:30px;">此次出款稽核时间：北京时间 {{getMoneyData.played_at}}</el-col>
            </el-row>
            <el-row class="getMoneyTable"></el-row>
            <el-row class="moneyChange">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="余额变化" name="first">
                  <div class="monsyDivScroll">
                    <el-card
                      class="box-card"
                      v-for="(item,index) in getMoneyData.moneyLogs"
                      :key="index"
                    >
                      <div slot="header" class="clearfix">
                        <span>{{item.type.desc}}</span>
                        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                      </div>
                      <div class="changeSpan">
                        <p>
                          <span>变化金额：</span>
                          {{item.money}}
                          <a>稽核：</a>
                          {{item.audit}}
                        </p>
                        <p>
                          <span>描述：</span>
                          {{item.info}}
                        </p>
                        <p>
                          <span>创建时间：</span>
                          {{item.created_at}}
                        </p>
                      </div>
                      <!-- <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div> -->
                    </el-card>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="有效投注额统计" name="second">
                  <el-row :gutter="10" class="tzStyle">
                    <el-col :md="3">
                      <el-row>
                        <el-col
                          :span="24"
                          v-for="(item,index) in titList"
                          :key="index"
                          :class="{aaa:'aaa'}"
                        >
                          <div class="grid-content">
                            <span>{{item.pro}}</span>
                            <span>{{item.mon}}</span>
                          </div>
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-col :md="21">
                      <el-row>
                        <el-col :md="3" v-for="(item,index) in tzData" :key="index">
                          <div class="grid-content">
                            <span>{{item.game_type.desc}}</span>
                            <span>{{item.real_bet_amount}}</span>
                          </div>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-tab-pane>
              </el-tabs>
            </el-row>
            <el-row class="moneyBtn">
              <el-button class="yrBtn" @click="continueNoney">继续出款</el-button>
              <el-button class @click="resertNoney">放弃</el-button>
            </el-row>
          </el-row>
        </el-row>
        <el-row v-else>
          <el-row class="payNav">
            <span></span>填写出款信息
          </el-row>

          <el-form
            ref="cashForm"
            :model="cashForm"
            label-width="110px"
            :rules="rulesCash"
            class="cashForm"
          >
            <el-form-item label="提款人：" prop="cashName">
              <el-input v-model="cashForm.cashName" disabled name aria-required placeholder="提款人"></el-input>
            </el-form-item>
            <el-form-item label="收款银行卡：">
              <el-select
                v-model="cashForm.selectBank"
                placeholder="请选择收款银行卡"
                v-if="this.$store.state.bankList.length==0?false:true"
                @change="selBank"
              >
                <el-option
                  v-for="item in this.$store.state.bankList"
                  :key="item.id"
                  :label="item.bank_name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-select v-else>
                <el-option value>
                  暂无可收款银行卡, 请先完善银行卡信息,
                  <router-link to="/bankCard">前往完善</router-link>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="银行卡号" prop="bank_card">
              <el-input v-model="cashForm.bank_card" disabled name aria-required placeholder="银行卡号"></el-input>
            </el-form-item>
            <el-form-item label="主账户余额：" prop="allMoney">
              <el-input v-model="cashForm.allMoney" disabled name aria-required placeholder="主账户余额"></el-input>
            </el-form-item>

            <el-form-item label="提现金额：" prop="money">
              <el-input
                v-model="cashForm.money"
                name
                @change="mondySx"
                aria-required
                placeholder="请输入提现金额（100-50000.00）"
              ></el-input>
            </el-form-item>

            <el-form-item label="手续费：" prop="ServiceCharge">
              <el-input
                v-model="cashForm.ServiceCharge"
                disabled
                name
                aria-required
                placeholder="手续费"
              ></el-input>
            </el-form-item>
            <el-form-item label="实收金额：" prop="Currentamount">
              <el-input
                v-model="cashForm.Currentamount"
                disabled
                name
                aria-required
                placeholder="时收金额"
              ></el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="info">
              <el-input v-model="cashForm.info" name aria-required placeholder="请输入备注信息"></el-input>
            </el-form-item>
            <el-form-item label="资金密码：" prop="fund_password">
              <el-input
                type="password"
                v-model="cashForm.fund_password"
                name
                aria-required
                placeholder="请输入资金密码"
              ></el-input>
            </el-form-item>
            <div class="moneyBtn">
              <el-button class="yrBtn" @click="conSubmit">确定输出</el-button>
              <el-button class @click="returnUp">取消</el-button>
            </div>
          </el-form>
        </el-row>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: -1,
      yrBtnZjgj: "",
      yjgjText: "  一键归集所有资金",
      zjgjImg: require("../../../../assets/user/guiji.png"),
      activeName: "first",
      total: 0,
      moneyTotal: 0,
      sss: true,
      ssss: "",

      input: "",
      titList: [
        {
          pro: "游戏名称",
          mon: "有效投注额"
        }
      ],
      tableData: [
        {
          id: 1,
          projectName: "aaa",
          projectMoney: "100"
        },
        {
          id: 2,
          projectName: "bbb",
          projectMoney: "100"
        }
      ],
      moneyState: true,
      getMoneyData: {},
      cashForm: {
        id: "",
        selectBank: "",
        bank_card:"",
        cashName: this.$store.state.infoData.username,
        allMoney: this.$store.state.infoData.money,
        money: "",
        ServiceCharge: 0, //手续费
        Currentamount: 0, //实收金额
        info: "",
        fund_password: ""
      },
      rulesCash: {
        selectBank: [
          {
            pattern: "",
            message: "收款银行卡不能为空"
          }
        ],
        money: [
          {
            required: true,
            pattern: "",
            message: "金额范围为100-10000.00"
          }
        ],
        fund_password: [
          {
            required: true,
            pattern: "",
            message: "资金密码不符合格式"
          }
        ]
      },
      tzData: [],
      maxDay: "",
      curr_withraw_times: "",
      withraw_limit_times_fee: "",
      played_money: "",
      audit: "",
      withraw_play_lacking_fee: ""
    };
  },
  mounted() {
    this.moneyList();
    this.getRecordList();
    // this.getBank();
  },
  methods: {
    returnUp() {
      this.sss = true;
    },
    getMoney() {
      if (this.$store.state.infoData.money > 100) {
        this.moneyState = false;
      } else {
        this.$alert("您的账户余额不足，无法发起取款次业务，谢谢", "提示", {
          confirmButtonText: "确定",
          callback: action => {}
        });
      }
    },
    mondySx() {
      if (
        this.cashForm.money >= this.cashForm.ServiceCharge &&
        this.cashForm.money <= 50000
      ) {
        this.cashForm.Currentamount = (
          this.cashForm.money - this.cashForm.ServiceCharge
        ).toFixed(2);
      } else {
        this.$message(
          "提款金额不能小于手续费的金额或者超过提款上限，请重新填写！"
        );
        this.cashForm.money = "";
      }
    },
    continueNoney() {
      this.maxDay = this.getMoneyData.withraw_times; //三天内最大次数限制
      this.curr_withraw_times = this.getMoneyData.curr_withraw_times; //当前规定周期内的次数
      this.withraw_limit_times_fee = this.getMoneyData.withraw_limit_times_fee; //超出次数加收手续费
      this.played_money = this.getMoneyData.played_money; //累计打码量
      //  var b=this.getMoneyData.withraw_max;//每次最大数量
      this.audit = this.getMoneyData.audit; //稽核
      this.withraw_play_lacking_fee = this.getMoneyData.withraw_play_lacking_fee; //稽核打码量不足的手续费
      if (this.$store.state.infoData.phone == "") {
        this.$confirm("您还未绑定手机号,暂时无法操作此出款功能", "提示", {})
          .then(() => {
            this.$router.push({
              path: "/selfUser"
            });
          })
          .catch(() => {});
      } else {
        this.sss = false;
        var count1 = 0;
        var count2 = 0;
        if (this.curr_withraw_times >= this.maxDay) {
          count1 = this.withraw_limit_times_fee;
          count2 =
            (this.audit - this.played_money) * this.withraw_play_lacking_fee;
        } else {
          count1 = 0;
          count2 = 0;
        }
        this.cashForm.ServiceCharge = count1 + count2;
      }
    },
    resertNoney() {
      this.moneyState = true;
    },
    moneyList() {
      this.post(this.apiUrl.apiWithdrawPre, {}).then(res => {
        this.getMoneyData = res.data;
        this.moneyTotal = res.data.moneyLogs.length;
        this.getMoneyData1 = res.data.moneyLogs;
        for (var i = 0; i < this.getMoneyData1.length; i++) {
          this.moneyTotal += parseInt(this.getMoneyData1[i].money);
        }
      });
    },
    getRecordList() {
      let a = this.getMoneyData.lastActTime;
      this.post(this.apiUrl.apiGameRecordList, {
        start: a
      }).then(res => {
        if (res.code == 0) {
          this.tzData = res.data.items;
          if (res.data.items.length > 8) {
            var n = Math.floor(res.data.items.length / 8);
            for (var i = 1; i <= n; i++) {
              this.titList[i] = {
                pro: "游戏名称",
                mon: "有效投注额"
              };
            }
            this.top = "50%";
          } else {
            this.top = "50%";
          }

          for (var i = 0; i < res.data.items.length; i++) {
            this.total += parseInt(res.data.items[i].bet_amount);
          }
        }
      });
    },
    handleClick() {},
    conSubmit() {
      if (this.$store.state.infoData.fund_password == 0) {
      }
      let fund_password = this.cashForm.fund_password;
      let info = this.cashForm.indo;
      let money = this.cashForm.money;
      let id = this.cashForm.id;
      console.log(id);

      this.post(this.apiUrl.apiWithdrawAdd, {
        id: id,
        money: money,
        info: info,
        fund_password: fund_password
      }).then(res => {
        console.log(res);
      });
    },
    cashsweepClick(index) {
      this.post(this.apiUrl.apiAllBack, {
        line_id: index
      }).then(res => {
        console.log(res);

        if (res.code == 0) {
          this.ind = index;
          this.$store.state.cashsweepData[index - 1].balance = "0";
          this.$store.state.cashsweepData[index - 1].classState = true;
        }
      });
    },
    yjZjgj() {
      this.post(this.apiUrl.apiAllBack, {}).then(res => {
        if (res.code == 0) {
          for (var i = 0; i < this.$store.state.cashsweepData.length; i++) {
            this.$store.state.cashsweepData[i].classState = true;
            this.$store.state.cashsweepData[i].balance = 0;
            this.yjgjText = "已归集所有资金";
            this.zjgjImg = require("../../../../assets/user/yiguji.png");
            //    this.zjgjImg=require('../../../../assets/user/yiguji.png') //归集失败图片
          }
        }
      });
    },
    selBank(id,value) {
      this.cashForm.id = id;
      let selectedWorkName = {};
      selectedWorkName = this.$store.state.bankList.find(item => {
        //这里的chargingWorkNameList就是上面遍历的数据源
        return item.id === id;
      });
      this.cashForm.bank_card = selectedWorkName.bank_card.replace(/^(\d{4})\d+(\d{4})$/,"$1 **** **** $2");
    }
  }
};
</script>
<style >
.banktab .getMOney {
  padding-left: 71px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 150px;
}
.banktab .moneyChange {
  padding: 15px 80px;
  min-height: 440px;
  overflow-x: hidden;
  overflow-y: auto;
}
.banktab td {
  word-wrap: break-word;
}
.banktab .getMOney .el-table {
  margin-top: 0;
}
.banktab .getMoneyBtn {
  background: #e6cf68;
  color: #836426;
}
.getMoneyModel {
  padding: 0;
}
.modelTips {
  color: #ff0000;
  margin-top: 20px;
  padding: 0 80px;
}
.listModel {
  padding: 0 80px;
}
.modelList {
  width: 160px;
  height: 71px;
  background: #e6cf68;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-top: 24px;
  margin-right: 100px;
}
.modelList span {
  margin: 2px 0;
}
.moneyCount {
  margin-top: 21px;
  padding: 0 80px;
}
.moneyCount span {
  color: #ff0000;
}
.getMoneyTable {
  padding: 0 40px;
  margin-top: 20px;
}
.getMoneyTable table {
  width: 100%;
}
.getMoneyTable table thead td {
  border: 1px solid #846528;
  text-align: center;
  background: #e6cf68;
  color: #836426;
  border-right: none;
  border-bottom: none;
  height: 39px;
  padding: 0 5px;
}
.getMoneyTable table thead tr td:last-child {
  border-right: 1px solid #846528;
}
.getMoneyTable table thead tr:last-child td:last-child {
  border-right: none;
}
.getMoneyTable table tbody td {
  height: 50px;
  text-align: center;
  color: #836426;
  border: 1px solid #836426;
  border-top: none;
  border-bottom: none;
  border-right: none;
}
.getMoneyTable table tbody tr td:last-child {
  border-right: 1px solid #836426;
}
.getMoneyTable table tbody tr:last-child td {
  border-bottom: 1px solid #836426;
}
.getMoneyTable table tbody tr:nth-of-type(odd) {
  background: #f2efe9;
}
.moneyBtn button {
  width: 160px;
  height: 44px;
}
.moneyBtn {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
.moneyBtn button:last-child {
  background: #dddddd;
}
.moneyBtn button:last-child:hover {
  background: #dddddd;
}
.banktab .el-form-item {
  margin: 0;
}
.banktab .el-form {
  margin-top: 39px;
  padding-left: 77px;
  padding-right: 77px;
}
.banktab .el-tabs__item.is-active {
  border-bottom: 2px solid #e6cf68;
  color: #ff0000;
}
.banktab .el-tabs__item {
  padding: 0 10px !important;
}
.banktab .el-form > div {
  margin-bottom: 20px;
  height: 40px;
  color: #836426;
  display: flex;
  align-items: center;
}
.banktab .el-form > div el-label {
  width: 100px;
}
.banktab .el-input {
  width: initial;
  margin-right: 85px;
}
.banktab .cashForm .el-input input {
  width: 310px;
}
.banktab .el-form div.thirdiv .el-input {
  margin-right: 0;
}
.banktab .el-form div.thirdiv input {
  width: 120px;
  margin-right: 10px;
}

.thirdiv span {
  font-size: 24px;
}
.bankBtn {
  justify-content: center;
  margin-top: 40px;
}
.bankBtn button {
  width: 160px;
  height: 44px;
}
/* K卡片 */
.banktab .text {
  font-size: 14px;
}

.banktab .item {
  margin-bottom: 18px;
}

.banktab .clearfix:before,
.banktab .clearfix:after {
  display: table;
  content: "";
}
.banktab .clearfix:after {
  clear: both;
}

.banktab .box-card {
  width: 99%;
  margin-bottom: 10px;
}
.banktab .el-card__header {
  background: #f7f7f7;
}
.banktab .changeSpan p {
  padding: 8px 0;
  border-bottom: 1px dashed #ddd;
}
.banktab .changeSpan p a {
  margin-left: 200px;
}
.banktab .el-card__body {
  padding: 10px 20px 20px 20px;
}
.banktab .changeSpan p span {
  display: inline-block;
  width: 80px;
  text-align: right;
}
.banktab .cashForm .el-form-item__content {
  margin-left: 0 !important;
}
.banktab .cashForm {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cashsweepTable table {
  width: 100%;
  padding: 0 70px;
  margin-top: 30px;
}
.cashsweep {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.cashsweepTable .yrBtnZjgj {
  background: #cccccc;
}
.cashsweepTable {
}
.cashsweepTable .el-row {
  height: 100%;
}
.cashsweepTable .yrBtn {
  padding: 8px 11px;
}
.cashsweepTable table td {
  text-align: center;
  height: 50px;
}
.cashsweepTable table thead tr {
  background: #e6cf68;
  color: #836426;
}
.cashsweepTable table tbody tr:nth-of-type(odd) {
  background: #fff;
}
.cashsweepTable table tbody tr:nth-of-type(even) {
  background: #f2efe9;
}
.banktab .yjgj {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-right: 80px;
  padding-top: 30px;
}
.banktab .yjgj img {
  margin-bottom: 10px;
}
.banktab .monsyDivScroll {
  height: 350px;
  overflow-x: hidden;
  overflow-y: auto;
}
.banktab .grid-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60px;
  border-right: 1px solid #836426;
  position: relative;
  border-bottom: 1px solid #836426;
  border-top: 1px solid #836426;
  margin-top: -1px;
}

.banktab .grid-content span {
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banktab .tzStyle {
  background: #f2efe9;
  position: relative;
  border: 1px solid #836426;
  border-bottom: none;
  border-right: none;
  border-top: none;
  padding: 1px;
  margin: 0 !important;
}
.banktab .tzStyle .el-col-md-3,
.banktab .tzStyle .el-col-md-21 {
  padding: 0 !important;
}
.banktab .tzStyle .el-col-md-3 .el-col-md-3 {
  width: 12%;
}
.banktab .tzStyle .grid-content::before {
  content: "";
  position: absolute;
  height: 1px;
  width: 100%;
  border-bottom: 1px solid #836426;
  left: 0;
  top: 50%;
  right: 0;
}
</style>


