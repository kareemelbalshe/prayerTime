let cities = [
    {
        ar: "القاهرة",
        en: "Al Qāhirah",
        country:"EG"
    },
    {
        ar: "مكة",
        en: "Makkah al Mukarramah",
        country:"SA"
    },
    {
        ar: "المنوفية",
        en: "Al Minūfīyah",
        country:"EG"
    },
    {
        ar: "الرياض",
        en: "Ar Riyāḑ",
        country:"SA"
    },
    {
        ar: "المدينة المنورة",
        en: "Al Madīnah al Munawwarah",
        country:"SA"
    },
    {
        ar: "دبي",
        en: "Dubayy",
        country:"AE"
    },
]
for (city of cities) {
    let content = `
    <option value="${city.ar}">${city.ar}</option>
    `
    document.getElementById("cities").innerHTML += content
}


document.getElementById("cities").addEventListener("change", () => {
    let cityName = ""
    let country
    for (city of cities) {
        console.log(city.ar);
        if (city.ar == document.getElementById("cities").value) {
            cityName = city.en
            country=city.country
            document.getElementById("city").innerHTML = city.ar
        }
        changCity(cityName,country)
    }
})
function changCity(cityName,country) {
    let params = {
        country: country,
        city: cityName//"Makkah al Mukarramah"
    }

    axios.get("http://api.aladhan.com/v1/timingsByCity", {
        params: params
    })
        .then((res) => {
            let timing = res.data.data.timings
            let date = res.data.data.date.readable
            let weekdate = res.data.data.date.hijri.weekday.ar
            document.getElementById("body1").innerHTML = `${timing.Fajr}`
            document.getElementById("body2").innerHTML = `${timing.Sunrise}`
            document.getElementById("body3").innerHTML = `${timing.Dhuhr}`
            document.getElementById("body4").innerHTML = `${timing.Asr}`
            document.getElementById("body5").innerHTML = `${timing.Sunset}`
            document.getElementById("body6").innerHTML = `${timing.Isha}`
            document.getElementById("date").innerHTML = `${weekdate} ${date}`
        })
        .then((error) => {
            console.log(error);
        })
}
changCity("Al Qāhirah","EG")
