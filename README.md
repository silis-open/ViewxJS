# viewx

#### 介绍
viewx是一个前端的、mvc框架、轻量级、js模板引擎


#### 兼容版本

| 电脑端 | 浏览器 | 最小版本 |
|-|-|-|
| ![Internet Explorer](https://developer.mozilla.org/static/media/internet-explorer.cf17782c.svg "Internet Explorer")| Internet Explorer | 5.5 |
| ![Chrome](https://developer.mozilla.org/static/media/chrome.4c570865.svg "Chrome")| Chrome | 1 |
| ![Edge](https://developer.mozilla.org/static/media/edge.40018f6a.svg "Edge") | Edge  | 12 |
| ![Firefox](https://developer.mozilla.org/static/media/firefox.51d8a59c.svg "Firefox") | Firefox | 3 |
| ![Opera](https://developer.mozilla.org/static/media/opera.a0ab0c50.svg "Opera") | Opera | 15 |
| ![Safari](https://developer.mozilla.org/static/media/safari.3679eb31.svg "Safari") | Safari | 4 |
|  | ----------------- |  |


| 手机端 | 浏览器 | 最小版本 |
|-|-|-|
| ![WebView Android](https://developer.mozilla.org/static/media/android.7d9bf320.svg "WebView Android") | WebView Android | 1 |
| ![Chrome Android](https://developer.mozilla.org/static/media/chrome.4c570865.svg "Chrome Android") | Chrome Android | 18 |
| ![Firefox Android](https://developer.mozilla.org/static/media/firefox.51d8a59c.svg "Firefox Android") | Firefox Android | 4 |
| ![Opera Android](https://developer.mozilla.org/static/media/opera.a0ab0c50.svg "Opera Android") | Opera Android | 14 |
| ![iOS Safari](https://developer.mozilla.org/static/media/safari.3679eb31.svg "iOS Safari") | iOS Safari | 3.2 |
| ![Samsung Internet](https://developer.mozilla.org/static/media/samsung-internet.6fd7f423.svg "Samsung Internet") | Samsung Internet | 1.0 |
|  | ----------------- |  |


兼容ie6+、firefox、chrome

## 示例
#### say hello
演示最简单的例子say hello

```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <script src="../lib/jsc.min.js" type="text/javascript"></script>
    <script src="../viewx.min.js"></script>
    <script>
        Page({
            data: {
                name: "Tom"
            }
        })
    </script>
</head>
<body>

    <vx>{{name}}</vx> say hello

</body>
</html>
```
示例文件：/demo/say-hello.html

#### page onload
演示页面的加载事件，onload事件是页面生命周期的初始方法。

```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <script src="../lib/jsc.min.js" type="text/javascript"></script>
    <script src="../viewx.min.js"></script>
    <script>
        Page({
            onLoad: function () {
                document.getElementsByTagName("body")[0].innerText = "页面已加载";
            }
        })
    </script>
</head>
<body>

</body>
</html>
```
示例文件：/demo/page-onload.html


#### setData
演示通过setData控制数据模型更新视图。
```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <script src="../lib/jsc.min.js" type="text/javascript"></script>
    <script src="../viewx.min.js"></script>
    <script>
        Page({
            data: {
                time:0
            },
            onLoad: function () {
                var that = this;
                setInterval(function () {
                    that.setData({ time: new Date() });
                }, 1000);
            }
        })
    </script>
</head>
<body>

    current time : <vx>{{time}}</vx>

</body>
</html>
```
示例文件：/demo/set-data.html


#### page observers
演示通过page的observers属性，监听页面数据变化
```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <script src="../lib/jsc.min.js" type="text/javascript"></script>
    <script src="../viewx.min.js"></script>
    <script>
        Page({
            data: {
                time: 0
            },
            onLoad: function () {
                var that = this;
                setInterval(function () {
                    that.setData({ time: new Date() });
                }, 1000);
            },
            observers: {
                time: function (value) {
                    document.getElementsByTagName("body")[0].innerText = "observer time : " + value;
                }
            }
        })
    </script>
</head>
<body>

</body>
</html>
```
示例文件：/demo/observers.html


#### 循环

```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <script src="../lib/jsc.min.js" type="text/javascript"></script>
    <script src="../viewx.min.js"></script>
    <script>
        Page({
            data: {
                list:[{ name:"hello" },{ name:"kity" },{ name:"tom" },{ name:"cat" }]
            },
            onLoad: function () {
                
            }
        })
    </script>
</head>
<body>

    <div class="vx" vx-for="{{list}}" for-item="item" for-index="index">

        <div>
            name:<vx>{{item.name}}</vx>, index:<vx>{{index}}</vx>
            <span class="vx" vx-if="{{index%2==0}}">, 奇数行</span>
            <span class="vx" vx-if="{{index%2==1}}">, 偶数行</span>
        </div>

    </div>

</body>
</html>
```
示例文件：/demo/for.html

#### 条件

```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <script src="../lib/jsc.min.js" type="text/javascript"></script>
    <script src="../viewx.min.js"></script>
    <script>
        Page({
            data: {
                show: true,
                name: "Tom"
            },
            onLoad: function () {
                var that = this;

                setInterval(function () {
                    that.setData({
                        show: !that.data.show
                    });
                }, 500);
            }
        })
    </script>
</head>
<body>

    <div class="vx" vx-if="{{show}}">Hi, <vx>{{name}}</vx>!</div>

</body>
</html>
```
示例文件：/demo/if.html


