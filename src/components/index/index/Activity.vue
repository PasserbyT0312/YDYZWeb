<template>
  <!-- 优惠活动 -->
  <div class="activityBox">
    <el-carousel trigger="click" height="520px" class="banner topImg" :autoplay="true">
      <el-carousel-item v-for="item in bannerList" :key="item">
        <img :src="item" alt />
      </el-carousel-item>
    </el-carousel>
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
        <el-row>
          <el-collapse accordion>
            <el-collapse-item v-for="(item,index) in activityList" :key="index" :name="index">
              <template slot="title">
                <img :src="item.banner" alt />
                <div class="flex-con">{{item.title}}</div>
                <div class="time">{{item.created_at}}</div>
              </template>
              <div class="contentBox">
                <div v-html="item.title" class="contentTitle text-center"></div>
                <div v-html="item.content" class="content text-left"></div>
                <div class="text-right mg-b-10">{{item.author}}</div>
                <div class="text-right">{{item.created_at}}</div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-row>
        <!-- 分页 -->
        <el-row v-show="activityList.length>0" class="text-center">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="noticeTotal"
            :page-size="pageSize"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["noticeList", "bannerList"])
  },
  data() {
    return {
      noticePage: 1,
      pageSize: 10,
      noticeTotal: 0,
      activityList: []
    };
  },
  mounted() {
    this.getActivity();
  },
  methods: {
    getActivity() {
      //获取活动列表
      this.post(this.apiUrl.apiNotice, {
        limit: this.pageSize,
        page: this.noticePage,
        type: 2
      }).then(res => {
        if (res.code == 0) {
          this.activityList = res.data.items;
          this.noticeTotal = res.data.total;
        } else {
          this.activityList = [];
        }
      });
    },
    noticeDetail() {
      this.$store.commit("umodelShow", true);
      this.$router.push({
        path: "/activityBox"
      });
    },
    handleCurrentChange(curPage) {
      this.noticePage = curPage;
      this.getActivity();
    }
  }
};
</script>
<style>
.activityBox {
  /* margin-bottom:20px; */
  display: flex;
  flex: 1;
  flex-direction: column;
}
.activityBox .topImg {
  width: 100%;
  /* height:250px; */
}
.activityBox .flex-con{color:#fff;font-size:16px;}
.activityBox .container {
  width: 1200px;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  box-shadow: 0 0 8px #364150;
  padding: 15px 20px;
  box-sizing: border-box;
}
.activityBox .el-carousel--vertical {
  display: inline-block;
  font-size: 14px;
  margin-left: 14px;
  width: 100%;
  cursor: pointer;
}
.activityBox .noticeTitle {
  color: #ff9797;
  border: 1px solid #ff9797;
  width: 83px;
  text-align: center;
}
.activityBox .el-carousel__indicators--vertical {
  display: none;
}
.activityBox .banner img {
  height: 100%;
  width: 100%;
}
.activityBox .el-collapse {
  border: 0;
  padding: 0 5px;
}
.activityBox .el-collapse-item__header {
  border-bottom: 0;
  padding: 0 14px;
  color: #836426;
}
.activityBox .el-collapse-item .el-collapse-item__header {
  background: #706244;
}

.activityBox .time {
  margin-right: 8px;
  color:#e8e4e4;
}
.activityBox .el-collapse-item__content {
  padding: 20px;
}
.activityBox .el-icon-arrow-right::before{color:#e8e4e4;}
.activityBox .el-collapse-item__arrow.is-active {
  -webkit-transform: rotate(-90deg);
  transform: rotate(-90deg);
}
.activityBox .content {
  text-indent: 2em;
  margin-top: 23px;
  margin-bottom: 16px;
}
.activityBox .contentBox {
  color: #836426;
  font-size: 14px;
}
.activityBox .el-collapse-item__header {
  padding: 10px 14px 0;
  flex-wrap: wrap;
  height: auto;
}
.activityBox .el-collapse-item__header img {
  height: 146px;
  width: 100%;
}
.activityBox .el-collapse-item {
  margin-bottom: 10px;
  border: 1px solid #706244;
}
.activityBox .el-pagination {
  margin: 30px 0;
}
.activityBox .contentBox img {
  display: block;
  margin: 0 auto;
}
</style>

