<template>

<div style="background:#fff">
	<div style="padding:10px 5px 0px 5px;">
      	<div class="button">
			<div :class="{slected:isTre}"  @click="oneButton">在线报案</div>	
			<div :class="{slected:!isTre}" @click="twoButton">电话报案</div>
      	</div>
     </div>
     <transition name="fade">
			<div v-if="isTre" style="border:1px solid #eee;border-top:0;margin:0 5px;padding:30px 0;">
				<div class="causedisplay">
					<div class="causeone">
						<span>险种：</span>
						<p>{{insurance}}</p>
					</div>
					<div class="causetwo">
						<span>索赔类型：</span>
						<p>{{category}}</p>
					</div>
				</div>
				<dl class="reason">
					<dt>事故原因类型（可多选）：</dt>
					<dd>
						<checker
					    v-model="multiselect"
					    type="checkbox"
					    default-item-class="demo5-item"
					    selected-item-class="demo5-item-selected"
					    >
					      <checker-item v-for="(value,i) in multidata" :key="value" :value="value"
					       :class="{sizeLength:value.length>5?true:false}">
					      		{{value}}
					  		</checker-item>
					    </checker>
					   
					</dd>
				</dl>
				<dl class="reason">
					<dt>事故原因描述：</dt>
					<dd>
						<textarea placeholder="请输入事故原因" v-model="Causedescription"></textarea>
					</dd>
				</dl>
				<dl class="reason">
					<dt>报案人信息：</dt>
					<dd style="padding:0;">
						<x-input title="手机号码：" 
								type="tel" :min="11" 
								:max="11" 
								v-model="telPhone"
								placeholder="请输入电话号码"></x-input>
					</dd>
					 <dd style="padding:0;">	
						<x-input title="电子邮箱："  
								type="email" 
								is-type="email" 
								v-model="telEmail"
								placeholder="请输入邮箱地址"></x-input>
					 </dd>
				</dl>
				<div style="padding:20px 15px;">
					<x-button type="warn" :gradients="['#FF2719', '#FF61AD']"  @click.native="submitareport">
					下一步，上传索赔材料</x-button>
				</div>
    		</div>
			<ul v-else="isTre">
				<li class="telInput">
					<span>手机号码：</span>
					<p>
						<input type="tel" name="" v-model="phoneNumber"/>
					</p>
				</li>
				<li style="padding:20px 15px;">
					<x-button type="warn" 
							:gradients="['#1D62F0', '#19D5FD']" 
							@click.native="subphone">提交</x-button>
				</li>
				<li style="text-align:left;line-height:18px;color: #a7a7a7;font-size:13px;padding:0 15px;">
					<span>
						请确保您的手机畅通，我们会尽快与您联系
					</span>
				</li>
    		</ul>
</transition>
      
	 <toast v-model="show" type="cancel" :is-show-mask=true width="8.8em" :time="1000">{{prompt}}</toast>
	 <toast v-model="showsuccess" 
	 		type="success" 
	 		:is-show-mask='true' 
	 		width="8.8em"
	 		@on-hide="subsuccess" 
	 		:time="1000">
	 	提交成功
	 </toast>	
	  <toast v-model="phonesuccess" 
		 		type="success" 
		 		:is-show-mask='true' 
		 		width="8.8em"
		 		@on-hide="jumppage"
		 		:time="2000">
		 		报案成功，即将跳转···
		 </toast>
</div>

</template>

<script>
import $fecth from '@/assets/js/fecth.js'
import {local,online} from "@/assets/js/urlpath.js"
import {Group,Cell,ButtonTab, ButtonTabItem,Checker, 
	CheckerItem,XInput,XButton,Toast,Alert,TransferDomDirective as TransferDom} from 'vux'

