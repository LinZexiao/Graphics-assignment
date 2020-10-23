// 页面控制相关

var myLine = {
    "points": 0,
    "x1": 0,
    "y1": 0,
    "x2": 0,
    "y2": 0
}

var PointsRecord = {
    "class": "",
    "points": []
}

var buffer = []
buffer.push(PointsRecord)

var mylines = []

var tempPosition = []

var methodChild1 = '<option value="DDA">DDA</option><option value="中点算法">中点算法</option><option value="Bresenham">Bresenham</option><option value="中点画圆">中点画圆</option><option value="中点画椭圆">中点画椭圆</option>'

var methodChild2 = '<option value="多边形填充">多边形填充</option><option value="矩形截线">矩形截线</option><option value="多边形裁剪">多边形裁剪</option>'

var exam = "exam2"


var paraFram = document.querySelector("#" + exam)
paraFram.style.display = "block"

document.querySelector("#method").innerHTML = methodChild2

console.log("repaint happen");



// document.querySelector("#method").innerHTML=methodChild

function drawBuffer(buffer) {
    console.log("buffer", buffer);
    var positions = []
    for (var i = 0; i < buffer.length; i++) {
        console.log("swich", i, buffer[i].class);
        switch (buffer[i].class) {
            case "Polygon":
                positions.push(buffer[i].points[0])
                positions.push(buffer[i].points[1])
                for (var j = 0; j < buffer[i].points.length / 2 - 1; j++) {
                    k = 2 * j
                    temp = DDA([buffer[i].points[k], buffer[i].points[k + 1], buffer[i].points[k + 2], buffer[i].points[k + 3]])

                    positions.push.apply(positions, temp)
                }
                k = 2 * j
                console.log("k=", k);
                temp = DDA([buffer[i].points[k], buffer[i].points[k + 1], buffer[i].points[0], buffer[i].points[1]])
                positions.push.apply(positions, temp)


                break
            case "Lines":
                for (var j = 0; j + 2 < buffer[i].points.length; j = j + 4) {
                    k = j
                    temp = DDA([buffer[i].points[k], buffer[i].points[k + 1], buffer[i].points[k + 2], buffer[i].points[k + 3]])
                    positions.push.apply(positions, temp)
                }

                if (buffer[i].points.length % 4 != 0) {
                    positions.push(buffer[i].points[j])
                    positions.push(buffer[i].points[j + 1])
                }
                break
            case "Rectangle":
                for (var j = 0; j + 2 < buffer[i].points.length; j = j + 4) {
                    k = j
                    temp = DDA([buffer[i].points[k], buffer[i].points[k + 1], buffer[i].points[k], buffer[i].points[k + 3]])
                    positions.push.apply(positions, temp)
                    temp = DDA([buffer[i].points[k + 2], buffer[i].points[k + 1], buffer[i].points[k + 2], buffer[i].points[k + 3]])
                    positions.push.apply(positions, temp)
                    temp = DDA([buffer[i].points[k], buffer[i].points[k + 1], buffer[i].points[k + 2], buffer[i].points[k + 1]])
                    positions.push.apply(positions, temp)
                    temp = DDA([buffer[i].points[k], buffer[i].points[k + 3], buffer[i].points[k + 2], buffer[i].points[k + 3]])
                    positions.push.apply(positions, temp)
                }

                if (buffer[i].points.length % 4 != 0) {
                    positions.push(buffer[i].points[j])
                    positions.push(buffer[i].points[j + 1])
                }
                break
                // case "":
                //     buffer.splice(i, 1)
                //     break

        }
    }
    main(positions)
}



function getLinesByUI(x, y) {


    if (PointsRecord.class != "Lines") {

        PointsRecord.class = "Lines"
        PointsRecord.points = []
    }
    PointsRecord.points.push(x)
    PointsRecord.points.push(y)
    drawBuffer(buffer)

}


function getPolygonByUI(x, y) {


    if (PointsRecord.class != "Polygon") {

        PointsRecord.class = "Polygon"
        PointsRecord.points = []
    }
    PointsRecord.points.push(x)
    PointsRecord.points.push(y)

    drawBuffer(buffer)
}

function getRectangleByUI(x, y) {


    if (PointsRecord.class != "Rectangle") {

        PointsRecord.class = "Rectangle"
        PointsRecord.points = []
    }
    PointsRecord.points.push(x)
    PointsRecord.points.push(y)

    drawBuffer(buffer)
}


document.querySelector("#renderCanvas").addEventListener('click', event => {
    x = event.offsetX / 5
    y = (500 - event.offsetY) / 5

    x = parseInt(x)
    y = parseInt(y)

    radios = document.getElementsByName("element")
    var val
    for (let index = 0; index < radios.length; index++) {
        const tempelement = radios[index];
        if (radios[index].checked) {
            val = radios[index].value
        }
    }
    if (PointsRecord.class != val && PointsRecord.class != "") {
        var temp = JSON.stringify(PointsRecord)
        temp = JSON.parse(temp)
        buffer.push(temp)

    }
    switch (val) {
        case "Polygon":
            getPolygonByUI(x, y)
            break
        case "Lines":
            getLinesByUI(x, y)
            break
        case "Rectangle":
            getRectangleByUI(x, y)
            break

    }


})


document.querySelector("#clearALL").addEventListener('click', event => {
    buffer = []
    PointsRecord = {
        "class": "",
        "points": []
    }
    buffer.push(PointsRecord)
    positions = []
    main([])
})


document.querySelector("#examSelect").addEventListener('change', event => {

    examText = event.target.value
    var paraFram = document.querySelector("#" + exam)
    paraFram.style.display = 'none'

    exam = examText
    var paraFram = document.querySelector("#" + exam)
    paraFram.style.display = "block"

    switch (exam) {
        case 'exam1':
            document.querySelector("#method").innerHTML = methodChild1
            break
        case 'exam2':
            document.querySelector("#method").innerHTML = methodChild2
            break
    }
})