<template>
  <!-- 首页 -->
  <div class="mainBox">
    <div style="min-height:520px;">
      <el-carousel
        v-if="bannerList.length>0"
        trigger="click"
        height="520px"
        class="banner topImg"
        :autoplay="true"
      >
        <el-carousel-item v-for="item in bannerList" :key="item">
          <img :src="item" alt />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="mainBg">
      <div class="container">
        <el-row v-if="noticeList.length>0" class="flex-box mg-b-20">
          <div class="noticeTitle">
            <img src="../../../assets/index/notice.png" alt /> 传奇咨询
          </div>
          <el-carousel
            height="16px"
            direction="vertical"
            :autoplay="true"
            @click.native="noticeDetail"
          >
            <el-carousel-item v-for="(item,index) in noticeList" :key="index">
              <h3 class="medium">{{item.title}}</h3>
            </el-carousel-item>
          </el-carousel>
        </el-row>
        <el-row class="mainList">
          <el-col :span="12" v-for="(item,index) in gameList" :key="index">
            <div @click="mainListClick(item.id)"><span class="listName">{{item.name}}</span></div>
          </el-col>
          <!-- <el-col :span="12">
            <div @click="mainListClick(2)"></div>
          </el-col>
          <el-col :span="12">
            <div @click="mainListClick(3)"></div>
          </el-col>
          <el-col :span="12">
            <div @click="mainListClick(4)"></div>
          </el-col>-->
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["noticeList", "bannerList", "gameList"])
  },
  data() {
    return {};
  },
  mounted() {
    // console.log(this.gameList);
  },
  methods: {
    noticeDetail() {
      this.$store.commit("umodelShow", true);
      this.$router.push({
        path: "/webNotice"
      });
    },
    mainListClick(e) {
      console.log(e);
      
      this.$store.commit("active_name", e);
    }
  }
};
</script>
<style>
.mainBox {
  display: flex;
  flex: 1;
  flex-direction: column;
  /* Safari 5.1 - 6.0 */
}
.mainBg {
  flex: 1;
  background: -webkit-linear-gradient(top, #364150, #fff 50%, #364150);
  /* Opera 11.1 - 12.0 */
  background: -o-linear-gradient(top, #364150, #fff 50%, #364150);
  /* Firefox 3.6 - 15 */
  background: -moz-linear-gradient(top, #364150, #fff 50%, #364150);
  /* 标准的语法 */
  background: linear-gradient(to bottom, #364150, #000);
}
.mainBox .topImg {
  width: 100%;
}
.mainBox .container {
  width: 1200px;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 15px;

  /* background:rgba(255,255,255,0.8);
  border-radius:8px;
  box-shadow:0 0 8px #b5b4b4; */
  padding: 15px 20px;
  box-sizing: border-box;
}
.mainBox .mainList {
  padding: 0 50px;
}
.mainBox .mainList .el-col-12 {
  display: flex;
  justify-content: center;
}
.mainBox .mainList .el-col-12 div {
  height: 300px;
  width: 95%;
  border: 1px solid #4a4747;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  background: #4a4747;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-shadow: 1px 1px 15px red;
  font-size: 48px;
  font-family: "楷体";
}
.mainBox .mainList .el-col-12 div .listName{transform: scale(0); position: relative;z-index:5;transition: all 0.4s linear;}
/* .mainBox .mainList .el-col-12 div img{width:100%;height} */
.mainBox .mainList .el-col-12 div::before {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  content: "";
  background: rgba(0, 0, 0, 0.7);
  transition: all 0.4s linear;
  transform: scale(0);
}
.mainBox .mainList .el-col-12:nth-of-type(1) div {
  background: url("../../../assets/index/taiyang_live4.jpg");
  background-size: cover;
}
.mainBox .mainList .el-col-12:nth-of-type(2) div {
  background: url("../../../assets/index/taiyang_live2.jpg");
  background-size: cover;
}
.mainBox .mainList .el-col-12:nth-of-type(3) div {
  background: url("../../../assets/index/taiyang_live3.jpg");
  background-size: cover;
}
.mainBox .mainList .el-col-12:nth-of-type(4) div {
  background: url("../../../assets/index/taiyang_live1.jpg");
  background-size: cover;
}

.mainBox .mainList .el-col-12 div:hover {
  border: 1px solid #e6cf68;
}
.mainBox .mainList .el-col-12 div:hover .listName{
transform: scale(1); 
}
.mainBox .mainList .el-col-12 div:hover::before {
  transform: scale(1);
}
.mainBox .el-carousel--vertical {
  display: inline-block;
  font-size: 14px;
  margin-left: 14px;
  width: 100%;
  cursor: pointer;
}
.noticeTitle {
  color: #ff9797;
  border: 1px solid #ff9797;
  width: 83px;
  text-align: center;
}
.mainBox .el-carousel__indicators--vertical {
  display: none;
}
.mainBox .itemBox {
  width: 585px;
}
.mainBox .itemBox .topAd {
  width: 100%;
  height: 200px;
}
.mainBox .title img {
  margin-right: 7px;
}
.mainBox .title {
  margin-top: 30px;
  margin-bottom: 20px;
}
.mainBox .gameMenu {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0 101px;
}
.mainBox .gameMenu .itemGame {
  text-align: center;
  margin-bottom: 30px;
  width: 95px;
  font-size: 12px;
}
.mainBox .gameMenu .itemImg {
  width: 56px;
  height: 62px;
  margin-bottom: 12px;
}
.mainBox .middleBox {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 11px;
}
.mainBox .middleBox .itemBox:nth-child(odd) {
  margin-right: 30px;
}
.mainBox .banner img {
  height: 100%;
  width: 100%;
}
</style>

