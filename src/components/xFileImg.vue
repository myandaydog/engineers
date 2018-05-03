<template>
<div>
	<p style="text-align: right">
		<span style="float: left;font-size:12px;color: #199fff">长按图片可删除</span>
		<span style="color: #199fff">{{ImgSrc.length}}</span><span>/9</span>
	</p>
	<div class="upload">
		<div v-for="(src,index) in ImgSrc" @click="tan" >
			<img :src="src.src" :title="src.title" v-longTouch="longClick"  />
		</div>
		<div class="file">
			<input type="file" name="" @change="uploadImg"/>
		</div>
	</div>
	<div class="sample">
		<p>(图片大小不超过10m,格式限制为jpg/png)</p>
		<span>查看示例</span>
	</div>
	<div v-transfer-dom>
      <loading :show="loading" :text="('上传中')"></loading>
    </div>
     <toast v-model="showsuccess" 
	 		type="cancel" 
	 		:is-show-mask=true 
	 		width="8.8em"
	 		:time="1000">
	 	{{reminder}}
	 </toast>
	 <toast v-model="removeImg" 
	 		type="success" 
	 		:is-show-mask=true 
	 		width="8.8em"
	 		:time="1000">
	 	删除成功
	 </toast>
	 
</div>
</template>
<script type="text/javascript">
import $fecth from '@/assets/js/fecth.js'
import {local,online} from "@/assets/js/urlpath.js"
import {Loading,Toast,TransferDomDirective as TransferDom } from 'vux'
export default{
	directives: {
	    TransferDom,longTouch(el,bingding){
	    	let timer=null;
	    	el.addEventListener("touchstart",function(event){
	    		event.stopPropagation();
			    	clearInterval(timer);
			    	let s=0;
	    			timer=setInterval(function(){
	    				s+=10;
	    				if(s>300){
	    					clearInterval(timer);
	    					//if(confirm("是否删除图片")){
	    						bingding.value(el.title);
	    					//}
	    				};
	    			},10)
	    	})
	    	el.addEventListener("touchmove",event=>{
	    		event.stopPropagation();
	    		clearInterval(timer);
	    	})
	    	el.addEventListener("touchend",event=>{
	    		event.stopPropagation();
	    		clearInterval(timer);
	    	})
			
		}
	  },
	components:{
		Loading,Toast,
	},
	props: {
			url: {
					 type: String,
					 required: true
					},
			random:{
				type:String
			},
			numberId:{
				type:String
			},
			ismust:{
				type:String
			}
	},
	created(){
		this.src=this.url;
		this.randomNum=this.random;
		this.number=this.numberId;
		//this.$store.commit("loadedSrc",[1,2,3]);
	},
	data(){
		return{
			src:null,
			randomNum:String,
			number:null,
			ImgSrc:[],
			loading:false,
			showsuccess:false,
			removeImg:false,
			reminder:"",
			srcloaded:[]
		}
	},
	methods:{
			longClick(url){
				let src=this.src;
				let _this=this;
					$fecth.GET(src,{title:url}).then(function(data){
						_this.removeImg=true;
							if(data){
								for(var i=0;i<_this.ImgSrc.length;i++){
										if(url==_this.ImgSrc[i].title){
												_this.ImgSrc.splice(i,1);
											}
								}
								if(_this.ismust==1){
									
											_this.sendsrc(_this.number);
										}
							}

					})
			},
			tan(event){
				if(event.currentTarget.className=="activeImg"){
					event.currentTarget.className="";
				}else{
					event.currentTarget.className="activeImg";
				}
			},
			show (index) {
		      this.$refs.previewer.show(index)
		    },
			uploadImg(event){
					
					let random=this.randomNum;
					let classtype=this.number;
					let _this=this;
					let file=event.currentTarget.files[0];
					if(file.name.length > 50){
					_this.showsuccess=true;
					_this.reminder="文件名的长度不能超过50个字符";
					return false;
					};
					if(!file.type.match('image\/(jpeg|jpg|png)')){
						_this.showsuccess=true;
						_this.reminder="请上传格式为(jpg,png)的图片";
						return false;
					};
					if(file.size>1024*1024*10){
						_this.showsuccess=true;
						_this.reminder="你好，你所上传的图片大小不能超过10m";
						return false;
					};
					this.loading=true;
					let formdata = new FormData(); // 用formdata上传文件        // 只选择图片文件   
					formdata.append("name",file.name);
					formdata.append('random', random);
					formdata.append("classtype",classtype);
					let src=this.src;
		////////////////////////////////////////////////////////////////////
		$fecth.orTocompress({
			fileObj:file,
			backFun:function(data){
					formdata.append('file', data); // 填入文件  
					this.POST(src,formdata)
								.then(function(data){
									_this.loading=false;
									
									if(data!="repeat"){
										_this.ImgSrc.push({src:local+data,title:data});
										if(_this.ismust==1){
											_this.sendsrc('increase');
										}
										
									}else{
										_this.showsuccess=true;
										_this.reminder="图片重复";
									
									}
						})
			}
		})
		
					/*let reader = new FileReader();   
					reader.onload = function(ev) { 
						var file=ev.target.result;
						formdata.append('file', file); // 填入文件  
						
						$fecth.POST(src,formdata)
								.then(function(data){
									_this.loading=false;
									
									if(data!="repeat"){
										_this.ImgSrc.push({src:local+data,title:data})
									}else{
										_this.showsuccess=true;
										_this.reminder="图片重复";
									}
						})
					}
							reader.readAsDataURL(file);*/
			////////////////////////////////////////////////////////////////////
							event.currentTarget.value="";
			},
		send(data){
				 data=data||this.ImgSrc.length>0;
				this.$emit("imgload",data+","+this.number);
		},
		sendsrc(data){
			//this.srcloaded.push();
			if(data=='increase'){
					if(this.ImgSrc.length==1){
					this.$store.commit("loadedSrc",{Id:this.number,isor:true,isin:data});
				}
			}else{
				if(this.ImgSrc.length==0){
					this.$store.commit("loadedSrc",{isin:data});
				}
				
			}
			
			
		}
	}
}
	
</script>
<style lang="scss" scpoed>
.upload{
	padding: 5px;
	padding-top: 0;
	display: flex;
	flex-wrap:wrap;
	>div{
		border-radius: 5px;
		width: 90px;
		height: 70px;
		padding: 5px;
		margin:5px 0 0 10px;
		border: 1px dashed #ccc;
		line-height: 70px;

		>img{
			width: 90px;
			max-height: 70px;
		}
	}
	>div.activeImg{
		border-radius: 0;
		width: 100%;
		height: 100%;
		padding: 0;
		margin:0;
		border: 0;
		line-height: auto;
		position: fixed;
		left: 0;
		top: 0;
		background: rgba(0,0,0,0.6);
		z-index: 1000;
		>img{
			width: 80%;
			margin-top: 10%;
			max-height: 80%;
			border-radius: 5px;
		}
	}
	.file{
		padding: 0;
		width: 100px;
		height: 80px;
		background: url(../assets/img/imgUpload.png) no-repeat center;
		background-size: 60%; 
		overflow: hidden;
		>input{
			width: 100%;
			height: 100%;
			opacity: 0;
			display: block;
		}
	}
}
.sample{
	height: 32px;
	line-height: 32px;
	p{
		float: left;
		font-size: 12px;
	}
	span{
		float: right;
		color:#199fff;
	}
}
</style>