function formatRupiah(number){
    let newString = String(number)
    let count = 0
    let ubah = ""
    for (let i = newString.length-1 ; i >= 0  ; i--){
        if (count === 3){
            ubah = "." + ubah
            count = 0
        }
        ubah = newString[i] + ubah
        count++
    }
    return "Rp " + ubah
}

module.exports = formatRupiah