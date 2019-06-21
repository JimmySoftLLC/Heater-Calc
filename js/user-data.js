var heatTransferElements = [];
var mySeparator = String.fromCharCode(30);

function defaultDataString(materialLocation, numberDataPoints) {
    var myReturn = ""
    for (var x = 0; x < numberDataPoints - 1; x++) {
        if (x === materialLocation) {
            myReturn += "-1";
        }
        myReturn += mySeparator;
    }
    if (materialLocation === numberDataPoints - 1) {
        myReturn += "-1";
    }
    return myReturn;
}

function heatTransferElement(title, mydate, type, data, result, customer, description, timestamp) {
    this.timestamp = timestamp;
    this.title = title;
    this.mydate = mydate;
    this.type = type;
    this.data = data;
    this.result = result;
    this.customer = customer;
    this.description = description;
}

let materials = [];

function Material(name, density, specificHeat, thermalConductivity, latentHeatOfFusion) {
    this.name = name;
    this.density = density;
    this.specificHeat = specificHeat;
    this.thermalConductivity = thermalConductivity;
    this.latentHeatOfFusion = latentHeatOfFusion;
}

var LoadMaterialsObject = (function () {
    var executed = false;
    return function () {
        if (!executed) {
            executed = true;
            materials.push(new Material("Aluminum 1100-0", 169, 0.216, 1536, 169));
            materials.push(new Material("Aluminum 2024", 173, 0.209, 1344, 167));
            materials.push(new Material("Beryllium", 113.5, 0.052, 1121, ""));
            materials.push(new Material("Brass (80-20)", 535, 0.091, 960, ""));
            materials.push(new Material("Brass (70-30)", 525, 0.1, 840, ""));
            materials.push(new Material("Chromium", 450, 0.11, 484, ""));
            materials.push(new Material("Constantan", 555, 0.09, 148, ""));
            materials.push(new Material("Copper", 560, 0.1, 2736, ""));
            materials.push(new Material("Gold", 1206, 0.03, 2064, ""));
            materials.push(new Material("Inconel", 530, 0.11, 104, ""));
            materials.push(new Material("Iron(Cast)", 450, 0.13, 396, ""));
            materials.push(new Material("Iron(Wrought)", 480, 0.12, 432, ""));
            materials.push(new Material("Lead", 708, 0.031, 241, ""));
            materials.push(new Material("Lithium", 367, 0.79, 516, ""));
            materials.push(new Material("Magnesium", 109, 0.25, 1068, ""));
            materials.push(new Material("Mercury", 845, 0.033, 60.8, 5));
            materials.push(new Material("Molybdenum", 638, 0.061, 980, ""));
            materials.push(new Material("Nickel", 200, 554, 0.11, 468));
            materials.push(new Material("Nichrome (80-20)", 518, 0.11, 104, ""));
            materials.push(new Material("Platinum", 1339, 0.031, 480, ""));
            materials.push(new Material("Silver", 655, 0.056, 2904, ""));
            materials.push(new Material("Sodium", 60, 0.295, 972, ""));
            materials.push(new Material("Solder (50/50)", 555, 0.04, 323, 17));
            materials.push(new Material("Solder (60/40)", 540, 0.045, 355, 28));
            materials.push(new Material("Steel (Mild Carbon)", 490, 0.12, 456, ""));
            materials.push(new Material("Stainless Steel (300 series)", 500, 0.12, 113, ""));
            materials.push(new Material("Stainless Steel (430 series)", 484, 0.11, 150, ""));
            materials.push(new Material("Tin Solid", 456, 0.056, 468, ""));
            materials.push(new Material("Titanium", 281, 0.126, 138, ""));
            materials.push(new Material("Zinc", 445, 0.095, 188, ""));
            materials.push(new Material("Non Metals ---------","" ,"" ,"" ,"" ));
            materials.push(new Material("Alumina", 150, "", "", ""));
            materials.push(new Material("Alumina Silicate", 149, 0.2, 9.1, ""));
            materials.push(new Material("Bakelite", 81, 0.36, 118, ""));
            materials.push(new Material("Brick Common Clay", 110, 0.23, 5, ""));
            materials.push(new Material("Carbon", 138, 0.165, 173, ""));
            materials.push(new Material("Fiberglass (Duct Insulation)", 0.75, 0.28, "", ""));
            materials.push(new Material("Fiberglass (Spin-Glas)", 3, 0.26, "", ""));
            materials.push(new Material("Glass", 165, 0.2, 7.2, ""));
            materials.push(new Material("Ice", 52, 0.49, 15.6, 144));
            materials.push(new Material("Mica", 185, 0.2, 3, ""));
            materials.push(new Material("Paper", 56, 0.33, 0.84, ""));
            materials.push(new Material("Paraffin (Solid)", 56.2, 0.69, 1.8, 63));
            materials.push(new Material("ABS", 76, 0.5, 2.3, ""));
            materials.push(new Material("Acrylic", 74, 0.35, 1, ""));
            materials.push(new Material("Epoxy", 88, 0.3, 2.4, ""));
            materials.push(new Material("Fluoroplastics", 150, 0.28, 1.7, ""));
            materials.push(new Material("Mylar", 79, 0.27, 4.5, ""));
            materials.push(new Material("Nylon", 72, 0.5, 1.7, ""));
            materials.push(new Material("Phenolic", 124, 0.35, 1, ""));
            materials.push(new Material("Polycarbonate", 75, 0.3, 1.4, ""));
            materials.push(new Material("Polyester", 86, 0.35, 5, ""));
            materials.push(new Material("Polyethylene", 60, 0.54, 3.5, ""));
            materials.push(new Material("Polyimides", 90, 0.31, 6.8, ""));
            materials.push(new Material("Polypropylene", 57, 0.46, 2.5, ""));
            materials.push(new Material("Polystyrene", 66, 0.32, 0.96, ""));
            materials.push(new Material("PVC Acetate", 99, 0.3, 1.2, ""));
            materials.push(new Material("Porcelain", 156, 0.22, 10.8, ""));
            materials.push(new Material("Rubber Synthetics", 75, 0.48, 1.1, ""));
            materials.push(new Material("Silicon", 14.5, 0.162, 600, ""));
            materials.push(new Material("Silicone Rubber", 78, 0.45, 1.5, ""));
            materials.push(new Material("Teflon", 135, 0.28, 1.4, ""));
            materials.push(new Material("Liquids Gases ---------", "", "", "", ""));
            materials.push(new Material("Acetone 100%", 49, 0.514, 1.15, 225));
            materials.push(new Material("Air", 0.075, 0.24, 0.13, ""));
            materials.push(new Material("Benzene", 56, 0.42, 1.04, 170));
            materials.push(new Material("Butyl Alcohol", 45.3, 0.687, 254, ""));
            materials.push(new Material("Ethyl Alcohol 95%", 50.4, 0.6, 1.3, 370));
            materials.push(new Material("Freon", 12, 81.8, 0.232, 0.49));
            materials.push(new Material("Fuel Oil #1", 50.5, 0.47, 1, 86));
            materials.push(new Material("Fuel Oil #2", 53.9, 0.44, 0.96, ""));
            materials.push(new Material("Fuel Oil #3 #4", 55.7, 0.425, 0.92, 67));
            materials.push(new Material("Fuel Oil #5 #6", 58.9, 0.405, 0.85, ""));
            materials.push(new Material("Gasoline", 43, 0.53, 0.94, 116));
            materials.push(new Material("Glycerine", 78.7, 0.58, 1.97, ""));
            materials.push(new Material("HCI 100%", 66.5, 0.93, "", ""));
            materials.push(new Material("Naphthalene", 54.1, 0.396, 103, ""));
            materials.push(new Material("Oil SAE 10-30 10-40", 55.4, 0.43, "", ""));
            materials.push(new Material("Paraffin Melted", 56, 0.69, 1.68, 70));
            materials.push(new Material("Transformer Oils", 56.3, 0.42, 0.9, ""));
            materials.push(new Material("Propyl Alcohol", 50.2, 0.57, 295.2, ""));
            materials.push(new Material("Sulfuric Acid 20%", 71, 0.84, "", ""));
            materials.push(new Material("Sulfuric Acid 60%", 93.5, 0.52, 2.88, ""));
            materials.push(new Material("Sulfuric Acid 98%", 114.7, 0.35, 1.8, 219));
            materials.push(new Material("Trichloroethylene", 91.3, 0.23, 0.84, 103));
            materials.push(new Material("Turpentine", 54, 0.42, 133, ""));
            materials.push(new Material("Vegetable Oil", 57.5, 0.43, "", ""));
            materials.push(new Material("Water", 62.4, 1, 4.08, 965));
            console.log("loaded materials object");
        }
    };
})();

