import Mock, {Random} from "mockjs"
// 侧边列表数据
Mock.mock("/api/NavList", "post", {
  status: 200,
  message: '请求成功',
  data: [{
    id:2,
    navName: "招聘管理",
    children: [{
      id: 201,
      children: [],
      navName: "人员信息",
      path: "Person"
    },{
      id: 202,
      children: [],
      navName: "招聘审核",
      path: "Review"
    }],
    path: "Recruitment"
  },{
    id:3,
    navName: "员工管理",
    children: [],
    path: "Employee"
  },{
    id:4,
    navName: "系统设置",
    children: [],
    path: "System"
  },{
    id:5,
    navName: "offer",
    children: [{
      id: 501,
      children: [],
      navName: "发送offer",
      path: "Send"
    }],
    path: "Offer"
  }]
})
// 随机返回数组中的一个
const bm = ["人力资源部", "产品部", "财务部", "网评中心", "商务策划中心", "数据审核中心", "服务支撑部", "多媒体", "研发部", "运营部"];
const zw = ["UI设计师", "产品经理", "财务助理", "财务经理", "商务经理", "数据管理员", "客服专员", "前端开发", "php开发", "安卓开发"];
Random.extend({
  dt: function() {
    return this.pick(bm);
  },
  wk: function() {
    return this.pick(zw);
  }
})
let bid = [];
for(let i = 0; i < 10; i++){
  bid.push({
    Id: Mock.Random.increment(1),
    Name: Mock.Random.cname(),
    Department: "@dt()",
    Worker: "@wk()",
    Time: "2020.12.@natural(1, 15)",
    ConfirmTime: "2020.12.@natural(15, 30)",
    Status: Mock.Random.integer(0, 2),
    LinkHome: Mock.Random.email()
  })
}
// 创建表格数据
Mock.mock("api/Candidate","post",{
  status: 200,
  data: bid,
  context: '请求成功'
})
// 部门数据
Mock.mock("api/Department","post",{
  status: 200,
  data: bm,
  context: '请求成功'
})
// 岗位数据
Mock.mock("api/Postarr","post",{
  status: 200,
  data: zw,
  context: '请求成功'
})
// 首页员工人数
Mock.mock("api/Ctaff", "post",{
    AllSum: "1024",
    Official: "23",
    TrialPerson: "89",
    TrialWork: "8",
    Into: "15",
    PackNum: "8",
    QingJia: "7",
    Adjust: "5",
    Out: "8",
    DeviateFrom: "1"
})

// 首页需求管理
let need = [];
for(let i = 0; i < 10; i++) {
  need.push({
    Id: Mock.Random.guid(),
    Name: Mock.Random.cname(),
    Resume: "@natural(5, 30)",
    Order: "@natural(5, 30)"
  })
}
Mock.mock("api/Need", "post",{
  status: 200,
  data: need,
  context: '请求成功'
})

// 首页需求检测
let detectd = [];
for(let i = 0; i < 10; i++) {
  detectd.push({
    Id: Mock.Random.guid(),
    Work: "助理",
    Data: "2020.12.@natural(1, 30)",
    RData: "2020.12.@natural(1, 30)",
    Worker: "@wk()",
    NeedNum: "@natural(5, 10)",
    Resume: "@natural(5, 30)",
    EnterWork: "@natural(5, 10)",
    Confirm: "@natural(5, 10)",
    SuccessRate: "@natural(50, 100)%"
  })
}
Mock.mock("api/Detectd", "post",{
  status: 200,
  data: detectd,
  context: '请求成功'
})
// 生成链接
Mock.mock("api/LinkPath", "post",{
  status: 200,
  data: {
    Id: Mock.Random.increment(1),
    LinkHome: Mock.Random.email()
  },
  context: '请求成功'
})