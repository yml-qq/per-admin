<template>
  <div class="addoffer">
    <el-breadcrumb>
      <el-breadcrumb-item>当前位置：Offer管理</el-breadcrumb-item>
      <el-breadcrumb-item class="topath" :to="{ path: '/Send' }">发送Offer</el-breadcrumb-item>
      <el-breadcrumb-item>新建Offer</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="never" class="addtel">
      <div class="flex row-between">
        <span class="let-title">Offer模板配置</span>
        <div>
          <span class="txt-but">保存</span>
          <span class="txt-but" @click="GenerateOffer">生成链接</span>
          <el-button size="small" type="success" round @click="GetBack">取消</el-button>
        </div>
      </div>
      <el-divider></el-divider>
      <el-row type="flex" class="tel-cont" justify="space-around">
        <el-col :span="6">
          <div class="item-title font-15">填充区</div>
          <el-form ref="form" :model="form" :rules="rules" :show-message="false" label-width="80px" size="medium">
            <el-form-item label="姓名" label-width="100px" prop="name">
              <el-input v-model="form.name" placeholder="请输入录用人姓名"></el-input>
            </el-form-item>
            <el-form-item label="部门" label-width="100px" prop="department">
              <el-select v-model="form.department" placeholder="请选择入职部门">
                <el-option v-for="(item, index) in DepartmentList"
                           :label="item"
                           :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="岗位" label-width="100px" prop="worker">
              <el-select v-model="form.worker" placeholder="请选择入职岗位">
                <el-option
                    v-for="(item, index) in PostList"
                    :label="item"
                    :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="试用期/月" label-width="100px" prop="tryMoney">
              <el-input type="" v-model.number="form.tryMoney" placeholder="请输入试用期薪资"></el-input>
            </el-form-item>
            <el-form-item label="转正/月" label-width="100px" prop="formalMoney">
              <el-input type="" v-model.number="form.formalMoney" placeholder="请输入转正薪资"></el-input>
            </el-form-item>
            <el-form-item label="试用期/月" label-width="100px" prop="tryDate">
              <el-select v-model="form.tryDate" placeholder="请选择试用期">
                <el-option label="2个月" value="2"></el-option>
                <el-option label="3个月" value="3"></el-option>
                <el-option label="4个月" value="4"></el-option>
                <el-option label="5个月" value="5"></el-option>
                <el-option label="6个月" value="6"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工资卡" label-width="100px" prop="cardType">
              <el-select v-model="form.cardType" size="medium" placeholder="请选择银行卡">
                <el-option label="中国农业银行" value="中国农业银行"></el-option>
                <el-option label="中国建设银行" value="中国建设银行"></el-option>
                <el-option label="中国工商银行" value="中国工商银行"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="入职日期" label-width="100px" prop="starTime">
              <el-date-picker
                  class="wall-width"
                  v-model="form.starTime"
                  type="date"
                  placeholder="请选择入职日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="确定日期" label-width="100px" prop="confirmTime">
              <el-date-picker
                  class="wall-width"
                  v-model="form.confirmTime"
                  type="date"
                  placeholder="请选择确定入职日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="HR联系人" label-width="100px" prop="HRName">
              <el-select v-model="form.HRName" placeholder="请选择HR联系人">
                <el-option label="星醒醒" value="星醒醒"></el-option>
                <el-option label="星星" value="星星"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="HR联系方式" label-width="100px" prop="HrContact">
              <el-input v-model="form.HrContact" placeholder="请输入HR联系方式"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="7" style="padding: 0 17px">
          <div class="item-title font-15">填充区</div>
          <div class="flex flex-nowrap col-top">
            <div class="wall-width tel-offer rela">
              <img class="music-icon abso" src="../assets/img/music.png" height="25" width="25"/>
              <h2 class="text-center">录用通知书</h2>
              <div class="flex">
                <h3>{{form.name}}</h3>
                <p>女士/先生</p>
              </div>
              <div class="flex m-top-16">
                <p class="m-left-32">您所入职的部门是</p>
                <p class="m-left-6 p-color font-15">{{form.department}}</p>
              </div>
              <div class="flex col-bottom">
                <p class="m-left-32 m-top-12">您所入职的岗位是</p>
                <p class="m-left-6 m-top-12 p-color font-15">{{form.worker}}</p>
              </div>
              <div class="flex m-top-20">
                <p class="m-left-32">薪资：</p>
                <p class="m-left-6">试用期</p>
                <p class="m-left-6 p-color font-15">{{form.tryMoney}}</p>
                <p class="m-left-6">/月（人民币）</p>
              </div>
              <div class="flex m-top-12">
                <p class="m-left-94">转正</p>
                <p class="m-left-6 p-color font-15">{{form.formalMoney}}</p>
                <p class="m-left-6">/月（人民币）</p>
              </div>
              <div class="flex m-top-12">
                <p class="m-left-80">试用期</p>
                <p class="m-left-6 p-color font-15">{{form.tryDate}}</p>
                <p class="m-left-6">个月</p>
              </div>
              <img class="map" src="../assets/img/map_02.png" />
              <div class="flex row-center m-top-20">
                <el-button round class="transparent-but">拒绝</el-button>
                <el-button round type="primary" class="m-left-32">接受</el-button>
              </div>
            </div>
            <div>
              <div class="flex flex-nowrap offer-right-item text-center">更换音乐</div>
              <div class="flex flex-nowrap offer-right-item text-center" style="background: #F7C3C5">删除音乐</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="item-title font-15">Offer模板</div>
          <div class="wall-width flex flex-wrap row-between">
            <div class="item-template">
              <div class="top relative">
                <div class="el-icon-close absolute"></div>
              </div>
              <h4 class="text-center">模板名称一</h4>
            </div>
            <div class="item-template">
              <div class="top relative">
                <div class="el-icon-close absolute"></div>
              </div>
              <h4 class="text-center">模板名称二</h4>
            </div>
            <div class="item-template">
              <div class="top relative">
                <div class="el-icon-close absolute"></div>
              </div>
              <h4 class="text-center">模板名称三</h4>
            </div>
            <div class="item-template">
              <div class="top relative">
                <div class="el-icon-close absolute"></div>
              </div>
              <h4 class="text-center">模板名称四</h4>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import { GetDepartment, GetPostList, GetLinkPath } from "../api/addOffer";

  export default {
    name: "AddOffer",
    data() {
      return {
        DepartmentList: [],
        PostList: [],
        form: {
          name: '',
          department: '',
          worker: '',
          tryMoney: '',
          formalMoney: '',
          tryDate: '',
          cardType: '',
          starTime: '',
          confirmTime: '',
          HRName: '',
          HrContact: ''
        },
        rules: {
          name: [{ required: true, message: '请输入录用人姓名', trigger: 'blur' }],
          department: [{ required: true, message: '请选择入职部门', trigger: 'blur' }],
          worker: [{ required: true, message: '请选择入职岗位', trigger: 'blur' }],
          tryMoney: [{ required: true, message: '请输入试用期薪资', trigger: 'blur' },
            { type: 'number', message: '金额必须为数字值'}],
          formalMoney: [{ required: true, message: '请输入转正薪资', trigger: 'blur' },
            { type: 'number', message: '金额必须为数字值'}],
          tryDate: [{ required: true, message: '请选择试用期', trigger: 'blur' }],
          cardType: [{ required: true, message: '请选择银行卡', trigger: 'blur' }],
          starTime: [{ required: true, message: '请选择入职日期', trigger: 'blur' }],
          confirmTime: [{ required: true, message: '请选择确定入职日期', trigger: 'blur' }],
          HRName: [{ required: true, message: '请选择HR联系人', trigger: 'blur' }],
          HrContact: [{ required: true, message: '请输入HR联系方式', trigger: 'blur' }]
        }
      }
    },
    mounted() {
      // 获取部门
      GetDepartment().then(res=> {
        this.DepartmentList = res.data;
      })
      // 获取岗位
      GetPostList().then(res=> {
        this.PostList = res.data;
      })
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      // 点击生成链接
      GenerateOffer() {
        this.$refs.form.validate(valid=> {
          console.log(valid)
          if(!valid) return;
          GetLinkPath().then(res=> {
            let link = res.data.LinkHome;
            this.$alert(`Offer链接：${link}`, 'Offer链接',  {
              showCancelButton: true,
              confirmButtonText: '复制',
              cancelButtonText: '取消',
              callback: action => {
                if(action) {
                  let oInput = document.createElement('input');
                  oInput.value = link;
                  document.body.appendChild(oInput);
                  oInput.select();
                  document.execCommand("Copy");
                  this.$message({
                    type: 'success',
                    message: `复制成功`
                  })
                }
              }
            })
          })
        })
      },
      // 点击返回跳转路由
      GetBack() {
        this.$router.replace('/Send')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .addoffer {
    .el-card {
      border: none;
    }
    padding: 0 16px;
    .el-breadcrumb {
      margin-bottom: 20px;
    }
    .el-divider {
      margin: 12px 0 38px 0;
    }
    .let-title {
      font-size: 18px;
      font-weight: 600;
    }
    .txt-but {
      font-size: $n-font-16;
      font-weight: 500;
      margin-right: 30px;
      cursor: pointer;
      user-select: none;
    }
    .tel-cont {
      margin: 0 36px 60px 0;
    }
    .item-title {
      font-weight: 600;
      border-left: 6px solid #0078C1;
      padding-left: 13px;
      margin-bottom: 30px;
    }
    .el-form-item {
      margin-bottom: 15px;
    }
    .el-select {
      width: 100%;
    }
    .music-icon {
      top: 20px;
      right: 21px;
      cursor: pointer;
    }
    .tel-offer {
      padding: 26px 18px 30px 18px;
      background: #0F193C;
      h2 {
        color: $n-bg-color;
        font-size: 22px;
        margin-bottom: 30px;
      }
      h3 {
        color: #1EB9E3;
        font-size: 18px;
        margin: 0 9px 4px 13px;
      }
      p {
        color: #d4d4d4;
      }
      .m-left-32 {
        margin-left: 32px;
      }
      .m-left-6 {
        margin-left: 6px;
      }
      .m-left-94 {
        margin-left: 94px;
      }
      .m-left-80 {
        margin-left: 80px;
      }
      .m-top-12 {
        margin-top: 12px;
      }
      .m-top-16 {
        margin-top: 16px;
      }
      .m-top-20 {
        margin-top: 20px;
      }
      .p-color {
        color: #1EB9E3;
      }
      .map {
        width: 100%;
        height: 185px;
        margin-top: 39px;
      }
      .transparent-but {
        background: transparent;
        border: 1px solid #d4d4d4;
        color: #d4d4d4;
      }
      .transparent-but:hover,
      .transparent-but:focus,
      .transparent-but:focus {
        background: transparent;
        border: 1px solid #ffffff;
        color: #ffffff;
      }
    }
    .offer-right-item {
      width: 24px;
      background: #C3E9DA;
      padding: 5px 0;
      font-weight: 500;
      margin-bottom: 8px;
      cursor: pointer;
    }
    .item-template {
      width: 162px;
      margin-bottom: 29px;

      .top {
        width: 100%;
        height: 233px;
        background: #127BBF;

        .el-icon-close {
          background: #1A5982;
          border-radius: 50%;
          color: #ffffff;
          font-size: 15px;
          padding: 4px;
          top: 8px;
          right: 9px;
          cursor: pointer;
        }
      }
      h4 {
        margin-top: 12px;
      }
    }
  }
</style>