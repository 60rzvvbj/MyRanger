//#region MinHeap-------------------
/**
 * 最小堆
 */
class MinHeap {
	constructor(maxlen) {
		var heap = new Array(maxlen);
		var len = 1;

		this.push = function (data) {
			heap[len] = data;
			up(len++);
		}

		this.pop = function () {
			var res = heap[1];
			heap[1] = heap[--len];
			down();
			return res;
		}

		var up = function (index) {
			while (index > 1 && heap[index] < heap[parseInt(index / 2)]) {
				swap(index, parseInt(index / 2));
				index = parseInt(index / 2);
			}
		}

		var down = function () {
			var index = 1;
			while (index < len) {
				if (index * 2 + 1 < len) {
					if (heap[index * 2] < heap[index * 2 + 1]) {
						if (heap[index * 2] < heap[index]) {
							swap(index, index * 2);
							index *= 2;
						} else {
							break;
						}
					} else {
						if (heap[index * 2 + 1] < heap[index]) {
							swap(index, index * 2 + 1);
							index = index * 2 + 1;
						} else {
							break;
						}
					}
				} else if (index * 2 < len) {
					if (heap[index * 2] < heap[index]) {
						swap(index, index * 2);
					}
					break;
				} else {
					break;
				}
			}
		}

		var swap = function (a, b) {
			heap[0] = heap[a];
			heap[a] = heap[b];
			heap[b] = heap[0];
		}
	}
}
//#endregion

//#region MinHeapTest---------------
// var mh = new MinHeap(6);
// mh.push(5.6);
// mh.push(2.4);
// mh.push(3);
// mh.push(1.3);
// mh.push(6.0);
// mh.push(4.5);
// for (var i = 0; i < 6; i++) {
//     console.log(mh.pop());
// }
//#endregion

//#region MyMap--------------------

/**
 * 字典
 */
class MyMap {
	constructor() {
		var root = null;
		var arr;
		this.push = function (key, value) {
			if (root == null) {
				root = new MapNode(key, value);
			} else {
				var nowNode = root;
				while (nowNode != null) {
					if (nowNode.key == key) {
						nowNode.value = value;
						return;
					} else if (nowNode.key > key) {
						if (nowNode.left != null) {
							nowNode = nowNode.left;
						} else {
							nowNode.left = new MapNode(key, value);
							return;
						}
					} else {
						if (nowNode.right != null) {
							nowNode = nowNode.right;
						} else {
							nowNode.right = new MapNode(key, value);
							return;
						}
					}
				}
			}
		};

		this.get = function (key) {
			var nowNode = root;
			while (nowNode != null) {
				if (nowNode.key == key) {
					return nowNode.value;
				} else if (nowNode.key > key) {
					nowNode = nowNode.left;
				} else {
					nowNode = nowNode.right;
				}
			}
		}

		this.toArray = function () {
			arr = [];
			dfs(root);
			return arr;
		}

		this.clear = function () {
			root = null;
		}

		var dfs = function (node) {
			if (node != null) {
				arr.push({
					key: node.key,
					value: node.value
				});
				dfs(node.left);
				dfs(node.right);
			}
		}
	}
}

class MapNode {
	constructor(key, value) {
		this.key = key;
		this.value = value;
		this.left = null;
		this.right = null;
	}
}
//#endregion

//#region MyMapTest--------------------------
// var mm = new MyMap();
// mm.push('张三', 1);
// mm.push(2, null);
// mm.push('asd', 3.5);
// mm.push(1.2, 'qwe');
// console.log(mm.get('张三'));
// console.log(mm.get(2));
// console.log(mm.get('asd'));
// console.log(mm.get(1.2));
// var arr = mm.toArray();
// for (var i = 0; i < arr.length; i++) {
//     console.log(arr[i].key + ' : ' + arr[i].value);
// }
//#endregion

//#region Stack------------------------

/**
 * 栈
 */
class Stack {
	constructor() {
		var nowNode = null;

		this.isEmpty = function () {
			return nowNode == null;
		}

		this.push = function (value) {
			var node = new StackNode(value);
			node.next = nowNode;
			nowNode = node;
		}

		this.pop = function () {
			if (nowNode) {
				var res = nowNode.value;
				nowNode = nowNode.next;
				return res;
			} else {
				return null;
			}
		}

		this.peek = function () {
			if (nowNode) {
				return nowNode.value;
			} else {
				return null;
			}
		}
	}
}

class StackNode {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}

//#endregion

//#region StactTest---------------------
// var s = new Stack();
// s.push(3);
// s.push('张三');
// console.log(s.peek());
// s.push(5);
// console.log(s.peek());
// s.push('李四');
// console.log(s.pop());
// s.push(3.4);
// console.log(s.pop());
// s.push({
//     name: '王五',
//     age: 12
// });
// s.push(4);
// s.push(1);
// while (!s.isEmpty()) {
//     console.log(s.pop());
// }
//#endregion

