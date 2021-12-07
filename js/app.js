// create local scope
(function() {
    // constants 
    // function that holds template for simple conversion by multiplication
    //
    //  @param value        {number}
    //  @param multiplier   {number}    -> number that multiplied for value gives us the conversion value
    //  @param operator = * {string}    -> used for the formula
    //  @return {
    //      formula     {string}    -> formula for display     
    //      value       {number}    -> converted value  
    //  }
    function PRODUCT(value, multiplier, operator = '*') {
        return {
            formula: `<strong>${value}</strong> ${operator} ${multiplier}`,
            value: value * (operator =='*' ? multiplier : 1/multiplier)
        };       
    }

    //  function  for conversions that need division
    function DIVISION(value, divider) {
        // calls PRODUCT with a / operator to change the multiplier and formula
        return PRODUCT(value, divider, '/');
    }

    /* Object literal that contains the conversion paths and methods to convert
        if wanting to convert Celsius to Farenheit the path would be

        CONVERT             -> constant name
        +-temperature       -> measurement group
          +-c               -> base value to convert
            +-f(value)      -> method that return the converted value and formula to display

        Every conversion method works as follow:

        @param value    {number}    -> value to convert
        @return {
            formula     {string}    -> formula for display     
            value       {number}    -> converted value
        }      
    */
    const CONVERT = {
        // measurement groups
        tem: {            
            name: 'Temperature', // name that identifies the group            
            c: {                
                name: 'Celsius', // name of the measurement unit
                symbol: '°C', // symbol of the measurement unit
                // method to convert to Farenheit                
                f(value) {
                    return {                        
                        formula: `(<strong>${value}</strong> * 9/5) + 32`,
                        value: (value * (9/5)) + 32
                    };
                },
                // method to convert to Kelvin
                k(value) {
                    return {
                        formula: `<strong>${value}</strong> + ${CONVERT.tem.k.CONSTANT}`,
                        value: value + CONVERT.tem.k.CONSTANT
                    };
                }
            },
            f: {
                name: 'Farenheit',
                symbol: '°F',
                // method to convert to Farenheit
                c(value) {
                    return {
                        formula: `(<strong>${value}</strong> - 32) * 5/9`,
                        value: (value - 32) * (5/9)
                    };
                },
                // method to convert to Kelvin
                k(value) {
                    let c = this.c(value);
                    return {
                        formula: c.formula + ' + ' + CONVERT.tem.k.CONSTANT,
                        value: c.value + CONVERT.tem.k.CONSTANT
                    };
                }
            },
            k: {
                name: 'Kelvin',
                symbol: '°K',                
                CONSTANT: 273.15, // Kelvin conversion constant                        
                // method to convert to Celsius                
                c(value) {
                    return {
                        formula: `<strong>${value}</strong> - ${CONVERT.tem.k.CONSTANT}`,
                        value: value - CONVERT.tem.k.CONSTANT
                    };                
                },
                // method to convert to Farenheit
                f(value) {
                    let c = this.c(value);
                    return {
                        formula: `(${c.formula}) * 9/5 + 32`,
                        value: CONVERT.temp.c.f(c.value)
                    };
                }
            }
        },
        len: {
            name: 'Length',            
            m: {
                name: 'Meter',
                symbol: 'm',
                FT: 3.28084, 
                YD: 1.09361,   
                IN: 39.3701,
                ft(value) {
                    return PRODUCT(value, this.FT);                    
                },
                yd(value) {
                    return PRODUCT(value, this.YD);                    
                },
                in(value) {
                    return PRODUCT(value, this.IN);                    
                },
                mi(value) {
                    return DIVISION(value, CONVERT.len.mi.M);                    
                }
            },
            ft: {
                name: 'Foot',
                symbol: 'ft',
                IN: 12,
                m(value) {
                    return DIVISION(value, CONVERT.len.m.FT);  
                },
                in(value) {
                    return PRODUCT(value, this.IN);  
                },
                yd(value) {
                    return DIVISION(value, CONVERT.len.yd.FT);  
                },
                mi(value) {
                    return DIVISION(value, CONVERT.len.mi.FT);  
                }
            },
            yd: {
                name: 'Yard',
                symbol: 'yd',
                FT: 3,
                IN: 36,
                m(value) {
                    return DIVISION(value, CONVERT.len.m.YD);                      
                },
                ft(value) {
                    return PRODUCT(value, this.FT);                      
                },                
                in(value) {
                    return PRODUCT(value, this.IN);  
                },
                mi(value) {
                    return DIVISION(value, CONVERT.len.mi.YD);                      
                }
            },
            in: {
                name: 'Inch',
                symbol: 'in',
                m(value) {
                    return DIVISION(value, CONVERT.len.m.IN);                    
                },
                ft(value) {
                    return DIVISION(value, CONVERT.len.ft.IN);                    
                },                
                yd(value) {
                    return DIVISION(value, CONVERT.len.yd.IN);                    
                },
                mi(value) {
                    return DIVISION(value, CONVERT.len.mi.IN);
                }
            },
            mi: {
                name: 'Mile',
                symbol: 'mi',
                M: 1609.344,
                FT: 5280,
                YD: 1760,
                IN: 63360,
                m(value) {
                    return PRODUCT(value, this.M);                    
                },
                ft(value) {
                    return PRODUCT(value, this.FT);
                },
                yd(value) {
                    return PRODUCT(value, this.YD);
                },
                in(value) {
                    return PRODUCT(value, this.IN);
                }                
            }
        },
        vol: {
            name: 'Volume',
            l: {
                name: 'Liter',
                symbol: 'l',
                FLOZ: 33.814, 
                QT: 1.05669,               
                floz(value) {
                    return PRODUCT(value, this.FLOZ);                    
                },
                m3(value) {
                    return DIVISION(value, CONVERT.vol.m3.L);                    
                },
                qt(value) {
                    return PRODUCT(value, this.QT);                    
                }, 
                cuft(value) {
                    return DIVISION(value, CONVERT.vol.cuft.L);                    
                }
            },
            floz: {
                name: 'Fluid ounce',
                symbol: 'fl oz',
                l(value) {
                    return DIVISION(value, CONVERT.vol.l.FLOZ);                    
                },
                m3(value) {
                    return DIVISION(value, CONVERT.vol.m3.FLOZ);                   
                },
                qt(value) {
                    return DIVISION(value, CONVERT.vol.qt.FLOZ);                  
                }, 
                cuft(value) {
                    return DIVISION(value, CONVERT.vol.cuft.FLOZ);
                }
            },
            m3: {
                name: 'Cubi meter',
                symbol: 'm³',
                L: 1000,
                FLOZ: 33814,
                QT: 1056.68821,
                CUFT: 35.314667,
                l(value) {
                    return PRODUCT(value, this.L);                    
                },                
                floz(value) {
                    return PRODUCT(value, this.FLOZ);                    
                },
                qt(value) {
                    return PRODUCT(value, this.QT);                    
                }, 
                cuft(value) {
                    return PRODUCT(value, this.CUFT);                    
                }
            },
            qt: {
                name: 'Quart',
                symbol: 'qt',
                FLOZ: 32,
                l(value) {
                    return DIVISION(value, CONVERT.vol.l.QT);                    
                },
                m3(value) {
                    return DIVISION(value, CONVERT.vol.m3.QT);                   
                },
                floz(value) {
                    return PRODUCTR(value, this.FLOZ);                  
                }, 
                cuft(value) {
                    return DIVISION(value, CONVERT.vol.cuft.QT);
                }
            },
            cuft: {
                name: 'Cubic foot',
                symbol: 'ft³',
                L: 28.316846592,
                FLOZ: 957.506494,
                QT: 29.9221,
                l(value) {
                    return PRODUCT(value, this.L);
                },
                floz(value) {
                    return PRODUCT(value, this.FLOZ);
                },
                m3(value) {
                    return DIVISION(value, CONVERT.vol.m3.CUFT);
                },
                qt(value) {
                    return PRODUCT(value, this.QT);
                }
            }
        },

    };

    // control variables
    let lastInputIndex = 0; // keep track of what input was used last, to know in what direction we need to update
    // elements
    let unitSelects = document.querySelectorAll('.unitSelect');
    let values = document.querySelectorAll('.value');
    let decimalPrecision = document.getElementById('decimalPrecision');
    
    // attach events to selects and populate options
    unitSelects.forEach((select, index) => {
        // load options
        for(let groupKey in CONVERT) {
            let group = CONVERT[groupKey]; // get group from CONVERT
            let groupDOM = document.createElement('optgroup'); // create a new group                   
            groupDOM.label = group.name;
            // load options from group
            for(let key in group) {                
                let unit = group[key]; // get measurement unit from group
                // if the unit is an object it is an option and must be add to the select
                if(typeof unit == 'object') {
                    let unitDOM = document.createElement('option'); // create new option
                    unitDOM.value = key; // value = key       
                    unitDOM.setAttribute('group', groupKey); // set the group for unit
                    unitDOM.setAttribute('symbol', unit.symbol); // set the symbol for unit
                    unitDOM.innerHTML = unit.name; // display name for the unit
                    groupDOM.appendChild(unitDOM); // add the option to the group
                }
            }  
            select.appendChild(groupDOM);          
        }
        // add onchange
        // use an anonymous function to send our own parameters
        select.onchange = () => onUnitChange(select, index);        
    });

    // attach events to inputs
    values.forEach((input, index) => {
        input.onkeyup = (event) => onValueChange(index);
    });

    // attach event onchange to decimal precision slider
    decimalPrecision.onchange = updateDecimalPrecision;
    // call update once to get the starting value
    updateDecimalPrecision();
    
    // disable inputs
    setValuesEnabled(false);

    // end intialization

    // callback unit selection change
    // 
    // Checks that both selects are using units in the same group
    // if not the other select is resetted 
    //
    // @param select    {SELECT-DOM}
    // @param index     {number}
    function onUnitChange(select, index) {
        let selectedOption = select.selectedOptions[0]; // selected option on the select that triggered the event
        let otherSelect = unitSelects[other(index)]; // the other select 
        // update unit symbol
        document.getElementById('unitSymbol' + index).innerHTML = selectedOption.getAttribute('symbol');
        // compare both selection groups
        if(selectedOption.getAttribute('group') !== otherSelect.selectedOptions[0].getAttribute('group') || selectedOption.value == otherSelect.selectedOptions[0].value) {
            // if different or same unit reset the other select
            otherSelect.selectedIndex = 0;            
            setValuesEnabled(false);
        } else {
            // recalculate value using the other intpu as source
            calculateValue(other(index));
            setValuesEnabled(true);
        }        
    }

    // callback onchange for inputs used as values
    //
    // @param index             {number}
    function onValueChange(index) {  
        // check if the value was changed      
        console.log("keyup", index);
        if(calculateValue(index)) {
            // updates lastInputIndex if the value was changed
            lastInputIndex = index;           
        }
    }

    // Determines the path to get the conversion method and obtains the formula and converted value
    // depending on which input triggers the event the route would be left to right or viceversa 
    //
    // @param index             {number}    // input that originates the calculation
    // @return                  {boolean}   // true if everything worked out, false if there was a problem
    function calculateValue(index) {        
        let input = values[index];
        let from = unitSelects[index].selectedOptions[0]; // selected option from same side as the input that trigger the change
        let to = unitSelects[other(index)].selectedOptions[0]; // selected option for result of convertion
        let resultDOM = values[other(index)]; // value that will receive the converted option
        // if any of the selects contains an invalid option
        if(from.value == '-' || to.value == '-') { // return false without change and reset
            return false;
        }
        // if not convert value
        console.debug(from.getAttribute('group'),CONVERT[from.getAttribute('group')][from.value][to.value](input.value));
        let result = CONVERT[from.getAttribute('group')][from.value][to.value](input.value);
        // set converted value
        resultDOM.value = result.value.toFixed(decimalPrecision.value);
        // display formula of conversion
        displayFormula(result.formula + ` = <strong>${resultDOM.value} ${to.getAttribute('symbol')}</strong>` );     
        // if method finishes without problems
        return true;
    }
    
    // callback for onchange decimalPrecision
    // updates the decimal precision display and the values with the precision selected
    function updateDecimalPrecision() {
        // update the precision displayed
        document.getElementById('decimalPrecisionDisplay').innerText = decimalPrecision.value;
        // update the precision on the values
       values[lastInputIndex].value = parseFloat(values[lastInputIndex].value).toFixed(decimalPrecision.value); // update precision last input value
       calculateValue(lastInputIndex); // update last calculated value with new precision
    }

    // display formula
    function displayFormula(formula) {
        document.getElementById('details').innerHTML = formula;
    }

    // enables or disables the inputs
    function setValuesEnabled(enable) {
        values.forEach(input => {
            if(!enable) {
                // add attribute disabled to disable
                input.setAttribute('disabled', true);
            } else {
                // remove attribute disabled to enable
                input.removeAttribute('disabled');
            }
        });
    }

    // provides the other index from the one provided between 1 and 0
    function other(index) {
        return index == 0 ? 1 : 0;
    }

})();
