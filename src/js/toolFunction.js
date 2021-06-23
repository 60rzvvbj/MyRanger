/**
 * 
 * 函数功能：给元素添加一个类名
 * 
 * @param {Node} node 要添加类名的对象
 * @param {string} theClass 要添加的类名
 * @returns 当前对象
 * @author 60rzvvbj
 */
function addClass(node, theClass) {
    if (node && theClass) {
        var str = node.getAttribute('class');
        if (str) {
            var arr = str.split(' ');
            var res = '';
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == theClass) {
                    return node;
                }
                res += arr[i] + ' ';
            }
            res += theClass;
            node.setAttribute('class', res);
        } else {
            node.setAttribute('class', theClass);
        }
    }
    return node;
}

/**
 * 
 * 函数功能：删除元素的一个类名
 * 
 * @param {Node} node 要删除类名的对象
 * @param {string} theClass 要删除的类名
 * @returns 当前对象
 * @author 60rzvvbj
 */
function removeClass(node, theClass) {
    if (node && theClass) {
        var str = node.getAttribute('class');
        if (str) {
            var arr = str.split(' ');
            var res = '';
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] != theClass) {
                    res += arr[i] + ' ';
                }
            }
            res = res.substring(0, res.length - 1);
            node.setAttribute('class', res);
        }
    }
    return node;
}

/**
 * 
 * 函数功能：切换元素的一个类名
 * 
 * @param {Node} node 要切换类名的对象
 * @param {string} theClass 要切换的类名
 * @returns 当前对象
 * @author 60rzvvbj
 */
function toggleClass(node, theClass) {
    if (node && theClass) {
        var str = node.getAttribute('class');
        if (str) {
            var arr = str.split(' ');
            var res = '';
            var state = true;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == theClass) {
                    state = false;
                    continue;
                }
                res += arr[i] + ' ';
            }
            if (state) {
                res += theClass + ' ';
            }
            res = res.substring(0, res.length - 1);
            node.setAttribute('class', res);
        } else {
            node.setAttribute('class', theClass);
        }
    }
    return node;
}

/**
 * 
 * 函数功能：替换元素的一个类名
 * 
 * @param {Node} node 要替换类名的对象
 * @param {string} oldClass 要被替换的类名
 * @param {string} newClass 替换的新类名
 * @returns 当前对象
 * @author 60rzvvbj
 */
function replaceClass(node, oldClass, newClass) {
    if (node && oldClass && newClass) {
        var str = node.getAttribute('class');
        var arr = str.split(' ');
        var res = '';
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == oldClass) {
                res += newClass + ' ';
            } else {
                res += arr[i] + ' ';
            }
        }
        res = res.substring(0, res.length - 1);
        node.setAttribute('class', res);
    }
    return node;
}

/**
 * 
 * 函数功能：将元素沿X轴移动
 * 
 * @param {Node} obj 要做动画的对象
 * @param {number} x 目标位置
 * @param {number} v 速度(如果传入0为缓动动画)
 * @param {Function} backFunction 回调函数
 * @author 60rzvvbj
 */
function moveX(obj, x, v, backFunction) {

    // 先清除之前的定时器
    clearInterval(obj.moveXtimer);

    // 如果不是缓动
    if (v != 0) {
        if (obj.offsetLeft < x) { // 如果最开始是小于
            obj.moveXtimer = setInterval(function () {
                if (obj.offsetLeft + v < x) {
                    obj.style.left = obj.offsetLeft + v + 'px';
                } else {
                    obj.style.left = x + 'px';
                    clearInterval(obj.moveXtimer);
                    backFunction && backFunction();
                }
            }, 10)
        } else if (obj.offsetLeft > x) { // 如果最开始是大于
            obj.moveXtimer = setInterval(function () {
                if (obj.offsetLeft - v > x) {
                    obj.style.left = obj.offsetLeft - v + 'px';
                } else {
                    obj.style.left = x + 'px';
                    clearInterval(obj.moveXtimer);
                    backFunction && backFunction();
                }
            }, 10)
        }
    } else { // 缓动

        // 先对目标位置取整
        x = Math.round(x);
        obj.moveXtimer = setInterval(function () {
            if (obj.offsetLeft != x) {
                var t = (x - obj.offsetLeft) / 20;
                if (t > 0) {
                    t = Math.ceil(t);
                } else {
                    t = Math.floor(t);
                }
                obj.style.left = obj.offsetLeft + t + 'px';
            } else {
                clearInterval(obj.moveXtimer);
                backFunction && backFunction();
            }
        }, 10);
    }
}

/**
 * 
 * 函数功能：将元素沿Y轴移动
 * 
 * @param {Node} obj 要做动画的对象
 * @param {number} y 目标位置
 * @param {number} v 速度(如果传入0为缓动动画)
 * @param {Function} backFunction 回调函数
 * @author 60rzvvbj
 */
function moveY(obj, y, v, backFunction) {

    // 和moveX函数原理一样
    clearInterval(obj.moveYtimer);
    if (v != 0) {
        if (obj.offsetTop < y) {
            obj.moveYtimer = setInterval(function () {
                if (obj.offsetTop + v < y) {
                    obj.style.top = obj.offsetTop + v + 'px';
                } else {
                    obj.style.top = y + 'px';
                    clearInterval(obj.moveYtimer);
                    backFunction && backFunction();
                }
            }, 10)
        } else if (obj.offsetTop > y) {
            obj.moveYtimer = setInterval(function () {
                if (obj.offsetTop - v > y) {
                    obj.style.top = obj.offsetTop - v + 'px';
                } else {
                    obj.style.top = y + 'px';
                    clearInterval(obj.moveYtimer);
                    backFunction && backFunction();
                }
            }, 10)
        }
    } else {
        y = Math.round(y);
        obj.moveYtimer = setInterval(function () {
            if (obj.offsetTop != y) {
                var t = (y - obj.offsetTop) / 20;
                if (t > 0) {

                    t = Math.ceil(t);
                } else {

                    t = Math.floor(t);
                }
                obj.style.top = obj.offsetTop + t + 'px';
            } else {
                clearInterval(obj.moveYtimer);
                backFunction && backFunction();
            }
        }, 10);
    }
}

