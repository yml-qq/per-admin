import service from "../utils/request";

//获取左侧列表
export function GetNavList() {
  return service.request({
    url: "/api/NavList",
    method: "post"
  })
}
