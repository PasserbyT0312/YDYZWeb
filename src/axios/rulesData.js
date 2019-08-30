
import store from "../store/index";
const getRulesData = store.state.getRules;
if (getRulesData.length > 20) {
     const getRulesDatas = JSON.parse(getRulesData);
     const getPublic = getRulesDatas.Public;//验证  public
     const getCurrUser = getRulesDatas.CurrUser//验证 currUser
     const getMoney = getRulesDatas.Money;//验证  money
     const getMoneyOut = getRulesDatas.MoneyOut//验证 moneyOut
     const getMoneyIn = getRulesDatas.MoneyIn;//验证  moneyIn
     const getTeam = getRulesDatas.Team//验证 team
     const getGame = getRulesDatas.Game//验证 game
     const getTest = getRulesDatas.Test//验证 test

     // store.commit("publicData", getPublic);
     // store.commit("currUserData", getCurrUser);
     // store.commit("moneyData", getMoney);
     // store.commit("moneyOutData", getMoneyOut);
     // store.commit("moneyInData", getMoneyIn);
     // store.commit("teamData", getTeam);
     // store.commit("gameData", getGame);
     // store.commit("testData", getTest);
}



const getReg = function (obj) {
     var index = obj.lastIndexOf(":");
     obj = obj.substring(index + 1, obj.length)
     // .split("/").join("");
     var aaa = eval(obj)
     return aaa;
}
export default {
     getReg
}