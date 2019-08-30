
 export default {
    uname(state,uname){
        state.uname = uname;
        try {
            localStorage.uname=uname;
        } catch (e) {}
    },
    userImg(state,userImg){
        state.userImg = userImg;
        try {
            localStorage.userImg=userImg;
        } catch (e) {}
    },
    changeUname(state, urlName) {
        state.urlName = urlName;
    },

    lmodelShow(state, lmodelShow) {
        state.lmodelShow = lmodelShow;
    },

    umodelShow(state, umodelShow) {
        state.umodelShow = umodelShow;
    },

    regRule(state, regRule) {
        state.regRule = regRule;
    },

    token(state,token)
    {
        state.token = token;
        try {
            localStorage.token=token;
        } catch (e) {}
    },
    getRules(state, getRules) {
        state.getRules = getRules;
        try {
            localStorage.getRules=getRules;
        } catch (e) {}
    },

    ref(state,ref){
        state.ref=ref;
    },
    // publicData(state,publicData){
    //     state.publicData = publicData
    // },

    // currUserData(state,currUserData){
    //     state.currUserData = currUserData
    // },
    // moneyData(state,moneyData){
    //     state.moneyData = moneyData
    // },

    // moneyOutData(state,moneyOutData){
    //     state.moneyOutData = moneyOutData
    // },

    // moneyInData(state,moneyInData){
    //     state.moneyInData = moneyInData
    // },

    // teamData(state,teamData){
    //     state.teamData = teamData
    // },

    // gameData(state,gameData){
    //     state.gameData = gameData
    // },

    // testData(state,testData){
    //     state.testData =testData
    // },
    infoData(state,infoData){
        state.infoData =infoData
    },

    dictionariesData(state,dictionariesData){
        state.dictionariesData =dictionariesData
        try {
            localStorage.dictionariesData=dictionariesData;
        } catch (e) {}
    },

    noticeList(state,noticeList){
        state.noticeList =noticeList
    },
    bannerList(state,bannerList){
        state.bannerList =bannerList
    },
    gameList(state,gameList){
        state.gameList =gameList
    },
    lineList(state,lineList){
        state.lineList =lineList
    },
    bankList(state,bankList){
      state.bankList=bankList;
    },
    refreshUser(state,refreshUser){
        state.refreshUser=refreshUser;
    },
    cashsweepData(state,cashsweepData){
        state.cashsweepData=cashsweepData//游戏
    },
    httpUrl(state, httpUrl) {
        state.httpUrl = httpUrl;
    },
    upass(state,upass){
        state.upass=upass;
    },
    active_name(state,active_name){
        state.active_name=active_name;
    }
    // lowerLevel(state,lowerLevel){
    //     state.lowerLevel =lowerLevel
    // },
//     nickname(state,nickname){
//         state.nickname =nickname
//     },
//     realname(state,realname){
//         state.realname =realname
//     }, 
//     utel(state,utel){
//     state.utel =utel
//    },
//    temail(state,temail){
//     state.temail =temail
//    },
//    ubir(state,ubir){
//     state.ubir =ubir
//    }
 

    // 
    
 }
