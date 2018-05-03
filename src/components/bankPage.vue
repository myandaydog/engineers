<template>
	<div>
		<div class="headerd">
			<div>收款信息</div>
		</div>
		<div class="section">
			<ul>
				<li>
					<x-input title="收款人姓名:" 
						        placeholder="请输入收款人姓名"
						        text-align="right"
						        type="text"
						         :required='true'
						      
						         v-model="fullname"
						        ></x-input>
				</li>
				<li>
					<x-input title="银行账号:" 
						        placeholder="请输入银行账号"
						        text-align="right"
						        type="number"
						         :required='true'
						      
						         v-model="bankaccount"
						        ></x-input>

				</li>
				<li>
					<x-input title="开户银行:" 
						        placeholder="请输入开户银行"
						        text-align="right"
						        type="text"
						         :required='true'
						         v-model="bankname"
						        ></x-input>
				</li>
			</ul>
			<box gap="30px 10px">
			      
			      <x-button :gradients="['#FF2719', '#FF61AD']" @click.native="subsuc">请确认上传提交</x-button>
			     
    		</box>
    		 <toast v-model="showsuccess" 
	 		type="cancel" 
	 		:is-show-mask=true 
	 		width="8.8em"
	 		:time="1000">
	 		{{reminder}}
		 </toast>
		 <toast v-model="subsuccess" 
		 		type="success" 
		 		:is-show-mask=true 
		 		width="8.8em"
		 		@on-hide="jumppage"
		 		:time="2000">
		 		报案成功，即将跳转···
		 </toast>
		</div>
	</div>
</template>
<script type="text/javascript">
import $fecth from '@/assets/js/fecth.js'
import {local,online} from "@/assets/js/urlpath.js"
import {XInput ,XButton,Box,Toast} from "vux"
export default{
	components:{
			XInput,XButton,Box,Toast
	},
	methods:{
		subsuc(){
			if(this.fullname==""){
					this.showsuccess=true;
					this.reminder="请输入收款人姓名";
					return false;

			}else if(this.bankaccount==""){
					this.showsuccess=true;
					this.reminder="请输入银行卡号";
					return false;
			}else if(this.bankname==""){
					this.showsuccess=true;
					this.reminder="请输入开户银行";
					return false;
			}

			let random = this.$route.query.rndom;
			let json={
				fullname:this.fullname,
				bankaccount:this.bankaccount,
				bankname:this.bankname,
				random:random
			}
			$fecth.GET(local+"success.php",json).then(data=>{
				
					if(data==1){
						this.subsuccess=true;
					}
			})
		},
		jumppage(){
			this.$router.push({path:"/Homepage"});
		}
	},
	data(){
			return{
				fullname:"",
				bankaccount:"",
				bankname:"",
				subsuccess:false,
				showsuccess:false,
				reminder:""
			}
	}
}
</script>
<style lang="scss" scoped>
	.headerd{
		padding: 15px 30px;
		background: #f8f8f8;
		>div{
			line-height: 36px;
			background:#eee;
			border-radius: 5px;
		}
	}
	.section{
		margin-top: 15px;
		background: #f8f8f8;
		>ul{
			>li{
				padding: 0 10px;
				border-bottom: 1px solid #eee;
			}
		}
	}
</style>