import { truncate } from "fs";
import _ from 'lodash';

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

export function language() {
    return [
        {
            type: 'keyword',
            js: '',
            la: '',
            snippet: '',
            properties: [
                {js: 'break', la: 'خروج', snippet: ''},
                {js: 'case', la: 'حالة', snippet: ''},
                {js: 'catch', la: 'مشكلة', snippet: ''},
                {js: 'continue', la: 'اكمل', snippet: ''},
                {js: 'do', la: 'افعل', snippet: ''},
                {js: 'else', la: 'غير', snippet: ''},
                {js: 'finally', la: 'اخيرا', snippet: ''},
                {js: 'for', la: 'تكرار', snippet: ''},
                {js: 'function', la: 'مهمة', snippet: ''},
                {js: 'if', la: 'اذا', snippet: 'اذا (${1:شرط}) {\n\t$0\n} غير {\n\t\n}'},
                {js: 'return', la: 'ارجاع', snippet: ''},
                {js: 'switch', la: 'فاصل', snippet: ''},
                {js: 'try', la: 'حاول', snippet: ''},
                {js: 'var', la: 'متغير', snippet: ''},
                {js: 'const', la: 'ثابت', snippet: ''},
                {js: 'while', la: 'طالما', snippet: ''},
                {js: 'new', la: 'جديد', snippet: ''},
                {js: 'super', la: 'ابي', snippet: ''},
                {js: 'class', la: 'صنف', snippet: ''},
                {js: 'extends', la: 'يرث', snippet: ''},
                {js: 'export', la: 'استيراد', snippet: ''},
                {js: 'void', la: 'فارغ', snippet: ''},
                {js: 'true', la: 'صح', snippet: ''},
                {js: 'false', la: 'غلط', snippet: ''},
                {js: 'typeof', la: 'نوع', snippet: ''},
                {js: 'null', la: 'عقيم', snippet: ''} 
            ]
        },
        {
            type: 'global',
            js: '',
            la: '',
            snippet: '',
            properties: [
                {js: 'parseInt', la: 'الى_صحيح', snippet: 'الى_صحيح'},
                {js: 'parseFloat', la: 'الى_حقيقي', snippet: 'الى_حقيقي'},
                {js: 'isNaN', la: 'هو_ليس_رقم', snippet: 'هو_ليس_رقم'},
                {js: 'isFinite', la: 'هو_منتهي', snippet: 'هو_منتهي'},
                {js: 'decodeURI', la: 'فك_تشفير_رابط', snippet: 'فك_تشفير_رابط'},
                {js: 'decodeURIComponent', la: 'فك_تشفير_رابط_شامل', snippet: 'فك_تشفير_رابط_شامل'},
                {js: 'encodeURI', la: 'تشفير_رابط', snippet: ''},
                {js: 'encodeURIComponent', la: 'تشفير_رابط_شامل', snippet: 'تشفير_رابط_شامل'},
                {js: 'escape', la: 'تشفير', snippet: 'تشفير'},
                {js: 'unescape', la: 'فك_تشفير', snippet: 'فك_تشفير'},
            ]
        }, {
            type: 'class',
            js: 'Array',
            la: 'مجموعة',
            newable: true,
            snippet: 'مجموعة',
            properties:[
                {js: 'toString', la: 'الى_نص', snippet: 'الى_نص'},
                {js: 'concat', la: 'دمج', snippet: 'دمج'},
                {js: 'copyWithin', la: 'نسخ', snippet: 'نسخ'},
                {js: 'entries', la: 'قيود', snippet: 'قيود'},
                {js: 'fill', la: 'املء', snippet: 'املء'},
                {js: 'join', la: 'ضم', snippet: 'ضم'},
                {js: 'find', la: 'اوجد', snippet: 'اوجد'},
                {js: 'findIndex', la: 'اوجد_فهرس', snippet: 'اوجد_فهرس'},
                {js: 'includes', la: 'يشمل', snippet: 'يشمل'},
                {js: 'keys', la: 'مفاتيح', snippet: 'مفاتيح'},
                {js: 'pop', la: 'سحب', snippet: 'سحب'},
                {js: 'push', la: 'دفع', snippet: 'دفع'},
                {js: 'reverse', la: 'اعكس', snippet: 'اعكس'},
                {js: 'shift', la: 'انقل', snippet: 'انقل'},
                {js: 'slice', la: 'تشريح', snippet: 'تشريح'},
                {js: 'sort', la: 'رتب', snippet: 'رتب'},
                {js: 'splice', la: 'لصق', snippet: 'لصق'},
                {js: 'unshift', la: 'انقل_عكسي', snippet: 'انقل_عكسي'},
                {js: 'indexOf', la: 'فهرس', snippet: 'فهرس'},
                {js: 'lastIndexOf', la: 'فهرس_اخير', snippet: 'فهرس_اخير'},
                {js: 'every', la: 'كل', snippet: 'كل'},
                {js: 'some', la: 'بعض', snippet: 'بعض'},
                {js: 'forEach', la: 'تكرار_الكل', snippet: 'تكرار_الكل', autoComplete: true},
                {js: 'map', la: 'خارطة', snippet: 'خارطة'},
                {js: 'filter', la: 'تصفية', snippet: 'تصفية'},
                {js: 'reduce', la: 'قلص', snippet: 'قلص'},
                {js: 'reduceRight', la: 'قلس_اخير', snippet: 'قلس_اخير'},
                {js: 'values', la: 'قيم', snippet: 'قيم'},
            ]
        }, {
            type: 'class',
            js: 'String',
            la: 'نص',
            newable: true,
            snippet: 'نص',
            properties:[
                {js: 'toString', la: 'الى_نص', snippet: 'الى_نص'},
                {js: 'valueOf', la: 'قيمة', snippet: 'قيمة'},
                {js: 'charAt', la: 'حرف_عند', snippet: 'حرف_عند'},
                {js: 'charCodeAt', la: 'رقم_حرف_عند', snippet: 'رقم_حرف_عند'},
                {js: 'codePointAt', la: 'رقم_حرف_عالمي_عند', snippet: 'رقم_حرف_عالمي_عند'},
                {js: 'endsWith', la: 'ينتهي_ب', snippet: 'ينتهي_ب'},
                {js: 'localeCompare', la: 'مقارنة_محلية', snippet: 'مقارنة_محلية'},
                {js: 'match', la: 'تطابق', snippet: 'تطابق'},
                {js: 'normalize', la: 'تطبيع', snippet: 'تطبيع'},
                {js: 'padEnd', la: 'اضافة_فداية', snippet: 'اضافة_فداية'},
                {js: 'padStart', la: 'إضافة_نهاية', snippet: 'إضافة_نهاية'},
                {js: 'repeat', la: 'كرر', snippet: 'كرر'},
                {js: 'replace', la: 'بدل', snippet: 'بدل'},
                {js: 'search', la: 'ابحث', snippet: 'ابحث'},
                {js: 'split', la: 'تقسيم', snippet: 'تقسيم'},
                {js: 'startsWith', la: 'يبدا_ب', snippet: 'يبدا_ب'},
                {js: 'substr', la: 'جزء_من_طول', snippet: 'جزء_من_طول'},
                {js: 'substring', la: 'جزء', snippet: 'جزء'},
                {js: 'toLowerCase', la: 'الى_حرف_صغير', snippet: 'الى_حرف_صغير'},
                {js: 'toLocaleLowerCase', la: 'الى_حرف_صغير_محلي', snippet: 'الى_حرف_صغير_محلي'},
                {js: 'toUpperCase', la: 'الى_حرف_كبير', snippet: 'الى_حرف_كبير'},
                {js: 'toLocaleUpperCase', la: 'الى_حرف_كبير_محلي', snippet: 'الى_حرف_كبير_محلي'},
                {js: 'trim', la: 'تقليم', snippet: 'تقليم'},
                {js: 'concat', la: 'دمج', snippet: 'دمج'},
                {js: 'slice', la: 'تشريح', snippet: 'تشريح'},
                {js: 'indexOf', la: 'فهرس', snippet: 'فهرس'},
                {js: 'lastIndexOf', la: 'فهرس_اخير', snippet: 'فهرس_اخير'},
                {js: 'includes', la: 'يشمل', snippet: 'يشمل'},
            ]
        }, {
            type: 'class',
            js: 'Boolean',
            la: 'منطقي',
            newable: true,
            snippet: 'منطقي',
            properties:[
                {js: 'toString', la: 'الى_نص', snippet: 'الى_نص'},
                {js: 'valueOf', la: 'قيمة', snippet: 'قيمة'},
            ]
        }, {
            type: 'class',
            js: 'Number',
            newable: true,
            la: 'رقم',
            snippet: 'رقم',
            properties:[
                {js: 'toString', la: 'الى_نص', snippet: 'الى_نص', autoComplete: true},
                {js: 'toLocaleString', la: 'الى_نص_موضعي', snippet: 'الى_نص_موضعي'},
                {js: 'valueOf', la: 'قيمة', snippet: 'قيمة'},
                {js: 'toFixed', la: 'الى_ثابت', snippet: 'الى_ثابت'},
                {js: 'toExponential', la: 'الى_اسية', snippet: 'الى_اسية'},
                {js: 'toPrecision', la: 'اىل_دقة', snippet: 'اىل_دقة'},
                {js: 'NEGATIVE_INFINITY', la: '_ناقص_غير_متناهي', snippet: '_ناقص_غير_متناهي', autoComplete: true},
                {js: 'POSITIVE_INFINITY', la: '_زائد_غير_متناهي', snippet: '_زائد_غير_متناهي', autoComplete: true},
                {js: 'MAX_VALUE', la: '_الأقصى', snippet: '_الأقصى', autoComplete: true},
                {js: 'MIN_VALUE', la: '_الأدنى', snippet: '_الأدنى', autoComplete: true},
                {js: 'isFinite', la: 'هو_متناهي', snippet: 'هو_متناهي', autoComplete: true},
                {js: 'isInteger', la: 'هو_صحيح', snippet: 'هو_صحيح', autoComplete: true},
                {js: 'isNaN', la: 'هو_ليس_رقم', snippet: 'هو_ليس_رقم', autoComplete: true},
            ]
        }, {
            type: 'class',
            js: 'Date',
            la: 'تاريخ',
            newable: true,
            snippet: 'تاريخ',
            properties:[
                {js: 'toString', la: 'الى_نص', snippet: 'الى_نص'},
                {js: 'toDateString', la: 'الى_تاريخ_نصي', snippet: 'الى_تاريخ_نصي'},
                {js: 'toTimeString', la: 'اىل_وقت_نصي', snippet: 'اىل_وقت_نصي'},
                {js: 'toLocaleString', la: 'الى_نص_موضعي', snippet: 'الى_نص_موضعي'},
                {js: 'toLocaleDateString', la: 'الى_تاريخ_نصي_موضعي', snippet: 'الى_تاريخ_نصي_موضعي'},
                {js: 'toLocaleTimeString', la: 'الى_وقت_نصي_موضعي', snippet: 'الى_وقت_نصي_موضعي'},
                {js: 'valueOf', la: 'قيمة', snippet: 'قيمة'},
                {js: 'getTime', la: 'احصل_وقت', snippet: 'احصل_وقت'},
                {js: 'getFullYear', la: 'احصل_سنة_كاملة', snippet: 'احصل_سنة_كاملة'},
                {js: 'getUTCFullYear', la: 'احصل_سنة_كاملة_عالمي', snippet: 'احصل_سنة_كاملة_عالمي'},
                {js: 'getMonth', la: 'احصل_شهر', snippet: 'احصل_شهر'},
                {js: 'getUTCMonth', la: 'احصل_شهر_عالمي', snippet: 'احصل_شهر_عالمي'},
                {js: 'getDate', la: 'احصل_تاريخ', snippet: 'احصل_تاريخ'},
                {js: 'getUTCDate', la: 'احصل_تاريخ_عالمي', snippet: 'احصل_تاريخ_عالمي'},
                {js: 'getDay', la: 'احصل_يوم', snippet: 'احصل_يوم'},
                {js: 'getUTCDay', la: 'احصل_يوم_عالمي', snippet: 'احصل_يوم_عالمي'},
                {js: 'getHours', la: 'احصل_ساعة', snippet: 'احصل_ساعة'},
                {js: 'getUTCHours', la: 'احصل_ساعة_عالمي', snippet: 'احصل_ساعة_عالمي'},
                {js: 'getMinutes', la: 'احصل_دقائق', snippet: 'احصل_دقائق'},
                {js: 'getUTCMinutes', la: 'احصل_دقائق_عالمي', snippet: 'احصل_دقائق_عالمي'},
                {js: 'getSeconds', la: 'احصل_ثواني', snippet: 'احصل_ثواني'},
                {js: 'getUTCSeconds', la: 'احصل_ثواني_عالمي', snippet: 'احصل_ثواني_عالمي'},
                {js: 'getMilliseconds', la: 'احصل_مللي_ثواني', snippet: 'احصل_مللي_ثواني'},
                {js: 'getUTCMilliseconds', la: 'احصل_مللي_ثواني_عالمي', snippet: 'احصل_مللي_ثواني_عالمي'},
                {js: 'getTimeZoneOffset', la: 'احصل_فرق_توقيت_زمني', snippet: 'احصل_فرق_توقيت_زمني'},
                {js: 'setTime', la: 'اضبط_وقت', snippet: 'اضبط_وقت'},
                {js: 'setMilliseconds', la: 'اضبط_مللي_ثواني', snippet: 'اضبط_مللي_ثواني'},
                {js: 'setUTCMilliseconds', la: 'اضبط_مللي_ثواني_عالمي', snippet: 'اضبط_مللي_ثواني_عالمي'},
                {js: 'setSeconds', la: 'اضبط_ثواني', snippet: 'اضبط_ثواني'},
                {js: 'setUTCSeconds', la: 'اضبط_ثواني_عالمي', snippet: 'اضبط_ثواني_عالمي'},
                {js: 'setMinutes', la: 'اضبط_دقائق', snippet: 'اضبط_دقائق'},
                {js: 'setUTCMinutes', la: 'اضبط_دقائق_عالمي', snippet: 'اضبط_دقائق_عالمي'},
                {js: 'setHours', la: 'اضبط_ساعة', snippet: 'اضبط_ساعة'},
                {js: 'setUTCHours', la: 'اضبط_ساعة_عالمي', snippet: 'اضبط_ساعة_عالمي'},
                {js: 'setDate', la: 'اضبط_تاريخ', snippet: 'اضبط_تاريخ'},
                {js: 'setUTCDate', la: 'اضبط_تاريخ_عالمي', snippet: 'اضبط_تاريخ_عالمي'},
                {js: 'setMonth', la: 'اضبط_شهر', snippet: 'اضبط_شهر'},
                {js: 'setUTCMonth', la: 'اضبط_شهر_عالمي', snippet: 'اضبط_شهر_عالمي'},
                {js: 'setYear', la: 'اضبط_سنة', snippet: 'اضبط_سنة'},
                {js: 'setFullYear', la: 'اضبط_سنة_كاملة', snippet: 'اضبط_سنة_كاملة'},
                {js: 'setUTCFullYear', la: 'اضبط_سنة_كاملة_عالمي', snippet: 'اضبط_سنة_كاملة_عالمي'},
                {js: 'toUTCString', la: 'الى_نص_عالمي', snippet: 'الى_نص_عالمي'},
                {js: 'toGMTString', la: 'الى_نص_غرينتش', snippet: 'الى_نص_غرينتش'},
                {js: 'toISOString', la: 'الى_نص_جودة', snippet: 'الى_نص_جودة'},
                {js: 'toJSON', la: 'الى_جايسون', snippet: 'الى_جايسون'},
            ]
        }, {
            type: 'class',
            js: 'Math',
            la: 'رياضيات',
            newable: false,
            snippet: 'رياضيات',
            properties:[
                {js: 'E', la: '_نيريبي', snippet: '_نيريبي', autoComplete: true},
                {js: 'LN10', la: '_اس10', snippet: '_اس10', autoComplete: true},
                {js: 'LN2', la: '_اس2', snippet: '_اس2', autoComplete: true},
                {js: 'LOG2E', la: '_اس2نيريبي', snippet: '_اس2نيريبي', autoComplete: true},
                {js: 'LOG10E', la: '_اس10نيريبي', snippet: '_اس10نيريبي', autoComplete: true},
                {js: 'PI', la: '_باي', snippet: '_باي', autoComplete: true},
                {js: 'SQRT1_2', la: '_تربيعي1_2', snippet: '_تربيعي1_2', autoComplete: true},
                {js: 'SQRT2', la: '_تربيعي2', snippet: '_تربيعي2', autoComplete: true},
                {js: 'abs', la: 'مطلقة', snippet: 'مطلقة', autoComplete: true},
                {js: 'acos', la: 'جيب_تام_معكوس', snippet: 'جيب_تام_معكوس', autoComplete: true},
                {js: 'acosh', la: 'جيب_تام_زائدي_معكوس', snippet: 'جيب_تام_زائدي_معكوس', autoComplete: true},
                {js: 'asin', la: 'جيب_عكسي', snippet: 'جيب_عكسي', autoComplete: true},
                {js: 'asinh', la: 'جيب_زائدي_معكوس', snippet: 'جيب_زائدي_معكوس', autoComplete: true},
                {js: 'atan', la: 'ظل_معكوس', snippet: 'ظل_معكوس', autoComplete: true},
                {js: 'atanh', la: 'ظل_زائدي_معكوس', snippet: 'ظل_زائدي_معكوس', autoComplete: true},
                {js: 'atan2', la: 'ظل_معكوس2', snippet: 'ظل_معكوس2', autoComplete: true},
                {js: 'cbrt', la: 'جذر_تكعيبي', snippet: 'جذر_تكعيبي', autoComplete: true},
                {js: 'ceil', la: 'صحيح', snippet: 'صحيح', autoComplete: true},
                {js: 'clz32', la: 'عدد_اصفار32', snippet: 'عدد_اصفار32', autoComplete: true},
                {js: 'cos', la: 'جيب_تام', snippet: 'جيب_تام', autoComplete: true},
                {js: 'cosh', la: 'جيب_تام_زائدي', snippet: 'جيب_تام_زائدي', autoComplete: true},
                {js: 'exp', la: 'اسية', snippet: 'اسية', autoComplete: true},
                {js: 'expm1', la: 'اسية_بلا1', snippet: 'اسية_بلا1', autoComplete: true},
                {js: 'floor', la: 'سطح', snippet: 'سطح', autoComplete: true},
                {js: 'fround', la: 'تقريب_فواصل', snippet: 'تقريب_فواصل', autoComplete: true},
                {js: 'hypot', la: 'وتر', snippet: 'وتر', autoComplete: true},
                {js: 'imul', la: 'ضرب', snippet: 'ضرب', autoComplete: true},
                {js: 'log', la: 'اس', snippet: 'اس', autoComplete: true},
                {js: 'log10', la: 'اس10', snippet: 'اس10', autoComplete: true},
                {js: 'log1p', la: 'اس_اضف1', snippet: 'اس_اضف1', autoComplete: true},
                {js: 'log2', la: 'اس2', snippet: 'اس2', autoComplete: true},
                {js: 'max', la: 'اقصى', snippet: 'اقصى', autoComplete: true},
                {js: 'min', la: 'ادنى', snippet: 'ادنى', autoComplete: true},
                {js: 'pow', la: 'رفع', snippet: 'رفع', autoComplete: true},
                {js: 'random', la: 'عشوائي', snippet: 'عشوائي', autoComplete: true},
                {js: 'round', la: 'تقريب', snippet: 'تقريب', autoComplete: true},
                {js: 'sin', la: 'جيب', snippet: 'جيب', autoComplete: true},
                {js: 'sinh', la: 'جيب_زائدي', snippet: 'جيب_زائدي', autoComplete: true},
                {js: 'sqrt', la: 'جذر_تربيعي', snippet: 'جذر_تربيعي', autoComplete: true},
                {js: 'tan', la: 'ظل', snippet: 'ظل', autoComplete: true},
                {js: 'tanh', la: 'ظل_زائدي', snippet: 'ظل_زائدي', autoComplete: true}
            ]
        }, {
            type: 'class',
            js: 'JSON',
            la: 'جايسون',
            newable: false,
            snippet: 'جايسون',
            properties:[
                {js: 'parse', la: 'حلل', snippet: 'حلل', autoComplete: true},
                {js: 'stringify', la: 'الى_نص', snippet: 'الى_نص', autoComplete: true},
            ]
        }
    ]
}

