

let getRules1 = {};
let toten1="";
let uname1="游客";
let userImg="";

// let defaultScreenWidth=""
try {
    if (localStorage.getRules) {
        getRules1 = localStorage.getRules
    }
} catch (e) {

}
try {
    if (localStorage.toten) {
        toten1 = localStorage.toten
    }
} catch (e) {

}
try {
    if (localStorage.uname) {
        uname1 = localStorage.uname
    }
} catch (e) {

}
try {
    if (localStorage.userImg) {
        userImg = localStorage.userImg
    }
 
} catch (e) {

}

export default {
    uname:uname1,
    userImg:userImg,
    isLogin:false,
    urlName: "我的账户",
    lmodelShow: false,
    umodelShow: false,
    userImg: "",
    token: toten1,
    regRule:{},
    dict: {},
    getRules:getRules1,
    publicData:"",//验证数据
    // currUserData:"",
    // moneyData:"",
    // moneyOutData:"",
    // moneyInData:"",
    // teamData:"",
    // gameData:"",
    // testData:"",
    isLogin:false,
    refreshUser:false,
    //个人信息
    infoData:"",//个人基本信息
    dictionariesData:{},//数据字典

    noticeList:{},//公告列表
    bannerList:{},//轮播图列表
    gameList:{},//游戏列表
    lineList:{},//单线路游戏列表
    bankList:[],
    cashsweepData:[],
    httpUrl:'',
    upass:false,
    ref:false,
    active_name:false
    // lowerLevel:{}//下级管理

}