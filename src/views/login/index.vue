<template>
  <div class="hello" :style="back">
    <div class="icon">
      <van-icon name="manager-o"/>
    </div>
    <div class="login" v-if="loginOrSet">
      <van-cell-group>
        <van-field
          disabled
          v-model="username"
          clearable
          label="账号"
          placeholder="请输入管理员账号"
          size="large"
        />

        <van-field
          v-model="password"
          clearable
          type="password"
          label="密码"
          placeholder="请输入管理员密码"
          size="large"
        />
      </van-cell-group>
    </div>
    <div v-else class="firstInit">
      <h3>首次进入请设置密码</h3>
      <input type="password" v-model="firstPass1" placeholder="请输入密码"/>
      <p>请再次确认密码</p>
      <input type="password" v-model="firstPass2" placeholder="请再次输入密码" @blur="gotop()"/>
    </div>
    <van-button type="info" @click="login()" v-if="loginOrSet">登录</van-button>
    <van-button type="info" @click="setPassWord()" v-else>确认密码</van-button>
  </div>
</template>

<script>
  import {setToken} from "../../utils/auth";
  import {Toast} from 'vant';

  export default {
    name: 'login',
    data() {
      return {
        msg: '',
        username: 'admin',
        password: '',
        firstPass1: '',
        firstPass2: '',
        errMsg: '',
        back: {
          backgroundImage: "url(" + require("@/assets/image/back2.jpg") + ")",
          backgroundRepeat: "noRepeat",
          backgroundSize: "cover",
          backgroundPosition: 'center'
        },
        loginOrSet: false
      }
    },
    mounted() {
      this.firstIn()
    },
    methods: {
      login() {
        let strurl = this.$route.query.redUrl ? this.$route.query.redUrl : '/'
        if (this.password === '') {
          Toast({
            duration: 1500,
            message: '请输入密码'
          });
          return
        }
        let data = {
          password: this.password
        }
        this.$http.post('/admin/login', data).then(res => {
          console.log(res,'login')
          if (res.data.code === 0) {
            this.$router.push(strurl)
            setToken({username: this.username, password: this.password})
          } else {
            Toast(res.data.message)
          }
        }).catch(err => {
          console.log(err)
        })

        // this.$router.replace(strurl)
      },
      setPassWord() {
        if (this.firstPass1.length < 6 || this.firstPass2.length < 6) {
          Toast('请设置长度不小于6位的密码')
          return
        }
        if (this.firstPass1 !== this.firstPass2) {
          Toast('两次输入的密码不同')
          return
        }
        let data = {
          password: this.firstPass1
        }
        this.$http.post('/admin/initPassword', data).then(res => {
          if (res.data.code  === 0) {
            Toast({
              duration: 1500,
              message: '设置密码成功,请登录'
            });
            this.loginOrSet = true
          } else Toast({duration: 1500, message: res.data.message});
        }).catch(err => {
          console.log(err)
        })
      },
      firstIn() {
        this.$http.get('/admin/checkInitialized').then(res => {
          console.log(res)
          if (res.data.code === 0) {
            this.loginOrSet = res.data.data.initialized
          } else Toast({duration: 1500, message: res.data.message})
        }).catch(err => {
          // alert(JSON.stringify(err))
          console.log(err)
        })
      },
      gotop(){
        window.scrollTo(0,0)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .hello {
    min-height: 100%;
    background-color: aqua;
    padding-top: 25%;

    .firstInit {
      opacity: 0.8;
      color: #ffffff;
      text-align: center;

      h3, p {
        font-size: 0.36rem;
        line-height: 0.8rem;
        margin-bottom: 0.3rem;
      }

      p {
        margin: 0.3rem 0rem;
      }

      input {
        border: 1px solid #ffffff;
        line-height: 0.6rem;
        height: 0.6rem;
        width: 70%;
        text-indent: 1em;
        color: #333;
      }
    }

    .icon {
      color: #ffffff;
      font-size: 1rem;
      text-align: center;
      margin-bottom: 0.4rem;
    }

    .login {
      padding: 0 0.3rem;
      opacity: 0.8;
    }

    .van-button--normal {
      display: block;
      width: 95%;
      margin: 0 auto;
      margin-top: 1.5rem;
      text-align: center;
    }
  }
</style>
