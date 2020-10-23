// 二维图元


function DDA(line) {
    x1 = line[0]
    x2 = line[2]
    y1 = line[1]
    y2 = line[3]

    var flip = false

    //调整点序
    if (x1 > x2) {
        temp = x1
        x1 = x2
        x2 = temp

        flip = true
    }
    if (y1 > y2) {

        temp = y1
        y1 = y2
        y2 = temp

        if (flip) {
            flip = false
        } else {
            flip = true
        }
    }


    var k = (y2 - y1) / (x2 - x1)
    if (k > 1) {
        flag = true
        k = 1 / k
    } else {

        var flag = false
    }


    if (flag) {
        var temp = x1
        x1 = y1
        y1 = temp

        temp = x2
        x2 = y2
        y2 = temp

    }
    //  初始点取整
    x0 = parseInt(x1 + 0.5)
    delt = x1 - x0
    y0 = y1 - delt * k

    y = y0 - k
    x = x0

    var position = []

    for (x = parseFloat(x); x <= x2 && y <= y2; x++) {
        y += k
        if (flag) {
            position.push(parseInt(y + 0.5))
            position.push(x)
        } else {

            position.push(x)
            position.push(parseInt(y + 0.5))
        }

    }

    if (flip) {
        var temp = []
        var length = position.length
        for (var i = 0; i < length / 2; i++) {
            temp.push(position[i * 2])
            temp.push(position[length - i * 2 - 1])
            temp.push(position[length - i * 2 - 2])
            temp.push(position[i * 2 + 1])
        }
        position = temp
    }

    return position

}


function Midpointline(line) {
    x1 = line[0]
    x2 = line[2]
    y1 = line[1]
    y2 = line[3]

    position = []

    var k = (y2 - y1) / (x2 - x1)
    if (k > 1) {
        flag = true
        k = 1 / k
    } else {

        var flag = false
    }


    if (flag) {
        var temp = x1
        x1 = y1
        y1 = temp

        temp = x2
        x2 = y2
        y2 = temp
    }

    a = y1 - y2
    b = x2 - x1
    d = a + a + b
    delta1 = a + a
    delta2 = a + a + b + b

    x = x1
    y = y1


    while (x <= x2) {

        if (flag) {
            position.push(y)
            position.push(x)
        } else {
            position.push(x)
            position.push(y)
        }

        if (d < 0) {
            x++;
            y++;
            d += delta2;
        } else {
            x++;
            d += delta1;
        }



    }
    return position
}

function lineBreshm(line) {
    x1 = line[0]
    x2 = line[2]
    y1 = line[1]
    y2 = line[3]

    position = []

    var k = (y2 - y1) / (x2 - x1)
    if (k > 1) {
        flag = true
        k = 1 / k
    } else {

        var flag = false
    }


    if (flag) {
        var temp = x1
        x1 = y1
        y1 = temp

        temp = x2
        x2 = y2
        y2 = temp
    }


    e = -0.5
    x = x1
    y = y1



    for (var i = x1; i <= x2; i++) {
        if (flag) {
            position.push(y)
            position.push(x)
        } else {
            position.push(x)
            position.push(y)
        }

        x++
        e = e + k
        if (e > 0) {
            y++
            e--
        }
    }
    return position
}



function midPointCircle(circle) {
    positions = []

    function getin(positions, x, y) {
        positions.push(x, y)
        positions.push(-x, y)
        positions.push(x, -y)
        positions.push(-x, -y)
        positions.push(y, x)
        positions.push(-y, x)
        positions.push(y, -x)
        positions.push(-y, -x)

    }

    r = circle[2]

    x = 0
    y = r
    e = 1 - r
    while (x <= y) {
        getin(positions, x, y)
        if (e < 0) {
            e += 2 * x + 3

        } else {
            e += 2 * (x - y) + 5
            y--
        }
        x++
    }

    dx = circle[0]
    dy = circle[1]
    temp = []
    positions.forEach(function (value, index) {
        if (index % 2 != 0) {
            temp.push(value + dx)
        } else {

            temp.push(value + dy)
        }
    });

    return temp
}

