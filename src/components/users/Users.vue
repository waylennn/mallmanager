<template>


    <el-card class="box-card">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>导航一</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索 -->
        <div style="margin-top: 30px;margin: 20px">
            <el-input @clear='clearData()' placeholder="请输入内容" clearable v-model="serachData" class="input-with-select">
                <el-button @click='searchData()' slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <!-- 添加用户 -->
            <el-button type="primary" @click="userAddTop()">添加用户</el-button>
        </div>

        <!-- 表格 -->
        <el-table :data="tableData" stripe='' style="width: 100%">
            <el-table-column type="index" label="#">
            </el-table-column>
            <el-table-column prop="username" label="姓名">
            </el-table-column>
            <el-table-column prop="email" label="邮箱">
            </el-table-column>
            <el-table-column prop="mobile" label="电话">
            </el-table-column>
            <el-table-column prop="role_name" label="角色">
            </el-table-column>
            <el-table-column label="日期">
                <template slot-scope='scope'>
                    {{ scope.row.create_time | fmtDate }}
                </template>
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope='scope'>
                    <el-switch v-model="scope.row.mg_state" @change="changeStatus(scope.row)" active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope='scope'>
                    <el-row>
                        <el-button size='mini' plain type="primary" @click="userUpdate(scope.row)" icon="el-icon-edit"
                            circle>
                        </el-button>
                        <el-button size='mini' plain type="success" @click="userPermission(scope.row)"
                            icon="el-icon-check" circle>
                        </el-button>
                        <el-button size='mini' plain type="danger" @click="open(scope.row.id)" icon="el-icon-delete"
                            circle>
                        </el-button>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum"
            :page-sizes="[2, 3, 6, 8]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

        <!-- 添加用户弹出对话框 -->
        <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
            <el-form :model="form">
                <el-form-item label="用户名" label-width="100px">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="密码" label-width="100px">
                    <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="邮箱" label-width="100px">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="手机" label-width="100px">
                    <el-input v-model="form.mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
                <el-button type="primary" @click="userAdd()">确 定</el-button>
            </div>
        </el-dialog>


        <!-- 编辑用户弹出对话框 -->
        <el-dialog title="添加用户" :visible.sync="dialogFormVisibleEdit">
            <el-form :model="form">
                <el-form-item label="用户名" label-width="100px">
                    <el-input disabled v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" label-width="100px">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="手机" label-width="100px">
                    <el-input v-model="form.mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
                <el-button type="primary" @click="userUpdataCommit()">确 定</el-button>
            </div>


        </el-dialog>

        <!-- 角色选项弹出对话框 -->
        <el-dialog title="选择权限" :visible.sync="dialogFormVisibleUser">
            <el-form>
                <el-form-item label="用户名称" label-width="100px">
                    {{ userName }}
                </el-form-item>
                <el-form-item label="选择权限" label-width="100px">
                    <el-select v-model="roleId" placeholder="请选择">
                        <el-option label="请选择" :value="-1"></el-option>
                        <el-option v-for='itme in roleList' :key="itme.id" :label="itme.roleName" :value="itme.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleUser = false">取 消</el-button>
                <el-button type="primary" @click="commintPermissins()">确 定</el-button>
            </div>
        </el-dialog>

    </el-card>
</template>

<script>
    export default {
        data() {
            return {
                serachData: '',
                pagenum: 1,
                pagesize: 2,
                tableData: [
                ],
                total: 0,
                dialogFormVisibleAdd: false,
                dialogFormVisibleEdit: false,
                dialogFormVisibleUser: false,
                //角色权限
                userName: '231',
                userId: -1,
                roleId: -1,
                roleList: [],
                currentRoleId: 1,
                form: {
                    id: '',
                    username: '',
                    password: '',
                    email: '',
                    mobile: '',
                },

            }
        },
        created() {
            this.getDataList()
        },
        methods: {

            async getDataList() {
                const res = await this.$http.get(`users?query=${this.serachData}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
                const status = res.data.meta.status
                if (status === 200) {
                    this.tableData = res.data.data.users
                    this.total = res.data.data.total

                }
            },
            // 搜索
            searchData() {
                console.log("dddddddddd")
                this.getDataList()
            },
            clearData() {
                this.getDataList()
            },
            // 分页相关
            handleSizeChange(val) {
                this.pagenum = 1
                this.pagesize = val
                this.getDataList()
            },
            handleCurrentChange(val) {
                this.pagenum = val
                this.getDataList()
            },
            //添加用户
            userAddTop() {
                this.from = {}
                this.dialogFormVisibleAdd = true

            },
            //提交请求
            async userAdd() {
                this.dialogFormVisibleAdd = false

                const res = await this.$http.post('users', {
                    username: this.form.username,
                    password: this.form.password,
                    email: this.form.email,
                    mobile: this.form.mobile,
                })
                const { meta: { msg, status }, data } = res.data
                console.log(status)
                if (status === 201) {
                    this.$message.success(msg)
                    this.from = {}
                    this.getDataList()
                } else {
                    this.$message.error(msg)
                }

            },
            // 切换状态
            async changeStatus(user) {
                const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
            },
            // 操作相关
            open(userId) {
                this.$confirm('是否删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    console.log(userId)
                    const res = await this.$http.delete(`users/${userId}`)
                    if (res.data.meta.status === 200) {
                        this.pagenum = 1
                        this.getDataList()
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    } else {
                        this.$message({

                            type: 'warning',
                            message: res.data.meta.msg
                        });

                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            //角色选择对话框
            async userPermission(user) {
                const res = await this.$http.get(`users/${user.id}`)
                if (res.data.meta.status === 200) {
                    this.userId = res.data.data.id
                    this.roleId = res.data.data.rid
                    this.dialogFormVisibleUser = true
                    console.log(user.rid)
                    const res2 = await this.$http.get(`roles`)
                    if (res2.data.meta.status === 200) {
                        this.roleList = res2.data.data
                    }
                } else {
                    this.$message.error(res.data.meta.msg)
                }

            },
            //提交角色权限
            async commintPermissins() {
                const res = await this.$http.put(`users/${this.userId}/role`, { 'rid': this.roleId })
                if (res.data.meta.status === 200) {
                    this.$message.success(res.data.meta.msg)
                    this.dialogFormVisibleUser = false
                    this.getDataList()
                }else{
                    this.$message.error(res.data.meta.msg)
                }
            },
            //更新用户
            userUpdate(user) {

                this.form = user
                this.dialogFormVisibleEdit = true
            },
            //更新用户提交

            async userUpdataCommit() {
                const res = await this.$http.put(`users/${this.form.id}`, this.form)
                if (res.data.meta.status == 200) {
                    this.$message.success(res.data.meta.msg)
                    this.getDataList()
                } else {
                    this.$message.error(res.data.meta.msg)
                }
                this.dialogFormVisibleEdit = false

            }
        }

    }
</script>
<style>
    .box-card {
        height: 100%;
        width: 100%;
    }

    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }

    .input-with-select {
        width: 400px;
    }
</style>