<template>
  <div class="contentMain">
    <div class="contentMainDIv selfUser">
      <el-tabs v-model="activeName" class="selfTab">
        <el-tab-pane label="个人资料" name="first">
          <div class="first flex-box-center">
            <el-form ref="ruleForm" :model="ruleForm" label-width="100px" :rules="rules">
              <div class="user-header">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  @change="onchangeImgFun"
                  class="header-upload-btn user-header-com"
                />
                <!-- <img alt :src="this.showImg" class="user-header-img user-header-com" v-if="imgShow" /> -->
                <img :src="ruleForm.avatar" class="avatar" />
              </div>
              <el-form-item label="用户名：" prop="username">
                <el-input v-model="ruleForm.username" disabled="" aria-required placeholder="3-16个字符"></el-input>
              </el-form-item>
              <!-- <el-form-item label="昵称：" prop="nickName">
                <el-input v-model="ruleForm.nickName" placeholder="输入昵称"></el-input>
              </el-form-item>-->
              <el-form-item label="真实姓名：" prop="fullName">
                <el-input v-model="ruleForm.fullName" :disabled="realState" placeholder="姓名必须真实有效"></el-input>
              </el-form-item>
              <el-row v-if="this.$store.state.infoData.phone!=''?false:true">
                <el-form-item label="手机：" prop="uTel">
                  <el-input placeholder="尚未绑定手机号" disabled></el-input>
                  <el-button class="yzBtn" @click="showModel">绑定手机号</el-button>
                  <!-- <el-button
                    class="yzBtn"
                    :style="yzTelState==false?'color:#836426':'color:#FF0000'"
                    @click="yzTelClick"
                  >{{yzTelState==false?'绑定手机号码':''+num+'s后重新获取'}}</el-button>-->
                </el-form-item>
              </el-row>
              <el-form-item label="手机：" prop="uTel" v-else>
                <el-input v-model="ruleForm.uTel" disabled="" placeholder="输入正确的手机号码"></el-input>
              </el-form-item>
              <transition name="fade">
                <div class="phoneModel" v-if="phoneModel">
                  <div class="modelBox">
                    <el-form ref="ruleForm" :model="ruleForm" label-width="100px" :rules="rules">
                      <el-form-item>
                        <el-input v-model="ruleForm.uTel" placeholder="输入手机号"></el-input>
                        <el-button
                          class="yzBtn"
                          :style="yzTelState==false?'color:#836426':'color:#FF0000'"
                          @click="yzTelClick"
                        >{{yzTelState==false?'获取验证码':''+num+'s后重新获取'}}</el-button>
                        <el-alert
                          v-show="yzTelState==false?false:true"
                          title="验证码已发送，可能会有延误，请耐心等待"
                          type="success"
                          center
                          show-icon
                        ></el-alert>
                      </el-form-item>

                      <el-form-item v-if="togYz">
                        <el-input placeholder="请输入验证码" v-model="loginImgCode" type="number"></el-input>
                        <img
                          class
                          style="position:absolute;right:125px;top:2px;border-left:1px solid #836426"
                          :src="imgYZ"
                          @click="getCodeImg()"
                          alt
                        />
                        <el-button class="yzBtn" @click="tzTel">发送验证码</el-button>
                        <!-- <el-button class="yzBtn">验证</el-button> -->
                      </el-form-item>
                      <el-form-item prop="uYz" v-else>
                        <el-input placeholder="请输入验证码" v-model="ruleForm.uYz"></el-input>
                        <el-button class="yzBtn">手机验证码</el-button>
                      </el-form-item>
                      <el-form-item>
                        <el-button
                          class="yzBtn"
                          @click="closeModel"
                          style="position:relative;margin-left:55px;margin-top:50px;"
                        >取消</el-button>
                        <el-button
                          class="yzBtn"
                          style="position:relative;;margin-top:50px;"
                          @click="bindPhone"
                        >提交</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
              </transition>

              <!-- <el-form-item label="邮箱：" required prop="uAddress">
                <el-input v-model="ruleForm.uAddress" placeholder="输入合法的邮箱地址"></el-input>
                <el-button
                  class="yzBtn"
                  :style="yzEmailState==false?'color:#836426':'color:#FF0000'"
                  @click="yzEmailClick"
                >{{yzEmailState==false?'验证邮箱地址':''+num+'s后重新获取'}}</el-button>
                <el-alert
                  v-show="yzEmailState==false?false:true"
                  title="验证成功，手机验证码已发送，可能会有延误，请耐心等待"
                  type="success"
                  center
                  show-icon
                ></el-alert>
              </el-form-item>
              <el-form-item>
                <el-input placeholder="请输入验证码"></el-input>
                <el-button class="yzBtn">输入验证码</el-button>
              </el-form-item>
              <el-form-item label="出生日期：" class="birth" prop="uBirth">
                <el-date-picker
                  v-model="ruleForm.uBirth"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>-->
              <el-form-item class="subBtn">
                <!-- <el-button type="default" @click="resert">取消</el-button> -->
                <el-button type="default" @click="submitForm1(ruleForm)">提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="修改登录密码" name="second">
          <div class="second flex-box-center">
            <el-form
              ref="logPasswordFrom"
              :model="logPasswordFrom"
              label-width="100px"
              :rules="logRules"
            >
              <el-form-item label="原始密码：" prop="logOldPassword">
                <el-input
                  v-model="logPasswordFrom.logOldPassword"
                  type="password"
                  name="uName"
                  aria-required
                  placeholder="请输入原始密码"
                ></el-input>
              </el-form-item>
              <el-form-item label="新密码：" prop="logNewPassword">
                <el-input
                  v-model="logPasswordFrom.logNewPassword"
                  type="password"
                  name="uName"
                  aria-required
                  placeholder="请输入新密码"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码：" prop="logConPassword">
                <el-input
                  v-model="logPasswordFrom.logConPassword"
                  type="password"
                  name="uName"
                  aria-required
                  placeholder="请确认新密码"
                ></el-input>
              </el-form-item>
              <el-form-item class="subBtn">
                <!-- <el-button type="default">取消</el-button> -->
                <el-button type="default" @click="submitForm2(ruleForm)">提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="修改资金密码" name="third">
          <div class="third flex-box-center">
            <el-form
              ref="moneyPasswordFrom"
              :model="moneyPasswordFrom"
              label-width="100px"
              :rules="moneyRules"
            >
              <el-form-item
                label="原始密码："
                prop="moneyOldPassword"
                v-if="this.infoData.fund_password==1?false:true"
              >
                <el-input
                  v-model="moneyPasswordFrom.moneyOldPassword"
                  type="password"
                  name="uName"
                  aria-required
                  placeholder="请输入原始密码"
                ></el-input>
              </el-form-item>
              <el-form-item label="新密码：" prop="moneyNewPassword">
                <el-input
                  v-model="moneyPasswordFrom.moneyNewPassword"
                  type="password"
                  name="uName"
                  aria-required
                  placeholder="请输入新密码"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码：" prop="moneyConPassword">
                <el-input
                  v-model="moneyPasswordFrom.moneyConPassword"
                  type="password"
                  name="uName"
                  aria-required
                  placeholder="请确认新密码"
                ></el-input>
              </el-form-item>
              <el-form-item class="subBtn">
                <!-- <el-button type="default">取消</el-button> -->
                <el-button type="default" @click="submitForm3(ruleForm)">提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { Message } from "element-ui";
