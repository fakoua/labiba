export function declaration(node) {
    switch (node.kind) {
        case 'متغير':
            return 'var'
        case 'ثابت':
            return 'const'
        case 'مقيد':
            return 'let'
        default:
            return node.kind
    }
}

export function transformGlobal(objectName) {
    const globalOject = {
        properties: [
            {js: 'parseInt', la: 'الى_صحيح'},
            {js: 'parseFloat', la: 'الى_حقيقي'},
            {js: 'isNaN', la: 'هو_ليس_رقم'},
            {js: 'isFinite', la: 'هو_منتهي'},
            {js: 'decodeURI', la: 'فك_تشفير_رابط'},
            {js: 'decodeURIComponent', la: 'فك_تشفير_رابط_شامل'},
            {js: 'encodeURI', la: 'تشفير_رابط'},
            {js: 'encodeURIComponent', la: 'تشفير_رابط_شامل'},
            {js: 'escape', la: 'تشفير'},
            {js: 'unescape', la: 'فك_تشفير'},
        ]
    }

    function getGlobalName(objectName) {
        console.log('============================')
        let found = globalOject.properties.find((el) => {
            return el.la === objectName;
        })
        console.log('------------------' + found)
        return found ? found.js : objectName;
    }
    return getGlobalName(objectName);
}

export function tranformNew(objectName) {
    const newObject = [
        {js: 'Boolean', la: 'منطقي'},
        {js: 'Number', la: 'رقم'},
        {js: 'String', la: 'نص'},
        {js: 'Date', la: 'تاريخ'},
        {js: 'Array', la: 'مجموعة'},
        {js: 'Function', la: 'مهمة'},
        {js: 'Object', la: 'كائن'},
    ];

    let found = newObject.find((el) => {
        return el.la === objectName;
    });

    return found ? found.js : objectName;
}