/**
 * 
 * 函数功能：将元素沿Y轴移动(Translate)
 * 
 * @param {Node} obj 要做动画的对象
 * @param {number} y 目标位置
 * @param {number} v 速度(缓动还在研制中)
 * @param {Function} backFunction 回调函数
 * @param {boolean} off 是否直接停止移动
 * @author 60rzvvbj
 */
function moveYT(obj, y, v, backFunction, off) {

    // 先判断传入的对象是否为空
    if (obj) {

        // 先清除之前的定时器
        clearInterval(obj.moveYTtimer);

        // 判断是否要强制结束
        if (!off) {

            // 获取当前的translateY
            var bx, by;
            var l, r;
            if (obj.style.transform.length == 0) {
                bx = 0;
                by = 0;
                l = '';
                r = '';
            } else if (obj.style.transform.split('translate').length == 1) {
                bx = 0;
                by = 0;
                l = '';
                r = ' ' + obj.style.transform;
            } else {
                l = obj.style.transform.split('translate')[0];
                var str = obj.style.transform.split('translate')[1];
                r = str.split(')')[1];
                str = str.split(')')[0];
                str = str.replaceAll('(', '');
                str = str.replaceAll('px', '');
                str = str.replaceAll(' ', '');
                str = str.replaceAll(' ', '');
                bx = str.split(',')[0] - 0;
                by = str.split(',')[1] - 0;
            }

            // 如果速度不为0
            if (v != 0) {

                // 判断是要向上移动还是向下移动，如果目的地和原来的位置一样则不移动直接条用回调函数
                if (by < y) {
                    obj.moveYTtimer = setInterval(function () {
                        if (by + v < y) {
                            obj.style.transform = l + 'translate(' + bx + 'px, ' + (by + v) + 'px)' + r;
                            by += v;
                        } else {
                            obj.style.transform = l + 'translate(' + bx + 'px, ' + y + 'px)' + r;
                            by = y;
                            clearInterval(obj.moveYTtimer);
                            backFunction && backFunction();
                        }
                    }, 10)
                } else if (by > y) {
                    obj.moveYTtimer = setInterval(function () {
                        if (by - v > y) {
                            obj.style.transform = l + 'translate(' + bx + 'px, ' + (by - v) + 'px)' + r;
                            by -= v;
                        } else {
                            obj.style.transform = l + 'translate(' + bx + 'px, ' + y + 'px)' + r;
                            by = y;
                            clearInterval(obj.moveYTtimer);
                            backFunction && backFunction();
                        }
                    }, 10)
                } else {
                    backFunction && backFunction();
                }
            }
        }
    }
}

/**
 * 
 * 函数功能：循环精灵图
 * 
 * @param {Array} obj 要循环精灵图的伪数组
 * @param {number} xy 循环的坐标是横(1)还是纵(0)
 * @param {number} fixed 不循环的坐标的固定坐标
 * @param {number} len 每次循环的距离
 * @author 60rzvvbj
 */
function cycleSprite(obj, xy, fixed, len) {
    if (xy == 0) {
        if (fixed == 'center') {
            for (var i = 0; i < obj.length; i++) {
                obj[i].style.backgroundPosition = 'center -' + i * len + 'px';
            }
        } else {
            for (var i = 0; i < obj.length; i++) {
                obj[i].style.backgroundPosition = fixed + 'px -' + i * len + 'px';
            }
        }
    } else if (xy == 1) {
        if (fixed == 'center') {
            for (var i = 0; i < obj.length; i++) {
                obj[i].style.backgroundPosition = '-' + i * len + 'px center';
            }
        } else {
            for (var i = 0; i < obj.length; i++) {
                obj[i].style.backgroundPosition = '-' + i * len + 'px ' + fixed + 'px';
            }
        }
    }
}

/**
 * 
 * 函数功能：将一个对象添加轮播图的相关事件
 * 
 * 注意事项:
 *      传入的根节点对象要满足以下结构(示例)↓
 * 
 *      <div class="rotationChart">
 *          <div class="leftButton"></div>
 *          <div class="rightButton"></div>
 *          <ul>
 *               <li></li>
 *               <li></li>
 *               <li></li>
 *          </ul>
 *          <ol></ol>
 *      </div>
 * 
 * @param {Node} rotationChart 轮播图根节点对象
 * @param {number} len 图的宽度
 * @param {number} v 轮播速度
 * @param {number} time 每次轮播的时间间隔
 * @author 60rzvvbj
 */