import { baseURL } from "@/axios/http";
export default {
  computed: {
    ...mapState(["infoData", "regRule", "upass"])
  },
  mounted() {
    this.rules.uName[0].pattern = this.getReg.getReg(
      this.regRule.Public.login.username.validation
    );
    this.rules.uAddress[0].pattern = this.getReg.getReg(
      this.regRule.CurrUser.updateInfo.email.validation
    );
    this.rules.uBirth[0].pattern = this.getReg.getReg(
      this.regRule.CurrUser.updateInfo.birthday.validation
    );
    this.rules.uTel[0].pattern = this.getReg.getReg(
      this.regRule.CurrUser.bindPhone.phone.validation
    );
    this.rules.uYz[0].pattern = this.getReg.getReg(
      this.regRule.CurrUser.bindPhone.verify_code.validation
    );

    // this.ruleForm.avatar  = this.$store.state.avatar;

    // this.ruleForm.uName = this.$store.state.uname;
    // this.ruleForm.nickName = this.$store.state.nickname;
    // this.ruleForm.uAddress = this.$store.state.temail;
    // this.ruleForm.fullName = this.$store.state.realname;
    // this.ruleForm.uBirth = this.$store.state.ubir;
    // this.ruleForm.uAddress=this.$store.state.temail;
    //
    this.logRules.logOldPassword[0].pattern = this.getReg.getReg(
      this.regRule.CurrUser.changePassword.oldPassword.validation
    );
    this.logRules.logNewPassword[0].pattern = this.getReg.getReg(
      this.regRule.CurrUser.changePassword.password.validation
    );
    //资金密码
    this.moneyRules.moneyOldPassword[0].pattern = this.getReg.getReg(
      this.regRule.CurrUser.changeFoundPassword.oldPassword.validation
    );
    this.moneyRules.moneyNewPassword[0].pattern = this.getReg.getReg(
      this.regRule.CurrUser.changeFoundPassword.password.validation
    );
    if (this.infoData.avatar != "") {
      this.ruleForm.avatar = this.$store.state.infoData.avatar;
    } else {
      this.ruleForm.avatar = require("../../../../../assets/user/mrUser.png");
    }

    this.ruleForm.username = this.$store.state.infoData.username;
    this.ruleForm.nickName = this.$store.state.infoData.nickname;
    this.ruleForm.fullName = this.$store.state.infoData.real_name;
    this.ruleForm.uTel = this.$store.state.infoData.phone;
    this.ruleForm.uBirth = this.$store.state.infoData.birthday;
    if (this.$store.state.infoData.real_name != "") {
      this.realState = true;
    } else {
      this.realState = false;
    }
    this.getCodeImg();
    if (this.upass == true) {
      this.activeName = "third";
      this.$store.commit("upass", false);
    }
  },
  data() {
    return {
      phoneModel: false,
      imgStr: "",
      togYz: false,
      loginImgCode: "",
      imgYZ: "",
      imageUrlState: true,
      activeName: "first",
      yzTelState: false,
      yzEmailState: false,
      num: 20,
      realState: false,
      ruleForm: {
        //个人资料字段
        avatar: require("../../../../../assets/user/mrUser.png"),
        username: "",
        nickName: "",
        fullName: "",
        uTel: "",
        uAddress: "",
        uBirth: "",
        uYz: ""
      },
      imageUrl: "",
      rules: {
        //个人资料验证
        uName: [
          {
            required: true,
            pattern: "",
            message: "用户名需为3-16位"
          }
        ],
        nickName: [
          {
            required: false,
            message: ""
          }
        ],
        fullName: [
          {
            required: true,
            message: "请输入真实有效的姓名"
          }
        ],
        uTel: [
          {
            pattern: "",
            message: "请输入有效的手机号码"
          }
        ],
        uYz: [
          {
            pattern: "",
            message: "请输入有效的验证码"
          }
        ],
        uAddress: [
          {
            required: true, //是否必填
            pattern: "",
            message: "请输入邮箱地址" //错误提示信息
            //检验方式（blur为鼠标点击其他地方，）
          },
          {
            type: "email", //要检验的类型（number，email，date等）
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"] //（change为检验的字符变化的时候）
          }
        ],
        uBirth: [
          {
            required: true,
            pattern: "",
            message: ""
          }
        ]
      },
      //登录密码字段
      logPasswordFrom: {
        logOldPassword: "",
        logNewPassword: "",
        logConPassword: ""
      },
      //登录密码验证
      logRules: {
        logOldPassword: [
          {
            required: true,
            pattern: "",
            message: "原始密码不符合格式",
            trigger: "blur"
          }
        ],
        logNewPassword: [
          {
            required: true,
            pattern: "",
            message: "新密码不符合格式",
            trigger: "blur"
          }
        ],
        logConPassword: [
          {
            required: true,
            message: "确认密码不能为空",
            trigger: "blur"
          }
        ]
      },
      //资金密码字段
      moneyPasswordFrom: {
        moneyOldPassword: "",
        moneyNewPassword: "",
        moneyConPassword: ""
      },
      //资金密码验证
      moneyRules: {
        moneyOldPassword: [
          {
            required: true,
            message: "原始密码不符合格式",
            trigger: "blur"
          }
        ],
        moneyNewPassword: [
          {
            required: true,
            message: "新密码不符合格式",
            trigger: "blur"
          }
        ],
        moneyConPassword: [
          {
            required: true,
            message: "确认密码不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    closeModel() {
      this.phoneModel = false;
    },
    showModel() {
      this.phoneModel = true;
    },
    onchangeImgFun(e) {
      var file = e.target.files[0];

      var _this = this; //
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function() {
        var dataURL = reader.result;
        _this.ruleForm.avatar = dataURL;
      };
    },
    yzTelClick() {
      var yz = this.ruleForm.uTel;
      var bb = this.getReg.getReg(
        this.regRule.CurrUser.bindPhone.phone.validation
      ); //验证手机号正则
      var cc = this.getReg.getReg(
        this.regRule.CurrUser.bindPhone.verify_code.validation
      ); //验证手机号正则
      if (bb.test(yz)) {
        //
        this.togYz = true;

        // this.post(this.apiUrl.apiBindPhone, {
        //   phone: yz,
        //   verify_code: this.loginImgCode
        // }).then(res => {
        //   console.log(res);
        // });
      } else {
      }
    },
    tzTel() {
      this.post(this.apiUrl.apiSmsVerifyCode, {
        phone: this.ruleForm.uTel,
        verify: this.loginImgCode
      }).then(res => {
        if (res.code == 0) {
          this.yzTelState = true;
          this.togYz = false;
          var that = this;
          setInterval(function() {
            that.num--;
            if (that.num == 0) {
              that.num = 20;
              that.yzTelState = false;
            }
          }, 1000);
        } else {
          this.getCodeImg();
          this.loginImgCode = "";
        }
      });
    },
    getCodeImg() {
      this.imgYZ = baseURL + this.apiUrl.apiVerifyImg + "?" + Math.random();
    },
    yzEmailClick() {
      var yz = this.ruleForm.uAddress;
      var yz = this.ruleForm.uAddress;
      var bb = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if (bb.test(yz)) {
        this.yzEmailState = true;

        var that = this;
        setInterval(function() {
          that.num--;
          if (that.num == 0) {
            that.num = 20;
            that.yzEmailState = false;
          }
        }, 1000);
      } else {
        //  this.yzTel="20s后重新获取";
      }
    },
    bindPhone() {
      this.post(this.apiUrl.apiBindPhone, {
        phone: this.ruleForm.uTel,
        verify_code: this.ruleForm.uYz
      }).then(res => {
        if (res.code == 0) {
          this.$message("手机号绑定成功！");
        }
      });
    },
    submitForm1() {
      const t = this;

      t.$refs["ruleForm"].validate(valid => {
        if (valid == false) {
        } else {
          // let nickname = t.ruleForm.nickName;
          // let username = t.ruleForm.username;
          // if (
          //   username == this.$store.state.infoData.username &&
          //   this.ruleForm.avatar == this.$store.state.infoData.avatar
          // ) {
          //   this.$message("用户名或者头像信息没有更改，不能提交更新信息！");
          // } else {
          //   this.post(this.apiUrl.apiSelfUser, {
          //     // nickname: nickname,
          //     username: username
          //   }).then(res => {
          //     if (res.code == 0) {
          //       this.$message("更新信息成功！");
          //       this.$store.commit("refreshUser", true);
          //     }
          //     try {
          //       // this.$refs["ruleForm"].resetFields();
          //     } catch (e) {}
          //   });

          // }

          if (this.ruleForm.avatar != this.$store.state.infoData.avatar) {
            this.post(this.apiUrl.apiUploadBaseAvator, {
              url: "http://bao-wang.oss-cn-hongkong.aliyuncs.com",
              avatar: this.ruleForm.avatar
            }).then(res => {});
          }else{
            this.$message("头像信息没有变化，不能提交更新信息！")
          }
        }
      });
    },
    submitForm2() {
      const t = this;

      t.$refs["logPasswordFrom"].validate(valid => {
        if (valid == false) {
        } else {
          let oldPassword = this.logPasswordFrom.logOldPassword;
          let newPassword = this.logPasswordFrom.logNewPassword;
          let conPassword = this.logPasswordFrom.logConPassword;

          if (newPassword == conPassword) {
            this.post(this.apiUrl.apiChangePassword, {
              oldPassword: oldPassword,
              password: newPassword
            }).then(res => {
              this.$message("登录密码修改成功！");
              this.$store.commit("umodelShow", false);
              this.$store.commit("lmodelShow", true);
              this.$store.commit("uname", "游客");
            });
          } else {
            this.$message("两次输入密码不一致，请重新输入");
          }
        }
      });
    },

    submitForm3() {
      const t = this;

      t.$refs["moneyPasswordFrom"].validate(valid => {
        if (valid == false) {
        } else {
          let oldPassword = this.moneyPasswordFrom.moneyOldPassword;
          let newPassword = this.moneyPasswordFrom.moneyNewPassword;
          let conPassword = this.moneyPasswordFrom.moneyConPassword;

          if (newPassword == conPassword && this.infoData.fund_password == 1) {
            this.post(this.apiUrl.apiChangeFoundPassword, {
              password: newPassword
            }).then(res => {
              if (res.code == 0) {
                this.$message("资金密码创建成功！");

                try {
                  this.$refs["moneyPasswordFrom"].resetFields();
                } catch (e) {
                  this.$refs["moneyPasswordFrom"].resetFields();
                }
              }
            });
          }
          if (newPassword == conPassword && this.infoData.fund_password == 0) {
            this.post(this.apiUrl.apiChangeFoundPassword, {
              oldPassword: oldPassword,
              password: newPassword
            }).then(res => {
              if (res.code == 0) {
                this.$message("资金密码更改成功！");
                try {
                  this.$refs["moneyPasswordFrom"].resetFields();
                } catch (e) {
                  this.$refs["moneyPasswordFrom"].resetFields();
                }
              }
            });
          }
        }
      });
    },
    resert() {
      try {
        this.$refs["ruleForm"].resetFields();
      } catch (e) {}
    }
  }
};
</script>
<style >
.selfUser .phoneModel {
  position: fixed;
  width: 500px;
  height: 400px;
  border: 1px solid #ddd;
  top: 50%;
  margin-top: -220px;
  left: 50%;
  margin-left: -110px;
  background: rgba(43, 54, 67, 0.8);
  border-radius: 8px;
  z-index: 100;
}
.selfUser button {
  cursor: pointer;
}
.selfUser .modelBox .el-form-item__content {
  margin-left: 0 !important;
}
.selfTab .modelBox .el-form {
  width: initial;
}

.selfUser .modelBox {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0 70px;
  padding-top: 100px;
  box-sizing: border-box;
  flex-direction: column;
}
.selfUser {
  padding: 25px 35px 0 35px;
  box-sizing: border-box;
}
.selfUser .el-input__inner {
  border: 1px solid #836426;
}
.selfUser .el-input.is-active .el-input__inner,
.selfUser .el-input__inner:focus {
  border: 1px solid #836426;
}
.selfUser .el-date-editor.el-input,
.selfUser .el-date-editor.el-input__inner {
  width: 360px;
}
.selfUser .contentMainDIv {
  padding: 25px 35px 0 35px;
  box-sizing: border-box;
}
.selfTab .el-form {
  width: 450px;
}
/* 头像上传 */
.selfUser .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  margin: 15px 0 20px 0;
}
.selfUser .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.selfUser .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.selfUser .avatar {
  width: 76px;
  height: 76px;
  display: block;
  border: 1px solid #ddd;
  border-radius: 5px;

  margin-bottom: 30px;
  margin-top: 20px;
}

.selfUser .el-button:focus,
.selfUser .el-button:hover {
  background: #e6cf68;
  color: #836426;
  border: none;
}
.selfUser .avatar-uploader-icon {
  width: 76px;
  height: 76px;
  line-height: 76px;
  border-radius: 50%;
}
/* .avatar-uploader{display:flex;} */
/*  */
.selfUser .el-form-item__content {
  display: flex;
}
.selfUser .el-form-item__content {
  position: relative;
}
.selfUser .yzBtn {
  position: absolute;
  right: 1px;
  top: 1px;
  z-index: 5;
  background: #e6cf68;
  border: 1px solid transparent !important;
  bottom: 1px;
  width: 125px;

  color: #836426;
  cursor: pointer;
}
.selfUser .el-form-item {
  margin-bottom: 20px;
}
.selfUser .el-alert {
  position: absolute;
  bottom: -25px;
  left: -16px;
  height: 30px;
  background: none;
  text-align: left;
  width: 100%;
  font-size: 12px;
}
.selfUser .el-alert--success.is-light {
  background: none;
}
.selfUser .el-alert.is-center {
  justify-content: flex-start;
}
.selfUser .el-alert__title {
  font-size: 12px;
}
/*  */
.selfUser .second .el-form,
.selfUser .third .el-form {
  margin-top: 100px;
}
.user-header {
  position: relative;
  display: inline-block;
}

.user-header-com {
  width: 76px;
  height: 76px;
  display: inline-block;
  border: 1px solid #ddd;
  border-radius: 50%;
}

.header-upload-btn {
  position: absolute;
  left: 0;
  top: 20px;
  opacity: 0;
  /* 通过定位把input放在img标签上面，通过不透明度隐藏 */
}

.tip {
  font-size: 12px;
  color: #666;
}

/* error是用于错误提示 */
.error {
  font-size: 12px;
  color: tomato;
  margin-left: 10px;
}
</style>


