<template>
  <div class="user">
    <!-- @mousewheel.prevent -->
    <div class="userBody">
      <div class="userMain" :class="[winWidth>1920?'aaa':'bbb',winWidth<1600?'ccc':'aaa']">
        <transition name="fade">
          <el-container>
            <el-aside width="280px">
              <user-left></user-left>
            </el-aside>
            <el-container>
              <el-header>
                <user-header></user-header>
              </el-header>
              <el-main>
                <user-content>
                  <keep-alive>
                    <!-- <router-view v-if="isRouterAlive"></router-view> -->
                  </keep-alive>
                </user-content>
              </el-main>
            </el-container>
          </el-container>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import UserHeader from "@/components/user/userAdmin/UserHeader";
import UserLeft from "@/components/user/userAdmin/UserLeft";
import UserContent from "@/components/user/userAdmin/UserContent";

export default {

  computed: {
    ...mapState(["modelShow"])
  },
  name: "yrUser",
  data() {
    return {
      winWidth: document.documentElement.clientWidth,
      aaa: "1465px",
      bbb: "75%",
      ccc: "90%",
    
    };
  },

  mounted() {},
  methods: {

  },
  components: {
    UserHeader,
    UserLeft,
    UserContent
  }
};
</script>
<style scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.user .el-main {
  padding: 0;
  height: 100%;
}
.user {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  overflow-y: auto;
  overflow-x: hidden;
}
.el-container {
  width: 100%;
}
.userBody {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  padding: 50px 0;
  box-sizing: border-box;
}
.userMain {
  min-height: 896px;
}
.userMain .container {
  width: 100%;
}
.user .aaa {
  width: 1465px;
}
.user .bbb {
  width: 75%;
}
.user .ccc {
  width: 80%;
  margin: 30px 0;
}
/* .user .ab{min-height:100%;width:100%;display: flex;flex-direction: row; } */

/* .userMain .container{flex:1;display:flex;width:100%;} */
.user .userMain .rowTop {
  height: 50px;
}
.user .userMain .rowBottom {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>


