var FormEQ = document.getElementsByName('EQ');

var eqTag = ['eq1', 'eq2', 'eq3', 'eq4', 'eq5', 'eq6'];
var itemTag = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'];

var eqBox = {
    'weapon' : '武器',
    'crystal' : 'クリスタル',
    'protect' : '防具',
    'practical' : '実用',
};

var weapon = {
    'salow' : 'サロウブレード',
    'snake' : '蛇仮面',
    'breaking' : 'ブレーキングポイント',
    'tension' : 'テンションボウ',
    'bonesaw' : 'ボーンソー',
    'tornado' : 'トルネードトリガー',
    'monocle' : 'タイランツモノクル',
}

var crystal = {
    'shutter' : 'シャターグラス',
    'broken' : 'ブロークンミス',
    'frost' : 'フロストバーン',
    'eve' : 'イーブオブハーベスト',
    'clock' : 'クロックワーク',
    'shock' : 'アフターショック',
    'current' : 'オルターカレント',
}

var protect = {
    'clusible' : 'クルーシブル',
    'fountain' : '再生の泉',
    'aegis' : 'イージス',
    'jacket' : 'メタルジャケット',
    'atlas' : 'アトラスの肩甲',
}

var practical = {
    'journey' : 'ジャーニーブーツ',
    'tread' : 'ウォートレッド',
    'halcyon' : 'ハルシオンチャージ',
    'karakuri' : 'カラクリ',
    'crown' : 'ストームクラウン',
    'steal' : 'シバースチール',
}

var exitem = {
    'infwp' : 'ウェポンインフュージョン',
    'infcp' : 'クリスタルインフュージョン',
}


for(var i = 0; i < 6; i++){
    var ul = document.createElement('ul');
    //document.write(FormEQ.item(0));
    FormEQ.item(0).appendChild(ul);
    var li = document.createElement('li');
    li.setAttribute('class', eqTag[i]);
    ul.appendChild(li);
    var label = document.createElement('label');
    label.setAttribute('for', eqTag[i]);
    label.innerHTML = "装備"+(i+1);
    li.appendChild(label);
    var selecteq = document.createElement('select');
    selecteq.name = eqTag[i];
    li.appendChild(selecteq);
    var temp = document.createElement('option');
    temp.innerHTML = "種類を選択";
    selecteq.appendChild(temp);
    for(var j in eqBox){
	var option = document.createElement('option');
	option.setAttribute('value', j);
	option.innerHTML = eqBox[j];
	selecteq.appendChild(option);
    }
    var selectItem = document.createElement('select');
    selectItem.name = itemTag[i];
    li.appendChild(selectItem);
    var selindex = selecteq.selectedIndex;
    var eqKind;
    selecteq.onchange = function(){
	var selindex = this.options[this.selectedIndex];
	var target_node = this.nextSibling;
	//alert(target_node.name);
	switch(selindex.value){
	case 'weapon':
	    eqKind = weapon;
	    break;
	case 'crystal':
	    eqKind = crystal;
	    break;
	case 'protect':
	    eqKind = protect;
	    break;
	case 'practical':
	    eqKind = practical;
	    break;
	}
	// 子ノードを全削除
	var child;
	while(child = target_node.lastChild){
	    target_node.removeChild(child);
	}
	// 新たな子ノードを追加
	for(var j in eqKind){
	    var option = document.createElement('option');
	    option.setAttribute('value', j);
	    option.innerHTML = eqKind[j];
	    target_node.appendChild(option);
	}
    }
}
