import { crypto, decrypt } from "./crypto.js"

var ENCO = [8364, 163, 171, 187, 8240, 247, 165,
    39, 34, 96, 97, 98, 99, 100, 101, 102, 103,
    104, 105, 106, 107, 108, 109, 110, 111, 112,
    113, 114, 115, 116, 117, 118, 119, 121, 122,
    65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75,
    76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86,
    87, 88, 89, 90, 48, 49, 50, 51, 52, 53, 54,
    55, 56, 57, 45, 95, 46, 47, 59, 40, 41, 38,
    64, 63, 44, 91, 93, 123, 125, 35, 37, 94, 42,
    43, 61, 124, 36, 126, 60, 62, 8800, 215, 167]


var DEC = {}
var OBJ_ENCO = {}
var limit = 100
var SEP = [120, 33]
for (var x = 0; x < limit; x++) {
    if (x <= 9) {
        OBJ_ENCO[`0${x}`] = `${ENCO[x]}`;
    }
    else {
        OBJ_ENCO[`${x}`] = `${ENCO[x]}`;

    }
    DEC[`${ENCO[x]}`] = `${x}`
}

function encode(text) {
    var codeChrs = text.split("").map(item => item.charCodeAt())
    var listChars = []

    codeChrs.forEach((item, index) => {
        item = String(item)
        if (item.length % 2 !== 0) {
            var last = item[item.length - 1]
            item = item.slice(0, item.length - 1) + `0${last}`

        }
        listChars.push(item)
    })

    var result = new String("")
    listChars.forEach(item => {
        readSlice(item, 2, function (data, end) {
            result += String.fromCharCode(OBJ_ENCO[data])
            var sep = Math.floor(Math.random() * SEP.length)
            if (end) result += String.fromCharCode(SEP[sep])
        })
    })
    return result
}

function decode(text) {
    var chars = text.split(
        new RegExp(`(${String.fromCharCode(SEP[0])}|${String.fromCharCode(SEP[1])})`, "g"))
        .map(item => {
            if (item.length === 1 && (SEP.indexOf(item.charCodeAt()) === -1)) {
                return Number.parseInt(DEC[item.charCodeAt()])
            }
            if (item.length >= 2) {
                var resChr = ""
                for (var chr of item) {
                    resChr += `${DEC[chr.charCodeAt()]}`
                }
                return Number.parseInt(resChr)
            }
        })
    chars = chars.filter(item => item != undefined)
        .map(item => String.fromCharCode(item)).join("")
    return chars
}

function readSlice(text, num, callback) {
    var [counter, temp] = [0, ""]
    for (var x = 0; x < text.length; x++) {
        counter++;
        temp += text[x];
        if (counter === num) {
            if (callback) callback(temp, end = x === text.length - 1)
            temp = "";
            counter = 0;
        }
    }
}



export { encode, decode }