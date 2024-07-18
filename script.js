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

async function get_ip_info(){
    let response = await fetch(ip_url)
    return response.json()  
}
get_ip_info().then( data=>
    localStorage.setItem("ip_object", JSON.stringify(data))
)
ip_object = JSON.parse(localStorage.getItem("ip_object")) //strored the data obtained in ip_object
ip_info_IP = ip_object.ip
ip_info_city = ip_object.city
ip_info_state = ip_object.region
ip_info_postal = ip_object.postal
ip_info_timezone = ip_object.timezone
loc_coordinates = ip_object.loc

let latitude = Number.parseFloat(loc_coordinates.slice(0, loc_coordinates.indexOf(",")))
let longitude = Number.parseFloat(loc_coordinates.slice(loc_coordinates.indexOf(",")+1, loc_coordinates.length))



//-------------------------MAP---------------------------------
let map = L.map("map").setView([`${latitude}`,`${longitude}`], 19)

let MapMarker = L.icon({
    iconUrl : "images/icon-location.svg",
    iconSize:[46, 56]
})

L.marker([`${latitude}`,`${longitude}`], {icon: MapMarker}).addTo(map)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



let worldtimeapi = `http://worldtimeapi.org/api/timezone/${ip_info_timezone}`
async function getworldtimeapi(){
    let response = await fetch(worldtimeapi);
    return response.json()
}

getworldtimeapi().then(data=>{
    localStorage.setItem("utc_offset", JSON.stringify(data))
})

UTCoffset += JSON.parse(localStorage.getItem("utc_offset")).utc_offset


//Displaying User's information upon page load
{

    ip_info.innerHTML = `${ip_info_IP}`
    location_info.innerHTML = `${ip_info_city} ${ip_info_state} ${ip_info_postal}`
    timezone_info.innerHTML = `${UTCoffset}`
    
}
    
ip_toSearch.addEventListener("keyup", function(){
    entered_ip = this.value
})

search_btn.addEventListener("click", function(){

    ip_url = `https://ipinfo.io/${entered_ip}?token=9c1a4f4eaef5ea`
    async function get_ip_info(){
        let response = await fetch(ip_url)
        return response.json()  
    }
    get_ip_info().then( function(data){
        localStorage.setItem("ip_object2", JSON.stringify(data))
        console.log(data)
    }
    )
    ip_object = JSON.parse(localStorage.getItem("ip_object2")) //strored the data obtained in ip_object
    ip_info_IP = ip_object.ip
    ip_info_city = ip_object.city
    ip_info_state = ip_object.region
    ip_info_postal = ip_object.postal
    ip_info_timezone = ip_object.timezone
    loc_coordinates = ip_object.loc

    let latitude = Number.parseFloat(loc_coordinates.slice(0, loc_coordinates.indexOf(",")))
    let longitude = Number.parseFloat(loc_coordinates.slice(loc_coordinates.indexOf(",")+1, loc_coordinates.length))


    let worldtimeapi = `http://worldtimeapi.org/api/timezone/${ip_info_timezone}`
    async function getworldtimeapi(){
        let response = await fetch(worldtimeapi);
        return response.json()
    }

    getworldtimeapi().then(data=>{
        localStorage.setItem("utc_offset2", JSON.stringify(data))
    })

    UTCoffset = "UTC"

    UTCoffset += JSON.parse(localStorage.getItem("utc_offset2")).utc_offset

    ip_info.innerHTML = `${ip_info_IP}`
    location_info.innerHTML = `${ip_info_city} ${ip_info_state} ${ip_info_postal}`
    timezone_info.innerHTML = `${UTCoffset}`




    map.setView([latitude, longitude], 19);
    L.marker([`${latitude}`,`${longitude}`], {icon: MapMarker}).addTo(map)

})