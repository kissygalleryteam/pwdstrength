/*
combined files : 

gallery/pwdstrength/1.0/index

*/
/**
 * @fileoverview 基于Kissy的密码强度提示组件
 * @author 弘树<tiehang.lth@alibaba-inc.com>
 * @module pwdstrength
 **/
KISSY.add('gallery/pwdstrength/1.0/index',function (S, Node,Base) {
    var EMPTY = '';
    var $ = Node.all;
    /**
     * 
     * @class Pwdstrength
     * @constructor
     * @extends Base
     */
    function Pwdstrength(comConfig) {
        var self = this;
        //调用父类构造函数
        Pwdstrength.superclass.constructor.call(self, comConfig);
        self.init();
    }
    S.extend(Pwdstrength, Base, /** @lends Pwdstrength.prototype*/{

        init: function(){
            var self = this;
            self.renderUI();
            self.bindEvent();
        },

        renderUI: function(){
            var self = this,
                needRender = self.get('needRender'),
                html = self.get('html');

            if(needRender && html != ''){
                var triggerNode = self.get('triggerNode'),
                    boundingBox = $(html),
                    renderType = self.get('renderType');


                switch(renderType){

                    case 'insert':

                        triggerNode.after(boundingBox);
                        break;
                    case 'popup':

                        var offset = triggerNode.offset(),
                            width = triggerNode.outerWidth(),
                            height = triggerNode.outerHeight(),
                            MARGIN = 10;

                        $(document.body).append(boundingBox);

                        boundingBox.css({
                            position: 'absolute',
                            display: 'none',
                            left: offset.left + width + MARGIN,
                            top: offset.top + (height - boundingBox.height()) / 2
                        });

                        break;

                    default:
                        break;

                }

                this.boundingBox = boundingBox;


            }

        },

        bindEvent: function(){
            var self = this,
                triggerNode = self.get('triggerNode'),
                needRender = self.get('needRender'),
                boundingBox = self.boundingBox,
                onchange = self.get('onchange'),
                onblur = self.get('onblur');
            if(S.isFunction(onchange)){

                triggerNode.on('change keypress paste focus textInput input', function(){

                    var val = $(this).val(),
                        level = 0;

                    if(val != EMPTY){

                        self.password = $(this).val();
                        level = self.level();
                    }

                    onchange.call(self, level, boundingBox);
                });
            }
            if(S.isFunction(onblur)){

                triggerNode.on('focusout blur', function(){
                    onblur.call(self, boundingBox);
                });
            }

        },

        // 需要用到的正则表达式
        regex : {
            illegal : /[^-+=|,0-9a-zA-Z!@#$%^&*?_.~+/\\(){}\[\]<>]/g,
            allNumber : /^\d+$/,
            allLetter : /^[a-zA-Z]+$/,
            allCharacter : /^[-+=|,!@#$%^&*?_.~+/\\(){}\[\]<>]+$/ ,
            allSame : /^([\s\S])\1*$/,
            number : /\d/g,
            letter : /[a-zA-Z]/g,
            lowerAndUpperLetter : /[a-z][^A-Z]*[A-Z]|[A-Z][^a-z]*[a-z]/,
            numberAndLetter : /\d[^a-zA-Z]*[a-zA-Z]|[a-zA-Z][^\d]*\d/,
            character : /[-+=|,!@#$%^&*?_.~+/\\()|{}\[\]<>]/g
        },

        /**
         * 计算强度级别
         * @returns {*} 级别(0, 1, 2, ...)
         */
        level : function () {
            var self = this,
                totalScore = 0;
            if (self.isIllegal()){
                return totalScore;
            }

            // 长度：[0, 4]: +5; [5, 7]: +10; [8, ]: +25
            var length = this.size();
            4 >= length ? totalScore += 5 : length > 4 && 8 > length ? totalScore += 10 : length >= 8 && (totalScore += 25);

            // 大小写字母混合: +20; 只有大/小写字母: +10
            var hasLowerAndUpperLetter = this.hasLowerAndUpperLetter(),
                hasLetter = this.hasLetter();
            hasLowerAndUpperLetter ? totalScore += 20 : hasLetter && (totalScore += 10);

            // 数字[3, ]: +20; [1, 2]: +10
            var hasNumber = this.hasNumber();
            hasNumber >= 3 ? totalScore += 20 : hasNumber && (totalScore += 10);

            // 字符[2, ]: +25; [1]: +10
            var hasCharacter = this.hasCharacter();
            hasCharacter >= 3 ? totalScore += 25 : hasCharacter && (totalScore += 10);

            // 大小写字母混合 + 数字 + 字符: +10
            // 字母 + 数字 + 字符: +5
            // 字母、数字、字符中3选2: +2
            if(hasLowerAndUpperLetter && hasNumber && hasCharacter){
                totalScore += 10;
            }else if(hasLetter && hasNumber && hasCharacter){
                totalScore += 5;
            }else if(hasLetter && hasNumber || hasLetter && hasCharacter || hasNumber && hasCharacter){
                totalScore += 2;
            }

            var rules = self.get('rule');
            S.each(rules, function(val, idx){
                if(totalScore > val){
                    totalScore = rules.length - (idx + 1);
                    return false;
                }
            });

            return totalScore;
        },

        size : function () {
            return this.password.length
        },
        isIllegal : function () {
            return !!this.password.match(this.regex.illegal)
        },
        isAllNumber : function () {
            return !!this.password.match(this.regex.allNumber)
        },
        isAllLetter : function () {
            return !!this.password.match(this.regex.allLetter)
        },
        isAllCharacter : function () {
            return !!this.password.match(this.regex.allCharacter)
        },
        isAllSame : function () {
            return !!this.password.match(this.regex.allSame)
        },
        hasNumber : function () {
            return (this.password.match(this.regex.number) || []).length
        },
        hasLetter : function () {
            return (this.password.match(this.regex.letter) || []).length
        },
        hasLowerAndUpperLetter : function () {
            return !!this.password.match(this.regex.lowerAndUpperLetter)
        },
        hasNumberAndLetter : function () {
            return !!this.password.match(this.regex.numberAndLetter)
        },
        hasCharacter : function () {
            return (this.password.match(this.regex.character) || []).length
        }

    }, {ATTRS : /** @lends Pwdstrength*/{

        triggerNode: {
            value: null,
            setter: function(val){
                if(S.isString(val)){
                    return $(val);
                }
                return val;
            }
        },

        rule: {
            value: [70, 30, 0]
        },

        html: {
            value: '<div class="pwdstrength-popup"><em class="popup-arrow"></em><div class="popup-content">' +
                '<div class="pwdstrength-wrap">密码强度：' +
                '<span class="strenth-wrap"><span class="strength-bar"></span></span>' +
                '</div></div></div>',
            setter: function(val){
                var self = this,
                    needRender = self.get('needRender'),
                    renderType = self.get('renderType');

                if(needRender && (renderType == 'popup')){
                    val = '<div class="pwdstrength-popup"><em class="popup-arrow"></em><div class="popup-content">' +
                        val + '</div></div>';
                }
                return val;
            }
        },

        /**
         * 是否需要渲染dom（如果dom中已有强度提示节点，设为false），为true时必须指定renderType
         */
        needRender: {
            value: true
        },

        /**
         * 指定展示类型：insert/popup 直接紧跟输入框后面：嵌入dom/popup
         */
        renderType: {
            value: 'popup',
            setter: function(val){
                var self = this,
                    needRender = self.get('needRender'),
                    validTypes = ['insert', 'popup'];
                if(!needRender){
                    S.log('If needRender is false, no need for setting renderType!', 'warn');
                }
                if(!S.inArray(val, validTypes)){
                    S.log('The renderType you set is not supported yet, please check and retry!', 'error');
                    return needRender[0];
                }
                return val;
            }
        },

        onchange: {
            value: function(level, node){

                var RED = [255, 0, 0],
                    GREEN = [31, 165, 66],
                    transColor = [];

                var self = this,
                    totalWidth = node.one('.strenth-wrap').width(),
                    grades = self.get('rule').length,
                    percent = level / grades;

                for(var i = 0; i < 3; i++){
                    transColor[i] = parseInt(RED[i] - (RED[i] - GREEN[i]) * percent);
                }

                function transVal(v){
                    return v > 16 ? v.toString(16) : ('0' + v.toString(16));
                }

                var x = '';
                S.each(transColor, function(val){
                    x += transVal(val);
                });

                node.one('.strength-bar').css({
                    'width':  totalWidth * percent + 'px',
                    'backgroundColor': '#' + x
                });

                node.show();
            }
        },

        onblur: {
            value: function(node){
                node.hide();
            }
        }

    }});
    return Pwdstrength;
}, {requires:['node', 'base', 'event']});
