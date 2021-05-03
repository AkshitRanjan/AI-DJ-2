music = "";
music2 = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {
    music = loadSound("music.mp3");
    music2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);

    song1_status = song1.isPlaying();
	song2_status = song2.isPlaying();

    fill('#FF0000');
    stroke('#FF0000');

    if(scoreLeftWrist > 0.2) {
		circle(leftWristX, leftWristY, 20);
        
        song2.stop();

		if(song1_status == false) {
            song1.play();
			document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song"
		}
	}
}

function play() {
    music.play();
    music.setVolume(1);
    music.rate(1);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized!');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log('Left Wrist X:' + leftWristX + 'Left Wrist Y:' + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log('Right Wrist X:' + rightWristX + 'Right Wrist Y:' + rightWristY);
    }
}