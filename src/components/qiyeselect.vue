<template>
  <el-select v-model="enterprise" placeholder="请选择企业" @change="selchange">
      <el-option v-for="(item,index) in qiyelist" :key="index" :label="item.name" :value="item.id"></el-option>
    </el-select>
</template>

<script>
import {qiyelist} from '@/api/qiye.js'
export default {
    //父传子
    props:{
        value:{
            default:''
        }
    },
data() {
    return {
        enterprise:this.value,
        qiyelist:[]
    }
},
methods: {
    selchange(val){
    this.$emit('input',val)
    }
},
created() {
      //获取企业数据
  qiyelist({
    status:1
  }).then(res=>{
    // console.log(res)
    this.qiyelist=res.data.data.items
  })
},
}
</script>

<style>

</style>