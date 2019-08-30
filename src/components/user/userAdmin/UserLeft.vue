<template>
  <div class="userLeft">
    <div class="userImg">
      <img :src="this.$store.state.infoData.avatar!=''?this.$store.state.infoData.avatar:avatar" @click="selfUser" alt />
      <span>用户名:{{isLogin==true?this.infoData.username:username}}</span>
      <span>余额:{{isLogin==true?this.infoData.money:money}}</span>
      <span>等级:{{isLogin==true?this.infoData.level:level}}</span>
    </div>
    <div class="userBtn">
      <el-row>
        <el-button type="warning" @click="recharge">充值</el-button>
      </el-row>
      <el-row>
        <el-button type="warning" @click="cashwithdrawal">提现</el-button>
      </el-row>
      <el-row>
        <el-button type="warning" @click="cashsweep">资金归集</el-button>
      </el-row>
    </div>
    <div class="liMenu">
      <ul>
        <li
          v-for="(item,index) in liMenu"
          :key="index"
          :class="active == index+1 ? 'addclass' : ''"
        >
          <a @click="goPage(item.id)" :style="imgList[index]" target="/index">{{item.msg}}</a>
          <!-- <a  @click="goPage(item.id)" :style="bg">{{item.msg}}</a> -->
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["infoData", "refreshUser"])
  },
  name: "userLeft",
  data() {
    return {
      urlName: "",
      active: -1,
      isLogin: false,
      imgList: [
        {
          backgroundImage:
            "url(" + require("../../../assets/user/iconName0.png") + ")"
        },
        {
          backgroundImage:
            "url(" + require("../../../assets/user/iconName1.png") + ")"
        },
        {
          backgroundImage:
            "url(" + require("../../../assets/user/iconName2.png") + ")"
        },
        {
          backgroundImage:
            "url(" + require("../../../assets/user/iconName3.png") + ")"
        },
        {
          backgroundImage:
            "url(" + require("../../../assets/user/iconName4.png") + ")"
        },
        {
          backgroundImage:
            "url(" + require("../../../assets/user/iconName5.png") + ")"
        },
        {
          backgroundImage:
            "url(" + require("../../../assets/user/iconName6.png") + ")"
        },
        {
          backgroundImage:
            "url(" + require("../../../assets/user/iconName7.png") + ")"
        },
        {
          backgroundImage:
            "url(" + require("../../../assets/user/iconName8.png") + ")"
        },
        {
          backgroundImage:
            "url(" + require("../../../assets/user/iconName9.png") + ")"
        }
      ],
      iconName: ["user", "eleme"],
      liMenu: [
        {
          id: 1,
          msg: "我的账户"
        },
        {
          id: 2,
          msg: "银行卡管理"
        },
        {
          id: 3,
          msg: "我的优惠"
        },
        {
          id: 4,
          msg: "额度转换"
        },
        {
          id: 5,
          msg: "资金往来"
        },
        {
          id: 6,
          msg: "团队总览"
        },
        {
          id: 7,
          msg: "下级管理"
        },
        {
          id: 8,
          msg: "游戏记录"
        },
        {
          id: 9,
          msg: "网站公告"
        },
        {
          id: 10,
          msg: "返回首页"
        }
      ],
      avatar: require("../../../assets/user/mrUser.png"),
      username: "游客",
      money: 10,
      level: 10,
      info: []
    };
  },
  mounted() {
    this.getLowerLevelData();
    let isLogin = localStorage.getItem("token");
    if (isLogin) {
      this.isLogin = true;
      if(this.$store.state.infoData.avatar!=""){
        //  this.avatar = this.infoData.avatar;
      }else{
         this.avatar = require("../../../assets/user/mrUser.png");
      }
    } else {
      this.isLogin = false;
      this.avatar = require("../../../assets/user/mrUser.png");
    }
    // this.username = this.$store.state.infoData.username;
    // this.money = this.$store.state.infoData.money;
    // this.avatar =this.$store.state.infoData.avatar;
    // this.level = this.$store.state.infoData.level;
  },
  methods: {
    goPage(id) {
      // this.getLowerLevelData();
      this.active = id;
      switch (id) {
        case (id = 1):
          this.$router.push({ path: "/myPay" });
          this.$store.commit("changeUname", "我的账户");
          break;
        case (id = 2):
          this.$router.push({ path: "/bankCard" });
          this.$store.commit("changeUname", "银行卡管理");

          break;
        case (id = 3):
          this.$router.push({ path: "/myDiscount" });
          this.$store.commit("changeUname", "我的优惠");
          break;
        case (id = 4):
          this.$router.push({ path: "/edTransform" });
          this.$store.commit("changeUname", "额度转换");
          break;
        case (id = 5):
          this.$router.push({ path: "/moneyDealings" });
          this.$store.commit("changeUname", "资金往来");
          break;
        case (id = 6):
          this.$router.push({ path: "/teamOverview" });
          this.$store.commit("changeUname", "团队总览");
          break;
        case (id = 7):
          this.$router.push({ path: "/subordAdmin" });
          this.$store.commit("changeUname", "下级管理");
          break;
        case (id = 8):
          this.$router.push({ path: "/gameRecords" });

          this.$store.commit("changeUname", "游戏记录");
          break;
        case (id = 9):
          this.$router.push({ path: "/webNotice" });
          this.$store.commit("changeUname", "网站公告");
          break;
        case (id = 10):
          // this.$router.push({ path: "/returnHome" });
            this.$store.commit("active_name","首页");
          this.$store.commit("umodelShow", false);
          break;

        default:
      }
    },
    recharge() {
      this.$router.push({ path: "/recharge" });
      this.$store.commit("changeUname", "充值");
      this.active = -1;
    },
    cashwithdrawal() {
      this.$router.push({ path: "/cashwithdrawal" });
      this.$store.commit("changeUname", "提现");
      this.active = -1;
    },
    cashsweep() {
      this.$router.push({ path: "/cashsweep" });
      this.$store.commit("changeUname", "资金归集");
      this.active = -1;
    },
    selfUser() {
      this.$router.push({ path: "/selfUser" });
      this.$store.commit("changeUname", "个人资料");
      this.active = -1;
    },

    getLowerLevelData() {
      //下级管理
      // this.post(this.apiUrl.apiLowerLevel,{
      //   limit: 1,
      //   page: 1
      // })
      //   .then(res => {
      //     var data = res.data;
      //     this.$store.commit("lowerLevel", data);
      //   })
      //   .catch(err => {
      //   });
    }
  },

};
</script>
 <style scoped>
