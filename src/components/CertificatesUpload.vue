<template>
<div>
	<p v-for="rr in imgloaded">{{rr}}</p>
	<dl v-for="obj in Smallclass" class="loaditem">
		<dt>
			<span v-if="obj.is_must==1"
					 style="background:#ff8315;">
				必须
			</span>
			<span v-if="obj.is_must==0" 
					style="background:#ccc;">
				可选
			</span>
					{{obj.parmenter_name}}
		</dt>
		<dd>
			<x-fileimg :url="url" :random="random" :numberId="obj.Id" :ismust="obj.is_must"></x-fileimg>
		</dd>
	</dl>
	<div class="agreement">
		<div>
			<input type="checkbox" name="" v-model="isor"/><span></span>
		</div>
		<p :class="isor?'redclass':''">
			本人确保以上索赔材料为如是提交。视具体案件情况，本人知晓保险公司有权要求提供索赔材料原件或进一步补充其他资料。
		</p>
	</div>
	<div>
		<box gap="10px 10px">
		      <x-button :gradients="['#1D62F0', '#19D5FD']" link="/HomePage">资料不全，稍后上传</x-button>
		      <x-button :gradients="['#FF2719', '#FF61AD']" @click.native="subm">下一步，确认收款信息</x-button>
	    </box>
	</div>
	<toast v-model="showsuccess" 
	 		type="warn" 
	 		:is-show-mask=true 
	 		width="8.8em"
	 		:time="1000">
	 	{{reminder}}
	 </toast>
</div>
</template>
<script type="text/javascript">
import $fecth from '@/assets/js/fecth.js'
import {local,online} from "@/assets/js/urlpath.js"
import {XButton, Box,Alert,Toast,TransferDomDirective as TransferDom} from 'vux'
import XFileimg from "./xFileImg.vue"
export default{
		directives: {
	    TransferDom
	  },
	components:{
		Alert,XFileimg,XButton, Box,Toast
		
	},
	created(){
		this.random=this.$route.query.random;
		let str=this.$route.query.Bigcategory;
		$fecth.GET(local+"CertificatesUpload.php", {str:str,is:"query"}).then(data=>{
			var data=JSON.parse(data);
			var attr=[];
					for (var i = 0; i < data.length; i++) {
							for (var t = 0; t < data[i].length; t++) {
								attr.push(data[i][t]);
							}
					}
			var numattr=[attr[0]];
					for (var s = 0; s < attr.length; s++) {
						var btag=true;
							for (var x = 0; x < numattr.length; x++) {
								if(numattr[x].parmenter_code==attr[s].parmenter_code){
									btag=false;
								}
							}
						if(btag){
							numattr.push(attr[s]);
						}
					}
					this.Smallclass=numattr;
					
					
		})

	},
	computed:{
			count(){
				return this.$store.getters.loadedSrc;
			}
	},
	data(){
		return{
			Smallclass:[],
			url:local+"imgupload.php",
			random:Number,
			reminder:"",
			showsuccess:false,
			isor:false,
			imgloaded:[],
		}
	},
	methods:{
		verification(data){
			if(this.imgloaded.indexOf(data)<0){
				this.imgloaded.push(data);
			}
		},
		subm(){
				let count=this.count;
				let smallobj=this.Smallclass;
				let _this=this;
				function quchong(data){
					return count.some(x=>x.Id==data.Id)
				}
				
				smallobj=smallobj.filter(x=>x.is_must==1);
				
				for(let i=0;i<smallobj.length;i++){
					if(!quchong(smallobj[i])){
						_this.showsuccess=true;
						_this.reminder=smallobj[i].parmenter_name+"为必填项";
						return false;
					}
				}
				if(!this.isor){
					this.showsuccess=true;
					this.reminder="请确认";
					return false;
				}
				let random=this.$route.query.random;
				let jsonCode={
					rndom:random
				}
			this.$router.push({path:"/bankPage",query:jsonCode})
		},
		sub(){
			let smallobj=this.Smallclass;
			let imgloaded=this.imgloaded;
			let arr=[];
				for(let t=0;t<smallobj.length;t++){
					for(let i=0;i<imgloaded.length;i++){
						if(smallobj[t].is_must==1){
							
						if(smallobj[t].Id==imgloaded[i].split(",")[1]&&imgloaded[i].split(",")[0]=='true'){
								arr.push(true);
											
											}
						}
						
					}
					
				}



			function count(count=0){
					for(let t=0;t<smallobj.length;t++){
						if(smallobj[t].is_must==1){
							count++
						}
					}
				return count;
			}
			if(arr.length<count()){
					alert("请上传必须上传的证件")
			}
			let random=this.$route.query.random;
			let jsonCode={
				random:random
			}
			this.$router.push({path:"/bankPage",query:jsonCode})
			
		},
	}
}
	
</script>
<style lang="scss" scpoed>
.loaditem{
			font-size: 14px;
			margin-bottom: 20px;
			box-shadow: 0 3px 5px #d8d8d8;
			>dt{
				border-bottom: 1px solid #ddd;
				padding: 12px 8px;
				text-align: left;
				>span{
					padding:2px 1px;
					border-radius:3px;
					color:#fff;
				}
			}
}
.agreement{
	padding-bottom: 15px; 
	>div{
		position: relative;
		float: left;
		padding:0 3px 0 5px;
		span{
			display: block;
			border:1px solid #ddd;
			width: 16px;
			height: 16px;
			border-radius: 3px;
		}
		input{
			position: absolute;
			left: 0;
			top: 0;
			width: 18px;
			height:18px;
			opacity: 0;
		}
		input:checked+span{
			background:#fff url("../assets/img/checked.png") no-repeat center;
			background-size:cover;
		}
	}
	>p{
		margin-left: 26px;
		text-align: left;
		font-size: 14px;
		color: #F76260;
	}
	.redclass{
		color: #1C8AF5;
	}
}
</style>