function rotationChartFunction(rotationChart, len, v, time) {
    var ul = rotationChart.querySelector('ul'); // 获取ul
    cycleSprite(ul.children, 0, 0, len); // 循环精灵图
    var leftButton = rotationChart.querySelector('.leftButton'); // 获取左右按钮
    var rightButton = rotationChart.querySelector('.rightButton');
    var ol = rotationChart.querySelector('ol'); // 获取ol
    var rotationChartWidth = rotationChart.offsetWidth; // 获取跟节点的长度

    // 鼠标经过根节点时显示左右按钮，并且停止自动轮播
    rotationChart.addEventListener('mouseover', function () {
        leftButton.style.display = 'block';
        rightButton.style.display = 'block';
        clearInterval(rotationChart.timer);
    });

    // 鼠标离开根节点时隐藏左右按钮，并重新开始自动轮播
    rotationChart.addEventListener('mouseout', function () {
        leftButton.style.display = 'none';
        rightButton.style.display = 'none';
        rotationChart.timer = setInterval(function () {
            rightButton.click();
        }, time);
    });

    // 根据ul里li的个数创建ol中的li，并且给每一个li添加一个自定义属性
    for (var i = 0; i < ul.children.length; i++) {

        var li = document.createElement('li'); // 创建一个li
        li.setAttribute('data-index', i); // 添加自定义属性
        ol.appendChild(li); // 添加到ol里 

        // 添加点击事件
        li.addEventListener('click', function () {

            // 删除掉ol中所有li的current属性
            for (var i = 0; i < ol.children.length; i++) {
                removeClass(ol.children[i], 'current');
            }
            addClass(this, 'current'); // 调用者自己添加current属性
            var index = this.getAttribute('data-index'); // 获取调用者的自定义属性值
            num = index; // 将获取到的值赋给num和circle
            circle = index;
            moveX(ul, -index * rotationChartWidth, v); // 将图滑动到对应位置
        });
    }

    // 一开始给第一个添加current属性
    addClass(ol.children[0], 'current');

    // 将第一张图复制一份放到最后
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    // 初始化变量
    var num = 0; // num记录当前图片所在位置
    var circle = 0; // circle记录ol中当前li的索引
    var flag = true; // flag是节流阀，防止熊孩子连点

    // 左侧按钮点击事件
    leftButton.addEventListener('click', function () {

        // 如果节流阀开着则执行左按钮的事件
        if (flag) {
            flag = false; // 执行一开始先把节流阀关上

            // 如果当前是第一张图，则先瞬间跳到最后一张
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * rotationChartWidth + 'px';
            }
            num--; // 图片向左进行一次移动动画，并修改相应的变量

            // 动画执行结束后打开节流阀
            moveX(ul, -num * rotationChartWidth, v, function () {
                flag = true;
            });
            circle--;

            // 如果小于0了， 则circle跳到最后一张图所对应的li的索引
            circle = circle < 0 ? ol.children.length - 1 : circle;

            // 刷新按钮的类名
            circleChange();
        }
    });

    // 右按钮点击事件
    rightButton.addEventListener('click', function () {

        // 节流阀和左按钮一样
        if (flag) {
            flag = false;

            // 如果是最后一张则先瞬间切换到第一张
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }

            // 执行动画
            num++;
            moveX(ul, -num * rotationChartWidth, v, function () {
                flag = true;
            });

            // 这些都和左按钮同理
            circle++;
            circle = circle == ol.children.length ? 0 : circle;
            circleChange();
        }
    });

    // 刷新ol中li的类名的函数
    function circleChange() {

        // 先清除所有
        for (var i = 0; i < ol.children.length; i++) {
            removeClass(ol.children[i], 'current');
        }

        // 然后给指定的添加
        addClass(ol.children[circle], 'current');
    }

    // 轮播定时器,轮播其实就是点击右按钮,所以直接调用右按钮的点击事件即可
    rotationChart.timer = setInterval(function () {
        rightButton.click();
    }, time);
}

/**
 * 
 * 函数功能：将一个元素添加轮播模块相关事件
 * 
 * 注意事项：
 *      传入的根节点要满足以下结构(示例)↓
 * 
 *      <div class="rotationModular">
 *           <div class="leftButton"></div>
 *           <div class="rightButton"></div>
 *           <div class="rotationModularMain">
 *                <ul>
 *                     <li></li>
 *                     <li></li>
 *                     <li></li>
 *                </ul>
 *           </div>
 *      </div>
 * 
 * @param {Node} rotationModular 轮播模块的根节点
 * @param {number} distance 每次轮播的距离
 * @param {number} number 可见模块的个数
 * @param {number} v 速度
 * @author 60rzvvbj
 */
function rotationModularFunction(rotationModular, distance, number, v) {

    // 获取左右按钮
    var leftButton = rotationModular.querySelector('.leftButton');
    var rightButton = rotationModular.querySelector('.rightButton');

    // 获取ul
    var ul = rotationModular.querySelector('ul');

    // 记录当前页的索引，初始在第一页
    var current = 0;
    hideArrow();
    var len = Math.ceil(ul.children.length / number);

    // 显示，隐藏左右按钮函数
    function hideArrow() {

        // 如果当前在第一页，则隐藏左按钮，反之显示左按钮
        if (current == 0) {
            leftButton.style.display = 'none';
        } else {
            leftButton.style.display = 'block';
        }

        // 同理↑
        if (current == len - 1) {
            rightButton.style.display = 'none';
        } else {
            rightButton.style.display = 'block';
        }
    }

    // 回调函数
    function backFuction() {
        hideArrow();
        flag = true;
    }

    // 节流阀，和轮播图中节流阀的作用一样
    var flag = true;

    // 左右按钮点击事件
    leftButton.addEventListener('click', function () {
        if (flag) {
            flag = false;
            current--;
            moveX(ul, -distance * current, v, backFuction);
        }
    })
    rightButton.addEventListener('click', function () {
        if (flag) {
            flag = false;
            current++;
            moveX(ul, -distance * current, v, backFuction);
        }
    })
}

