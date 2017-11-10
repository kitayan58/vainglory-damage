function CalcFisticuffs(Player, Enemy){
    var obj = document.getElementById("hero_select1");
    var name1 = obj.options[obj.selectedIndex].text;
    var name2 = Enemy.name;
    // ステータス表示 ---------------------------------------
    var message;
    message = name1 + ":&nbsp;";
    message += "最大HP=" + Player.hp.toString(10);
    message += ",&nbsp;武器力=" + Player.wp.toString(10);
    message += ",&nbsp;攻速=" + Player.speed.toString(10) + "%";
    message += ",&nbsp;crit率=" + Player.critRate.toString(10) + "%";
    message += ",&nbsp;critダメージ=" + Player.critDam.toString(10) + "%";
    message += ",&nbsp;貫通率=" + Player.wpPene.toString(10) + "%";
    message += ",&nbsp;アーマー値" +Player.armor.toString(10);
    message += "<br>" + name2 + ":&nbsp;最大HP=" + Enemy.hp.toString(10);
    message += ",&nbsp;武器力=" + Enemy.wp.toString(10);
    message += ",&nbsp;攻速=" + Enemy.speed.toString(10) + "%";
    message += ",&nbsp;crit率=" + Enemy.critRate.toString(10) + "%";
    message += ",&nbsp;critダメージ=" + Enemy.critDam.toString(10) + "%";
    message += ",&nbsp;貫通率=" + Enemy.wpPene.toString(10) + "%";
    message += ",&nbsp;アーマー値" +Enemy.armor.toString(10);
    document.getElementById("fiststatus").innerHTML = message;
    //-------------------------------------------------------
    
    // テーブル作成 ヒーローの名前表示
    displayOn("Fisticuffs");
    var parentnode = document.getElementById("FistTable");
    parentnode.innerHTML = "";
    var trnode = document.createElement("tr");
    var tdnode = document.createElement("td");
    tdnode.innerHTML = "";
    parentnode.appendChild(trnode);
    trnode.appendChild(tdnode);
    tdnode = document.createElement("td");
    tdnode.innerHTML = name1;
    trnode.appendChild(tdnode);
    tdnode = document.createElement("td");
    tdnode.innerHTML = name2;
    trnode.appendChild(tdnode);
    
    var sumDamage = [0,0];
    var critHit = 0;
    Player.remain = Player.hp;
    Enemy.remain = Enemy.hp;
    
    var secpAtk = [0,0];  // 攻撃のインターバル
    var numatk = [0,0];   // 攻撃回数
    var nextatktime = [0,0]; // 次に攻撃する時間
    var lastTS = [-100,-100];
    secpAtk[0] = 1 / (Player.speed / 100);
    secpAtk[1] = 1 / (Enemy.speed / 100);
    
    while (Player.remain > 0 && Enemy.remain > 0){  // どちらかの体力が尽きるまで
	var atacker;  // 攻撃側
	var atk;     
	var defender; // 防御側
	var def;
	var damage;
	var text = ["", ""];
	// 攻撃側を決定 ----------------------------------
	if (nextatktime[0] == nextatktime[1]){  // 攻撃するタイミングが同時なら 
	    atacker = Player;    // 先にPlayerが攻撃側
	    atk = 0;
	    defender = Enemy;
	    def = 1;
	}
	else if(nextatktime[0] < nextatktime[1]){  // 次の攻撃時間が先のほうが攻撃側
	    atacker = Player;
	    atk = 0;
	    defender = Enemy;
	    def = 1;
	}
	else{
	    atacker = Enemy;
	    atk = 1;
	    defender = Player;
	    def = 0;
	}
	//---------------------------------------------

	var wp = atacker.wp;
	var armor = defender.armor;
	var critHit = 0;
	
	var rand = Math.random();   // クリティカル判定に使う乱数
	// クリティカル判定に使う乱数
	if(rand < atacker.critRate/100){
	    critHit = 1;
	    text[atk] += "Crit,&nbsp;";
	}
	// ブレーキングポイント処理
	if(atacker.BPflg){
	    var BPstack = calcBPstack(atacker, sumDamage[atk]);
	    wp += BPstack * BPamp;
	    text[atk] += "ブ:" + BPstack.toString(10) + ",&nbsp;";
	}
	// ボーンソー処理
	if(atacker.BSflg){
	    var BSstack = numatk[atk];
	    if(numatk[atk] > maxBSstack){
		BSstack = maxBSstack;
	    }
	    armor = armor * (1 - BSstack*BSsharp);
	    text[atk] += "ボ:" + BSstack.toString(10) + ",&nbsp;";
	}
	
	damage = ApplyDamageEquation(wp, atacker.wpPene, armor);
	damage += damage * (atacker.critDam/100 - 1) * critHit;
	if(Player.name == "Balon"){
	    damage *= 1.3;
	}
	// テンションボウ追加ダメージ判定
	if(nextatktime[atk]-lastTS[atk] >= 6 && atacker.TSflg == 1){
	    damage += ApplyDamageEquation(180, atacker.wpPene, armor);
	    lastTS[atk] = nextatktime[atk];
	    text[atk] += "テ&nbsp;";
	}
	text[def] += "<div align\"right\">" + damage.toFixed(0).toString(10) + "ダメージ</div>";
	sumDamage[atk] += damage;
	// ダメージ吸収による回復
	var heal;
	heal = damage * atacker.absorb / 100;
	// 蛇仮面を装備している場合
	if (atacker.snakeflg){
	    var charge = damage;
	    if (atacker.snakecharge < damage){
		charge = atacker.snakecharge;
	    }
	    heal += charge * SnakeAbsorb / 100;   // 25%の体力吸収
	}
	text[atk] += "<div align=\"right\">";
	if (defender.PNflg && numatk[def] >= 3){
	    heal = Math.floor(heal / 3 * 2 * 10) / 10;
	    text[atk] += "致命傷,";
	}
	    
	text[atk] += heal.toFixed(0).toString(10) + "回復</div>";

	// 残り体力,次の攻撃時間の計算
	var explain;
	switch(atk){
	case 0:  // Playerがatackerの場合
	    explain = name1 + " の攻撃<br>";
	    Player.remain += heal;
	    if (Player.remain > Player.hp){
		Player.remain = Player.hp;
	    }
	    Player.snakecharge -= damage;
	    if(Player.snakecharge < 0){
		Player.snakecharge = 0;
	    }
	    Player.snakecharge += secpAtk[0] * SnakeChargePS;
	    if(Player.snakecharge > maxSnakeCharge){
		Player.snakecharge = maxSnakeCharge;
	    }
	    Enemy.remain -= damage;
	    break;
	case 1:  // Enemyがatackerの場合
	    explain = name2 + " の攻撃<br>";
	    Enemy.remain += heal;
	    if(Enemy.remain > Enemy.hp){
		Enemy.remain = Enemy.hp;
	    }
	    Enemy.snakecharge -= damage;
	    if(Enemy.snakecharge < 0){
		Enemy.snakecharge = 0;
	    }
	    Enemy.snakecharge += secpAtk[1] * SnakeChargePS;
	    if (Enemy.snakecharge > maxSnakeCharge){
		Enemy.snakecharge = maxSnakeCharge;
	    }
	    Player.remain -= damage;
	    break;
	default:
	    break;
	}
	
	text[0] += "[残りＨＰ: " + Player.remain.toFixed(0).toString(10) + "]";
	text[1] += "[残りＨＰ: " + Enemy.remain.toFixed(0).toString(10) + "]";
	explain += nextatktime[atk].toFixed(2).toString(10) + "秒経過";
	nextatktime[atk] += secpAtk[atk];
	numatk[atk] += 1;
	
	// ダメージ表示
	var tablenode = document.getElementById("FistTable");
	var trnode = document.createElement("tr");
	tablenode.appendChild(trnode);
	var tdnode0 = document.createElement("td");
	tdnode0.innerHTML = explain;
	trnode.appendChild(tdnode0);
	var tdnode1 = document.createElement("td");
	tdnode1.innerHTML = text[0];
	trnode.appendChild(tdnode1);
	var tdnode2 = document.createElement("td");
	tdnode2.innerHTML = text[1];
	trnode.appendChild(tdnode2);
    }
}
