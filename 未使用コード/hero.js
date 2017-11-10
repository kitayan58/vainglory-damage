var Hero = function(name, hp, wp, speed, armor, shield){
    
    this.name = name;
    this.hp = hp;
    this.wp = wp;
    this.cp = 0;
    this.speed = speed;
    this.armor = armor;
    this.shield = shield;
    this.critDam = 150;
    this.critRate = 0;
    this.wpPene = 0;
    this.cpPene = 0;
    this.wpAmp = 0;
    this.cpAmp = 0;
};

function calcDamage(Player, Enemy){
    var damage;

    damage = Player.wp / (1 + Enemy.armor/100);
    damage = Math.floor(damage);
    return damage;
}

var Ringo = new Hero('Ringo', 1405, 131, 136, 86, 86);
var Vox = new Hero('Vox', 1465, 149, 136, 86, 86);
var Player = Ringo;
var Enemy = Vox;
var PreP;
var PreE;
