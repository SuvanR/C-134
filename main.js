img = " ";
status = " ";
object = [];

function back() {
    window.location = "index.html";
}

function preload() {

}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status : detecting objects";
}

function modelLoaded() {
    console.log("model is loaded!");
    status = true;
}

function draw() {
    image(video, 0, 0, 380, 380);

    if (status != "") {

        r = random(255);
        b = random(255);
        g = random(255);

        objectDetector.detect(video, gotResults);
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "status : object detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected = " + object.length;
            fill(r, b, g);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + "" + percent + " %", object[i].x, object[i].y);
            noFill();
            stroke(r, b, g);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}

function gotResults(error, Results) {
    if (error) {
        console.error(error);
    }

    console.log(Results);
    object = Results;
}