<template>
  <div>

    <group label-align="left">
      <selector ref="valueMapRef" v-model="valueMapValue" :value-map="['parmenter_code', 'parmenter_name']" title="险种" :options="valueMapList"  @on-change="onChange"></selector>
     <selector ref="valueMapRef2" v-model="valueMapValue2" :value-map="['parmenter_code', 'parmenter_name']" title="索赔项目" :options="valueMapList2" @on-change='category'></selector>
    </group>
    

    <div style="padding:10px;">
      <x-button type="primary" :link='{path:"/GuidanceHome",query:{parmenter_code:code}}'>查看所需材料</x-button>
      <x-button type="primary" :plain=true link="/HomePage">返回首页</x-button>
    </div>
    <div>
        <flow orientation="vertical" style="height:250px;float:left;">
            <flow-state state="1" :title="('报案')" is-done></flow-state>
            <flow-line is-done></flow-line>

            <flow-state state="2" :title="('获取索赔指引')" is-done></flow-state>
            <flow-line  is-done></flow-line>

            <flow-state state="3" :title="('提交材料审核')" is-done></flow-state>
            <flow-line is-done></flow-line>

            <flow-state state="4" :title="('获取赔偿')" is-done></flow-state>
      </flow>
    </div>
  </div>
</template>

<script>

import $fecth from '@/assets/js/fecth.js'
import { Selector, Group, Cell, CellBox, XButton ,Flow, FlowState, FlowLine} from 'vux'
import {local,online} from "@/assets/js/urlpath.js"
export default {
  components: {
    Group,
    Selector,
    Cell,
    CellBox,
    XButton,
     Flow,
    FlowState,
    FlowLine
  },
  created(){
     let _this=this;
     let arr=[];
    $fecth.GET(local+"DataBase.php",{
      code:"insuranceType"
    }).then(function(data){
        var data=JSON.parse(data);
        
        _this.in_data=data;
              for(let i=0;i<data.length;i++){
                  arr.push({parmenter_code:data[i]["parmenter_code"],parmenter_name:data[i]["parmenter_name"]})
                  
              }
              _this.valueMapList=arr;
              _this.valueMapValue=15;
              _this.arraychange(15);

          })
  },
  data () {
    return {
      valueMapValue: '',
      valueMapList: [{
        parmenter_code: '',
        parmenter_name: '',
      }],
      valueMapValue2: '',
      valueMapList2: [],
      in_data:[],
      code:1
    }
  },
  methods: {
      onChange(val){
        this.arraychange(val)
      },
      category(val){
        this.code=val;
        //console.log(val)
      },
      arraychange(val){
       // if(this.in_data.length>0){
            let arrays=this.in_data;
            let arr=[];
            for(let i=0;i<arrays.length;i++){            
                  if(val==arrays[i]["parmenter_code"]){
                      for(let t=0;t<arrays[i]['child'].length;t++){
                        arr.push({parmenter_code:arrays[i]['child'][t]["parmenter_code"],
                        parmenter_name:arrays[i]['child'][t]["parmenter_name"]})
                      }
                  }else{
                    continue;
                  }
            }
            this.valueMapValue2=arr[0].parmenter_code;
            this.valueMapList2=arr;
            //}
      }
  }
}

</script>
<style>

</style>