//#region LinkedList----------------------

class LinkedList {
	constructor() {
		var head = null;
		var tail = null;

		// 在头部添加元素
		this.offerFirst = function (value) {
			var node = new LinkedListNode(value);
			if (this.isEmpty()) {
				head = node;
				tail = node;
			} else {
				head.last = node;
				node.next = head;
				head = node;
			}
		}

		// 在尾部添加元素
		this.offerLast = function (value) {
			var node = new LinkedListNode(value);
			if (this.isEmpty()) {
				head = node;
				tail = node;
			} else {
				tail.next = node;
				node.last = tail;
				tail = node;
			}
		}

		// 获取第一个元素
		this.getFirst = function () {
			return head;
		}

		// 获取最后一个元素
		this.getLast = function () {
			return tail;
		}

		// 删除并返回第一个元素
		this.pollFirst = function () {
			if (this.isEmpty()) {
				return null;
			} else {
				var res = head;
				head = head.next;
				if (head == null) {
					tail = null;
				}
				return res;
			}
		}

		// 删除并返回最后一个元素
		this.pollLast = function () {
			if (this.isEmpty()) {
				return null;
			} else {
				var res = tail;
				tail = tail.last;
				if (tail == null) {
					head = null;
				}
				return res;
			}
		}

		// 判断是否为空
		this.isEmpty = function () {
			return head == null;
		}

		// 清除链表中元素
		this.clear = function () {
			head = null;
			tail = null;
		}
	}
}

class LinkedListNode {
	constructor(value) {
		this.value = value;
		this.last = null;
		this.next = null;
	}
}
//#endregion

//#region LinkedListTest--------------------

// var ll = new LinkedList();
// ll.offerFirst('张三');
// ll.offerFirst(2);
// ll.offerFirst('李四');
// ll.offerFirst(4);
// ll.offerFirst({
//     name: '王五',
//     age: 20
// });
// ll.offerLast(5);
// ll.offerLast(4);
// ll.offerLast(3);
// ll.offerLast(2);
// ll.offerLast(1);
// while (!ll.isEmpty()) {
//     console.log(ll.pollFirst().value);
// }

//#endregion

//#region Timer-----------------------

class Timer {
	constructor() {
		this.test = function (fn) {
			var start = Date.now();
			fn();
			var end = Date.now();
			return end - start;
		}
	}
}

//#endregion

//#region RandomTool----------------------

class RandomTool {
	constructor() {

		// 获取随机小数
		this.getRandom = function (l, r) {
			return l + Math.random() * (r - l + 1);
		}

		// 获取随机整数
		this.getIntRandom = function (l, r) {
			return parseInt(this.getRandom(l, r));
		}

		// 获取随机数组
		this.getRandomArray = function (len, l, r) {
			var res = new Array(len);
			for (var i = 0; i < len; i++) {
				res[i] = this.getIntRandom(l, r);
			}
			return res;
		}

		this.getRandomPermutation = function (n) {
			var res = new Array(n);
			for (var i = 0; i < n; i++) {
				res[i] = i + 1;
			}
			var T = 3 * n;
			var t;
			while (T--) {
				var a = this.getIntRandom(0, n - 1);
				var b = this.getIntRandom(0, n - 1);
				t = res[a];
				res[a] = res[b];
				res[b] = t;
			}
			return res;
		}

		this.getRandomOrderArray = function (len, l, r) {
			var res = new Array(len);
			r++;
			for (var i = 0; i < len; i++) {
				res[i] = l + parseInt((r - l) / len) * i;
			}
			var t = len / 100;
			t = Math.max(t, 1);
			while (t--) {
				var t1 = parseInt(this.getIntRandom(0, len - 1));
				var t2 = parseInt(this.getIntRandom(0, len - 1));
				var tt = res[t1];
				res[t1] = res[t2];
				res[t2] = tt;
			}
			return res;
		}
	}
}

//#endregion

//#region PrintArray----------------------

class PrintArray {
	constructor() {
		this.print = function (arr, width) {
			if (!width) {
				width = 15;
			}
			var row = parseInt(arr.length / width);
			var str;
			for (var i = 0; i < row; i++) {
				str = '';
				for (var j = 0; j < width; j++) {
					str += arr[i * width + j] + ' ';
				}
				console.log(str);
			}
			str = '';
			var last = row * width;
			for (i = last; i < arr.length; i++) {
				str += arr[i] + ' ';
			}
			console.log(str);
		}
	}
}

//#endregion

//#region ArrayTool-----------------------

Array.prototype.copy = function () {
	var res = new Array(this.length);
	for (var i = 0; i < this.length; i++) {
		res[i] = this[i];
	}
	return res;
}

//#endregion

