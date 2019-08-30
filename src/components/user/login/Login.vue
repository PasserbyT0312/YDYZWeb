<template>
  <div class="login common-color" @mousewheel.prevent>
    <div class="bounced userLogin" v-loading="loading">
      <!-- 登录 -->
      <div v-show="maskShow==0" class="loginBox">
        <div class="bounced-header flex-box-between">
          <div>登录</div>
          <img src="../../../assets/user/guanbi.png" @click="closeModel" alt />
        </div>
        <div class="bounced-body">
          <div style="min-height:117px;">
            <img src="../../../assets/user/loginIcon.png" alt class="login-icon" />
          </div>
          <div class="input-row flex-box common-color mg-b-10">
            <img src="../../../assets/user/iconUser.png" alt />
            <label>账号</label>
            <el-input placeholder="请输入账号" v-model="loginCount"></el-input>
          </div>
          <div class="input-row flex-box common-color mg-b-10">
            <img src="../../../assets/user/iconLocker.png" alt />
            <label>密码</label>
            <el-input placeholder="请输入密码" v-model="loginPwd" type="password"></el-input>
          </div>
          <div class="input-row flex-box common-color mg-b-10">
            <img src="../../../assets/user/iconLocker.png" alt />
            <label>验证码</label>
            <el-input placeholder="请输入验证码" v-model="loginCode" type="number"></el-input>
            <img class="codeImg" :src="loginImgCode" @click="getCodeImg()" alt />
          </div>
          <div v-show="!pwdError" class="prompt fs12">密码错误</div>
          <el-button class="btn" @click="login">登录</el-button>
          <div class="flex-box-between fs12">
            <div @click="maskStatus(1)" class="hoverCursor">立即注册</div>
            <div @click="maskStatus(3)" class="forget hoverCursor">忘记密码</div>
          </div>
        </div>
      </div>
      <!-- 注册 -->
      <div v-show="maskShow==1">
        <div class="bounced-header flex-box-between">
          <div>注册</div>
          <img src="../../../assets/user/guanbi.png" @click="closeModel" alt />
        </div>
        <div class="bounced-body">
          <img src="../../../assets/user/loginIcon.png" alt class="login-icon" />
          <div class="flex-box common-color mg-b-10">
            <label>用户名：</label>
            <el-input class="input-row flex-con" placeholder="请输入账号" v-model="regCount"></el-input>
          </div>
          <div class="flex-box common-color mg-b-10">
            <label>密码：</label>
            <el-input
              class="input-row flex-con"
              placeholder="请输入密码"
              v-model="regPwd"
              type="password"
            ></el-input>
          </div>
          <div class="flex-box common-color mg-b-10">
            <label>确认密码：</label>
            <el-input
              class="input-row flex-con"
              placeholder="请重复输入密码"
              v-model="regRepeatPwd"
              type="password"
            ></el-input>
          </div>
          <div class="flex-box common-color mg-b-10">
            <label>邀请码：</label>
            <el-input
              class="input-row flex-con"
              placeholder="请输入邀请人"
              v-model="inviteUser"
              type="text"
            ></el-input>
          </div>
          <div class="flex-box common-color mg-b-10" style="position:relative;">
            <label>验证码：</label>
            <el-input class="input-row flex-con" placeholder="请输入验证码" v-model="regCode"></el-input>
            <img class="codeImg" :src="regImgCode" alt />
          </div>
          <div class="text-left">
            <el-checkbox v-model="checkedDeal">
              我已阅读
              <span class="colorRed">《用户协议》</span>
            </el-checkbox>
          </div>
          <el-button class="btn" @click="register">提交</el-button>
          <div class="flex-box-between fs12">
            <div @click="maskStatus(0)" class="hoverCursor">返回登录</div>
          </div>
        </div>
      </div>
      <!-- 注册成功 -->
      <div v-show="maskShow==2">
        <div class="bounced-header text-right">
          <img src="../../../assets/user/guanbi.png" @click="closeModel" alt />
        </div>
        <div class="bounced-body">
          <img src="../../../assets/user/userSuccess.png" alt class="mg-b-30 mg-t-50" />
          <div class="mg-b-10">申请成功！</div>
          <div class="color-black">
            {{countDown}}s后
            <span class="colorRed comeBack hoverCursor" @click="goLogin()">返回登录页</span>
          </div>
        </div>
      </div>
      <!-- 忘记密码1 -->
      <div v-show="maskShow==3">
        <div class="bounced-header flex-box-between">
          <div>找回密码</div>
          <img src="../../../assets/user/guanbi.png" @click="closeModel" alt />
        </div>
        <div class="bounced-body">
          <img src="../../../assets/user/loginIcon.png" alt class="login-icon" />
          <div class="flex-box common-color mg-b-10">
            <label>用户名：</label>
            <div class="input-row flex-box flex-con">
              <el-input placeholder="请输入用户名" v-model="forgetName"></el-input>
            </div>
          </div>
          <el-button @click="forgetAccount" class="btn" :disabled="forgetName==''">提交</el-button>
          <div class="flex-box-between fs12">
            <div @click="maskStatus(0)" class="hoverCursor">返回登录</div>
          </div>
        </div>
      </div>
      <!-- 忘记密码2 -->
      <div v-show="maskShow==4">
        <div class="bounced-header flex-box-between">
          <div>找回密码</div>
          <img src="../../../assets/user/guanbi.png" @click="closeModel" alt />
        </div>
        <div class="bounced-body">
          <img src="../../../assets/user/loginIcon.png" alt class="login-icon" />
          <div class="flex-box common-color mg-b-10">
            <label>手机号码：</label>
            <div class="input-row flex-box flex-con">
              <el-input placeholder="请输入手机号码" v-model="forgetPhone" disabled></el-input>
            </div>
          </div>
          <div class="flex-box common-color mg-b-10" style="position:relative;">
            <label>验证码：</label>
            <el-input class="input-row flex-con" placeholder="请输入验证码" v-model="forgetVerCode"></el-input>
            <img class="codeImg" :src="forgetImgCode" alt />
          </div>
          <div class="flex-box common-color mg-b-10">
            <label>验证码：</label>
            <div class="input-row flex-box flex-con">
              <el-input placeholder="请输入手机验证码" v-model="forgetCode" type="number"></el-input>
              <el-button
                @click="getCode"
                class="codeBtn"
                :disabled="isVerify"
                :class="isVerify?'btn_default':'btn'"
              >{{isVerify?forgetDown+'s后重新获取':'获取验证码'}}</el-button>
            </div>
          </div>
          <div class="flex-box common-color mg-b-10">
            <label>新密码：</label>
            <el-input
              class="input-row flex-con"
              placeholder="请输入新密码"
              v-model="newPwd"
              type="password"
            ></el-input>
          </div>
          <div class="flex-box common-color mg-b-10">
            <label>确认密码：</label>
            <el-input
              class="input-row flex-con"
              placeholder="再次输入新密码"
              v-model="newRepeatPwd"
              type="password"
            ></el-input>
          </div>
          <el-button @click="forgetPwd" class="btn">设置新密码</el-button>
        </div>
      </div>
      <!-- 忘记密码4 设置成功-->
      <div v-show="maskShow==5">
        <div class="bounced-header text-right">
          <img src="../../../assets/user/guanbi.png" @click="closeModel" alt />
        </div>
        <div class="bounced-body">
          <img src="../../../assets/user/userSuccess.png" alt class="mg-b-30 mg-t-50" />
          <div class="mg-b-10">设置成功</div>
          <div class="colorRed comeBack hoverCursor" @click="maskStatus(0)">去登录</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { initReg } from "@/axios/regRule"; // 验证方法
