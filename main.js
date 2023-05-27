//Get  current time and date 
const date = document.querySelector(".date");
// date.innerText = new Date().toLocaleString('vi');
;

// Handle header
const header = document.querySelector(".header")
const a_start = document.querySelector(".a_start")

window.addEventListener("scroll",function(){
    console.log(window.scrollY)
    if(this.window.scrollY >= 33){
        header.style.boxShadow = "0px 0px 15px rgb(0,0,0,0.5)"
        a_start.style.display = "block"
    }else{
        header.style.boxShadow = "none"
        a_start.style.display = "none"
        
    }
})

//Animation fade each block when scroll on 
const fade = document.querySelectorAll(".fade")

let isElInViewPort = (el) => {
	let rect = el.getBoundingClientRect()
	let viewHeight = window.innerHeight || document.documentElement.clientHeight

	return (
		(rect.top <= 0 && rect.bottom >= 0) ||
		(rect.bottom >= viewHeight && rect.top <= viewHeight) ||
		(rect.top >= 0 && rect.bottom <= viewHeight)
	)
}

function loop() {
	fade.forEach((item) => {
		if (isElInViewPort(item)) {
			item.style.animation = "fade_up 1.5s"
		}
	}) 
}

window.onscroll = loop

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































// const input_city = document.querySelector(".city_input")
// const bt_send = document.querySelector(".submit")
// const div_img = document.querySelector(".show_img")
// const p_error = document.querySelector(".error")

// const img_url = "img_"

// function handle(){
//     let data_stander = input_city.value.toLowerCase().trim(); 
//     const a = ["hanoi","thanhhoa","danang","hochiminh"]
 
//     console.log(data_stander)

//     for(var i=0;i<a.length;i++){
//         if(data_stander == a[i]){
//             div_img.style.background = `url("images/${a[i]}.jpg") center/cover`
//             p_error.innerText = ""
//             break
//         }else{
//             p_error.innerText = "Hãy nhập tên tiếng anh và không có khoảng trắng ! VD:Hanoi"
//         }
//     }

// }

// input_city.addEventListener("keypress",function(e){
//     if(e.code=="Enter"){
//         handle()
//     }
// })

// bt_send.addEventListener("click",function(){
//    handle()
// })


// async function changeWeather_now(){

//     let name = "an giang"

//     let data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=4148df3974c769d73229d95d2e3561c5`)
//     .then(Response=>Response.json())

//     if(data.cod==200){
//         console.log(data)
//     }else{
//         console.log("error call api")
//     }
// }

// changeWeather_now()


// disable inspect code or watch code
// document.addEventListener("contextmenu",
//     event => event.preventDefault()
// );

// document.addEventListener("keydown", function (event){
//     if (event.ctrlKey){
//        event.preventDefault();
//     }
//     if(event.keyCode == 123){
//        event.preventDefault();
//     }
// });