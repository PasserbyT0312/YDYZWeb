<template>
  <div class="contentMain">
    <div class="contentMainDIv rechargeDiv">
      <el-row class="rechargeDivTop">
        <el-row class="payNav">
          <span></span>选择充值方式
        </el-row>
        <el-row class="recharge">
          <el-tabs v-model="activeName" class="selfTab">
            <el-tab-pane :label="bankTit" name="first" v-if="bankTit!=''?true:false">
              <div class="first">
                <el-row v-if="nextModel">
                  <el-row class="payNav">选择银行卡</el-row>
                  <el-radio-group v-model="radio" @change="changeRadioBank" class="bankRadio">
                    <el-radio
                      v-for="(item,index) in bankLabel"
                      :key="index"
                      :label="index"
                      :class="activce == index? 'radioBorder' : ''"
                    >{{item.bank.desc}}</el-radio>
                  </el-radio-group>
                  <!-- <div v-else style="text-align:Center;font-size:30px;">暂无发现银行卡充值入口，请先前往绑定银行卡</div> -->
                </el-row>
                <el-row v-else class="flex-box-center">
                  <el-form
                    ref="bankForm"
                    :model="bankForm"
                    label-width="100px"
                    :rules="bankFormRules"
                  >
                    <el-form-item label="收款银行：" prop="bankDesc">
                      <el-input v-model="bankForm.bankDesc" readonly aria-required placeholder="银行"></el-input>
                    </el-form-item>
                    <el-form-item label="收款账号：" prop="bank_address">
                      <el-input
                        v-model="bankForm.bank_card"
                        readonly
                        aria-required
                        placeholder="卡号"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="收款人姓名：" prop="bank_card">
                      <el-input
                        v-model="bankForm.bank_real_name"
                        readonly
                        aria-required
                        placeholder="收款人姓名"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="开户网点：" prop="bank_real_name">
                      <el-input
                        v-model="bankForm.bank_address"
                        readonly
                        aria-required
                        placeholder="开户网点"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="存款姓名：" prop>
                      <el-input v-model="bankForm.bank_saveName" aria-required placeholder="存款人姓名"></el-input>
                    </el-form-item>

                    <el-form-item label="存款金额：" prop="money">
                      <el-input v-model="bankForm.money" aria-required placeholder="存款金额"></el-input>
                    </el-form-item>
                    <el-form-item label="存款方式：" prop>
                      <el-radio-group v-model="radioa" @change="changeRadioBankType">
                        <el-radio :label="3">ATM</el-radio>
                        <el-radio :label="6">手机银行</el-radio>
                        <el-radio :label="9">银行转账</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-form>
                </el-row>
                <el-row>
                  <el-col :span="20" :offset="1" style="font-size:14px;color:#333;margin-top:10px;">
                    <span style="color:#ff0000;">温馨提示：</span>入款之前请核对公司入款账号，避免存入公司过期账号导致金额无法追回。
                  </el-col>
                </el-row>

                <el-row class="nextBtn">
                  <el-button
                    type="default"
                    v-bind:disabled="activce==-1?true:false"
                    @click="nextBtn"
                    v-if="nextModel"
                  >下一步</el-button>
                  <!--  -->
                  <el-row v-else>
                    <el-button
                      type="default"
                      v-bind:disabled="activce==-1?true:false"
                      @click="returnModel"
                    >上一步</el-button>
                    <el-button
                      type="default"
                      v-bind:disabled="activce==-1?true:false"
                      @click="bankSubmit"
                    >确认</el-button>
                  </el-row>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane v-bind:label="onlineName" name="second" v-if="onlineName!=''?true:false">
              <div class="second">
                <el-row v-if="nextModel">
                  <el-row class="payNav">选择充值方式</el-row>
                  <el-radio-group v-model="radio" @change="changeRadioOnline" class="bankRadio">
                    <el-radio
                      v-for="(item,index) in onlineLabel"
                      :key="index"
                      :label="index"
                      :class="activce == index ? 'radioBorder' : ''"
                    >{{item.payment_name}}</el-radio>
                  </el-radio-group>
                  <el-form
                    ref="onlineLabelForm"
                    :model="onlineLabelForm"
                    label-width="100px"
                    :rules="onlineLabelFormRules"
                  >
                    <el-form-item label="充值金额" prop="money">
                      <el-input
                        v-model="onlineLabelForm.money"
                        aria-required
                        placeholder="充值金额为100-100000"
                      ></el-input>
                    </el-form-item>
                  </el-form>
                </el-row>

                <el-row v-else class="userSuccess">
                  <img src="../../../../assets/user/userSuccess.png" alt />
                  申请成功！
                  <br />具体到账时间请以各大银行转账时间为准。
                  <span>{{n}}s后返回支付页面</span>
                </el-row>
                <el-row>
                  <el-col :span="20" :offset="1" style="font-size:14px;color:#333;margin-top:10px;">
                    <span style="color:#ff0000;">温馨提示：</span>入款之前请核对公司入款账号，避免存入公司过期账号导致金额无法追回。
                  </el-col>
                </el-row>
                <el-row class="nextBtn" v-show="confirmModel==false?false:true">
                  <el-button
                    type="default"
                    v-bind:disabled="activce==-1?true:false"
                    @click="onlineSubmit"
                    v-if="nextModel"
                  >下一步</el-button>
                  <!-- <el-row v-else>
                    <el-button
                      type="default"
                      v-bind:disabled="activce==-1?true:false"
                      @click="returnModel"
                    >上一步</el-button>
                    <el-button
                      type="default"
                      v-bind:disabled="activce==-1?true:false"
                      @click="onlineConfirm"
                    >确认</el-button>
                  </el-row>-->
                </el-row>

                <!-- -->
              </div>
            </el-tab-pane>
            <el-tab-pane :label="smTit" name="third" v-if="smTit!=''?true:false">
              <div class="third">
                <el-row v-if="nextModel">
                  <el-row class="payNav">选择充值方式</el-row>
                  <el-row v-for="(item,index) in bankPayLabel" :key="index" class="wzForm">
                    <el-row style="display:flex;align-items:flex-top;">
                      <el-radio-group v-model="radio" @change="changeRadioWz" class="bankRadio">
                        <el-radio
                          :label="index"
                          :class="activce == index? 'radioBorder' : ''"
                        >{{item.type.desc}}</el-radio>
                      </el-radio-group>
                      <img :src="item.img" style="width:120px;height:120px;" />
                    </el-row>
                    <el-form
                      ref="bankPayLabelForm"
                      :model="bankPayLabelForm"
                      label-width="100px"
                      :rules="bankPayLabelFormRules"
                    >
                      <el-form-item label="充值金额" prop="money">
                        <el-input
                          v-model="bankPayLabelForm.money"
                          aria-required
                          placeholder="充值金额为100-100000"
                        ></el-input>
                      </el-form-item>
                    </el-form>
                  </el-row>
                  <el-row class="thirdInput">
                    <el-col :span="20" style="font-size:14px;color:#333;margin-top:10px;">
                      <span style="color:#ff0000;">温馨提示：</span>入款之前请核对公司入款账号，避免存入公司过期账号导致金额无法追回。
                    </el-col>
                    <el-col :span="24" class="thirdBtn">
                      <el-button type="default" @click="wxSubmit"  v-bind:disabled="activce==-1?true:false">提交</el-button>
                      <el-button type="default">复制</el-button>
                    </el-col>
                  </el-row>
                </el-row>
                <el-row v-else class="userSuccess">
                  <img src="../../../../assets/user/userSuccess.png" alt />
                  申请成功！
                  <br />具体到账时间请以各大银行转账时间为准。
                  <span>{{n}}s后返回支付页面</span>
                </el-row>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-row>
      </el-row>
      <el-row class="rechargeDivBottom">
        <el-row class="payNav">
          <span></span>支付提示
        </el-row>
        <el-row class="tips">
          <el-col :span="24">1.网银、手机银行转账，请点击以上选项查看账户</el-col>
          <el-col :span="24">2.跨行转账请选择跨行快汇</el-col>
          <el-col :span="24">3.【扫码扫码支付】只需扫一扫二维码图片进行支付，立即到账，无需填写入款信息</el-col>
          <el-col :span="24">4.【扫码扫码支付】请您在扫码支付页面完成支付，其他页面完成支付请直接查看账户余额</el-col>
          <el-col :span="24">5.【扫码扫码支付】请您在提交订单后5分钟内完成支付，否则订单会自动取消</el-col>
          <el-col :span="24">6.需要其他帮助请点击在线客服</el-col>
        </el-row>
        <el-row class="onlineQq">
          <el-row>
            <p @click="goKf">
              <img src="../../../../assets/user/kefu.png" alt />
              <span>在线客服</span>
            </p>
          </el-row>
          <el-row>
            <img src="../../../../assets/user/QQ.png" alt />
            <span>QQ客服</span>
          </el-row>
        </el-row>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  //  inject:['reload'],
  data() {
    return {
      radioa: {},
      imgBorder: "",
      activeName: "first",
      nextModel: true,
      confirmModel: true,
      smTit: "",
      bankTit: "",
      onlineName: "",
      payList: "",
      tabSHow: true,
      n: 5,
      banks: {},
      qr_code: {},
      third_pay: {},
      bankLabel: {},
      bankForm: {
        bankDesc: "", //收款银行
        bank_address: "", //开户网点
        bank_card: "", //账号
        bank_real_name: "", //收款姓名
        bank_saveName: "",
        money: "", //存款金额
        payAccountID: "",
        bank_deposit_type: ""
      },
      bankFormRules: {
        money: [
          {
            required: true,
            pattern: /^\d{3,}/,
            message: "金额最少位100！"
          }
        ]
      },
      onlineLabel: {},
      onlineLabelForm: {
        id: "",
        code: "",
        money: ""
      },
      onlineLabelFormRules: {
        money: [
          {
            required: true,
            pattern: /^\d{3,}/,
            message: "金额最少位100！"
          }
        ]
      },
      onlineImg: "",
      radio: "",
      radio1: "",
      activce: -1,
      bankPayLabel: {},
      bankPayLabelForm: {
        account: "",
        money: "",
        payAccountID: ""
      },
      bankPayLabelFormRules: {
        //个人资料验证
        money: [
          {
            required: true,
            pattern: /^\d{3,}/,
            message: "金额最少位100！"
          }
        ]
      }
    };
  },
  inject:["reload"],
  mounted() {
    this.getBankList();
    
  },
  methods: {
    getBankList() {
      this.post(this.apiUrl.apiPayments, {}).then(res => {
        this.banks = res.data.banks;
        this.third_pay = res.data.third_pay;
        this.qr_code = res.data.qr_code;
        if (this.qr_code.length != 0) {
          this.smTit = "扫码支付";
        } else {
          this.smTit = "";
        }
        if (this.banks.length == 0) {
          this.bankTit = "";
        } else {
          this.bankTit = "银行卡充值";
        }
        if (this.third_pay.length == 0) {
          this.onlineName = "";
        } else {
          this.onlineName = "在线支付";
        }
        this.third_pay = res.data.third_pay[0];
        this.bankLabel = this.banks;
        this.onlineLabel = this.third_pay.list;
        this.bankPayLabel = this.qr_code;
      });
    },
    goKf() {
      this.$store.commit("active_name","在线客服");
      this.$store.commit("umodelShow", false);
   
    },
    bankSubmit() {
      const t = this;

      t.$refs["bankForm"].validate(valid => {
        console.log(valid);
        if (valid == false) {
        } else {
          let bank_real_name = this.bankForm.bank_real_name;
          let payAccountID = this.bankForm.payAccountID;
          let money = this.bankForm.money;
          let bank_deposit_type = this.bankForm.bank_deposit_type;
          console.log(bank_real_name, payAccountID, money, bank_deposit_type);

          this.post(this.apiUrl.apiBankSubmit, {
            bank_real_name: bank_real_name,
            payAccountID: payAccountID,
            money: money,
            bank_deposit_type: bank_deposit_type
          }).then(res => {
            console.log(res);
            if (res.code == 0) {
              this.nextModel = false;
              setInterval(() => {
                this.n--;
                if (this.n == 0) {
                  this.n = 5;
                  this.nextModel = true;
                }
              }, 1000);
            } else {
              this.nextModel = true;
            }
          });
        }
      });
    },
    onlineSubmit() {
      const t = this;

      t.$refs["onlineLabelForm"].validate(valid => {
        if (valid == false) {
        } else {
          let id = this.onlineLabelForm.id;
          let code = this.onlineLabelForm.code;
          let money = this.onlineLabelForm.money;

          this.post(this.apiUrl.apiThirdPaymentSubmit, {
            id: id,
            code: code,
            money: money
          }).then(res => {
            if (res.code == 0) {
              this.nextModel = false;
              this.onlineLabelForm.money = "";
              //  this.onlineImg=res.data.url;
              //  console.log( this.onlineImg);
              window.open(res.data.url, "_blank");
            }
            if (res.code == 0) {
              this.nextModel = false;
              setInterval(() => {
                this.n--;
                if (this.n == 0) {
                  this.n = 5;
                  this.nextModel = true;
                }
              }, 1000);
            } else {
              this.nextModel = true;
            }
          });
        }
      });
    },
    wxSubmit() {
      const t = this;

      let account = this.bankPayLabelForm.account;
      let money = this.bankPayLabelForm.money;
      let payAccountID = this.bankPayLabelForm.payAccountID;
      console.log(account, money, payAccountID);

      this.post(this.apiUrl.apiQrcodePaySubmit, {
        account: account,
        money: money,
        payAccountID: payAccountID
      }).then(res => {
        console.log(res.code);
        if (res.code == 0) {
          this.nextModel = false;
          setInterval(() => {
            this.n--;
            if (this.n == 0) {
              this.n = 5;
              this.nextModel = true;
            }
          }, 1000);
        } else {
          this.nextModel = true;
        }

        //  if(res.code==0){
        //    this.nextModel=true;
        //    var that=this;
        //    setInterval(function(){
        //      that.n--;
        //    },1000)
        //  }else{
        //    this.nextModel=false;
        //  }
      });
    },
    changeRadioBankType(value) {
      if (value == 3) {
        this.bankForm.bank_deposit_type = "ATM";
      }
      if (value == 6) {
        this.bankForm.bank_deposit_type = "手机银行";
      }
      if (value == 9) {
        this.bankForm.bank_deposit_type = "银行转账";
      }
    },
    changeRadioBank(value) {
      //银行卡支付选择
      this.activce = value;

      this.bankForm.bankDesc = this.banks[value].bank.desc;
      this.bankForm.bank_address = this.banks[value].bank_address;
      this.bankForm.bank_card = this.banks[value].bank_card;
      this.bankForm.bank_real_name = this.banks[value].bank_real_name;
      this.bankForm.payAccountID = this.banks[value].id;
    },
    changeRadioOnline(value) {
      //在线支付选择
      this.activce = value;

      this.onlineLabelForm.id = this.third_pay.list[value].id;
      this.onlineLabelForm.code = this.third_pay.list[value].code;
    },
    changeRadioWz(value) {
      this.activce = value;
      this.bankPayLabelForm.payAccountID = this.qr_code[value].id;
      this.bankPayLabelForm.account = this.qr_code[value].account;
    },
    nextBtn() {
      //下一步
      this.nextModel = false;
    },
    returnModel() {
      //返回
      this.nextModel = true;
    }
    // onlineConfirm() {
    //   //在线支付确认
    //   const t = this;

    //   t.$refs["ruleFormWZ"].validate(valid => {
    //     console.log(valid);
    //     if (valid == false) {
    //       console.log(1);
    //     } else {
    //       let account = this.ruleFormWZ.account;
    //       let money = this.ruleFormWZ.money;
    //       let payAccountID = this.ruleFormWZ.payAccountID;
    //       this.post(this.apiUrl.apiQrcodePaySubmit, {
    //         account: account,
    //         money: money,
    //         payAccountID: payAccountID
    //       }).then(res => {
    //         console.log(res);
    //         if (res.code == 1) {
    //           this.confirmModel = false;
    //         }
    //       });
    //     }
    //   });
    // }
    // refresh(){
    //    this.reload();
    // }
  }
};
</script>
<style >
.rechargeDiv .recharge {
  margin-top: 21px;
  padding: 0 15px;
}
.rechargeDiv {
  background: none;
}