/**
 * 
 * 函数功能：添加页面竖直滚动事件
 * 
 * @param {number} y 滚动终点的纵坐标
 * @param {Function} backFuction 回调函数
 * @author 60rzvvbj
 */
function windowMove(y, backFuction) {

    // 先清除之前的计时器
    clearInterval(window.timer);

    // 添加计时器
    window.timer = setInterval(function () {

        // 移动动画
        var t = (y - window.pageYOffset) / 10;
        t = t > 0 ? Math.ceil(t) : Math.floor(t);

        // 如果到了目标位置，则清除定时器，调用回调函数
        if (window.pageYOffset == y) {
            clearInterval(window.timer);
            backFuction && backFuction();
        }
        window.scroll(0, window.pageYOffset + t);
    }, 15);
}

/**
 * 
 * 函数功能：添加输入框的焦点事件
 * 
 * @param {Node} obj 要添加事件的表单对象
 * @param {string} defaultText 表单中默认文字
 * @param {string} defaultColor 默认文字的颜色
 * @param {string} changeColor 改变之后的颜色
 * @param {Function} focesFunction focus额外函数
 * @param {Function} blurFunction blur额外函数
 * @author 60rzvvbj
 */
function inputFocusBlur(obj, defaultText, defaultColor, changeColor, focesFunction, blurFunction) {
    obj.value = defaultText;
    obj.addEventListener('focus', function () {
        if (this.value == defaultText) {
            this.value = '';
            this.style.color = changeColor;
            focesFunction && focesFunction();
        }
    })
    obj.addEventListener('blur', function () {
        if (this.value == '') {
            this.value = defaultText;
            this.style.color = defaultColor;
            blurFunction && blurFunction();
        }
    })
}

/**
 *
 * 函数功能：添加跳转到副页的点击事件
 * 
 * @param {Array} arr 储存要添加事件的元素的伪数组
 * @author 60rzvvbj
 */
function goAuxiliaryPage(arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i].addEventListener('click', function () {
            window.location.href = 'auxiliaryPage.html';
        })
    }
}

/**
 * 
 * 函数功能：添加导航栏高亮事件
 * 
 * @param {Array} arr 主模块的伪数组
 * @param {Node} ul 导航栏的根节点ul
 * @param {number} top 第一个主模块距离页面最上方的距离
 * @param {number} height 每个主模块的高度
 * @param {number} zoomError 用来解决缩放产生的误差的变量
 * @param {Node} sortOnOff 排序开关节点
 * @author 60rzvvbj
 */
