(()=>{"use strict";var t={};t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var i=t.g.document;if(!e&&i&&(i.currentScript&&(e=i.currentScript.src),!e)){var n=i.getElementsByTagName("script");n.length&&(e=n[n.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})();var e=function(){function t(t){var e=this;this.game=t,this.paths={loadingWrapper:void 0},this.processing=0,this.lazyProcessing=0,this.percentage=void 0,this.loadingDrawParametrs={bottom:t.windowSize.height-t.windowSize.height/100*17,width:t.windowSize.width/100*80,left:t.windowSize.width/100*10,lineThickness:10,lineWidth:.5},this.defaultLoaders=[function(){return e.game.loadImages("./images/giza.jpg","gizaBg")},function(){return e.game.loadImages("./images/check.png","check")},function(){return e.game.loadImages("./images/checkGreen.png","checkGreen")},function(){return e.game.loadImages("./images/search.png","searchIcon")},function(){return e.game.loadImages("./images/question.png","questoin")},function(){return e.game.loadImages("./images/franceLocal.jpg","locationFrance")},function(){return e.game.loadImages("./images/egipetLocal.jpg","locationEgipet")},function(){return e.game.loadImages("./images/bigSfinxBg.svg","bigSfinxBg")},function(){return e.game.loadImages("./images/lock.svg","lockIcon")}]}return t.prototype.init=function(t){void 0===t&&(t=this.defaultLoaders),this.game.setBackground("mainBg",!0),this.percentage=this.loadingDrawParametrs.width/100,this.loading(t),this.paintLoading(),this.loadingLoop()},t.prototype.loading=function(t){var e=this,i=100/t.length;Promise.all(t.map((function(t){return t().then((function(){return e.processing+=i}))})))},t.prototype.paintLoading=function(){if(!this.paths.loadingWrapper){var t=this.loadingDrawParametrs,e=t.left,i=t.bottom,n=t.width,a=t.lineThickness;this.paths.loadingWrapper=this.CreateRectangleBorderRadius(e,i,n,a)}this.paintDrawLoadingWrapper(),this.paintLoadingProcess()},t.prototype.loadingLoop=function(){var t=this;if(this.lazyProcessing<this.processing&&(this.lazyProcessing+=50),this.paintLoadingProcess(),this.lazyProcessing>=100)return this.game.setStatus("globalMenu");requestAnimationFrame((function(){return t.loadingLoop()}))},t.prototype.paintLoadingProcess=function(){if(!(this.processing<1)){var t=this.loadingDrawParametrs,e=t.left,i=t.bottom,n=t.lineThickness,a=t.lineWidth,o=this.game.mainContext,s=this.lazyProcessing*this.percentage,r=this.CreateRectangleBorderRadius(e,i,s,n-a-.5);o.beginPath(),o.fillStyle="#aebacd",o.fill(r)}},t.prototype.paintDrawLoadingWrapper=function(){var t=this.game.mainContext;t.beginPath(),t.fillStyle="#09082f",t.strokeStyle="#fff",t.lineWidth=this.loadingDrawParametrs.lineWidth,t.fill(this.paths.loadingWrapper),t.stroke(this.paths.loadingWrapper)},t.prototype.CreateRectangleBorderRadius=function(t,e,i,n){var a=new Path2D,o=n/2;return a.moveTo(t,e),a.quadraticCurveTo(t,e-o,t+o,e-o),a.lineTo(t+i-o,e-o),a.quadraticCurveTo(t+i,e-o,t+i,e),a.quadraticCurveTo(t+i,e+o,t+i-o,e+o),a.lineTo(t+o,e+o),a.quadraticCurveTo(t,e+o,t,e),a.closePath(),a},t}();const i=function(){function t(t){this.game=t,this.buttonPlayGradient=void 0,this.levelInfoGradient=void 0,this.locationParams={x:0,y:0,r:0,width:40,height:40},this.textPlayParametrs={bottom:0,left:0,fs:0},this.locationImg=void 0,this.paths={playButton:void 0,levelInfo:void 0,locationIcon:void 0},this.mainClick=this.mainClick.bind(this),this.menuMouseMove=this.menuMouseMove.bind(this)}return t.prototype.init=function(){this.game.clearMainCanvas(),this.game.setBackground("mainBg",!0),this.paths.playButton||(this.paths.playButton=this.createPathButtonPlay()),this.paths.levelInfo||(this.paths.levelInfo=this.createPathLevelInfo()),this.paths.locationIcon||(this.paths.locationIcon=this.createPathLocation()),this.game.screenWrapper.addEventListener("click",this.mainClick),this.game.screenWrapper.addEventListener("mousemove",this.menuMouseMove),this.menuLoop()},t.prototype.menuMouseMove=function(t){for(var e=this.game,i=e.mainContext,n=e.screenWrapper,a=this.game.getCursorPosition(t),o=a.x,s=a.y,r=0,h=Object.entries(this.paths);r<h.length;r++){var l=h[r],c=(l[0],l[1]);if(i.isPointInPath(c,o,s)){n.style.cursor="pointer";break}n.style.cursor="default"}},t.prototype.mainClick=function(t){for(var e=t.offsetX,i=t.offsetY,n=this.game.mainContext,a=0,o=Object.entries(this.paths);a<o.length;a++){var s=o[a],r=s[0],h=s[1],l=r+"OnClick";n.isPointInPath(h,e,i)&&this[l]()}},t.prototype.locationIconOnClick=function(){this.game.setStatus("location")},t.prototype.playButtonOnClick=function(){this.game.screenWrapper.style.cursor="default",this.game.setStatus("game")},t.prototype.menuLoop=function(){var t=this;if("globalMenu"!==this.game.status){var e=this.game.screenWrapper;return e.removeEventListener("click",this.mainClick),void e.removeEventListener("mousemove",this.menuMouseMove)}this.game.clearMainCanvas(),this.paintButtonPlay(),this.paintLevelInfo(),this.paintLocation(),requestAnimationFrame((function(){return t.menuLoop()}))},t.prototype.paintButtonPlay=function(){var t=this.game.mainContext,e=this.textPlayParametrs,i=e.left,n=e.bottom,a=e.fs;t.beginPath(),t.fillStyle=this.buttonPlayGradient,t.fill(this.paths.playButton),t.beginPath(),t.font="500 "+a+"px Roboto",t.textBaseline="middle",t.textAlign="center",t.fillStyle="#fff",t.fillText("ИГРАТЬ",i,n)},t.prototype.createPathButtonPlay=function(){var t=this.game.windowSize,e=t.width,i=t.height,n=this.game.minMax(e/100*60,300,550),a=e/2-n/2,o=this.game.minMax(i/100*10,45,55),s=i/100*70,r=o/2,h=new Path2D;this.textPlayParametrs.bottom=s+4,this.textPlayParametrs.left=e/2,this.textPlayParametrs.fs=o-25,h.moveTo(a,s),h.quadraticCurveTo(a,s-r,a+r,s-r),h.lineTo(a+n-r,s-r),h.quadraticCurveTo(a+n,s-r,a+n,s),h.quadraticCurveTo(a+n,s+r,a+n-r,s+r),h.lineTo(a+r,s+r),h.quadraticCurveTo(a,s+r,a,s);var l=this.game.mainContext.createLinearGradient(a,s,a+n,s);return l.addColorStop(0,"#f46a49"),l.addColorStop(1,"#f652a8"),this.buttonPlayGradient=l,h},t.prototype.createPathLevelInfo=function(){var t=new Path2D,e=this.game.mainContext,i=this.game.windowSize,n=i.width,a=i.height,o=this.game.minMax(Math.min(n,a)/100*10,100,140),s=n/2,r=a/100*45,h=e.createLinearGradient(s+o,r-o,s+o,r+o);return h.addColorStop(0,"#697af3"),h.addColorStop(1,"#7d42d1"),this.levelInfoGradient=h,t.arc(s,r,o,0,2*Math.PI),t},t.prototype.createPathLocation=function(){var t=new Path2D,e=this.game.windowSize.width-60;return t.arc(e+20,40,20,0,2*Math.PI),this.locationParams.x=e,this.locationParams.y=20,this.locationParams.r=20,this.locationImg=new Image(this.locationParams.width,this.locationParams.height),this.locationImg.src="./images/location.png",t},t.prototype.paintLocation=function(){var t=this.game.mainContext,e=this.locationParams,i=e.x,n=e.y,a=e.width,o=e.height,s=this.locationImg;t.beginPath(),t.fillStyle="transparent",t.fill(this.paths.locationIcon),t.beginPath(),t.drawImage(s,i,n,a,o)},t.prototype.paintLevelInfo=function(){var t=this.paths.levelInfo,e=this.game.mainContext;e.save(),e.beginPath(),e.shadowColor="#f8f9d6",e.shadowBlur=50,e.fillStyle=this.levelInfoGradient,e.fill(t),e.restore()},t}(),n=function(){function t(t){this.game=t,this.title=null,this.levels=t.user.levels,this.levelData=null,this.map=null,this.headingData={height:50,headingTextData:this.game.minMax(this.game.windowSize.width/100*3,18,24)+"px Roboto",backIcon:{width:15,height:25,lineWidth:6}},this.backPath=null,this.tableOtions=null,this.enteredTeextData=null,this.temporaryWord="",this.inputLetters=[],this.historyAddLetter=[],this.preDone=!1,this.letterTransformK=0,this.mouseMove=this.mouseMove.bind(this),this.click=this.click.bind(this),this.onMouseDown=this.onMouseDown.bind(this),this.mouseUp=this.mouseUp.bind(this)}return t.prototype.mouseMove=function(t){var e=this.game.getCursorPosition(t),i=e.x,n=e.y,a=this.game.mainContext,o=this.letterPaths.find((function(t){return a.isPointInPath(t.path,i,n)})),s=this.game.screenWrapper;if(this.inputLetters.length&&(this.mouseData={x:i,y:n},o)){if(!o.isSelect)return o.isSelect=!0,this.temporaryWord+=o.letter,this.inputLetters.push({x:o.x,y:o.y}),this.historyAddLetter.push(o);o===this.historyAddLetter[this.historyAddLetter.length-2]&&(this.inputLetters.pop(),this.historyAddLetter.pop().isSelect=!1,this.temporaryWord=this.temporaryWord.slice(0,-1))}return o||a.isPointInStroke(this.backPath,i,n)?s.style.cursor="pointer":s.style.cursor="default"},t.prototype.click=function(t){var e=this.game.getCursorPosition(t),i=e.x,n=e.y;this.game.mainContext.isPointInStroke(this.backPath,i,n)&&(this.clearStage(),this.game.setStatus("globalMenu"))},t.prototype.checkWordInTable=function(){var t=this,e=this.temporaryWord,i=this.levelData.keyData[e];if(i){var n=i.direction,a=i.col,o=i.row,s=e.split("");if(i.selected=!0,"down"===n&&s.forEach((function(e,i){return t.map[o+i][a]=e})),"right"===n&&s.forEach((function(e,i){return t.map[o][a+i]=e})),Object.values(this.levelData.keyData).every((function(t){return t.selected})))return this.preDone=!0}},t.prototype.passed=function(){var t=this,e=this.game,i=e.mainContext,n=e.windowSize,a=n.width,o=n.height,s="ВЕЛИКОЛЕПНО";i.beginPath(),i.fillStyle="#cd2b58",i.fillRect(0,(o-50)/2,a,50),i.fillStyle="#fff",i.textAlign="center",i.textBaseline="middle",i.font="bold 22px Roboto";var r=i.measureText(s).width,h=this.letterTransformK+=.15,l=s.split(""),c=(a-r-l.length*h)/2;l.forEach((function(t,e){i.fillText(t,c+15*e+h*e,o/2)})),h>15&&(this.clearStage(),setTimeout((function(){t.game.setStatus("endOfLevel")}),750))},t.prototype.clearStage=function(){cancelAnimationFrame(this.requestId),document.removeEventListener("mousemove",this.mouseMove),document.removeEventListener("click",this.click),document.removeEventListener("mousedown",this.onMouseDown),document.removeEventListener("mouseup",this.mouseUp)},t.prototype.onMouseDown=function(t){var e=this.game.getCursorPosition(t),i=e.x,n=e.y,a=this.game.mainContext,o=this.letterPaths.find((function(t){return a.isPointInPath(t.path,i,n)}));o&&(this.historyAddLetter.push(o),this.inputLetters.push({x:o.x,y:o.y}),o.isSelect=!0,this.temporaryWord=o.letter,this.mouseData={x:i,y:n})},t.prototype.init=function(){this.preDone=!1,this.setDataGame(),this.setParamsTableOptions(),this.setEnteredTeextData(),this.initArcData(),this.loop(),document.addEventListener("mousemove",this.mouseMove),document.addEventListener("click",this.click),document.addEventListener("mousedown",this.onMouseDown),document.addEventListener("mouseup",this.mouseUp)},t.prototype.mouseUp=function(){this.checkWordInTable(),this.inputLetters=[],this.letterPaths.forEach((function(t,e,i){return i[e].isSelect=!1})),this.historyAddLetter=[],this.temporaryWord=""},t.prototype.paintLine=function(){var t=this.game.mainContext,e=this.mouseData,i=e.x,n=e.y;t.beginPath(),t.strokeStyle="#e42e61",t.lineWidth=7,this.inputLetters.forEach((function(e){var i=e.x,n=e.y;t.lineTo(i,n)})),t.lineTo(i,n),t.stroke()},t.prototype.paintArcLetters=function(){var t=this.arcData,e=t.cy,i=t.cx,n=(t.width,t.height,t.r),a=(t.insideRadius,t.letterStep,t.insideFs),o=this.game.mainContext;o.beginPath(),o.shadowBlur=5,o.shadowColor="#9ba1b7",o.fillStyle="#d9dbe0cf",o.arc(i,e,n,0,2*Math.PI),o.fill(),o.shadowBlur=0,this.inputLetters.length&&this.paintLine(),this.letterPaths.map((function(t){var e=t.letter,i=t.path,n=t.x,s=t.y,r=t.isSelect;r&&(o.fillStyle="#e42e61",o.fill(i)),o.font="bold "+a+"px Roboto",o.fillStyle=r?"#fff":"#18416a",o.fillText(e,n,s+.1*a),o.beginPath()}))},t.prototype.initArcData=function(){var t=this.game.windowSize,e=t.width,i=t.height,n=(this.game.mainContext,this.game.minMax),a=Math.min(n(e/100*80,250,900),n(i/100*40,250,500)),o=this.enteredTeextData.y+this.enteredTeextData.height+15,s=a/2,r=s/4,h=(e-a)/2+s,l=o+s,c=s-15-r/2,u=2*Math.PI/this.levelData.letters.length;this.arcData={width:a,height:a,r:s,letterSpace:0,cx:h,cy:l,y:o,insideFs:r,insideRadius:c,letterStep:u},this.letterPaths=this.levelData.letters.map((function(t,e){var i=new Path2D,n=h+c*Math.sin(e*u),a=l+c*Math.cos(e*u);return i.arc(n,a,r,0,2*Math.PI),{letter:t,path:i,x:n,y:a,isSelect:!1}}))},t.prototype.loop=function(){var t=this;this.requestId=requestAnimationFrame((function(){return t.loop()})),this.game.clearMainCanvas(),this.paintHeading(),this.paintGrid(),this.paintArcLetters(),this.temporaryWord.length&&this.paintInputsWord(),this.preDone&&this.passed()},t.prototype.setEnteredTeextData=function(){var t=this.tableOtions,e=t.height,i=t.y;this.enteredTeextData={outside:20,height:30,y:i+e+20}},t.prototype.setDataGame=function(){var t=this.game.user,e=this.levels.countries,i=t.levelData,n=i.countries,a=i.sights,o=i.playId,s=e[n].sights[a].handler;this.letterTransformK=0,this.title=s.heading,this.bgImageId=s.img,this.levelData=e[n].sights[a].levels[o],this.map=this.createKeysMap(),this.game.setBackground(this.bgImageId)},t.prototype.setParamsTableOptions=function(){var t=this.game.minMax,e=this.map,i=this.game.windowSize,n=i.width,a=i.height,o=e.length,s=e[0].length,r=Math.min(t(n/100*80,250,900),t(a/100*40,250,500)),h=Math.max(o,s),l=(r-4*(h-1))/h,c=l*s+4*(s-1),u=l*o+4*(o-1);this.tableOtions={rowCount:o,colCount:s,width:c,height:u,x:(n-c)/2,y:this.headingData.height+25,gap:4,cellSize:l,borderRadius:5}},t.prototype.paintGrid=function(){var t=this.tableOtions,e=t.x,i=t.y,n=t.rowCount,a=t.colCount,o=t.cellSize,s=t.gap,r=t.borderRadius,h=this.game.mainContext,l=this.map;h.beginPath(),h.font=o/1.6+"px Roboto";for(var c=0;c<n;c++)for(var u=0;u<a;u++){var d=e+o*u+s*u,g=i+o*c+s*c,m=l[c][u];if(h.shadowBlur=2,h.shadowColor="#b1adad59",m&&"boolean"==typeof m){h.fillStyle="#ebe9e9";var p=this.game.createRect(d,g,o,o,r);h.fill(p)}"string"==typeof m&&(h.fillStyle="#e42e61",p=this.game.createRect(d,g,o,o,r),h.fill(p),h.shadowBlur=0,h.fillStyle="#ebe9e9",h.fillText(m,d+o/2,g+o/1.8))}},t.prototype.paintInputsWord=function(){var t=this.game.mainContext,e=this.game.windowSize.width,i=this.enteredTeextData,n=i.height,a=i.y,o=this.temporaryWord;t.font="bold "+.8*n+"px Roboto";var s=t.measureText(o).width;t.fillStyle="#d72a46",t.fill(this.game.createRect((e-s)/2-14,a,s+28,n,n/2)),t.fillStyle="#ebe9e9",t.fillText(o,e/2,a+n/2+.06*n)},t.prototype.paintHeading=function(){var t=this.game.mainContext,e=this.headingData,i=e.height,n=e.headingTextData,a=this.game.windowSize.width;if(!this.backPath){var o=new Path2D,s=this.headingData.backIcon,r=s.width,h=s.height,l=s.lineWidth,c=(i-h)/2;t.lineWidth=l,o.moveTo(30+r,c),o.lineTo(30,c+h/2),o.lineTo(30+r,c+h),this.backPath=o}t.lineCap="round",t.strokeStyle="#fff",t.stroke(this.backPath),t.font=n,t.textBaseline="middle",t.textAlign="center",t.fillStyle="#fff",t.fillText(this.title+" ● "+this.game.user.levelCount,a/2,i/2)},t.prototype.createKeysMap=function(){var t=this.levelData.keyData,e=null,i=Object.entries(t),n=[1],a=[1];return i.forEach((function(t){var e=t[0],i=t[1];"down"===i.direction&&n.push(i.row+e.length),"right"===i.direction&&a.push(i.col+e.length)})),e=Array(Math.max.apply(Math,n)).fill(0).map((function(){return Array(Math.max.apply(Math,a)).fill(!1)})),i.forEach((function(t){var i=t[0],n=t[1],a=n.direction,o=n.row,s=n.col;if("down"==a)for(var r=o,h=o+i.length,l=r;l<h;l++)e[l][s]=!0;if("right"==a){r=s,h=s+i.length;for(var c=r;c<h;c++)e[o][c]=!0}})),e},t}(),a=function(){function t(t){this.game=t,this.headingGradient=void 0,this.animateFrameId=void 0,this.headingHeight=60,this.backPath=void 0,this.fullHeightLevels=void 0,this.scrolTop=0,this.eventStore=[],this.sectionStatusIcons={done:"check",process:"searchIcon",block:"lockIcon"},this.cardSize={width:this.game.minMax(300,this.game.windowSize.width/100*50,500),height:250},this.cursorPosition={x:0,y:0},this.locationActivePaths=[],this.cardBottomPadding=15,this.heightVisibleDivision=this.game.windowSize.height-this.headingHeight,this.mouseMove=this.mouseMove.bind(this),this.click=this.click.bind(this),this.scrollLocationCard=this.scrollLocationCard.bind(this)}return t.prototype.fillBackground=function(){var t=this.game,e=t.backgroundContext,i=t.windowSize,n=i.width,a=i.height;e.beginPath(),e.fillStyle="#606fe4",e.fillRect(0,0,n,a)},t.prototype.paintHeader=function(){var t=this.game.mainContext,e=this.headingHeight,i=this.game.windowSize.width;t.save(),t.beginPath(),t.fillStyle=this.headingGradient,t.shadowColor="#3a4c8d",t.shadowOffsetY=0,t.shadowBlur=15,t.fillRect(0,0,i,e),t.font="500 24px Roboto",t.textBaseline="middle",t.textAlign="center",t.fillStyle="#fff",t.fillText("ИССЛЕДОВАТЬ",this.game.windowSize.width/2,this.headingHeight/2),t.beginPath(),t.lineWidth=5,t.lineCap="round",t.strokeStyle="#fff",t.stroke(this.backPath),t.restore()},t.prototype.createBackPath=function(){var t=new Path2D;return this.game.mainContext.lineWidth=7,t.moveTo(35,15),t.lineTo(20,30),t.lineTo(35,45),t},t.prototype.mouseMove=function(t){var e=this.game.getCursorPosition(t),i=e.x,n=e.y;this.cursorPosition.x=i,this.cursorPosition.y=n},t.prototype.click=function(t){var e=this.game.getCursorPosition(t),i=e.x,n=e.y,a=this.game.mainContext;if(a.isPointInStroke(this.backPath,i,n))return cancelAnimationFrame(this.animateFrameId),this.clearEventListeners(),this.game.setStatus("globalMenu");var o=this.eventStore.filter((function(t){return a.isPointInPath(t.path,i,n)})).pop();null==o||o.handler()},t.prototype.scrollLocationCard=function(t){if(this.scrolTop+=t.deltaY/7,this.scrolTop>0)return this.scrolTop=0;var e=this.fullHeightLevels-(window.innerHeight-this.headingHeight);e<Math.abs(this.scrolTop)&&(this.scrolTop=-e)},t.prototype.clearEventListeners=function(){this.eventStore=[];var t=this.game.screenWrapper;t.removeEventListener("mousemove",this.mouseMove),t.removeEventListener("click",this.click),t.style.cursor="default"},t.prototype.checkPathInCursorPosition=function(t,e){var i=this.game.mainContext,n=this.game.screenWrapper;return i.isPointInStroke(this.backPath,t,e)||this.eventStore.some((function(n){return i.isPointInPath(n.path,t,e)}))?n.style.cursor="pointer":void(n.style.cursor="default")},t.prototype.locationLoop=function(){var t=this;this.eventStore=[],this.game.clearMainCanvas(),this.getVisibleCard(),this.paintHeader(),this.checkPathInCursorPosition(this.cursorPosition.x,this.cursorPosition.y),this.animateFrameId=requestAnimationFrame((function(){return t.locationLoop()}))},t.prototype.getVisibleCard=function(){var t=this,e=this.scrolTop,i=this.headingHeight,n=this.cardBottomPadding,a=this.cardSize.height,o=this.game.user.levels.countries,s=-a+i,r=window.innerHeight,h=(this.game.windowSize.width-this.cardSize.width)/2;o.reduce((function(e,o,l){var c=e+(l?a+n:i)+5;return c>r||c<s||t.paintCard(c,h,a,o),c}),e)},t.prototype.paintCard=function(t,e,i,n){var a=this,o=this.game.mainContext,s=this.cardSize.width,r=this.game.createRect(e,t,s,i,15),h="block"===n.status,l=h?"НЕ ИЗУЧЕНО":n.country;o.save(),o.beginPath(),o.clip(r),o.drawImage(this.game.imagesStore[n.imageName],e,t,s,i),h&&(o.fillStyle="#535353e6",o.fillRect(0,0,this.game.windowSize.width,this.game.windowSize.height),o.drawImage(this.game.imagesStore.questoin,e+s/2-30,t+i/2-40,60,80)),h||this.paintSections(t,e+10,n),o.fillStyle="#fff",o.font="22px roboto",o.textBaseline="bottom",o.textAlign="left",o.fillText(l,e+20,t+i-10),"done"===n.status&&o.drawImage(this.game.imagesStore.checkGreen,e+s-10-30,t+i-10-30,30,30),"process"===n.status&&this.eventStore.push({path:r,handler:function(){cancelAnimationFrame(a.animateFrameId),a.clearEventListeners(),a.game.setStatus("game")}}),o.restore()},t.prototype.paintSections=function(t,e,i){var n=this,a=this.game.mainContext,o=this.sectionStatusIcons;a.font="11px roboto",a.textAlign="left",a.textBaseline="middle",i.sights.reduce((function(t,i){var s=n.game.createRect(e+10,t,130,25,12.5);a.fillStyle="#ea5c01",a.fill(s),a.fillStyle="#fff",a.fillText(i.title,e+10+10,t+12.5,90),console.log(o[i.status]);var r=n.game.imagesStore[o[i.status]];return a.drawImage(r,e+10+130-12-10,t+6.5,12,12),n.eventStore.push({path:s,handler:n.handlerSectionClick(i)}),t+25+10}),t+20)},t.prototype.handlerSectionClick=function(t){var e=this,i=t.status,n=t.handler;return function(){cancelAnimationFrame(e.animateFrameId),e.clearEventListeners(),e.game.setStatus("process"===i?"game":"investigated",n)}},t.prototype.init=function(){if(this.fillBackground(),!this.headingGradient){var t=this.game.mainContext.createLinearGradient(0,0,0,this.headingHeight);t.addColorStop(0,"#6571dd"),t.addColorStop(1,"#394d90"),this.headingGradient=t}this.fullHeightLevels||(this.fullHeightLevels=this.game.user.levels.countries.length*(this.cardSize.height+20)),this.backPath||(this.backPath=this.createBackPath()),this.game.screenWrapper.addEventListener("mousemove",this.mouseMove),this.game.screenWrapper.addEventListener("click",this.click),document.addEventListener("wheel",this.scrollLocationCard),this.locationLoop()},t}(),o=function(){function t(t){this.game=t,this.imageBg=null,this.backPath=null,this.mouseMoveHandler=this.mouseMoveHandler.bind(this),this.goBack=this.goBack.bind(this)}return t.prototype.init=function(t){var e=t.img,i=t.heading,n=t.description;this.imageBg=this.game.imagesStore[e],this.heading=i,this.description=n,this.game.setBackground("gizaBg"),this.game.clearMainCanvas(),this.drawText(),this.drawArrow(),document.addEventListener("mousemove",this.mouseMoveHandler),document.addEventListener("click",this.goBack)},t.prototype.goBack=function(t){var e=this.game.getCursorPosition(t),i=e.x,n=e.y;this.game.mainContext.isPointInStroke(this.backPath,i,n)&&(this.clearEvents(),this.game.setStatus("location"))},t.prototype.clearEvents=function(){document.removeEventListener("click",this.goBack),document.removeEventListener("mousemove",this.mouseMoveHandler)},t.prototype.mouseMoveHandler=function(t){var e=this.game.getCursorPosition(t),i=e.x,n=e.y,a=this.game.mainContext,o=this.game.screenWrapper;if(a.isPointInStroke(this.backPath,i,n))return o.style.cursor="pointer";o.style.cursor="default"},t.prototype.drawText=function(){var t=this.game.mainContext,e=this.heading,i=this.description,n=this.game.windowSize,a=n.height,o=n.width,s=a/100,r=o/2,h=o/100*85,l=this.game.minMax(o/100*5,28,48),c=this.game.minMax(o/100*3,18,34);t.save(),t.shadowColor="#000",t.shadowBlur=5,t.textAlign="center",t.textBaseline="middle",t.fillStyle="#fff",t.font=l+"px Roboto",t.fillText(e,r,80*s,h),t.font=c+"px Roboto";var u=this.separationTextInStroke(i),d=u.lines,g=u.lineHeight;d.forEach((function(e,i){t.fillText(e,r,85*s+g*i,h)})),t.restore()},t.prototype.drawArrow=function(){var t=new Path2D,e=this.game.mainContext;e.lineWidth=7,e.strokeStyle="#fff",e.lineCap="round",t.moveTo(45,20),t.lineTo(25,35),t.lineTo(45,50),e.stroke(t),this.backPath=t},t.prototype.separationTextInStroke=function(t){var e=this.game.mainContext,i=this.game.windowSize.width/100*90,n=t.split(" "),a=[],o=e.measureText(t),s=o.actualBoundingBoxDescent,r=o.actualBoundingBoxAscent;return n.reduce((function(t,o,s){var r=t+"  "+o;return e.measureText(r).width>i?(a.push(t),o):s===n.length-1?a.push(t):r}),""),{lines:a,lineHeight:s+r}},t}();var s=function(){function t(){this.countries=[{country:"ЕГИПЕТ",imageName:"locationEgipet",status:"process",sights:[{title:"ПИРАМИДЫ ГИЗЫ",status:"done",handlerId:"1",handler:{img:"bigSfinxBg",heading:"ПИРАМИДЫ ГИЗЫ",description:"Пирамиды Гизы - это древние усыпальницы - первое из семи чудес света."},levels:[{keyData:{ГИЗ:{row:0,col:0,direction:"down"},ГЗИ:{row:0,col:0,direction:"right"}},letters:["Г","И","З"]}]},{title:"БОЛЬШОЙ СФИНКС",status:"process",handlerId:"2",handler:{img:"bigSfinxBg",heading:"ПИРАМИДЫ ГИЗЫ",description:"Пирамиды Гизы - это древние усыпальницы - первое из семи чудес света."},levels:[{keyData:{ГИЗ:{row:0,col:1,direction:"down"},ГЗИ:{row:0,col:0,direction:"right"}},letters:["Г","И","З"]}]},{title:"КРАСНОЕ МОРЕ",status:"block",handlerId:"3",handler:{img:"redSeaBg",heading:"ПИРАМИДЫ ГИЗЫ",description:"Пирамиды Гизы - это древние усыпальницы - первое из семи чудес света."},levels:[{keyData:{НОС:{row:1,col:1,direction:"down"},СОН:{row:1,col:0,direction:"right"}},letters:["C","О","Н"]}]}]},{country:"ФРАНЦИЯ",imageName:"locationFrance",status:"block",sights:[{title:"Пирамиды гизы",status:"process",handlerId:"4",handler:{img:"gizaBg",heading:"ПИРАМИДЫ ГИЗЫ",description:"Пирамиды Гизы - это древние усыпальницы - первое из семи чудес света."},levels:[{keyData:{НОС:{row:1,col:1,direction:"down"},СОН:{row:1,col:0,direction:"left"}},letters:["C","О","Н"]}]}]},{country:"ФРАНЦИЯ",imageName:"locationFrance",status:"block",sights:[{title:"Пирамиды гизы",status:"process",handlerId:"5",handler:{img:"gizaBg",heading:"ПИРАМИДЫ ГИЗЫ",description:"Пирамиды Гизы - это древние усыпальницы - первое из семи чудес света."},levels:[{keyData:{НОС:{row:1,col:1,direction:"down"},СОН:{row:1,col:0,direction:"left"}},letters:["C","О","Н"]}]}]}]}return t.prototype.getLevel=function(t){return this.countries[t]},t}(),r=function(t){this.game=t,this.levelCount=0,this.levelData={countries:0,sights:0,playId:0},this.levels=new s};const h=function(){function t(t){this.game=t,this.mouseMove=this.mouseMove.bind(this),this.clickHandler=this.clickHandler.bind(this)}return t.prototype.init=function(){this.paths=[],document.addEventListener("mousemove",this.mouseMove),document.addEventListener("click",this.clickHandler),this.loadProgress=0,this.game.setBackground("mainBg",!0),this.arcData||this.arcSetData(),this.setEndLevelData(),this.loop()},t.prototype.mouseMove=function(t){var e=this.game.getCursorPosition(t),i=e.x,n=e.y,a=this.game.mainContext;this.game.screenWrapper.style.cursor=this.paths.find((function(t){var e=t.path;return a.isPointInPath(e,i,n)}))?"pointer":"default"},t.prototype.clickHandler=function(t){var e,i=this.game.getCursorPosition(t),n=i.x,a=i.y,o=this.game.mainContext;null===(e=this.paths.find((function(t){var e=t.path;return o.isPointInPath(e,n,a)})))||void 0===e||e.callback()},t.prototype.cancelEvents=function(){document.removeEventListener("mousemove",this.mouseMove),document.removeEventListener("click",this.clickHandler)},t.prototype.setEndLevelData=function(){var t=this.game.user.levelData,e=t.countries,i=t.sights,n=t.playId,a=this.game.user.levels;this.endLevelData={sightsTitle:a.countries[e].sights[i].title,levelsStart:n,levelsEnd:n+1,levelCount:a.countries[e].sights[i].levels.length,countLevelsDone:this.game.user.levelCount+1}},t.prototype.loop=function(){var t=this;this.requestId=requestAnimationFrame((function(){return t.loop()})),this.game.clearMainCanvas(),this.paintArc(),this.paintInfoBlock()},t.prototype.nextSteep=function(t,e){var i=this,n=this.game,a=n.mainContext,o=(0,n.createRect)(e-125,t,250,45,22.5);a.fillStyle="red",a.fill(o),a.font="18px roboto",a.fillStyle="#fff",a.textBaseline="middle",a.fillText("ДАЛЬШЕ",e,t+22.5),this.paths.push({callback:function(){i.game.nextLevel(),i.cancelEvents(),document.body.style.cursor="default",i.game.setStatus("game")},path:o})},t.prototype.paintInfoBlock=function(){var t=this.game.windowSize,e=t.width,i=(t.height,this.game.mainContext),n=28,a="#3f83be",o=this.game.minMax(e/100*80,260,450),s=35,r=this.game.minMax(e/100*90,300,500),h=this.arcData.endY+30+14,l=e/2,c=r-8,u=this.endLevelData,d=u.sightsTitle,g=u.levelsStart,m=u.levelsEnd,p=(u.countLevelsDone,u.levelCount);i.beginPath(),i.fillStyle=a,i.moveTo(l-(o/2-8),h+n),i.lineTo(l-14,h+n),i.lineTo(l+o/2-8,h+n),i.quadraticCurveTo(l+o/2,h+n,l+o/2,h+n+8),i.lineTo(l+o/2,h+n+s-8),i.quadraticCurveTo(l+o/2,h+n+s,l+o/2+8,h+n+s),i.lineTo(l+r/2,h+n+s),i.lineTo(l+r/2,h+n+s+30),i.lineTo(l-(r/2-15),h+n+s+30),i.quadraticCurveTo(l-r/2,h+n+s+30,l-r/2,h+n+s+15),i.quadraticCurveTo(l-r/2,h+n+s,l-(r/2-15),h+n+s),i.quadraticCurveTo(l-o/2,h+n+s,l-o/2,h+n+s-8),i.lineTo(l-o/2,h+n+8),i.quadraticCurveTo(l-o/2,h+n,l-(o/2-8),h+n),i.moveTo(l,h+36.4),i.arc(l,h+36.4,n,Math.PI,0),i.fill(),i.beginPath(),i.fillStyle="#36658e";var f=this.game.createRect(l-o/2+5,h+n+5,o-10,25,5);i.fill(f),i.fillStyle="#fff",i.textBaseline="middle",i.textAlign="center",i.font="400 "+25*.55+"px roboto",i.fillText(d,l,h+n+5+25*.55),i.textBaseline="bottom",i.font="400 12.6px roboto",i.fillText(this.endLevelData.levelsEnd+"/"+this.endLevelData.levelCount,l,h+n-0),i.beginPath(),i.fillStyle="red";var v=this.game.createRect(l-(r/2-4),h+n+s+4,c,22,11);i.fill(v),i.beginPath(),i.fillStyle="green";var y=c/p*g+this.loadProgress,w=c/p*m,x=this.game.createRect(l-(r/2-4),h+n+s+4,y,22,11);i.fill(x),i.beginPath(),i.fillStyle=a,i.arc(l+r/2-4,h+n+s+15-4,19,2*Math.PI,0),i.fill(),y<=w?this.loadProgress+=4:(this.nextSteep(25+h+n+s+30,l),cancelAnimationFrame(this.requestId))},t.prototype.arcSetData=function(){var t=this.game.windowSize,e=t.width,i=t.height,n=Math.min(e,i)/100*15,a=i/100*20+n,o=this.game.mainContext.createLinearGradient(0,0,e,i);o.addColorStop(0,"#697af3"),o.addColorStop(1,"#7d42d1"),this.arcData={x:e/2,y:a,radius:n,gradient:o,endY:a+n}},t.prototype.paintArc=function(){var t=this.game.mainContext,e=this.arcData,i=e.x,n=e.y,a=e.radius,o=e.gradient;t.beginPath(),t.fillStyle=o,t.arc(i,n,a,0,2*Math.PI),t.fill(),t.fillStyle="#fff",t.font=.28*a+"px Roboto",t.textAlign="center",t.textBaseline="middle",t.fillText(String(this.game.user.levelCount+1),i,n)},t}();var l=function(){function t(){this.canvasBackground=void 0,this.screenWrapper=void 0,this.investigated=void 0,this.canvasMain=void 0,this.backgroundContext=void 0,this.mainContext=void 0,this.location=void 0,this.user=void 0,this.windowSize={width:0,height:0},this.imagesStore={},this.status="loadingTheGame",this.loadingGameStages=void 0,this.globalMenu=void 0}return t.prototype.init=function(){this.canvasBackground=document.querySelector("#canvas-bg"),this.canvasMain=document.querySelector("#canvas-main"),this.backgroundContext=this.canvasBackground.getContext("2d"),this.mainContext=this.canvasMain.getContext("2d"),this.screenWrapper=document.querySelector(".screen"),this.investigated=new o(this),this.user=new r(this),this.endOfLevel=new h(this),this.setFullSize(),this.loadingGameStages=new e(this),this.globalMenu=new i(this),this.location=new a(this),this.gamePlay=new n(this),this.paintPreloader()},t.prototype.paintPreloader=function(){var t=this,e=this.backgroundContext,i=this.windowSize,n=i.width,a=i.height;e.fillStyle="#ff9800",e.fillRect(0,0,n,a),e.font=this.minMax(n/20,24,38)+"px cursive",e.textBaseline="middle",e.textAlign="center",e.fillStyle="#fff",e.fillText("VITALIYEB GAMES",n/2,a/2),Promise.all([this.loadImages("./images/loadingBg.jpg","mainBg"),new Promise((function(t,e){return setTimeout(t,1e3)}))]).then((function(){return t.runInitScene()}))},t.prototype.setStatus=function(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];this.status=t,this.runInitScene(e)},t.prototype.setFullSize=function(){var t=document.querySelector(".screen"),e=t.clientWidth,i=t.clientHeight;this.windowSize.width=e,this.windowSize.height=i;for(var n=0,a=[this.canvasBackground,this.canvasMain];n<a.length;n++){var o=a[n];o.width=e,o.height=i}},t.prototype.runInitScene=function(t){switch(this.status){case"loadingTheGame":this.loadingGameStages.init();break;case"globalMenu":this.globalMenu.init();break;case"location":this.location.init();break;case"investigated":this.investigated.init(t[0]);break;case"game":this.gamePlay.init();break;case"endOfLevel":this.endOfLevel.init()}},t.prototype.clearMainCanvas=function(){var t=this.mainContext;t.beginPath(),t.clearRect(0,0,this.windowSize.width,this.windowSize.height)},t.prototype.loadImages=function(t,e){var i=this,n=new Image(500,500);return new Promise((function(a,o){n.src=t,n.onload=function(){return i.imagesStore[e]=n,a(n)}}))},t.prototype.nextLevel=function(){++this.user.levelData.playId,++this.user.levelCount;var t=this.user,e=t.levelData,i=e.countries,n=e.sights,a=e.playId,o=t.levels.countries;a>=o[i].sights[n].levels.length&&(t.levelData.playId=0,++t.levelData.sights,++n),n>=o[i].sights.length&&(t.levelData.sights=0,++t.levelData.countries,++i),i>=o.length-1&&console.log("end level")},t.prototype.createRect=function(t,e,i,n,a){var o=new Path2D;return o.moveTo(t+a,e),o.lineTo(t+i-a,e),o.quadraticCurveTo(t+i,e,t+i,e+a),o.lineTo(t+i,e+n-a),o.quadraticCurveTo(t+i,e+n,t+i-a,e+n),o.lineTo(t+a,e+n),o.quadraticCurveTo(t,e+n,t,e+n-a),o.lineTo(t,e+a),o.quadraticCurveTo(t,e,t+a,e),o},t.prototype.setBackground=function(t,e){return i=this,n=void 0,o=function(){var i,n,a,o,s,r,h;return function(t,e){var i,n,a,o,s={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:r(0),throw:r(1),return:r(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function r(o){return function(r){return function(o){if(i)throw new TypeError("Generator is already executing.");for(;s;)try{if(i=1,n&&(a=2&o[0]?n.return:o[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,o[1])).done)return a;switch(n=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,n=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!((a=(a=s.trys).length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){s.label=o[1];break}if(6===o[0]&&s.label<a[1]){s.label=a[1],a=o;break}if(a&&s.label<a[2]){s.label=a[2],s.ops.push(o);break}a[2]&&s.ops.pop(),s.trys.pop();continue}o=e.call(t,s)}catch(t){o=[6,t],n=0}finally{i=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,r])}}}(this,(function(l){return i=this.backgroundContext,n=this.windowSize,a=n.width,o=n.height,s=this.imagesStore[t],i.drawImage(s,0,0,a,o),e&&(r=a/2,h=o/100*15,i.beginPath(),i.font="500 40px Roboto",i.textBaseline="middle",i.textAlign="center",i.fillStyle="#fff",i.fillText("Words of wonders",r,h)),[2]}))},new((a=void 0)||(a=Promise))((function(t,e){function s(t){try{h(o.next(t))}catch(t){e(t)}}function r(t){try{h(o.throw(t))}catch(t){e(t)}}function h(e){var i;e.done?t(e.value):(i=e.value,i instanceof a?i:new a((function(t){t(i)}))).then(s,r)}h((o=o.apply(i,n||[])).next())}));var i,n,a,o},t.prototype.getCursorPosition=function(t){return{x:t.offsetX,y:t.offsetY}},t.prototype.minMax=function(t,e,i){return t>e&&i>t?t:t>i?i:t<e?e:void 0},t}();window.addEventListener("load",(function(){(new l).init()}),!1),t.p,t.p,t.p,t.p,t.p,t.p,t.p,t.p,t.p,t.p,t.p})();