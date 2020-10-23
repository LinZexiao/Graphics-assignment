function csline(line, rectangle) {
    LEFT = 1
    RIGHT = 2

    BOTTOM = 4
    TOP = 8

    if (rectangle[0] <= rectangle[2]) {
        xl = rectangle[0]
        xr = rectangle[2]
    } else {
        xl = rectangle[2]
        xr = rectangle[0]
    }
    if (rectangle[1] <= rectangle[3]) {
        yb = rectangle[1]
        yt = rectangle[3]
    } else {
        yb = rectangle[3]
        yt = rectangle[1]
    }


    function encode(x, y) {
        var c = 0
        if (x <= xl) {
            c = c | LEFT
        }
        if (x >= xr) {
            c = c | RIGHT
        }
        if (y <= yb) {
            c = c | BOTTOM
        }
        if (y >= yt) {
            c = c | TOP
        }

        return c
    }







    k = (yt - yb) / (xr - xl)
    length = line.length



    var position = []
    var i = 1

    for (var i = 1; i <= length / 2; i += 4) {
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


        //    x1 = line[0]
        //   x2 = line[2]
        //   y1 = line[1]
        //   y2 = line[3]
        c1 = encode(x1, y1)
        c2 = encode(x2, y2)

        // console.log(B)
        zuo = [1, 9, 3]
        zhong = [10, 4]
        you = [2, 5, 11]
        shang = [9, 10, 11]
        zhong1 = [1, 2]
        xia = [3, 4, 5]


        k1 = (y2 - y1) / (x2 - x1)

        b = y1 - k1 * x1
        A1 = 1 / k1 * (-1)
        B1 = y2 - y1
        C1 = b * (x2 - x1)
        heng = [yb, yt]
        shu = [xl, xr]







        while (c1 != 0 || c2 != 0) {
            if (zuo.indexOf(c1) != -1 && zuo.indexOf(c2) != -1 || you.indexOf(c1) != -1 && you.indexOf(c2) != -1 || shang.indexOf(c1) != -1 && shang.indexOf(c2) != -1 || xia.indexOf(c1) != -1 && xia.indexOf(c2) != -1) {
                break
            } else {
                var j = []
                j[0] = k1 * xl + b
                j[1] = k1 * xr + b
                j[3] = -1 * ((b - yb) / k1)
                j[4] = -1 * ((b - yt) / k1)
                //   console.log(j[0],j[1]);
                if (j[0] >= yb && j[0] <= yt) {
                    y1 = j[0]
                    //     console.log(y1)
                    x1 = xl
                    if (k1 >= 0) {
                        y2 = yt
                        x2 = j[3]
                    } else {
                        y2 = yb
                        x2 = j[4]
                    }
                } else {
                    y2 = j[1]
                    x2 = xr
                    if (k1 <= 0) {
                        x1 = j[4]
                        y1 = yt
                    } else {
                        x1 = j[3]
                        y1 = yb
                    }

                }
                //      console.log(x1,y1)

                c1 = 0
                c2 = 0


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


    return position[0]

}

line = [4, 4, 50, 50]
rectangle = [40, 40, 60, 60]
ans = console.log(csline(line, rectangle));