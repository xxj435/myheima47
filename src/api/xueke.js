//导入请求头
import request from '@/request/request.js'
  //封装一个学科列表的接口
  export function xuekelist(params){
    //   console.log(data)
    return request({
        url:'/subject/list',
        params,
        method:'get'
    })
  }

  //修改学科状态
  export function xuekexiu(data){
      return request({
          url:'/subject/status',
          method:'post',
          data
      })
  }

  //新增学科
  export function xuekeadd(data){
    return request({
      url:'/subject/add',
      method:'post',
      data
    })
  }

  //编辑学科
  export function xuekeEdit(data){
    return request({
      url:'/subject/edit',
      method:"post",
      data
    })
  }

  //删除学科接口
  export function xuekeDelete(data){
    return request({
      url:'/subject/remove',
      method:"post",
      data
    })
  }