import { Message } from "element-ui";
import { baseURL } from "@/axios/http"; 
export default {
  data() {
    return {
      loading: false,
      maskShow: 0, //0登录 1注册 2注册成功 3验证用户名 4忘记密码 5设置成功
      loginCount: "",
      loginPwd: "",
      loginCode: "",
      loginImgCode: "",
      regCount: "",
      regPwd: "",
      regRepeatPwd: "",
      regCode: "",
      regImgCode: "",
      inviteUser: "",
      forgetName: "",
      forgetPhone: "",
      forgetSecret: "",
      forgetVerCode: "",
      forgetImgCode: "",
      forgetCode: "",
      forgetDown: "",
      newPwd: "",
      newRepeatPwd: "",
      checkedDeal: false,
      isVerify: false,
      pwdError: true,
      countDown: "",
      isDisabled: false
    };
  },
  mounted() {
    this.getCodeImg();
  },
  watch: {
    maskShow(val) {
      //监听注册成功 倒计时返回登录
      if (val == 2) {
        this.goLogin(true);
      }
    }
  },
  methods: {
    //获取验证码图片
    getCodeImg() {
      if (this.maskShow == 0) {
        this.loginImgCode = baseURL+this.apiUrl.apiVerifyImg+"?" + Math.random();
      } else if (this.maskShow == 1) {
        this.regImgCode = baseURL+this.apiUrl.apiVerifyImg+"?" + Math.random();
      } else {
        this.forgetImgCode = baseURL+this.apiUrl.apiVerifyImg+"?" + Math.random();
      }
    },

    //切换显示框
    maskStatus(code) {
      this.maskShow = code;
      if (code == 0 || code == 1 || code == 4) {
        this.getCodeImg();
      }
      this.loginCount = "";
      this.loginPwd = "";
      this.loginCode = "";
      this.regCount = "";
      this.regPwd = "";
      this.regRepeatPwd = "";
      this.regCode = "";
      this.checkedDeal = false;
      this.forgetPhone = "";
      this.forgetCode = "";
      this.newPwd = "";
      this.newRepeatPwd = "";
    },
    //关闭弹框
    closeModel() {
      this.maskShow = 0;
      this.loginCount = "";
      this.loginPwd = "";
      this.loginCode = "";
      this.regCount = "";
      this.regPwd = "";
      this.regRepeatPwd = "";
      this.regCode = "";
      this.checkedDeal = false;
      this.forgetPhone = "";
      this.forgetCode = "";
      this.newPwd = "";
      this.newRepeatPwd = "";
      this.getCodeImg();
      this.$store.commit("lmodelShow", false);
      this.$router.push({
        path:"/"
      })
    },
    //注册后倒计时跳转登录
    goLogin(isGo) {
      const TIME_COUNT = 5;
      if (isGo) {
        this.countDown = TIME_COUNT;
        this.timer = setInterval(() => {
          if (this.countDown > 0 && this.countDown <= TIME_COUNT) {
            this.countDown--;
          } else {
            clearInterval(this.timer);
            this.maskStatus(0);
          }
        }, 1000);
      } else {
        clearInterval(this.timer);
        this.maskStatus(0);
      }
    },
    //登录
    login() {
      this.getCodeImg();
      //登录     
      if (
        !initReg(this.apiUrl.apiLogin, "username", this.loginCount) ||
        !initReg(this.apiUrl.apiLogin, "password", this.loginPwd)
      ) {
        return false;
      } else if (this.loginCode == "") {
        Message.error("请输入验证码");
        return false;
      } else {
        this.post(this.apiUrl.apiLogin, {
          username: this.loginCount,
          password: this.loginPwd,
          verify: this.loginCode
        }).then(response => {
          if (response.code == 0) {
            Message.success({message: "登陆成功",duration:700});
            this.$store.commit("token", response.data.access_token);   
            this.$store.commit("uname", this.loginCount);
            this.closeModel();
          } else {
            this.loginCode = "";
            this.getCodeImg();
          }
        });
      }
    },
    //注册
    register() {
      if (
        !initReg(this.apiUrl.apiRegister, "username", this.regCount) ||
        !initReg(this.apiUrl.apiRegister, "password", this.regPwd)
      ) {
        return false;
      } else if (this.regPwd != this.regRepeatPwd) {
        Message.error("两次输入密码不一致");
        return false;
      } else if (this.regCode == "") {
        Message.error("请输入验证码");
        return false;
      } else if (!this.checkedDeal) {
        Message.error("请选择并同意用户协议");
        return false;
      } else {
        this.loading = true;
        this.post(this.apiUrl.apiRegister, {
          username: this.regCount,
          password: this.regPwd,
           icode: this.inviteUser,
          verify: this.regCode
        }).then(response => {
          this.loading = false;
          if (response.code == 0) {
            Message.success({message:"注册成功",duration:700});
            this.maskStatus(2);
          } else {
            this.regCode = "";
            this.getCodeImg();
          }
        });
      }
    },
    //忘记密码 验证账号
    forgetAccount() {
      if (initReg(this.apiUrl.apiVerAccount, "username", this.forgetName)) {
        this.loading = true;
        this.post(this.apiUrl.apiVerAccount, {
          username: this.forgetName
        }).then(response => {
          this.loading = false;
          if (response.code == 0) {
            this.maskStatus(4);
            this.forgetPhone = response.data.phone;
            this.forgetSecret = response.data.secret;
          } else {
            this.forgetName = "";
          }
        });
      }
    },
    //手机验证
    getCode() {
      if (this.forgetVerCode == "") {
        Message.error("请输入图片验证码");
        return false;
      } else {
        this.post(this.apiUrl.apiSendVerifyCode, {
          secret: this.forgetSecret,
          verify: this.forgetVerCode
        }).then(response => {
          if (response.code == 0) {
            Message.success("验证码已发送");
            const TIME_COUNT = 60;
            this.forgetDown = TIME_COUNT;
            this.timer = setInterval(() => {
              if (this.forgetDown > 0 && this.forgetDown <= TIME_COUNT) {
                this.forgetDown--;
                this.isVerify = true;
              } else {
                this.isVerify = false;
                clearInterval(this.timer);
              }
            }, 1000);
          } else {
            this.forgetImgCode = "";
            this.getCodeImg();
          }
        });
      }
    },
    //忘记密码
    forgetPwd() {
      if (
        !initReg(this.apiUrl.apiRetrievePassword, "username", this.forgetName) ||
        !initReg(this.apiUrl.apiRetrievePassword, "code", this.forgetCode) ||
        !initReg(this.apiUrl.apiRetrievePassword, "password", this.newPwd) ||
        !initReg(
          this.apiUrl.apiRetrievePassword,
          "confirm_password",
          this.newRepeatPwd
        )
      ) {
        return false;
      } else {
        this.post(this.apiUrl.apiRetrievePassword, {
          username: this.forgetName,
          code: this.forgetCode,
          password: this.newPwd,
          confirm_password: this.newRepeatPwd
        }).then(response => {
          if (response.code == 0) {
            this.isVerify = false;
            this.maskStatus(5);
          } else {
            this.forgetImgCode = "";
            this.getCodeImg();
          }
        });
      }
    }
  }
};
</script>
<style >
.login {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  text-align: Center;
  z-index: 5;
}
.login .bounced {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  min-height: 400px;
  background: #fff;
}
.login .bounced-header {
  background: #2b3643;
  color: #e6cf68;
  height: 50px;
  line-height: 50px;
  padding-left: 36px;
  padding-right: 24px;
  font-size: 17px;
}
.login .bounced-header img {
  width: 18px;
  height: 18px;
}
.login .bounced-body {
  padding: 50px 80px;
}
.login .login-icon {
  width: 180px;
  margin-bottom: 60px;
}
.login .input-row {
  border-bottom: 1px solid #836426;
  font-size: 14px;
  /* margin-bottom: 10px; */
  position: relative;
}
.login img.codeImg {
  width: 100px;
  height: 30px;
  border: 1px solid #ddd;
  position: absolute;
  right: 0;
  top:0;
}
.login .input-row label {
  margin-left: 15px;
}
.login.el-input {
  width: auto;
}
.login .el-input input {
  padding: 0 10px;
  border: 0;
  border-radius: 0;
  color: #836426;
}

