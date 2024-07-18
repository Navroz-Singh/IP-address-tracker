let ip_info = document.getElementById("ip_info")
let location_info = document.getElementById("location_info")
let timezone_info = document.getElementById("timezone_info")
let ip_toSearch = document.getElementById("ip_toSearch")
let search_btn = document.body.getElementsByClassName("search_btn")[0]
let entered_ip

let loc_coordinates
let ip_info_IP
let ip_info_city
let ip_info_state
let ip_info_timezone
let ip_info_postal
let ip_object

let UTCoffset = "UTC"

//IP info 
let ip_url = "https://ipinfo.io?token=9c1a4f4eaef5ea"

// Initialize map variable
let map;
let MapMarker;

async function get_ip_info(url) {
    let response = await fetch(url)
    return response.json()
}

async function initialize() {
    let data = await get_ip_info(ip_url)
    localStorage.setItem("ip_object", JSON.stringify(data))
    ip_object = data

    ip_info_IP = ip_object.ip
    ip_info_city = ip_object.city
    ip_info_state = ip_object.region
    ip_info_postal = ip_object.postal
    ip_info_timezone = ip_object.timezone
    loc_coordinates = ip_object.loc

    let latitude = Number.parseFloat(loc_coordinates.slice(0, loc_coordinates.indexOf(",")))
    let longitude = Number.parseFloat(loc_coordinates.slice(loc_coordinates.indexOf(",") + 1, loc_coordinates.length))

    // Initialize map
    map = L.map("map").setView([latitude, longitude], 19)

    MapMarker = L.icon({
        iconUrl: "images/icon-location.svg",
        iconSize: [46, 56]
    })

    L.marker([latitude, longitude], { icon: MapMarker }).addTo(map)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)

    let worldtimeapi = `https://worldtimeapi.org/api/timezone/${ip_info_timezone}`
    let timeData = await getworldtimeapi(worldtimeapi)
    localStorage.setItem("utc_offset", JSON.stringify(timeData))
    UTCoffset += JSON.parse(localStorage.getItem("utc_offset")).utc_offset

    // Displaying User's information upon page load
    ip_info.innerHTML = `${ip_info_IP}`
    location_info.innerHTML = `${ip_info_city} ${ip_info_state} ${ip_info_postal}`
    timezone_info.innerHTML = `${UTCoffset}`
}

async function getworldtimeapi(url) {
    let response = await fetch(url);
    return response.json();
}

search_btn.addEventListener("click", async function () {
    entered_ip = ip_toSearch.value
    ip_url = `https://ipinfo.io/${entered_ip}?token=9c1a4f4eaef5ea`

    let data = await get_ip_info(ip_url)
    localStorage.setItem("ip_object2", JSON.stringify(data))
    ip_object = data

    ip_info_IP = ip_object.ip
    ip_info_city = ip_object.city
    ip_info_state = ip_object.region
    ip_info_postal = ip_object.postal
    ip_info_timezone = ip_object.timezone
    loc_coordinates = ip_object.loc

    let latitude = Number.parseFloat(loc_coordinates.slice(0, loc_coordinates.indexOf(",")))
    let longitude = Number.parseFloat(loc_coordinates.slice(loc_coordinates.indexOf(",") + 1, loc_coordinates.length))

    let worldtimeapi = `https://worldtimeapi.org/api/timezone/${ip_info_timezone}`
    let timeData = await getworldtimeapi(worldtimeapi)
    localStorage.setItem("utc_offset2", JSON.stringify(timeData))

    UTCoffset = "UTC" + JSON.parse(localStorage.getItem("utc_offset2")).utc_offset

    ip_info.innerHTML = `${ip_info_IP}`
    location_info.innerHTML = `${ip_info_city} ${ip_info_state} ${ip_info_postal}`
    timezone_info.innerHTML = `${UTCoffset}`

    // Update map
    map.setView([latitude, longitude], 19)
    L.marker([latitude, longitude], { icon: MapMarker }).addTo(map)
})

// Initialize on page load
initialize()
