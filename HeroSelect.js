// ヒーローの基本ステータスを設定
var hero = function(name, hp, wp, speed, armor, shield, melee){

    this.name = name;
    this.nathp = hp; // 素のHP
    this.hp = hp;
    this.remain = hp;  // 残り体力
    this.natwp = wp;
    this.wp = wp;
    this.cp = 0;
    this.speed = speed;
    this.armor = armor;
    this.shield = shield;
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
    this.BPflg = 0;// ブレーキングポイントを持っているかどうか
    this.BSflg = 0;// ボーンソーを ・・
    this.TSflg = 0; // テンションボウ ・・
    this.BMflg = 0;// ブロークンミスを　・・
    this.ASflg = 0; // アフターショックを ・・
    // メレーかどうか(1:メレー, 0:レンジ)
    this.melee = melee;

    this.Askill;
    this.Bskill;
    this.ult;
};

// 選択されたヒーローを設定
function HeroSelect(kind){
    var Hero;
    switch(kind){
    case "Adagio":
	Hero = new hero(kind,1654, 117, 116, 86, 86,0);
	Hero.Askill = new skill("炎の賜物", 8,
				["炎ダメージ",0,70,0,20],
				["バースト回復",1,140,0,30],
				["毎秒回復",1,35,0,10]);
	Hero.Askill.effect[0].duration = 7;
	Hero.Askill.effect[1].addhp = 10;
	Hero.Askill.effect[2].duration = 3;
	Hero.Bskill = new skill("怒りの使者", 10,
				["ダメージ",0,120,0,40],
				["秘術の炎ボーナス",0,55,0,40],
				["自己ボーナス",0,30,0,20]);
	Hero.ult = new skill("裁きの詩", 70, ["ダメージ",0,1300,0,100]);
	break;
    case "Alpha":
	Hero = new hero(kind,1925, 124,122,86,86,1);
	Hero.Askill = new skill("スキャン・ラッシュ",8,
				["ダメージ",0,160,80,200],
				["ダメージ/スタック",0,120,40,40]);
	Hero.Askill.effect[1].maxstack = 3;
	Hero.Bskill = new skill("コア・チャージ",4,
				["ダメージ",0,80,100,100],
				["基本攻撃",0,0,0,0],
				["回復/スタック",1,10,2,0],
				["追加ダメ/スタック",2,0,0,0]);
	Hero.Bskill.effect[1].normalattack = 1;
	Hero.Bskill.effect[2].maxstack = 3;
	Hero.ult = new skill("ファイナル・プロトコル",55,
			     ["ダメージ",0,1337,0,250]);
	break;
    case "Ardan":
	Hero = new hero(kind,1615,140,136,86,86,1);
	Hero.Askill = new skill("ヴァンガード",13,
				["ダメージ",0,250,0,120]);
	Hero.Bskill = new skill("血には血を",20,
				["基本攻撃",0,0,100,0],
				["ダメージ", 0,190,0,70]);
	Hero.Bskill.effect[0].normalattack = 1;
	Hero.Bskill.effect[1].addDamage = 25;
	Hero.ult = new skill("ガントレット", 90,
			     ["ダメージ",0,500,0,350]);
	break;
    case "Baptiste":
	Hero = new hero(kind,1571,167,136,86,86,1);
	Hero.Askill = new skill("バッド・モジョ", 3,
				["ダメージ",0,280,0,110],
				["範囲ダメージ",0,140,0,55]);
	Hero.Bskill = new skill("ソウル・プリズン",12,
				["ダメージ",0,195,0,45],
				["拘束破断ダメージ",0,260,0,60]);
	Hero.ult = new skill("恐怖の亡霊",50,
			     ["毎秒ダメージ", 0,150,0,65]);
	Hero.ult.effect[0].duration = 1.6;
	break;
    case "Balon": // バロン
	Hero = new hero(kind,1672,108,122/1.6,86,86,0);
	Hero.Askill = new skill("ヤマアラシ迫撃砲", 2.5,
				["ダメージ",0,360,70,190]);
	Hero.Bskill = new skill("ジャンプジェット", 12,
				["連続攻撃", 0,0,100,0],
				["速度ブースト",2,1.8,0.1,0]);
	Hero.Bskill.effect[0].duration = 2;
	Hero.Bskill.effect[0].normalattack = 1;
	Hero.ult = new skill("荷電粒子砲", 60,
			     ["ダメージ", 0,900,120,225]);
	break;
    case "Black Feather":  // ブラックフェザー
	Hero = new hero(kind,1431,160,122,86,86,1);
	Hero.Askill = new skill("フェイント・ハート",6,
				["ダメージ",0,0,0,50],
				["基本攻撃",0,0,0,0]);
	Hero.Askill.effect[0].physicLoss = 20; //+Player.wp*0.2
	Hero.Askill.effect[1].normalattack = 1;
	Hero.Bskill = new skill("オン・ポイント",3.5,
				["ダメージ",0,240,100,180]);
	Hero.ult = new skill("薔薇の革命",20,
			     ["ダメージ", 0,150,0,50]);
	break;
    case "Catherine":
	Hero = new hero(kind,1509,141,136,80,80,1);
	Hero.Askill = new skill("容赦なき追跡",12,
				["基本攻撃",0,0,100,0],
				["ボーナスダメージ",0,175,0,100]);
	Hero.Askill.effect[0].normalattack = 1;
	Hero.Bskill = new skill("ストームガード", 5,
				["毎秒ダメージ",0,120,0,50]);
	Hero.Bskill.effect[0].duration = 4;
	Hero.ult = new skill("ブラスト・トレマー",60,
			     ["ダメージ",0,650,0,130]);
	break;
    case "Celeste":
	Hero = new hero(kind,1347,10,125,86,86,0);
	Hero.Askill = new skill("ヘリオジェネシス", 1.2,
				["ダメージ",0,300,0,90],
				["ノヴァダメージ",2,350,0,220])
	Hero.Bskill = new skill("コア崩壊", 9,
				["ダメージ",0,475,0,40]);
	Hero.ult = new skill("ソーラーストーム", 60,
			     ["先導星ダメージ",0,350,0,100],
			     ["星ダメージ",0,170,0,20]);
	Hero.ult.effect[1].duration = 7;
	break;
    case "Flicker":
	Hero = new hero(kind,1654,155,136,86,86,1);
	Hero.Askill = new skill("フェアリーリング",4,
				["毎秒ダメージ",0,375,0,25]);
	Hero.Askill.effect[0].duration = 2;
	Hero.Bskill = new skill("フェアリーダスト",11,
				["毎秒ダメージ",0,180,0,50],
				["爆破ダメージ",0,360,0,100]);
	Hero.Bskill.effect[0].duration = 3;
	Hero.ult = new skill("月のマント",75,
			     ["",3,0,0,0]);
	break;
    case "Fortress":
	Hero = new hero(kind,1560,156,144,86,86,1);
	Hero.Askill = new skill("牙の真実",7,
				["ダメージ",0,220,0,110],
				["基本攻撃",0,0,100,0]);
	Hero.Askill.effect[1].normalattack = 1;
	Hero.Bskill = new skill("爪の掟",6,
				["ダメージ",0,250,0,70],
				["毎秒流血ダメージ",0,10,0,15],
				["流血バースト",2,0,0,0]);
	Hero.ult = new skill("群れの襲撃",60,
			     ["狼の攻撃ダメージ", 0,60,0,0]);
	break;
    case "Glaive":
	Hero = new hero(kind,2046,153,113,86,86,1);
	Hero.Askill = new skill("アフターバーン",12,
				["基本攻撃", 0,0,0,0],
				["ダメージ",0,300,0,130]);
	Hero.Askill.effect[0].normalattack = 1;
	Hero.Bskill = new skill("ツイストストローク", 8,
				["クリティカル攻撃",0,0,0,0],
				["クリスタルダメージ",0,0,0,120],
				["薙ぎ払いダメージ",2,0,0,0]);
	Hero.ult = new skill("ブラッドソング", 16,
			     ["基本ダメージ", 0,300,0,110],
			     ["ダメージ/スタック",2,20,0,2]);
	break;
    case "Grace":
	Hero = new hero(kind,1452,158,136,86,86,1);
	Hero.Askill = new skill("祝福", 10,
				["応報ダメージ",0,0,0,0],
				["ボーナスダメージ",0,120,40,100]);
	Hero.Bskill = new skill("ホーリー・ノヴァ", 8,
				["ダメージ",0,425,0,200]);
	Hero.ult = new skill("ディヴァイン・ヒール",30,
			     ["回復力", 1,800,0,150]);
	break;
    case "Grumpjaw":
	Hero = new hero(kind,2107,158,113,86,86,1);
	Hero.Askill = new skill("突進", 8,
				["ダメージ",0,325,0,50],
				["追加ダメ/スタ",2,95,0,10]);
	Hero.Bskill = new skill("怒飢",9,
				["ダメージ", 0,100,0,80],
				["基本攻撃",0,0,0,0]);
	Hero.Bskill.effect[1].normalattack = 1;
	Hero.ult = new skill("満腹",50,
			     ["ダメージ", 0,700,0,200]);
	break;
    case "Gwen":
	Hero = new hero(kind,1375,132,136,86,86,0);
	Hero.Askill = new skill("バックショット・ボナンザ",5,
				["ダメージ",0,220,65,210]);
	Hero.Askill.effect[0].wpDam = 1;
	Hero.Bskill = new skill("逃げるが勝ち",14,
				["速度ブースト", 3,2.2,0,0]);
	Hero.ult = new skill("エース・ハイ",45,
			     ["ダメージ",0,240,100,240]);
	Hero.ult.effect[0].wpDam = 1;
	break;
    case "Idris":
	Hero = new hero(kind,1600,161,136,86,86,1);
	Hero.Askill = new skill("シュラウドステップ",10,
				["バリア", 3,325,75,0]);
	Hero.Bskill = new skill("チャクラム", 5,
				["ダメージ", 0,275, 100,130]);
	Hero.ult = new skill("シマーストライク", 50,
			     ["ダメージ", 0,500,100,0]);
	break;
    case "Joule":
	Hero = new hero(kind,1705,148,113,86,86,1);
	Hero.Askill = new skill("ロケットリープ",10,
				["中心ダメージ",0,350,0,170],
				["ジャンプ周辺ダメ",2,0,0,0]);
	Hero.Bskill = new skill("サンダーストライク",10,
				["ダメージ(貫通有)",0,200,175,135],
				["ダメージ(貫通無)",2,200,175,135]);
	Hero.Bskill.effect[0].wpPene = 10;
	Hero.Bskill.effect[0].cpPene = 10;
	Hero.ult = new skill("ビッグレッドボタン",40,
			     ["合計ダメージ",0,2200,0,460]);
	break;
    case "Kestrel":
	Hero = new hero(kind,1407,130,136,86,86,0);
	Hero.Askill = new skill("グリマーショット",0,
				["グリマー初撃",0,0,0,0], // 特殊ダメージ
				["範囲ダメージ",0,150,0,160]);
	Hero.Askill.effect[0].wpDam = 1;
	Hero.Bskill = new skill("アクティブ迷彩",6,
				["ステルス持続時間",4,2,0,3],
				["速度ブースト",3,1,0.2,0],
				["ダメージ",0,300,0,270]);
	Hero.ult = new skill("一矢一殺",35,
			     ["ダメージ",0,800,120,260]);
	Hero.ult.effect[0].wpDam = 1;
	Hero.ult.effect[0].wpPene = 30;
	break;
    case "Koshka":
	Hero = new hero(kind,1595,164,109,86,86,1);
	Hero.Askill = new skill("パウンシー",6,
				["ダメージ", 0,350,0,130]);
	Hero.Bskill = new skill("トワーリー・デス",5,
				["ダメージ", 0,280,0,80],
				["ボーナスダメージ",2,110,0,120]);
	Hero.ult = new skill("ネコネコフレンジー",50,
			     ["合計ダメージ",0,800,0,120]);
	break;
    case "Krul":
	Hero = new hero(kind,1501,147,136,86,86,1);
	Hero.Askill = new skill("死者の追求",8,
				["基本攻撃ダメージ",0,0,0,0], // 特殊ダメージ
				["クリスタルダメ",0,0,0,70]);
	Hero.Askill.effect[0].wpDam = 1;
	Hero.Bskill = new skill("亡者の鉄槌",10,
				["ダメージ", 0,350,0,50],
				["ダメージ/スタ",2,95,0,20],
				["ダメージ(スタックMAX)",2,0,0,0], // 特殊ダメージ
				["回復",1,140,0,35],
				["回復/スタ",1,40,0,20],
				["回復(スタックMAX)",1,0,0,0])   // 特殊計算
	Hero.ult = new skill("ヘルズ・ハート", 45,
			     ["ダメージ",0,650,0,100]);
	break;
    case "Lance":
	Hero = new hero(kind,2185,178,100,86,86,1);
	Hero.Askill = new skill("刺突",7,
				["ダメージ",0,560,140,80]);
	Hero.Askill.effect[0].wpDam = 1;
	Hero.Bskill = new skill("ガイシアの壁",7,
				["ダメージ",0,210,100,80]);
	Hero.Bskill.effect[0].wpDam = 1;
	Hero.ult = new skill("コンバットロール<br>(lv2)",6,
			     ["基本攻撃",0,0,0,0],
			     ["ダメージ",0,200,0,60]);
	Hero.ult.effect[0].normalattack = 1;
	break;
    case "Lyra":
	Hero = new hero(kind,1366,10,136,65,65,0);
	Hero.Askill = new skill("帝国の紋章", 8,
				["毎秒ダメージ",2,260,0,80],
				["毎秒回復",1,140,0,0],
				["爆破ダメージ",2,325,0,120]);
	Hero.Askill.effect[1].addhp = 12;
	Hero.Bskill = new skill("魔導結界",14,
				["ダメージ",0,350,0,50]);
	Hero.ult = new skill("魔導の扉",45,
			     ["なし",0,0,0,0]);
	break;
    case "Ozo":
	Hero = new hero(kind,1825,157,136,86,86,1);
	Hero.Askill = new skill("スリーリング・サーカス",5,
				["各段ダメージ",0,50,0,75],
				["3段合計ダメージ",2,150,0,225],
				["対ヒーロー回復",1,75,0,15]);
	Hero.Askill.effect[0].wpDam = 1;
	Hero.Askill.effect[1].wpDam = 1;
	Hero.Bskill = new skill("アクロバウンス", 7,
				["バウンスダメージ",0,300,0,70],
				["追加ダメージ/バウンス", 2,100,0,35],
				["1段着地ダメージ",2,400,0,70],
				["2段着地ダメージ",2,0,0,0],  // 特殊計算
				["3段着地ダメージ",2,600,0,70], // 特殊計算
				["3段ジャンプ合計",2,0,0,0]); // 特殊計算
	Hero.ult = new skill("バンガラング", 40,
			     ["メイン標的ダメージ",2,550,0,150],
			     ["サブ標的ダメージ",2,275,0,75]);
	break;
    case "Petal":
	Hero = new hero(kind,1346,134,136,86,86,0);
	Hero.Askill = new skill("ブランブルブームの種",3,
				["ペット体力",3,500,0,30],
				["ペット防御",3,50,0,5],
				["ペットダメージ",2,42,0,40],
				["種の体力",3,200,0,15],
				["ダメージ",2,275,0,100]);
	Hero.Bskill = new skill("トランポリン！",7,
				["追加攻撃範囲",3,1.2,0,0]);
	Hero.ult = new skill("自然発火", 0.4,
			     ["ダメージ",0,300,0,70],
			     ["回復",1,140,0,20]);
	break;
    case "Phinn":
	Hero = new hero(kind,1983,154,113,86,86,1);
	Hero.Askill = new skill("クイブル",5,
				["ダメージ",0,600,0,170]);
	Hero.Bskill = new skill("ポライト・カンパニー", 10,
				["ダメージ",0,360,0,120]);
	Hero.ult = new skill("フォースド・アコード",45,
			     ["ダメージ",0,500,0,150]);
	break;
    case "Reim":
	Hero = new hero(kind,1894,153,136,52,52,1);
	Hero.Askill = new skill("冬の尖塔", 2,
				["1段目ダメージ",0,240,0,100],
				["2段目ダメージ",0,240,0,140]);
	Hero.Bskill = new skill("凍てつく風",7,
				["ダメージ",0,280,0,40]);
	Hero.ult = new skill("ヴァルキリー",50,
			     ["中心部ダメージ",2,500,0,125],
			     ["端部ダメージ",2,400,0,100]);
	break;
    case "Ringo":
	Hero = new hero(kind,1405,130,136,86,86,0);
	Hero.Askill = new skill("アキレスショット",7,
				["ダメージ",0,350,0,125]);
	Hero.Bskill = new skill("トワリングシルバー",9,
				["基本攻撃",0,0,0,0],
				["クリスタルダメージ",0,0,0,80]);
	Hero.Bskill.effect[0].normalattack = 1;
	Hero.ult = new skill("地獄の火酒",70,
			     ["ダメージ",0,480,0,75],
			     ["炎上ダメージ",0,70,0,20]);
	Hero.ult.effect[0].cpPene = 100;
	Hero.ult.effect[1].duration = 7;
	break;
    case "Rona":
	Hero = new hero(kind,1893,156,113,86,86,1);
	Hero.Askill = new skill("ケンカ上等", 9,
				["インパクトダメージ",0,150,0,100],
				["ラプチャーダメージ",0,300,0,200]);
	Hero.Bskill = new skill("分断の斧",12,
				["基本攻撃",0,0,0,0],
				["1回目攻撃ダメージ",0,70,85,100],
				["基本攻撃",0,0,0,0],
				["2回目攻撃ダメージ",0,70,85,100],
				["追加ダメ/ブラッドレイジ",2,0,0,0]);  // 特殊計算
	Hero.Bskill.effect[0].normalattack = 1;
	Hero.Bskill.effect[1].wpDam = 1;
	Hero.Bskill.effect[2].normalattack = 1;
	Hero.Bskill.effect[3].wpDam = 1;
	Hero.ult = new skill("血の飛沫",4,
			     ["毎秒ダメージ", 0,475,175,100]);
	Hero.ult.effect[0].wpDam = 1;
	break;
    case "Samuel":
	Hero = new hero(kind,1479,148,130,86,86,0);
	Hero.Askill = new skill("悪意と裁断",3,
				["ダメージ",0,210,0,100],
				["強化ダメージ",2,225,0,115]);
	Hero.Bskill = new skill("闇の漂流",20,
				["毎秒ダメージ",0,100,0,10],
				["毎秒回復",1,10,0,10]);
	Hero.ult = new skill("忘却",60,
			     ["ダメージ",0,450,0,100]);
	break;
    case "Saw":
	Hero = new hero(kind,1453,87,111,86,86,0);
	Hero.Askill = new skill("ローディーラン", 11,
				["基本ダメージ",0,380,0,280],
				["体力喪失%",0,0,0,0]);
	Hero.Askill.effect[1].physicLoss = 45;
	Hero.Bskill = new skill("牽制射撃", 15,
				["合計ダメージ",0,960,0,400]);
	Hero.ult = new skill("マッドキャノン",60,
			     ["基本攻撃",0,0,0,0],
			     ["クリスタルダメ",0,80,0,140],
			     ["体力喪失%",0,0,0,0]);
	Hero.ult.effect[0].normalattack = 1;
	Hero.ult.effect[2].physicLoss = 15;
	break;
    case "Skaarf":
	Hero = new hero(kind,1490,154,122,86,86,0);
	Hero.Askill = new skill("スピットファイア",3,
				["ダメージ",0,315,0,150]);
	Hero.Bskill = new skill("グープ",8,
				["発火ダメージ",0,120,0,70],
				["毎秒ダメージ",0,220,0,140]);
	Hero.Bskill.effect[1].duration = 6;
	Hero.ult = new skill("ドラゴンブレス",70,
			     ["合計ダメージ",0,1200,0,300]);
	Hero.ult.effect[0].cpPene = 45;
	break;
    case "Skye":
	Hero = new hero(kind,1563,111,136,86,86,0);
	Hero.Askill = new skill("フォワード・バラージ",5,
				["毎秒ダメージ",2,320,70,210],
				["ロック中毎秒ダメージ",2,0,0,0]); // 特殊計算
	Hero.Askill.effect[0].duration = 3;
	Hero.Askill.effect[1].duration = 3;
	Hero.Bskill = new skill("シュリ・ストライク", 6,
				["ダメージ",0,330,0,100]);
	Hero.ult = new skill("デス・フロム・アバブ",18,
			     ["毎秒ダメージ",0,350,0,50]);
	Hero.ult.effect[0].duration = 4;
	break;
    case "Taka":
	Hero = new hero(kind,1555,125,136,86,86,1);
	Hero.Askill = new skill("回転の術", 15,
				["ダメージ", 0,360,0,80]);
	Hero.Bskill = new skill("カク<br>(lv4)",21,
				["毎秒回復",1,70,0,25]);
	Hero.Bskill.effect[0].duration = 3.6;
	Hero.ult = new skill("X烈",20,
			     ["ダメージ",0,550,0,170],
			     ["毎秒ダメージ",0,60,0,70]);
	Hero.ult.effect[1].duration = 3;
	break;
    case "Vox":
	Hero = new hero(kind,1465,149,136,86,86,0);
	Hero.Askill = new skill("ソニックズーム", 3,
				["基本攻撃ダメージ(2回)",0,0,0,0]);  // 特殊計算
	Hero.Askill.effect[0].normalattack = 1;
	Hero.Askill.effect[0].duration = 2;
	Hero.Bskill = new skill("パルス", 7,
				["追加バウンスダメージ", 0,120,0,0],
				["レゾナンス弾", 0,20,0,90]);
	Hero.ult = new skill("アンチフェーズ",40,
			     ["初期ダメージ",0,200,0,20],
			     ["ショックウェーブダメージ",0,200,0,40],
			     ["レゾナンス弾",0,20,0,90]);
	break;
    }
    return Hero;
}
