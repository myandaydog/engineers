<template>
<div style="padding-top:16px;">
	<div class="explain">
				<p>尊敬的客户:</p>
				<p>感谢您对安盛天平保险的信任和支持，如您有什么理赔上的问题和建议请致电服务监督电话：xxxxxxxxx，我们将帮您解决，并在一个工作日内答复。</p>
				<p>案件负责人：xx:  xxxxxxxxx 工作时间：工作日9:00--17:30</p>
	</div>
	<div class="secbody">
		<scroller lock-x 
		 @on-scroll-bottom="scrollButtom" 
		 @on-scroll="scrollfn"
		 :use-pullup="true"
		 :pullup-config="pullup"
		 ref="scrollerBottom"
		 height="-152"
		 @on-pullup-loading="addload"
		 :scroll-bottom-offset="-50" >
	      <div class="">
	        <dl v-for="item in dataobj" class="content">
	        	<dt>
	        		<div><span>保单号码：</span><span>{{item.Policy}}</span></div>
	        		<div><span>出险日期：</span><span>{{item.Date}}</span></div>
	        	</dt>
	        	<dd>
	        		<div><span>案件状态：</span><span>提交</span></div>
	        		<div><span>报案人：</span><span>{{item.Fullname||'(本次为电话报案，暂无报案人姓名)'}}</span></div>
	        		<div><span>出险地点：</span><span>{{item.Place}}</span></div>
	        	</dd>
	        </dl>
	        <div v-show="onFetching" class="loadxia" :class='{loadactive:scrollon?true:false}'>
	        	<span></span>
	        </div>
	        <load-more tip="" v-show="loadmo"></load-more>
	      </div>
	    </scroller>
	</div>

<toast v-model="show" type="cancel" :is-show-mask="true" width="8.8em" :time="1000">
	没有更多信息了
</toast>

</div>

</template>
<script>
import $fecth from '@/assets/js/fecth.js'
import {local,online} from "@/assets/js/urlpath.js"
import {Scroller,LoadMore,Toast} from 'vux'
export default{
	components:{
		Scroller,LoadMore,Toast
	},
	created(){
			var jsonobj=[
							{
								number:"2103000080917",dateti:'2018-03-01',name:"被保险人",state:"提交"
							},
							{
								number:"2103000080917",dateti:'2018-03-01',name:"被保险人",state:"提交"
							},
							{
								number:"2103000080917",dateti:'2018-03-01',name:"被保险人",state:"提交"
							},
							{
								number:"2103000080917",dateti:'2018-03-01',name:"被保险人",state:"提交"
							},
							{
								number:"2103000080917",dateti:'2018-03-01',name:"被保险人",state:"提交"
							},
							{
								number:"2103000080917",dateti:'2018-03-01',name:"被保险人",state:"提交"
							},
							{
								number:"2103000080917",dateti:'2018-03-01',name:"被保险人",state:"提交"
							},
							{
								number:"2103000080917",dateti:'2018-03-01',name:"被保险人",state:"提交"
							},
							{
								number:"2103000080917",dateti:'2018-03-01',name:"被保险人",state:"提交"
							},
							{
								number:"2103000080917",dateti:'2018-03-01',name:"被保险人",state:"提交"
							}

						]
			let phone=this.$route.query.phone;
			$fecth.GET(local+"queryresult.php",{phone:phone}).then(data=>{
				data=JSON.parse(data);
				this.datainit=data;
				this.removerepeat(0,3,this.datainit);
			})
			
			
			
	},
	data(){
		return{
			onFetching:false,
			bottomCount:10,
			scrollon:false,
			loadmo:false,
			pullup:{
			  content: '',
			  pullUpHeight: 60,
			  height: 10,
			  autoRefresh: true,
			  downContent: '',
			  upContent: '',
			  loadingContent: '',
			  clsPrefix: ''
			},
			pullup1:{
			  content: '请上拉刷新数据',
			  pullUpHeight: 60,
			  height: 40,
			  autoRefresh: false,
			  downContent: '松开手指更新',
			  upContent: '请上拉刷新数据',
			  loadingContent: 'loading...',
			  clsPrefix: 'xs-plugin-pullup-'
			},
			datainit:[],
			dataobj:[],
			show:false

		}
	},
	methods:{
		scrollfn(position){
			if(position.top>0){
				this.onFetching=true;
				this.scrollon = false;
				this.loadmo=false;
			}
			
			
		},
	scrollButtom () {
			this.scrollon=true;
    },
    addload(){
    		
 			  this.onFetching=false;
	          this.scrollon = false;
	          this.loadmo=true;
    		 setTimeout(() => {
	          this.$nextTick(() => {
	          	this.add();
	          	this.$refs.scrollerBottom.reset()
	          	this.$refs.scrollerBottom.donePullup()
	          	this.onFetching=false;
	         	 this.scrollon = false;
	            this.loadmo=false;
	          })
	        }, 2000)
   
    },
    removerepeat(start=0,num=3,whole){
					let end;
					if(num<=whole.length){
						end=num;
					}else{
						end=whole.length;
					}
					if(start>=whole.length){
						this.show=true;
						return false;
					}
					for (let i = start; i < end; i++) {
						this.dataobj.push(whole[i]);
				}
	},
	add(){
		this.removerepeat(this.dataobj.length,this.dataobj.length+3,this.datainit);
	}
}
}
</script>
<style scoped lang="scss">
.explain{
	text-align: left;
	background:#F3f3f3;
	margin: 16px;
	margin-top:0;
	border-radius: 38px;
	box-shadow: 0 0 300px 1px;
	p:nth-child(1){
		background: url(../assets/img/cuebell.png) no-repeat left 4px;
		background-size: 12px; 
	}
	p{
		text-indent:1em;
		font-size: 13px;
		line-height: 20px;
	}
}
.secbody{
	.weui-loadmore{
		margin: 1em auto;
	}
	.content{
		text-align: left;
		font-size: 14px;
		line-height: 20px;
		margin:0 1em 1em 1em;
		border:1px solid #e0e0e0;
		border-radius: 32px;
		padding: 10px;
		div{
			
		}
		em{
			font-style: none;
		}
	}
	.loadxia{
		width: 100%;
		
		bottom: -32px;
		height: 32px;
		>span{
			display: inline-block;
			height: 32px;
			width: 32px;
			background: url(../assets/img/xiala.png) no-repeat center;
			transform:rotate(0deg);
			transition: transform 0.3s;
		}
	}
	.loadactive{
		>span{
			transition: transform 0.3s;
			transform:rotate(-180deg);
			background: url(../assets/img/xiala.png) no-repeat center;
		}
	}
}
	
</style>