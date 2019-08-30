<template>
  <!-- 电子游艺 -->
  <div class="gamesBox">
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
      <el-row class="tabTitle">
        <span class="font-bold">全部平台：</span>
        <span
          v-for="(itemLine,index) in lineList"
          :key="itemLine.game_type_id"
          class="gameTitle"
          :class="cur==index?'active':''"
          @click="chooseType(itemLine.game_type_id,index)"
        >{{itemLine.type_name}}</span>
      </el-row>
      <div class="gameComment">
        <el-row class="middleBox" type="flex" justify="space-between">
          <el-col :span="6" class="itemGame" v-for="game in itemList.child" :key="game.id">
            <img :src="game.img_pc" alt class="itemImg" />
            <div class="itemTitle" @click="intoGame(game)">{{game.zh_name}}</div>
          </el-col>
        </el-row>
      </div>
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
      cur: 0,
      list: [],
      lineList: [],
      itemList: [],
      change: false,
      gameTypeId: "",
      clientUrl: "",
      dialogFormVisible: false,
      formLabelWidth: "140px",
      gameBalance: "",
      accountBalance: "",
      transferNum: "",
      gameData: "",
      gameName: "",
      gameLineId: "",
      gameItemId: ""
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
          this.gameLineId = this.gameList[i].child[0].game_line_id;
          this.getGeme();
        }
      }
    }
  },
  methods: {
    getGeme(types) {
      var that = this;
      var params = {
        game_line_id: this.gameLineId
      };
      if (that.gameTypeId) {
        params.game_type_id = that.gameTypeId;
      }
      this.post(this.apiUrl.apiElectronic, params).then(response => {
        if (response.code == 0) {
          if (!that.change) {
            this.lineList = response.data;
          }
          types = types ? types : 0;
          this.itemList = response.data[types];
        } else {
          this.lineList = [];
          this.itemList = [];
        }
      });
    },
    chooseType(gid, index) {
      this.change = true;
      this.cur = index;
      this.gameTypeId = gid;
      this.getGeme(index);
    },
    noticeDetail() {
      this.$store.commit("umodelShow", true);
      this.$router.push({
        path: "/webNotice"
      });
    },
    intoGame(item) {
      // console.log(item);
      this.gameLineId = item.game_line_id;
      this.gameItemId = item.game_id;
      if (localStorage.getItem("token")) {
        this.post(this.apiUrl.apiGamePlay, {
          line_id: this.gameLineId,
          device: 1,
          game_id: this.gameItemId
        }).then(res => {
          if (res.code == 0) {
            this.clientUrl = res.data.client_url;
            this.getGameBalance();
          }
        });
      } else {
        this.$confirm("您还没有登录,无法进入游戏，前往登录账号", "提示", {})
          .then(() => {
            this.$store.commit("umodelShow", false);
            this.$store.commit("lmodelShow", true);
          })
          .catch(() => {});
      }
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
.gamesBox {
  /* margin-bottom:20px; */
  display: flex;
  flex: 1;
  flex-direction: column;
}
.gamesBox .topImg {
  width: 100%;
  
}
.gamesBox .container {
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
.gamesBox .container .el-carousel--vertical {
  display: inline-block;
  font-size: 14px;
  margin-left: 14px;
  width: 100%;
  cursor: pointer;
}
.gamesBox .noticeTitle {
  color: #ff9797;
  border: 1px solid #ff9797;
  width: 83px;
  text-align: center;
}
.gamesBox .container .el-carousel__indicators--vertical {
  display: none;
}
.gamesBox .middleBox {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 11px;
}
.gamesBox .banner img {
  height: 100%;
  width: 100%;
}
.gamesBox .itemGame {
  position: relative;
  font-size: 0;
  margin-bottom: 10px;
  height: 210px;
  cursor: pointer;
  padding-right: 15px;
}
.gamesBox .itemGame:nth-of-type(4n) {
  padding-right: 0;
}
.gamesBox .itemGame::before {
  content: "";
  position: absolute;
  height: 100%;
  right: 15px;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  transition: 0.4s;
  border-radius: 0.25rem;
}
.gamesBox .itemGame img {
  width: 100%;
  height: 100%;
  border-radius: 0.25rem;
}
.gamesBox .itemTitle {
  position: absolute;
  left: 50%;
  top: 50%;
  text-align: center;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-size: 18px;
  color: #fff;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  width: 100%;
  height: 210px;
  line-height: 210px;
}
.gamesBox .itemGame:hover:before {
  background: rgba(0, 0, 0, 0.6);
}
.gamesBox .itemGame:hover .itemTitle {
  color: #e6cf68;
}
.gamesBox .tabTitle {
  font-size: 16px;
  margin-top: 10px;
  color:#fff;
}
.gamesBox .gameTitle {
  padding: 3px 13px;
  margin-right: 10px;
  border-radius: 6px;
  height: 28px;
  line-height: 28px;
  cursor: pointer;
}
.gamesBox .gameTitle:hover {
  background: #6c6c57;
  color: #fff;
}
.gamesBox .gameTitle.active {
  background: #6c6c57;
  color: #e6cf68;
}
.gamesBox .gameComment {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #6c6c57;
}
/*弹出框*/
.gamesBox .el-dialog__title,
.gamesBox .el-dialog__headerbtn .el-dialog__close {
  color: #836426;
}
.gamesBox .el-dialog .el-button {
  background: #e6cf68;
  color: #836426;
  width: 30%;
}
.gamesBox .el-form-item {
  border-bottom: 1px solid #eee;
}
.gamesBox .el-input__inner {
  border: 0;
}
.gamesBox .el-form-item__label {
  text-align: left;
}
</style>