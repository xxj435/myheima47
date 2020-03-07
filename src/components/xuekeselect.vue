<template>
  <el-select v-model="subject" placeholder="请选择学科" @change="selchange">
      <el-option v-for="(item,index) in xuekelist" :key="index" :label="item.name" :value="item.id"></el-option>
    </el-select>
</template>

<script>
import {xuekelist} from '@/api/xueke.js'
export default {
    //要实现v-model,要有父传子,并且props要叫value
    props:{
        value:{
            default:''
        }
    },
    data() {
        return {
            subject:this.value,
            xuekelist:[]
        }
    },
    methods:{
selchange(){
    //在这里给父组件传值,用input直接传给v-model中
    this.$emit('input',this.subject)
}
    },
    created() {
        //获取学科数据
  xuekelist({
    status:1
  }).then(res=>{
    // console.log(res)
    this.xuekelist=res.data.data.items
  })
    },
}
</script>

<style>

</style>