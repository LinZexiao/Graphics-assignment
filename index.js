// 绘制调用


"use strict";



// customized part




function getLine() {
    var x1 = Number(document.querySelector("#x1").value)
    var y1 = Number(document.querySelector("#y1").value)
    var x2 = Number(document.querySelector("#x2").value)
    var y2 = Number(document.querySelector("#y2").value)
    // console.log(y2, typeof (y2));
    return [x1, y1, x2, y2]
}

function getMethod() {
    var method = document.querySelector("#method").value
    console.log(method);
    return method
}

function getCircle() {
    var x1 = Number(document.querySelector("#ox").value)
    var y1 = Number(document.querySelector("#oy").value)
    var r = Number(document.querySelector("#r").value)
    return [x1, y1, r]
}


function getEllipe() {
    var x1 = Number(document.querySelector("#ox").value)
    var y1 = Number(document.querySelector("#oy").value)
    var a = Number(document.querySelector("#a").value)
    var b = Number(document.querySelector("#b").value)
    return [x1, y1, a, b]
}


function getPolygon() {
    var temp = []
    for (let index = 0; index < buffer.length; index++) {
        const element = buffer[index];
        if (element.class == "Polygon") {
            temp = element.points
            break
        }
    }
    return temp
}

function getRectangle() {
    var temp = []
    for (let index = 0; index < buffer.length; index++) {
        const element = buffer[index];
        if (element.class == "Rectangle") {
            temp = element.points
            break
        }
    }
    return temp
}

function getLines() {
    var temp = []
    for (let index = 0; index < buffer.length; index++) {
        const element = buffer[index];
        if (element.class == "Lines") {
            temp = element.points
            break
        }
    }
    return temp
}





function draw() {
    var method = getMethod()
    switch (method) {
        case "DDA":
            var line = getLine()
            var positions = DDA(line)
            console.log(positions);

            break
        case "中点算法":
            var line = getLine()
            var positions = Midpointline(line)

            console.log(positions);
            break
        case "Bresenham":
            var line = getLine()
            var positions = lineBreshm(line)

            console.log(positions);
            break
        case "中点画圆":
            var circle = getCircle()
            var positions = midPointCircle(circle)

            break
        case "中点画椭圆":
            var ellipe = getEllipe()
            var positions = midPointEllipe(ellipe)

            break
        case "多边形填充":
            var polygon = getPolygon()
            console.log("多边形填充", polygon);
            if (polygon.length == 0) {
                alert("请输入多边形！")
            }

            var positions = scanLine(polygon)
            break
        case "多边形裁剪":
            var polygon = getPolygon()
            var rectangle = getRectangle()

            if (polygon.length == 0 || rectangle.length < 4) {
                alert("请输入多边形和矩形！")
            }

            console.log("多边形裁剪", polygon, rectangle);

            var positions = sutherland(rectangle, polygon)
            console.log("结果：", positions);
            break
        case "矩形截线":
            var rectangle = getRectangle()
            var lines = getLines()

            if (rectangle.length < 4 || lines.length == 0) {
                alert("请输入矩形和直线！")
            }

            console.log("矩形截线", rectangle, lines);

            var positions = CS_LineClip(lines, rectangle)
            break


    }


    // console.log(line);
    main(positions);

}


document.querySelector("#drawbtn").addEventListener("click", draw)