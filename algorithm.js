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


function csline(line, rectangle) {
    LEFT = 1
    RIGHT = 2

    BOTTOM = 4
    TOP = 8
    if (rectangle[0] > rectangle[2]) {
        xl = rectangle[2]
        xr = rectangle[0]
    } else {
        xl = rectangle[0]
        xr = rectangle[2]
    }
    if (rectangle[1] > rectangle[3]) {
        yt = rectangle[1]
        yb = rectangle[3]
    } else {
        yt = rectangle[3]
        yb = rectangle[1]
    }
    // xl = rectangle[0] //设置边长
    // xr = rectangle[1]
    // yb = rectangle[2]
    // yt = rectangle[3]
    length = line.length

    function encode(x, y) { //issue?
        var c = 0
        if (x < xl) {
            c = c | LEFT
        }
        if (x > xr) {
            c = c | RIGHT
        }
        if (y < yb) {
            c = c | BOTTOM
        }
        if (y > yt) {
            c = c | TOP
        }

        return c
    }
    var position = []
    var i = 1

    for (var i = 1; i <= length / 2; i++) {
        x1 = line[(2 * i - 2 + length) % length]
        y1 = line[(2 * i - 1 + length) % length]
        x2 = line[(2 * i + length) % length]
        y2 = line[(2 * i + 1 + length) % length]
        if (x1 > x2) {
            temp = x2
            x2 = x1
            x1 = temp
            temp = y2
            y2 = y1
            y1 = temp
        }
        //        console.log(i)
        console.log(x2)

        //    x1 = line[0]
        //   x2 = line[2]
        //   y1 = line[1]
        //   y2 = line[3]
        c1 = encode(x1, y1)
        c2 = encode(x2, y2)

        // console.log(B)


        while (c1 != 0 || c2 != 0) {
            if (c1 && c2 != 0) {
                return
            }



            if (c1 == 0) {
                code = c2
            }
            if (c1 != 0) {
                code = c1
            }
            if (LEFT && code != 0) {
                x = xl
                y = y1 + (y2 - y1) * (xl - x1) / (x2 - x1)
            }
            if (RIGHT && code != 0) {
                x = xr
                y = y1 + (y2 - y1) * (xr - x1) / (x2 - x1)
            }
            if (BOTTOM && code != 0) {
                y = yb
                x = x1 + (x2 - x1) * (yb - y1) / (y2 - y1)
            }
            if (TOP && code != 0) {
                y = yt
                x = x1 + (x2 - x1) * (yt - y1) / (y2 - y1)
            }

            if (code == c1) {
                x1 = x
                y1 = y
                c1 = encode(x, y)
            } else {
                x2 = x
                y2 = y
                c2 = encode(x, y)
            }
        }


        console.log(i)

        //    position.push(x)
        //      position.push(y)

        //   console.log("while",i,position);


        lineg = [x1, y1, x2, y2]
        position.push(DDA(lineg))
    }




    return position

}