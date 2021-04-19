// Generated by RPG Maker.
// Do not edit this file directly.
var $plugins =
[
{"name":"Community_Basic","status":true,"description":"Basic plugin for manipulating important parameters.","parameters":{"cacheLimit":"10","screenWidth":"1110","screenHeight":"624","changeWindowWidthTo":"1110","changeWindowHeightTo":"624","renderingMode":"webgl","alwaysDash":"off","textSpeed":"1","autoSaveFileId":"0","errorMessage":"Error occurred. Please ask to the creator of this game.","showErrorDetail":"true","enableProgressBar":"true","maxRenderingFps":"0"}},
{"name":"RS_VersionLayer","status":false,"description":"(v1.0.2) This plugin allows you to show up the version anywhere. <RS_VersionLayer>","parameters":{"Version":"1.22","visible":"true","--- Font":"","textSize":"64","textColor":"rgb(255, 255, 0)","outlineColor":"rgb(0, 0, 0)","outlineWidth":"4","defaultText":" Version :","textAlign":"left","opacity":"255","-- Position":"","Position":"Bottom"}},
{"name":"YEP_FpsSynchOption","status":true,"description":"v1.03 Adds a new command to Options menu for synching\r\nthe FPS of moniters with higher FPS rates.","parameters":{"Command Name":"Auto Frameskip","Default Setting":"true"}},
{"name":"YEP_BattleEngineCore","status":false,"description":"v1.50 Have more control over the flow of the battle system\r\nwith this plugin and alter various aspects to your liking.","parameters":{"---General---":"","Action Speed":"agi","Default System":"dtb","---Escape---":"","Escape Ratio":"0.5 * $gameParty.agility() / $gameTroop.agility()","Fail Escape Boost":"0.10","---Animation---":"","Animation Base Delay":"0","Animation Next Delay":"0","Certain Hit Animation":"0","Physical Animation":"52","Magical Animation":"51","Enemy Attack Animation":"39","Reflect Animation":"42","Motion Waiting":"false","---Frontview---":"","Front Position X":"Graphics.boxWidth / 8 + Graphics.boxWidth / 4 * index","Front Position Y":"Graphics.boxHeight - 180","Front Actor Sprite":"false","Front Sprite Priority":"1","---Sideview---":"","Home Position X":"screenWidth - 16 - (maxSize + 2) * 32 + index * 32","Home Position Y":"screenHeight - statusHeight - maxSize * 48 + (index+1) * 48 - 32","Side Sprite Priority":"1","---Sprites---":"","Default X Anchor":"0.50","Default Y Anchor":"1.00","Step Distance":"48","Flinch Distance":"12","Show Shadows":"true","---Damage Popups---":"","Popup Duration":"128","Newest Popup Bottom":"true","Popup Overlap Rate":"0.9","Critical Popup":"255, 0, 0, 160","Critical Duration":"60","---Tick-Settings---":"","Timed States":"false","Timed Buffs":"false","Turn Time":"100","AI Self Turns":"true","---Window Settings---":"","Lower Windows":"true","Window Rows":"4","Command Window Rows":"4","Command Alignment":"center","Start Actor Command":"true","Current Max":"false","---Selection Help---":"","Mouse Over":"true","Select Help Window":"true","User Help Text":"User","Ally Help Text":"Ally","Allies Help Text":"Allies","Enemy Help Text":"Enemy","Enemies Help Text":"Enemies","All Help Text":"All %1","Random Help Text":"%2 Random %1","---Enemy Select---":"","Visual Enemy Select":"true","Show Enemy Name":"true","Show Select Box":"false","Enemy Font Size":"20","Enemy Auto Select":"this.furthestRight()","---Actor Select---":"","Visual Actor Select":"true","---Battle Log---":"","Show Emerge Text":"false","Show Pre-Emptive Text":"true","Show Surprise Text":"true","Optimize Speed":"true","Show Action Text":"false","Show State Text":"false","Show Buff Text":"false","Show Counter Text":"true","Show Reflect Text":"true","Show Substitute Text":"true","Show Fail Text":"false","Show Critical Text":"false","Show Miss Text":"false","Show Evasion Text":"false","Show HP Text":"false","Show MP Text":"false","Show TP Text":"false"}},
{"name":"YEP_X_ActSeqPack1","status":false,"description":"v1.13 (Requires YEP_BattleEngineCore.js) Basic functions are\r\nadded to the Battle Engine Core's action sequences.","parameters":{"Default Volume":"90","Default Pitch":"100","Default Pan":"0"}},
{"name":"YEP_X_ActSeqPack2","status":false,"description":"v1.12 (Requires YEP_BattleEngineCore.js) Visual functions\r\nare added to the Battle Engine Core's action sequences.","parameters":{}},
{"name":"YEP_X_ActSeqPack3","status":false,"description":"v1.05 (Requires YEP_BattleEngineCore.js) Camera control is\r\nadded to the Battle Engine Core's action sequences.","parameters":{"Camera Option":"Battle Camera"}},
{"name":"--KADOKAWA Plugins-----","status":false,"description":"----------------------------------------------------------------------","parameters":{}},
{"name":"MadeWithMv","status":false,"description":"Show a Splash Screen \"Made with MV\" and/or a Custom Splash Screen before going to main screen.","parameters":{"Show Made With MV":"true","Made with MV Image":"MadeWithMv","Show Custom Splash":"false","Custom Image":"","Fade Out Time":"40","Fade In Time":"40","Wait Time":"80"}},
{"name":"SimpleMsgSideView","status":false,"description":"at sideview battle, only display item/skill names.","parameters":{"displayAttack":"0","position":"1"}},
{"name":"--SRW Plugins--------","status":false,"description":"----------------------------------------------------------------------","parameters":{}},
{"name":"BattleTextBuilder","status":true,"description":"","parameters":{}},
{"name":"BattleAnimationBuilder","status":true,"description":"","parameters":{}},
{"name":"BattleEnvironmentBuilder","status":true,"description":"","parameters":{}},
{"name":"SRW_MapAttackManager","status":true,"description":"","parameters":{}},
{"name":"SRW_StageInfoManager","status":true,"description":"","parameters":{}},
{"name":"SRW_SongManager","status":true,"description":"","parameters":{}},
{"name":"SRW_AbilityManager","status":true,"description":"","parameters":{}},
{"name":"SRW_SpiritManager","status":true,"description":"","parameters":{}},
{"name":"SRW_BattleScene","status":true,"description":"","parameters":{}},
{"name":"SRW_InventoryManager","status":true,"description":"","parameters":{}},
{"name":"SRW_Menus","status":true,"description":"","parameters":{}},
{"name":"SRW_SaveManager","status":true,"description":"","parameters":{}},
{"name":"SRW_BattleCalc","status":true,"description":"","parameters":{}},
{"name":"SRW_StatCalc","status":true,"description":"","parameters":{}},
{"name":"SRW_BattleTextManager","status":true,"description":"","parameters":{}},
{"name":"SRW_Editor","status":true,"description":"","parameters":{}},
{"name":"--SRPG Plugins--------","status":false,"description":"----------------------------------------------------------------------","parameters":{}},
{"name":"SRPG_core","status":true,"description":"(v1.22) SRPG battle system (tactical battle system) on map.","parameters":{"srpgTroopID":"1","srpgBattleSwitchID":"1","existActorVarID":"1","existEnemyVarID":"2","turnVarID":"3","activeEventID":"4","targetEventID":"5","defaultMove":"4","srpgBattleExpRate":"0.4","srpgBattleExpRateForActors":"0.1","srpgBattleQuickLaunch":"true","srpgActorCommandEquip":"true","srpgBattleEndAllHeal":"true","srpgStandUnitSkip":"true","srpgPredictionWindowMode":"1","srpgAutoBattleStateId":"14","srpgBestSearchRouteSize":"30","srpgDamageDirectionChange":"true","enemyDefaultClass":"Enemy","textSrpgEquip":"Equip","textSrpgMove":"Move","textSrpgRange":"Range","textSrpgWait":"Wait","textSrpgTurnEnd":"End Turn","textSrpgAutoBattle":"Auto Battle"}},
{"name":"SRPG_ImmediateSkill","status":true,"description":"Create skills that do not consume turns in SRPG converter.","parameters":{}},
{"name":"SRPG_AgiAttackPlus","status":true,"description":"Create skills that do not consume turns in SRPG converter.","parameters":{"srpgAgilityAffectsRatio":"2"}},
{"name":"--Other Plugins--------","status":false,"description":"----------------------------------------------------------------------","parameters":{}},
{"name":"AudioStreaming","status":true,"description":"Load audio faster and use only ogg files.","parameters":{"mode":"10","deleteM4a":"false"}},
{"name":"YEP_X_BattleObject","status":false,"description":"Adding \"Battle Object\" to Yanfly Action Sequence","parameters":{}},
{"name":"CXJ_Exit","status":true,"description":"Adds an exit option to desktop versions of the game","parameters":{"Text - Exit":"Exit","Text - To Desktop":"Exit","Add to title":"true","Add to Game End":"true"}},
{"name":"RS_MessageAlign","status":true,"description":"(v1.0.12) This plugin allows you to align the text in the message system.","parameters":{}},
{"name":"Fullscreen_Options","status":true,"description":"v1.1 Add fullscreen option, force fullscreen in Stretch Mode and disable F3.","parameters":{"fullscreenOptionName":"Fullscreen","forceFullscreen":"false","Add command to option?":"false","Disable F3?":"true","Disable F4?":"false"}},
{"name":"Irina_PerformanceUpgrade","status":false,"description":"<PerformanceUpgrade> for RPG Maker MV version 1.6.2.","parameters":{"":"","AnimationHue":"true","BlurMenuBackground":"true","BlurIntensity":"0.5","CacheTextColors":"true","EnemyHue":"true","PixiContainerFlush":"true","SkipUnnecessarySnapshots":"true"}},
{"name":"ChangeWindowTouchPolicy","status":false,"description":"Change Window Touch Policy","parameters":{"ActionOutsideFrame":"cancel"}},
{"name":"astar","status":true,"description":"","parameters":{}},
{"name":"BindPicturesToMap","status":true,"description":"1.0.7 Plugin Commands for binding pictures to the map and/or changing what layer they're drawn on.","parameters":{}},
{"name":"effekseer_asmjs","status":true,"description":"","parameters":{}},
{"name":"goog","status":true,"description":"","parameters":{}},
{"name":"atlas","status":true,"description":"","parameters":{}},
{"name":"render-ctx2d","status":true,"description":"","parameters":{}},
{"name":"render-webgl","status":true,"description":"","parameters":{}},
{"name":"spriter","status":true,"description":"","parameters":{}},
{"name":"RiP_UnlockedCamera","status":true,"description":"Unlock the camera from map edges keeping it centered on the player.","parameters":{"Default Camera":"true"}},
{"name":"Shaz_TileChanger","status":true,"description":"Change tiles on map or copy tiles from another map","parameters":{}},
{"name":"pixi-filters","status":true,"description":"","parameters":{}},
{"name":"Galv_ChoicePictures","status":true,"description":"(v.1.2) Displays different pictures depending on which choice is highlighted.","parameters":{"Choice Picture Id":"1"}},
{"name":"dragonBones","status":true,"description":"","parameters":{}}
];
