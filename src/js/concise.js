/**
 *
 * 函数功能:获取页面HTML元素
 * 
 * @returns 返回HTML对象
 * @author 60rzvvbj
 */
function getHtml() {
    return document.documentElement;
}

/**
 *
 * 函数功能:获取单个元素
 * 
 * @param {String} str 元素的选择器
 * @param {Node} node 获取的元素的父节点，不传入默认为document
 * @returns 返回选择器所对应的对象
 * @author 60rzvvbj
 */
function getDom(str, node) {
    try {
        return node ? node.querySelector(str) : document.querySelector(str);
    } catch (e) {
        return null;
    }
}

/**
 *
 * 函数功能:获取一坨元素
 * 
 * @param {String} str 元素的选择器
 * @param {Node} node 获取的元素的父节点，不传入默认为document
 * @returns 返回选择器所对应的对象所组成的数组
 * @author 60rzvvbj
 */
function getDomA(str, node) {
    try {
        return node ? node.querySelectorAll(str) : document.querySelectorAll(str);
    } catch (e) {
        return new Array();
    }
}

/**
 * 
 * 新增String函数replaceAll
 * 函数功能：替换全部字符串
 * 
 * @param {string} oldStr 要被替换的字符串
 * @param {string} newStr 用于替换的字符串
 * @returns {string} 替换之后的字符串
 * @author 60rzvvbj
 */
String.prototype.replaceAll = function (oldStr, newStr) {
    str = this;
    while (str.replace(oldStr, newStr) != str) {
        str = str.replace(oldStr, newStr);
    }
    return str;
}
Node.prototype.getDom = function (str) {
    return getDom(str, this);
}
Node.prototype.getDomA = function (str) {
    return getDomA(str, this);
}

const DAY = 86400000; // 一天
const WEEK = 604800000; // 一周
const MONTH = 2592000000; // 30天
const YEAR = 31536000000; // 365天