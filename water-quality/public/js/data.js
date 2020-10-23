const temperature, turbidity, pH, eC, chlorine;

function temperature_range(x){
    if(x >= 50 && x <= 72){
        console.log("Temperature level is best for optimal hydration");
        return true;
    }
    else {
        console.log("Temperature level is not best for optima hydration");
        return false;
    }
}

function turbidity_range(x){
    // 5 NTU, and should ideally be below 1 NTU.
    if(x >= 1.0 && x <= 5.0) {
        console.log("Turbidity level is safe to drink");
        return true;
    }
    else {
        console.log("Turbidity leve is not safe to drink");
        return false;
    }
}

function pH_range(x){
    // pH is a measure of how acidic/basic water is. The range goes from 0 to 14,
    // with 7 being neutral. pHs of less than 7 indicate acidity, 
    // whereas a pH of greater than 7 indicates a base
    if(x > 6.5 && x < 8.5) {
        console.log("pH level is safe to drink");
        return true;
    }
    else if(x > 8.5 && x < 14){
        console.log("ph level of alkalinity minerals are present");
    }
    else if(x > 1 && x < 7){
        console.log("pH level is Acidic, naturally soft and corrosive");
    }
    else {
        console.log("pH level is not safe to drink");
        return false;
    }
}

function eC_range(x){
    if(x >= 409 && x <= 995){
        console.log("eC level is safe to drink");
    }
    else{
        console.log("eC level is not safe to drink");
    }
}

// Chlorine levels up to 4 milligrams per liter (mg/L or 4 parts per million (ppm) 
// are considered safe in drinking water. At this levelExternal, 
// no harmful health effects are likely to occur 2.
function chlorine_range(x){
    if(x >= 0 && x <= 4){
        console.log("Chlorine level is safe to drink");
        return true;
    }
    else {
        console.log("Chlorine level is not safe to drink")
    }
}


//Chloramine:  Range  (0 - 4 (mg/L))
function chloramine_range(x){
    if (x >= 0 && x <= 4){
        console.log("Chloramine level is safe to drink");
        
    }
    else {
        console.log("Chloramine lvel is not safe to drink");
    }
}

// Oxidation-Reduction Potential (ORP): Range (200 mV - 400 mV)
function ORP_Range(x){
    if(x >= 200 && x <= 400){
        console.log("Oxidation-Reduction Potential level is safe to drink");
    }
    else {
        console.log("Oxidation-Reduction Potential level is not safe to drink");
    }
}

// Disolved Oxygen: Range (257 - 614)
function dissolvedOxygen_Range(x){
    if(x >= 257 && x <= 614){
        console.log("Dissolved Oxygen level is safe to drink");
    }
    else{
        console.log("Dissolved Oxygen level is not safe to drink");
    }
}