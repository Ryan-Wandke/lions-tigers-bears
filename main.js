let timer
let deleteFirstPhotoDelay

async function start(){
    try{
        const response = await fetch("https://dog.ceo/api/breeds/list/all")
        const data = await response.json()
        makedoggylist(data.message)}
    catch(e){
        console.log("error fetching dogs from https://dog.ceo/api/breeds/list/all")

    }
}

start()

function makedoggylist(breedList){
    document.getElementById("breed").innerHTML =  `
    <select onchange="loadPhotosByBreed(this.value)">
        <option>
            Choose a breed of dog!!
        </option>
        ${Object.keys(breedList).map(function(breed){

        return `<option>${breed}</option>`
        }).join('')}
        
    </select>
    `

}

async function loadPhotosByBreed(breed){
    if (breed != "Choose a breed of dog!!"){
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json()
        createSlideshow(data.message)
    }

}

function createSlideshow(images) {
  let currentPosition = 0
  clearInterval(timer)
  clearTimeout(deleteFirstPhotoDelay)
  
  if (images.length > 1) {
    document.getElementById("slideshow").innerHTML = `
  <div class="slide" style="background-image: url('${images[0]}')"></div>
  <div class="slide" style="background-image: url('${images[1]}')"></div>
  `
  currentPosition += 2
  if (images.length == 2) currentPosition = 0
  timer = setInterval(nextSlide, 3000)
  } else {
    document.getElementById("slideshow").innerHTML = `
  <div class="slide" style="background-image: url('${images[0]}')"></div>
  <div class="slide"></div>
  `
  }

  function nextSlide() {
    document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${images[currentPosition]}')"></div>`)
    deleteFirstPhotoDelay = setTimeout(function () {
      document.querySelector(".slide").remove()
    }, 1000)
    if (currentPosition + 1 >= images.length) {
      currentPosition = 0
    } else {
      currentPosition++
    }
  }
}