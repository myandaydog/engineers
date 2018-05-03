
/*function obj2String(obj, arr = [], idx = 0) {
  for (let item in obj) {
    arr[idx++] = [item,obj[item]]
  }
  return new URLSearchParams(arr).toString();
}*/
function obj2String(obj, arr ="", idx = 0) {
   for (let item in obj) {
    arr+= (item+"="+obj[item]+"&")
  }
  arr=arr.substring(0,arr.length-1);
  return arr;
}

function commonFetcdh(url, options, method = 'GET') {
  let searchStr;
  if(options.get){
     searchStr =options;
  }else{
    searchStr=obj2String(options);
  }
  
  let initObj = {}
  if (method === 'GET') { // 如果是GET请求，拼接url
    url += '?' + searchStr
    initObj = {
      method: method,
     /// credentials: 'include'
    }
  } else {
    initObj = {
      method: method,
      mode: 'cors',
     /// credentials: 'include',
      headers: new Headers({
       // 'Accept': 'application/json',
      //  'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body:searchStr
    }
  }
return fetch(url, initObj).then((res) => {
    return res.text()
  }).then((res) => {
    return res
  })
}



let $fetchs={
  GET:function(url, options){
     return commonFetcdh(url, options, 'GET');
   },
   POST:function(url, options){
      return commonFetcdh(url, options, 'POST');
   },
   getRandom:function(){
    var myDate = new Date();
    var year=myDate.getFullYear();
    var month=myDate.getMonth()+1;
    month = month>9 ? month : "0"+month;
    var mdate=myDate.getDate();
    mdate = mdate>9 ? mdate : "0"+mdate;
    var hours=myDate.getHours();
    hours = hours>9 ? hours : "0"+hours;
    var minutes=myDate.getMinutes();
    minutes = minutes>9 ? minutes : "0"+minutes;
    var seconds=myDate.getSeconds();
    seconds = seconds>9 ? seconds : "0"+seconds;
    var num="";  
      for(var i=0;i<4;i++){  
          num+=Math.floor(Math.random()*10);  
      };  
      var str_ing=year+""+month+mdate+hours+minutes+seconds+num;
    return str_ing;
  },
  orTocompress:function(configure){
        this.fileObj = configure.fileObj;  //file-input的选择器
        this.max_size = 1024*1024 || false;  //图片最大大小，不设为无限度
        this.backFun = configure.backFun; //ajax上传图片插件

        var _this = this;
        var reader = new FileReader();
        var file = this.fileObj;
       reader.onload = function(e){
          if(file.size>1024*200){
              var com_rate = 1;
              if((_this.max_size!==false) && (file.size>_this.max_size)){
                  com_rate =  _this.max_size/file.size;
              }

              _this.compressImg(e.target.result,com_rate,function(src_data){
                  if(_this.backFun){
                    _this.backFun(src_data);
                  }
              });
          }else{
              if(_this.backFun){
                    _this.backFun(e.target.result);
                  }
          } 

        }
        reader.readAsDataURL(file);
  },
  compressImg:function(imgData,com_rate=1,onCompress=function(){}){
          if(!imgData)return;
          var img = new Image();
          img.onload = function(){ 
              if(com_rate!=1) {//按最大高度等比缩放
                var rate = Math.sqrt(com_rate) ;
                img.width  *= rate; 
                img.height *= rate; 
              }
              var canvas = document.createElement('canvas');
              var ctx = canvas.getContext("2d"); 
              canvas.width =  img.width; 
              canvas.height = img.height; 
              ctx.clearRect(0, 0, canvas.width, canvas.height); // canvas清屏
              ctx.drawImage(img, 0, 0, img.width, img.height); // 将图像绘制到canvas上 
              onCompress(canvas.toDataURL("image/jpeg"));//必须等压缩完才读取canvas值，否则canvas内容是黑帆布

          };
        img.src = imgData;
    }
}
export default $fetchs;