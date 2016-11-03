$(function(){
    var impImg = ['images/logo.png','images/x.png','images/2015.png','images/beautifulchina.png','images/beautifulchina_en.png','images/bg.jpg','images/biaoti.png','images/biaoti_en.png','images/bottom1.png','images/bottom2.png','images/fog_left.png','images/fog_right.png','images/index_b.png','images/index_txt.png','images/loading.gif','images/main.jpg','images/ml.png','images/si.jpg','images/sign.png','images/sign_line.png','images/up.png','images/video_bg.png','images/xcp.png','images/xctxt.png','images/xlhb.png','images/zhb.png','images/zxx.png']

    preloadimage(impImg)


    function fnLoad(iNow,sum){          //loading
        $('.l_loading>p').html( parseInt((iNow/sum)*100) +"%");
        $('.l_loading_bg>div').css({
            width: parseInt((iNow/sum)*100) +"%"
        });
    }

    function preloadimage(arr){
        var newimages=[], loadedimages=0;
        var arr=(typeof arr!="object")? [arr] : arr;
        function imageloadpost(){
            loadedimages++;
           
            if (loadedimages<=arr.length){
               fnLoad(loadedimages,arr.length);
                if (loadedimages==arr.length){

                    fnStart();

                }
            }
        }
        for (var i=0; i<arr.length; i++){
            newimages[i]=new Image();
            newimages[i].src=arr[i];
            newimages[i].onload=function(){
                imageloadpost();
            }
            newimages[i].onerror=function(){
                imageloadpost();
            }
        }
    }
    function fnStart(){
        $('.l_loading_wrap').remove();
        $('#page_wrap').cube();        
        
    }
})
window.onload = function(){
/*设置字体*/

	document.getElementsByTagName("html")[0].style.fontSize=document.documentElement.clientWidth+"px";


/*主页up的效果*/

	var upIndex=0;
	setInterval(function(){

		upIndex++;
		upIndex%=10;
		if(upIndex<6){
			up.style.backgroundPosition = -upIndex*30 + 'px 0';
		}
		if(upIndex==6){
			up.style.backgroundPosition = '0 0';
		}
	},80);

// 主页logo
	fnGranule('c1',{                    //配置参数
		url : '/images/ml.png',
		width:'30%',
		top:'25%'
	});
	$('#mlImg').css('opacity',1);
	$('.bbg').css('opacity',0);

//主页文字动画
	$(".department").css({'-webkit-transition': '1s',transition: '1s',"opacity":"1"});
	$(".index_txt").css({'-webkit-transition': '1s',transition: '1s',"opacity":"1"});	

}