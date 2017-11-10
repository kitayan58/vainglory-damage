// ヒーローの基本ステータスを設定
var hero = function(name, hplv1, hplv12, wplv1, wplv12, speed1, speed12, armor1, armor12, shield1, shield12, melee){

    this.name = name;
    this.level = 0;

    // lv1とlv12のステータスを計算
    // そこから全レベルのステータスを計算可能
    this.hplv1 = hplv1;
    this.hplv12 = hplv12;
    this.wplv1 = wplv1;
    this.wplv12 = wplv12;
    this.speed1 = speed1;
    this.speed12 = speed12;
    this.armor1 = armor1;
    this.armor12 = armor12;
    this.shield1 = shield1;
    this.shield12 = shield12;
    
    this.nathp = 0; 	// 素のHP
    this.hp = 0;
    this.remain = 0;  // 残り体力
    this.natwp = 0;
    this.wp = 0;
    this.cp = 0;
    this.speed = 0;
    this.armor = 0;
    this.shield = 0;
    this.critDam = 150;
    this.critRate = 0;
    this.cooldown = 0;
    this.wpPene = 0;
    this.cpPene = 0;
    this.wpAmp = 0;
    this.cpAmp = 0;
    this.snakeflag = 0;  // 蛇仮面を持っているかどうか
    this.snakecharge = 1200; // 蛇仮面のチャージ量
    this.absorb = 0; // 体力吸収%
    this.BPflg = 0;	// ブレーキングポイントを持っているかどうか
    this.BSflg = 0;	// ボーンソーを ・・
    this.PNflg = 0;    // ポイズンナイフを・・・
    this.TSflg = 0; // テンションボウ ・・
    this.ASflg = 0; // アフターショックを ・・
    this.SFflg = 0; // スペルファイアを・・
    this.deflg = 0; // 龍の目を・・
    // メレーかどうか(1:メレー, 0:レンジ)
    this.melee = melee;
    this.cost = 0;  // 装備コスト
		
    this.Askill;
    this.Bskill;
    this.ult;
};

// レベルの表示
function showLevel(inputid, messeid){
    document.getElementById(messeid).innerHTML = document.getElementById(inputid).value;
}

