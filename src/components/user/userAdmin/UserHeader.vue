<template>
  <div class="userHeader">
    <div class="headerLeft">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>
          <span @click="returnHome">首页</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>会员中心</el-breadcrumb-item>
        <el-breadcrumb-item>{{this.urlName}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="headerRight">
      <img src="../../../assets/user/guanbi.png" @click="closeModel" alt />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["urlName"])
  },
  name: "userHeader",
  methods: {
    closeModel() {
      this.$router.push({
        path: "/"
      });
      this.$store.commit("umodelShow", false);
    },
    returnHome() {
      this.$router.push({ path: "/" });
      this.$store.commit("umodelShow", false);
    }
  },

  mounted() {}
};
</script>
<style>
 .el-header {
  padding: 0!important;
  height: 50px !important;
}
.userHeader {
  background: #2b3643;
  height: 50px;
  align-items: center;
  color: #836426;
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  box-sizing: border-box;
}
.userHeader .headerLeft span {
  letter-spacing: 0.8px;
  font-size: 14px;
  font-family: PingFang SC Regular;
}
.userHeader .headerLeft span:last-child {
  color: #fff;
}
.userHeader .headerRight img {
  width: 18px;
  height: 18px;
}
.userHeader .el-breadcrumb__inner,
.el-breadcrumb__separator {
  color: #e6cf68;
}
.userHeader .el-breadcrumb__item:last-child .el-breadcrumb__inner,
.userHeader .el-breadcrumb__item:last-child .el-breadcrumb__inner a,
.userHeader .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
.userHeader .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  color: #fff;
}
.userHeader .el-breadcrumb__inner span {
  color: #e6cf68 !important;
}
</style>


