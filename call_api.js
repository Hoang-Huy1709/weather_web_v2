const time = document.querySelector(".time");
time.innerText = `HÔM NAY: ` + new Date().toLocaleString('vi');

//du bao cac gio trong ngay hom nay
const search = document.querySelector(".search")
const search_icon = document.querySelector(".search_icon")
const weather_bg = document.querySelector(".weather_today")
const body_bg = document.querySelector(".body")
const show_error = document.querySelector(".show_error")
const temperature = document.querySelector(".temperature")
const city_name = document.querySelector(".city")
const describe = document.querySelector(".describe")
const visual = document.querySelector(".visual")
const wind = document.querySelector(".wind")
const humidity = document.querySelector(".humidity")
const wait_block = document.querySelector(".wait")
const detail_block = document.querySelector(".hide_control")
const icon_overall = document.querySelector(".icon_overall")


const a = ['thanh_hoa','ha_noi','berlin','binh_duong','cao_bang','da_lat','da_nang','ha_long','ho_chi_minh','hue','ninh_binh','paris','tokyo',
'fuji','moscow','london','new_york','tours','hoa_binh','son_la','lai_chau','yen_bai','phu_tho','ha_giang','tuyen_quang','bac_kan','thai_nguyen',
'lang_son','bac_giang','bac_ninh','hai_duong','hung_yen','ha_tinh','quang_ngai','kon_tum','gia_lai','vung_tau','tay_ninh','an_giang','bac_lieu',
'ca_mau','can_tho','long_an','soc_trang','tra_vinh','ben_tre'
]

