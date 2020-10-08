"use strict";


//main souce

var vertexShaderSource = `#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec4 a_position;

// all shaders have a main function
void main() {

  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  gl_Position = a_position;
  gl_PointSize = 5.0;
}
`;

var fragmentShaderSource = `#version 300 es

// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;

// we need to declare an output for the fragment shader
out vec4 outColor;

void main() {
  // Just set the output to a constant redish-purple
  outColor = vec4(1, 0, 0.5, 1);
}
`;

function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader)); // eslint-disable-line
    gl.deleteShader(shader);
    return undefined;
}

function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }

    console.log(gl.getProgramInfoLog(program)); // eslint-disable-line
    gl.deleteProgram(program);
    return undefined;
}



function main(positions) {
    // Get A WebGL context
    var canvas = document.querySelector("#renderCanvas");
    var gl = canvas.getContext("webgl2");
    if (!gl) {
        return;
    }



    // create GLSL shaders, upload the GLSL source, compile the shaders
    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    // Link the two shaders into a program
    var program = createProgram(gl, vertexShader, fragmentShader);

    // look up where the vertex data needs to go.
    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

    // Create a buffer and put three 2d clip space points in it
    var positionBuffer = gl.createBuffer();

    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);


    //load customized data
    var mycount = positions.length / 2



    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Create a vertex array object (attribute state)
    var vao = gl.createVertexArray();

    // and make it the one we're currently working with
    gl.bindVertexArray(vao);

    // Turn on the attribute
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2; // 2 components per iteration
    var type = gl.FLOAT; // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0; // start at the beginning of the buffer
    gl.vertexAttribPointer(
        positionAttributeLocation, size, type, normalize, stride, offset);

    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);


    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    // Bind the attribute/buffer set we want.
    gl.bindVertexArray(vao);


    // draw
    // var primitiveType = gl.TRIANGLES;
    var primitiveType = gl.POINTS;
    var offset = 0;
    var count = mycount;
    gl.drawArrays(primitiveType, offset, count);
}











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



function caculateThePoints(line, method) {
    var mydefault = [
        0, 0,
        0, 0.5,
        0.7, 0,
        1, 1,
        -1, -1,
        0.5, 0.5,
    ];

    return mydefault
}

function adapter(positions) {
    var temp = []
    positions.forEach(function (value) {
        var t = value / 50 - 1
        temp.push(t)
    })
    console.log(temp);
    return temp
}



function draw() {
    var method = getMethod()
    switch (method) {
        case "DDA":
            var line = getLine()
            var positions = DDA(line)
            positions = adapter(positions)
            console.log(positions);

            break
        case "中点算法":
            var line = getLine()
            var positions = Midpointline(line)
            positions = adapter(positions)
            console.log(positions);
            break
        case "Bresenham":
            var line = getLine()
            var positions = lineBreshm(line)
            positions = adapter(positions)
            console.log(positions);
            break
        case "中点画圆":
            var circle = getCircle()
            var positions = midPointCircle(circle)
            positions = adapter(positions)
            break
    }


    // console.log(line);
    main(positions);

}


document.querySelector("#drawbtn").addEventListener("click", draw)