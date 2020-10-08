function DDA(line) {
    x1 = line[0]
    x2 = line[2]
    y1 = line[1]
    y2 = line[3]

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