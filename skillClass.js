// スキル全体のパラメータ 
// arguments[0] = スキル名
// arguments[1] = maxlevel
// arguments[2] = クールダウン
// arguments[3] 以降　スキルのダメージ・回復効果
var skill = function(){
    this.name = arguments[0];
    this.cooldown = arguments[2];
    this.effect = [];
    this.effect[0] = new skillEffect(arguments[3], arguments[1]);
    for(var i = 4; i < arguments.length; i++){
	this.effect[i-3] = new skillEffect(arguments[i], arguments[1]);
    }
};

// スキルのダメージ・回復効果
// arguments[0] = 効果名
// arguments[1] = ダメージor回復
// arguments[2] = 元ダメージ
// arguments[3,4] = wp率, cp率
var skillEffect = function(){
    this.name = arguments[0][0];
    this.DamOrHeal = arguments[0][1];
    this.val = arguments[0].slice(2,arguments[1]+2);
    this.wp = arguments[0][arguments[1]+2];
    this.cp = arguments[0][arguments[1]+3];
    this.wpDam = 0;		// スキルダメージが武器ダメージかどうか(0:クリスタル, 1:武器)
    this.wpPene = (new Array(arguments[1])).fill(0);  // 武器力貫通
    this.cpPene = (new Array(arguments[1])).fill(0);  // クリスタル貫通
    this.addhp = (new Array(arguments[1])).fill(0);   // 追加体力に応じた計算
    this.duration = (new Array(arguments[1])).fill(0);　　// 継続ダメージ
    this.normalattack = 0; //　基本攻撃かどうか
    this.maxstack = 0;
    this.stack = 0;
    this.physicLoss = 0;
    this.addDamage = (new Array(arguments[1])).fill(0); // 追加ダメージ(%)
    this.maxhpdamage = (new Array(arguments[1])).fill(0); // 最大体力に応じたダメージ
};

