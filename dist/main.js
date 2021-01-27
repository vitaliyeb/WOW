(()=>{"use strict";var t={};t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),(()=>{var i;t.g.importScripts&&(i=t.g.location+"");var e=t.g.document;if(!i&&e&&(e.currentScript&&(i=e.currentScript.src),!i)){var n=e.getElementsByTagName("script");n.length&&(i=n[n.length-1].src)}if(!i)throw new Error("Automatic publicPath is not supported in this browser");i=i.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=i})();var i=function(){function t(t){var i=this;this.game=t,this.paths={loadingWrapper:void 0},this.processing=0,this.lazyProcessing=0,this.percentage=void 0,this.loadingDrawParametrs={bottom:t.windowSize.height-t.windowSize.height/100*17,width:t.windowSize.width/100*80,left:t.windowSize.width/100*10,lineThickness:10,lineWidth:.5},this.defaultLoaders=[function(){return i.game.loadImages("./images/franceLocal.jpg","locationFrance")},function(){return i.game.loadImages("./images/egipetLocal.jpg","locationEgipet")},function(){return new Promise((function(t){return setTimeout((function(){return t(1)}),50)}))},function(){return new Promise((function(t){return setTimeout((function(){return t(2)}),100)}))},function(){return new Promise((function(t){return setTimeout((function(){return t(3)}),200)}))},function(){return new Promise((function(t){return setTimeout((function(){return t(4)}),300)}))}]}return t.prototype.init=function(t){void 0===t&&(t=this.defaultLoaders),this.game.setBackground("./images/loadingBg.jpg",!0),this.percentage=this.loadingDrawParametrs.width/100,this.loading(t),this.paintLoading(),this.loadingLoop()},t.prototype.loading=function(t){var i=this,e=100/t.length;Promise.all(t.map((function(t){return t().then((function(){return i.processing+=e}))})))},t.prototype.paintLoading=function(){if(!this.paths.loadingWrapper){var t=this.loadingDrawParametrs,i=t.left,e=t.bottom,n=t.width,o=t.lineThickness;this.paths.loadingWrapper=this.CreateRectangleBorderRadius(i,e,n,o)}this.paintDrawLoadingWrapper(),this.paintLoadingProcess()},t.prototype.loadingLoop=function(){var t=this;if(this.lazyProcessing<this.processing&&(this.lazyProcessing+=100),this.paintLoadingProcess(),this.lazyProcessing>=100)return this.game.setStatus("globalMenu");requestAnimationFrame((function(){return t.loadingLoop()}))},t.prototype.paintLoadingProcess=function(){if(!(this.processing<1)){var t=this.loadingDrawParametrs,i=t.left,e=t.bottom,n=t.lineThickness,o=t.lineWidth,a=this.game.mainContext,s=this.lazyProcessing*this.percentage,r=this.CreateRectangleBorderRadius(i,e,s,n-o-.5);a.beginPath(),a.fillStyle="#aebacd",a.fill(r)}},t.prototype.paintDrawLoadingWrapper=function(){var t=this.game.mainContext;t.beginPath(),t.fillStyle="#09082f",t.strokeStyle="#fff",t.lineWidth=this.loadingDrawParametrs.lineWidth,t.fill(this.paths.loadingWrapper),t.stroke(this.paths.loadingWrapper)},t.prototype.CreateRectangleBorderRadius=function(t,i,e,n){var o=new Path2D,a=n/2;return o.moveTo(t,i),o.quadraticCurveTo(t,i-a,t+a,i-a),o.lineTo(t+e-a,i-a),o.quadraticCurveTo(t+e,i-a,t+e,i),o.quadraticCurveTo(t+e,i+a,t+e-a,i+a),o.lineTo(t+a,i+a),o.quadraticCurveTo(t,i+a,t,i),o.closePath(),o},t}();const e=function(){function t(t){this.game=t,this.buttonPlayGradient=void 0,this.levelInfoGradient=void 0,this.locationParams={x:0,y:0,r:0,width:40,height:40},this.textPlayParametrs={bottom:0,left:0,fs:0},this.locationImg=void 0,this.paths={playButton:void 0,levelInfo:void 0,locationIcon:void 0},this.mainClick=this.mainClick.bind(this),this.menuMouseMove=this.menuMouseMove.bind(this)}return t.prototype.init=function(){this.game.clearMainCanvas(),this.game.setBackground("./images/loadingBg.jpg",!0),this.paths.playButton||(this.paths.playButton=this.createPathButtonPlay()),this.paths.levelInfo||(this.paths.levelInfo=this.createPathLevelInfo()),this.paths.locationIcon||(this.paths.locationIcon=this.createPathLocation()),this.game.screenWrapper.addEventListener("click",this.mainClick),this.game.screenWrapper.addEventListener("mousemove",this.menuMouseMove),this.menuLoop()},t.prototype.menuMouseMove=function(t){for(var i=this.game,e=i.mainContext,n=i.screenWrapper,o=this.game.getCursorPosition(t),a=o.x,s=o.y,r=0,h=Object.entries(this.paths);r<h.length;r++){var l=h[r],c=(l[0],l[1]);if(e.isPointInPath(c,a,s)){n.style.cursor="pointer";break}n.style.cursor="default"}},t.prototype.mainClick=function(t){for(var i=t.offsetX,e=t.offsetY,n=this.game.mainContext,o=0,a=Object.entries(this.paths);o<a.length;o++){var s=a[o],r=s[0],h=s[1],l=r+"OnClick";n.isPointInPath(h,i,e)&&this[l]()}},t.prototype.locationIconOnClick=function(){this.game.setStatus("location")},t.prototype.menuLoop=function(){var t=this;if("globalMenu"!==this.game.status){var i=this.game.screenWrapper;return i.removeEventListener("click",this.mainClick),void i.removeEventListener("mousemove",this.menuMouseMove)}this.game.clearMainCanvas(),this.paintButtonPlay(),this.paintLevelInfo(),this.paintLocation(),requestAnimationFrame((function(){return t.menuLoop()}))},t.prototype.paintButtonPlay=function(){var t=this.game.mainContext,i=this.textPlayParametrs,e=i.left,n=i.bottom,o=i.fs;t.beginPath(),t.fillStyle=this.buttonPlayGradient,t.fill(this.paths.playButton),t.beginPath(),t.font="500 "+o+"px Roboto",t.textBaseline="middle",t.textAlign="center",t.fillStyle="#fff",t.fillText("ИГРАТЬ",e,n)},t.prototype.createPathButtonPlay=function(){var t=this.game.windowSize,i=t.width,e=t.height,n=this.game.minMax(i/100*60,300,550),o=i/2-n/2,a=this.game.minMax(e/100*10,45,55),s=e/100*70,r=a/2,h=new Path2D;this.textPlayParametrs.bottom=s+4,this.textPlayParametrs.left=i/2,this.textPlayParametrs.fs=a-25,h.moveTo(o,s),h.quadraticCurveTo(o,s-r,o+r,s-r),h.lineTo(o+n-r,s-r),h.quadraticCurveTo(o+n,s-r,o+n,s),h.quadraticCurveTo(o+n,s+r,o+n-r,s+r),h.lineTo(o+r,s+r),h.quadraticCurveTo(o,s+r,o,s);var l=this.game.mainContext.createLinearGradient(o,s,o+n,s);return l.addColorStop(0,"#f46a49"),l.addColorStop(1,"#f652a8"),this.buttonPlayGradient=l,h},t.prototype.createPathLevelInfo=function(){var t=new Path2D,i=this.game.mainContext,e=this.game.windowSize,n=e.width,o=e.height,a=this.game.minMax(Math.min(n,o)/100*10,100,140),s=n/2,r=o/100*45,h=i.createLinearGradient(s+a,r-a,s+a,r+a);return h.addColorStop(0,"#697af3"),h.addColorStop(1,"#7d42d1"),this.levelInfoGradient=h,t.arc(s,r,a,0,2*Math.PI),t},t.prototype.createPathLocation=function(){var t=new Path2D,i=this.game.windowSize.width-60;return t.arc(i+20,40,20,0,2*Math.PI),this.locationParams.x=i,this.locationParams.y=20,this.locationParams.r=20,this.locationImg=new Image(this.locationParams.width,this.locationParams.height),this.locationImg.src="./images/location.png",t},t.prototype.paintLocation=function(){var t=this.game.mainContext,i=this.locationParams,e=i.x,n=i.y,o=i.width,a=i.height,s=this.locationImg;t.beginPath(),t.fillStyle="transparent",t.fill(this.paths.locationIcon),t.beginPath(),t.drawImage(s,e,n,o,a)},t.prototype.paintLevelInfo=function(){var t=this.paths.levelInfo,i=this.game.mainContext;i.save(),i.beginPath(),i.shadowColor="#f8f9d6",i.shadowBlur=50,i.fillStyle=this.levelInfoGradient,i.fill(t),i.restore()},t}(),n=function(){function t(t){this.game=t,this.headingGradient=void 0,this.animateFrameId=void 0,this.headingHeight=60,this.backPath=void 0,this.fullHeightLevels=void 0,this.scrolTop=0,this.cardSize={width:this.game.minMax(300,this.game.windowSize.width/100*50,500),height:250},this.locationActivePaths=[],this.cardBottomPadding=15,this.heightVisibleDivision=this.game.windowSize.height-this.headingHeight,this.mouseMove=this.mouseMove.bind(this),this.click=this.click.bind(this),this.scrollLocationCard=this.scrollLocationCard.bind(this)}return t.prototype.fillBackground=function(){var t=this.game,i=t.backgroundContext,e=t.windowSize,n=e.width,o=e.height;i.beginPath(),i.fillStyle="#606fe4",i.fillRect(0,0,n,o)},t.prototype.paintHeader=function(){var t=this.game.mainContext,i=this.headingHeight,e=this.game.windowSize.width;t.save(),t.beginPath(),t.fillStyle=this.headingGradient,t.shadowColor="#3a4c8d",t.shadowOffsetY=0,t.shadowBlur=15,t.fillRect(0,0,e,i),t.font="500 24px Roboto",t.textBaseline="middle",t.textAlign="center",t.fillStyle="#fff",t.fillText("ИССЛЕДОВАТЬ",this.game.windowSize.width/2,this.headingHeight/2),t.beginPath(),t.lineWidth=5,t.lineCap="round",t.strokeStyle="#fff",t.stroke(this.backPath),t.restore()},t.prototype.createBackPath=function(){var t=new Path2D;return t.moveTo(35,15),t.lineTo(20,30),t.lineTo(35,45),t},t.prototype.mouseMove=function(t){var i=this.game.getCursorPosition(t),e=i.x,n=i.y,o=this.game.mainContext;this.game.screenWrapper.style.cursor=o.isPointInPath(this.backPath,e,n)?"pointer":"default"},t.prototype.click=function(t){var i=this.game.getCursorPosition(t),e=i.x,n=i.y;this.game.mainContext.isPointInPath(this.backPath,e,n)&&(cancelAnimationFrame(this.animateFrameId),this.clearEventListeners(),this.game.setStatus("globalMenu"))},t.prototype.scrollLocationCard=function(t){if(this.scrolTop+=t.deltaY/7,this.scrolTop>0)return this.scrolTop=0;var i=this.fullHeightLevels-(window.innerHeight-this.headingHeight);i<Math.abs(this.scrolTop)&&(this.scrolTop=-i)},t.prototype.clearEventListeners=function(){var t=this.game.screenWrapper;t.removeEventListener("mousemove",this.mouseMove),t.removeEventListener("click",this.click),t.style.cursor="default"},t.prototype.locationLoop=function(){var t=this;this.game.clearMainCanvas(),this.getVisibleCard(),this.paintHeader(),this.animateFrameId=requestAnimationFrame((function(){return t.locationLoop()}))},t.prototype.getVisibleCard=function(){var t=this,i=this.scrolTop,e=this.headingHeight,n=this.cardBottomPadding,o=this.cardSize.height,a=this.game.user.levels.countries,s=-o+e,r=window.innerHeight,h=(this.game.windowSize.width-this.cardSize.width)/2;a.reduce((function(i,a,l){var c=i+(l?o+n:e)+5;return c>r||c<s||(t.paintCard(c,h,o,a),t.paintSections(c,h+20,a)),c}),i)},t.prototype.paintCard=function(t,i,e,n){var o=this.game.mainContext,a=this.cardSize.width,s=this.createRect(i,t,a,e,15);o.save(),o.beginPath(),o.clip(s),o.drawImage(this.game.imagesStore[n.imageName],i,t,a,e),o.restore()},t.prototype.paintSections=function(t,i,e){var n=this,o=this.game.mainContext;o.font="11px roboto",o.textAlign="left",e.sights.reduce((function(t,e){var a=n.createRect(i+10,t,130,25,12.5);return o.fillStyle="#ea5c01",o.fill(a),o.fillStyle="#fff",o.fillText(e.title,i+10+7,t+12.5,90),t+25+10}),t+20)},t.prototype.createRect=function(t,i,e,n,o){var a=new Path2D;return a.moveTo(t+o,i),a.lineTo(t+e-o,i),a.quadraticCurveTo(t+e,i,t+e,i+o),a.lineTo(t+e,i+n-o),a.quadraticCurveTo(t+e,i+n,t+e-o,i+n),a.lineTo(t+o,i+n),a.quadraticCurveTo(t,i+n,t,i+n-o),a.lineTo(t,i+o),a.quadraticCurveTo(t,i,t+o,i),a},t.prototype.init=function(){if(this.fillBackground(),!this.headingGradient){var t=this.game.mainContext.createLinearGradient(0,0,0,this.headingHeight);t.addColorStop(0,"#6571dd"),t.addColorStop(1,"#394d90"),this.headingGradient=t}this.fullHeightLevels||(this.fullHeightLevels=this.game.user.levels.countries.length*(this.cardSize.height+20)),this.backPath||(this.backPath=this.createBackPath()),this.game.screenWrapper.addEventListener("mousemove",this.mouseMove),this.game.screenWrapper.addEventListener("click",this.click),document.addEventListener("wheel",this.scrollLocationCard),this.locationLoop()},t}();var o=function(){function t(){this.countries=[{country:"ЕГИПЕТ",imageName:"locationEgipet",status:"done",sights:[{title:"ПИРАМИДЫ ГИЗЫ",status:"",levels:[{words:["Сон","Нос"],letters:["C","О","Н"]}]},{title:"БОЛЬШОЙ СФИНКС",status:"",levels:[{words:["Сон","Нос"],letters:["C","О","Н"]}]},{title:"КРАСНОЕ МОРЕ",status:"",levels:[{words:["Сон","Нос"],letters:["C","О","Н"]}]}]},{country:"египет",imageName:"locationFrance",status:"done",sights:[{title:"Пирамиды гизы",status:"",levels:[{words:["Сон","Нос"],letters:["C","О","Н"]}]}]}]}return t.prototype.getLevel=function(t){return this.countries[t]},t}(),a=function(t){this.game=t,this.level=0,this.levels=new o},s=function(){function t(){this.canvasBackground=void 0,this.screenWrapper=void 0,this.canvasMain=void 0,this.backgroundContext=void 0,this.mainContext=void 0,this.location=void 0,this.user=void 0,this.windowSize={width:0,height:0},this.imagesStore={},this.status="loadingTheGame",this.loadingGameStages=void 0,this.globalMenu=void 0}return t.prototype.init=function(){this.canvasBackground=document.querySelector("#canvas-bg"),this.canvasMain=document.querySelector("#canvas-main"),this.backgroundContext=this.canvasBackground.getContext("2d"),this.mainContext=this.canvasMain.getContext("2d"),this.screenWrapper=document.querySelector(".screen"),this.user=new a(this),this.setFullSize(),this.loadingGameStages=new i(this),this.globalMenu=new e(this),this.location=new n(this),this.runInitScene()},t.prototype.setStatus=function(t){this.status=t,this.runInitScene()},t.prototype.setFullSize=function(){var t=document.querySelector(".screen"),i=t.clientWidth,e=t.clientHeight;this.windowSize.width=i,this.windowSize.height=e;for(var n=0,o=[this.canvasBackground,this.canvasMain];n<o.length;n++){var a=o[n];a.width=i,a.height=e}},t.prototype.runInitScene=function(){switch(this.status){case"loadingTheGame":this.loadingGameStages.init();break;case"globalMenu":this.globalMenu.init();break;case"location":this.location.init()}},t.prototype.clearMainCanvas=function(){var t=this.mainContext;t.beginPath(),t.clearRect(0,0,this.windowSize.width,this.windowSize.height)},t.prototype.loadImages=function(t,i){var e=this,n=new Image(2e3,2e3);return new Promise((function(o,a){n.src=t,n.onload=function(){return e.imagesStore[i]=n,o(n)}}))},t.prototype.setBackground=function(t,i){var e=new Image,n=this.backgroundContext,o=this.windowSize,a=o.width,s=o.height;console.log("wqewqe"),e.src=t,e.onload=function(){if(a>=s?n.drawImage(e,0,0,a,s*(a/s)):n.drawImage(e,0,0,a*(s/a),s),i){var t=a/2,o=s/100*15;n.beginPath(),n.font="500 40px Roboto",n.textBaseline="middle",n.textAlign="center",n.fillStyle="#fff",n.fillText("Words of wonders",t,o)}}},t.prototype.getCursorPosition=function(t){return{x:t.offsetX,y:t.offsetY}},t.prototype.minMax=function(t,i,e){return t>i&&e>t?t:t>e?e:t<i?i:void 0},t}();window.addEventListener("load",(function(){(new s).init()}),!1),t.p,t.p})();