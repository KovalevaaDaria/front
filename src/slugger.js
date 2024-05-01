(function () {
    var whitespace = /\s+/g;

    function transliterate(word){
        var answer = ""
            , a = {};

        a["Ё"]="YO";a["Й"]="I";a["Ц"]="TS";a["У"]="U";a["К"]="K";a["Е"]="E";a["Н"]="N";a["Г"]="G";a["Ш"]="SH";a["Щ"]="SCH";a["З"]="Z";a["Х"]="H";a["Ъ"]="'";
        a["ё"]="yo";a["й"]="i";a["ц"]="ts";a["у"]="u";a["к"]="k";a["е"]="e";a["н"]="n";a["г"]="g";a["ш"]="sh";a["щ"]="sch";a["з"]="z";a["х"]="h";a["ъ"]="'";
        a["Ф"]="F";a["Ы"]="I";a["В"]="V";a["А"]="A";a["П"]="P";a["Р"]="R";a["О"]="O";a["Л"]="L";a["Д"]="D";a["Ж"]="ZH";a["Э"]="E";
        a["ф"]="f";a["ы"]="i";a["в"]="v";a["а"]="a";a["п"]="p";a["р"]="r";a["о"]="o";a["л"]="l";a["д"]="d";a["ж"]="zh";a["э"]="e";
        a["Я"]="Ya";a["Ч"]="CH";a["С"]="S";a["М"]="M";a["И"]="I";a["Т"]="T";a["Ь"]="'";a["Б"]="B";a["Ю"]="YU";
        a["я"]="ya";a["ч"]="ch";a["с"]="s";a["м"]="m";a["и"]="i";a["т"]="t";a["ь"]="'";a["б"]="b";a["ю"]="yu";

        for (var i in word){
            if (word.hasOwnProperty(i)) {
                if (a[word[i]] === undefined){
                    answer += word[i];
                } else {
                    answer += a[word[i]];
                }
            }
        }
        return answer;
    }

    function slugger(string, opts) {
        string = transliterate(string)
        opts || (opts = {});
        var allowedCharacters = "A-Za-z0-9_ -";
        if (opts.alsoAllow) allowedCharacters = opts.alsoAllow + allowedCharacters;
        var re = new RegExp('[^' + allowedCharacters + ']', 'g');
        var maintainCase = opts.maintainCase || false;
        var replacement = opts.replacement || '-';
        var smartTrim = opts.smartTrim;
        var decode = (opts.decode !== false);
        var result;
        var lucky;

        if (typeof string !== 'string') return '';
        if (!maintainCase) string = string.toLowerCase();
        if (decode) string = decodeURIComponent(string);
        result = string.trim().replace(re, '').replace(whitespace, replacement);
        if (smartTrim && result.length > smartTrim) {
            lucky = result.charAt(smartTrim) === replacement;
            result = result.slice(0, smartTrim);
            if (!lucky) result = result.slice(0, result.lastIndexOf(replacement));
        }
        return result;
    }

    if (typeof module !== 'undefined') {
        module.exports = slugger;
    } else {
        window.slugger = slugger;
    }
})();