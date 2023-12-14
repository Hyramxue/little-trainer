import request from "@/utils/request";

//  上传图片
export function uploadImg(data) {
  return request({
    url: "/common/upload/uploadImg",
    method: "post",
    data: data,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    isNotAuth: true,
  });
}