export function transformMember(objectName, propertyName) {
    const globalOject = {
        properties: [
            {js: 'toString', la: 'الى_نص'},
            {js: 'toDateString', la: 'الى_تاريخ_نصي'},
            {js: 'toTimeString', la: 'اىل_وقت_نصي'},
            {js: 'toLocaleString', la: 'الى_نص_موضعي'},
            {js: 'toLocaleDateString', la: 'الى_تاريخ_نصي_موضعي'},
            {js: 'toLocaleTimeString', la: 'الى_وقت_نصي_موضعي'},
            {js: 'valueOf', la: 'قيمة'},
            {js: 'getTime', la: 'احصل_وقت'},
            {js: 'getFullYear', la: 'احصل_سنة_كاملة'},
            {js: 'getUTCFullYear', la: 'احصل_سنة_كاملة_عالمي'},
            {js: 'getMonth', la: 'احصل_شهر'},
            {js: 'getUTCMonth', la: 'احصل_شهر_عالمي'},
            {js: 'getDate', la: 'احصل_تاريخ'},
            {js: 'getUTCDate', la: 'احصل_تاريخ_عالمي'},
            {js: 'getDay', la: 'احصل_يوم'},
            {js: 'getUTCDay', la: 'احصل_يوم_عالمي'},
            {js: 'getHours', la: 'احصل_ساعة'},
            {js: 'getUTCHours', la: 'احصل_ساعة_عالمي'},
            {js: 'getMinutes', la: 'احصل_دقائق'},
            {js: 'getUTCMinutes', la: 'احصل_دقائق_عالمي'},
            {js: 'getSeconds', la: 'احصل_ثواني'},
            {js: 'getUTCSeconds', la: 'احصل_ثواني_عالمي'},
            {js: 'getMilliseconds', la: 'احصل_مللي_ثواني'},
            {js: 'getUTCMilliseconds', la: 'احصل_مللي_ثواني_عالمي'},
            {js: 'getTimeZoneOffset', la: 'احصل_فرق_توقيت_زمني'},
            {js: 'setTime', la: 'اضبط_وقت'},
            {js: 'setMilliseconds', la: 'اضبط_مللي_ثواني'},
            {js: 'setUTCMilliseconds', la: 'اضبط_مللي_ثواني_عالمي'},
            {js: 'setSeconds', la: 'اضبط_ثواني'},
            {js: 'setUTCSeconds', la: 'اضبط_ثواني_عالمي'},
            {js: 'setMinutes', la: 'اضبط_دقائق'},
            {js: 'setUTCMinutes', la: 'اضبط_دقائق_عالمي'},
            {js: 'setHours', la: 'اضبط_ساعة'},
            {js: 'setUTCHours', la: 'اضبط_ساعة_عالمي'},
            {js: 'setDate', la: 'اضبط_تاريخ'},
            {js: 'setUTCDate', la: 'اضبط_تاريخ_عالمي'},
            {js: 'setMonth', la: 'اضبط_شهر'},
            {js: 'setUTCMonth', la: 'اضبط_شهر_عالمي'},
            {js: 'setYear', la: 'اضبط_سنة'},
            {js: 'setFullYear', la: 'اضبط_سنة_كاملة'},
            {js: 'setUTCFullYear', la: 'اضبط_سنة_كاملة_عالمي'},
            {js: 'toUTCString', la: 'الى_نص_عالمي'},
            {js: 'toGMTString', la: 'الى_نص_غرينتش'},
            {js: 'toISOString', la: 'الى_نص_جودة'},
            {js: 'toJSON', la: 'الى_جايسون'},
            {js: 'toFixed', la: 'الى_ثابت'},
            {js: 'toExponential', la: 'الى_اسية'},
            {js: 'toPrecision', la: 'اىل_دقة'},
            {js: 'charAt', la: 'حرف_عند'},
            {js: 'charCodeAt', la: 'رقم_حرف_عند'},
            {js: 'codePointAt', la: 'رقم_حرف_عالمي_عند'},
            {js: 'endsWith', la: 'ينتهي_ب'},
            {js: 'localeCompare', la: 'مقارنة_محلية'},
            {js: 'match', la: 'تطابق'},
            {js: 'normalize', la: 'تطبيع'},
            {js: 'padEnd', la: 'اضافة_فداية'},
            {js: 'padStart', la: 'إضافة_نهاية'},
            {js: 'repeat', la: 'كرر'},
            {js: 'replace', la: 'بدل'},
            {js: 'search', la: 'ابحث'},
            {js: 'split', la: 'تقسيم'},
            {js: 'startsWith', la: 'يبدا_ب'},
            {js: 'substr', la: 'جزء_من_طول'},
            {js: 'substring', la: 'جزء'},
            {js: 'toLowerCase', la: 'الى_حرف_صغير'},
            {js: 'toLocaleLowerCase', la: 'الى_حرف_صغير_محلي'},
            {js: 'toUpperCase', la: 'الى_حرف_كبير'},
            {js: 'toLocaleUpperCase', la: 'الى_حرف_كبير_محلي'},
            {js: 'trim', la: 'تقليم'},
            {js: 'concat', la: 'دمج'},
            {js: 'copyWithin', la: 'نسخ'},
            {js: 'entries', la: 'قيود'},
            {js: 'fill', la: 'املء'},
            {js: 'join', la: 'ضم'},
            {js: 'find', la: 'اوجد'},
            {js: 'findIndex', la: 'اوجد_فهرس'},
            {js: 'includes', la: 'يشمل'},
            {js: 'keys', la: 'مفاتيح'},
            {js: 'pop', la: 'سحب'},
            {js: 'push', la: 'دفع'},
            {js: 'reverse', la: 'اعكس'},
            {js: 'shift', la: 'انقل'},
            {js: 'slice', la: 'تشريح'},
            {js: 'sort', la: 'رتب'},
            {js: 'splice', la: 'لصق'},
            {js: 'unshift', la: 'انقل_عكسي'},
            {js: 'indexOf', la: 'فهرس'},
            {js: 'lastIndexOf', la: 'فهرس_اخير'},
            {js: 'every', la: 'كل'},
            {js: 'some', la: 'بعض'},
            {js: 'forEach', la: 'تكرار_الكل'},
            {js: 'map', la: 'خارطة'},
            {js: 'filter', la: 'تصفية'},
            {js: 'reduce', la: 'قلص'},
            {js: 'reduceRight', la: 'قلس_اخير'},
            {js: 'values', la: 'قيم'},
            {js: 'apply', la: 'تطبيق'},
            {js: 'call', la: 'نادي'},
            {js: 'bind', la: 'ربط'},
        ]
    }
    const numberObject = {
        js: 'Number',
        la: 'رقم',
        properties: [
            {js: 'NaN', la: 'حلل'},
            {js: 'NEGATIVE_INFINITY', la: 'حلل'},
            {js: 'POSITIVE_INFINITY', la: 'حلل'},
            {js: 'MAX_VALUE', la: 'حلل'},
            {js: 'MIN_VALUE', la: 'حلل'},
            {js: 'EPSILON', la: 'حلل'},
            {js: 'MAX_SAFE_INTEGER', la: 'حلل'},
            {js: 'MIN_SAFE_INTEGER', la: 'حلل'},
            {js: 'isFinite', la: 'حلل'},
            {js: 'isInteger', la: 'حلل'},
            {js: 'isSafeInteger', la: 'حلل'},
            {js: 'isNaN', la: 'حلل'},
            {js: 'toFixed', la: 'حلل'},
            {js: 'toExponential', la: 'حلل'},
            {js: 'toPrecision', la: 'حلل'},
        ]
    }
    const jsonObject = {
        js: 'JSON',
        la: 'جايسون',
        properties: [
            {js: 'parse', la: 'حلل'},
            {js: 'stringify', la: 'الى_نص'},
        ]
    }
    const mathObject = {
        js: 'Math',
        la: 'رياضيات',
        properties: [
            {js: 'E', la: 'نيريبي_'},
            {js: 'LN10', la: 'اس10_'},
            {js: 'LN2', la: 'اس2_'},
            {js: 'LOG2E', la: 'اس2نيريبي_'},
            {js: 'LOG10E', la: 'اس10نيريبي_'},
            {js: 'PI', la: 'باي_'},
            {js: 'SQRT1_2', la: 'تربيعي1_2_'},
            {js: 'SQRT2', la: 'تربيعي2_'},
            {js: 'abs', la: 'مطلقة'},
            {js: 'acos', la: 'جيب_تام_معكوس'},
            {js: 'acosh', la: 'جيب_تام_زائدي_معكوس'},
            {js: 'asin', la: 'جيب_عكسي'},
            {js: 'asinh', la: 'جيب_زائدي_معكوس'},
            {js: 'atan', la: 'ظل_معكوس'},
            {js: 'atanh', la: 'ظل_زائدي_معكوس'},
            {js: 'atan2', la: 'ظل_معكوس2'},
            {js: 'cbrt', la: 'جذر_تكعيبي'},
            {js: 'ceil', la: 'صحيح'},
            {js: 'clz32', la: 'عدد_اصفار32'},
            {js: 'cos', la: 'جيب_تام'},
            {js: 'cosh', la: 'جيب_تام_زائدي'},
            {js: 'exp', la: 'اسية'},
            {js: 'expm1', la: 'اسية_بلا1'},
            {js: 'floor', la: 'سطح'},
            {js: 'fround', la: 'تقريب_فواصل'},
            {js: 'hypot', la: 'وتر'},
            {js: 'imul', la: 'ضرب'},
            {js: 'log', la: 'اس'},
            {js: 'log10', la: 'اس10'},
            {js: 'log1p', la: 'اس_اضف1'},
            {js: 'log2', la: 'اس2'},
            {js: 'max', la: 'اقصى'},
            {js: 'min', la: 'ادنى'},
            {js: 'pow', la: 'رفع'},
            {js: 'random', la: 'عشوائي'},
            {js: 'round', la: 'تقريب'},
            {js: 'sin', la: 'جيب'},
            {js: 'sinh', la: 'جيب_زائدي'},
            {js: 'sqrt', la: 'جذر_تربيعي'},
            {js: 'tan', la: 'ظل'},
            {js: 'tanh', la: 'ظل_زائدي'},
            {js: 'trunc', la: 'بتر'},
        ]
    };

    const jsFunctions = [
        mathObject,
        jsonObject,
        numberObject
    ];
/////////////////////////////////////////

    function getObjectName(objectName) {
        let found = jsFunctions.find((el) => {
                        return el.la === objectName;
                    });
        return found ? found.js : objectName;
    }

    function getPropertyName(objectName, propertyName) {
        let found = jsFunctions.find((el) => {
                        return el.la === objectName;
                    });
        if (found) {
            //Example Math.PI, Math.sin(12) ...
            let prop = found.properties.find((el) => {
                return el.la === propertyName;
            });
            if (prop) {
                return prop.js;
            } else {
                // Should Raise Error
                return propertyName;
            }
        } else {
            //Example of d.getDay() while d is date ...
            let prop = globalOject.properties.find( el => {
                return el.la === propertyName;
            })

            return prop ? prop.js : propertyName;
        }
    }

    return {
        objectName: getObjectName(objectName), 
        propertyName: getPropertyName(objectName, propertyName)
    }

       
}