function navigationBarHighlighted(arr, ul, top, height, zoomError, sortOnOff) {

    // 用来判断开关状态的布尔值变量
    var sortState = false;

    // 当前高亮的元素的索引
    var t = 0;

    // 获取主模块的父节点
    var mainParent = arr[0].parentElement;

    // 通过主模块在导航栏ul中创建对应的li
    for (var i = 0; i < arr.length; i++) {
        var li = document.createElement('li'); // 创建li
        li.innerHTML = arr[i].getAttribute('data-text'); // 根据主模块设置li中的文本
        li.setAttribute('data-index', i); // 添加自定义索引

        // 添加点击事件函数
        li.clickFunction = function () {
            removeClass(ul.children[t], 'highlight'); // 将之前的高亮元素的高亮去掉
            t = this.getAttribute('data-index'); // 更新变量t
            addClass(ul.children[t], 'highlight'); // 将新的高亮元素添加高亮
            window.scroll(0, top + height * t); // 将页面跳转到对应位置
        }

        // 添加排序事件函数
        li.sortFunction = function (e) {
            var that = this; // 用来储存当前的这个li对象(方便在之后事件处理函数中调用)
            var flag = parseInt(this.getAttribute('data-index')); // 获取当前元素的索引号
            var BmainN = mainParent.children[flag]; // 获取当前元素对应的主模块对象
            var y = e.pageY; // 获取鼠标纵坐标
            var Bflag = flag; // 用来备份当前元素索引号
            var upLimit = -Bflag * that.offsetHeight + y; // 计算出拖动时的上界
            var downLimit = (ul.children.length - 1 - Bflag) * that.offsetHeight + y; // 下界

            // 给当前的这个li对象添加一些样式
            that.style.position = 'relative';
            that.style.zIndex = '99999999';
            addClass(ul.children[flag], 'highlight');

            // 添加鼠标移动事件
            document.addEventListener('mousemove', move);

            // 把其它元素做上标记，false代表上，true代表下
            for (var i = 0; i < flag; i++) {
                ul.children[i].direction = false;
            }
            for (var i = flag + 1; i < ul.children.length; i++) {
                ul.children[i].direction = true;
            }

            // 鼠标移动事件函数
            function move(e) {

                // 让选中的盒子随着鼠标移动而移动（保持盒子不超出父盒子的范围）
                that.style.transform = 'translate(' + '0px, ' + (Math.max(Math.min(e.pageY, downLimit), upLimit) - y) + 'px)';
                var ch; // 索引相对于之前的改变量
                if (e.pageY - y > 0) {
                    ch = Math.ceil((e.pageY - y - that.offsetHeight / 2) / that.offsetHeight);
                } else {
                    ch = Math.floor((e.pageY - y + that.offsetHeight / 2) / that.offsetHeight);
                }
                var BflagN = ul.children[Bflag + ch]; // 获取索引改变之后的位置的盒子
                var now = ul.children[flag]; // 获取索引改变之前的盒子
                if (BflagN) {
                    if (BflagN == now) {
                        for (var i = 0; i < ul.children.length; i++) {
                            if (ul.children[i] != now) {
                                moveYT(ul.children[i], 0, 2);
                            }
                        }
                    } else {
                        if (BflagN.direction) {
                            for (var i = 0; i < flag; i++) {
                                moveYT(ul.children[i], 0, 2);
                            }
                            for (var i = flag + 1; i <= Bflag + ch; i++) {
                                moveYT(ul.children[i], -that.offsetHeight, 2);
                            }
                            for (var i = Bflag + ch + 1; i < ul.children.length; i++) {
                                moveYT(ul.children[i], 0, 2);
                            }
                        } else {
                            for (var i = 0; i < Bflag + ch; i++) {
                                moveYT(ul.children[i], 0, 2);
                            }
                            for (var i = Bflag + ch; i < flag; i++) {
                                moveYT(ul.children[i], that.offsetHeight, 2);
                            }
                            for (var i = flag + 1; i < ul.children.length; i++) {
                                moveYT(ul.children[i], 0, 2);
                            }
                        }
                    }
                }
            }

            // 鼠标抬起事件函数
            function up(e) {

                // 将拖动过程中产生的transform属性清除掉
                for (var i = 0; i < ul.children.length; i++) {
                    moveYT(ul.children[i], 0, 10, function () {
                        ul.children[i].style.transform = '';
                    }, true);
                    ul.children[i].style.transform = '';
                }

                // 判断是上移还是下移并且计算出拖动后的索引号
                if (e.pageY - y > 0) {
                    flag += Math.ceil((e.pageY - y - that.offsetHeight / 2) / that.offsetHeight);
                } else {
                    flag += Math.floor((e.pageY - y + that.offsetHeight / 2) / that.offsetHeight);
                }
                flag = Math.max(flag, 0);
                flag = Math.min(flag, ul.children.length - 1);

                // 判断是否被拖动到了最后，然后将元素从父元素中删除掉之后，再添加到对应位置就实现了重排序的功能
                if (flag == ul.children.length - 1) {
                    mainParent.removeChild(BmainN);
                    ul.removeChild(that);
                    mainParent.appendChild(BmainN);
                    ul.appendChild(that);
                } else {
                    var flagN;
                    var mainN;
                    if (flag - Bflag < 0) {
                        flagN = ul.children[flag];
                        mainN = mainParent.children[flag];
                    } else {
                        flagN = ul.children[flag + 1];
                        mainN = mainParent.children[flag + 1];
                    }
                    if (BmainN != mainN) {
                        mainParent.removeChild(BmainN);
                        ul.removeChild(that);
                        mainParent.insertBefore(BmainN, mainN);
                        ul.insertBefore(that, flagN);
                    }
                }

                // 清除拖动过程中产生的属性
                that.style.position = '';
                that.style.zIndex = '';
                removeClass(that, 'highlight');

                // 调换了顺序之后将li中用来保存索引号的自定义属性重置一遍
                for (var i = 0; i < ul.children.length; i++) {
                    ul.children[i].setAttribute('data-index', i); // 重置自定义索引
                }

                // 最后再删除鼠标移动和抬起事件
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', up);
            }

            // 添加鼠标抬起事件
            document.addEventListener('mouseup', up)
        }

        // 将li添加到ul中
        ul.appendChild(li);
    }

    // 整个页面添加scroll事件
    document.addEventListener('scroll', function () {

        // 根据页面滚动位置维护当前高亮元素索引变量t,并且判断是否是排序状态决定是否切换高亮元素的类名
        if (sortState == false) {
            removeClass(ul.children[t], 'highlight');
            t = parseInt((window.pageYOffset + zoomError - top) / height);
            t = Math.max(t, 0);
            t = Math.min(t, ul.children.length - 1);
            addClass(ul.children[t], 'highlight');
        } else {
            t = parseInt((window.pageYOffset + zoomError - top) / height);
            t = Math.max(t, 0);
            t = Math.min(t, ul.children.length - 1);
        }
    })

    // 切换到运行状态的函数
    function on() {
        addClass(ul.children[t], 'highlight');
        for (var i = 0; i < ul.children.length; i++) {
            ul.children[i].removeEventListener('mousedown', ul.children[i].sortFunction);
            ul.children[i].addEventListener('click', ul.children[i].clickFunction);
        }
    }

    // 切换到排序状态的函数
    function off() {
        removeClass(ul.children[t], 'highlight');
        for (var i = 0; i < ul.children.length; i++) {
            ul.children[i].removeEventListener('click', ul.children[i].clickFunction);
            ul.children[i].addEventListener('mousedown', ul.children[i].sortFunction);
        }
    }

    on(); // 初始化

    // 绑定开关点击事件
    sortOnOff.addEventListener('click', function () {
        if (sortState) {
            on();
        } else {
            off();
        }
        sortState = !sortState;
    })
}

/**
 * 
 * 函数功能：生成一个以左右端点为界的随机小数
 * 
 * @param {number} l 左端点
 * @param {number} r 右端点
 * @returns {number} 返回生成的随机数
 * @author 60rzvvbj
 */
function getDoubleRandom(l, r) {
    return l + Math.random() * (r - l + 1);
}

/**
 * 
 * 函数功能：生成一个以左右端点为界的随机整数
 * 
 * @param {number} l 左端点
 * @param {number} r 右端点
 * @returns {number} 返回生成的随机数
 * @author 60rzvvbj
 */
function getIntRandom(l, r) {
    return parseInt(getDoubleRandom(l, r));
}

