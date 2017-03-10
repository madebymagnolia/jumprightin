$(document).ready(function() {

	// Video Initialisation
	document.getElementById('eastenders').addEventListener('loadedmetadata', function() { this.currentTime = 10;	}, false);
	document.getElementById('motd').addEventListener('loadedmetadata', function() { this.currentTime = 3;	}, false);
	document.getElementById('w1a').addEventListener('loadedmetadata', function() { this.currentTime = 10;	}, false);
	document.getElementById('letitshine').addEventListener('loadedmetadata', function() { this.currentTime = 10;	}, false);

	// Press a key
	$(document).keydown(function(e){

		// App launcher
		if($('body').hasClass('state-app-launcher')) {

			var currentfocus = $('.screen-app-launcher li.focus').index();
			var total = $('.screen-app-launcher li').length;
			var nextfocus = currentfocus + 1;
			var prevfocus = currentfocus - 1;

			// Press Left
			if(e.keyCode == 37) {

				if(prevfocus > -1){

					$('.screen-app-launcher ul li').removeClass('focus');
					$('.screen-app-launcher ul li:eq(' + prevfocus + ')').addClass('focus');

				}

			}

			// Press Right
			if(e.keyCode == 39) {

				if(nextfocus < total){

					$('.screen-app-launcher ul li').removeClass('focus');
					$('.screen-app-launcher ul li:eq(' + nextfocus + ')').addClass('focus');

				}

			}

			// Press Enter
			if(e.keyCode == 13) {

				if($('.screen-app-launcher li.iplayer').hasClass('focus')) {

					$('.screen-app-launcher').hide();
					$('body').removeClass();

					setTimeout(function(){

						$('.screen-iplayer-home').show();
						$('body').addClass('state-iplayer-home');

						setTimeout(function(){
							$('#eastenders').get(0).play();
						},20);

						setTimeout(function(){
							$('#eastenders').addClass('playing');
						},100);

						setTimeout(function(){
							$('.bottombar').css('opacity','1');
							$('.bottombar .logo').css('opacity','1');
						},750);

					},2000);

				}

			}

		}

		// iPlayer Home
		if($('body').hasClass('state-iplayer-home')) {

			var videoindex = $('.videos video.playing').index();

			// Press Up
			if(e.keyCode == 38) {

				var videoprev = videoindex - 1;

				setTimeout(function(){
					$('video.playing').prop('muted', true);
					$('video.playing').removeClass('playing');

					$('video:eq(' + videoprev + ')').addClass('playing');
					$('video:eq(' + videoprev + ')').get(0).play();
					$('video.playing').prop('muted', false);

				},100);

			}

			// Press Down
			if(e.keyCode == 40) {

				var videonext = videoindex + 1;

				setTimeout(function(){
					$('video.playing').prop('muted', true);
					$('video.playing').removeClass('playing');

					if (videonext > 3) {

						$('video:eq(0)').addClass('playing');
						$('video:eq(0)').get(0).play();

					} else {

						$('video:eq(' + videonext + ')').addClass('playing');
						$('video:eq(' + videonext + ')').get(0).play();

					}

					$('video.playing').prop('muted', false);

				},100);

			}

		}

		// Play video
		if($('body').hasClass('state-startcontinue')) {

			// Press Up
			if(e.keyCode == 38) {
				$('.buttons .button').removeClass('focus');
				$('.buttons .button:eq(0)').addClass('focus');
			}			

			// Press Down
			if(e.keyCode == 40) {
				$('.buttons .button').removeClass('focus');
				$('.buttons .button:eq(1)').addClass('focus');
			}

			// Press Enter
			if(e.keyCode == 13 && $('.buttons .button:eq(0)').hasClass('focus')) {

				$('body').removeClass();
				$('video').css('-webkit-filter','none');
				$('.screen-startcontinue').css('opacity','0');
				$('video.playing').get(0).play();

			}

		}

	});

	// Long Press
	$(document).keydown(function(e){
	    if(e.keyCode == 13 && $('body').hasClass('state-iplayer-home')) {
	        counter = setTimeout(function(){ 
	            $('body').removeClass();
	            $('.bottombar').css('bottom','-200px');
	           	setTimeout(function(){
			        $('.screen-iplayermenu').css('opacity','1').css('transform','scale(1)');
		            setTimeout(function(){
		            	$('body').addClass('state-iplayermenu');
		            },200);
		        },100);
	        }, 500);
	    } 
	});

	// Shortpress
	$(document).keyup(function(e){
	    if(e.keyCode == 13 && $('body').hasClass('state-iplayer-home')) {
	        clearTimeout(counter);
	        $('body').removeClass();
            $('video.playing').get(0).pause();
	        $('.bottombar').css('bottom','-200px');
	        setTimeout(function(){
		        $('.screen-startcontinue').css('opacity','1');
	            $('video').css('-webkit-filter','blur(5px)');
	            setTimeout(function(){
	            	$('body').addClass('state-startcontinue');
	            	$('.buttons').addClass('active');
	            },200);
	        },100);
	    }
	});

});