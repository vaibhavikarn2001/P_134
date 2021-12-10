status=""
objects=[]
status=""
song=""
function preload(){
    song = loadSound('alarm.mp3');
}

function setup(){
canvas= createCanvas(380,380)
video =  createCapture(VIDEO);
video.hide()
video.size(380,380)
objectDetector= ml5.objectDetector("cocossd", modelLoaded)
canvas.center()
}


function modelLoaded(){
    console.log("Model Loaded!")
    status= true

}

function gotResult(error,results){
    if(error){
        console.error(error)
    }
    else{
console.log(results)
objects= results

    }
}

function draw() {
    r= random(255)
    g= random(255)
    b= random(255)

    image (video, 0, 0, 380, 380);
 if (status != ""){ 
    objectDetector.detect(video,gotResult) 
    for (i = 0; i < objects.length; i++)
{
    fill(r,g,b);
    percent=floor(objects[i].confidence*100);
    text (objects[i]. label+" "+ percent +"%", objects[i].x+15, objects[i].y+15);
    noFill();
    stroke(r,g,b);
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    if(objects[i].label == "person")
    {
        document.getElementById("status").innerHTML = "Status: Baby is there";
        song.stop()

    }else if(objects[i].label != "person"){
        document.getElementById("status").innerHTML = "Status: Baby is not there";
        song.play()

    }
}
}
}