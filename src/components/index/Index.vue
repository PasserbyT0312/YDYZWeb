<template>
  <!-- :style="{backgroundImage: 'url(' +indexBg+')'}"
    style="background-image: url(/static/img/indexBg.745c671.png);
    background-size: 100% 100%;
  background-repeat: no-repeat;"-->
  <div class="index">
    <div class="indexTop">
      <div class="topNav">
        <div class="logo">
          <img :src="webLogo" alt />
        </div>
        <!-- <el-menu
          :default-active="activeIndex2"
          class="el-index"
          mode="horizontal"
          @select="handleSelect"
          background-color="transparent"
          text-color="#E6CF68"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">优惠</el-menu-item>
          <el-menu-item index="3">充值</el-menu-item>
          <el-menu-item index="4">客服</el-menu-item>
          <el-menu-item index="5">管理</el-menu-item>
          <el-menu-item index="6">登录</el-menu-item>
          <el-menu-item index="6">会员中心</el-menu-item>
        </el-menu>-->

        <div class="indexNav">
          <a
            v-for="(item,index) in firstNav"
            :key="index"
            :class="active==index?'navABg':''"
            @click="viewToggle(index,item.id)"
          >{{item.name}}</a>
          <span v-if="this.navA.length>7?true:false" class="yrMore">
            <span :class="navSBg" v-if="spanShow">{{navText}}</span>
            <div class="sDiv" @mouseenter="moreSel" @mouseleave="ulHide">
              <img :src="moreImg" alt />
              <ul class="navDrop" v-if="ulShow">
                <li
                  v-for="(item,index) in lastNav"
                  :key="index"
                  @click="viewToggle1(index+6,item.id,item.name)"
                >{{item.name}}</li>
              </ul>
            </div>
          </span>
        </div>
        <ul class="indexLogin">
          <li v-if="this.$store.state.uname=='游客'?true:false">
            <a @click="loginModel">登录</a>
            <!-- <a >
              {{this.$store.state.uname}}
            
            </a>-->
          </li>
          <li v-else class="flex-box">
            <a @click="userModel" style="display:flex;align-items:Center;">
              <img
                :src="this.$store.state.infoData.avatar!=''?this.$store.state.infoData.avatar:require('../../assets/user/mrUser.png')"
                style="width:40px;height:40px;border-radius:50%;"
                alt
              />
              <div style="display:flex;flex-direction:column;margin-left:5px;">
                <span style="color:#e6cf68;display:flex;align-items:Center;margin-bottom:3px;">
                  <span style="color:#e6cf68;padding-right:8px;">{{this.$store.state.uname}}</span>
                  <img
                    src="../../assets/index/yrMoneyIcon.png"
                    style="margin-left:-2px;width:14px;height:14px;margin-right:2px;"
                    alt
                  />
                  {{this.$store.state.infoData.money!=""?this.$store.state.infoData.money:'0.00'}}
                </span>
                <div style="font-size:12px;text-align:left;">
                  会员中心
                  <span style="color:#e6cf68;"></span>
                  <span @click.stop="closeUser" style="padding-left:8px;">[退出]</span>
                </div>
              </div>
              <!-- <img src="../../assets/index/yrMoneyIcon.png" style="margin-left:-2px;width:14px;height:14px;margin-right:2px;" alt=""> -->
              <div></div>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="indexMain">
      <keep-alive>
        <yr-main v-if="activeName=='首页'?true:false"></yr-main>
      </keep-alive>
      <keep-alive>
        <yr-lottory v-if="activeName==1?true:false" :gameId="activeName"></yr-lottory>
      </keep-alive>
      <keep-alive>
        <yr-live v-if="activeName==2?true:false" :gameId="activeName"></yr-live>
      </keep-alive>
      <keep-alive>
        <yr-poker v-if="activeName==3?true:false" :gameId="activeName"></yr-poker>
      </keep-alive>
      <keep-alive>
        <yr-egames v-if="activeName==4?true:false" :gameId="activeName"></yr-egames>
      </keep-alive>
      <keep-alive>
        <yr-exports v-if="activeName==5?true:false" :gameId="activeName"></yr-exports>
      </keep-alive>

      <keep-alive>
        <yr-activity v-if="activeName=='优惠活动'?true:false"></yr-activity>
      </keep-alive>
      <yr-service v-if="activeName=='在线客服'?true:false"></yr-service>
      <keep-alive>
        <yr-login v-if="loginSHow"></yr-login>
      </keep-alive>
      <keep-alive>
        <transition name="fade">
          <yr-user v-if="userShow"></yr-user>
        </transition>
      </keep-alive>
    </div>
    <div class="indexBottom">
      <span>
        <img src="../../assets/index/ft_logo.png" alt />
      </span>
      <span class="mg-t-10">Copyright © {{this.website.site_name}} Reserved</span>
    </div>
    <el-dialog
      title
      :visible.sync="dialogVisible"
      width="500px"
      @click="dialogVisible = false"
      class="indexDialog"
    >
      <img :src="dialogContent.image" alt />
      <div class="dialogBottom">
        <div class="logContent mg-b-10">{{dialogContent.content}}</div>
        <div class="text-right mg-b-10">{{dialogContent.author}}</div>
        <div class="text-right">{{dialogContent.created_at}}</div>
      </div>
    </el-dialog>
    <!--  -->
    <transition name="fade">
      <div class="fixscroll" id="fixd-left" v-if="fixedLeftSHow">
        <a></a>
        <a>
          <img src="../../assets/index/left_01.png" alt />
          <img style="width:100px;height:100px;position:absolute;top:170px;left:25px;" :src="'data:image/png;base64,'+this.website.app_qrcode?this.website.app_qrcode:''" alt="">
        </a>
        <a>
          <img src="../../assets/index/left_02.png" alt />
            <img style="width:100px;height:100px;position:absolute;top:325px;left:25px;" :src="'data:image/png;base64,'+this.website.app_qrcode?this.website.app_qrcode:''" alt="">
        </a>
        <a>
          <img @click="closeLeftFixed" class="fixedClose" src="../../assets/index/close.png" alt />
        </a>
      </div>
    </transition>
    <transition name="fade">
      <div class="fixscroll" id="fixd-right" v-if="fixedRightSHow">
        <a></a>
        <a :href="this.website.service_link" target="_black">
          <img @click="goKf" src="../../assets/index/right_01.png" alt />
        </a>
        <a>
          <img src="../../assets/index/right_02.png" alt />
          <span style="left:36px;top:236px;position:absolute;" class="fixscroll_qq">{{this.website.qq?this.website.qq:""}}</span>
        </a>
        <a>
          <img src="../../assets/index/right_05.png" alt />
          <span style="left:25px;top:289px;position:absolute;" class="fixscroll_qq">{{this.website.tel?this.website.tel:""}}</span>
        </a>
        <a>
          <img src="../../assets/index/right_04.png" alt />
               <span style="left:28px;bottom:26px;" class="fixscroll_qq"><img style="width:90px;height:90px;position:absolute;top:-104px;" :src="'data:image/png;base64,'+this.website.kefu_qrcode?this.website.kefu_qrcode:''" alt=""></span>
        </a>

        <a>
          <img @click="closeRightFixed" class="fixedClose" src="../../assets/index/close.png" alt />
        </a>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Login from "@/components/user/login/Login";
