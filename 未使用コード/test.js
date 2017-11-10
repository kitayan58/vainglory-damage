function onButtonClick(){
    selindex = document.selbox.hero.selectedIndex;
    target = document.getElementById("output");
    switch(selindex){
    case 0:
	target.innerHTML = "Adagio<br/>";
	break;
    }
}
