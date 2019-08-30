import { get, post } from './http';
export const apiUrl = {
  apiLogin : 'Public/login', //1.登录
  apiRegister:'Public/register', //2.注册-A网
  apiVerAccount:'Public/verifyAccount', //3.找回密码-验证账号
  apiSendVerifyCode:'Public/sendVerifyCode', //5.找回密码-发送验证码
  apiRetrievePassword:'Public/retrievePassword', //4.找回密码-修改新密码
  apiVerifyImg:'verifyImg',//获取验证码
  apiSelfUser:"CurrUser/updateInfo",//跟新用户信息
  apiGetInfo:"CurrUser/info",//获取用户信息
  apiChangePassword:"CurrUser/changePassword",//更改用户密码
  apiChangeFoundPassword:"CurrUser/changeFoundPassword",//更改资金密码
  apiDataDataDictionaries:"Public/dict",//数据字典
  apiTeamData:"Team/teamData",//团队总览
  apiBindPhone:"CurrUser/bindPhone",//绑定手机号
  apiBankAccountAdd:"MoneyOut/bankAccountAdd",//新增银行卡
  apiBankAccountList:"MoneyOut/bankAccountList",//获取银行卡列表
  apiNotice:"Public/notice",//8.公告列表(优惠公告)
  apiGameRecordList:"Game/playRecordList",//55. 游戏-投注记录
  apiTeamLowerLevel:"Team/lowerLevel",//45. 下级管理
  apiMoneyList:"Money/moneyList",//29. 余额日志
  apiMultiple:"Public/multiple",//14. 多接口合并访问 
  apiElectronic:"Public/electronicGamesList",//12. 单线路-电子游戏-列表
  apiDialogs:"Public/dialog",//9. 弹窗公告 
  apiSmsVerifyCode:"Public/smsVerifyCode",//验证手机验证码
  apiOrderList:"Money/orderList",//充值列表
  apiQrcodePaySubmit:"MoneyIn/qrcodePaySubmit",//微信支付宝充值
  apiActivitiesList:"CurrUser/activitiesList",//优惠活动列表
  apiPayments:"MoneyIn/payments",//现有支付方式
  apiBankSubmit:"MoneyIn/bankSubmit",//银行卡提交
  apiThirdPaymentSubmit:"MoneyIn/thirdPaymentSubmit",//全网通支付提交
  apiNotice:"Public/notice",//8. 公告列表(优惠公告) 
  apiGamePlay:"Game/play",//46. 进入游戏 
  apiGameBalances:"Game/balances",//47. 游戏账号-余额 
  apiGameTransferOut:"Game/transferOut",//50. 转出至-单个平台 
  apiAllBack:"Game/allBack",//49 资金归集
  apiBack:"Game/back",//48资金归集转入主账户
  apiBalances:"Game/balances",//47游戏账号余额
  apiWithdrawList:"MoneyOut/withdrawList",//38提现列表
  apiWithdrawPre:"MoneyOut/withdrawPre",//36提现，预提交信息
 apiWithdrawAdd:"MoneyOut/withdrawAdd",//提现新增
 apiTransferOther:"Game/transferOther",//51资金平台互转
 apiLineStatus:"Game/lineStatus",//50. 拉取线路状态
 apiUploadAvator:"CurrUser/uploadAvatar",//27上传头像
 apiUploadBaseAvator:"CurrUser/uploadBase64Avatar",//28base64
 apiRequestRule:"ApiDoc/requestRule",//5. 应用-接口参数规则
 apiActivitiesJoin:"CurrUser/activitiesJoin",//24活动参与
 apiBankList:"Public/bankList", //16Public/bankList银行卡列表
 apiMemberActivitieIndex:"MemberActivitie/index"//55有会活动列表
}
// export const apiLogin = p => post('Public/login', p);



// export const apiSelfUser = p => post('CurrUser/updateInfo', p);