.rechargeDiv .recharge .el-tabs__header {
  margin: 0;
}

.rechargeDiv .recharge .bankRadio .el-radio__input {
  display: none;
}
.rechargeDiv .recharge .third .bankRadio .el-radio__input {
  display: none;
}
.rechargeDiv .recharge .bankRadio {
  margin-top: 4px;
  margin-left: 70px;
  margin-top: 20px;
}
.rechargeDiv .recharge .third .bankRadio {
  margin-top: 4px;
  margin-left: 70px;
  margin-top: 5px;
}
.rechargeDiv .second .el-form-item {
  margin-left: 45px;
}
.rechargeDiv .third .el-form-item {
  margin-left: 45px;
}
.rechargeDiv .recharge .first .bankRadio .el-radio {
  /* width: 25%; */
  text-align: center;
  padding-left: 0;
  padding: 10px 20px 6px 10px;
  border: 1px dashed #ddd;
  margin-bottom: 5px;
}
.rechargeDiv .recharge .first .bankRadio .radioBorder {
  border: 1px solid #ce0012;
  background: #f6eecb;
}
.rechargeDiv .recharge .second .bankRadio .el-radio {
  width: 120px;
  text-align: center;
  padding: 14px 10px 8px 0;
  border: 1px dashed #ddd;
}

