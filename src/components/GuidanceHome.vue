<template>
<div style="background:#f5f5f5;">
<div style="margin-top:15px;" class="GuiHo">
	<dl style="text-align:left;padding:0 10px;text-indent:10px;" v-for="arr in result">
		<dt style=""  class="" @click="Listfold">
			{{arr["parmenter_name"]}}
		</dt>
		<dd style="">
			<p v-for="val in arr['child']">
				<span v-if="val.is_must==1" style="background:#c0c0c0;color:#fff;padding:0 3px;border-radius:3px;">可选</span>
				<span  v-if="val.is_must==0" style="background:orange;color:#fff;padding:0 3px;border-radius:3px;">必选</span>
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
<div style="padding:10px;">
      <x-button type="primary" link="BACK">返回</x-button>
  
    </div>

</div>



</template>
<script>
	import $fecth from '@/assets/js/fecth.js'
	import {XButton,Icon} from 'vux'
	import {local,online} from "@/assets/js/urlpath.js"
export default {
	components: {
    	XButton,Icon
  },
	created(){
	let _this=this
	let code=this.$route.query.parmenter_code;

			$fecth.GET(local+"DataBase.php",{code:code})
			.then(data=>{
			
				if(data==0){
				alert("暂无数据")
					return;
				}
				var data=JSON.parse(data);
				_this.result=data;
			})
	},
	methods:{
		Listfold(){
			if(event.currentTarget.className=="foldtrue"){
				event.currentTarget.className="";
			}else{
				event.currentTarget.className="foldtrue";
			}
		}
	},
	data(){
		return{
				result:[],
		}
	}
}

</script>
<style>
.remarks{
	padding:10px;
	margin-top:10px;
	text-align:left;
	font-size:14px;
	background:#fff7d6;
}
.GuiHo>dl>dt{
	margin-top:5px;
	border-radius:5px;
	background:rgba(37,168,35,0.7);
	color:#fff;
	line-height:36px;
}
.GuiHo>dl>dt.foldtrue{
	border-top-left-radius:5px;
	border-top-right-radius:5px;
	border-bottom-left-radius:0;
	border-bottom-right-radius:0;
	background:#2A9F29;
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
</style>