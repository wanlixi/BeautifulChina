var initcover = false;
(function($) {
    $.fn.cube = function(options) {

        document.addEventListener && document.addEventListener("touchmove", function(a) {
            a.preventDefault()
        });

        var wh = $(window).height();

        var rotatePrevStyle = {
                'display': 'block',
                'z-index': '99',
                '-webkit-transition': '0s',
                '-webkit-transform': 'rotateX(90deg) translateZ(' + wh / 2 + 'px)'
            },
            rotateCurrentStyle = {
                'display': 'block',
                'z-index': '101',
                '-webkit-transition': '0s',
                '-webkit-transform': 'rotateX(0deg) translateZ(' + wh / 2 + 'px)'
            },
            rotateNextStyle = {
                'display': 'block',
                'z-index': '100',
                '-webkit-transition': '0s',
                '-webkit-transform': 'rotateX(-90deg) translateZ(' + wh / 2 + 'px)'
            },
            rotateOtherStyle = {
                'display': 'none',
                'z-index': '1',
                '-webkit-transition': '0s',
                '-webkit-transform': 'rotateX(-180deg) translateZ(' + wh / 2 + 'px)'
            };

        var wrapper = this,
            container = this.parent(),
            all = this.children(),
            current,
            next,
            prev,
            prevStyle = rotatePrevStyle,
            currentStyle = rotateCurrentStyle,
            nextStyle = rotateNextStyle,
            otherStyle = rotateOtherStyle,
            dragY = 0,
            isTurning = false,
            isTurned = false;

        var rotate = function(y) {
            if (y >= 0) {
                //console.log(y);
                if(y>=0.5){
                    prev.css({
                        'display': 'block',
                         'z-index': '101',
                        '-webkit-transform': 'rotateX(' + 90 * (1 - y) + 'deg) translateZ(' + wh / 2 + 'px)'
                    });
                    current.css({
                        'display': 'block',
                         'z-index': '100',
                        '-webkit-transform': 'rotateX(' + 90 * (-y) + 'deg) translateZ(' + wh / 2 + 'px)'
                    });
                    next.hide();
                }else{
                    prev.css({
                        'display': 'block',
                        'z-index': '100',
                        '-webkit-transform': 'rotateX(' + 90 * (1 - y) + 'deg) translateZ(' + wh / 2 + 'px)'
                    });
                    current.css({
                        'display': 'block',
                        'z-index': '101',
                        '-webkit-transform': 'rotateX(' + 90 * (-y) + 'deg) translateZ(' + wh / 2 + 'px)'
                    });
                    next.hide();
                }
               
            } else {
                //console.log(y);
                if(y<=-0.5){
                    prev.hide();
                    current.css({
                        'display': 'block',
                        'z-index': '100',
                        '-webkit-transform': 'rotateX(' + 90 * (-y) + 'deg) translateZ(' + wh / 2 + 'px)'
                    });
                    next.css({
                        'display': 'block',
                        'z-index': '101',
                        '-webkit-transform': 'rotateX(' + 90 * (-1 - y) + 'deg) translateZ(' + wh / 2 + 'px)'
                    });
                }else{
                    prev.hide();
                    current.css({
                        'display': 'block',
                        'z-index': '101',
                        '-webkit-transform': 'rotateX(' + 90 * (-y) + 'deg) translateZ(' + wh / 2 + 'px)'
                    });
                    next.css({
                        'display': 'block',
                        'z-index': '100',
                        '-webkit-transform': 'rotateX(' + 90 * (-1 - y) + 'deg) translateZ(' + wh / 2 + 'px)'
                    });

                }
                
            };
        };

        var setOrder = function() {

            current = $('.hover');
            if ($('.hover').next().length !== 0) {
                next = current.next();
            } else {
                next = all.first();
            };
            if ($('.hover').prev().length !== 0) {
                prev = current.prev();
            } else {
                prev = all.last();
            };

            all.css(otherStyle);
            prev.css(prevStyle);
            current.css(currentStyle);
            next.css(nextStyle);

            isTurning = false;
            isTurned = false;
        };

        var turn = function(effect, y, transition) {
            if (transition) {
                all.css('transition', '0.4s');
            } else {
                all.css('transition', '0s');
            };
            effect(y);
        };
        var y_imgBol=true;
        var bO=true,bT=true,bTh=true,bF=true,bFi=true,bSe=true;
        var videoBol=true;
        var animate = function () {

            //图片
            var cBol=true;
            $('.y_imgbor').css({transform:'scale(.8)'});
            $('.hover .imgChange').on('click',function(){

                var h=(1-document.documentElement.clientWidth*$(this).parent().height()/$(this).parent().width()/document.documentElement.clientHeight)*50+'%';

                if(cBol){
                    $(this).parent().css({transform:'scale(1)'});
                    cBol=false;
                }else{
                    $(this).parent().css({transform:'scale(.8)'})
                    cBol=true;
                }

            });

            //加载图片
            if(y_imgBol&&$('.hover #y_imgs').length>0){
                imagesLoad();
                y_imgBol=false;
            }

            //加载视频
            if(videoBol&&$('.hover #video').length>0){
                $('#video').attr('src',$('#video').attr('_src'))
                $('#video').css('height',$('.video_bor').width()*.5618)
                $('#video').load();
                $('.videoBg').css('height',$('.videoBg').width()*.5618+$('.video_bor').height()*.1)
                videoBol=false
            }

            //连线

            if($('.hover .moveLine').length>0){
                
                setTimeout(function(){
                    switch($('.hover').index()){
                        case 1:
                            if(bO){
                                links([{x:'110%',y:'75%'},{x:'65%',y:'63%'},{x:'65%',y:'5%'}],$('.page_2 .moveLine'));
                                links([{x:'110%',y:'75%'},{x:'65%',y:'75%'},{x:'65%',y:'70%'}],$('.page_2 .moveLines'));
                                links([{x:'0%',y:'1%'},{x:'35%',y:'8%'},{x:'35%',y:'82%'},{x:'50%',y:'82%'},{x:'50%',y:'110%'}],$('.page_2 .moveLinet'));
                                bO=false;
                            }
                        break;
                        case 2:
                            if(bT){
                                links([{x:'50%',y:'-10%'},{x:'50%',y:'5%'}],$('.page_3 .moveLine'));
                                bT=false;
                            }                        
                        break;
                        case 3:
                            if(bTh){
                                links([{x:'100%',y:'15%'},{x:'65%',y:'5%'},{x:'65%',y:'65%'}],$('.page_4 .moveLine'));
                                links([{x:'52%',y:'100%'},{x:'52%',y:'77%'},{x:'65%',y:'77%'},{x:'65%',y:'72%'}],$('.page_4 .moveLines'));
                                links([{x:'0%',y:'72%'},{x:'33%',y:'92%'},{x:'33%',y:'85%'},{x:'52%',y:'85%'}],$('.page_4 .moveLinet'));
                                bTh=false;
                            }                        
                        break;
                        case 4:
                            if(bF){
                                links([{x:'50%',y:'-10%'},{x:'50%',y:'5%'}],$('.page_5 .moveLine'));
                                bF=false;
                            }
                        break;
                        case 5:
                            if(bFi){
                                links([{x:'27%',y:'100%'},{x:'27%',y:'77%'},{x:'66%',y:'77%'},{x:'66%',y:'72%'}],$('.page_6 .moveLine'));
                                links([{x:'0%',y:'5%'},{x:'33%',y:'18%'},{x:'33%',y:'68%'}],$('.page_6 .moveLines'));
                                links([{x:'100%',y:'15%'},{x:'66%',y:'5%'},{x:'66%',y:'60%'}],$('.page_6 .moveLinet'));
                                bFi=false;
                            }
                        break;
                        case 7:
                            if(bSe){
                                links([{x:'100%',y:'90%'},{x:'65%',y:'70%'},{x:'65%',y:'77%'},{x:'37%',y:'77%'},{x:'37%',y:'110%'}],$('.page_8 .moveLine'));
                                links([{x:'100%',y:'80%'},{x:'65%',y:'60%'},{x:'65%',y:'5%'}],$('.page_8 .moveLines'));
                                links([{x:'0',y:'11%'},{x:'37%',y:'18%'},{x:'37%',y:'58%'}],$('.page_8 .moveLinet'));
                                bSe=false;
                            }
                        break;


                    }
            },450);
                
            }

            var content = $('.hover');

            content.find('.slide-right').addClass('slideRight');
            content.find('.slide-left').addClass('slideLeft');                         //页面特效
            content.find('.fonts').addClass('fontS');
        };

        var init = function() {
            container.css('-webkit-perspective', wh + 'px');
            wrapper.css('-webkit-perspective', wh + 'px');
            wrapper.css('-webkit-transform', 'translateZ(-' + wh + 'px)');
            all.first().addClass('hover');

            setOrder();

            $('.hover').find('.text-up').addClass('textUp');

            if(!initcover){
                initcover = true;
                animate();
                $('.hover').find('.fade-out-cover').addClass('fadeOutCover');
            }

            if(window.isCoverPage){return;}
            wrapper.hammer().on('swipeup swipedown dragup dragdown release', function(e) {
                dragY = e.gesture.deltaY / $(window).height();
                switch (e.type) {
                    case 'swipeup':
                        turn(rotate, -1, true);
                        break;
                    case 'swipedown':
                        turn(rotate, 1, true);
                        break;
                    case 'dragup':
                    case 'dragdown':
                        if (!isTurning) {
                            turn(rotate, dragY, false);
                        };
                        break;
                    case 'release':
                        isTurning = true;
                        if (dragY > 0.2) {
                            isTurned = true;
                            turn(rotate, 1, true);
                            current.removeClass('hover');
                            prev.addClass('hover');
                        } else if (dragY < -0.2) {
                            isTurned = true;
                            turn(rotate, -1, true);
                            current.removeClass('hover');
                            next.addClass('hover');
                        } else {
                            turn(rotate, 0, true);
                            isTurned = false;
                        };
                        break;
                };
            });

            wrapper.on('webkitTransitionEnd', function() {
                if (isTurned) {
                    setOrder();
                    animate();
                };
                isTurning = false;
                isTurned = false;
            });
        }();
         //加载图片
        function imagesLoad(){
            var y_imgIndex = 0;
            winHeight = document.documentElement.clientHeight;
            var y_imgs = $("#y_imgs");
            y_imgs.height(winHeight);            

            var imgPath=[],arrImg=[];
             for(var i =1 ;i<17;i++){
                var imgs = 'images/'+i+'.jpg';
                imgPath.push(imgs);
            }

            preloadimages(imgPath);

        }       

        

        function fnLoads(iNow,sum,a){          //loading
            var per = iNow / sum ;
            per = per.toFixed(2)*100 + '%';
            if(iNow==9){
                per='56%';
            }
            $('<img src="'+a+'" style="opacity:0">').appendTo($('#y_imgs'));
            $('.loader').html('loading('+per+')');

            $("#y_line").height(iNow*5+'%');
            var h= $(".y_line").height()-$("#y_line").height()-$('.y_lineHead').height();
            $(".y_line").css('top',h+$(".y_line").height()*.05);
        }

        function preloadimages(arr){
            var newimages=[], loadedimages=0;
            var arr=(typeof arr!="object")? [arr] : arr;
            function imageloadpost(){
                loadedimages++;

                if (loadedimages<=arr.length){
                   fnLoads(loadedimages,arr.length,arr[loadedimages-1]);
                    if (loadedimages==arr.length){
                        
                        $('.loader_wrap').remove();
                        $('#y_imgs').show();
                        touchS();
                        return

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

        $('#mask').on('swipeup swipedown dragup dragdown release', function(e){
                  // e.stopPropagation();
                return false;
            
        });

        Zepto('#page_7').on('tap', function(e){
                  // e.stopPropagation();

            $('#mask').css({'display':'block'});
            $('#loader_img').css({'display':'none'});
        });

        Zepto('#mask').on('tap', function(e){
                  // e.stopPropagation();
 
            $(this).css({'display':'none'});
            $('#loader_img').css({'display':'block'});
            return false;
        });


        //touch
        function touchS(){
            var oDiv = document.getElementById('y_imgs');
            var aImg = $('#y_imgs img');
            var aImgWidth = $('#y_imgs img').width();
            var aImgHeight = $('#y_imgs img').height();
            var trlX1 = $('#mask').width()*.75*0.03;
            var trlX2 = $('#mask').width()*.75*0.06;
            var trlY1 = $('#mask').height()*.75*0.02;
            var trlY2 = $('#mask').height()*.75*0.05;
            var trlY3 = $('#mask').height()*.75*0.12; /*7.68 19.2 -46.*/
            var iNow = 0;
            var totalAngle;
            var angle = 0;
            
            function fnChange(iNow){
                aImg.eq(iNow).attr('style','display:block; -webkit-transform-origin:0px 100% 0px; -webkit-transition:all 0.5s; z-index: 3; opacity:0; -webkit-transform:translate3d(0px, '+trlY1+'px, 0px) translate3d(-150%, 0px, 0px) rotate3d(0, 0, 1, 0deg) scale3d(1, 1, 1)');
                aImg.eq(iNow+1).attr('style','display:block; -webkit-transform-origin:0px 100% 0px; -webkit-transition:all 0.5s; z-index: 2; opacity:1; -webkit-transform:translate3d(0px, '+trlY1+'px, 0px) rotate3d(0, 0, 1, 0deg) scale3d(1, 1, 1)');
                aImg.eq(iNow+2).attr('style','display:block; -webkit-transform-origin:0px 100% 0px; -webkit-transition:all 0.5s; z-index: 1; opacity:0.7; -webkit-transform:translate3d('+trlX1+'px, '+(-trlY2)+'px, 0px) rotate3d(0, 0, 1, 0deg) scale3d(0.94, 0.94, 1)');
                aImg.eq(iNow+3).attr('style','display:block; -webkit-transform-origin:0px 100% 0px; -webkit-transition:all 0.5s; z-index: 0; opacity:0.4; -webkit-transform:translate3d('+trlX2+'px, '+(-trlY3)+'px, 0px) rotate3d(0, 0, 1, 0deg) scale3d(0.88, 0.88, 1)');

                aImg.eq(iNow+4).attr({'style':'-webkit-transition:all 0.5s;opacity:0;-webkit-transform: scale3d(0.88, 0.88, 1)'})
               
            }
            
            fnChange(iNow-1);

            function reset(){
                aImg.eq(iNow).css({'-webkit-transition':'all 0s'}); 
                aImg.eq(iNow+1).css({'-webkit-transition':'all 0s'}); 
                aImg.eq(iNow+2).css({'-webkit-transition':'all 0s'});
                aImg.eq(iNow+3).css({'-webkit-transition':'all 0s'});
            }

            
            var dragBol=false;
            $('#y_imgs').on('swipeup swipedown dragup dragdown release', function(e){
                
                    return false;
                
            });
            $('#y_imgs img').on('touchstart',function(){

                return false;
            });

            $('#loader_img').css({'display':'block'});

            $('#y_imgs img').hammer().on('drag',function(ev){
            /*touch.on('#y_imgs', 'drag', function(ev){*/
                if(dragBol){
                    return
                }                
                
                reset();
                totalAngle = ev.gesture.deltaX;
                if(totalAngle<-20){
                    if(totalAngle<-135){
                        totalAngle = -135;
                    }
                    $(this).css({'-webkit-transform-origin':'100% 100% 0px','-webkit-transform':'translate3d(0px, '+trlY1+'px, 0px) rotate3d(0, 0, 1, ' + totalAngle/5 + 'deg) scale3d(1, 1, 1)' });
                    $(this).next().css({'-webkit-transform-origin':'100% 100% 0px','-webkit-transform':'translate3d('+(-trlX1)+'px, '+(-trlY2)+'px, 0px) rotate3d(0, 0, 1, ' + totalAngle/15 + 'deg) scale3d(0.94, 0.94, 1)'});
                }

            
            });

            $('#y_imgs img').hammer().on('touchend',function(ev){
            /*touch.on('#y_imgs', 'touchend', function(ev){*/
                if(dragBol){
                    return
                }
                dragBol=true;
                setTimeout(function(){
                    dragBol=false
                },600)
                if(totalAngle<-20){
                    if(iNow>=aImg.length-1){
                        $(this).css({'display':'block','-webkit-transform-origin':'0px 100% 0px','-webkit-transition':'all 0.5s','z-index': '2','opacity':'1','-webkit-transform':'translate3d(0px, '+trlY1+'px, 0px) rotate3d(0, 0, 1, 0deg) scale3d(1, 1, 1)'}); 
                        return false;
                    }
                    $(this).next().css({'-webkit-transform-origin':'-50% 150% 0px','-webkit-transform':'rotate3d(0, 0, 1, '+ totalAngle/15 +'deg)'});
                    $(this).next().next().css({'-webkit-transform-origin':'-50% 150% 0px','-webkit-transform':'rotate3d(0, 0, 1, '+ totalAngle/15 +'deg)'});
                    $(this).next().next().next().css({'-webkit-transform-origin':'-50% 150% 0px','-webkit-transform':'rotate3d(0, 0, 1, '+ totalAngle/15 +'deg)'});
                    setTimeout(function(_this){
                        fnChange(iNow);
                        iNow++;
                        $("#y_line").height((15-iNow)*5+'%');
                        var h= $(".y_line").height()-$("#y_line").height()-$('.y_lineHead').height();
                        $(".y_line").css('top',h+$(".y_line").height()*.05);
                    },30,this);
                }else{
                    if(iNow<1){
                        return false;
                    }
                    iNow--;
                    fnChange(iNow-1);
                    $("#y_line").height((15-iNow)*5+'%');
                    var h= $(".y_line").height()-$("#y_line").height()-$('.y_lineHead').height();
                    $(".y_line").css('top',h+$(".y_line").height()*.05);

                }

            });
        }

        //连线
        function links(arg,where){

            var timer;
            for(var i=0; i<arg.length; i++){

                var x=arg[i].x;
                var y=arg[i].y;         

                var newDiv=$('<div class="point"></div>');
                newDiv.appendTo(where);

                var newWidth=newDiv.width();
                var newHeight=newDiv.height();

                var w=parseInt(x)-newDiv.width()/2/$('body').width()*100+'%';

                var h=parseInt(y)-newDiv.height()/2/$('body').height()*100+'%';

                newDiv.css({left:x,top:y,width:0,height:0});

                if(i==0){
                    newDiv.css({opacity:0});
                }
                newDiv.delay().animate().css({'-webkit-transition': '.6s '+(i*.6)+'s',transition: '.6s '+(i*.6)+'s',width:newWidth,height:newHeight,left:w,top:h});
                
            }
            if(where.find('.point').length>1){
                var xx=[];
                var yy=[];
                
                for(var j=0;j<where.find('.point').length;j++){

                    xx.push(parseInt(where.find('.point').eq(j).css('left'))+where.find('.point').eq(j).width()/2);
                    yy.push(parseInt(where.find('.point').eq(j).css('top'))+where.find('.point').eq(j).height()/2);               

                }
                var z;
                function getAngle(x1, y1, x2, y2) {
                    // 直角的边长
                    var x = Math.abs(x1 - x2);
                    var y = Math.abs(y1 - y2);
                    // 斜边长
                    z = Math.sqrt(x*x + y*y);
                    // 余弦

                    var cos = y / z;
                    // 弧度
                    var radina = Math.acos(cos);
                    // 角度
                    var angle =  180 / (Math.PI / radina);

                    return angle;
                }
                where.find('.point').eq(0).remove();
                for(var j=0;j<xx.length-1;j++){

                    var a=getAngle(xx[j],yy[j],xx[j+1],yy[j+1]);
                    a-=90;
                    if(yy[j]-yy[j+1]<0){
                        a*=-1;
                    }
                    if(xx[j]-xx[j+1]>0){
                        a-=180;
                        a*=-1;
                    }
                    var newLine=$('<p class="line"></p>');
                    newLine.appendTo(where);
                    var lineH=newLine.height()/2;
                    newLine.css({transform:'rotate('+a+'deg)',width:0,transformOrigin:'left center',left:xx[j],top:yy[j]-lineH});

                    newLine.delay().animate().css({'-webkit-transition': '.6s '+(j*.6+.3)+'s',transition: '.6s '+(j*.6+.3)+'s',width:z});
                }

            }
        }
    };
})(jQuery);