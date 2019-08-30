<template>
  <!-- 网站公告 -->
  <div class="contentMain">
    <div class="contentMainContent webNotice">
      <el-row class="container">
        <el-row class="payNav">
          <span></span>网站公告
        </el-row>
        <el-row class="contentMainTable">
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item v-for="(item,index) in noticeList" :key="index" :name="index">
              <template slot="title">
                <div class="flex-con">{{item.title}}</div>
                <div class="time">{{item.created_at}}</div>
              </template>
              <div class="contentBox">
                <div class="contentTitle text-center" v-html="item.title"></div>
                <div class="content text-left" v-html="item.content"></div>
                <div class="text-right mg-b-10">{{item.author}}</div>
                <div class="text-right">{{item.created_at}}</div>
              </div>
            </el-collapse-item>
            <div v-if="noticeList.length!=0?false:true" class="noContent">
              <img src="../../../../assets/noContent.png" alt />
            </div>
          </el-collapse>
        </el-row>
        <!-- 分页 -->
        <el-row v-show="noticeList.length>0" class="text-center">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="noticeTotal"
            :page-size="pageSize"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </el-row>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 0,
      noticePage: 1,
      pageSize: 10,
      noticeTotal: 0,
      noticeList: []
    };
  },
  mounted() {
    this.getNotice();
  },
  methods: {
    getNotice() {
      this.post(this.apiUrl.apiNotice, {
        limit: this.pageSize,
        page: this.noticePage,
        type: 1
      }).then(response => {
        if (response.code == 0) {
          this.noticeList = response.data.items;
          this.noticeTotal = response.data.total;
        } else {
          this.noticeList = [];
        }
      });
    },
    handleCurrentChange(curPage) {
      this.noticePage = curPage;
      this.getNotice();
    }
  }
};
</script>
 <style>
@import "../../../../assets/search.css";
.webNotice .el-collapse {
  border: 0;
  padding: 0 5px;
}
.webNotice .el-collapse-item__header {
  border-bottom: 0;
  padding: 0 14px;
  color: #836426;
}
.webNotice .el-collapse-item .el-collapse-item__header {
  background: rgba(249, 249, 249, 1);
}
.webNotice .time {
  margin-right: 8px;
}
.webNotice .el-collapse-item {
  margin-bottom: 5px;
}
.webNotice .el-collapse-item__wrap {
  max-height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
  background: rgba(131, 100, 38, 0.1);
}

.webNotice .el-collapse-item__content {
  padding: 20px;
}
.webNotice .el-collapse-item__arrow.is-active {
  -webkit-transform: rotate(-90deg);
  transform: rotate(-90deg);
}
.webNotice .content {
  text-indent: 2em;
  margin-top: 23px;
  margin-bottom: 16px;
}
.webNotice .contentBox {
  color: #836426;
  font-size: 14px;
}
/* .webNotice .el-collapse-item__wrap::-webkit-scrollbar {
  width: 0 !important; remove scrollbar space 
  background: transparent; /* optional: just make scrollbar invisible 
}

 兼容IE10+ 
.webNotice .el-collapse-item__wrap {
  -ms-overflow-style: none;
} */
.webNotice .contentBox img {
  display: block;
  margin: 0 auto;
}
</style>