.userLeft {
  color: #fff;
  background: #364150;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.userLeft .userImg {
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 42px 0 20px 0;
}
.userLeft .userImg img {
  border-radius: 50%;
  width: 100px;
  height: 100px;
}
.userLeft .userImg span {
  color: #e6cf68;
  letter-spacing: 1.8px;
}
.userLeft .userBtn {
  text-align: center;
}
.userBtn .el-button {
  width: 70%;
  margin-bottom: 14px;
  background: #e6cf68;
  border: none;
  color: #836426;
}
.userLeft .liMenu {
  text-align: left;
  padding-bottom: 30px;
}
.userLeft .liMenu li {
  margin-bottom: 2px;
  transition: all 0.3s linear;
  display: flex;
  align-items: center;
  padding-left: 25%;
  cursor: pointer;
}

.userLeft .liMenu a {
  border: none;
  width: 100%;
  text-align: left;
  color: #fff;
  display: block;
  height: 42px;
  line-height: 40px;
  box-sizing: border-box;
  background-repeat: no-repeat;
  padding-left: 30px;
  background-position: 0 7px;
}
.userLeft .liMenu .addclass {
  background: rgba(230, 207, 104, 0.3);
}
.userLeft .liMenu li:hover {
  background: rgba(230, 207, 104, 0.4);
}
</style>


