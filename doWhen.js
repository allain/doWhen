function doWhen(tests, action, pollRate) {    
    tests = [].concat(tests);
    
    function step() {
        var results = [];
        var allPass = true;
        for (var i=0; i<tests.length; i++) {
            var test = tests[i];
            if (typeof test === "function") {
                result = test();
            } else if (typeof test === "string") {
                result = $(test);
                if (result.length === 0) 
                    result = false;
            } else {
                throw "Invalid test type given: " + typeof test;    
            }
            
            if (result === false) {
                allPass = false;
                break;              
            }
            
            results[i] = result;
        }
        
        if (allPass) {
            try {            
                action.apply(window, results);
            } catch (e) {                   
            }
            return false;
        } else {
            return true;
        }
    }
    
    if (step() === true) {
        var intervalId = setInterval(function () {
            if (!step())
                clearInterval(intervalId);
        }, pollRate ? pollRate : 100);
    }
}
