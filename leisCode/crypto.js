
export function crypto(text) {
    var interval = "abopklmftq"
    var result = text.split("").map((item, index) => {
        var chr = `${item.charCodeAt()}`.split('').map(c => {
            return interval[parseInt(c)]
        }).join("")
        return chr
    })
    return result.join(";")
}

export function decrypt(text) {
    var interval = "abopklmftq"
    var result = text.split(";").map((item, index) => {

        var chr = item.split("").map(c => {
            return interval.indexOf(c);
        }).join("")

        return String.fromCharCode(parseInt(chr))
    })
    return result.join("");
}