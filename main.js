status="";
objects=[];
function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380)
    video.hide();
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object = document.getElementById("object_name").value;
}
function modelLoaded(){
    console.log("Model Loaded!")
    status = true;
    objectDetector.detect(gotResult);
}
function draw(){
    image(video, 0, 0, 380, 380);

    if(status !=""){
        r = random(255);
        g = random(255);
        b = random(255);
        for(i = 0; i < objects.length; i++){
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

        if(objects == object){
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("object_status").innerHTML = object + " found";

            var synth = window.speechSynthesis;
            var utterThis = new SpeechSynthesisUtterance("Object Mentioned Found");
            synth.speak(utterThis);
        }else{
            document.getElementById("object_status").innerHTML = "Object mentioned not found";
        }
        

    }
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        objects = results;
    }
}