<template>
<div>

    <group label-align="left">
      <selector ref="valueMapRef" v-model="valueMapValue"  :value-map="['parmenter_code', 'parmenter_name']" title="险种" :options="valueMapList"  @on-change="onChange"></selector>
     <selector ref="valueMapRef2" v-model="valueMapValue2" :value-map="['parmenter_code', 'parmenter_name']" title="索赔项目" :options="valueMapList2" @on-change='category'></selector>
    </group>

    <div style="margin-top:15px;" class="GuiHo">
		<dl style="text-align:left;padding:0 10px;text-indent:10px;" v-for="arr in schild">
			<dt style=""  :class="arr.isc?'foldtrue':''"   >

				<span style="">
					<input  style="position:absolute;left:0;top:0;height:100%;width:100%;opacity:0;"
						type="checkbox" 
						:value='{parmenter_code:arr["parmenter_code"],parmenter_name:arr["parmenter_name"]}'  
						@click="Listfold(arr)"
						v-model="attr"	 	 
					 />
					 <em style="float:left;height:100%;width:100%;border-radius:3px;"></em>
				</span>
				{{arr["parmenter_name"]}}
				
			</dt>
			<dd style="">
				<p v-for="val in arr['child']">
					<span v-if="val.is_must==1" style="background:orange;color:#fff;padding:0 3px;border-radius:3px;">可选</span>
					<span  v-if="val.is_must==0" style="background:#c0c0c0;color:#fff;padding:0 3px;border-radius:3px;">必选</span>
					{{val.parmenter_name}}
				</p>
			</dd>
		</dl>
		
	</div>
	<div class="remarks">
   		<p>
      		<icon type="warn" style="font-size:17px;"></icon>
      		本索赔项需要寄送材料原件，请妥善保管并根据指引快递至我司理赔中心
      	</p>
   		<p>
     	 <icon type="warn" style="font-size:17px;"></icon>
      	请确认具体索赔类别，及所需材料是否完整
      </p>
   	</div>
   	<div style="margin:15px;">
   			<x-button type="primary" action-type="button">材料不齐,咨询客服</x-button>
      		<x-button type="warn" @click.native="submit">下一步,填写报案信息</x-button>

   	</div>
    <toast v-model="isorshow" type="cancel" :is-show-mask=true width="8.8em" :time="1000">
        {{('选择不得少于一项')}}
      </toast>
    <toast v-model="showsuccess" 
        type="syccess" 
        :is-show-mask=true 
        width="8.8em"
        @on-hide="subsuccess" 
        :time="1000">
      提交成功
   </toast> 