.rechargeDiv .recharge .second .bankRadio .radioBorder {
  border: 1px solid #ce0012;
  background: #f6eecb;
}
.rechargeDiv .recharge .third .bankRadio .el-radio {
  width: 120px;
  text-align: center;
  padding: 14px 0 8px 0;
  border: 1px dashed #ddd;
}

.rechargeDiv .recharge .third .bankRadio .radioBorder {
  border: 1px solid #ce0012;
  background: #f6eecb;
}
.rechargeDiv .rechargeDiv {
  display: flex;
  flex-direction: column;
}
.rechargeDiv .rechargeDivTop {
  /* height: 460px; */
  background: #fff;
  margin-bottom: 20px;
  padding-bottom: 20px;
}
.rechargeDiv .rechargeDivBottom {
  flex: 1;
  background: #fff;
  display: flex;
  flex-direction: column;
}
.rechargeDiv .nextBtn {
  text-align: center;
  margin-top: 30px;
}
.rechargeDiv .nextBtn button {
  background: #e6cf68;
  color: #836426;
  width: 160px;
  height: 42px;
}
.rechargeDiv .rechargeDivBottom .payNav {
  color: #ff0000;
  margin-bottom: 19px;
}
.rechargeDiv .rechargeDivBottom .payNav span {
  border-color: #ff0000;
}
.rechargeDiv .tips .el-col-24 {
  color: #836426;
  padding: 4px 0 0 37px;
}
.rechargeDiv .onlineQq {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding-right: 37px;
  padding-bottom: 30px;
}
.rechargeDiv .onlineQq .el-row {
  display: flex;
  align-items: center;
}
.rechargeDiv .onlineQq .el-row p{display:flex;align-items: center;}
.rechargeDiv .onlineQq .el-row img {
  margin-left: 29px;
}
.rechargeDiv .onlineQq .el-row span {
  margin-left: 10px;
}
/* 表单 */
.rechargeDiv .recharge .el-form {
  width: 500px;
  margin-top: 30px;
}
.rechargeDiv .recharge .el-form-item {
  margin-bottom: 18px;
}
.rechargeDiv .recharge .selfTab .first .el-tabs__item {
  width: 277px;
  margin-left: 21px;
}
.rechargeDiv .recharge .selfTab .second .el-tabs__item {
  width: 226px;
  margin-left: 21px;
}
/*  */
.rechargeDiv .payEwm {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.rechargeDiv .payEwm img {
  width: 170px;
  height: 170px;
}
.rechargeDiv .thirdInput {
  padding-left: 70px;
}
.rechargeDiv .thirdInput .el-col-24 {
  margin-top: 15px;
}
.rechargeDiv .third .tips {
  font-size: 14px;
  color: #836426;
}
.rechargeDiv .thirdInput .thirdBtn {
  text-align: center;
  margin-top: 30px;
  padding-right: 70px;
}
.rechargeDiv .thirdBtn button {
  background: #e6cf68;
  color: #836426;
}
.recharge .wzForm {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
.recharge .el-button.is-disabled,
.el-button.is-disabled:focus,
.el-button.is-disabled:hover {
  background: transparent;
}
.recharge .userSuccess {
  display: flex;
  height: 200px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.recharge .el-tabs__nav-wrap:after {
  background: none;
}
</style>


