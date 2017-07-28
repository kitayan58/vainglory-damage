// ダメージ計算
function calcDamage(Player, Enemy){
    var damage;
    var wp = Player.wp
    if(Player.name == "Balon"){
	wp = Player.wp * 1.3; // バロンは基本攻撃力を1.3倍する
    }
    damage = wp * Player.wpPene/100 + wp*(1-Player.wpPene/100) / (1 + Enemy.armor/100);
    damage = Math.floor(damage);
    return damage;
}

// stack数貯めるのに必要なダメージの計算
// メレー: (140+((stack-1)*5+140)) * stack / 2
function BPDamage(stack, melee){
    var damage;
    var alpha;
    if(melee == 0) alpha = 10;
    else if(melee = 1) alpha = 5;

    damage = (140 + ( (stack-1)*alpha + 140)) * stack / 2;
    return damage;
}

// ブレーキングポイントのスタック計算
function calcBPstack(Player, sumDamage){
    var BPstack = 0;
    for(var stack = 1; stack <= 20; stack++){
	if(sumDamage < BPDamage(stack, Player.melee)){
	    BPstack = stack-1;
	    break;
	}
	if(stack == 20){
	    BPstack = 20;
	}
    }
    return BPstack;
}

// ボーンソースタックによるアーマー削り計算
function calcBSstack(Enemy, stack){
    if(stack > 8){
	stack = 8;
    }
    Enemy.armor = Enemy.armor * (1 - stack*0.05);
    return stack;
}

function calcDamage2(){
    var Player = HeroSelect(document.getElementById("hero_select1").value);
    var Enemy = HeroSelect(document.getElementById("hero_select2").value);
    //ステータス計算---------------------------------
    Player = calcStatus(Player, "P");
    Enemy = calcStatus(Enemy, "E");
    //---------------------------------------------

    var kindCalc = document.selEQ.calculation.value;
    //　ダメージ計算-------------------------------
    switch(kindCalc){
    case "sum":   // n秒間ダメージ計算
	var damage;
	var critDamage;
	var DPS;

	damage = calcDamage(Player, Enemy);
	/*    damage = Player.wp / (1 + Enemy.armor/100);
	      damage = Math.floor(damage);*/
	critDamage = damage * Player.critDam/100;
	DPS = (damage * (1 - Player.critRate/100) + critDamage * Player.critRate/100) * Player.speed / 100;
	DPS = Math.floor(DPS);
	var message;
	message = "攻撃側:&emsp;";
	message += "武器力=" + Player.wp.toString(10);
	message += ",&emsp;攻速=" + Player.speed.toString(10) + "%";
	message += ",&emsp;crit率=" + Player.critRate.toString(10) + "%";
	message += ",&emsp;critダメージ=" + Player.critDam.toString(10) + "%";
	message += ",&emsp;貫通率=" + Player.wpPene.toString(10) + "%";
	message += "<br>防御側:&emsp;アーマー値=" + Enemy.armor.toString(10) + "<br>";
	message+=  "ダメージ:" + damage.toString(10);
	message += "(" + critDamage.toString(10) + ")<br>";
	message += "DPS:" + DPS.toString(10) + "<br>";

	document.getElementById("nstatus").innerHTML = message;
	//---------------------------------------------

	//　n秒間合計ダメージ計算----------------------
	var sec = selEQ._text.value;
	var numatk;
	var sumDamage = 0;
	var critHit = 0;
	var initwp = Player.wp;
	var initarmor = Enemy.armor;
	parseInt(sec);
	numatk = sec / (1 / (Player.speed/100));
	numatk = Math.floor(numatk) + 1;
	message = sec.toString(10) + "秒:&emsp;攻撃回数" + numatk.toString(10) + "回<br>";
	// 最後にテンションボウの追加ダメージが出たタイミング
	var lastTS = -100;
	for(var i = 0; i < numatk; i++){
	    var rand = Math.random();
	    var n = i+1;
	    var time = i / (Player.speed/100);
	    message += n.toString(10) + "回目";
	    // クリティカル判定
	    if(rand < Player.critRate/100){
		critHit = 1;
		message += "critical";
	    }else{
		critHit = 0;
	    }
	    // ブレーキングポイント処理
	    if (Player.BPflg){
		var BPstack = calcBPstack(Player, sumDamage);
		Player.wp += BPstack * 10;
		message += "ブレポ" + BPstack.toString(10) + "  ";
	    }
	    // ボーンソー処理
	    if(Player.BSflg == 1){
		var BSstack = calcBSstack(Enemy, i);
		message += "ボンソ" + BSstack.toString(10) + "    ";
	    }
	    damage = calcDamage(Player, Enemy);
	    damage += damage * (Player.critDam/100 - 1) * critHit;
	    // テンションボウ追加ダメージ判定
	    if(time-lastTS >= 6 && Player.TSflg == 1){
		damage += 180*Player.wpPene/100 + 180*(1-Player.wpPene/100)/(1+Enemy.armor/100);
		lastTS = time;
		message += "テンション&nbsp;";
	    }
	    damage = Math.floor(damage);
	    sumDamage += damage;
	    Player.wp = initwp;
	    Enemy.armor = initarmor;
	    message += damage.toString(10) + "ダメージ   ";
	    message += "累計ダメージ" + sumDamage.toString(10) + "<br>";
	    // document.getElementById("result").innerHTML = info;
	}
	message += "最終累計ダメージ:" + sumDamage.toString(10);
	document.getElementById("result").innerHTML = message;
	break;
	//--------------------------------------------

    case "skill":  // スキルダメージ表示-------------------------------
	if (Player.BMflg){
	    var node = document.getElementById("BrokenMyth");
	    node.innerHTML = "";
	    document.getElementById("BM").style.display = "inline-block";
	    addInput(node, "range", "BMstack", 0, 9, 0);
	    document.getElementById("BMstack").onchange = function(){skillDamage(Player,Enemy)};
	}
	else{
	    document.getElementById("BM").style.display = "none";
	    document.getElementById("BrokenMyth").innerHTML = "";
	}
	if (Player.ASflg){  // アフターショックを装備しているときの計算・表示の処理
	    var node = document.getElementById("AS");
	    displayInline("AS");
	    var hp = Enemy.hp;
	    var ASdamage = ApplyDamageEquation(hp*0.15, Player.cpPene, Enemy.shield);
	    var ASheal = ASdamage/2;
	    node.innerHTML = "アフターショックダメージ:&emsp;" + ASdamage.toFixed(1).toString(10) + "ダメージ";
	    node.innerHTML += "<span class=\"br\"></span>";
	    node.innerHTML += "アフターショック回復&emsp;:&emsp;" + ASheal.toFixed(1).toString(10)+ "回復";
	}else{
	    displayOff("AS");
	    document.getElementById("AS").innerHTML = "";
	}

	skillDamage(Player, Enemy);
	break;

	// キャリー殴り合い計算
    case "fisticuffs":
	CalcFisticuffs(Player, Enemy);
	break;

    default:
	break;
    }
}
