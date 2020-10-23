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

line = [32, 40, 69, 71];


rectangle = [29, 65, 73, 44];



console.log("结果", csline(line, rectangle));