/**
 * 
 * 函数功能：判断字符串中是否含有大写字母
 * 
 * @param {string} str 要判断的字符串
 * @returns {boolean} 判断的结果
 * @author 60rzvvbj
 */
function judgeBigLetter(str) {
    var judge = false;
    for (var i = 0; i < str.length; i++) {
        var ch = str.charCodeAt(i);
        if (ch >= 65 && ch <= 90) {
            judge = true;
        }
    }
    return judge;
}

/**
 * 
 * 函数功能：判断字符串中是否含有小写字母
 * 
 * @param {string} str 要判断的字符串
 * @returns {boolean} 判断的结果
 * @author 60rzvvbj
 */
function judgeSmallLetter(str) {
    var judge = false;
    for (var i = 0; i < str.length; i++) {
        var ch = str.charCodeAt(i);
        if (ch >= 97 && ch <= 122) {
            judge = true;
        }
    }
    return judge;
}

/**
 * 
 * 函数功能：判断字符串中是否含有字母
 * 
 * @param {string} str 要判断的字符串
 * @returns {boolean} 判断的结果
 * @author 60rzvvbj
 */
function judgeLetter(str) {
    return judgeSmallLetter(str) || judgeBigLetter(str);
}

/**
 * 
 * 函数功能：判断字符串中是否含有数字
 * 
 * @param {string} str 要判断的字符串
 * @returns {boolean} 判断的结果
 * @author 60rzvvbj
 */
function judgeNumber(str) {
    var judge = false;
    for (var i = 0; i < str.length; i++) {
        var ch = str.charCodeAt(i);
        if (ch >= 48 && ch <= 57) {
            judge = true;
        }
    }
    return judge;
}

function judgeOnlyNumberAndLetter(str) {
    for (var i = 0; i < str.length; i++) {
        var ch = str.charCodeAt(i);
        if (!((ch >= 48 && ch <= 57) || (ch >= 65 && ch <= 90) || (ch >= 97 && ch <= 122))) {
            return false;
        }
    }
    return true;
}
/**
 * 
 * 函数功能：在数组arr的末尾添加从initials开始递增的len个字符
 * 
 * @param {Array} arr 数组
 * @param {number} initials 首个字符对应的ASCII码值
 * @param {number} len 长度
 * @author 60rzvvbj
 */
function arrayAddChar(arr, initials, len) {
    for (var i = 0; i < len; i++) {
        arr[arr.length] = String.fromCharCode(initials);
        initials++;
    }
}

/**
 * 
 * 函数功能：给元素添加可拖动的功能
 * 
 * @param {Node} div 元素节点
 * @author 60rzvvbj
 */
function addDrag(div) {
    div.startDrag = function (e) {

        // 获取translate,X,Y
        var tx, ty;
        var l, r;
        if (div.style.transform.length == 0) {
            l = '';
            r = '';
        }
        if (div.style.transform.split('translate').length == 1) {
            tx = 0;
            ty = 0;
            l = '';
            r = ' ' + div.style.transform;
        } else {
            l = div.style.transform.split('translate')[0];
            str = div.style.transform.split('translate')[1];
            r = str.split(')')[1];
            str = str.split(')')[0];
            str = str.replaceAll('(', '');
            str = str.replaceAll('px', '');
            str = str.replaceAll(' ', '');
            str = str.split(',');
            tx = str[0] - 0;
            ty = str[1] - 0;
        }

        // 获取点击时的鼠标位置
        var x = e.pageX;
        var y = e.pageY;

        // 添加鼠标移动事件
        document.addEventListener('mousemove', move);

        // 移动时让元素的translate随着鼠标位置的变化而变化
        function move(e) {
            div.style.transform = l + 'translate(' + (e.pageX - x + tx) + 'px, ' + (e.pageY - y + ty) + 'px)' + r;
        }

        // 鼠标弹起时清除鼠标移动事件和鼠标弹起事件
        function up(e) {
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseup', up);
        }

        //添加鼠标弹起事件
        document.addEventListener('mouseup', up);
    }

    // 添加鼠标按下事件
    div.addEventListener('mousedown', div.startDrag);
}

/**
 * 
 * 函数功能：删除元素的可拖动功能
 * 
 * @param {Node} div 元素节点
 * @author 60rzvvbj
 */
function deleteDrag(div) {

    // 清除掉通过addDrag产生的效果，即清除掉该元素的鼠标按下事件
    div.removeEventListener('mousedown', div.startDrag);

    // 将该元素的.strartDrag函数也清除掉
    div.startDrag = undefined;
}

/**
 * 
 * 函数功能：获取(l,r)范围内随机颜色
 * 
 * @param {number} l 左端点
 * @param {number} r 右端点
 * @returns 返回一个rgb字符串
 * @author 60rzvvbj
 */
function randomColor(l, r) {
    return 'rgb(' + getIntRandom(l, r) + ',' + getIntRandom(l, r) + ',' + getIntRandom(l, r) + ')';
}

/**
 * 
 * 函数功能：在屏幕顶部显示一段慢慢消失的文字(需要搭配topAlert样式使用)
 * 
 * @param {string} str 要显示的文字
 * @param {number} v 速度(默认值为100)，数值越大越慢
 * @author 60rzvvbj
 */
function topAlert(str, v) {

    // 创建一个div节点
    var div = document.createElement('div');

    // 获取html元素
    var html = getHtml();

    // 初始化速度
    v = v ? v : 100;

    // 设置文本和属性
    div.innerHTML = str;
    div.style.color = randomColor(100, 180);
    addClass(div, 'topAlert');
    html.appendChild(div);
    var i = 0;
    div.timer = setInterval(function () {
        if (i == v) {
            clearInterval(div.timer);
            html.removeChild(div);
        } else {
            i++;
            div.style.opacity = 1 / v * (v - i) + '';
            div.style.top = 15 - 10 / v * i + 'vh';
        }
    }, 20);
}

