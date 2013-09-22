/*
combined files : 

gallery/pwdstrength/1.0/index

*/
/**
 * @fileoverview 
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
    }
    S.extend(Pwdstrength, Base, /** @lends Pwdstrength.prototype*/{

    }, {ATTRS : /** @lends Pwdstrength*/{

    }});
    return Pwdstrength;
}, {requires:['node', 'base']});