function midPointEllipe(ellipe) {
    positions = []

    function getin(positions, x, y) {
        positions.push(x, y)
        positions.push(-x, y)
        positions.push(x, -y)
        positions.push(-x, -y)
        // 四对称性
        // positions.push(y, x)
        // positions.push(-y, x)
        // positions.push(y, -x)
        // positions.push(-y, -x)

    }

    a = ellipe[2]
    b = ellipe[3]

    x = 0
    y = b

    //上半部分
    d1 = b * b + a * a * (-b + 0.25)

    while (b * b * (x + 1) < a * a * (y - 0.5)) {
        getin(positions, x, y)

        if (d1 < 0) {
            d1 += b * b * (2 * x + 3)

        } else {
            d1 += b * b * (2 * x + 3) + a * a * (-2 * y + 2)
            y--
        }
        x++
    }

    getin(positions, x, y)

    //下半部分
    d2 = Math.sqrt(b * (x + 0.5)) + Math.sqrt(a * (y - 1)) - Math.sqrt(a * b)
    while (y > 0) {

        if (d2 < 0) {
            d2 += b * b * (2 * x + 2) + a * a * (-2 * y + 3)
            x++
            y--
        } else {
            d2 += a * a * (-2 * y + 3)
            y--
        }

        getin(positions, x, y)
    }


    // 位移到圆心
    dx = ellipe[0]
    dy = ellipe[1]
    temp = []
    positions.forEach(function (value, index) {
        if (index % 2 != 0) {
            temp.push(value + dx)
        } else {

            temp.push(value + dy)
        }
    });

    return temp
}





// 填充和裁剪

function scanLine(polygon) {

    function Edge(y, x, k) {
        this.ymax = y
        this.xmin = x
        this.deltax = k

    }

    ET = []
    maxy = 0
    console.log("*polygon", polygon);

    //建立ET
    for (let index = 0; index < polygon.length - 2; index += 2) {

        if (polygon[index + 1] > polygon[index + 3]) {
            y2 = polygon[index + 1]
            y1 = polygon[index + 3]
            x1 = polygon[index + 2]
            x2 = polygon[index]
        } else if (polygon[index + 1] == polygon[index + 3]) {
            continue
        } else {
            y1 = polygon[index + 1]
            y2 = polygon[index + 3]
            x2 = polygon[index + 2]
            x1 = polygon[index]
        }
        k = (x2 - x1) / (y2 - y1)
        tempedge = new Edge(y2, x1, k)
        if (y2 > maxy) {
            maxy = y2
        }
        if (ET[y1] == undefined) {
            ET[y1] = []
        }
        console.log(tempedge);
        ET[y1].push(tempedge)
        console.log(ET[y1]);
    }

    len = polygon.length

    if (polygon[1] > polygon[len - 1]) {
        y2 = polygon[1]
        y1 = polygon[len - 1]
        x1 = polygon[len - 2]
        x2 = polygon[0]
    } else {
        y1 = polygon[1]
        y2 = polygon[len - 1]
        x2 = polygon[len - 2]
        x1 = polygon[0]
    }
    if (polygon[1] != polygon[len - 1]) {

        k = (x2 - x1) / (y2 - y1)
        tempedge = new Edge(y2, x1, k)
        if (y2 > maxy) {
            maxy = y2
        }
        if (!ET[y1]) {
            ET[y1] = []
        }
        console.log(tempedge);
        ET[y1].push(tempedge)
        console.log(ET[y1]);
    }

    console.log("polygon edge",
        ET);



    tempPositions = []
    len = ET.length
    var AEL = []


    for (let y = 0; y < maxy; y++) {


        const element = ET[y];
        console.log(ET[y]);
        if (ET[y] != undefined) {
            for (let index = 0; index < ET[y].length; index++) {
                const element = ET[y][index];
                AEL.push(element)
            }
        }
        AEL.sort(function (a, b) {
            return a.xmin - b.xmin
        })


        for (let index = 0; index < AEL.length; index += 2) {

            for (let xi = parseInt(AEL[index].xmin); xi < parseInt(AEL[index + 1].xmin); xi++) {
                positions.push(xi)
                positions.push(y)
            }
            console.log("y=", y, "AEL len", AEL.length, parseInt(AEL[index].xmin), parseInt(AEL[index + 1].xmin), positions);
        }

        // 迭代
        for (let index = 0; index < AEL.length; index++) {
            if (AEL[index].ymax == y + 1) {
                AEL.splice(index, 1)
                index--
            } else {
                AEL[index].xmin += AEL[index].deltax
            }
        }



    }

    return positions

}



