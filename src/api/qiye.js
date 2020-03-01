//导入请求头
import request from '@/request/request.js'

//请求企业列表
export function qiyelist(params){
    return request({
        url:'/enterprise/list',
        method:"get",
        params
    })
}

//新增企业请求
export function qiyeadd(data){
    return request({
        url:'/enterprise/add',
        method:'post',
        data
    })
}

//编辑企业请求
export function bianjiqiye(data){
    return request({
        url:'/enterprise/edit',
        method:"post",
        data
    })
}

// 删除企业请求
export function qiyedel(data){
    return request({
        url:'/enterprise/remove',
        method:"post",
        data
    })
}


//状态修改
export function qiyezt(data){
    return request({
        url:'/enterprise/status',
        method:"post",
        data
    })
}