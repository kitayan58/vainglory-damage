// 龍の目のスタックによるダメージ増加計算
function DragonEyeStack(Player){
    cp = Player.cp;
    if (Player.deflg){
	var element = document.getElementById("DEstack");
	var stack = element.value;
	var cp = Player.cp + stack * 20;
	var messageElement = document.getElementById("DEmessage");
	var message = "龍の目: " + stack.toString(10) + "スタック";
	messageElement.innerHTML = message;
    }
    return cp;
}

// 元ダメージ・貫通率・防御力をダメージ計算式に適用
function ApplyDamageEquation(dam, pene, defence){
    if(pene > 100){
	pene = 100;
    }
    //    var damage = dam*pene/100 + dam*(1-pene/100)/(1+defence/100);
    var damage = dam / (1 + defence*(1-pene/100) / 100);

    return damage;
}

// スキルダメージの計算
function calcSkillDamage(Player, Enemy, skill, skillLevel){
    var numeffect = skill.effect.length;
    var effectDamage = [];
    var defence;
    var penetrate;
    var addhp = Player.hp - Player.nathp;
    var clystalPower = DragonEyeStack(Player);

    // スペルファイアのダメージ表示
    if(Player.SFflg){
	var node = document.getElementById("SF");
	displayInline("SF");
	var SFdamage = ApplyDamageEquation(clystalPower, Player.cpPene, Enemy.shield);
	node.innerHTML = "スペルファイア<br>ダメージ:&emsp;" + SFdamage.toFixed(1).toString(10) + "ダメージ";
    }
    else{
	displayOff("SF");
	document.getElementById("SF").innerHTML = "";
    }
    
    // 効果ごとのダメージ・回復の数値を計算
    for(var i = 0; i < numeffect; i++){
	var effect = skill.effect[i];
	if (effect.normalattack == 0){
	    var cp = clystalPower * effect.cp / 100;
	    var wp = (Player.wp - Player.natwp) * effect.wp / 100;
	    var cpPene = Player.cpPene + effect.cpPene[skillLevel-1];
	    var wpPene = Player.wpPene + effect.wpPene[skillLevel-1];
	    // スキルが武器ダメージならdefenceをアーマー値に, クリスタルダメージならシールド値に設定
	    if (effect.wpDam == 0){
		// defence = Enemy.shield;
		// penetrate = cpPene;
		cp += effect.val[skillLevel-1];
	    }else{
		// defence = Enemy.armor;
		// penetrate = wpPene;
		wp += effect.val[skillLevel-1];
	    }
	    //------------------------------------------------------
	    if(effect.DamOrHeal == 0 || effect.DamOrHeal == 2){ // ダメージスキルなら
		// 基本ダメージ
		// var damage = ApplyDamageEquation(effect.val[skillLevel-1],penetrate,defence);
		// 追加クリスタルダメージ
		var cpdamage = ApplyDamageEquation(cp,cpPene,Enemy.shield);
		// cpdamage = BrokenMythDamage(Player, cpdamage);
		// 追加武器ダメージ
		var wpdamage = ApplyDamageEquation(wp,wpPene,Enemy.armor);
		effectDamage[i] = cpdamage + wpdamage;
	    }
	    else{ 	// 回復スキルなら
		var heal;
		heal = (addhp*effect.addhp[skillLevel-1]/100) + cp + wp;
		effectDamage[i] = heal;
	    }
	}
	else if(effect.normalattack == 1){		// 基本攻撃であれば
	    effectDamage[i] = calcDamage(Player, Enemy);
	}
	
	// 特殊ダメージの計算-----------------------------------------------
	switch(effect.name){
	case "追加ダメ/スタック": // アルファのコア・チャージ
	    effectDamage[i] = effectDamage[0] * effect.addDamage[skillLevel-1]/100/*%*/;
	    break;
	case "流血バースト":		// フォートレスの流血バースト
	    var ratio = [8.0,10.0,12.0,14.0,18.0];
	    var hpratio = ratio[skillLevel-1]/100.0 + Player.cp*0.05/100;
	    var cp = Enemy.hp * hpratio;
	    effectDamage[i] = ApplyDamageEquation(cp,Player.cpPene,Enemy.shield);
	    //effectDamage[i] = BrokenMythDamage(Player, effectDamage[i]);
	    break;
	case "クリティカル攻撃":　　// グレイブのツイストストローク
	    effectDamage[i] = calcDamage(Player, Enemy) * Player.critDam/100;
	    break;
	case "薙ぎ払いダメージ":  // グレイヴのツイストストローク
	    var ratio = [30,35,40,45,65];
	    effectDamage[i] = calcDamage(Player, Enemy) * Player.critDam * ratio[skillLevel-1]/100/100;
	    break;
	case "応報ダメージ":  // グレースの祝福
	    var max = 108;
	    var min = 20;
	    var gracedam = Math.floor(((max*(Player.level-1)/11) + min*((12-Player.level)/11)) * 10) / 10;
	    var wp = Player.wp * 1.2 + gracedam;
	    effectDamage[i] = ApplyDamageEquation(wp, Player.wpPene, Enemy.armor);
	    break;
	case "ジャンプ周辺ダメ": // ジュールのロケットリープ
	    effectDamage[i] = effectDamage[0] * 0.33;
	    break;
	case "グリマー初撃":  // ケストレルのグリマーショット
	    var ratio = [100,105,110,115,130];
	    effectDamage[i] = calcDamage(Player,Enemy) * ratio[skillLevel-1]/100;
	    break;
	case "基本攻撃ダメージ": // クラルの死者の追求
	    effectDamage[i] = calcDamage(Player,Enemy);
	    break;
	case "ダメージ(スタックMAX)": // クラルの亡者の鉄槌
	    effectDamage[i] = effectDamage[0] + effectDamage[1]*8;
	    break;
	case "回復(スタックMAX)": // クラルの亡者の鉄槌
	    effectDamage[i] = effectDamage[3] + effectDamage[4]*8;
	    break;
	case "足止め持続時間": // ランスの刺突
	    if (effectDamage[i] > 1.6){
		effectDamage[i] = 1.6;
	    }
	    break;
	case "スタン持続時間": // ランスのガイシアの壁
	    if(effectDamage[i] > 1.4){
		effectDamage[i] = 1.4;
	    }
	    break;
	    // オゾスキルアクロバウンス
	case "2段着地ダメージ":
	    effectDamage[i] = effectDamage[2] + effectDamage[1];
	    // + ApplyDamageEquation(100,Player.cpPene,Enemy.shield)
	    // + ApplyDamageEquation(Player.cp*0.35,Player.cpPene,Enemy.shield);
	    break;
	case "3段着地ダメージ":
	    effectDamage[i] = effectDamage[2] + effectDamage[1]*2;
	    break;
	case "3段ジャンプ合計":
	    effectDamage[i] = effectDamage[0] * 2 + effectDamage[4];
	    break;
	    //-------------------
	    
	case "追加ダメ/ブラッドレイジ":  // ロナの分断の斧
	    effectDamage[i] = effectDamage[3] * 0.01;
	    break;
	case "ロック中毎秒ダメージ":   // スカイのフォワード・バラージ
	    effectDamage[i] = effectDamage[0] * (1.1+Player.cp*0.2/100);
	    break;
	case "基本攻撃ダメージ(2回)":  // ヴォックスのソニックズーム
	    var ratio = [0.5,0.5,0.5,0.5,0.6];
	    effectDamage[i] = calcDamage(Player,Enemy) * ratio[skillLevel-1];
	    break;
	    
	default:
	    break;
	}
	//-----------------------------------------------------
    }
    
    
    return effectDamage;
}
//--------------------------------

