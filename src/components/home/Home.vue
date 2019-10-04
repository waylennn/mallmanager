<template>
    <el-container class='home-content'>
        <el-header class='home-header'>
            <el-row>
                <el-col :span="4"><img src="../../../static/logo.png" alt=""></el-col>
                <el-col :span="17">
                    <h1 class="title">后台管理系统</h1>
                </el-col>
                <el-col :span="3"><a @click.prevent="exitUser" class="label" href="#">退出</a></el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside class='home-left' width="200px">
                <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                    unique-opened='' router='' background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>导航一</span>
                        </template>
                        <el-menu-item index="users">
                            <i class="el-icon-location"></i>
                            <span> 用户列表</span>
                        </el-menu-item>
                        <el-menu-item index="1-4">
                            <i class="el-icon-location"></i>
                            <span> 选项4</span>
                        </el-menu-item>

                    </el-submenu>


                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>导航一</span>
                        </template>
                        <el-menu-item index="2-3">
                            <i class="el-icon-location"></i>
                            <span> 选项3</span>
                        </el-menu-item>
                    </el-submenu>

                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>导航一</span>
                        </template>
                        <el-menu-item index="3-3">
                            <i class="el-icon-location"></i>
                            <span> 选项3</span>
                        </el-menu-item>
                    </el-submenu>

                </el-menu>


            </el-aside>
            <el-main class='home-right'>
            <router-view />
                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        data() {
            return {

            }
        },

        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            exitUser() {
                localStorage.clear()
                this.$message.success("退出成功")
                this.$router.push({"name":"login"})
            }
        },

        beforeCreate() {
            const token = localStorage.getItem('token')
            if (!token) {
                this.$message.warning('重新登陆')
                this.$router.push({ "name": "login" })
            }
        }
    }
</script>

<style>
    .home-content {
        height: 2000px;
    }

    .home-header {
        background-color: slategray;
    }

    .home-left {
        background-color: #545c64;
    }

    .home-right {
        background-color: #e9eef3;
        height: 100%;
    }

    .title {
        margin: 0;
        line-height: 60px;
        color: #fff;
        text-align: center;
    }

    .label {
        line-height: 60px;
        text-decoration: none;
    }
</style>