---
title: 关于斐波那契数列
date: 2017-04-09 13:46:12
tags: [算法]
categories: 算法
type: "tags"
---
![title](https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3463546863,3949490182&fm=26&gp=0.jpg)
# 用js实现斐波那契数列
首先介绍一下，斐波那契数列(Fibonacci sequence)又称黄金分割数列，斐波那契数列（Fibonacci sequence），又称黄金分割数列、因数学家列昂纳多·斐波那契（Leonardoda Fibonacci）以兔子繁殖为例子而引入，故又称为“兔子数列”，指的是这样一个数列：1、1、2、3、5、8、13、21、34、……在数学上，斐波纳契数列以如下被以递归的方法定义：F(0)=1，F(1)=1, F(n)=F(n-1)+F(n-2)（n>=2，n∈N*）在现代物理、准晶体结构、化学等领域，斐波纳契数列都有直接的应用，
<!-- more -->

- 斐波那契数列指的是这样一个数列 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233，377，610，987，1597，2584，4181，6765，10946，17711，28657，46368........

- 这个数列从第3项开始，每一项都等于前两项之和。
## 实现方法一

```js
function fib(n) {
    if(n === 0) {
         return 0;
    } else  if(n ===1) {
        return 1;
    } else {
        return fib(n-1)+fib(n-2);
    }
}
以上的发法是能想到的最直观的实现，现在我们测试一下他的运行结果。
fib(1);
fib(10)
fib(50);
运行发现n=1时，会快速输出1，n=10,时，运行速度稍慢，但是当n=10时，运行就非常慢，原因是什么呢，因为n=50时，要进行差不多50次的函数调用，每次调用，都会重新走if的那三个判断条件，而且每次都是从最开始开始计算，当n越大时，性能越差，所以有没有更好的方法来实现它呢？
```
## 实现方法二
```js
function fib(n) {
    if(n === 0) {
         return 0;
    } else  if(n ===1) {
        return 1;
    } else {
        let a = 0, b = 1;
        let current = null;
       for(let i = 2; i <= n; i++) {
           current = b + a;
           a = b;
           b = current;
       }
       return current;
    }
}
方法二与方法一不同之处在于，最后一个判断加入了一个for循环，current = b + a;当前享等于前两项的和，a = b;把前一项的值赋给a(第前两项)，b = current;把当前值赋给前b(第前一项)，这样当n>1时，只需要在第三个判断走一个循环可以，而不需要一直调用函数，这样做比方法一性能上优化了很多，但是还有没有更好的方法呢?
```
## 实现方法三
```js
var cache = {
    0: 0,
    1: 1
};

function fib(n) {
    return typeof cache[n] === 'number'
           ? cache[n]
           : cache[n] = fib(n - 1) + fib(n - 2);
}
该方法的实现利用了缓存，这样每次计算的时候，都会把计算出的值存放到cache这个缓存中，等下次传入较大的n时，如果缓存中有需要的值，则直接用缓存中的值，这种方法大大提高了函数的性能。
还存在一个问题,fib(10000) = Infinity;这有是为什么呢，
我们可以从js中数值的取值范围考虑，如何知道js中数值的范围呢，
 console.log(Number.MAX_VALUE, Number.MIN_VALUE); //取得最大和最小的数
console.log(Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);取得最大和最小的整数
1.7976931348623157e+308 5e-324
9007199254740991 -9007199254740991

console.log(fib(400));
console.log(fib(500));
1.760236806450138e+83
1.394232245616977e+104
n 在大于500的时候差不多已超出范围
```
如果有更好的方法，欢迎指正