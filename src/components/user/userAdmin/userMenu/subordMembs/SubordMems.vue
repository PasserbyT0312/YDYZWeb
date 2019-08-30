<template>
  <div class="contentMain">
    <div class="contentMainDIv subMems">
      <el-row class="container">
        <el-row class="payNav">
          <span></span>注册下级会员
        </el-row>
        <el-row class="subordSki">
          <el-col :span="24">*本功能可设下级会员</el-col>
        </el-row>
        <el-row class="subordMems flex-box-center">
          <el-form label-width="100px">
            <el-form-item label="会员类型：" prop="uName" class="subRadio">
              <el-radio v-model="radio" label="1">备选项</el-radio>
              <el-radio v-model="radio" label="2">备选项</el-radio>
            </el-form-item>
            <el-form-item label="登录账号：" prop="uName">
              <el-input name="uName" aria-required placeholder="2-6个字符"></el-input>
            </el-form-item>
            <el-form-item label="登录密码：" prop="uName">
              <el-input name="uName" aria-required placeholder="2-6个字符"></el-input>
            </el-form-item>
            <el-form-item label="总返点：" prop="uName"></el-form-item>
            <el-form-item label="彩票返点：" prop="uName"></el-form-item>
            <el-form-item class="subBtn">
              <el-button type="default">取消</el-button>
              <el-button type="default" @click="submitForm(ruleForm)">提交</el-button>
            </el-form-item>
          </el-form>
        </el-row>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: "1",
       
    };
  }
};
</script>
<style>
.subMems{padding:0;}

.subMems .subordSki {
  color: #ff0000;
  padding: 19px 43px;
}
.subMems .subordMems{padding-right:20px;}
.subMems .subordMems .el-form {
  width: 450px;
 
}

.subMems .subRadio .el-form-item__content{display:block;}
</style>


