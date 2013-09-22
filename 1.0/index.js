/**
 * @fileoverview 
 * @author 弘树<tiehang.lth@alibaba-inc.com>
 * @module pwdstrength
 **/
KISSY.add(function (S, Node,Base) {
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
    }
    S.extend(Pwdstrength, Base, /** @lends Pwdstrength.prototype*/{

        init: function(){

        },

        renderUI: function(){

        },

        bindEvent: function(){

        },

        calcScore: function(){

        },
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
        score : function () {
            var t = 0;
            if (this.isIllegal())
                return t;
            var i = this.size();
            4 >= i ? t += 5 : i > 4 && 8 > i ? t += 10 : i >= 8 && (t += 25);
            var e = this.hasLowerAndUpperLetter(),
                s = this.hasLetter();
            e ? t += 20 : s && (t += 10);
            var a = this.hasNumber();
            a >= 3 ? t += 20 : a && (t += 10);
            var n = this.hasCharacter();
            return n >= 2 ? t += 25 : n && (t += 10),
                e && a && n ? t += 10 : s && a && n ? t += 5 : (s && a || s && n || a && n) && (t += 2),
                t
        },
        level : function () {
            var t = 0,
                i = Math.floor(this.score() / 10);
            switch (i) {
                case 10:
                case 9:
                    t = 7;
                    break;
                case 8:
                    t = 6;
                    break;
                case 7:
                    t = 5;
                    break;
                case 6:
                    t = 4;
                    break;
                case 5:
                case 4:
                case 3:
                    t = 3;
                    break;
                case 2:
                    t = 2;
                    break;
                default:
                    t = 1
            }
            return t
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

        target: {
            value: null,
            setter: function(val){
                if(S.isString(val)){
                    return $(val);
                }
                return val;
            }
        },

        rule: {

        }

    }});
    return Pwdstrength;
}, {requires:['node', 'base']});