// スキルのクールダウンの計算(小数第一位)
function writeCooldown(Player, skill, skillLevel){
    cooldown = skill.cooldown[skillLevel-1] / (1+Player.cooldown/100);
    cooldown = Math.floor(cooldown*10) / 10;
    
    return cooldown;
}
//-------------------------------

// 効果・ダメージ表示
function writeDamage(Player, Enemy, skill, damage, initial, skillLevel){
    var Enode = document.getElementById(initial+"effect");
    var Dnode = document.getElementById(initial+"damage");
    var effect;
    var Dstring = "";
    var Estring = "";
    var lastString = "";
    var ASdamage = 0;
    
    // ダメージの表示
    for(var i=0; i < damage.length; i++){
	if (i == 0){
	    Dstring += "<div align=\"right\">";
	    Estring += "<center>";
	}else{
	    Dstring += "<br>";
	    Estring += "<br>";
	}
	effect = skill.effect[i];
	
	Dstring += "<font"
	
	// ダメージか回復かで表示を変える-------
	if(effect.DamOrHeal == 0 || effect.DamOrHeal == 2){
	    lastString = "ダメージ";
	    // 武器ダメージかクリスタルダメージかでダメージの色を変える
	    if(effect.wpDam == 1 || effect.normalattack == 1){
		Dstring += " color=\"red\"";
	    }else{
		Dstring += " color=\"blue\"";
	    }
	}else if(effect.DamOrHeal == 1){
	    lastString = "回復";
	}else{
	    lastString = "";
	}
	//---------------------------
	
	Dstring += ">";
	
	if(effect.duration[skillLevel-1] > 0){		// ダメージが継続ダメージなら
	    var sumdamage = damage[i] * effect.duration[skillLevel-1];
	    sumdamage = sumdamage.toFixed(1);
	    Dstring += damage[i].toFixed(1).toString(10)+"</font> × "+effect.duration[skillLevel-1].toString(10)+" = "+sumdamage.toString(10) + lastString; 
	}else{
	    Dstring += damage[i].toFixed(1).toString(10) + "</font>" + lastString;
	}
	Estring += effect.name;
	/*
	// スキルが基本攻撃のnn場合にアフターショックのダメージを適用する
	if(effect.normalattack == 1 && Player.ASflg == 1){
	var hp = Enemy.hp;
	ASdamage = ApplyDamageEquation(hp*0.15, Player.cpPene, Enemy.shield);
	Estring += "<br>アフターショックダメージ";
	Dstring += "<br><font color=\"blue\">" + ASdamage.toFixed(1).toString(10)+ "</font>ダメージ";
	Estring += "<br>アフターショック回復";
	var heal = ASdamage/2;
	Dstring += "<br>" + heal.toFixed(1).toString(10) + "回復";
	}*/
    }
    
    // 合計ダメージの計算
    var counter = 0;
    var sum = ASdamage;
    for(var i = 0; i < skill.effect.length; i++){
	effect = skill.effect[i];
	if(effect.DamOrHeal == 0){  // ダメージスキルなら
	    if(effect.duration[skillLevel-1] > 0){
		sum += Math.floor(damage[i] * effect.duration[skillLevel-1] * 10) / 10;
	    }else{
		sum += damage[i];
	    }
	    counter += 1;
	}
    }
    if(counter > 1){		// ダメージ効果が2つ以上なら
	Estring += "<br>合計";
	Dstring += "<br>" + sum.toFixed(1).toString(10) + "ダメージ";
    }
    Estring += "</center>";
    Dstring += "</div>";
    Enode.innerHTML = Estring;
    Dnode.innerHTML = Dstring;
}