</div>
</template>
<script>
import $fecth from '@/assets/js/fecth.js'
import { Selector, Group, XButton ,Icon,Toast} from 'vux'
import {local,online} from "@/assets/js/urlpath.js"
export default {
  components: {
    Group,
    Selector,
    XButton,
    Icon,Toast
  },
  created(){
         let _this=this;
     let arr=[];
    $fecth.GET(local+"MaterialGuidance.php",{
      code:"insuranceType"
    }).then(function(data){
        
        var data=JSON.parse(data);
       
        _this.in_data=data;
              for(let i=0;i<data.length;i++){
                  arr.push({parmenter_code:data[i]["parmenter_code"],parmenter_name:data[i]["parmenter_name"]})
                  
              }

              
              //_this.$nextTick(() => {
                  _this.valueMapList=arr;
              _this.valueMapValue=15;
            //  })

          })
    
  },
  mounted(){

  },
  data () {
    return {
      valueMapValue:'',
      valueMapList: [{
        parmenter_code: '15',
        parmenter_name: '旅行险',
      },
      {
        parmenter_code: '17',
        parmenter_name: '意外险',
      }
      ],
      valueMapValue2: '',
      valueMapList2: [],
      in_data:[],
      code:1,
      schild:[],
      attr:[],
      isorshow:false,
      showsuccess:false,
    }
  },
  methods: {
      onChange(val){
            this.attr=[];
             let arrays=this.in_data;
            let arr=[];
            for(let i=0;i<arrays.length;i++){            
                  if(val==arrays[i]["parmenter_code"]){
                      for(let t=0;t<arrays[i]['child'].length;t++){
                        arr.push({parmenter_code:arrays[i]['child'][t]["parmenter_code"],
                        parmenter_name:arrays[i]['child'][t]["parmenter_name"],
                        schild:arrays[i]['child'][t]["child"]});      
                      }
                  }
            }
            this.valueMapValue2=arr[0].parmenter_code;
            this.valueMapList2=arr;
        
      },
      category(code){
        this.attr=[];
         for(let i=0;i<this.valueMapList2.length;i++){
            if(code==this.valueMapList2[i]["parmenter_code"]){
              this.schild=this.valueMapList2[i]["schild"];
            }
          };
      },
      Listfold(arr){ 
       	this.$set(arr, 'isc', !arr.isc)	;
        
		},
    getvalue(){  
           return this.$refs['valueMapRef'].getFullValue()[0];
    },
    getvalue2(){
         return this.$refs['valueMapRef2'].getFullValue()[0];
    },
    submit(){
          if(this.attr.length==0){
              this.isorshow=true;
              return false;
          }
          this.showsuccess=true;
    },
    subsuccess(){
     
     
     let Random=this.$route.query.random;
     let TypeofInsurance=this.getvalue()||this.valueMapList[0];
      let attr=this.attr;
      let Bigcode=[];
      let Bigname=[];
          for(let i=0;i<attr.length;i++){
              Bigcode.push(attr[i].parmenter_code);
              Bigname.push(attr[i].parmenter_name);
          }
          Bigcode=Bigcode.join(",");
          Bigname=Bigname.join(",");
       let jsonCode={
              //TypeofInsurance:TypeofInsurance.parmenter_code,
              //Claimcategory:this.getvalue2().parmenter_code,
              Bigcategory:Bigcode,
              random:Random
      }
      let jsonName={
              TypeofInsurance:TypeofInsurance.parmenter_name,
              Claimcategory:this.getvalue2().parmenter_name,
              Bigcategory:Bigname,
              random:Random
      }
      let _this=this;
      $fecth.GET(local+"MaterialScience.php",jsonName).then(function(data){
              if(data==1){
                _this.$router.push({path:'/Submitareport',query:jsonCode,name:'Submitareport'});
              }else{
                alert("系统错误");
              }
      })
      
    },
  }
}

</script>
<style type="text/css"  lang="scss" scoped>

.remarks{
	padding:10px;
	margin-top:10px;
	text-align:left;
	font-size:14px;
	background:#fff7d6;
}
.GuiHo{
    >dl{
      >dt{
            margin-top:5px;
            border-radius:5px;
            background:rgba(37,168,35,0.8);
            color:#fff;
            line-height:36px;
            height:36px;
            position:relative;
      }
    }

}
.GuiHo{
    >dl{
      >dt.foldtrue{
          border-top-left-radius:5px;
          border-top-right-radius:5px;
          border-bottom-left-radius:0;
          border-bottom-right-radius:0;
          background:#1AAD19;
          position:relative;
      }
    }
	
}
.GuiHo>dl>dt+dd{
	max-height:0;
	overflow:hidden;
	line-height:28px;
	padding:2px 0;
	transition:max-height 0.3s;
}
.GuiHo>dl>dt.foldtrue+dd{
	max-height:500px;
	transition:max-height 0.3s;
}
.GuiHo>dl>dt>span{
	display:inline-block;
	height:16px;
	width:16px;
	vertical-align:-2px;
}
.GuiHo>dl>dt>span>input+em{
	background: #fff;
	background-size:cover;
}
.GuiHo>dl>dt>span>input:checked+em{
	background:#fff url("../assets/img/checked.png") no-repeat center;
	background-size:cover;
}

</style>