/**
 * 
 * 函数功能：设置input标签提示文字
 * 
 * @param {Node} input input标签
 * @param {string} tipsText 提示文字
 * @param {string} className 提示文字对应的样式类名
 * @author 60rzvvbj
 */
function inputTips(input, tipsText, className) {
    if (input.type == 'password') {
        input.value = tipsText;
        input.type = 'text';
        input.addClass(className);
        input.onfocus = function () {
            if (input.value == tipsText) {
                input.value = '';
                input.type = 'password';
                input.removeClass(className);
            }
        }
        input.onblur = function () {
            if (input.value == '') {
                input.value = tipsText;
                input.type = 'text';
                input.addClass(className);
            }
        }
        // input.addEventListener('focus', function () {
        //     if (input.value == tipsText) {
        //         input.value = '';
        //         input.type = 'password';
        //         input.removeClass(className);
        //     }
        // });
        // input.addEventListener('blur', function () {
        //     if (input.value == '') {
        //         input.value = tipsText;
        //         input.type = 'text';
        //         input.addClass(className);
        //     }
        // });
    } else {
        input.value = tipsText;
        input.addClass(className);
        // input.addEventListener('focus', function () {
        //     if (input.value == tipsText) {
        //         input.value = '';
        //         input.removeClass(className);
        //     }
        // });
        // input.addEventListener('blur', function () {
        //     if (input.value == '') {
        //         input.value = tipsText;
        //         input.addClass(className);
        //     }
        // });
        input.onfocus = function () {
            if (input.value == tipsText) {
                input.value = '';
                input.removeClass(className);
            }
        }
        input.onblur = function () {
            if (input.value == '') {
                input.value = tipsText;
                input.addClass(className);
            }
        }
    }
}

/**
 * 
 * 函数功能：判断一个节点是否为另一个节点的子节点
 * 
 * @param {Node} node 一个节点
 * @param {Node} parentNode 另一个节点
 * @author 60rzvvbj
 */