.userLogin .prompt {
  color: #ff0000;
  text-align: left;
}
.userLogin .btn {
  background: #e6cf68;
  width: 100%;
  color: #333;
  border-color: #e6cf68;
  margin: 12px 0;
}
.userLogin .btn:focus,
.userLogin .btn:hover {
  color: #333;
  border-color: #e6cf68;
  background-color: #e6cf68;
}
.userLogin .btn_default {
  background: #eee;
  color: #836426;
  border-color: #eee;
}
.userLogin .btn_default:focus,
.userLogin .btn_default:hover {
  color: #836426;
  border-color: #eee;
  background-color: #eee;
}
.userLogin .btn.is-disabled,
.btn.is-disabled:focus,
.btn.is-disabled:hover {
  background: #eee;
  color: #836426;
  border-color: #eee;
}
.userLogin .forget {
  color: rgba(131, 100, 38, 0.5);
}
.userLogin .flex-box label {
  width: 70px;
  text-align: justify;
  text-align-last: justify;
  text-justify: distribute-all-lines;
}
.userLogin .loginBox label {
  width: 80px;
}
.userLogin .hoverCursor:hover {
  cursor: pointer;
}
.userLogin .colorRed {
  color: #ff0000;
}
.userLogin .el-checkbox,
.userLogin .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #999999;
}
.userLogin .comeBack {
  text-decoration: underline;
}
.userLogin .codeBtn {
  width: auto;
  margin: 5px 0;
  padding: 12px 8px;
}
</style>


