<template>
  <div class="send">
    <el-row>
      <el-button
        round
        :class="[isactive == 1 ? 'blue-but' : 'white-but']"
        @click="GetList(1)"
        >待发布&nbsp;10</el-button
      >
      <el-button
        round
        :class="[isactive == 2 ? 'blue-but' : 'white-but']"
        @click="GetList(2)"
        >已发布&nbsp;10</el-button
      >
    </el-row>
    <el-card
      shadow="always"
      class="card-top"
      :body-style="{ padding: '30px 20px 15px 7px' }"
    >
      <el-form
        ref="form"
        class="flex row-between"
        size="small"
        :model="form"
        label-width="100px"
      >
        <el-form-item label="候选人姓名">
          <el-select
            v-model="form.name"
            filterable
            placeholder="请输入候选人姓名"
          >
            <el-option
              v-for="item in OfferList"
              :key="item.Id"
              :label="item.Name"
              :value="item.Id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-select v-model="form.Department" placeholder="请选择所属部门">
            <el-option
              v-for="(item, index) in DepartmentList"
              :label="item"
              :value="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="招聘岗位">
          <el-select v-model="form.region" placeholder="请选择招聘岗位">
            <el-option
              v-for="(item, index) in PostList"
              :label="item"
              :value="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width: 296px" label="确认时间">
          <el-date-picker
            type="date"
            placeholder="请选择确认时间范围"
            v-model="form.date1"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button round type="primary">搜索</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="card-top">
      <el-row class="tab-top flex row-right">
        <el-button round @click="GetToAddOffer">新建offer</el-button>
      </el-row>
      <el-table :data="OfferList" stripe style="width: 100%" default-expand-all>
        <el-table-column prop="Name" label="姓名" align="center" width="110">
        </el-table-column>
        <el-table-column
          prop="Department"
          label="部门"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column prop="Worker" label="岗位" align="center">
        </el-table-column>
        <el-table-column prop="Time" label="报道时间" align="center">
        </el-table-column>
        <el-table-column prop="ConfirmTime" label="确认时间" align="center">
        </el-table-column>
        <el-table-column
          prop="Status"
          :formatter="FormatStatus"
          label="状态"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="LinkHome"
          label="链接"
          width="220"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template scope="scope">
            <el-tooltip
              style=""
              class="item"
              effect="light"
              popper-class="tooltipad"
              :visible-arrow="false"
              content="删除"
              placement="top"
            >
              <el-button
                class="padd-but"
                type="text"
                @click="handleDel(scope.$index, scope.row)"
                ><i class="el-icon-delete"></i
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="tab-pag flex row-right">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="11"
          :total="30"
        >
        </el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { GetOfferList, GetDepartment, GetPostList } from "../api/sendOffer";

export default {
  name: "Send",
  data() {
    return {
      isactive: 1,
      OfferList: [],
      DepartmentList: [],
      PostList: [],
      form: {
        name: "",
        region: "",
        Department: ""
      },
      PageSize: {
        page: 1
      }
    };
  },
  mounted() {
    // 获取offer人员列表
    GetOfferList().then(res => {
      this.OfferList = res.data;
    });
    // 获取部门数据
    GetDepartment().then(res => {
      this.DepartmentList = res.data;
    });
    // 获取岗位
    GetPostList().then(res => {
      this.PostList = res.data;
      console.log(this.PostList);
    });
    window.onresize = () => {
      console.log(window.document.body.clientHeight);
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    // 点击已通过 未通过
    GetList(e) {
      this.isactive = e;
      if (e == 1) {
        GetOfferList().then(res => {
          this.OfferList = res.data;
        });
      } else {
        GetOfferList().then(res => {
          this.OfferList = res.data;
        });
      }
    },
    FormatStatus(row, column) {
      return row.Status == 0 ? "未通过" : row.Status == 1 ? "已通过" : "待通过";
    },
    handleDel: function(index, row) {
      console.log(index);
      console.log(row.Name);
      let name = row.Name;
      this.$confirm(`是否删除候选人：${name}`, "是否删除", {
        type: "warning"
      }).then(() => {
        setTimeout(() => {
          GetOfferList().then(res => {
            this.OfferList = res.data;
          });
        }, 1000);
      });
    },
    GetToAddOffer() {
      this.$router.replace("/AddOffer");
    }
  }
};
</script>

<style lang="scss" scoped>
.send {
  padding: 0 16px;
  .card-top {
    margin-top: 19px;
    box-shadow: none;
    border: none;
  }
  .blue-but {
    padding: 11px 19px;
    background: #127bbf;
    border: 1px solid #127bbf;
    font-size: 16px;
    color: #ffffff;
  }
  .blue-but:hover,
  .blue-but:focus,
  .blue-but:focus {
    color: #ffffff;
  }
  .white-but {
    padding: 11px 19px;
    border: 1px solid #ffffff;
    font-size: 16px;
  }
  .white-but:hover,
  .white-but:focus,
  .white-but:focus {
    background: #ffffff;
    border: 1px solid #ffffff;
    color: #606266;
  }
  .tab-top {
    margin-bottom: 18px;
  }
  .tab-pag {
    margin-top: 18px;
  }
  .padd-but {
    padding: 0;
    .el-icon-delete {
      font-size: 18px;
      color: #e67071;
    }
  }
  .el-table {
    border: 1px solid #e0e0e0;
    border-radius: 9px;
  }
}
</style>
