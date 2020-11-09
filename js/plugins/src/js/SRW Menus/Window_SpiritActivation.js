import Window_CSS from "./Window_CSS.js";
import "./style/Window_SpiritActivation.css";

export default function Window_SpiritActivation() {
	this.initialize.apply(this, arguments);	
}

Window_SpiritActivation.prototype = Object.create(Window_CSS.prototype);
Window_SpiritActivation.prototype.constructor = Window_SpiritActivation;

Window_SpiritActivation.prototype.initialize = function() {
	var _this = this;
	this._processingAction = false;
	this._processingAnimationCount = 0;
	this._animationQueue = [];
	this._requiredImages = [];	
	this._layoutId = "spirit_activation";	
	this._timer = 50;
	this._participantInfo = {
		"actor": {
			img: ""
		}		
	};
	Window_CSS.prototype.initialize.call(this, 0, 0, 0, 0);	
	window.addEventListener("resize", function(){
		_this.requestRedraw();
	});
		
	this._actionQueue = [];
	
	this._finishing = false;
	this._finishTimer = 0;
	
	Object.keys($spiritManager.getSpiritDefinitions()).forEach(function(id){
		var spiritAnimInfo = $spiritManager.getSpiritDisplayInfo(id).animInfo;		
		if(spiritAnimInfo.name){
			ImageManager.loadNormalBitmap('img/SRWMapEffects/'+spiritAnimInfo.name+".png");
		} else {
			_this.loadImage(_this.makeSpiritAnimationURL(spiritAnimInfo.src));
		}
	});
}

Window_SpiritActivation.prototype.getCurrentSelection = function(){
	return this._mechList.getCurrentSelection();	
}

Window_SpiritActivation.prototype.createComponents = function() {
	Window_CSS.prototype.createComponents.call(this);
	var windowNode = this.getWindowNode();
	
	
	//this._actor.classList.add("scaled_width");
	//this._actor.classList.add("scaled_height");
	this._actor = document.createElement("div");
	this._actor.id = this.createId("actor");
	this._actorImg = document.createElement("img");
	this._actor.appendChild(this._actorImg);
	this._participantInfo.actor.imgElem = this._actorImg;
	
	this._spiritAnim = document.createElement("div");
	this._spiritAnim.id = this.createId("spirit_anim");
	this._spiritAnimImageContainer = document.createElement("div");
	this._spiritAnimImageContainer.classList.add("spirit_anim_container");
	this._spiritAnimImage = document.createElement("img");
	this._spiritAnimImage.classList.add("spirit_anim");
	//this._spiritAnimImage.setAttribute("src", this.makeImageURL("destroyed"));
	this._spiritAnimImageContainer.appendChild(this._spiritAnimImage);
	this._spiritAnim.appendChild(this._spiritAnimImageContainer);
	
	this._bgFadeContainer.innerHTML = "";
	
	this._HPBar = document.createElement("div");
	this._HPBar.id = this.createId("HPBar");
	this._HPBarFill = document.createElement("div");
	this._HPBarFill.id = this.createId("HPBarFill");
	this._HPBar.appendChild(this._HPBarFill);
	
	this._messageText = document.createElement("div");
	this._messageText.id = this.createId("message");
	this._messageText.classList.add("scaled_text");
	this._bgFadeContainer.appendChild(this._messageText);
	
	this._bgFadeContainer.appendChild(this._HPBar);	
	
	this._bgFadeContainer.appendChild(this._actor);	
	this._bgFadeContainer.appendChild(this._spiritAnim);	
	
}	

Window_SpiritActivation.prototype.loadRequiredImages = function(){
	var _this = this;
	return new Promise(function(resolve, reject){
		var promises = [];
		Object.keys(_this._participantInfo).forEach(function(type){
			var participant = _this._participantInfo[type];			
			promises.push(_this.loadImage(_this.makeImageURL(participant.img)));					
		});
		_this._actionQueue.forEach(function(effectDef){
			if(effectDef.type == "spirit"){
				var spiritId = effectDef.parameters.idx;	
				var spiritAnimInfo = $spiritManager.getSpiritDisplayInfo(spiritId).animInfo;				
				if(spiritAnimInfo.name){
					ImageManager.loadNormalBitmap('img/SRWMapEffects/'+spiritAnimInfo.name+".png");
				} else {
					promises.push(_this.loadImage(_this.makeSpiritAnimationURL(spiritAnimInfo.src)));
				}
			}			
		});
		
		Promise.all(promises).then(function(){
			resolve();
		});
	});
}

Window_SpiritActivation.prototype.loadImage = function(url){
	return new Promise(function(resolve, reject){
		var img=new Image();
		img.src=url;
		img.onload = resolve;
	});
}

