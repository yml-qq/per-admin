import service from "../utils/request";

// 获取员工状态
export function GetCtaff() {
  return service.request({
    url: "api/Ctaff",
    method: "post",
  })
}

// 获取需求管理数据
export function GetNeed() {
  return service.request({
    url: "api/Need",
    method: "post",
  })
}

// 获取需求检测数据
export function GetDetectd() {
  return service.request({
    url: "api/Detectd",
    method: "post",
  })
}