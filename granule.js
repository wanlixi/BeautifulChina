

window.fnGranule = function (ID,opt){

	var blo = true;

	var oWindowW = document.body.clientWidth;
	var oWindowH = document.body.clientHeight;
	var oC = document.getElementById(ID);	
	var optWidth = toNun(opt.width,'width')|| toNun(oWindowW/2) ;
	//var optHeight = toNun(opt.height,'height')|| oWindowH/2 ;

	var settings = {                    //默认参数
			url : 'ml.png',
			width : optWidth,
			height : optWidth,
			left : toNun(oWindowW/2-optWidth/2),
			top : toNun(oWindowH/2-optWidth/2)
		};
	
	extend( settings , opt );

	oC.setAttribute('width', oWindowW+"px");
	oC.setAttribute('height', oWindowH+"px");
	oC.style.position = "absolute";
	oC.style.top = "0";
	oC.style.left = "0";

	loadImgs(
		settings.url
	, function (img){
		
		
		show(img,settings.width,settings.height,settings.left,settings.top,1,1);
		
		
		function show(yImg,dw,dh,dx,dy,iN,iR){

					
			var oGC = oC.getContext('2d');
			
			var w = yImg.width;
			var h = yImg.height;

			oGC.globalAlpha = 1;
			oGC.drawImage(yImg , 0, 0, w, h, dx, dy, dw, dh);
			
			var imageData = oGC.getImageData(dx, dy, dw, dh);
			
			oGC.clearRect(0,0,oC.width,oC.height);
			
			var arr = [];
			var iNum = 0;
			var allBall = [];
			
			for(var i=0;i<imageData.height;i++){
				for(var j=0;j<imageData.width;j++){
					
					var color = getXY( imageData , j , i );
					
					if( color[3] > 0 ){
						arr.push([j,i]);
					}
					
				}
			}

			for(var i=0;i<arr.length;i++){
							
				allBall.push({
					x : Math.floor(Math.random()*oC.width),
					y : Math.floor(Math.random()*oC.width),
					r : 1,
					a : 0
				});
				
			}
			
			arr.sort(function(num1,num2){
				return Math.random() - 0.5;
			});
			

			var timer1 = setInterval(function(){
				
				for(var i=0;i<Math.min(allBall.length,arr.length);i++){
					startMove(allBall[i],{x:arr[i][0]*iN+dx,y:arr[i][1]*iN+dy,r:iR,a:100});

				}
				fnDraw(oGC,arr,imageData,allBall);
				
			},1000/60);

			
			function startMove(obj,json){
				
				for(var attr in json){
					
					var iSpeed = (json[attr] - obj[attr])/6;
					iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
					
					obj[attr] += iSpeed;
					
				}
				
			}
			setTimeout(function(){
				clearInterval(timer1);
				oGC.clearRect(0,0,oC.width,oC.height);
				/*oGC.globalAlpha = 1;
				oGC.drawImage(yImg , 0, 0, w, h, dx, dy, dw, dh);*/				
			},2000);

		}
		
	});
	
	
	function loadImgs(oImg, fnSucc){
		
			var yImg = new Image();
			
			yImg.src = oImg;
			
			yImg.onload = function(){
		
				fnSucc(yImg);

			};
	}
	
	function getXY(obj,x,y){
		
		var data = obj.data;
		var w = obj.width;
		var h = obj.height;
		
		var color = [];
		
		color[0] = data[ 4*(w*y+x) ];
		color[1] = data[ 4*(w*y+x) + 1 ];
		color[2] = data[ 4*(w*y+x) + 2 ];
		color[3] = data[ 4*(w*y+x) + 3 ];
		
		return color;
		
	}

	function extend(obj1,obj2){
		for(var attr in obj2){
			if(attr != 'url'){
				obj1[attr] = toNun(obj2[attr],attr);
			}else{
				obj1[attr] = obj2[attr];
			}
			
		}
	}

	function toNun(str,attr){
		
			if(typeof str === 'string'){
				if(str.indexOf('%') != -1){
					
					if(attr == 'width'||attr == 'left'){
						return parseInt(parseInt(str)/100*oWindowW);
					}else if(attr == 'height'||attr == 'top'){
						return parseInt(parseInt(str)/100*oWindowH);
					}
					
				}else {
					return parseInt(str);
				}
			}else {
					return parseInt(str);
				}
		
		
	}

	function fnDraw(oGC,arr,imageData,allBall){
		oGC.clearRect(0,0,oC.width,oC.height);
		for(var i=0;i<allBall.length;i++){

			if(i%2==0){

				var Rgb = arr[i]?getXY( imageData , arr[i][0] , arr[i][1] ):(255,255,255,0);
				oGC.fillStyle = 'rgba('+Rgb[0]+','+Rgb[1]+','+Rgb[2]+','+Rgb[3]/255+')'; 
				oGC.strokeStyle = '#000';
				oGC.lineWidth = 0.5;
				//oGC.fillStyle = 'white';
				oGC.beginPath();
				oGC.globalAlpha = allBall[i].a/100;
				//oGC.arc(allBall[i].x,allBall[i].y,allBall[i].r,0,360*Math.PI/180,false);
				oGC.rect(allBall[i].x,allBall[i].y,allBall[i].r,allBall[i].r);
				oGC.closePath();
				oGC.fill();
				//oGC.stroke();
			}
		}


	}


}	

	