// 選択されたヒーローを設定
function HeroSelect(kind){
    var Hero;
    switch(kind){
    case "Adagio":
	Hero = new hero(kind,685,2308,75,117,100,122,20,50,20,50,0);
	Hero.Askill = new skill("炎の賜物", 5, [10,9.5,9,8.5,8], 
				["炎ダメージ",0,20,30,40,50,70,0,20],
				["バースト回復",1,40,60,80,100,140,0,30],
				["毎秒回復",1,15,20,25,30,35,0,10]);
	Hero.Askill.effect[0].duration = [5,5.5,6,6.5,7];
	Hero.Askill.effect[1].addhp = [12,12,12,12,12];
	Hero.Askill.effect[2].duration = [3,3,3,3,3];
	Hero.Bskill = new skill("怒りの使者",5,[10,10,10,10,10],
				["ダメージ",0,20,40,60,80,120,0,40],
				["秘術の炎ボーナス",0,5,15,25,35,55,0,40],
				["自己ボーナス",0,5,10,15,20,30,0,20]);
	Hero.ult = new skill("裁きの詩", 3,[100,80,60],
			     ["ダメージ",0,500,900,1300,0,100]);
	break;
    case "Alpha":
	Hero = new hero(kind,761,2493,83,124,100,122,20,60,20,60,1);
	Hero.Askill = new skill("スキャン・ラッシュ",5,[11,10,9,8,7],
				["ダメージ",0,80,100,120,140,160,80,200],
				["ダメージ/スタック",0,40,60,80,100,120,40,40]);
	Hero.Askill.effect[1].maxstack = 3;
	Hero.Bskill = new skill("コア・チャージ",5,[6,5.5,5,4.5,4],
				["ダメージ",0,20,35,50,65,80,110,100],
				["基本攻撃",0,0,0,0],
				["回復/スタック",1,9,10,11,12,14,3,0],
				["追加ダメ/スタック",2,0,0,0,0,0,0,0]);
	Hero.Bskill.effect[1].normalattack = 1;
	Hero.Bskill.effect[2].maxstack = 3;
	Hero.Bskill.effect[3].addDamage = [12,12,12,12,18];
	Hero.ult = new skill("ファイナル・プロトコル",3,[75,65,55],
			     ["ダメージ",0,529,933,1337,0,250]);
	break;
    case "Ardan":
	Hero = new hero(kind,838,2738,80,40,100,136.3,20,70,20,70,1);
	Hero.Askill = new skill("ヴァンガード",5,[13,13,13,13,13],
				["ダメージ",0,50,100,150,200,250,0,120],
				["バリア",3,80,120,160,200,240,0,0]);
	Hero.Askill.effect[1].addhp = [30,30,30,30,30];
	Hero.Bskill = new skill("血には血を",5,[20,20,20,20,20],
				["基本攻撃",0,0,100,0],
				["ダメージ", 0,40,90,140,190,240,0,70]);
	Hero.Bskill.effect[0].normalattack = 1;
	Hero.Bskill.effect[1].addDamage = [0,0,0,0,25];
	Hero.ult = new skill("ガントレット", 3,[100,90,80],
			     ["ダメージ",0,250,375,500,0,350]);
	break;
    case "Baptiste":
	Hero = new hero(kind,739,2323,78,167,100,136.3,20,60,20,60,1);
	Hero.Askill = new skill("バッド・モジョ", 5,[4,3.8,3.6,3.4,3],
				["ダメージ",0,80,120,160,200,280,0,105],
				["範囲ダメージ",0,40,60,80,100,140,0,55]);
	Hero.Bskill = new skill("ソウル・プリズン",5,[16,15,14,13,12],
				["ダメージ",0,45,75,105,135,195,0,45],
				["拘束破断ダメージ",0,60,100,140,180,260,0,60]);
	Hero.ult = new skill("恐怖の亡霊",3,[80,65,50],
			     ["毎秒ダメージ", 0,100,125,150,0,65]);
	Hero.ult.effect[0].duration = [1,1.3,1.6];
	break;
    case "Balon": // バロン
	Hero = new hero(kind,679,2054,71,108,100/1.6,122/1.6,20,50,20,50,0);
	Hero.Askill = new skill("ヤマアラシ迫撃砲",5,[5,5,5,5,5],
				["ダメージ",0,40,120,200,280,360,70,190]);
	Hero.Bskill = new skill("ジャンプジェット",5,[22,20,18,16,12],
				["連続攻撃", 0,0,100,0],
				["速度ブースト",3,0.8,1,1.2,1.4,1.8,0.1,0]);
	Hero.Bskill.effect[0].duration = 2;
	Hero.Bskill.effect[0].normalattack = 1;
	Hero.ult = new skill("荷電粒子砲", 3,[90,75,60],
			     ["ダメージ", 0,400,650,900,120,225]);
	break;
    case "Black Feather":  // ブラックフェザー
	Hero = new hero(kind,737,2387,81,160,100,122,20,50,20,50,1);
	Hero.Askill = new skill("フェイント・ハート",5,[8,7.5,7,6.5,6],
				["ダメージ",0,10,20,30,40,50,0,50],
				["基本攻撃",0,0,0,0]);
	Hero.Askill.effect[0].physicLoss = [11,12,13,14,16]; //+Player.wp*0.2
	Hero.Askill.effect[1].normalattack = 1;
	Hero.Bskill = new skill("オン・ポイント",5,[6,5.5,5,4.5,3.5],
				["ダメージ",0,80,120,160,200,240,100,180]);
	Hero.ult = new skill("薔薇の革命",3,[40,30,20],
			     ["ダメージ", 0,50,100,150,0,50]);
	break;
    case "Catherine":
	Hero = new hero(kind,808,2673,74,141,100,136.3,20,60,20,60,1);
	Hero.Askill = new skill("容赦なき追跡",5,[14,13.5,13,12.5,12],
				["基本攻撃",0,0,100,0],
				["ボーナスダメージ",0,35,60,85,110,135,0,100]);
	Hero.Askill.effect[0].normalattack = 1;
	Hero.Bskill = new skill("ストームガード",5,[7,6.5,6,5.5,5],
				["毎秒ダメージ",0,40,60,80,100,120,0,50]);
	Hero.Bskill.effect[0].duration = 4;
	Hero.ult = new skill("ブラスト・トレマー",3,[100,85,70],
			     ["ダメージ",0,350,500,650,0,130]);
	break;
    case "Celeste":
	Hero = new hero(kind,649,2028,10,10,100,125,20,50,20,50,0);
	Hero.Askill = new skill("ヘリオジェネシス",5,[2.8,2.4,2,1.6,1.2],
				["ダメージ",0,80,135,190,245,300,0,90],
				["ノヴァダメージ",2,130,185,240,295,350,0,220])
	Hero.Bskill = new skill("コア崩壊",5,[14,13,12,11,9],
				["ダメージ",0,100,175,250,325,475,0,40]);
	Hero.ult = new skill("ソーラーストーム", 3,[70,65,60],
			     ["先導星ダメージ",0,300,325,350,0,100],
			     ["星ダメージ",0,150,160,170,0,20]);
	Hero.ult.effect[1].duration = [3,5,7];
	break;
    case "ChurnWalker":
	Hero = new hero(kind,863,2749,80,165,100,122,20,70,20,70,1);
	Hero.Askill = new skill("チェーンフック", 5,[4,4,4,4,3],
				["ダメージ", 0,80,115,150,185,220,0,50]);
	Hero.Bskill = new skill("ペイン",5,[8,8,8,8,8],
				["ダメージ", 0,40,80,120,160,240,0,1]);
	Hero.ult = new skill("トレスパス",3,[50,40,30],
			     ["ダメージ", 0,200,350,500,0,1]);
	break;
    case "Flicker":
	Hero = new hero(kind,797,2648,77,155,100,136.3,20,70,20,70,1);
	Hero.Askill = new skill("フェアリーリング",5,[6,5.5,5,4.5,4],
				["毎秒ダメージ",0,80,160,240,320,400,0,25]);
	Hero.Askill.effect[0].duration = [2,2,2,2,2];
	Hero.Bskill = new skill("フェアリーダスト",5,[14,13,12,11,10],
				["毎秒ダメージ",0,30,60,90,120,180,0,50],
				["爆破ダメージ",0,60,120,180,240,360,0,100]);
	Hero.Bskill.effect[0].duration = [3,3,3,3,3];
	Hero.ult = new skill("月のマント",3,[105,90,75],
			     ["",3,0,0,0,0,0]);
	break;
    case "Fortress":
	Hero = new hero(kind,761,2581,73,156,100,144,20,60,20,60,1);
	Hero.Askill = new skill("牙の真実",5,[11,10,9,8,7],
				["ダメージ",0,20,60,100,140,220,0,110],
				["基本攻撃",0,0,0,0,0,0,100,0]);
	Hero.Askill.effect[1].normalattack = 1;
	Hero.Bskill = new skill("爪の掟",5,[11,10,9,8,6],
				["ダメージ",0,70,115,160,205,250,0,70],
				["毎秒流血ダメージ",0,10,10,10,10,10,0,15],
				["流血バースト",2,0,0,0,0,0,0,0]);
	Hero.ult = new skill("群れの襲撃",3,[80,70,60],
			     ["狼の攻撃ダメージ", 0,20,40,60,0,0]);
	break;
    case "Glaive":
	Hero = new hero(kind,724,2453,80,153,100,113.2,20,60,20,60,1);
	Hero.Askill = new skill("アフターバーン",5,[22,20,18,16,12],
				["基本攻撃", 0,0,0,0,0,0,0,0],
				["ダメージ",0,100,150,200,250,300,0,130]);
	Hero.Askill.effect[0].normalattack = 1;
	Hero.Bskill = new skill("ツイストストローク", 5,[12,11,10,9,8],
				["クリティカル攻撃",0,0,0,0,0,0,0,0],
				["クリスタルダメージ",0,10,20,30,40,50,0,120],
				["薙ぎ払いダメージ",2,0,0,0,0,0,0,0]);
	Hero.ult = new skill("ブラッドソング", 3,[16,16,16],
			     ["基本ダメージ", 0,100,200,300,0,110],
			     ["ダメージ/スタック",2,10,15,20,0,2]);
	break;
    case "Grace":
	Hero = new hero(kind,740,2483,73,152,100,136.3,20,60,20,60,1);
	Hero.Askill = new skill("祝福", 5,[15,14,13,12,10],
				["応報ダメージ",0,0,0,0,0,0,0,0],
				["ボーナスダメージ",0,20,40,60,80,120,40,100]);
	Hero.Bskill = new skill("ホーリー・ノヴァ", 5,[13,12,11,10,8],
				["ダメージ",0,125,200,275,350,425,0,200]);
	Hero.ult = new skill("ディヴァイン・ヒール",3,[70,60,50],
			     ["回復力", 1,500,650,800,0,200]);
	break;
    case "Grumpjaw":
	Hero = new hero(kind,783,2592,74,158,100,113.2,20,60,20,60,1);
	Hero.Askill = new skill("突進",5,[12,11,10,9,8],
				["ダメージ",0,75,125,175,225,325,0,50],
				["追加ダメ/スタ",2,10,25,40,55,85,0,10]);
	Hero.Bskill = new skill("怒飢",5,[9,9,9,9,9],
				["ダメージ", 0,30,50,70,90,110,0,80],
				["基本攻撃",0,0,0,0,0,0,0,0]);
	Hero.Bskill.effect[1].normalattack = 1;
	Hero.ult = new skill("満腹",3,[70,60,50],
			     ["ダメージ", 0,400,550,700,0,200]);
	break;
    case "Gwen":
	Hero = new hero(kind,661,2072,68,132,100,136.3,20,50,20,50,0);
	Hero.Askill = new skill("バックショット・ボナンザ",5,[12,11,10,9,5],
				["ダメージ",0,60,100,140,180,220,65,210]);
	Hero.Askill.effect[0].wpDam = 1;
	Hero.Bskill = new skill("逃げるが勝ち",5,[24,22,20,18,14],
				["速度ブースト", 3,1.2,1.4,1.6,1.8,2.2,0,0]);
	Hero.ult = new skill("エース・ハイ",3,[75,60,45],
			     ["ダメージ",0,250,400,550,100,240]);
	Hero.ult.effect[0].wpDam = 1;
	break;
    case "Idris":
	Hero = new hero(kind,697,2257,77,161,100,136.3,20,50,20,50,1);
	Hero.Askill = new skill("シュラウドステップ",5,[15,14,13,12,10],
				["バリア", 3,125,175,225,275,325,75,0]);
	Hero.Bskill = new skill("チャクラム", 5,[8,7.5,7,6.5,5],
				["ダメージ", 0,60,110,160,210,260, 90,110]);
	Hero.ult = new skill("シマーストライク", 3,[100,75,50],
			     ["ダメージ", 0,200,350,500,100,0]);
	break;
    case "Joule":
	Hero = new hero(kind,742,2487,66,148,100,113.2,20,50,20,50,1);
	Hero.Askill = new skill("ロケットリープ",5,[22,20,18,16,10],
				["中心ダメージ",0,150,200,250,300,350,0,170],
				["ジャンプ周辺ダメ",2,0,0,0,0,0,0,0]);
	Hero.Bskill = new skill("サンダーストライク",5,[2.5,2.5,2.5,2.5,2.5],
				["ダメージ(貫通有)",0,80,110,140,170,200,175,135],
				["ダメージ(貫通無)",2,80,110,140,170,200,175,135]);
	Hero.Bskill.effect[0].wpPene = [5,6,7,8,10];
	Hero.Bskill.effect[0].cpPene = [5,6,7,8,10];
	Hero.ult = new skill("ビッグレッドボタン",3,[60,50,40],
			     ["合計ダメージ",0,530,995,1460,0,300]);
	break;
    case "Kestrel":
	Hero = new hero(kind,647,2020,64,130,100,136.3,20,50,20,50,0);
	Hero.Askill = new skill("グリマーショット",5,[0,0,0,0,0],
				["グリマー初撃",0,0,0,0,0,0,0,0], // 特殊ダメージ
				["範囲ダメージ",0,30,60,90,120,150,0,140]);
	Hero.Askill.effect[0].wpDam = 1;
	Hero.Bskill = new skill("アクティブ迷彩",5,[8,8,8,8,6],
				["ステルス持続時間",4,1.5,1.5,1.5,1.5,2,0,3],
				["速度ブースト",3,1,1,1,1,1,0.2,0],
				["ダメージ",0,100,150,200,250,300,0,270]);
	Hero.ult = new skill("一矢一殺",3,[55,45,35],
			     ["ダメージ",0,450,625,800,120,260]);
	Hero.ult.effect[0].wpDam = 1;
	Hero.ult.effect[0].wpPene = [10,20,30];
	break;
    case "Koshka":
	Hero = new hero(kind,711,2367,79,164,100,108.8,20,60,20,60,1);
	Hero.Askill = new skill("パウンシー",5,[8,7.5,7,6.5,6],
				["ダメージ", 0,75,130,185,240,350,0,130]);
	Hero.Bskill = new skill("トワーリー・デス",5,[6,6,6,6,5],
				["ダメージ", 0,80,120,160,220,280,0,80],
				["ボーナスダメージ",2,35,50,65,80,110,0,120]);
	Hero.ult = new skill("ネコネコフレンジー",3,[80,65,50],
			     ["合計ダメージ",0,350,575,800,0,120]);
	break;
    case "Krul":
	Hero = new hero(kind,748,2494,77,147,100,136.3,20,60,20,60,1);
	Hero.Askill = new skill("死者の追求",5,[8,8,8,8,7],
				["基本攻撃ダメージ",0,0,0,0,0,0,0,0], // 特殊ダメージ
				["クリスタルダメ",0,5,10,15,20,25,165,70]); 
	Hero.Askill.effect[0].wpDam = 1;
	Hero.Bskill = new skill("亡者の鉄槌",5,[13,12.5,12,11.5,10],
				["ダメージ", 0,100,150,200,250,350,0,50],
				["ダメージ/スタ",2,20,35,50,65,95,0,20],
				["ダメージ(スタックMAX)",2,0,0,0,0,0,0,0], // 特殊ダメージ
				["回復",1,40,60,80,100,140,0,35],
				["回復/スタ",1,15,20,25,30,40,0,20],
				["回復(スタックMAX)",1,0,0,0,0,0,0,0])   // 特殊計算
	Hero.ult = new skill("ヘルズ・ハート", 3,[65,55,45],
			     ["ダメージ",0,350,500,650,0,100]);
	break;
    case "Lance":
	Hero = new hero(kind,742,2487,85,178,100,100,20,70,20,70,1);
	Hero.Askill = new skill("刺突",5,[12,11,10,9,7],
				["ダメージ",0,120,240,360,480,600,140,80],
				["足止め持続時間",3,1,1,1,1,1.2,0,0.2]);
	Hero.Askill.effect[0].wpDam = 1;
	Hero.Bskill = new skill("ガイシアの壁",5,[9,8.5,8,7.5,7],
				["ダメージ",0,70,105,140,175,210,100,80],
				["スタン持続時間",3,0.6,0.7,0.8,0.9,1,0,0.2]);
	Hero.Bskill.effect[0].wpDam = 1;
	Hero.ult = new skill("コンバットロール",3,[8,6,4],
			     ["基本攻撃",0,0,0,0,0,0],
			     ["ダメージ",0,150,250,350,0,60]);
	Hero.ult.effect[0].normalattack = 1;
	break;
    case "Lyra":
	Hero = new hero(kind,674,2153,10,10,100,136.3,20,50,20,50,0);
	Hero.Askill = new skill("帝国の紋章", 5,[14,12.5,11,9.5,8],
				["毎秒ダメージ",2,60,100,140,180,260,0,80],
				["毎秒回復",1,40,65,90,115,165,0,0],
				["爆破ダメージ",2,75,125,175,225,325,0,120]);
	Hero.Askill.effect[1].addhp = [13,13,13,13,13];
	Hero.Bskill = new skill("魔導結界",5,[24,22,20,18,14],
				["ダメージ",0,50,125,200,275,350,0,50]);
	Hero.ult = new skill("魔導の扉",3,[75,60,45],
			     ["なし",0,0,0,0,0,0]);
	break;
    case "Ozo":
	Hero = new hero(kind,769,2536,80,157,100,136.3,20,60,20,60,1);
	Hero.Askill = new skill("スリーリング・サーカス",5,[8,7.5,7,6.5,5],
				["各段ダメージ",0,10,20,30,40,50,0,75],
				["3段合計ダメージ",2,30,60,90,120,150,0,225],
				["対ヒーロー回復",1,20,40,60,80,100,0,15]);
	Hero.Askill.effect[0].wpDam = 1;
	Hero.Askill.effect[1].wpDam = 1;
	Hero.Bskill = new skill("アクロバウンス", 5,[10,9.5,9,8.5,7],
				["バウンスダメージ",0,60,120,180,240,300,0,70],
				["追加ダメージ/バウンス", 2,20,40,60,80,100,0,35],
				["1段着地ダメージ",2,80,160,240,320,400,0,70],
				["2段着地ダメージ",2,0,0,0,0,0,0,0],  // 特殊計算
				["3段着地ダメージ",2,0,0,0,0,600,0,70], // 特殊計算
				["3段ジャンプ合計",2,0,0,0,0,0,0,0]); // 特殊計算
	Hero.ult = new skill("バンガラング", 3,[70,55,40],
			     ["メイン標的ダメージ",2,250,400,550,0,150],
			     ["サブ標的ダメージ",2,125,200,275,0,75]);
	break;
    case "Petal":
	Hero = new hero(kind,636,1983,64,134,100,136.3,20,50,20,50,0);
	Hero.Askill = new skill("ブランブルブームの種",5,[3,3,3,3,3],
				["ペット体力",3,100,180,260,340,500,0,30],
				["ペット防御",3,30,35,40,45,50,0,5],
				["ペットダメージ",2,7,14,21,28,42,0,40],
				["種の体力",3,50,80,110,140,200,0,15],
				["ダメージ",2,75,125,175,225,275,0,100]);
	Hero.Bskill = new skill("トランポリン！",5,[10,9.5,9,8.5,7],
				["追加攻撃範囲",3,0,0.2,0.4,0.6,1.2,0,0]);
	Hero.ult = new skill("自然発火", 3,[30,25,20],
			     ["ダメージ",0,180,240,300,0,70],
			     ["回復",1,75,125,175,0,30]);
	break;
    case "Phinn":
	Hero = new hero(kind,892,2781,95,154,100,113.2,20,70,20,70,1);
	Hero.Askill = new skill("クイブル",5,[9,8,7,6,5],
				["ダメージ",0,160,270,380,490,600,0,170]);
	Hero.Bskill = new skill("ポライト・カンパニー", 5,[10,10,10,10,10],
				["ダメージ",0,60,120,180,240,360,0,120]);
	Hero.ult = new skill("フォースド・アコード",3,[75,60,45],
			     ["ダメージ",0,100,300,500,0,150]);
	break;
    case "Reim":
	Hero = new hero(kind,746,2499,80,153,100,136.3,20,60,20,60,1);
	Hero.Askill = new skill("冬の尖塔", 5,[4,3.5,3,2.5,2],
				["1段目ダメージ",0,80,120,160,200,240,0,90],
				["2段目ダメージ",0,80,120,160,200,240,0,110]);
	Hero.Bskill = new skill("凍てつく風",5,[14,13,12,11,7],
				["ダメージ",0,80,120,160,200,280,0,40],
				["足止め時間",3,0.6,0.8,1,1.2,1.4,0,0]);
	Hero.ult = new skill("ヴァルキリー",3,[80,65,50],
			     ["中心部ダメージ",2,250,375,500,0,125],
			     ["端部ダメージ",2,200,300,400,0,100]);
	break;
    case "Reza":
	Hero = new hero(kind,718,2306,84,154,100,125,20,60,20,60,1);
	Hero.Askill = new skill("スコーチャー",5,[6,5.5,5,4.5,4],
				["ダメージ",0,80,130,180,230,280,0,90]);
	Hero.Bskill = new skill("トラブルメーカー",5,[15,14,13,12,10],
				["ダメージ",0,70,100,130,160,190,0,60],
				["ボーナスダメージ",0,25,50,75,100,125,0,80]);
	Hero.ult = new skill("ネザーフォーム・デトネーター",3,[50,45,40],
			     ["ダメージ",0,250,350,450,0,50],
			     ["強化体力",3,120,220,320,0,10]);
	break;
    case "Ringo":
	Hero = new hero(kind,673,2077,66,130,100,136.3,20,50,20,50,0);
	Hero.Askill = new skill("アキレスショット",5,[9,8.5,8,7.5,7],
				["ダメージ",0,80,125,170,215,350,0,125]);
	Hero.Bskill = new skill("トワリングシルバー",5,[9,9,9,9,9],
				["基本攻撃",0,0,0,0,0,0,0,0],
				["クリスタルダメージ",0,5,5,5,5,5,0,80]);
	Hero.Bskill.effect[0].normalattack = 1;
	Hero.ult = new skill("地獄の火酒",3,[100,85,70],
			     ["ダメージ",0,250,365,480,0,75],
			     ["炎上ダメージ",0,30,50,70,0,20]);
	Hero.ult.effect[0].cpPene = [100,100,100];
	Hero.ult.effect[1].duration = [7,7,7];
	break;
    case "Rona":
	Hero = new hero(kind,778,2563,88,156,100,113.2,20,60,20,60,1);
	Hero.Askill = new skill("ケンカ上等",5,[13,12,11,10,9],
				["インパクトダメージ",0,50,70,90,110,150,0,100],
				["ラプチャーダメージ",0,100,140,180,220,300,0,200]);
	Hero.Bskill = new skill("分断の斧",5,[16,15,14,13,12],
				["基本攻撃",0,0,0,0,0,0,0,0],
				["1回目攻撃ダメージ",0,10,20,30,40,70,85,100],
				["基本攻撃",0,0,0,0,0,0,0,0],
				["2回目攻撃ダメージ",0,10,20,30,40,70,85,100],
				["追加ダメ/ブラッドレイジ",2,0,0,0]);  // 特殊計算
	Hero.Bskill.effect[0].normalattack = 1;
	Hero.Bskill.effect[1].wpDam = 1;
	Hero.Bskill.effect[2].normalattack = 1;
	Hero.Bskill.effect[3].wpDam = 1;
	Hero.ult = new skill("血の飛沫",3,[4,4,4],
			     ["毎秒ダメージ", 0,225,350,475,175,100]);
	Hero.ult.effect[0].wpDam = 1;
	break;
    case "Samuel":
	Hero = new hero(kind,652,2040,78,148,100,129.7,20,50,20,50,0);
	Hero.Askill = new skill("悪意と裁断",5,[4,4,4,4,3],
				["ダメージ",0,60,90,120,150,210,0,100],
				["強化ダメージ",2,75,105,135,165,225,0,115]);
	Hero.Bskill = new skill("闇の漂流",5,[20,20,20,20,20],
				["毎秒ダメージ",0,40,55,70,85,100,0,10],
				["毎秒回復",1,4,6,8,10,12,0,12]);
	Hero.ult = new skill("忘却",3,[90,75,60],
			     ["ダメージ",0,200,325,450,0,100]);
	break;
    case "Saw":
	Hero = new hero(kind,683,2078,50,127,100,111,20,60,20,60,0);
	Hero.Askill = new skill("ローディーラン", 5,[15,14,13,12,11],
				["基本ダメージ",0,60,140,220,300,380,0,280],
				["体力喪失%",0,0,0,0,0,0,0,0]);
	Hero.Askill.effect[1].physicLoss = [15,20,25,30,40];
	Hero.Bskill = new skill("牽制射撃", 5,[15,15,15,15,15],
				["合計ダメージ",0,240,360,480,600,960,0,200]);
	Hero.ult = new skill("マッドキャノン",3,[100,80,60],
			     ["基本攻撃",0,0,0,0,0,0],
			     ["クリスタルダメ",0,40,60,80,0,140],
			     ["体力喪失%",0,0,0,0,0,0]);
	Hero.ult.effect[0].normalattack = 1;
	Hero.ult.effect[2].physicLoss = [12,12,12];
	break;
    case "Skaarf":
	Hero = new hero(kind,638,1992,80,154,100,122,20,50,20,50,0);
	Hero.Askill = new skill("スピットファイア",5,[5,4.5,4,3.5,3],
				["ダメージ",0,75,135,195,255,315,0,150]);
	Hero.Bskill = new skill("グープ",5,[10,10,10,10,8],
				["発火ダメージ",0,40,60,80,100,120,0,70],
				["毎秒ダメージ",0,40,85,130,175,220,0,140]);
	Hero.Bskill.effect[1].duration = [4,4,4,4,6];
	Hero.ult = new skill("ドラゴンブレス",3,[80,75,70],
			     ["合計ダメージ",0,265*3,355*3,445*3,0,300]);
	Hero.ult.effect[0].cpPene = [40,50,60];
	break;
    case "Skye":
	Hero = new hero(kind,668,2060,72,111,100,136.3,20,50,20,50,0);
	Hero.Askill = new skill("フォワード・バラージ",5,[6,6,6,6,5],
				["毎秒ダメージ",2,120,160,200,240,320,70,160],
				["ロック中毎秒ダメージ",2,0,0,0,0,0,0,0]); // 特殊計算
	Hero.Askill.effect[0].duration = [3,3,3,3,3];
	Hero.Askill.effect[1].duration = [3,3,3,3,3];
	Hero.Bskill = new skill("シュリ・ストライク",5,[14,12,10,8,6],
				["ダメージ",0,90,150,210,270,330,0,100]);
	Hero.ult = new skill("デス・フロム・アバブ",3,[30,24,18],
			     ["毎秒ダメージ",0,250,300,350,0,50]);
	Hero.ult.effect[0].duration = [2,3,4];
	break;
    case "Taka":
	Hero = new hero(kind,702,2287,68,125,100,136.3,20,60,20,60,1);
	Hero.Askill = new skill("回転の術", 5,[15,15,15,15,15],
				["ダメージ", 0,100,165,230,295,360,0,80]);
	Hero.Bskill = new skill("カク",5,[25,24,23,22,21],
				["毎秒回復",1,25,50,75,100,125,0,30]);
	Hero.Bskill.effect[0].duration = [3,3.2,3.4,3.6,4];
	Hero.ult = new skill("X烈",3,[20,20,20],
			     ["ダメージ",0,250,400,550,0,170],
			     ["毎秒ダメージ",0,40,50,60,0,70]);
	Hero.ult.effect[1].duration = [3,3,3];
	break;
    case "Vox":
	Hero = new hero(kind,667,2054,72,149,100,136.3,20,50,20,50,0);
	Hero.Askill = new skill("ソニックズーム",5,[6,5.5,5,4.5,4],
				["基本攻撃ダメージ(2回)",0,0,0,0,0,0,0,0]);  // 特殊計算
	Hero.Askill.effect[0].normalattack = 1;
	Hero.Askill.effect[0].duration = [2,2,2,2,2];
	Hero.Bskill = new skill("パルス", 5,[10,10,10,10,7],
				["追加バウンスダメージ", 0,20,40,60,80,120,0,0],
				["レゾナンス弾", 0,20,20,20,20,20,0,90]);
	Hero.ult = new skill("アンチフェーズ",3,[70,55,40],
			     ["初期ダメージ",0,100,150,200,0,20],
			     ["ショックウェーブダメージ",0,100,150,200,0,40],
			     ["レゾナンス弾",0,20,20,20,0,90]);
	break;
    }
    return Hero;
}