Window_SpiritActivation.prototype.getActorInfo = function() {
	var _this = this;	
	_this._participantInfo.actor.img = $statCalc.getBasicBattleImage($gameTemp.spiritTargetActor);	
	var effectList = [];
	if($gameTemp.queuedActorEffects){
		effectList = JSON.parse(JSON.stringify($gameTemp.queuedActorEffects));
	}
	_this._actionQueue = effectList;	
}

Window_SpiritActivation.prototype.show = function() {
	var _this = this;
	this._processingAction = false;
	this._finishing = false;
	_this.clearMessage();
	_this.createComponents();
	_this.getActorInfo();	
	_this.loadRequiredImages().then(function(){
		_this._handlingInput = false;
		_this.visible = true;
		_this._redrawRequested = true;
		_this._visibility = "";
		_this.refresh();	
		Graphics._updateCanvas();
	});	
};

Window_SpiritActivation.prototype.setMessage = function(message, color) {
	if(!color){
		color = "#FFFFFF";
	}
	this._messageText.innerHTML = message;
	this._messageText.style.color = color;
}

Window_SpiritActivation.prototype.clearMessage = function(message, color) {
	this.setMessage("");
}

Window_SpiritActivation.prototype.getHPAnimInfo = function(action) {
	var targetMechStats = $statCalc.getCalculatedMechStats(action.attacked.ref);

	var startPercent = Math.floor((action.attacked.currentAnimHP / targetMechStats.maxHP)*100);
	var endPercent = Math.floor(((action.attacked.currentAnimHP - action.damageInflicted) / targetMechStats.maxHP)*100);
	if(endPercent < 0){
		endPercent = 0;
	}
	return {startPercent: startPercent, endPercent: endPercent};
}

Window_SpiritActivation.prototype.animateHP = function(elem, fillElem, startPercent, endPercent) {
	var _this = this;
	elem.style.display = "block";
	fillElem.style.width = startPercent+"%";
	var steps = 100;
	var stepDuration =  400/steps;
	var startTime = Date.now();
	var sign = Math.sign(startPercent - endPercent);
	var step = Math.abs(startPercent - endPercent) / steps;
	var hpDrainInterval = setInterval(function(){
		var ctr = Math.floor((Date.now() - startTime) / stepDuration);
		if(ctr <= steps){
			fillElem.style.width=startPercent - (step * ctr * sign)+"%";;
		} else {
			fillElem.style.width=endPercent;
		}
		if(ctr >= steps + 100){//linger a bit on the final hp value
			clearInterval(hpDrainInterval);
			elem.style.display = "none";
		}
	}, stepDuration);
}

/*Window_SpiritActivation.prototype.hide = function() {

}*/

