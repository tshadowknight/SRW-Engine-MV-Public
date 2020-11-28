function SRWSaveManager(){
	
}

SRWSaveManager.prototype.getActorData = function(actorId){
	if(!$gameSystem.actorData){
		$gameSystem.actorData = {};
	}
	if(!$gameSystem.actorData[actorId]){
		$gameSystem.actorData[actorId] = {
			pilotUpgrades: {
				melee: 0,
				ranged: 0,
				skill: 0,
				defense: 0,
				evade: 0,
				hit: 0,
				terrain: {
					air: 0,
					land: 0,
					water: 0,
					space: 0
				},
			},
			PP: 0,
			exp: 500,
			kills: 0,
			abilities: null
		};
	}
	return JSON.parse(JSON.stringify($gameSystem.actorData[actorId]));
}

SRWSaveManager.prototype.getMechData = function(mechId){
	if(!$gameSystem.mechData){
		$gameSystem.mechData = {};
	}
	if(!$gameSystem.mechData[mechId]){
		$gameSystem.mechData[mechId] = {
			mechUpgrades: {
				maxHP: 0,
				maxEN: 0,
				armor: 0,
				mobility: 0,
				terrain: {						
					air: 0,
					land: 0,
					water: 0,
					space: 0
				},
				accuracy: 0,
				weapons: 0,
				move: 0
			}			
		};
	}
	return JSON.parse(JSON.stringify($gameSystem.mechData[mechId]));
}

SRWSaveManager.prototype.getInventoryData = function(){
	if(!$gameSystem.inventoryData){
		$gameSystem.inventoryData = {};
	}	
	return JSON.parse(JSON.stringify($gameSystem.inventoryData));
}

SRWSaveManager.prototype.setInventoryData = function(data){	
	$gameSystem.inventoryData = data;	
}

SRWSaveManager.prototype.storeActorData = function(actorId, data){
	if(!$gameSystem.actorData){
		$gameSystem.actorData = {};
	}	
	$gameSystem.actorData[actorId] = JSON.parse(JSON.stringify(data));
}

SRWSaveManager.prototype.storeMechData = function(mechId, data){
	if(!$gameSystem.mechData){
		$gameSystem.mechData = {};
	}
	$gameSystem.mechData[mechId] = JSON.parse(JSON.stringify(data));
}

SRWSaveManager.prototype.getUnlockedUnits = function(){
	if(!$gameSystem.unlockedUnits){
		$gameSystem.unlockedUnits = {};
	}
	return $gameSystem.unlockedUnits;
}

SRWSaveManager.prototype.setUnitUnlocked = function(unitClassId){
	if(!$gameSystem.unlockedUnits){
		$gameSystem.unlockedUnits = {};
	}
	$gameSystem.unlockedUnits[unitClassId] = true;
}

SRWSaveManager.prototype.setUnitLocked = function(unitClassId){
	if(!$gameSystem.unlockedUnits){
		$gameSystem.unlockedUnits = {};
	}
	delete $gameSystem.unlockedUnits[unitClassId];
}

SRWSaveManager.prototype.setPilotLevel = function(pilotId, level){
	var actorData = this.getActorData(pilotId);
	actorData.exp = level * 500;
	this.storeActorData(pilotId, actorData);
}

SRWSaveManager.prototype.addKills = function(pilotId, amount){
	var actorData = this.getActorData(pilotId);
	actorData.kills+=amount*1;
	this.storeActorData(pilotId, actorData);
}

SRWSaveManager.prototype.addPP = function(pilotId, amount){
	var actorData = this.getActorData(pilotId);
	actorData.PP+=amount*1;
	this.storeActorData(pilotId, actorData);
}

SRWSaveManager.prototype.lockMapSRPoint = function(mapId){
	if(!$gameSystem.lockedSRPoints){
		$gameSystem.lockedSRPoints = {};
	}
	$gameSystem.lockedSRPoints[mapId] = true;
}

SRWSaveManager.prototype.isMapSRPointLocked = function(mapId){
	if(!$gameSystem.lockedSRPoints){
		$gameSystem.lockedSRPoints = {};
	}
	return $gameSystem.lockedSRPoints[mapId];
}