/*! pwdstrength - v2.0.0 - 2013-09-29 6:46:50 PM
* Copyright (c) 2013 弘树; Licensed  */
KISSY.add("kg/pwdstrength/2.0.0/index",function(a,b,c){function d(a){var b=this;d.superclass.constructor.call(b,a),b.init()}var e="",f=b.all;return a.extend(d,c,{init:function(){var a=this;a.password=e,a.renderUI(),a.bindEvent()},renderUI:function(){var a=this,b=a.get("needRender"),c=a.get("html");if(b&&""!=c){var d=a.get("triggerNode"),e=f(c),g=a.get("renderType");switch(g){case"insert":d.after(e);break;case"popup":f(document.body).append(e),a.locatePopup(d,e)}this.boundingBox=e}},locatePopup:function(a,b){var c=a.offset(),d=a.innerWidth(),e=a.innerHeight(),f=15;b.css({left:c.left+d+f,top:c.top+(e-b.innerHeight())/2}),self.curOffset=a.offset()},bindEvent:function(){var b=this,c=b.get("triggerNode"),d=(b.get("needRender"),b.boundingBox);c.on("change keypress paste focus textInput input",function(){var c=f(this).val();b.password=c;var g=c!=e?b.level():-1,h=b.get("onchange");a.isFunction(h)&&h.call(b,g,d)}),c.on("focusout blur",function(){var c=b.get("onblur");a.isFunction(c)&&c.call(b,d)})},regex:{illegal:/[^-+=|,0-9a-zA-Z!@#$%^&*?_.~+/\\(){}\[\]<>]/g,allNumber:/^\d+$/,allLetter:/^[a-zA-Z]+$/,allCharacter:/^[-+=|,!@#$%^&*?_.~+/\\(){}\[\]<>]+$/,allSame:/^([\s\S])\1*$/,number:/\d/g,letter:/[a-zA-Z]/g,lowerAndUpperLetter:/[a-z][^A-Z]*[A-Z]|[A-Z][^a-z]*[a-z]/,numberAndLetter:/\d[^a-zA-Z]*[a-zA-Z]|[a-zA-Z][^\d]*\d/,character:/[-+=|,!@#$%^&*?_.~+/\\()|{}\[\]<>]/g},level:function(){var b=this,c=0,d=this.size();4>=d?c+=5:d>4&&8>d?c+=10:d>=8&&(c+=25);var e=this.hasLowerAndUpperLetter(),f=this.hasLetter();e?c+=20:f&&(c+=10);var g=this.hasNumber();g>=3?c+=20:g&&(c+=10);var h=this.hasCharacter();h>=3?c+=25:h&&(c+=10),e&&g&&h?c+=5:f&&g&&h?c+=3:(f&&1)+(g&&1)+(h&&1)>1&&(c+=2);var i=b.get("rule");return a.each(i,function(a,b){var d=i.length-(b+1);return c>a?(c=d,!1):(0==d&&(c=-1),void 0)}),c},size:function(){return this.password.length},isIllegal:function(){return!!this.password.match(this.regex.illegal)},isAllNumber:function(){return!!this.password.match(this.regex.allNumber)},isAllLetter:function(){return!!this.password.match(this.regex.allLetter)},isAllCharacter:function(){return!!this.password.match(this.regex.allCharacter)},isAllSame:function(){return!!this.password.match(this.regex.allSame)},hasNumber:function(){return(this.password.match(this.regex.number)||[]).length},hasLetter:function(){return(this.password.match(this.regex.letter)||[]).length},hasLowerAndUpperLetter:function(){return!!this.password.match(this.regex.lowerAndUpperLetter)},hasNumberAndLetter:function(){return!!this.password.match(this.regex.numberAndLetter)},hasCharacter:function(){return(this.password.match(this.regex.character)||[]).length},_transColorToArr:function(b){if(/#[a-fA-F0-9]{6}/.test(b)){for(var c=[],d=1;6>d;d+=2)c.push(parseInt(b.substring(d,d+2),16));return c}return a.log("Invalid color set, please check and retry!"),!1}},{ATTRS:{triggerNode:{value:null,setter:function(b){return a.isString(b)?f(b):b}},rule:{value:[70,30,0]},html:{value:'<div class="pwdstrength-popup"><em class="popup-arrow"></em><em class="popup-arrow-padding"></em><div class="popup-content"><div class="pwdstrength-wrap">\u5bc6\u7801\u5f3a\u5ea6\uff1a<span class="strenth-wrap"><span class="strength-bar"></span></span></div></div></div>',setter:function(a){var b=this,c=b.get("needRender"),d=b.get("renderType");return c&&"popup"==d&&(a='<div class="pwdstrength-popup"><em class="popup-arrow"></em><em class="popup-arrow-padding"></em><div class="popup-content">'+a+"</div></div>"),a}},needRender:{value:!0},renderType:{value:"popup",setter:function(b){var c=this,d=c.get("needRender"),e=["insert","popup"];return d||a.log("If needRender is false, no need for setting renderType!","warn"),a.inArray(b,e)?b:(a.log("The renderType you set is not supported yet, please check and retry!","error"),d[0])}},beginColor:{value:"#bd5151"},endColor:{value:"#1fa542"},onchange:{value:function(b,c){var d=this,e=d._transColorToArr,f=e(d.get("beginColor")),g=e(d.get("endColor")),h=[],i=c.one(".strenth-wrap").width(),j=d.get("rule").length,k=function(b,c){for(var e=b/(j-1),k=(b+1)/j,l=0;3>l;l++){var m=parseInt(f[l]-(f[l]-g[l])*e);h[l]=m>16?m.toString(16):"0"+m.toString(16)}c.one(".strength-bar").css({width:i*k+"px",backgroundColor:"#"+h.join("")});var n=d.get("triggerNode");a.equals(d.curOffset,n.offset())||d.locatePopup(n,d.boundingBox),c.show()};k(b,c),d.set("onchange",k)}},onblur:{value:function(a){var b=this;"popup"==b.get("renderType")&&a&&a.hide()}}}}),d},{requires:["node","base","event","./index.css"]});