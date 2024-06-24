song1="";
song2="";
song1_status="";
song2_status="";
Scoreleftwrist = 0;
scorerightwrist = 0;
LeftwristX = 0;
LeftWristY = 0;
RightWristX = 0;
RightWristY = 0;




function setup() {
    createCanvas(600, 500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();


    posenet = ml5.poseNet(video, modelloaded)
    posenet.on('pose', gotPoses)
}

function draw() {
    song1_status = song1.isPlaying()
    song2_status = song2.isPlaying()
    image(video, 0, 0, 600, 500)
    fill("#FF0000")
    stroke("#FF0000")
    if(scorerightwrist > 0.2){
        circle(RightWristX, RightWristY, 20)
        song2.Stop()
        if(song1_status == false){
            song1.play()
            document.getElementById("Song").innerHTML="Song=song1";
        }
    }

    if(scoreleftwrist > 0.2){
    circle(LeftwristX, LeftWristY, 20)
    song1.Stop()
        if(song2_status == false){
            song2.play()
            document.getElementById("Song").innerHTML="Song=song2";
        }
    }
}

function modelloaded() {
    console.log("Model has been loaded successfully.")
    }

    
function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results)
        Scoreleftwrist = results[0].pose.keypoints[9].score;
        scorerightwrist = results[0].pose.keypoints[10].score;
        console.log("Score Right Wrist = " + scorerightwrist + "Score Left Wrist = " + scoreleftwrist);



        LeftwristX = results[0].pose.leftWrist.x
        LeftWristY = results[0].pose.leftWrist.y
        console.log("LeftwristX " + LeftwristX + "LeftwristY" + LeftWristY )


        RightWristX = results[0].pose.rightWrist.x
        RightWristY = results[0].pose.rightWrist.y
        console.log("RightwristX" + RightWristX + "RightwristY" + RightWristY)
    }
}