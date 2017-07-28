// input タグを追加する
function addInput(parentnode, type, id, min, max, value){
    var input = document.createElement("input");
    input.type = type;
    input.id= id;
    input.value = value;
    input.min = min;
    input.max = max;
    parentnode.appendChild(input);
}

// option を一つ追加する
function addOption(parentnode, value, text){
    var option = document.createElement("option");
    option.value = value;
    option.text = text;
    parentnode.appendChild(option);
}

// selectタグの選択肢を追加していく関数(カテゴリーレベル)
function makeOption(parentnode, category){
    for (var name in category){
	addOption(parentnode, name, category[name]);
    }
}

// カテゴリーを追加していく関数
function addCategory(parentnode, category, label){
    var c = document.createElement("optgroup");
    c.label = label;
    parentnode.appendChild(c);
    makeOption(parentnode, category);
}

// ページが開かれた時の最初の処理
onload = function(){
    // ヒーロー選択の選択肢を追加
    for (var i = 1; i <= 2; i++){
	var id = "hero_select" + i.toString(10);
	var hero = document.getElementById(id);

	if (hero == null){
	    break;
	}
	// キャリーのカテゴリー
	addCategory(hero, carry, "キャリー");
	// キャプテンのカテゴリー
	addCategory(hero, captain, "キャプテン");
	// ジャングラーのカテゴリー
	addCategory(hero, jungler, "ジャングラー");
    }

    // アイテム選択の選択肢を追加
    for(var i = 1; i <= 2; i++){
	for (var j = 1; j <= 6; j++){
	    var id;
	    // idを格納
	    if(i == 1){
		id = "PE" + j.toString(10);
	    }else {
		id = "EE" + j.toString(10);
	    }
	    var item = document.getElementById(id);
	    if(item == null){
		break;
	    }
	    var option = document.createElement("option");
	    option.text = "アイテムを選択";
	    item.appendChild(option);
	    // 武器カテゴリ
	    addCategory(item, weapon, "武器");
	    // クリスタルカテゴリ
	    addCategory(item, crystal, "クリスタル");
	    // 防具カテゴリ
	    addCategory(item, defence, "防具");
	    // 実用カテゴリ
	    addCategory(item, practice, "実用");
	}
    }

    // 計算の種類を選択
    var node = document.getElementById("calculation");
    addOption(node, "", "選択してください");
    addOption(node, "sum", "n秒間合計ダメージ");
    addOption(node, "skill", "スキルダメージ");
    addOption(node, "fisticuffs", "キャリー殴り合い");
}
