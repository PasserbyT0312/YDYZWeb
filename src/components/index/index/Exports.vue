<template>
  <!-- 体育游戏 -->
  <div class="exportsBox">
    <img :src="list.image" alt class="topImg" />
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
      <el-row class="middleBox" :gutter="20">
        <el-col :span="12" v-for="item in list.child" :key="item.game_line_id">
          <div class="itemGame">
            <img :src="item.pc_image" alt class="itemImg" />
            <div class="itemTitle font-bold flex-box-between mg-t-10">
              <h2>{{item.display_name}}</h2>
              <div class="locked" @click="intoGame(item)">进入游戏</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
 </div>
    <el-dialog title="额度转换" :visible.sync="dialogFormVisible" width="450px" center>
      <el-form>
        <el-form-item :label="gameName+'余额：'" :label-width="formLabelWidth">
          <el-input v-model="gameBalance" readonly></el-input>
        </el-form-item>
        <el-form-item label="主账号余额：" :label-width="formLabelWidth">
          <el-input v-model="accountBalance" readonly></el-input>
        </el-form-item>
        <el-form-item :label="'转入'+gameName+'：'" :label-width="formLabelWidth">
          <el-input v-model.number="transferNum" type="number" placeholder="请输入转入金额"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="transferIn">转换并进入</el-button>
        <el-button @click="goIn">直接进入</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["gameList", "noticeList"])
  },
  props: ["gameId"],
  data() {
    return {
      list: [],
      clientUrl: "",
      dialogFormVisible: false,
      formLabelWidth: "140px",
      gameBalance: "",
      accountBalance: "",
      transferNum: "",
      gameData: "",
      gameName: "",
      gameLineId: ""
    };
  },
  watch: {
    dialogFormVisible(newVal, oldVal) {
      if (oldVal) {
        this.transferNum = "";
      }
    }
  },
  mounted() {
    if (this.gameList != "") {
      for (var i = 0; i < this.gameList.length; i++) {
        if (this.gameList[i].id == this.gameId) {
          this.list = this.gameList[i];
        }
      }
    }
  },
  methods: {
    noticeDetail() {
      this.$store.commit("umodelShow", true);
      this.$router.push({
        path: "/webNotice"
      });
    },
    intoGame(item) {
      this.gameLineId = item.game_line_id;
      this.post(this.apiUrl.apiGamePlay, {
        line_id: this.gameLineId,
        device: 1
      }).then(res => {
        if (res.code == 0) {
          this.clientUrl = res.data.client_url;
          this.getGameBalance();
        }
      });
    },
    getGameBalance() {
      this.post(this.apiUrl.apiGameBalances, {
        line_id: this.gameLineId
      }).then(res => {
        if (res.code == 0) {
          this.dialogFormVisible = true;
          this.gameName = res.data[1].line_name;
          this.gameBalance = res.data[1].balance;
          this.accountBalance = res.data[0].balance;
        }
      });
    },
    transferIn() {
      if (this.transferNum == "" || this.transferNum == 0) {
        this.$message.error("请输入转入数量");
      } else {
        this.post(this.apiUrl.apiGameTransferOut, {
          line_id: this.gameLineId,
          value: this.transferNum
        }).then(res => {
          if (res.code == 0) {
            this.dialogFormVisible = false;
            location.href = this.clientUrl;
          }
        });
      }
    },
    goIn() {
      this.dialogFormVisible = false;
      location.href = this.clientUrl;
    }
  }
};
</script>
<style>
.exportsBox {
  /* margin-bottom:20px; */
  display: flex;
  flex: 1;
  flex-direction: column;
}
.exportsBox .topImg {
  width: 100%;

}
.exportsBox .container {
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
.exportsBox .container .el-carousel--vertical {
  display: inline-block;
  font-size: 14px;
  margin-left: 14px;
  width: 100%;
  cursor: pointer;
}
.exportsBox .noticeTitle {
  color: #ff9797;
  border: 1px solid #ff9797;
  width: 83px;
  text-align: center;
}
.exportsBox .container .el-carousel__indicators--vertical {
  display: none;
}
.exportsBox .middleBox {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 11px;
}
.exportsBox .banner img {
  height: 100%;
  width: 100%;
}
.exportsBox .itemGame {
  position: relative;
  font-size: 0;
  margin-bottom: 20px;
  padding: 10px;
  background: #fff;
  border-radius: 0.5rem;
  transition: 0.5s;
  border: 1px solid #706244;
}

.exportsBox .itemGame img {
  width: 100%;
  height: 250px;
}
.exportsBox .itemTitle {
  text-align: center;
  font-size: 16px;
  color: #706244;
  transition: 0.5s;
}
.exportsBox .locked {
  background-color: #706244;
  color: #fff;
  font-size: 14px;
  padding: 10px 30px;
  border-radius: 4px;
  transition: 0.5s;
  font-weight: bold;
  cursor: pointer;
}
.exportsBox .itemGame:hover {
  background: #706244;
}
.exportsBox .itemGame:hover .locked {
  background: #fff;
  color: #706244;
}
.exportsBox .itemGame:hover .itemTitle {
  color: #fff;
}
/*弹出框*/
.exportsBox .el-dialog__title,
.exportsBox .el-dialog__headerbtn .el-dialog__close {
  color: #836426;
}
.exportsBox .el-dialog .el-button {
  background: #e6cf68;
  color: #836426;
  width: 30%;
}
.exportsBox .el-form-item {
  border-bottom: 1px solid #eee;
}
.exportsBox .el-input__inner {
  border: 0;
}
.exportsBox .el-form-item__label {
  text-align: left;
}

</style>