async function weather_today(){
    let city = search.value.replace(/\s+/g,' ').trim()

    let data_I = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4148df3974c769d73229d95d2e3561c5`)
    .then(Response=>Response.json())

    if(data_I.cod==200){
        show_error.innerText = " "
        icon_overall.innerHTML = `-- `

        // Hide animation waiting
        wait_block.style.display = "none"
        detail_block.style.display = "block"

       
        let img_url = city.toLowerCase().replace(" ","_")
        console.log(img_url)

        for(var i = 0;i < a.length;i++){
            if(img_url.replace(" ","_") == a[i]){
                weather_bg.style.background = `url(images/${img_url.replace(" ","_")}.jpg) no-repeat center/cover`
                body_bg.style.background = `linear-gradient(to right,rgba(0, 0, 0, 0.8),rgb(0,0,0,0.8)) ,url(images/${img_url.replace(" ","_")}.jpg) no-repeat center/cover`
                break
            }else{
                weather_bg.style.background = `url(images/src.jpg) no-repeat center/cover`
                body_bg.style.background = `linear-gradient(to right,rgba(0, 0, 0, 0.8),rgb(0,0,0,0.8)) ,url(images/src.jpg) no-repeat center/cover`
            }
        }

     
        temperature.innerText = Math.round((data_I.main.temp - 273.15)+` `) 
        temperature.innerHTML += "<sup>o</sup>C"

        city_name.innerText = data_I.name.toUpperCase() +" - " + data_I.sys.country


        let describe_feature = data_I.weather[0].main.toLowerCase()
        console.log(describe_feature)
        if(describe_feature == 'thunderstorm'){
            describe.innerText = 'Dông'
            icon_overall.innerHTML = `
            <lottie-player src="https://lottie.host/1e8b1600-6c09-4315-9a01-f0135d2098d8/HsCIMJ2kGN.json" background="transparent" speed="1"  loop autoplay></lottie-player>            `
        }else if(describe_feature == 'drizzle'){
            describe.innerText = 'Mưa phùn'
        }else if(describe_feature == 'rain'){
            describe.innerText = 'Mưa'
            icon_overall.innerHTML = `
            <lottie-player src="https://lottie.host/79b3ce21-fa7c-4546-b6fb-88e204798191/1VH0lLJ1CJ.json" background="transparent" speed="1"  loop autoplay></lottie-player> 
            `
        }else if(describe_feature == 'snow'){
            describe.innerText = 'Tuyết rơi'
            icon_overall.innerHTML = `
            <lottie-player src="https://lottie.host/40426fa7-436f-4c1c-981c-7fe5af31ab99/ZuMdUj57rv.json" background="transparent" speed="1" loop autoplay></lottie-player>            `
        }else if(describe_feature == 'clear'){
            describe.innerText = 'Quang đãng'
            icon_overall.innerHTML = `
            <lottie-player src="https://lottie.host/d8c5e83e-a6cb-4ca8-8d3d-9bde5849678f/YkqV5hw0ZL.json" background="transparent" speed="1"  loop autoplay></lottie-player>
            `
        }else if(describe_feature == 'clouds'){
            describe.innerText = 'Nhiều mây'
            icon_overall.innerHTML = `
            <lottie-player src="https://lottie.host/5ba0e6b2-be70-43a7-bb56-b097dacea632/04pA7rB9sp.json" background="transparent" speed="1"  loop autoplay></lottie-player>            `
        }else{
            describe.innerText = data_I.weather[0].main
        }

        humidity.innerText = data_I.main.humidity+` %`

        wind.innerText = data_I.wind.speed + ` m/s`

        visual.innerText = data_I.visibility +" m"

    }else{
        show_error.innerText = `Không tìm thấy thành phố tên "${city}" ! Hãy nhập tên chính xác bằng tiếng anh.`
        
        wait_block.innerHTML = `<lottie-player src="https://lottie.host/5f994a05-f344-4caa-9857-f1fca2364682/XXihIl1z3E.json" opacity="0.8" background="transparent" speed="1" style="width: 60%" loop autoplay></lottie-player>`
        wait_block.style.display = 'flex'
        wait_block.style.justifyContent = "center"
        wait_block.style.marginTop = "15%"
        wait_block.style.marginBottom = "10%"
        detail_block.style.display = "none"
    }

    console.log(data_I)
}


//ham tim API theo data trong input
search.addEventListener("keypress",function(e){
    if(e.code=="Enter"){
        weather_today()
        weather_tomorrow()
    }
})

search_icon.addEventListener("click",function(){
    weather_today()
})



const bar_time = document.querySelectorAll('.bar_time')
const bar_temp = document.querySelectorAll('.bar_temp')
const bar_des = document.querySelectorAll('.bar_des')

const bar_more_time = document.querySelectorAll('.bar_more_time')
const bar_more_temp = document.querySelectorAll('.bar_more_temp')
const bar_more_des = document.querySelectorAll('.bar_more_des')

const icon_down = document.querySelector('.icon_down')
const wt_detail = document.querySelector('.wt_detail')
const wt_more = document.querySelector('.wt_more')

const next_forecast = document.querySelector('.next_forecast')
const today_forecast = document.querySelector('.today_forecast')

// Scroll down on more detail page
icon_down.addEventListener("click",function(){
    wt_more.scrollTop += 300
})

// Switch between today and next tab forecast
next_forecast.addEventListener("click",function(){
    wt_detail.style.display = "none"
    wt_more.style.display = "block"
    icon_down.style.display = "flex"
})

today_forecast.addEventListener("click",function(){
    wt_detail.style.display = "grid"
    wt_more.style.display = "none"
    icon_down.style.display = "none"
})

async function weather_tomorrow(){
 
    let city = search.value.replace(/\s+/g,' ').trim()
    let data_II = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=4148df3974c769d73229d95d2e3561c5`)
    .then(Response=>Response.json())


    if(data_II.cod==200){
        let img_url = city.toLowerCase()
        let i=0,j=0,k=0;

        // Fill data each item

        bar_time.forEach((item) => {
            item.innerText = data_II.list[i++].dt_txt.replace('2023-',' ').slice(0, 12)
        }) 

        bar_temp.forEach((item) => {
            item.innerText = Math.round((data_II.list[j++].main.temp - 273.15)+` `) 
            item.innerHTML += "<sup>o</sup>C"
        }) 

        bar_des.forEach((item) => {

            if(data_II.list[k].weather[0].main == 'Thunderstorm'){
                item.innerText = 'Có dông'
            }else if(data_II.list[k].weather[0].main == 'Drizzle'){
                item.innerText = 'Mưa phùn'
            }else if(data_II.list[k].weather[0].main == 'Rain'){
                item.innerText = 'Mưa'
            }else if(data_II.list[k].weather[0].main == 'Snow'){
                item.innerText = 'Có tuyết'
            }else if(data_II.list[k].weather[0].main == 'Clear'){
                item.innerText = 'Quang đãng'
            }else if(data_II.list[k].weather[0].main == 'Clouds'){
                item.innerText = 'Nhiều mây'
            }else{
                item.innerText = '--'
            }

            k++

        }) 

        // Fill data more detail page
        let h=7,u=7,y=7
        console.log(data_II)

        bar_more_time.forEach((item) => {
            item.innerText = data_II.list[h++].dt_txt.replace('2023-',' ').slice(0, 12)
            console.log(h)
        })

        bar_more_temp.forEach((item) => {
            item.innerText = Math.round((data_II.list[u++].main.temp - 273.15)+` `) 
            item.innerHTML += "<sup>o</sup>C"
        })

        bar_more_des.forEach((item) => {

            if(data_II.list[y].weather[0].main == 'Thunderstorm'){
                item.innerText = 'Có dông'
            }else if(data_II.list[y].weather[0].main == 'Drizzle'){
                item.innerText = 'Mưa phùn'
            }else if(data_II.list[y].weather[0].main == 'Rain'){
                item.innerText = 'Mưa'
            }else if(data_II.list[y].weather[0].main == 'Snow'){
                item.innerText = 'Có tuyết'
            }else if(data_II.list[y].weather[0].main == 'Clear'){
                item.innerText = 'Quang đãng'
            }else if(data_II.list[y].weather[0].main == 'Clouds'){
                item.innerText = 'Nhiều mây'
            }else{
                item.innerText = '--'
            }

            y++

        }) 

    }


}

// disable inspect code or watch code
document.addEventListener("contextmenu",
    event => event.preventDefault()
);

document.addEventListener("keydown", function (event){
    if (event.ctrlKey){
       event.preventDefault();
    }
    if(event.keyCode == 123){
       event.preventDefault();
    }
});

