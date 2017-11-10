// アーマーブレイカー、シールドブレイカーのスタックしないところの処理
function armorBreakerz(Hero, value){
    if (Hero.wpPene < value) {
	Hero.wpPene = value;
    }
}
function shieldBreakerz(Hero, value){
    if(Hero.cpPene < value){
	Hero.cpPene = value;
    }
}
// ヴァンピリズムについても同様
function vampilizm(Hero, value){
    if(Hero.absorb < value){
	Hero.absorb = value;
    }
}

// 選択されたレベルのステータスを計算（小数第1位以下を切り捨て）
function levelStatus(Hero, initial){
    var level;
    if(initial == "P"){
	level = document.getElementById("HeroLevel").value;
    }
    else if(initial == "E"){
	level = document.getElementById("EnemyLevel").value;
    }
    Hero.level = level;
    // 内分点の公式を利用
    Hero.nathp = Math.floor((Hero.hplv12*((level-1)/11) + Hero.hplv1*((12-level)/11)) * 10) / 10;
    Hero.hp = Hero.nathp;
    Hero.remain = Hero.hp;
    Hero.wp = Math.floor( (Hero.wplv12*((level-1)/11) + Hero.wplv1*((12-level)/11)) * 10) / 10;
    Hero.natwp = Hero.wp;
    Hero.speed = Math.floor( (Hero.speed12*((level-1)/11) + Hero.speed1*((12-level)/11)) * 10) / 10;
    Hero.armor = Math.floor( (Hero.armor12*((level-1)/11) + Hero.armor1*((12-level)/11)) * 10) / 10;
    Hero.shield = Math.floor( (Hero.shield12*((level-1)/11) + Hero.shield1*((12-level)/11)) * 10) / 10;
}
// ヒーローのステータス計算

