import service from "../utils/request";

// 获取部门数据
export function GetDepartment() {
  return service.request({
    url: "api/Department",
    method: "post"
  })
}

// 获取岗位数据
export function GetPostList() {
  return service.request({
    url: "api/Postarr",
    method: "post"
  })
}

// 获取生成的链接
export function GetLinkPath() {
  return service.request({
    url: "api/LinkPath",
    method: "post"
  })
}