//#region Sort-------------------------

class Sort {
	constructor() {

		var random = new RandomTool();

		function swap(arr, a, b) {
			var t = arr[a];
			arr[a] = arr[b];
			arr[b] = t;
		}

		function separate(arr, l, r) {
			if (l < r) {
				var mid = parseInt(l + (r - l) / 2);
				separate(arr, l, mid);
				separate(arr, mid + 1, r);
				merge(arr, l, mid, r);
			}
		}

		function merge(arr, l, mid, r) {
			var b = new Array(r - l + 1);
			var i = l;
			var j = mid + 1;
			for (var k = 0; k < b.length; k++) {
				if (i > mid) {
					b[k] = arr[j++];
				} else if (j > r) {
					b[k] = arr[i++];
				} else if (arr[i] <= arr[j]) {
					b[k] = arr[i++];
				} else {
					b[k] = arr[j++];
				}
			}
			for (var k = 0; k < b.length; k++) {
				arr[l + k] = b[k];
			}
		}

		// 选择排序
		this.selectSort = function (arr, l, r) {
			var left = l ? l : 0;
			var right = r ? r : arr.length;
			var min;
			var minP;
			for (var i = left; i < right; i++) {
				min = arr[i];
				minP = i;
				for (var j = i + 1; j < right; j++) {
					if (arr[j] < min) {
						min = arr[j];
						minP = j;
					}
				}
				arr[minP] = arr[i];
				arr[i] = min;
			}
		}

		// 插入排序
		this.insertSort = function (arr, l, r) {
			var left = l ? l : 0;
			var right = r ? r : arr.length;
			for (var i = left + 1; i < right; i++) {
				var j;
				var t = arr[i];
				for (j = i; j > left; j--) {
					if (t < arr[j - 1]) {
						arr[j] = arr[j - 1];
					} else {
						break;
					}
				}
				arr[j] = t;
			}
		}

		// 堆排序
		this.heapSort = function (arr, l, r) {
			var left = l ? l : 0;
			var right = r ? r : arr.length;
			var mh = new MinHeap();
			for (var i = left; i < right; i++) {
				mh.push(arr[i]);
			}
			for (var i = left; i < right; i++) {
				arr[i] = mh.pop();
			}
		}

		// 快速排序
		this.quickSort = function (arr, l, r) {
			l = l ? l : 0;
			r = r ? r : arr.length - 1;
			if (l >= r) {
				return;
			}
			// if (r - l < 15) {
			//     this.insertSort(arr, l, r);
			//     return;
			// }
			var randomIndex = random.getIntRandom(l, r);
			swap(arr, randomIndex, l);
			var j = l;
			var k = l;
			var d = l;
			for (var i = l + 1; i <= r; i++) {
				if (arr[i] > arr[l]) {
					k++;
				} else if (arr[i] == arr[l]) {
					swap(arr, d + 1, i);
					d++;
					k++;
				} else {
					swap(arr, d + 1, i);
					swap(arr, d + 1, j + 1);
					j++;
					d++;
					k++;
				}
			}
			swap(arr, l, j);
			this.quickSort(arr, l, j - 1);
			this.quickSort(arr, d + 1, k);
		}

		// 归并排序
		this.mergerSort = function (arr, l, r) {
			l = l ? l : 0;
			r = r ? r : arr.length - 1;
			separate(arr, l, r);
		}
	}
}

//#endregion

function test() {
	// var arr = new RandomTool().getRandomArray(300, 1, 100);
	var arr = [3, 5, 2, 2, 8, 9, 1, 1, 9, 8, 7, 6, 2, 3, 1, 4, 5, 6, 7, 7, 7, 1, 4, 12];
	var arr2 = arr.copy();
	var arr3 = arr.copy();
	var arr4 = arr.copy();
	var arr5 = arr.copy();
	var pa = new PrintArray();
	var s = new Sort();
	var timer = new Timer();
	var time;
	// time = timer.test(function () {
	//     s.heapSort(arr);
	// });
	// console.log('-------------------------');
	// console.log('堆排序:' + time);
	time = timer.test(function () {
		s.quickSort(arr2);
	});
	console.log('-------------------------');
	console.log('快速排序:' + time);
	setTimeout(function () {
		pa.print(arr2, 15);
	}, 100);
	// time = timer.test(function () {
	//     s.mergerSort(arr3);
	// });
	// // pa.print(arr3);
	// console.log('-------------------------');
	// console.log('归并排序:' + time);
	// time = timer.test(function () {
	//     s.selectSort(arr4);
	// });
	// console.log('-------------------------');
	// console.log('选择排序:' + time);
	// time = timer.test(function () {
	//     s.insertSort(arr5);
	// });
	// console.log('-------------------------');
	// console.log('插入排序:' + time);
	// console.log('-------------------------');
}
// test();