// スキル詳細表示
function skillDamage(Player, Enemy){
    // ヒーローのステータスを表示-------------------------------------
    var message = "";
    message = "攻撃側:&emsp;";
    message += "武器力=" + Player.wp.toString(10);
    message += ",&emsp;追加武器力=" + (Player.wp-Player.natwp).toString(10);
    message += ",&emsp;クリスタル=" + Player.cp.toString(10);
    message += ",&emsp;wp貫通率=" + Player.wpPene.toString(10) + "%";
    message += ",&emsp;cp貫通率=" + Player.cpPene.toString(10) + "%";
    message += ",&emsp;CD加速=" + Player.cooldown.toString(10) + "%";
    message += "<br>防御側: &emsp;最大体力=" + Enemy.hp.toString(10);
    message += ",&emsp;アーマー値=" + Enemy.armor.toString(10);
    message += ",&emsp;シールド値=" + Enemy.shield.toString(10) + "<br>";
    document.getElementById("skill1").innerHTML = message;
    // ----------------------------------------------------
    
    // ブロークンミスのスタック数表示 -------------------------
    if (Player.BMflg){
	var BMnode = document.getElementById("BMmessage");
	var node2 = document.getElementById("BMstack");
	BMnode.innerHTML = "ブロークンミススタック:&emsp;" + node2.value.toString(10);
    }
    // --------------------------------------------------
    
    // スキル名表示-------------------------------------
    aname = "<center>Aスキル<br>"+Player.Askill.name+"</center>";
    bname = "<center>Bスキル<br>"+Player.Bskill.name+"</center>";
    ultname = "<center>ULT<br>"+Player.ult.name+"</center>";
    document.getElementById("Aname").innerHTML = aname;
    document.getElementById("Bname").innerHTML = bname;
    document.getElementById("ULTname").innerHTML = ultname;
    //------------------------------------------------

    // スキルレベル変更
    showLevel("AL", "ALM");
    showLevel("BL", "BLM");
    showLevel("ULTL", "ULTLM");
    
    // スキルダメージ、クールダウン計算
    var Alevel = document.getElementById("AL").value;
    var Blevel = document.getElementById("BL").value;
    var ULTlevel = document.getElementById("ULTL").value;
    var adamage = calcSkillDamage(Player, Enemy, Player.Askill, Alevel);
    var bdamage = calcSkillDamage(Player, Enemy, Player.Bskill, Blevel);
    var ultdamage = calcSkillDamage(Player, Enemy, Player.ult, ULTlevel);
    var acool = writeCooldown(Player, Player.Askill, Alevel);
    var bcool = writeCooldown(Player, Player.Bskill, Blevel);
    var ultcool = writeCooldown(Player, Player.ult, ULTlevel);
    document.getElementById("Acooldown").innerHTML = "<div align=\"right\">"+acool.toString(10)+"秒</div>";
    document.getElementById("Bcooldown").innerHTML = "<div align=\"right\">"+bcool.toString(10)+"秒</div>";
    document.getElementById("ULTcooldown").innerHTML = "<div align=\"right\">"+ultcool.toString(10)+"秒</div>";
    writeDamage(Player, Enemy, Player.Askill, adamage, "A", Alevel);
    writeDamage(Player, Enemy, Player.Bskill, bdamage, "B", Blevel);
    writeDamage(Player, Enemy, Player.ult, ultdamage, "ULT", ULTlevel);
    // --------------------------------------------------------
}
