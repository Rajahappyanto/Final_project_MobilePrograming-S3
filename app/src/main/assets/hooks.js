var gradle = { log: function(val){val && console.log( gradle.isMobile && (typeof val === 'object') ? JSON.stringify(val) : val );},
/**

*/
	isTesting: false,

	intervalAds    : 1,     //Ads each interval for example each 3 times
    
	enableLeaderboard  : false,
	
	
	
	//Events manager :
	//================
    event: function(ev, msg){
		if(gradle.process(ev,msg))
        switch(ev){

		case 'first_start':   //First start
			//gradle.showInter();
			break;

		case 'btn_play_now':   //Button Play
            gradle.checkInterval() && gradle.showInter();
			break;

		case 'btn_start_race':   //Button start race
			//gradle.showInter();
			break;
			
		case 'scene_result': //game end : scene of result
			//gradle.showInter();
			break;
		
		case 'scene_shop':  //after result scene shop 
			//gradle.showInter();
			break;
			
		case 'btn_instructions': //event on button instructions
			//gradle.showInter();
			break;
			
		case 'btn_reset': //event on button reset
			//gradle.showInter();
			break;
			
		case 'test':
			//gradle.checkInterval() && gradle.showInter();
			break;
		
        }
    },





    //Ready : /!\ DO NOT CHANGE, ONLY IF YOU ARE AN EXPERT.
    //=========================
	start: function(){
		
        //setTimeout(function(){sizeHandler();gradle.event_ext('hide_splash');}, 600);
    },
	pause: function(){
		console.log('gradle pause ...');
		createjs.Sound.setMute(true);
    },
	resume: function(){
		console.log('gradle resume ...');
		createjs.Sound.setMute(gradle.mute);
    },

    run: function() {
        gradle.event('first_start');
		gradle.isMobile = ( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) );
        document.addEventListener("visibilitychange", gradle.onVisibilityChanged, false);
		gradle.start();
    },

	mute: false,
    event_ext: function(val){
		if(this.isMobile && typeof jacob!='undefined'){
			jacob.do_event(val);
		}
	},

	old_ev: null,
    process: function(ev, msg){
		if(gradle.old_ev ==ev){
			if(ev=='button_share' || ev=='button_play'){
				console.log('repeat');
				//return false;
			}
		}
        if(ev=='state_game_create'){
			null != game && (game.sound.mute = !1, game.paused = !1);
			//this.triggerEvent(document.getElementById('game'), 'click');
		}
		switch(ev){
            case 'btn_more':
                gradle.event_ext('show_more');
                break;
            case 'btn_privacy':
                gradle.event_ext('show_privacy');
                break;
            case 'btn_share':
                gradle.event_ext('show_share');
                break;
            case 'btn_profile':
                gradle.event_ext('show_profile');
                break;
            case 'btn_exit_game':
                gradle.event_ext('exit_game');
                break;
        }
		gradle.old_ev = ev;
		gradle.log(ev,msg);
		return true;
    },

    showInter: function(){
        if(!gradle.isMobile) return;
        gradle.log('jacob|show_inter');
    },
	
	score : 0,
    save_score(score, level){
        gradle.event_ext('save_score|'+score+'|'+level);
    },

	onVisibilityChanged : function(){
	    if (document.hidden || document.mozHidden || document.webkitHidden || document.msHidden){
			gradle.pause();
		}else{
			gradle.resume();
		}
	},

	currentInterval : 0,
	checkInterval: function(){
		return (++gradle.currentInterval==gradle.intervalAds) ? !(gradle.currentInterval=0) : !1;
	}
};
var game_data = {
    row: 10,
    col: 12,
    color: 6,
    size: 64,
    start_x: 70,
    start_y: 190,
    fall_duration: 80,
    cur_level: 2,
    total_level: 90,
    unlocked_level: 1,
    line_distance: 36,
    booster_at: 5,
    sound: true,
    music: true,
    enable_reward: false,
    reward: {
        loaded: false,
        ready: true,
    }
}
var levels_star = [];
gradle.run();
