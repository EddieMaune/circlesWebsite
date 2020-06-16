let final_transcript = '';

$(document).ready(function () {
;
	let recognizing = false;
	
	//Speech recognition
	if (!('webkitSpeechRecognition' in window)) {
		alert('Please download chrome!')
	} else {
		// start_button.style.display = 'inline-block';
		var recognition = new webkitSpeechRecognition();
		recognition.continuous = true;
		recognition.interimResults = true;
		

		console.log('HFUEHFUIAEHFUOH')
		recognition.onstart = function() {
			recognizing = true;
			// showInfo('info_speak_now');
			// start_img.src = 'mic-animate.gif';
		};
	
		recognition.onerror = function(event) {
			if (event.error == 'no-speech') {
				// start_img.src = 'mic.gif';
				// showInfo('info_no_speech');
				ignore_onend = true;
			}
			if (event.error == 'audio-capture') {
				// start_img.src = 'mic.gif';
				// showInfo('info_no_microphone');
				ignore_onend = true;
			}
			if (event.error == 'not-allowed') {
				// if (event.timeStamp - start_timestamp < 100) {
					// showInfo('info_blocked');
				// } else {
					// showInfo('info_denied');
				// }
				ignore_onend = true;
			}
		};
	
		recognition.onend = function() {
			recognizing = false;
			// if (ignore_onend) {
				// return;
			// }
			// start_img.src = 'mic.gif';
			// if (!final_transcript) {
				// showInfo('info_start');
				// return;
			// }
			// showInfo('');
			// if (window.getSelection) {
			// 	window.getSelection().removeAllRanges();
			// 	var range = document.createRange();
			// 	range.selectNode(document.getElementById('final_span'));
			// 	window.getSelection().addRange(range);
			// }
		};
	
		recognition.onresult = function(event) {
			var interim_transcript = '';
			for (var i = event.resultIndex; i < event.results.length; ++i) {
				if (event.results[i].isFinal) {
					final_transcript += event.results[i][0].transcript;
				} else {
					interim_transcript += event.results[i][0].transcript;
				}
			}

			console.log('Final_result',final_transcript);
		
		
			fetch(`https://api.tenor.com/v1/search?q=${final_transcript}&key=EHWI5FIIYFVA&limit=1`).then(
				(response) => {
					
					response.json().then(function(data) {
						if (final_transcript) {
							gifUrl = data?.results[0]?.media[0]?.gif?.url;
						}
						console.log(data?.results[0]?.media[0]?.gif?.url);
						final_transcript = '';
					});
				}
			);
			
		};
	}
	//Speech recognition

	$("#startBtn").click(function () {
		$(this).hide();
		startTalking();

		if (recognizing) {
			recognition.stop();
			return;
		}
		console.log('HETTT')
		//Speech recognition
		final_transcript = '';
		recognition.lang = 'en-ZA'
		recognition.start();
		ignore_onend = false;
		// final_span.innerHTML = '';
		// interim_span.innerHTML = '';
		// start_img.src = 'mic-slash.gif';
		// showInfo('info_allow');
		// showButtons('none');
		//speech recognition

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
			micctx.fillRect(i, audioData[i] * 100 + 150, 1, 1);
		}
		return audioData;
	}

	onUserDecompressedAudio = function (audioData, userId, sampleRate, bitRate) { //Called when user audiodata coming from the client
		micctx.fillStyle = "red";
		for (var i = 0; i < audioData.length; i++) {
			micctx.fillRect(i, audioData[i] * 100 + 150, 1, 1);
		}
		micctx.fillStyle = "blue";
		return audioData;
		
	}
});