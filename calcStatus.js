// ヒーローのステータス計算

function calcStatus(Hero, initial){
    for (var index = 1; index <= 6; index++){
	selname = initial + "E" + index.toString(10);
	var item = document.getElementById(selname).value;
	switch(item){
	case 'salow':
	    Hero.wp += 150;
	    break;
	case 'snake':
	    Hero.wp += 85;
	    Hero.absorb += 10;
	    Hero.snakeflg = 1;
	    break;
	case 'poison':
	    Hero.wp += 35;
	    Hero.speed += 35;
	    Hero.absorb += 10;
	    break;
	case 'breaking':
	    Hero.wp += 55;
	    Hero.speed += 20;
	    Hero.BPflg = 1;
	    break;
	case 'tension':
	    Hero.wp += 45;
	    Hero.wpPene += 12;
	    Hero.TSflg = 1;
	    break;
	case 'bonesaw':
	    Hero.wp += 15;
	    Hero.speed += 25;
	    Hero.wpPene += 8;
	    Hero.BSflg = 1;
	    break;
	case 'tornado':
	    Hero.speed += 40;
	    Hero.critDam += 20;
	    Hero.critRate += 35;
	    break;
	case 'monocle':
	    Hero.wp += 60;
	    Hero.critDam += 15;
	    Hero.critRate += 35;
	    break;
	case 'shutter':
	    Hero.cp += 150;
	    break;
	case 'broken':
	    Hero.cp += 70;
	    Hero.cpPene += 10;
	    Hero.BMflg = 1;
	    break;
	case 'frost':
	    Hero.cp += 100;
	    break;
	case 'eve':
	    Hero.cp += 55;
	    break;
	case 'echo':
	    break;
	case 'clock':
	    Hero.cpAmp += 30;
	    Hero.cooldown += 40;
	    break;
	case 'shock':
	    Hero.cp += 35;
	    Hero.cooldown += 25;
	    Hero.ASflg = 1;
	    break;
	case 'current':
	    Hero.cp += 60;
	    Hero.speed += 35;
	    break;
	case 'clusible':
	    Hero.hp += 600;
	    break;
	case 'fountain':
	    Hero.hp += 200;
	    Hero.armor += 30;
	    Hero.shield += 75;
	    break;
	case 'aegis':
	    Hero.hp += 200;
	    Hero.armor += 30;
	    Hero.shield += 125;
	    break;
	case 'jacket':
	    Hero.armor += 170;
	    Hero.shield += 35;
	    break;
	case 'atlas':
	    Hero.armor += 85;
	    Hero.shield += 35;
	    break;
	case 'journey':
	    Hero.hp += 250;
	    break;
	case 'tread':
	    Hero.hp += 500;
	    break;
	case 'halcyon':
	    Hero.hp += 200;
	    Hero.cooldown += 15;
	    break;
	case 'karakuri':
	    Hero.hp += 350;
	    Hero.cooldown += 40;
	    break;
	case 'crown':
	    Hero.hp += 200;
	    Hero.cooldown += 30;
	    break;
	case 'steal':
	    Hero.hp += 500;
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
