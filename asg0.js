function main() {
    // Retrieve <canvas> element
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    // Get the rendering context for 2DCG
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(0, 0, 0)'; // set a black color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // fill a whole canvas with the color
}

function drawVector(v, color) {
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.lineTo(200 + (v.elements[0]*20), 200 - (v.elements[1]*20));
    ctx.strokeStyle = color;
    ctx.stroke();
}

function handleDrawEvent() {
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');

    x_red = document.getElementById('xdirred').value;
    y_red = document.getElementById('ydirred').value;

    x_blue = document.getElementById('xdirblue').value;
    y_blue = document.getElementById('ydirblue').value;

    let v1 = new Vector3([x_red, y_red, 0]);
    let v2 = new Vector3([x_blue, y_blue, 0])

    ctx.fillRect(0, 0, canvas.width, canvas.height); // clear canvas
    drawVector(v1, "red");
    drawVector(v2, "blue");
}

function handleDrawOperationEvent() {
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');

    x_red = document.getElementById('xdirred').value;
    y_red = document.getElementById('ydirred').value;

    x_blue = document.getElementById('xdirblue').value;
    y_blue = document.getElementById('ydirblue').value;

    let v1 = new Vector3([x_red, y_red, 0]);
    let v2 = new Vector3([x_blue, y_blue, 0]);

    ctx.fillRect(0, 0, canvas.width, canvas.height); // clear canvas
    drawVector(v1, "red");
    drawVector(v2, "blue");

    rv = new Vector3();

    op = document.getElementById('operations').value;

    scalar = document.getElementById('scalar').value;

    if (op == "add") {
        rv = v1.add(v2);
        drawVector(rv, "green");
    }
    else if (op == "sub") {
        rv = v1.sub(v2);
        console.log(rv);
        drawVector(rv, "green");
    }
    else if (op == "mul") {
        rv = v1.mul(scalar);
        drawVector(rv, "green");
        rv = v2.mul(scalar);
        drawVector(rv, "green");
    }
    else if (op == "div") {
        if (scalar == 0) {
            console.log("Divide by zero error");
        }
        else {
            rv = v1.div(scalar);
            drawVector(rv, "green");
            rv = v2.div(scalar);
            drawVector(rv, "green");
        }
    }
    else if (op == "mag") {
        console.log("Magnitude v1: " + v1.magnitude());
        console.log("Magnitude v2: " + v2.magnitude());
    }
    else if (op == "nrm") {
        rv = v1.normalize();
        drawVector(rv, "green");
        rv = v2.normalize();
        drawVector(rv, "green");
    }
    else if (op == "dot") {
        console.log("Angle: " + angleBetween(v1, v2));
    }
    else if (op == "crs") {
        console.log("Area of triangle: " + areaTriangle(v1, v2));
    }
}

function angleBetween(v1, v2) {
    let radians = Math.acos(Vector3.dot(v1, v2) / (v1.magnitude() * v2.magnitude()));
    degrees = radians * 180 / Math.PI;
    return degrees;
}

function areaTriangle(v1, v2) {
    let v3 = Vector3.cross(v1, v2);
    return (0.5 * v3.magnitude());
}