function CS_LineClip(line, rectangle)
// float x1, y1, x2, y2, XL, XR, YB, YT;
//(x1,y1)(x2,y2)为线段的端点坐标，其他四个参数定义窗口的边界
{


    LEFT = 1
    RIGHT = 2
    BOTTOM = 4
    TOP = 8

    if (rectangle[0] <= rectangle[2]) {
        XL = rectangle[0]
        XR = rectangle[2]
    } else {
        XL = rectangle[2]
        XR = rectangle[0]
    }
    if (rectangle[1] <= rectangle[3]) {
        YB = rectangle[1]
        YT = rectangle[3]
    } else {
        YB = rectangle[3]
        YT = rectangle[1]
    }



    function encode(x, y) //  计算点x, y的编码
    {
        var c = 0;

        if (x < XL) {
            c |= LEFT;
        } // 置位CL
        if (x > XR) {
            c |= RIGHT;
        } // 置位CR
        if (y < YB) {
            c |= BOTTOM;
        } // 置位CB
        if (y > YT) {
            c |= TOP;
        } // 置位CT

        return c
    }


    positions = []

    for (let index = 0; index < line.length; index += 4) {

        x1 = line[index + 0]
        y1 = line[index + 1]
        x2 = line[index + 2]
        y2 = line[index + 3]

        console.log("orgin", x1, y1, x2, y2);

        code1 = encode(x1, y1);
        code2 = encode(x2, y2); // 端点坐标编码

        while (code1 != 0 || code2 != 0) // 直到”完全可见”
        {


            if ((code1 & code2) != 0) {
                console.log(code1, code2);
                console.log("显然不可见");
                break;
            } // 排除”显然不可见”情况

            code = code1;
            if (code1 == 0) code = code2; // 求得在窗口外的点
            //按顺序检测到端点的编码不为0，才把线段与对应的窗口边界求交。
            if ((LEFT & code) != 0) // 线段与窗口左边延长线相交
            {
                x = XL;
                y = y1 + (y2 - y1) * (XL - x1) / (x2 - x1);
            } else if ((RIGHT & code) != 0) // 线段与窗口右边延长线相交
            {
                x = XR;
                y = y1 + (y2 - y1) * (XR - x1) / (x2 - x1);
            } else if ((BOTTOM & code) != 0) // 线段与窗口下边延长线相交
            {
                y = YB;
                x = x1 + (x2 - x1) * (YB - y1) / (y2 - y1);
            } else if ((TOP & code) != 0) // 线段与窗口上边延长线相交
            {
                y = YT;
                x = x1 + (x2 - x1) * (YT - y1) / (y2 - y1);
            }



            if (code == code1) {
                x1 = x;
                y1 = y;
                code1 = encode(x, y);
            } //裁去P1到交点
            else {
                x2 = x;
                y2 = y;
                code2 = encode(x, y);

            } //裁去P2到交点

            console.log(code1, code2, x1, y1, x2, y2);
        }
        console.log("out", x1, y1, x2, y2);

        temp = DDA([x1, y1, x2, y2])
        positions.push.apply(positions, temp)
        console.log(x1, y1, x2, y2, temp, positions);

    }



    // console.log(x1, y1, x2, y2);
    return positions
}


function StHodMan(polygon, rectangle) {
    function isInside(p, rectangle) {
        if ((p.x >= rectangle[0] && p.x <= rectangle[2] || p.x >= rectangle[2] && p.x <= rectangle[0]) && (p.y >= rectangle[1] && p.y <= rectangle[3] || p.y >= rectangle[3] && p.y <= rectangle[1])) {
            p.inside = true
            return true
        } else {
            p.inside = false
            return false
        }
    }

    function Vec(x, y, rectangle) {
        this.x = x
        this.y = y
        this.inside = isInside({
            "x": x,
            "y": y
        }, rectangle)
    }
    // s.x = polygon[0]
    // s.y = polygon[1]

    s = new Vec(polygon[0], polygon[1])

    for (let index = 2; index < polygon.length; index += 2) {

        p = new Vec(polygon[index], polygon[index + 1])


    }
}