Window_SpiritActivation.prototype.update = function() {
	var _this = this;
	Window_Base.prototype.update.call(this);
	
	if(this.isOpen() && !this._handlingInput){
		if(this._finishing){
			if(this._finishTimer <= 0){
				this._finishing = false;
				if(_this._callbacks.done){
					_this._callbacks.done();
				}				
			}
			this._finishTimer--;
		}
		
		if(!this._processingAction){
			var nextAction = this._actionQueue.shift();
			
			if(typeof nextAction == "undefined"){
				if(!this._finishing){
					this._finishing = true;
					this._finishTimer = 20;
				}							
			} else {
				this._actor.className = "";				
				this._processingAction = true;
				this._processingAnimation = false;
				this._animationQueue = [nextAction]
			}			
		} else {
			if(!this._processingAnimation){
				this.requestRedraw();
				var effectDef = this._animationQueue.shift();				
				
				var newNode = this._spiritAnimImage.cloneNode(true);
				this._spiritAnimImageContainer.replaceChild(newNode, this._spiritAnimImage);
				this._spiritAnimImage = newNode;
				
				if(typeof effectDef != "undefined"){
					if(effectDef.type == "spirit"){
						var spiritId = effectDef.parameters.idx;
						this._processingAnimation = true;			
						var spiritAnimInfo = $spiritManager.getSpiritDisplayInfo(spiritId).animInfo;
						this._spiritAnimImage.style.display = "block";
						this._spiritAnimImage.src = this.makeSpiritAnimationURL(spiritAnimInfo.src);
						console.log("Showing spirit image with "  + this._spiritAnimImage.src);
											
						setTimeout(function(){ 
							_this._spiritAnimImage.style.display = "none" 
							console.log("Hiding spirit image");
							_this._processingAnimation = false;
						}, spiritAnimInfo.duration);							
						
						var se = spiritAnimInfo.se || "SRWPowerUp";
						var se = {};
						se.name = 'SRWPowerUp';
						se.pan = 0;
						se.pitch = 100;
						se.volume = 90;
						AudioManager.playSe(se);
						
						if(effectDef.parameters.target && spiritAnimInfo.recovered){
							var stats = $statCalc.getCalculatedMechStats(effectDef.parameters.target);
							
							var startPercent = Math.floor((stats.HPBeforeRecovery / stats.maxHP) * 100);
							var endPercent = Math.floor((stats.currentHP / stats.maxHP) * 100);
							_this.setMessage(stats.currentHP - stats.HPBeforeRecovery, "#227722");
							_this.animateHP(_this._HPBar, _this._HPBarFill, startPercent, endPercent);
						}
						
						
					} else if(effectDef.type == "damage"){
						this._processingAnimation = true;			
						var stats = $statCalc.getCalculatedMechStats(effectDef.parameters.target);							
						var startPercent = Math.floor((stats.currentHP / stats.maxHP) * 100);
						var endPercent = Math.floor((Math.max(stats.currentHP - effectDef.parameters.damage, 0) / stats.maxHP) * 100);						
						_this.animateHP(_this._HPBar, _this._HPBarFill, startPercent, endPercent);
						_this.setMessage(effectDef.parameters.damage, "#FF2222");
						_this._actor.classList.add("damage");
						setTimeout(function(){ 
							_this.clearMessage();
						}, 400);	
							
						setTimeout(function(){ 
							_this._spiritAnimImage.style.display = "none" 
							_this._processingAnimation = false;
						}, 650);	
						
						var se = {};
						se.name = 'SRWHit';
						se.pan = 0;
						se.pitch = 100;
						se.volume = 90;
						AudioManager.playSe(se);
					} else if(effectDef.type == "double_image"){
						this._processingAnimation = true;			
						_this.setMessage("DOUBLE IMAGE");
						_this._actor.classList.add("double_image");
													
						setTimeout(function(){ 
							_this._spiritAnimImage.style.display = "none" 
							_this._processingAnimation = false;
						}, 650);	
						
						var se = {};
						se.name = 'SRWDoubleImage';
						se.pan = 0;
						se.pitch = 100;
						se.volume = 90;
						AudioManager.playSe(se);
					} else if(effectDef.type == "miss"){
						this._processingAnimation = true;			
						_this.setMessage("MISS");
													
						setTimeout(function(){ 
							_this._spiritAnimImage.style.display = "none" 
							_this._processingAnimation = false;
						}, 650);	
						
						var se = {};
						se.name = 'SRWMiss';
						se.pan = 0;
						se.pitch = 100;
						se.volume = 90;
						AudioManager.playSe(se);
					}			
					Graphics._updateCanvas();		
				} else {
					this._processingAction = false;
				}			
			}
		}		
		
		if(Input.isTriggered('down') || Input.isRepeated('down')){
			

		} else if (Input.isTriggered('up') || Input.isRepeated('up')) {
			
	
		}			

		if(Input.isTriggered('left') || Input.isRepeated('left')){
			
		} else if (Input.isTriggered('right') || Input.isRepeated('right')) {
			
	
		}
		
		if(Input.isTriggered('left_trigger') || Input.isRepeated('left_trigger')){
			
		
		} else if (Input.isTriggered('right_trigger') || Input.isRepeated('right_trigger')) {
			
			
		}
		
		if(Input.isTriggered('pageup') || Input.isRepeated('pageup')){
			
			
		} else if (Input.isTriggered('pagedown') || Input.isRepeated('pagedown')) {
			
			
		}
		
		if(Input.isTriggered('L3')){
			
			//this.getActorInfo();
		} 	
		
		if(Input.isTriggered('ok')){
			//this.getActorInfo();
		}
		if(Input.isTriggered('cancel')){				
			//$gameTemp.popMenu = true;	
		}		
		
		this.refresh();
	}		
};

Window_SpiritActivation.prototype.makeImageURL = function(name) {
	return "img/basic_battle/"+name+".png";
}

Window_SpiritActivation.prototype.makeSpiritAnimationURL = function(name) {
	return "img/animations/spirits/"+name+".png";
}

Window_SpiritActivation.prototype.redraw = function() {	
	var _this = this;
	Object.keys(_this._participantInfo).forEach(function(type){
		var participant = _this._participantInfo[type];
		
		participant.imgElem.setAttribute("src", _this.makeImageURL(participant.img));
		//_this.updateScaledImage(participant.imgElem);
					
	});	
	_this.updateScaledDiv(_this._bgFadeContainer);
	_this.updateScaledImage(_this._spiritAnimImage);
	_this.updateScaledDiv(_this._spiritAnim);
	_this.updateScaledDiv(_this._HPBar);
	_this.updateScaledDiv(_this._actor);
	_this.updateScaledDiv(_this._messageText);
	//_this._messageText.innerHTML = "DOUBLE IMAGE";
	
	Graphics._updateCanvas();
}