import User from "@/components/user/User";
import Main from "@/components/index/index/Main";
import Service from "@/components/index/index/Service";
import Live from "@/components/index/index/Live";
import Lottory from "@/components/index/index/Lottory";
import Egames from "@/components/index/index/Egames";
import Exports from "@/components/index/index/Exports";
import Poker from "@/components/index/index/Poker";
import Activity from "@/components/index/index/Activity";
import { log } from "util";
import { setInterval } from "timers";
export default {
  computed: {
    ...mapState(["umodelShow", "lmodelShow", "refreshUser", "active_name"])
  },
  name: "login",
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  data() {
    return {
      fixedLeftSHow: true,
      fixedRightSHow: true,
      ulShow: false,
      spanShow: false,
      navText: "",
      active: -1,
      activeName: "首页",
      loginSHow: "",
      userShow: "",
      indexBg: require("../../assets/index/indexBg.png"),
      activeIndex: "1",
      activeIndex2: "1",
      mainShow: true,
      dialogVisible: false,
      dialogContent: {},
      navSBg: "",
      website: {},
      moreImg: require("../../assets/index/yrMore1.png"),
      navA: [
        {
          id: "首页",
          name: "首页"
        },
        {
          id: "优惠活动",
          name: "优惠活动"
        },
        {
          id: "在线客服",
          name: "在线客服"
        }
      ],
      lastNav: [],
      firstNav: [],
      webLogo: ""
    };
  },
  mounted() {
    this.active = 0;
    this.getRule();
    this.getDataDictionaries();
    this.getCommon();
    this.getGeme();
    let isLogin = localStorage.getItem("token");

    if (isLogin) {
      this.getInfo();
      this.getBankList();
      this.getAllBack();
    }
  },
  methods: {
    getRule() {
      var that = this;
      this.post(this.apiUrl.apiRequestRule, {
        versionName: "MemberAppV001"
      })
        .then(function(response) {
          that.$store.commit("regRule", response.data);
          // var data1 = response.data.data;
          // let getRulesData = JSON.stringify(data1);
          // that.$store.commit("getRules", getRulesData);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    loginModel() {
      this.$store.commit("lmodelShow", true);
      this.userShow = false;
      this.loginSHow = !this.loginShow;

      this.noScroll();
    },
    userModel() {
      var that = this;
      this.getInfo();
      this.$router.push({
        path: "/myPay"
      });
      this.$store.commit("umodelShow", true);
      this.userShow = !this.userShow;
      this.loginSHow = false;
      this.noScroll();
      // let isLogin = localStorage.getItem("token");
      // if (isLogin) {

      // } else {
      //   this.$confirm("用户登录需登录后才可以访问", "提示", {
      //     confirmButtonText: "确定",
      //     cancelButtonText: "取消",
      //     type: "warning"
      //   })
      //     .then(() => {
      //       that.$store.commit("lmodelShow", true);
      //       that.userShow = false;
      //       that.loginSHow = !this.loginShow;
      //       that.$router.push({
      //         path: "/myPay"
      //       });
      //     })
      //     .catch(() => {});
      // }
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    viewToggle(index, name) {
      this.active = index;
      this.activeName = name;
    },
    viewToggle1(index, name, value) {
      this.navSBg = "navSBg";
      this.active = -1;
      this.activeName = name;
      this.navText = value;
      this.ulShow = false;
      this.spanShow = true;
      this.moreImg = require("../../assets/index/yrMore.png");
    },
    closeUser() {
      this.$confirm("确认退出当前登录用户吗？", "提示", {})
        .then(() => {
          this.$store.commit("uname", "游客");
          localStorage.removeItem("token");
        })
        .catch(() => {});
    },
    goKf(){

    },
    getDataDictionaries() {
      var that = this;
      //获取数据字典
      this.post(this.apiUrl.apiDataDataDictionaries).then(res => {
        var data = res.data;
        this.website = data.website;
        this.$store.commit("dictionariesData", data);
        that.webLogo = data.website.m_site_logo;
        let link =
          document.querySelector("link[rel*='icon']") ||
          document.createElement("link");
        link.type = "image/x-icon";
        link.rel = "shortcut icon";
        link.href = data.website.favicon;
        document.getElementsByTagName("head")[0].appendChild(link);
        let meta = document.createElement('meta');
         meta.content = data.website.keyword;
         meta.name="keywords";
         document.getElementsByTagName("head")[0].appendChild(meta);
        window.document.title = data.website.site_title;
      });
    },
    getInfo() {
      //获取个人数据信息
      var that = this;
      this.post(this.apiUrl.apiGetInfo).then(res => {
        var data = res.data;
        this.$store.commit("infoData", data);
      });
    },
    getBankList() {
      this.post(this.apiUrl.apiBankAccountList, {}).then(res => {
        if (res.data != "") {
          this.$store.commit("bankList", res.data);
        }
      });
    },
    getAllBack() {
      this.post(this.apiUrl.apiBalances, {}).then(res => {
        if (res.data) {
          var data = res.data;
          data.shift();
          this.$store.commit("cashsweepData", data);
          // console.log(this.cashsweepData);
        }
      });
    },
    getCommon() {
      var that = this;
      //获取游戏列表
      this.post(this.apiUrl.apiMultiple, {
        apiArr: "banners|homeGame|notice|dialog"
      }).then(res => {
        if (res.code == 0) {
          var data = res.data;
          this.$store.commit("noticeList", data.notice.items);
          this.$store.commit("bannerList", data.banners.site_banners);
          this.$store.commit("gameList", data.homeGame.lines);
          console.log(data.notice);

          var gameName = res.data.homeGame.lines;
          var navInit = 1;
          if (gameName && gameName.length > 0) {
            for (var i = 0; i < gameName.length; i++) {
              var item = {
                id: gameName[i].id,
                name: gameName[i].name
              };
              that.navA.splice(navInit++, 0, item);
            }
          }
          let firstNav = [];
          firstNav = this.navA.slice(0);
          if (firstNav.length > 7) {
            firstNav.splice(6);
            this.firstNav = firstNav;
            this.lastNav = this.navA.slice(6);
          } else {
            this.firstNav = this.navA;
          }

          if (res.data.dialog) {
            that.dialogVisible = true;
            that.dialogContent = res.data.dialog;
          }
        }
      });
    },
    getGeme() {
      //获取单线游戏列表
      this.post(this.apiUrl.apiElectronic, {
        game_line_id: 2
      }).then(res => {
        if (res.code == 0) {
          this.$store.commit("lineList", res.data);
        }
      });
    },
    moreSel() {
      this.ulShow = true;
    },
    ulHide() {
      this.ulShow = false;
    },
    closeLeftFixed() {
      this.fixedLeftSHow = false;
      setInterval(() => {
        this.fixedLeftSHow = true;
      }, 30000);
    },
    closeRightFixed() {
      this.fixedRightSHow = false;
      setInterval(() => {
        this.fixedRightSHow = true;
      }, 30000);
    }
  },
  watch: {
    umodelShow(newName, oldName) {
      if (oldName == true) {
        this.userShow = false;
        this.canScroll();
      } else {
        this.userShow = true;
        this.noScroll();
      }
    },
    lmodelShow(newName, oldName) {
      if (oldName == true) {
        this.loginSHow = false;
        this.canScroll();
        if (localStorage.getItem("token")) {
          this.getInfo();
        }
      } else {
        this.loginSHow = true;
      }
    },
    refreshUser(newName, oldName) {
      if (newName == true) {
        this.getInfo();
        this.$store.commit("refreshUser", false);
      } else {
      }
    },
    active_name(newName, oldName) {
      if (newName == "在线客服") {
        this.activeName = "在线客服";
        this.$store.commit("active_name", "");
        for (var i = 0; i < this.navA.length; i++) {
          if (this.navA[i].name == "在线客服") {
            this.active = i;
          }
        }
      }
      if (newName) {
        if (newName == 1) {
          this.activeName = 1;
          this.$store.commit("active_name", "");
          for (var i = 0; i < this.navA.length; i++) {
            if (this.navA[i].name == "彩票游戏") {
              this.active = i;
            }
          }
        }
        if (newName == 2) {
          this.activeName = 2;
          this.$store.commit("active_name", "");
          for (var i = 0; i < this.navA.length; i++) {
            if (this.navA[i].name == "真人视讯") {
              this.active = i;
            }
          }
        }
        if (newName == 3) {
          this.activeName = 3;
          this.$store.commit("active_name", "");
          for (var i = 0; i < this.navA.length; i++) {
            if (this.navA[i].name == "棋牌游戏") {
              this.active = i;
            }
          }
        }

        if (newName == 4) {
          this.activeName = 4;
          this.$store.commit("active_name", "");
          for (var i = 0; i < this.navA.length; i++) {
            if (this.navA[i].name == "电子游艺") {
              this.active = i;
            }
          }
        }
          if (newName == 5) {
          this.activeName = 5;
          this.$store.commit("active_name", "");
          for (var i = 0; i < this.navA.length; i++) {
            if (this.navA[i].name == "体育游戏") {
              this.active = i;
            }
          }
        }
      } else {
        // this.$message("页面加载失败，请刷新重试，谢谢！");
      }
      if (newName == "首页") {
        this.activeName = "首页";
        this.$store.commit("active_name", "");
        for (var i = 0; i < this.navA.length; i++) {
          if (this.navA[i].name == "首页") {
            this.active = i;
          }
        }
      }
    }
  },
  components: {
    yrLogin: Login,
    yrUser: User,
    yrMain: Main,
    yrService: Service,
    yrLive: Live,
    yrLottory: Lottory,
    yrEgames: Egames,
    yrExports: Exports,
    yrPoker: Poker,
    yrActivity: Activity
  }
};
</script>
<style>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.index {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
.indexMain {
  /* min-height: 1070px; */
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 90px;
}
.indexTop {
  background: #364150;
  height: 90px;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 5;
  box-shadow: 0 4px 6px #202020;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
}
.indexTop .topNav {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  font-size: 15px;
  justify-content: space-between;
  padding: 0 10px;
}
.index .logo {
  /* margin-right: 64px; */
  width: 300px;
  font-size: 0;
}
.index .logo img {
  width: 100%;
}
.index .el-menu.el-menu--horizontal {
  border: none;
}
.indexLogin {
  cursor: pointer;
  /* flex: 1;
    display: flex;
    justify-content: flex-end; */
}

.indexLogin li {
  padding-left: 5px;
}
.indexLogin li a {
  cursor: pointer;
  color: #f3f2f2;
  /* display: flex;
  align-items: center; */
  text-align: center;
  padding-right: 10px;
}
.indexNav a.navABg {
  background: #6c6c57;
  color: #e6cf68;
  border-radius: 20px;
}
span.navSBg {
  background: #6c6c57;
  color: #e6cf68;
  border-radius: 20px;
  margin-left: 2px;
}
/*  */
.indexNav {
  display: flex;
  align-items: center;
}
.indexNav a {
  min-width: 90px;
  height: 30px;
  color: #f3f2f2;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
.indexNav a:hover {
  color: #e6cf68;
  border-radius: 20px;
}
.indexBottom {
  background: #364150;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #666;
}
.indexLogin li a span {
  font-size: 12px;
  color: #999;
}
.indexDialog .el-dialog__body {
  color: #836426;
  padding: 0;
}
.indexDialog .dialogBottom {
  padding: 20px;
}
.indexDialog img {
  width: 100%;
}
.indexDialog .el-dialog__headerbtn {
  top: 1px;
  right: 7px;
  font-size: 25px;
}
.index .yrMore {
  position: relative;
  /* width: 90px; */
  color: #fff;
  font-size: 15px;
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.index .yrMore img {
  width: 26px;
  position: relative;
}
.index .yrMore span {
  display: block;
  width: 90px;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.index .yrMore:hover .navDrop {
  display: block;
}
.index .yrMore .navDrop {
  position: absolute;
  width: 90px;
  min-height: 100px;
  background: #364150;
  top: 27px;
  left: -20px;
  text-align: center;

  border-radius: 8px;
  padding-top: 10px;
}
.index .yrMore .navDrop li {
  padding: 4px 0;
  cursor: pointer;
}
.yrMore .sDiv {
  position: relative;
  display: flex;
  align-items: center;
}
.index .yrMore .navDrop li:hover {
  color: #e6cf68;
}
@keyframes fixedMoveLeft {
  0% {
    left: 400px;
    top: 30%;
  }
  100% {
    left: 10px;
    top: 50%;
  }
}
@keyframes fixedMoveRight {
  0% {
    right: 400px;
    top: 70%;
  }
  100% {
    right: 10px;
    top: 50%;
  }
}
.index .fixscroll {
  z-index: 9999;
  height: 394px;
  width: 144px;
  position: fixed;
  top: 30%;
  margin-top: -182px;
}

.index #fixd-left {
  left: 10px;
  top: 50%;
  animation: fixedMoveLeft 8s;
  -moz-animation: fixedMoveLeft 8s; /* Firefox */
  -webkit-animation: fixedMoveLeft 8s; /* Safari and Chrome */
  -o-animation: fixedMoveLeft 8s; /* Opera */
}
/* infinite */
.index #fixd-right {
  right: 10px;
  top: 50%;
  animation: fixedMoveRight 8s;
  -moz-animation: fixedMoveRight 8s; /* Firefox */
  -webkit-animation: fixedMoveRight 8s; /* Safari and Chrome */
  -o-animation: fixedMoveRight 8s; /* Opera */
}
.fixscroll_qq {
  position: relative;
  bottom: 24px;
  left: 35px;
  display: inline-block;
  color:#fff;font-weight:bold;
}
.index #fixd-right a span {
  text-align: center;
}
.index .fixscroll img {
  display: block;
  border: none;
}
.index .fixedClose {
  cursor: pointer;
}
@media screen and (max-width: 1450px) {
  .indexTop .topNav {
    font-size: 14px;
  }
  .indexNav a {
    width: 100px;
  }
  .indexTop {
    height: 60px;
  }
}
</style>


