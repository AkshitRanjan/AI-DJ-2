music = "";
music2 = "";

music_status = "";
music2_status = "";

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

    music_status = music.isPlaying();
	music2_status = music2.isPlaying();

    fill('#FF0000');
    stroke('#FF0000');

    if(scoreLeftWrist > 0.2) {
		circle(leftWristX, leftWristY, 20);
        
        music2.stop();

		if(music_status == false) {
            music.play();
			document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song";
		}
	}

    if(scoreRightWrist > 0.2) { 
		circle(rightWristX, rightWristY, 20);

		music.stop();

		if(music2_status == false)
		{
			music2.play();
			document.getElementById("song").innerHTML = "Playing - Peter Pan Theme Song";
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

        scoreRightWrist =  results[0].pose.keypoints[10].score;
        scoreLeftWrist =  results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log('Left Wrist X:' + leftWristX + 'Left Wrist Y:' + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log('Right Wrist X:' + rightWristX + 'Right Wrist Y:' + rightWristY);
    }
}