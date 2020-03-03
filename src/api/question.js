//导入
import request from '@/request/request.js'

//发布题目
export function addquestion(data){
    return request({
        url:"/question/add",
        method:"post",
        data
    })
}

//获取题目信息
export function onequestion(data){
    return request({
        url:"/question/one",
        method:"post",
        data
    })
}
//获取题目状态
export function statusquestion(data){
    return request({
        url:"/question/status",
        method:"post",
        data
    })
}

//删除题目
export function removequestion(data){
    return request({
        url:"/question/remove",
        method:"post",
        data
    })
}
//编辑题目接口
export function editquestion(data){
    return request({
        url:"/question/edit",
        method:"post",
        data
    })
}
//获取题目列表
export function listquestion(params){
    return request({
        url:"/question/list",
        method:"get",
        params
    })
}

//上传文件
export function uploadquestion(data){
    return request({
        url:"/question/upload",
        method:"post",
        data
    })
}