function isParent(node, parentNode) {
    while (node != undefined && node != null && node.tagName.toUpperCase() != 'HTML') {
        if (node == parentNode) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

/**
 * 
 * 函数功能：给按钮和盒子添加点击按钮打开盒子，点击空白关闭盒子的效果
 * 
 * @param {Node} button 按钮
 * @param {Node} box 盒子
 */
function clickOpenBlankClose(button, box) {
    box.style.display = 'none';
    button.addEventListener('click', function () {
        if (box.style.display == 'block') {
            box.style.display = 'none';
        } else {
            box.style.display = 'block';
        }
    });
    document.addEventListener('click', function (e) {
        e = e || window.event;
        if (!isParent(e.target, box) && e.target != button) {
            box.style.display = 'none';
        }
    });
}
Node.prototype.addClass = function (theClass) {
    return addClass(this, theClass);
}
Node.prototype.removeClass = function (theClass) {
    return removeClass(this, theClass);
}
Node.prototype.toggleClass = function (theClass) {
    return toggleClass(this, theClass);
}
Node.prototype.replaceClass = function (oldClass, newClass) {
    return replaceClass(this, oldClass, newClass);
}

/**
 * 
 * 函数功能：使元素全屏显示
 * 
 * @param {*} node 要全屏显示的元素
 * @author 60rzvvbj
 */
function domFullScreen(node) {
    if (node.requestFullscreen) {
        node.requestFullscreen();
    } else if (node.mozRequestFullScreen) {
        node.mozRequestFullScreen();
    } else if (node.webkitRequestFullScreen) {
        node.webkitRequestFullScreen();
    }
}

/**
 * 
 * 函数功能：退出全屏
 * 
 * @author 60rzvvbj
 */
function cancelFullscreen() {
    if (document.cancelFullScreen) {
        document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
};

Node.prototype.show = function () {
    this.style.display = 'block';
}
Node.prototype.hide = function () {
    this.style.display = 'none';
}

/**
 * 
 * 函数功能：设置cookie
 * 
 * @param {JSON} json 参数列表
 * @param {number} time 有效时间
 * @author 60rzvvbj
 */
function setCookie(json, time) {
    var date = new Date(Date.now() + time * 86400000).toUTCString();
    for (var key in json) {
        document.cookie = key + "=" + json[key] + "; expires=" + date;
    }
}

/**
 * 
 * 函数功能：获取cookie
 * 
 * @param {string} attr 字段名
 * @author 60rzvvbj
 */
function getCookie(attr) {
    var t = document.cookie.match(new RegExp("(^|\\s)" + attr + "=([^;]+)(;|$)"));
    return t != null ? t[2] : null;
}

/**
 * 
 * 函数功能：获取cookie
 * 
 * @param {string} attr 字段名
 * @author 60rzvvbj
 */
function removeCookie(attr) {
    var json = {};
    json[attr] = "";
    setCookie(json, -1);
}

/**
 * 
 * 函数功能：获取url中参数
 * 
 * @param {string} attr 字段名
 * @author 60rzvvbj
 */
function getLocation(attr) {
    var t = location.search.substr(1).match(new RegExp("(^|&)" + attr + "=([^&]*)(&|$)"));
    return t != null ? t[2] : null;
}

/**
 * 
 * 函数功能：给输入框添加回车事件
 * 
 * @param {Node} input 输入框元素
 * @param {function} fun 回车执行的函数
 * @author 60rzvvbj
 */
function inputEnterEvent(input, fun) {
    input.addEventListener('keydown', function (e) {
        if (e.keyCode == 13) {
            fun();
        }
    });
}

Node.prototype.inputEnterEvent = function (fun) {
    inputEnterEvent(this, fun);
}

/**
 * 
 * 函数功能：通过样式名获取元素行内style中样式
 * 
 * @param {Node} dom dom对象
 * @param {string} key 属性名
 * @author 60rzvvbj
 */
function getCSS(dom, key) {
    var t = dom.style.cssText.match(new RegExp("(^|\\s)" + key + ": ([^;]+)(;|$)"));
    return t != null ? t[2] : null;
}

Node.prototype.getCSS = function (key) {
    return getCSS(this, key);
}

/**
 * 
 * 函数功能：将数据复制到剪切板
 * 
 * @param {string} text 要复制到剪切板的内容
 * @author 60rzvvbj
 */
function setShearPlateData(text) {
    var input = document.createElement('input');
    document.body.appendChild(input);
    input.setAttribute('value', text);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
}

/**
 * 
 * 函数功能：给输入框添加 ctrl + A 全选文本事件
 * 
 * @param {Node} input 要添加全选的输入框
 * @author 60rzvvbj
 */
function inputSelectAllText(input) {
    input.addEventListener('keydown', function (e) {
        if (e.key == 'a') {
            if (e.ctrlKey) {
                input.setSelectionRange(0, input.value.length);
            }
        }
    });
}
Node.prototype.inputSelectAllText = function () {
    inputSelectAllText(this);
}

/**
 * 
 * 设置文本动态垂直居中
 * 
 * @param {Node} node 要垂直居中文本的盒子
 * @author 60rzvvbj
 * @author tracy
 */
function textVerticalCenter(node) {
    var height = window.getComputedStyle ? window.getComputedStyle(node).height : 'nothing!';
    node.style.lineHeight = height;
    window.addEventListener('resize', function () {
        var height = window.getComputedStyle ? window.getComputedStyle(node).height : 'nothing!';
        node.style.lineHeight = height;
    });
    // debugger
    // node.style.lineHeight = node.offsetHeight;
    // window.addEventListener('resize', function () {
    //     node.style.lineHeight = node.offsetHeight;
    // });
}
Node.prototype.textVerticalCenter = function () {
    textVerticalCenter(this);
}

/**
 * 左右滑动
 * 
 * @param {object} obj 对象
 * @param {*} attr 要执行动画的样式比如：left height
 * @param {*} target 目标位移 
 * @param {*} speed 速度
 * @param {*} callback 回调函数，动画执行完毕以后执行
 * @author tracy
 */
function moveLeftRight(obj, attr, target, speed, callback) {
    //关闭上一个定时器
    clearInterval(obj.timer);
    //获取原来位置
    var current = parseInt(getStyle(obj, attr));
    //目标位置等于当前位置加上位移
    target = current + target;
    //判断速度正负值
    if (current > target) {
        //速度负值
        speed = -speed;
    }
    //定时器动画效果
    //执行对象添加timer属性
    obj.timer = setInterval(function () {
        //获取原来位置
        var oldvalue = parseInt(getStyle(obj, attr));
        //旧值基础上增加
        var newvalue = oldvalue + speed;
        //判断大于小于
        if (speed < 0 && newvalue < target || speed > 0 && newvalue > target)
            newvalue = target;
        //将新值设置给元素
        obj.style[attr] = newvalue + "px";
        //当移动到位置停下
        if (newvalue == target) {
            //关闭定时器
            clearInterval(obj.timer);
            //动画执行完毕，调用回调函数
            callback && callback();
        }
    }, 30);
}

/**
 * 
 * @param {*} obj 元素
 * @param {*} name 要获取的样式名
 * @author tracy
 */
function getStyle(obj, name) {
    if (window.getComputedStyle) {
        //正常浏览器的方式，有此方法
        return getComputedStyle(obj, null)[name];
    } else {
        //IE8方法
        return obj.currentStyle[name];
    }
    // return window.getComputedStyle?getComputedStyle(obj,null)[name]:obj.currentStyle[name];
}

/**
 * 
 * 函数功能：节流
 * 
 * @param {Function} fn 函数
 * @param {number} delay 时间
 * @author 60rzvvbj
 */
function throttle(fn, delay) {
    let timer = null;
    return function () {
        if (timer) {
            return;
        }
        fn.apply(this, arguments);
        timer = setTimeout(() => {
            timer = null;
        }, delay);
    }
}

/**
 * 
 * 函数功能：防抖
 * 
 * @param {Function} fn 函数
 * @param {number} delay 时间
 * @author 60rzvvbj
 */
function debounce(fn, delay) {
    let timer = null;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments);
            timer = null;
        }, delay);
    }
}

/**
 * 
 * 函数功能：删除页面中的dom元素
 * 
 * @param {Node} node dom元素
 * @author 60rzvvbj
 */
function removeDom(node) {
    node.parentNode.removeChild(node);
}

Node.prototype.removeDom = function () {
    removeDom(this);
}
/**
 * 
 * 函数功能：删除元素的所有子元素
 * 
 * @param {Node} node dom元素
 * @author 60rzvvbj
 */
function removeAllChild(node) {
    while (node.children.length) {
        node.removeChild(node.children[0]);
    }
}

Node.prototype.removeAllChild = function () {
    removeAllChild(this);
}