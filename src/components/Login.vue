<template>
<!--    <div>-->
<!--        用户名:<input type="text" v-model="loginForm.username" placeholder="请输入用户名"/>-->
<!--        <br><br>-->
<!--        密码： <input type="password" v-model="loginForm.password" placeholder="请输入密码"/>-->
<!--        <br><br>-->
<!--        <button v-on:click="login">登录</button>-->
<!--    </div>-->
<div class="loginbody">
    <div  class="login">
        <!--flex弹性盒子模型，justify-content：主抽 -->
        <div align="center"  class="inner">
            <el-card style="width: 400px">
                    <h2>系统登录</h2>
                <table>
                    <tr>
                        <td>
                            <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" @keydown.enter.native="login"></el-input>
                            <!-- @keydown.enter.native="doLogin"当按下enter键的时候也会执行doLogin方法-->
                        </td>
                    </tr>
                    <tr>
                        <!-- 占两行-->
                        <td colspan="2">
                            <!-- 点击事件的两种不同的写法v-on:click和 @click-->
                            <!--<el-button style="width: 300px" type="primary" v-on:click="doLogin">登录</el-button>-->
                            <el-button style="width: 300px" type="primary" @click="login">登录</el-button>
                        </td>
                    </tr>

                </table>
                <tr>
                    <!-- 占两行-->
                    <td colspan="2">
                        <!-- 点击事件的两种不同的写法v-on:click和 @click-->
                        <!--<el-button style="width: 300px" type="primary" v-on:click="doLogin">登录</el-button>-->
                        <h4 style="width: 300px"  @click="register">没有用户？<el-button @click="register" class="el-button--primary">注册</el-button></h4>
                    </td>
                </tr>
            </el-card>
        </div>
    </div>
</div>
</template>

<script>

    export default {
        name: 'Login',
        data () {
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                responseResult: []
            }
        },
        methods: {
            login () {
                var _this = this
                console.log(this.$store.state)
                this.$axios
                    .post('/login', {
                        username: this.loginForm.username,
                        password: this.loginForm.password
                    })
                    .then(successResponse => {
                        if (successResponse.data.code === 200) {
                            // var data = this.loginForm
                            _this.$store.commit('login', _this.loginForm)
                            var path = this.$route.query.redirect
                            this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
                        }
                    })
                    // eslint-disable-next-line no-unused-vars
                    .catch(failResponse => {
                    })
            },
            register(){
                var _this = this
                _this.$router.replace('/register')
            }
        }
    }
</script>
<style scoped>

.loginbody {
        overflow: scroll;
        overflow-y: hidden;
        overflow-x: hidden;
    }


.login {
    width: 100vw;
    padding: 0;
    margin: 0;
    height: 100vh;
    font-size: 16px;
    background-position: left top;
    background-color: #242645;
    color: #fff;
    font-family: "Source Sans Pro";
    position: relative;
    background-image: url('../assets/bkg.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.inner{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 50vw;
    height: 50vh;
}

.login_title {
    text-align: center;
    color: #505458;
}
</style>