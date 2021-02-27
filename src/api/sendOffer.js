import service from "../utils/request";

// 获取offer列表
export function GetOfferList() {
  return service.request({
    url: "api/Candidate",
    method: "post"
  })
}

// 获取部门
export function GetDepartment() {
  return service.request({
    url: "api/Department",
    method: "post"
  })
}

// 获取岗位
export function GetPostList() {
  return service.request({
    url: "api/Postarr",
    method: "post"
  })
}
