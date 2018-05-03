<template>
  <div>
	   
  	<div class="but-head">
  		<button-tab :height=42 style="padding:15px 20px;background:#fff;">
        <button-tab-item :selected=true @on-item-click="tabclick">在线报案</button-tab-item>
        <button-tab-item @on-item-click="tabclick">理赔查询</button-tab-item>
      </button-tab>
  	</div>
  <div :class="{active:judge}">
    <group>
    <x-address
     title="出现地点:" 
     id="test"
     v-model="place" 
     :list="addressData"
     :raw-value=true
     @on-hide=""
     placeholder="请选择出险地点"  
     ></x-address>
      <datetime
      	placeholder="请输入出险日期"
        :title="('出险日期:')"
        v-model="date"
        ></datetime>
    
      <datetime
      placeholder="请输入出险时间" 
       format="HH:mm"  
       v-model="time"
        :title="('出险时间:')"></datetime>

        <x-input title="保单号:" 
        placeholder="请输入保单号"
        text-align="right"
        type="number"
         :required=true
         :min=20
         :max=20
         v-model="policy"
        ></x-input>

        <x-input title="被保人证件号:" 
        placeholder="请输入被保人证件号"
        text-align="right"
        type="number"
        :required=true
         :min=18
         :max=18
         v-model="certificates"
        ></x-input>

      
    </group>
    <div class="remarks">
   		<p>
      		<icon type="warn" style="font-size:17px;"></icon>
      		出险时间需换算成中国大陆时间
      	</p>
   		<p>
     	 <icon type="warn" style="font-size:17px;"></icon>
      	被保险人证件号码需与投保时填写的证件号码一样
      </p>
   	</div>
   	<div>
   		  <flexbox :gutter=20 style="padding:20px;width:auto;">
        <flexbox-item>
          <x-button  type="primary" link="/Guidance">索赔指引</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button  type="warn" @click.native="jump">立即报案</x-button>
        </flexbox-item>
      </flexbox>
   	</div>

</div>	
<div :class="{active:!judge}">
	<group>
		<x-input title="手机号:" 
        placeholder="请输入报案人手机号码"
        text-align="left"
        type="tel"
        :required=true
         :min=11
         :max=11
         v-model="mobilenum"
        ></x-input>

         <x-input title="验证码:" placeholder="请输入验证码">
            <x-button  slot="right" type="primary" action-type="button" mini>发送验证码</x-button>
        </x-input>

	</group>

        <div class="remarks">
   			<p>
   				<icon type="warn" style="font-size:17px;"></icon>
   			仅供查询通过“在线报案”提交的理赔，通过其他方式的理赔报案请至安盛天平官网查询或咨询在线客服
   			</p>
   		</div>

	<div>
   		  <flexbox style="padding:20px;width:auto;">
        
        <flexbox-item>
          <x-button :gradients="['#FF2719', '#FF61AD']" type="warn" @click.native="phonequery">立即查询</x-button>
        </flexbox-item>
      </flexbox>
   	</div>
</div>
    
        <toast v-model="show" type="cancel" :is-show-mask=true width="8.8em" :time=1000>
          {{prompt}}
        </toast>

    <div v-transfer-dom>
      <confirm v-model="showconfirm"
      :title="('温馨提示')"
      @on-cancel=""
      @on-confirm="onConfirm">
        <p style="text-align:center;">信息是否确认</p>
      </confirm>
    </div>

  </div>
</template>



<script>

import { Datetime, Group, XButton, XInput,ButtonTab, ButtonTabItem,XAddress,
 ChinaAddressV4Data,Cell,
 Value2nameFilter as value2name,
Flexbox, FlexboxItem,Icon ,Toast,Confirm,TransferDomDirective as TransferDom} from 'vux'
import $fecth from '@/assets/js/fecth.js'
import {local,online} from "@/assets/js/urlpath.js"
export default {
directives: {
    TransferDom
  },
  components: {
    Datetime,
    Group,
    XButton,
    XInput,
    ButtonTab, 
    ButtonTabItem,
    XAddress,
    Flexbox,
     FlexboxItem,
    Icon,Toast,
    Confirm,Cell
  },
  data () {
    return {
      place:[],
      placeHan:"",
      date:"",
      time:"",
      policy:"",
      vulue:0,
      certificates:"",
      addressData:ChinaAddressV4Data,
      judge:false,
      show:false,
      prompt:"",
      mobilenum:"",
      showconfirm:false
    }
  },
  methods: {
    tabclick(index){
    	index==0?this.judge=false:this.judge=true;
    },
    jump(){
    
    	if(this.place.length==0){
    		this.prompt="请选择出险地点";
    		this.show=true;
    	}else if(this.date==""){
    		this.prompt="请选择出险日期";
    		this.show=true;
    	}else if(this.time==""){
    		this.prompt="请选择出险时间";
    		this.show=true;
    	}else if(this.policy==""){
    		this.prompt="请输入正确的保单号";
    		this.show=true;
    	}else if(this.certificates==""){
    		this.prompt="请输入正确的证件号";
    		this.show=true;
    	}else{
          this.showconfirm=true;
    
    	}
      
    },
     getName (value) {
      return value2name(value, ChinaAddressV4Data)
    },
    onConfirm(){
          let _this=this;
          let Random=$fecth.getRandom();
          let json={
                  Randomnumber:Random,
                  Place:this.getName (this.place),
                  Date:this.date,
                  Time:this.time,
                  Policy:this.policy,
                  Certificates:this.certificates
          };
        $fecth.GET(local+"ReportStorage.php",json).then(function(data){
                
                  if(data==1){
                      _this.$router.push({path:'/Selectionofclaimtypes',query:{random:Random}});
                  }else{
                      alert("系统错误")
                  }
        })
    },
    phonequery(){
      let phone=this.mobilenum;
      if(phone==""){
        this.prompt="请输入要查询的电话号码";
        this.show=true;
        return false;
      }
      this.$router.push({path:'/Materialview',query:{phone:phone}});
    }
  }
}
</script>

<style  scpoed>
.center {
  padding-top: 10px;
  padding-left: 15px;
  color: green;
}
body{
	background:#f5f5f5;
}
div.active{
	display:none;
}
.remarks{
	padding:10px;
	margin-top:10px;
	text-align:left;
	font-size:14px;
	background:#fff7d6;
}
.but-head .vux-button-group > a.vux-button-tab-item-first
{
  border-top-left-radius: 18px;
    border-bottom-left-radius: 18px;
}
.but-head .vux-button-group > a.vux-button-tab-item-last{
  border-top-right-radius: 17px;
    border-bottom-right-radius: 17px;
}
</style>