function calcStatus(Hero, initial){
    levelStatus(Hero,initial);
    for (var index = 1; index <= 6; index++){
	selname = initial + "E" + index.toString(10);
	var item = document.getElementById(selname).value;
	switch(item){
	// tier1 アイテム
	case 'weaponblade':
	    Hero.cost += 300;
	    Hero.wp += 15;
	    break;
	case 'book':
	    Hero.cost += 300;
	    Hero.wp += 5;
	    vampilizm(Hero, 4);
	    break;
	case 'swift':
	    Hero.cost += 300;
	    Hero.speed += 10;
	    break;
	case 'minion':
	    Hero.cost += 300;
	    Hero.critRate += 10;
	    Hero.critDam += 10;
	    break;
	    // tier2アイテム
	case 'heavy':
	    Hero.cost += 1150;
	    Hero.wp += 55;
	    break;
	case 'sixsins':
	    Hero.cost += 650;
	    Hero.wp += 30;
	    break;
	case 'needle':
	    Hero.cost += 800;
	    Hero.wp += 12;
	    vampilizm(Hero, 8);
	    break;
	case 'spear':
	    Hero.cost += 900;
	    Hero.wp += 15;
	    armorBreakerz(Hero, 10);
	    break;
	case 'brasing':
	    Hero.cost += 700;
	    Hero.speed += 20;
	    break;
	case 'lucky':
	    Hero.cost += 900;
	    Hero.critRate += 20;
	    Hero.critDam += 15;
	    break;
	    // tier3アイテム
	case 'salow':
	    Hero.cost += 3100;
	    Hero.wp += 150;
	    break;
	case 'snake':
	    Hero.cost += 2800;
	    Hero.wp += 85;
	    vampilizm(Hero, 10);
	    Hero.snakeflg = 1;
	    break;
	case 'spell':
	    Hero.cost += 2600;
	    Hero.wp += 90;
	    Hero.cooldown += 35;
	    break;
	case 'poison':
	    Hero.cost += 2250;
	    Hero.wp += 30;
	    Hero.speed += 30;
	    Hero.PNflg = 1;
	    vampilizm(Hero, 8);
	    break;
	case 'breaking':
	    Hero.cost += 2600;
	    Hero.wp += 55;
	    Hero.speed += 20;
	    Hero.BPflg = 1;
	    break;
	case 'tension':
	    Hero.cost += 2150;
	    Hero.wp += 45;
	    armorBreakerz(Hero, 10);
	    Hero.TSflg = 1;
	    break;
	case 'bonesaw':
	    Hero.cost += 2700;
	    Hero.wp += 15;
	    Hero.speed += 25;
	    armorBreakerz(Hero, 18);
	    Hero.BSflg = 1;
	    break;
	case 'tornado':
	    Hero.cost += 2600;
	    Hero.speed += 40;
	    Hero.critDam += 20;
	    Hero.critRate += 35;
	    break;
	case 'monocle':
	    Hero.cost += 2750;
	    Hero.wp += 60;
	    Hero.critDam += 15;
	    Hero.critRate += 35;
	    break;
	    
	    // クリスタルアイテム
	    // tier1
	case 'crystalbit':
	    Hero.cost += 300;
	    Hero.cp += 20;
	    break;
	case 'energy':
	    Hero.cost += 300;
	    break;
	case 'sandclock':
	    Hero.cost += 250;
	    Hero.cooldown += 10;
	    break;
	    //tier2
	case 'heavyprism':
	    Hero.cost += 1050;
	    Hero.cp += 50;
	    break;
	case 'eclipse':
	    Hero.cost += 650;
	    Hero.cp += 35;
	    break;
	case 'shard':
	    Hero.cost += 900;
	    Hero.cp += 20;
	    shieldBreakerz(Hero, 12);
	    break;
	case 'void':
	    Hero.cost += 700;
	    break;
	case 'chrono':
	    Hero.cost += 800;
	    Hero.cooldown += 20;
	    break;
	    //tier3
	case 'shutter':
	    Hero.cost += 3000;
	    Hero.cp += 150;
	    break;
	case 'spellfire':
	    Hero.cost += 2700;
	    Hero.cp += 90;
	    Hero.SFflg = 1;
	    break;
	case 'broken':
	    Hero.cost += 2700;
	    Hero.cp += 80;
	    shieldBreakerz(Hero, 30);
	    break;
	case 'frost':
	    Hero.cost += 2800;
	    Hero.cp += 85;
	    break;
	case 'dragoneye':
	    Hero.cost += 3000;
	    Hero.cp += 85;
	    Hero.deflg = 1;
	    break;
	case 'eve':
	    Hero.cost += 2600;
	    Hero.cp += 55;
	    break;
	case 'clock':
	    Hero.cost += 2500;
	    Hero.cp += 60
	    Hero.cooldown += 35;
	    break;
	case 'shock':
	    Hero.cost += 2400;
	    Hero.cp += 35;
	    Hero.cooldown += 25;
	    Hero.ASflg = 1;
	    break;
	case 'current':
	    Hero.cost += 2800;
	    Hero.cp += 60;
	    Hero.speed += 35;
	    break;

	    // 防御アイテム
	    // tier1
	case 'oakheart':
	    Hero.cost += 300;
	    Hero.hp += 250;
	    break;
	case 'lightshield':
	    Hero.cost += 250;
	    Hero.armor += 5;
	    Hero.shield += 30;
	    break;
	case 'lightarmor':
	    Hero.cost += 250;
	    Hero.armor += 30;
	    Hero.shield += 5;
	    break;
	    // tier2
	case 'dragonheart':
	    Hero.cost += 650;
	    Hero.hp += 500;
	    break;
	case 'lifefountain':
	    Hero.cost += 800;
	    Hero.hp += 300;
	    break;
	case 'reflect':
	    Hero.cost += 700;
	    Hero.hp += 250;
	    break;
	case 'kinetic':
	    Hero.cost += 800;
	    Hero.armor += 20;
	    Hero.shield += 65;
	    break;
	case 'plate':
	    Hero.cost += 800;
	    Hero.armor += 65;
	    Hero.shield += 20;
	    break;
	    // tier3
	case 'slumber':
	    Hero.cost += 1700;
	    Hero.hp += 650;
	    break;
	case 'clusible':
	    Hero.cost += 1850;
	    Hero.hp += 650;
	    break;
	case 'fountain':
	    Hero.cost += 2300;
	    Hero.hp += 300;
	    Hero.armor += 20;
	    Hero.shield += 65;
	    break;
	case 'aegis':
	    Hero.cost += 2250;
	    Hero.hp += 250;
	    Hero.armor += 25;
	    Hero.shield += 100;
	    break;
	case 'jacket':
	    Hero.cost += 2100;
	    Hero.armor += 140;
	    Hero.shield += 25;
	    break;
	case 'atlas':
	    Hero.cost += 1900;
	    Hero.armor += 70;
	    Hero.shield += 25;
	    break;

	    // 実用アイテム
	case 'travel':
	    Hero.cost += 1000;
	    Hero.hp += 125;
	    break;
	case 'flare':
	    Hero.cost += 600;
	    Hero.hp += 300;
	    break;
	case 'flag':
	    Hero.cost += 850;
	    Hero.hp += 250;
	    break;
	case 'journey':
	    Hero.cost += 1900;
	    Hero.hp += 300;
	    break;
	case 'tread':
	    Hero.cost += 2500;
	    Hero.hp += 650;
	    break;
	case 'halcyon':
	    Hero.cost += 2300;
	    Hero.hp += 250;
	    Hero.cooldown += 15;
	    break;
	case 'echo':
	    Hero.cost += 2200;
	    break;
	case 'karakuri':
	    Hero.cost += 2100;
	    Hero.hp += 450;
	    Hero.cooldown += 30;
	    break;
	case 'crown':
	    Hero.cost += 2200;
	    Hero.hp += 300;
	    Hero.cooldown += 20;
	    break;
	case 'nullwave':
	    Hero.cost += 2200;
	    Hero.hp += 500;
	    Hero.cooldown += 25;
	case 'steal':
	    Hero.cost += 1450;
	    Hero.hp += 650;
	    break;
	}
    }
    var inf = document.getElementById(initial+"inf").value;
    switch(inf){
    case 'wpinf':
	Hero.wp += 60;
	Hero.speed += 15;
	Hero.armor += 30;
	Hero.shield += 30;
	break;
    case 'cpinf':
	Hero.cp += 60;
	Hero.armor += 30;
	Hero.shield += 30;
	Hero.cooldown += 25;
	break;
    }
    if(Hero.critRate > 100){
	Hero.critRate = 100;
    }
    Hero.cp *= 1 + Hero.cpAmp/100;

    return Hero;
}
