function BattleTextBuilder(){	
	var _this = this;
	this._dataFileName = "BattleText.json";
	_this._isLoaded = new Promise(function(resolve, reject){
		_this._resolveLoad = resolve;
	});
	this.loadDefinitions(
		"active", 
		function(data){
			_this.processDefinitions(data)
		}, function(){
			_this.loadDefinitions(
				"default",
				function(data){
					_this.processDefinitions(data)
				}
			)	
		}
	);
	
	this._availableHooks = [
		"battle_intro",
		"retaliate",
		"attacks",
		"evade",
		"damage",
		"damage_critical",
		"destroyed",
		"support_defend",
		"support_attack"
	];			
}

BattleTextBuilder.prototype.getAvailableTextHooks = function(){
	return this._availableHooks.slice();
}

BattleTextBuilder.prototype.loadDefinitions = function(type, onload, onerror){
	var xhr = new XMLHttpRequest();
    var url = 'js/plugins/config/'+type+'/'+this._dataFileName;
    xhr.open('GET', url);
    xhr.overrideMimeType('application/json');
    xhr.onload = function() {
        if (xhr.status < 400) {
            onload(JSON.parse(xhr.responseText));            
        }
    };
    xhr.onerror = onerror;
    window[name] = null;
    xhr.send();
}

BattleTextBuilder.prototype.getDefinitions = function(){
	return this._data;
}

BattleTextBuilder.prototype.isLoaded = function(){
	return this._isLoaded;
}

BattleTextBuilder.prototype.processDefinitions = function(data){
	var _this = this;	
	_this._data = data;
	_this._resolveLoad();
}


BattleTextBuilder.prototype.save = function(id){
	var fs = require('fs');
	var dirPath = 'js/plugins/config/active';
	if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
	fs.writeFileSync('js/plugins/config/active/'+this._dataFileName, JSON.stringify(this._data));
}

BattleTextBuilder.prototype.saveBackup = function(id){
	var fs = require('fs');
	var dirPath = 'js/plugins/config/active';
	if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
	fs.writeFileSync('js/plugins/config/active/'+this._dataFileName+'.bak', JSON.stringify(this._data));
}

BattleTextBuilder.prototype.updateText = function(params, value){
	try {
		var def = this.getDefinitions()[params.sceneType]
		var entityDef = def[params.entityType][params.entityId];
		var hookDef = entityDef[params.type];
		var options = hookDef[params.subType];
		options[params.targetIdx] = value;
	} catch(e){
		console.log(e.message);
	}
}

BattleTextBuilder.prototype.addText = function(params, value){
	try {
		var def = this.getDefinitions()[params.sceneType]
		var entityDef = def[params.entityType][params.entityId];
		var hookDef = entityDef[params.type];
		var options = hookDef[params.subType];
		var newEntry;
		if(params.subType == "default"){
			newEntry = {text: "", faceName: "", faceIndex: ""};
		} else {
			newEntry = {text: "", faceName: "", faceIndex: "", unitId: -1};
		}
		options.push(newEntry);
	} catch(e){
		console.log(e.message);
	}
}

BattleTextBuilder.prototype.setUnitId = function(params, id){
	try {
		var def = this.getDefinitions()[params.sceneType]
		var entityDef = def[params.entityType][params.entityId];
		var hookDef = entityDef[params.type];
		var options = hookDef[params.subType];		
		options[params.targetIdx].unitId = id;
	} catch(e){
		console.log(e.message);
	}
}
