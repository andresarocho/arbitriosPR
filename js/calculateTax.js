var PRICE_CONTRIBUTIVO1 = 6170.0;
var PRICE_CONTRIBUTIVO2 = 10690.0;
var PRICE_CONTRIBUTIVO3 = 21380.0;
var PRICE_CONTRIBUTIVO4 = 31780.0;
var PRICE_CONTRIBUTIVO5 = 44890.0;

var FIXED_PRICE1 = 637.50;
var FIXED_PRICE2 = 1098.00;
var FIXED_PRICE3 = 3188.35;
var FIXED_PRICE4 = 5575.15;
var FIXED_PRICE5 = 9253.10;

var FIXED_PERCENTAGE1 = 10.2;
var FIXED_PERCENTAGE2 = 19.6;
var FIXED_PERCENTAGE3 = 23.0;
var FIXED_PERCENTAGE4 = 27.2;
var FIXED_PERCENTAGE5 = 34.0;

var RANGE_PRICE1 = "Precio es menor o igual a " + accounting.formatMoney(PRICE_CONTRIBUTIVO1);
var RANGE_PRICE2 = "Precio es mayor de " + accounting.formatMoney(PRICE_CONTRIBUTIVO1) + " hasta " + accounting.formatMoney(PRICE_CONTRIBUTIVO2);
var RANGE_PRICE3 = "Precio es mayor de " + accounting.formatMoney(PRICE_CONTRIBUTIVO2) + " hasta " + accounting.formatMoney(PRICE_CONTRIBUTIVO3);
var RANGE_PRICE4 = "Precio es mayor de " + accounting.formatMoney(PRICE_CONTRIBUTIVO3) + " hasta " + accounting.formatMoney(PRICE_CONTRIBUTIVO4);
var RANGE_PRICE5 = "Precio es mayor de " + accounting.formatMoney(PRICE_CONTRIBUTIVO4) + " hasta " + accounting.formatMoney(PRICE_CONTRIBUTIVO5);
var RANGE_PRICE6 = "Precio es mayor de " + accounting.formatMoney(PRICE_CONTRIBUTIVO5);




var RANGE_TAX1 =  accounting.formatMoney(FIXED_PRICE1) + " (impuesto mínimo)";
var RANGE_TAX2 = accounting.formatMoney(FIXED_PRICE1) + " más el %"+ FIXED_PERCENTAGE1 +" del exceso de " + accounting.formatMoney(PRICE_CONTRIBUTIVO1);
var RANGE_TAX3 = accounting.formatMoney(FIXED_PRICE2) + " más el %"+ FIXED_PERCENTAGE2 +" del exceso de " + accounting.formatMoney(PRICE_CONTRIBUTIVO2);
var RANGE_TAX4 = accounting.formatMoney(FIXED_PRICE3) + " más el %"+ FIXED_PERCENTAGE3 +" del exceso de " + accounting.formatMoney(PRICE_CONTRIBUTIVO3);
var RANGE_TAX5 = accounting.formatMoney(FIXED_PRICE4) + " más el %"+ FIXED_PERCENTAGE4 +" del exceso de " + accounting.formatMoney(PRICE_CONTRIBUTIVO4);
var RANGE_TAX6 = accounting.formatMoney(FIXED_PRICE5) + " más el %"+ FIXED_PERCENTAGE5 +" del exceso de " + accounting.formatMoney(PRICE_CONTRIBUTIVO5);

var calculateTax = function(carPrice) {

    console.log("Valor a calcular: " + carPrice);
    if(carPrice)
	{
		var taxAndPercentage = calculateFixedTaxAndPercentage(carPrice);
        var taxToPay = taxAndPercentage.fixedTax*1 + ((carPrice - taxAndPercentage.excess*1)*(taxAndPercentage.percentage));
        return { "taxToPay": taxToPay, "totalPrice" :taxToPay+carPrice*1 , "range": taxAndPercentage.range, "taxRange": taxAndPercentage.taxRange};
	}
	else
		return 0.0;
}

function calculateFixedTaxAndPercentage(carPrice) 
{
    if(carPrice <= PRICE_CONTRIBUTIVO1)
    {
    	return { "fixedTax": FIXED_PRICE1, "percentage" :0 , "excess" :0, "range": RANGE_PRICE1, "taxRange": RANGE_TAX1};
    }
    else if (carPrice <= PRICE_CONTRIBUTIVO2)
    {
    	return  {"fixedTax":FIXED_PRICE1 , "percentage":FIXED_PERCENTAGE1/100.0, "excess":PRICE_CONTRIBUTIVO1, "range": RANGE_PRICE2, "taxRange": RANGE_TAX2};
    }
    else if (carPrice <= PRICE_CONTRIBUTIVO3)
    {
    	return {"fixedTax":FIXED_PRICE2 , "percentage":FIXED_PERCENTAGE2/100.0, "excess":PRICE_CONTRIBUTIVO2, "range": RANGE_PRICE3, "taxRange": RANGE_TAX3};
    }
    else if (carPrice <= PRICE_CONTRIBUTIVO4)
    {
		return {"fixedTax":FIXED_PRICE3 , "percentage":FIXED_PERCENTAGE3/100.0, "excess":PRICE_CONTRIBUTIVO3, "range": RANGE_PRICE4, "taxRange": RANGE_TAX4};    
	}
    else if (carPrice <= PRICE_CONTRIBUTIVO5)
    {
    	 return {"fixedTax":FIXED_PRICE4 , "percentage":FIXED_PERCENTAGE4/100.0, "excess":PRICE_CONTRIBUTIVO4, "range": RANGE_PRICE5, "taxRange": RANGE_TAX5};
    }
    else
    {
    	 return {"fixedTax":FIXED_PRICE5 , "percentage":FIXED_PERCENTAGE5/100.0, "excess":PRICE_CONTRIBUTIVO5, "range": RANGE_PRICE6, "taxRange": RANGE_TAX6};
    }
}