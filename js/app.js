// create local scope
//(function() {
    // constants
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
        temp: {            
            name: 'Temperature', // name that identifies the group            
            K_CONSTANT: 273.15, // Kelvin conversion constant            
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
                        formula: `<strong>${value}</strong> + ${CONVERT.temp.K_CONSTANT}`,
                        value: value + CONVERT.temp.K_CONSTANT
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
                        formula: c.formula + ' + ' + CONVERT.temp.K_CONSTANT,
                        value: c.value + CONVERT.temp.K_CONSTANT
                    };
                }
            },
            k: {
                name: 'Kelvin',
                symbol: '°K',                
                // method to convert to Celsius
                c(value) {
                    return {
                        formula: `<strong>${value}</strong> - ${CONVERT.temp.K_CONSTANT}`,
                        value: value - CONVERT.temp.K_CONSTANT
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
    };

    // elements
    let unitSelects = document.querySelectorAll('.unitSelect');
    let values = document.querySelectorAll('.value');
    let decimalPrecision = document.getElementById('decimalPrecision');

    // attach event onchange to decimal precision slider
    decimalPrecision.onchange = updateDecimalPrecision;
    
    // attach events to selects and populate options
    unitSelects.forEach((select, index) => {
        // add onchange
        // use an anonymous function to send our own parameters
        select.onchange = () => onUnitChange(select, index); 
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
                    unitDOM.innerHTML = unit.name; // display name for the unit
                    groupDOM.appendChild(unitDOM); // add the option to the group
                }
            }  
            select.appendChild(groupDOM);          
        }
    });

    // attach events to inputs
    values.forEach((input, index) => {
        input.onkeyup = (event) => onValueChange(input, index);
    });

    // end intialization

    // callback unit selection change
    // 
    //
    // @param select    {SELECT-DOM}
    // @param index     {number}
    function onUnitChange(select, index) {
        let selectedOption = select.selectedOptions[0];
        let otherOption = ((index == 0) ? unitSelects[1] : unitSelects[0]).selectedOptions[0];
        if(selectedOption.attributes.group !== otherOption.attributes.group) {
            otherOption.attributes.selectedIndex = 0;
        } 
    }

    // callback onchange for inputs used as values
    // @param input    {INPUT-DOM}
    // @param index     {number}
    function onValueChange(input, index) {
        console.log({input, index})
    }
    
    // callback for onchange decimalPrecision
    // updates the decimal precision display and the values with the precision selected
    function updateDecimalPrecision() {
        // update the precision displayed
        document.getElementById('decimalPrecisionDisplay').innerText = decimalPrecision.value;
        // update the precision on the values
    }

//})();