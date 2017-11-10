function displayOff(id){
    document.getElementById(id).style.display = "none";
}

function displayInline(id){
    document.getElementById(id).style.display = "inline-block";
}

function displayOn(id){
    document.getElementById(id).style.display = "";
}

function changeCalculation(){
    var calcStyle = document.getElementById("calculation").value;
    switch(calcStyle){
    case "sum":
	displayInline("nsecDamage");
	// displayInline("result");
	// displayInline("nstatus");
	displayOff("DE")
	displayOff("skill1");
	displayOff("skill");
	displayOff("Fisticuffs");
	displayOff("fiststatus");
	break;
    case "skill":
	displayOff("nsecDamage");
	// displayOff("result");
	// displayOff("nstatus");
	displayInline("skill1");
	displayOn("skill");
	displayOff("Fisticuffs");
	displayOff("fiststatus");
	break;
    case "fisticuffs":
	displayOff("nsecDamage");
	displayOff("DE");
	displayOff("skill1");
	displayOff("skill");
	displayInline("fiststatus");
    default:
	break;
    }
}


