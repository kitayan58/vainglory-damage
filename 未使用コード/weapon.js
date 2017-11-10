var select = document.getElementById('weapon');
var selectBox = {
    'Salow':'サロウブレード',
    'Snake':'蛇仮面',
    'Tension':'テンションボウ',
    'Break':'ブレーキングポイント',
    'Bone':'ボーンソー',
    'Tornade':'トルネードトリガー',
    'Tirants':'タイランツモノクル',
};

for(var i in selectBox){
    var option = document.createElement('option');

    option.setAttribute('value', i);
    option.innerHTML = selectBox[i];
    select.appendChild(option);
}