export function transformGlobal(objectName) {
    function getGlobalName(objectName) {
        let globalOject = language().find(la => {
            return la.type === 'global'
        })

        let found = globalOject.properties.find((el) => {
            return el.la === objectName;
        })
        return found ? found.js : objectName;
    }
    return getGlobalName(objectName);
}

export function tranformNew(objectName) {
    //should add is static class
    let newObject = language().filter(la => {
        return la.type === 'class' && la.newable //not static
    })

    let found = newObject.find((el) => {
        return el.la === objectName;
    });

    return found ? found.js : objectName;
}

export function transformMember(objectName, propertyName) {

    // globalObject as d.getDate() in case d is date, Math.sin is not inculded
    let gObjects = language().filter(la => {
        return la.type === 'class' && la.newable
    })
    let globalOject = [];
    gObjects.forEach(item => {
        item.properties.forEach(prop => {
            globalOject.push(prop)
        })
    })
    globalOject = _.unionBy(globalOject, 'js')
    //////////////////////
   
    const numberObject = language().find(la => {
        return la.js === 'Number'
    })

    const jsonObject = language().find(la => {
        return la.js === 'JSON'
    })

    const mathObject = language().find(la => {
        return la.js === 'Math'
    })
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
            let prop = globalOject.find( el => {
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