let materialsEmissivity = [];

function MaterialEmissivity(name, emissivity) {
    this.name = name;
    this.emissivity = emissivity;
}

var LoadMaterialsEmissivityObject = (function () {
    var executed = false;
    return function () {
        if (!executed) {
            executed = true;
            materialsEmissivity.push(new MaterialEmissivity("Blackbody", 1.0));
            materialsEmissivity.push(new MaterialEmissivity("Aluminum bright foil", 0.07));
            materialsEmissivity.push(new MaterialEmissivity("Aluminum heavy oxide", 0.22));
            materialsEmissivity.push(new MaterialEmissivity("Aluminum anodized", 0.82));
            materialsEmissivity.push(new MaterialEmissivity("Brass polished", 0.04));
            materialsEmissivity.push(new MaterialEmissivity("Brass heavy oxide", 0.6));
            materialsEmissivity.push(new MaterialEmissivity("Carbon", 0.95));
            materialsEmissivity.push(new MaterialEmissivity("Copper polished", 0.03));
            materialsEmissivity.push(new MaterialEmissivity("Copper heavy oxide", 0.8));
            materialsEmissivity.push(new MaterialEmissivity("Glass", 0.9));
            materialsEmissivity.push(new MaterialEmissivity("Gold", 0.02));
            materialsEmissivity.push(new MaterialEmissivity("Iron cast heavy oxide", 0.85));
            materialsEmissivity.push(new MaterialEmissivity("Paint (non-metallic)", 0.98));
            materialsEmissivity.push(new MaterialEmissivity("Paper", 0.9));
            materialsEmissivity.push(new MaterialEmissivity("Plastics (typical)", 0.95));
            materialsEmissivity.push(new MaterialEmissivity("Rubber", 0.95));
            materialsEmissivity.push(new MaterialEmissivity("Silver", 0.02));
            materialsEmissivity.push(new MaterialEmissivity("Steel mild polished", 0.1));
            materialsEmissivity.push(new MaterialEmissivity("Steel mild oxide", 0.85));
            materialsEmissivity.push(new MaterialEmissivity("Stainless polished", 0.17));
            materialsEmissivity.push(new MaterialEmissivity("Stainless steel heavy oxide", 0.85));
            materialsEmissivity.push(new MaterialEmissivity("Water", 0.98));
            materialsEmissivity.push(new MaterialEmissivity("Zinc", 0.25));
            console.log("loaded materials emissivity object");
        }
    };
})();

function LoadDataObjects() {
    LoadMaterialsObject();
    LoadMaterialsEmissivityObject();
}
