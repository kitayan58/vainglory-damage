// スキル全体のパラメータ
// arguments[0] = スキル名
// arguments[1] = クールダウン
// arguments[2] 以降　スキルのダメージ・回復効果
var skill = function(){
    this.name = arguments[0];
    this.cooldown = arguments[1];
    this.effect = [];
    this.effect[0] = new skillEffect(arguments[2]);
    for(var i = 3; i < arguments.length; i++){
	this.effect[i-2] = new skillEffect(arguments[i]);
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
    this.val = arguments[0][2];
    this.wp = arguments[0][3];
    this.cp = arguments[0][4];
    this.wpDam = 0;// スキルダメージが武器ダメージかどうか(0:クリスタル, 1:武器)
    this.wpPene = 0;  // 武器力貫通
    this.cpPene = 0;  // クリスタル貫通
    this.addhp = 0;   // 追加体力に応じた計算
    this.duration = 0;　　// 継続ダメージ
    this.normalattack = 0; //　基本攻撃かどうか
    this.maxstack = 0;
    this.stack = 0;
    this.physicLoss = 0;
    this.addDamage = 0; // 追加ダメージ(%)
    this.maxhpdamage = 0; // 最大体力に応じたダメージ
};
