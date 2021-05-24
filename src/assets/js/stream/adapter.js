// import { createFalse } from "typescript";

	
			var token = "null";
			var webRTCAdaptor = null;
			var start_publish_button = $("#start_publish_button");
			var stop_publish_button = $("#stop_publish_button");
			
			var screen_share_checkbox = $("#screen_share_checkbox");
			var install_extension_link = $("#install_chrome_extension_link");

			var streamNameBox = "abcde";//$("#streamName");
			
			var streamId="abcdefgh";
			var antmediaURL = 'testmedia.hellouser.co.in';

			var pc_config = null;

			var sdpConstraints = {
				OfferToReceiveAudio : false,
				OfferToReceiveVideo : false

			};
			
			var mediaConstraints = {
				video : true,
				audio : true
			};

			function getStreamURL(){

			}
			
  		 
			function startStream(){
				
						var websocketURL = "ws://" + antmediaURL + ":5080/WebRTCAppEE/websocket";
						//var websocketURL = "wss://" + 'media.study24x7.net' + ":5443/WebRTCAppEE/websocket";
						//var websocketURL = "wss://" + 'test.hellouser.co.in' + ":5443/WebRTCAppEE/websocket";
						if (location.protocol.startsWith("https")) {
							websocketURL = "wss://" + antmediaURL + ":5443/WebRTCAppEE/websocket";
						}
						//alert(websocketURL);
						return new Promise(resolve => {
					  webRTCAdaptor = new WebRTCAdaptor({
						websocket_url : websocketURL,
						mediaConstraints : mediaConstraints,
						peerconnection_config : pc_config,
						sdp_constraints : sdpConstraints,
						localVideoId : "localVideo",
						debug:true,
						
						callback : function(info, description) {
							if (info == "initialized") {
								console.log("initialized");
								//start_publish_button.disabled = false;
								//stop_publish_button.disabled = true;
							} else if (info == "publish_started") {
								//stream is being published
								console.log("publish started");
								//start_publish_button.disabled = true;
								//stop_publish_button.disabled = false;
								//$("#video_play").css("display","none");
								startAnimation();
							} else if (info == "publish_finished") {
								//stream is being finished
								console.log("publish finished");
								//start_publish_button.disabled = false;
								//stop_publish_button.disabled = true;
							}
							else if (info == "screen_share_extension_available") {
								//screen_share_checkbox.disabled = false;
								//install_extension_link.style.display = "none";
							}
							else if (info == "closed") {
								//console.log("Connection closed");
								if (typeof description != "undefined") {
									console.log("Connecton closed: " + JSON.stringify(description));
								}
							}
							// return  {'info':'success','desc':description};
							resolve( {'info':'success','desc':description});
						},
						callbackError : function(error, message) {
							//some of the possible errors, NotFoundError, SecurityError,PermissionDeniedError
							
							console.log("error callback: " +  JSON.stringify(error));
							var errorMessage = JSON.stringify(error);
							if (typeof message != "undefined") {
								errorMessage = message;
							}
							var errorMessage = JSON.stringify(error);
							if (error.indexOf("NotFoundError") != -1) {
								errorMessage = "Camera or Mic are not found or not allowed in your device";
							}
							else if (error.indexOf("NotReadableError") != -1 || error.indexOf("TrackStartError") != -1) {
								errorMessage = "Camera or Mic is being used by some other process that does not let read the devices";
							}
							else if(error.indexOf("OverconstrainedError") != -1 || error.indexOf("ConstraintNotSatisfiedError") != -1) {
								errorMessage = "There is no device found that fits your video and audio constraints. You may change video and audio constraints"
							}
							else if (error.indexOf("NotAllowedError") != -1 || error.indexOf("PermissionDeniedError") != -1) {
								errorMessage = "You are not allowed to access camera and mic.";
							}
							else if (error.indexOf("TypeError") != -1) {
								errorMessage = "Video/Audio is required";
							}
							console.log(error);
						
							//alert(errorMessage);
							resolve( {'info':'error','desc':errorMessage});
							
						}
					});
					// return {'info':'success','desc':"description"};
					// return new Promise(resolve => {
					// 	resolve( {'info':'success','desc':'description'})
					// });

			});
		}

			function getDataForStream(data){
                //alert(data.token);
				token = data.token;
				streamId = data.streamID;
				streamNameBox = data.streamName;
				antmediaURL = data.streamURL;
				//alert(data.token);

			}

			function getStreamUpdates(){
				console.log(this.streamId);
				return webRTCAdaptor.status(this.streamId);
			}

			function muteMic(onMic){
				if(!onMic){
					return webRTCAdaptor.muteLocalMic();
				}else if(onMic){
					return webRTCAdaptor.unmuteLocalMic();
				}
			}

			function playLocalCamera(play){
				if(!play){
					return webRTCAdaptor.turnOffLocalCamera();
				}else if(play){
					return webRTCAdaptor.turnOnLocalCamera();
				}
			}

			function startPublishing() {
				 //streamId = $("#livestreamid").val();
				console.log("start publish");
				// return new Promise(resolve => {
				webRTCAdaptor.publish(streamId, token);
				// console.log(resolve);
				// });
				return true;
			}

			function stopPublishing() {
				webRTCAdaptor.stop(streamId);
				webRTCAdaptor.turnOffLocalCamera();
				return true;
			}
			
			function enableDesktopCapture(enable) {
				if (enable == true) {
					// checkBrowserCompatiblity();
					// startScreen();
					webRTCAdaptor.switchDesktopCapture(streamId);
				}
				else {
					webRTCAdaptor.switchVideoCapture(streamId);
				}
			}

			//////////////////////////////////////////////////////
		// 	function checkBrowserCompatiblity(){
		// 	if(!navigator.getDisplayMedia && !navigator.mediaDevices.getDisplayMedia) {
		// 		console.log("browser uncompatible");
		// 		return false;
		// 	}else{
		// 		console.log("browser compatible");
		// 		return true;
		// 	}
		// }
			
		// 	function invokeGetDisplayMedia(success, error) {
		// 		var displaymediastreamconstraints = {
		// 			video: {
		// 				displaySurface: 'monitor', // monitor, window, application, browser
		// 				logicalSurface: true,
		// 				cursor: 'always' // never, always, motion
		// 			}
		// 		};
			
		// 		// above constraints are NOT supported YET
		// 		// that's why overridnig them
		// 		displaymediastreamconstraints = {
		// 			video: true
		// 		};
			
		// 		if(navigator.mediaDevices.getDisplayMedia) {
		// 			navigator.mediaDevices.getDisplayMedia(displaymediastreamconstraints).then(success).catch(error);
		// 		}
		// 		else {
		// 			navigator.getDisplayMedia(displaymediastreamconstraints).then(success).catch(error);
		// 		}
		// 	}
			
		// 	function captureScreen(callback) {
		// 		invokeGetDisplayMedia(function(screen) {

		// 			callback(screen);
		// 		}, function(error) {
		// 			console.error(error);
		// 			alert('Unable to capture your screen. Please check console logs.\n' + error);
		// 		});
		// 	}
			
		// 	function stopRecordingCallback() {
		// 		video.src = video.srcObject = null;
		// 		video.src = URL.createObjectURL(recorder.getBlob());
				
		// 		recorder.screen.stop();
		// 		recorder.destroy();
		// 		recorder = null;
			
		// 	}
			
		// 	var recorder; // globally accessible
			
		// 	 function startScreen() {
				
		// 		captureScreen(function(screen) {
		// 			video = document.getElementById('localVideo').video;
		// 			video.srcObject = screen;
			
		// 			recorder = RecordRTC(screen, {
		// 				type: 'video'
		// 			});
			
		// 			recorder.startRecording();
			
		// 			// release screen on stopRecording
		// 			recorder.screen = screen;
			
					
		// 		});
		// 	};
			
		// 	document.getElementById('btn-stop-recording').onclick = function() {
		// 		this.disabled = true;
		// 		recorder.stopRecording(stopRecordingCallback);
		// 	};
			
		// 	function addStreamStopListener(stream, callback) {
		// 		stream.addEventListener('ended', function() {
		// 			callback();
		// 			callback = function() {};
		// 		}, false);
		// 		stream.addEventListener('inactive', function() {
		// 			callback();
		// 			callback = function() {};
		// 		}, false);
		// 		stream.getTracks().forEach(function(track) {
		// 			track.addEventListener('ended', function() {
		// 				callback();
		// 				callback = function() {};
		// 			}, false);
		// 			track.addEventListener('inactive', function() {
		// 				callback();
		// 				callback = function() {};
		// 			}, false);
		// 		});
		// 	}






			///////////////////////////////////////////////
			
			function startAnimation() {

				$("#broadcastingInfo").fadeIn(800, function () {
				  $("#broadcastingInfo").fadeOut(800, function () {
					var state = webRTCAdaptor.signallingState(streamId);
					if (state != null && state != "closed") {
						var iceState = webRTCAdaptor.iceConnectionState(streamId);
						if (iceState != null && iceState != "failed" && iceState != "disconnected") {
							startAnimation();
						}
					}
				  });
				});

			  }

 
