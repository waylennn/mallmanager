<template>
    <div class="login-wrap">
        <el-form class="login-from" label-position="top" label-width="80px" :model="formData">
            <h2>用户登录</h2>
            <el-form-item label="用户名">
                <el-input v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formData.password"></el-input>
            </el-form-item>
            <el-button @click='handleLogin' class="login-btn" type="primary">登录</el-button>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                formData: {
                    username: '',
                    password: '',
                }
            }
        },
        methods: {
            //登录请求
            async handleLogin() {
                const res = await this.$http.post('login', this.formData)
                const { data, meta: { status, msg } } = res.data
                if (status == 200) {
                    this.$message({
                        message: msg,
                        type: 'success'
                    });
                    localStorage.setItem("token", data.token)
                    this.$router.push({ 'name': 'home' })
                } else {
                    this.$message.error(msg);
                }
            }
        }
    }
</script>


<style>
    .login-wrap {
        height: 100%;
        background-color: #324152;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .login-wrap .login-from {
        width: 400px;
        background-color: #fff;
        border-radius: 5px;
        padding: 50px;
    }

    .login-wrap .login-btn {
        width: 100%;
    }
</style>