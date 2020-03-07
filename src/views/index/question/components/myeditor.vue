<template>
    <div>
        <div class="toolbar" ref="toolbar"></div>
        <div class="content" ref="content"></div>
    </div>
</template>
<script>
//导入wangeditor
import wangEditor from 'wangeditor'
export default {
    props:{
        value:{
            type:String,
            default:""
        }
    },
    mounted() {
            let editor =new wangEditor(this.$refs.toolbar,this.$refs.content);
            //监听富文本事件
            editor.customConfig.onchange=(html)=>{
                this.$emit('input',html)
            }
            editor.create()
    },
}
</script>
<style>
    .toolbar{
        border: 1px solid #ccc;
    }
    .content{
        border: 1px solid #ccc;
        height: 50px;
    }
</style>