export default{
	directives: {
	    TransferDom
	  },
	components:{
		Group,Cell,ButtonTab, ButtonTabItem,Checker, CheckerItem,XInput,XButton,Alert,Toast
	},
	created(){
			let random=this.$route.query.random;
			$fecth.GET(local+"Information.php",{random:random,is:"take"}).then(data=>{
				var data=JSON.parse(data);
				this.insurance=data.TypeofInsurance;
				this.category=data.Claimcategory;
			});
			let str=this.$route.query.Bigcategory;

			$fecth.GET(local+"Information.php",{str:str,is:"query"}).then(data=>{
				var data=JSON.parse(data);
				var attr=[];
					for (var i = 0; i < data.length; i++) {
							for (var t = 0; t < data[i].length; t++) {
								if(attr.indexOf(data[i][t].parmenter_name)<0){

									attr.push(data[i][t].parmenter_name)
								}
							}
					}
					this.multidata=attr;

			});
	},
	methods:{
		oneButton(){
			this.isTre=true;
		},
		twoButton(){
			this.isTre=false;
		},
		submitareport(){
					let Causetype=this.multiselect.join(",");
					let Causedescription=this.Causedescription;
					let telPhone=this.telPhone;
					let telEmail=this.telEmail;
					let random=this.$route.query.random;
					let Bigcode=this.$route.query.Bigcategory;
    		if(Causetype.length==0){
    			this.prompt="请选择原因类型";
    			this.show=true;
    		}else if(Causedescription.length==0){
    				this.prompt="请输入事故原因";
    				this.show=true;
    		}else if(Causedescription.length>100){
    				this.prompt="事故原因类型字数请限制在100以内";
    				this.show=true;
    		}else if(telPhone.length==0){
    				this.prompt="请输入的电话号码";
    				this.show=true;
    		}else if(telEmail.length==0){
    				this.prompt="请输入正确邮箱";
    				this.show=true;
    		}else{
    			this.showsuccess=true;		
    		}			
			
		},
		subsuccess(){
					let _this=this;
					let Causetype=this.multiselect.join(",");
					let Causedescription=this.Causedescription;
					let telPhone=this.telPhone;
					let telEmail=this.telEmail;
					let random=this.$route.query.random;
					let Bigcode=this.$route.query.Bigcategory;
					let json={
								Causetype:Causetype,
								Causedescription:Causedescription,
								TelePhone:telPhone,
								Email:telEmail,
								random:random,
								is:"increase"
							}
						let jsonCode={
						              Bigcategory:Bigcode,
						              random:random
						      }
				
				$fecth.GET(local+"Information.php",json).then(data=>{
						console.log(data)
						 if(data==1){
			                _this.$router.push({path:'/CertificatesUpload',query:jsonCode});
			              }else{
			                alert("系统错误");
			              }
				})
		},
		subphone(){
			let phone=this.phoneNumber;
			let random=this.$route.query.random;
			if(phone==""){
					this.prompt="请输入您的电话号码";
    				this.show=true;
    				return false;
			}
			let json = {
				random:random,
				phone:phone,
				is:"phone"
			}
			$fecth.GET(local+"Information.php",json).then(data=>{
					if(data==1){
						this.phonesuccess=true;
					}
			})
		},
		jumppage(){
			this.$router.push({path:"/Homepage"});
		}
	},
	data(){
		return{
			insurance:"",
			category:"",
			isTre:true,
			multidata:[],
			multiselect: [],
			Causedescription:"",
			telPhone:"",
			telEmail:"",
			show:false,
			showsuccess:false,
			prompt:"",
			phoneNumber:"",
			phonesuccess:false
		}
	}
}

</script>


<style scoped lang="scss">
.clear:after{
	content: ".";
	height:0;
	overflow:hidden;
	display:block;
	clear: both;
	visibility:hidden;
}
.button{
	display: flex;
	height:40px;
	line-height:40px;
	background:#f5f5f5;
	div{
		flex:1;
		border:1px solid #f5f5f5;
		border-bottom:1px solid #eee;
		transition: all 0.3s;
		
	}
	div.slected{
		border: 1px solid #eee;
		border-bottom: 1px solid #fff;
		transition: all 0.3s;
		background:#fff;
		
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
	}
}
.fade-enter-active {
				  transition: transform .5s
				}
				 .fade-leave-active {
				  transition: transform 0s
				}
				.fade-enter{
				  transform: translateX(-200px)
				}
				.fade-leave-to{
				  transform: translateX(200px)
	}
.reason{
		
		>dt{
				line-height:42px;
				text-align:left;
				margin:0 8px;
				border-bottom:1px dashed #eee;
			}
		>dd{
			padding:10px 0;
			margin:0 8px;
			border-bottom:1px solid #eee;
			padding-bottom: 15px;
			>div{
				@extend .clear;
				>div{
					float: left;
					margin-left:5px;
					margin-bottom: 5px;
				}
			}
			>textarea{
				box-sizing: border-box;
				width: 100%;
				height:100%;
				resize: none;
				border-radius:5px;
				border:1px solid #eee;
				outline: none;
				transition:all 0.3s;
				height:100px;
				line-height:16px;
				text-indent:10px;
				font-size:14px;
				padding-top:8px;
			}
			>textarea:focus{
				border-color:#74b9ef;
				transition:all 0.3s;
				box-shadow: 0 0 10px #74b9ef;
			}
			>.weui-cell{
				padding:10px 15px 10px 0;
				text-align:left;
			}
		}
}
.causedisplay{
	padding: 0 8px;
	text-align:left;
	line-height:42px;
		>div{
			border-bottom:1px solid #eee;
			>span{
				float:left;
			}
			>p{
				width: 100%;
				color: #199fff;
			}
		}
}			
.demo5-item {
  width: 66px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #eee;
  background-color: #fff;
  margin-right: 6px;
  font-size: 12px;
  background:#f5f5f5;
  overflow:hidden;
}
.demo5-item-selected {
  background: #ffffff url(../assets/selected.png) no-repeat right bottom;
  border-color: #ff4a00;
}
.sizeLength{
	line-height:16px;
	overflow: hidden;
}

.telInput{
		line-height:42px;
		height:42px;
		padding:30px 0 0 0;
		>span{
			float: left;
			width: 80px;
			padding-left:10px;
		}
		>p{
			margin-left: 95px;
			margin-right: 15px;
			>input{
				display:block;
				width: 100%;
				height:40px;
				outline:none;
				box-sizing:border-box;
				border:1px solid #eee;
				border-radius:5px;
				padding-left: 10px;
				transition:all 0.3s;
			}
			>input:focus{
				border-color:#74b9ef;
				transition:all 0.3s;
				box-shadow: 0 0 10px #74b9ef;
			}
		}
}
</style>