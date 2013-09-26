## 综述

pwdstrength是基于Kissy的密码强度提示组件，支持自行定制提示展示模板和渲染方法。

* 版本：1.0
* 作者：弘树
* demo：[http://gallery.kissyui.com/pwdstrength/1.0/demo/index.html](http://gallery.kissyui.com/pwdstrength/1.0/demo/index.html)

## 初始化组件

    S.use('gallery/pwdstrength/1.0/index', function (S, Pwdstrength) {
         var pwdstrength = new Pwdstrength({
            triggerNode: '#abc'
         });
    })

## API说明

* 密码强度规则参考Google的设计，根据密码的构成特点进行计分，得分越高表明强度越强
* 具体的规则参考：[密码强度规则（仿 google）](http://www.planabc.net/2008/05/11/password_strength_meter/)

### 配置项
* triggerNode
	* `string || NodeList`
    * 必填触发节点，可为KISSY支持的query或是dom节点
* rule
	* `Array`（默认值：`[70, 30, 0]`）
    * 指定强度级别范围，数组形式
    * e.g. [80, 60, 30]表示得分30-60之间返回level:0（表示强度弱），60-80之间返回level:1（强度中），80+返回level:2(强度高）
* html 
	* `String`
	* 指定需要渲染的html字符串，用来展示密码强度提示信息
	* 默认值：
 			
			<div class="pwdstrength-popup">
				<em class="popup-arrow"></em>
				<em class="popup-arrow-padding"></em>
				<div class="popup-content">
					<div class="pwdstrength-wrap">密码强度：
						<span class="strenth-wrap"><span class="strength-bar"></span></span>
					</div>
				</div>
			</div>
* needRender 
	* `Boolean`（默认值：`true`）
    * 是否需要渲染提示信息html，如果页面中已有密码强度提示的节点，则设为false
* renderType
	* `String` （默认值：`'popup'`，可选值：`['insert', 'popup']`）
	* 指定提示信息节点的展现形式
	* `'insert'`: 提示信息节点固定插入输入节点之后，始终页面上可见
	* `'popup'`：提示信息节点插入body尾部，输入时以tooltip的形式展示提示
* beginColor
	* `String` （默认值：`'#bd5151'`）
	* 可指定默认配置下展示的提示信息节点的强度最弱时提示条的颜色
	* 设置为合法的颜色字符串格式
* endColor
	* `String` （默认值：`'#1fa542'`）
	* 可指定默认配置下展示的提示信息节点的强度最强时提示条的颜色
	* 设置为合法的颜色字符串格式
* onchange
	* `Function`
	* 指定输入变化时强度提示信息更新的方法，结合指定的提示信息节点可自定义该方法实现业务所需的交互
	* 默认值：
	 
			function(level, node){

                var self = this,
                    transColorFunc = self._transColorToArr,
                    beginColor = transColorFunc(self.get('beginColor')),
                    endColor = transColorFunc(self.get('endColor')),
                    transColor = [];

                var totalWidth = node.one('.strenth-wrap').width(),
                    grades = self.get('rule').length;

                // onchange方法缓存之前的变量值，加快下次执行效率
                var onchange = function(level, node){

                    // 颜色百分比和长度百分比不一样，需分别计算
                    var colorPercent = level / (grades - 1),
                        widthPercent = (level + 1) / grades;

                    // 根据起始颜色和level计算当前level对应的颜色，根据rgb颜色过渡算法
                    for(var i = 0; i < 3; i++){
                        var value = parseInt(beginColor[i] - (beginColor[i] - endColor[i]) * colorPercent);
                        transColor[i] = value > 16 ? value.toString(16) : ('0' + value.toString(16));
                    }

                    node.one('.strength-bar').css({
                        'width':  totalWidth * widthPercent + 'px',
                        'backgroundColor': '#' + transColor.join('')
                    });

                    // 检测是否input节点位置发生变化，如果发生变化重定位popup
                    var triggerNode = self.get('triggerNode');
                    if(!S.equals(self.curOffset, triggerNode.offset())){
                        self.locatePopup(triggerNode, self.boundingBox);
                    }

                    node.show();
                };

                onchange(level, node);

                // 重设onchange方法
                self.set('onchange', onchange);

            }
* onblur
	* `Function` 
	* 指定输入节点失去交点时的方法，对于popup类型，需hide强度信息提示节点
	* 默认值：
	 
			function(node){
                var self = this;
                if((self.get('renderType') == 'popup') && node){
                    node.hide();
                }
            }

### 方法
* level()
	* `Number`
	* 根据rule和下列API计算密码强度
	* 返回级别(0, 1, 2, ...)代表(低, 中, 高, ...)
* size()
	* `Number`
	* 当前输入密码的长度
* isIllegal()
	* `Boolean`
	* 是否包含非法字符，例如空格
* isAllNumber()
	* `Boolean`
	* 是否为纯数字
* isAllLetter()
	* `Boolean`
	* 是否为纯字母
* isAllCharacter()
	* `Boolean`
	* 是否为纯符号
* isAllSame()
	* `Boolean`
	* 是否为同一字符
* hasNumber()
	* `Number`
	* 密码中包含的数字的个数
* hasLetter()
	* `Number`
	* 密码中包含的字母的个数
* hasCharacter()
	* `Number`
	* 密码中包含的符号的个数
* hasLowerAndUpperLetter()
	* `Boolean`
	* 是否包含大小写字母混合
* hasNumberAndLetter()
	* `Boolean`
	* 是否同时包含数字和字母