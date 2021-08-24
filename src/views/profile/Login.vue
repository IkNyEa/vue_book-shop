<template>
  <div>
    <nav-bar>
      <template v-slot:default>用户登录</template>
    </nav-bar>
  </div>
  <div style="margin-top: 50px">
    <div style="text-align: center;padding-top: 50px">
      <van-image
        width="10rem"
        height="10rem"
        fit="contain"
        src="https://img01.yzcdn.cn/vant/logo.png"
      />
    </div>
    <van-form @submit="onSubmit">
      <van-field
          v-model="email"
          name="邮箱"
          label="邮箱"
          placeholder="邮箱"
          :rules="[{ required: true, message: '请填写邮箱' }]"
      />
      <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <div class="link-login" @click="$router.push({path:'/register'})">没有账号，立即注册</div>
        <van-button round block type="info" color="#42b983" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>

</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import {reactive, toRefs} from "vue";
import { Notify,Toast } from 'vant';
import {login} from "network/user";
import {useRouter} from 'vue-router';
import {useStore} from 'vuex'
export default {
  name: "Login",
  components: {
    NavBar
  },
  setup(){
    const router = useRouter();
    const store = useStore()
    const userinfo = reactive({
      email:'',
      password:''
    })
    const onSubmit = ()=>{
      console.log(userinfo)

      login(userinfo).then(res =>{
          console.log(res);

            Toast.success('登录成功');
            //将token保存到本地Windows.localStorage
            window.localStorage.setItem('token', res.access_token)
            store.commit('setIsLogin', true)
            setTimeout(()=>{
              router.go(-1);

            }, 1000)
            userinfo.email='';
            userinfo.password='';


        })
    }
    return{
      ...toRefs(userinfo),
      onSubmit
    }
  }
}
</script>

<style scoped>
.link-login{
  font-size: 14px;
  margin-bottom: 20px;
  color: #42b983;
  display: inline-block;
  float: left;
}
</style>