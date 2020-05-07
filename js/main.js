$(document).ready(function () {
	$("#startBtn").click(function () {
		$(this).hide();
		startTalking();
	});

	var micaudio = document.getElementById("micaudio");
	var micctx = micaudio.getContext("2d");
	micctx.fillStyle = "blue";

	// var incaudio = document.getElementById("incaudio");
	// var incctx = incaudio.getContext("2d");
	// incctx.fillStyle = "#FF0000";

	onMicRawAudio = function (audioData, soundcardSampleRate) { //Data right after mic input
		micctx.clearRect(0, 0, micaudio.width, micaudio.height);
		for (var i = 0; i < audioData.length; i++) {
			micctx.fillRect(i, audioData[i] * 100 + 300, 1, 1);
		}
		return audioData;
	}

	onUserDecompressedAudio = function (audioData, userId, sampleRate, bitRate) { //Called when user audiodata coming from the client
		micctx.fillStyle = "red";
		micctx.clearRect(0, 0, micaudio.width, micaudio.height);
		for (var i = 0; i < audioData.length; i++) {
			micctx.fillRect(i, audioData[i] * 100 + 100, 1, 1);
		}
		micctx.fillStyle = "blue";
		return audioData;
		
	}
});