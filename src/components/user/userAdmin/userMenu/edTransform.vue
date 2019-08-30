<template>
  <!-- 额度转换 -->
  <div class="contentMain edTransform">
    <div class="contentMainDIv">
      <el-row class="container">
        <el-row class="payNav">
          <span></span>团队余额
        </el-row>
        <el-row class="contentMainTable">
          <div class="teamBalance">
            <el-row :gutter="10">
              <el-col :md="2">
                <el-row>
                  <el-col :span="24" v-for="(item,index) in titList" :key="index" class="aaa">
                    <div class="grid-content">
                      <span>{{item.pro}}</span>
                      <span>{{item.mon}}</span>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :md="22">
                <el-row>
                  <el-col :md="3" v-for="(item,index) in listData" :key="index" class="aaa">
                    <div class="grid-content">
                      <span>{{ item.line_name}}</span>
                      <span>{{item.balance}}</span>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-row>
        <el-row class="payNav">
          <span></span>额度转换
        </el-row>
        <el-row v-if="step==1" style="height:100%;">
          <el-row class="flex-box-center">
            <el-form ref="form" :model="form" label-width="80px" :rules="formRules">
              <el-form-item label="转出：">
                <el-select v-model="form.zcId" placeholder="请选择活动区域" @change="zcId">
                  <el-option
                    v-for="(item,index) in listData"
                    :key="index"
                    :label="item.line_name"
                    :value="item.balance==0?'00':item.line_id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="转入：">
                <el-select v-model="form.zrId" placeholder="请选择活动区域" @change="zrId">
                  <el-option
                    v-for="(item,index) in listData"
                    :key="index"
                    :label="item.line_name"
                    :value="item.line_id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="金额：" prop="money">
                <el-input v-model="form.money" placeholder="输入转入金额(100-1000.00)"></el-input>
              </el-form-item>
              <el-form-item class="noticeNote">
                <div>备注：</div>
                <div>
                  <div>1.转账金额必须是整数且大于1</div>
                  <div>2.取款时需要把其它平台的余额归集到主账户。</div>
                  <div>3.如果额度无法正常显示，请不要转换，否则将有可能出现额度丢失</div>
                </div>
              </el-form-item>
              <el-form-item class="flex-box-center">
                <el-button @click="onSubmit">确定</el-button>
              </el-form-item>
            </el-form>
          </el-row>
          <!-- <el-row class="preferentialBox">
            <div class="preferentialTitle">我想参与下列彩金优惠</div>
            <div class="preferentialContent">
              <el-radio
                v-model="radio"
                label="1"
                class="mg-b-20"
              >[锁定首充彩金]60%的IM体育博彩 最低充99元 最高送1,000元！18倍！</el-radio>
              <el-radio
                v-model="radio"
                label="2"
                class="mg-b-20"
              >[锁定再充彩金]20%IM体育博彩 最低充99 最高送1,000！20倍！</el-radio>
              <el-radio v-model="radio" label="3" class="mg-b-20">下回再参与。</el-radio>
              <el-row class="prompt">
                <div>温馨提示</div>
                <div class="textIndent">
                  <div>1.会员需完成已申请优惠的要求后，才能申请同一个账号的其他优惠。</div>
                  <div>2.会员所申请的彩金优惠将在充值到账之后于彩金讯息页面更新。</div>
                </div>
              </el-row>
            </div>
          </el-row>-->
        </el-row>
        <el-row v-else-if="step==2" class="successBox">
          <img src="../../../../assets/user/userSuccess.png" alt />
          <div>
            完成转换
            <span class="againTrans errorColor" @click="againTrans">再转一笔</span>
          </div>
        </el-row>
        <el-row v-else class="successBox">
          <img src="../../../../assets/user/userError.png" alt />
          <div>
            转换失败
            <span class="errorColor againTrans" @click="againTrans">重试</span>
          </div>
          <div class="errorColor mg-t-10">失败原因：账户余额不足</div>
        </el-row>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      step: 1,
      radio: "1",
      listData: [],

      titList: [
        {
          pro: "项目",
          mon: "余额"
        }
      ],
      form: {
        zcId: "",
        zrId: "",
        money: ""
      },
      formRules: {
        money: [
          {
            required: true,
            pattern: "",
            message: "金额范围为100-10000.00"
          }
        ]
      }
    };
  },
  mounted() {
    this.getProList();
  },
  methods: {
    onSubmit() {
      const t = this;

      t.$refs["form"].validate(valid => {
        if (valid == false) {
        } else {
          this.post(this.apiUrl.apiTransferOther, {
            in_line_id: this.form.zcId,
            out_line_id: this.form.zrId,
            value: this.form.money
          }).then(res => {
            if (res.code == 0) {
              this.step = 2;
              this.$message("转换成功！")
            }
          });
        }
      });

      //
    },
    againTrans() {
      this.step = 1;
    },
    getProList() {
      this.post(this.apiUrl.apiBalances, {}).then(res => {
        if (res.data != "") {
          var listData = res.data;
          listData.shift();
          this.listData = listData;
          if (res.data.length - 1 > 8) {
            var n = Math.floor((res.data.length - 1) / 8);
            for (var i = 1; i <= n; i++) {
              this.titList[i] = {
                pro: "项目",
                mon: "余额"
              };
            }
          }
        }
      });
    },
    zcId(value) {
      this.form.zcId = value;
      if (value == "00") {
        this.$alert(
          "转出项目余额不能少于100元整,请确认当前项目余额信息,或者重新选择转出项目",
          "提示",
          {
            confirmButtonText: "确定",
            callback: action => {
              this.form.zcId = "";
            }
          }
        );
      }
    },
    zrId(value) {
      if (this.form.zcId == value) {
        this.$alert("相同项目之间不能相互转入,请重新选择转入项目", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            this.form.zrId = "";
          }
        });
      } else {
        this.form.zrId = value;
      }
    }
  }
};
</script>
<style >
@import "../../../../assets/search.css";
.edTransform .el-date-editor.el-input,
.edTransform .el-date-editor.el-input__inner {
  width: initial;
}
.edTransform .el-date-editor.el-input,
.edTransform .el-date-editor.el-input__inner {
  width: 140px;
  margin: 0 10px;
}
.edTransform .contentMain {
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
}
.edTransform .payNav {
  display: flex;
  padding-left: 35px;
  align-items: center;
  color: #836426;
  padding: 18px 0 0 35px;
}
.edTransform .payNav span {
  height: 14px;
  border-right: 4px solid #836426;
  margin-right: 5px;
}
.edTransform .teamTable {
  margin-top: 20px;
  border: 1px solid #836426;
  border-top: 0;
}
.edTransform .teamTable th {
  border-top: 1px solid #836426;
}
.edTransform .teamTable th,
.edTransform .teamTable tr,
.edTransform .teamTable td {
  background: #f2efe9;
  font-size: 12px;
  color: #836426;
  text-align: center;
}
.edTransform .teamTable td {
  font-size: 14px;
  border-top: 1px solid #836426;
}
.edTransform .teamTable th > .cell {
  font-weight: normal;
}
.edTransform .el-input__inner {
  border-color: #836426;
  color: #836426;
}
.edTransform .contentMainTable {
  padding: 13px 35px;
}
.edTransform .el-form {
  width: 450px;
}
.edTransform .el-select {
  display: block;
}
.edTransform .el-button {
  background: #e6cf68;
  color: #836426;
  border: 0;
  padding: 12px 66px;
}
.edTransform .noticeNote {
  margin-top: 50px;
}
.edTransform .noticeNote .el-form-item__content {
  display: flex;
  align-items: flex-start;
  line-height: 24px;
}
.edTransform .el-form-item {
  margin-bottom: 14px;
}
.edTransform .preferentialBox {
  width: 656px;
  margin: auto;
  margin-bottom: 50px;
}
.edTransform .preferentialContent {
  padding: 50px 63px 30px;
  border: 1px solid #836426;
}
.edTransform .preferentialTitle {
  border: 1px solid #836426;
  color: #836426;
  background: rgba(242, 239, 233, 1);
  text-align: center;
  padding: 12px 0;
  width: 80%;
  margin: auto;
  margin-bottom: -22px;
  z-index: 10;
  position: relative;
}
.edTransform .el-radio__input.is-checked + .el-radio__label,
.edTransform .el-radio {
  color: #836426;
}
.edTransform .el-radio__inner::after {
  background: #836426;
  width: 10px;
  height: 10px;
}
.edTransform .el-radio__input.is-checked .el-radio__inner,
.edTransform .el-radio__inner {
  border-color: #836426;
  width: 22px;
  height: 22px;
  background: #fff;
}
.edTransform .error {
  color: #ff0000;
}
.edTransform .textIndent {
  text-indent: 2em;
}
.edTransform .prompt {
  line-height: 24px;
}

.edTransform .teamBalance {
  background: #f2efe9;
  border: 1px solid #836426;
 border-right:none;
  border-top:none;
 border-bottom:none;
  position: relative;
  padding:1px;
}

.edTransform .teamTop {
  font-size: 12px;
  border-bottom: 1px solid #836426;
}
.edTransform .successBox {
  text-align: center;
  margin: 100px auto;
  font-size: 14px;
}
.edTransform .successBox img {
  margin: 32px auto;
}
.edTransform .againTrans {
  text-decoration: underline;
  margin-left: 24px;
  cursor: pointer;
}
.edTransform .errorColor {
  color: #ff0000;
}

/*  */
.edTransform .grid-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #836426;
  height: 60px;
  border-top:1px solid #836426;
  position:relative;
  border-bottom:1px solid #836426;
  margin-top: -1px;
}
.edTransform .grid-content span {
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.edTransform .teamBalance  .el-col-md-2{padding-right:0!important;}
.edTransform .teamBalance  .el-col-md-22{padding-left:0!important;}
.edTransform .teamBalance  .el-col-md-22 .el-col-md-3 {
  width: 12.5%;
}
 .edTransform .grid-content::before {
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


