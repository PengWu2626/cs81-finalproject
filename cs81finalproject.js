

/*

In this project, I used images from the "Stanford Dogs Dataset" (http://vision.stanford.edu/aditya86/ImageNetDogs/).
To save time, I used the CSV Data (dog_sample_images_path.csv) which I made for the different class.
Here is the link that contains more information about how I made "dog_sample_images_path.csv" (https://github.com/PengWu2626/PIC16B_GroupProject/blob/main/data/get_sample_images_path.ipynb)
*/


// I searched online on how to convert CSV file to an array 
// https://stackoverflow.com/questions/26416304/reading-csv-file-in-to-an-array-using-javascript
var request = new XMLHttpRequest();  
request.open("GET", 'dog_sample_images_path.csv', false);   
request.send(null);  

var csvData = new Array();
var jsonObject = request.responseText.split(/\r?\n|\r/);
for (let i = 0; i < jsonObject.length; i++) {
  csvData.push(jsonObject[i].split(','));
}
// End convert CSV file to array 



csvData.shift();  // remove the first element
changeFormat();   // change "_" to "-"

let dogDataMap = makeDogMap(csvData = csvData);


// 119 elements
const AllDogBreeds = Array.from(dogDataMap.keys()).sort();

let slides1 = document.getElementsByClassName('dogSlides1'); 

let currentslides1dog = setRandomImagesInContainer(whichSlides = slides1); // set slides 1 with random image and set "currentslides1dog" = image's dog name

let currentSlidesIndex = []; // [0 , 0 , 1] means [imgIdex = 0 for dogSlides1, imgIdex = 0 for dogSlides2, imgIdex = 1 for dogSlides3]
let slidesNum = ["dogSlides1", "dogSlides2", "dogSlides3"];
showSlides(1, 0);
// No dogSlides2
showSlides(1, 2);


let randomOptionsForDog = randomDog(3); // randomly pick 3 dog breeds
randomOptionsForDog.push(currentslides1dog); // push the right answer to array
randomOptionsForDog.sort(function(a,b){ return 0.5 - Math.random()}); // shuffle array


// set text content to choice buttons (4 buttons)
setButtonChoicesValue(choices = randomOptionsForDog);

// check the clicked answer 
fouropts.addEventListener("click", function (event) {
  let selectedOption = event.target;
  let value = selectedOption.textContent;
  let check = currentslides1dog.replaceAll("-"," ");
  if (value === check) {
    alert("Right");
    update();
  } else {
    alert("Wrong");
  }
});


/*
// Same as fouropts.addEventListener("click", function (event)..........)
op1.addEventListener("click", () => {
  let value = document.getElementById('op1').textContent;
  let check = currentslides1dog.replaceAll("-"," ");
  if(value === check) {
   alert("right");
   update();
  }else {
   alert("wrong");
 }
 })
 
  op2.addEventListener("click", () => {
   let value = document.getElementById('op2').textContent;
   let check = currentslides1dog.replaceAll("-"," ");
   if(value === check) {
    alert("right");
    update();
   } else {
     alert("wrong");
   }
  })
 
  op3.addEventListener("click", () => {
   let value = document.getElementById('op3').textContent;
   let check = currentslides1dog.replaceAll("-"," ");
   if(value === check) {
    alert("right");
    update();
   }else {
     alert("wrong");
   }
  })
 
  op4.addEventListener("click", () => {
   let value = document.getElementById('op4').textContent;
   let check = currentslides1dog.replaceAll("-"," ");
   if(value === check) {
    alert("right");
    update();
   }else {
     alert("wrong");
   }
  })
*/ 


// default to french-bulldog for the data slides (dogSlides3)
let selectOptionValue = "french-bulldog";
document.getElementById("dogtableheader3").innerHTML = selectOptionValue.replaceAll("-", " "); // add the name
let slides3 = document.getElementsByClassName('dogSlides3'); 
addMoreImages(numberImages = 100, dogName = selectOptionValue); // add more image elements in dogSlides3


setImagesInContainer(slides3, selectOptionValue);


let dogSelect = document.getElementById("mySelect");

dogSelect.addEventListener('change', function (event) {
  selectOptionValue = event.target.value; // get the selected value (a dog breed)
  setImagesInContainer(slides3, selectOptionValue); // update the selected dog images in slides 3
  document.getElementById("dogtableheader3").innerHTML = selectOptionValue.replaceAll("-", " ");
});

// add all dog names to option tag in dogSlides2
for (let dog of AllDogBreeds){
  let dogOption = document.createElement("option");
  dogOption.value = dog;
  dogOption.text = dog.replaceAll("-"," ");
  dogSelect.options.add(dogOption, 1);
}





function changeFormat(){
  // TThis function changes the format of the CSV Data from "_" to "-".
  for (let ele of csvData) {
    ele[0] = ele[0].replaceAll("_","-");
  }
}


function makeDogMap(csvData) {
  // This function will get the input CSV data and return a Map in which keys are the dog name and values are corresponding image links.
  let dogMap = new Map();
  // loop over csvData
  // element[0] is dog name, element[1] is dog image link
  for(let element of csvData) {
    !dogMap.has(element[0]) ? dogMap.set(element[0], [element[1]]) : dogMap.get(element[0]).push(element[1]);
  }
  return dogMap;
}


// assuming input num < AllDogBreeds.length = 119;
function randomDog(num) {
  // This function randomly picks num number of dog breeds and returns an array containing picked dog breeds' names.
  let numofBreeds = [];
  while(numofBreeds.length < num) {
    // pick a random number from 0 - 110
    randomIdx = Math.floor(Math.random() * 110);
    // check if numofBreeds array contains value
    if(!numofBreeds.includes[AllDogBreeds[randomIdx]]) {
      numofBreeds.push(AllDogBreeds[randomIdx]);
    }
  }
  console.log("randomly picked : ", numofBreeds);
  return numofBreeds; // array
}


function getDogBreedImages(num, name) {
  // assuming input num < dogDataMap.get(name).length
  // This function will return the array of num numbers of images SRC from the corresponding input name.
  let values = dogDataMap.get(name);
  let totalNum = values.length;
  let dogImages = [];
  while(dogImages.length < num) {
    randomIdx = Math.floor(Math.random() * totalNum);
    if(!dogImages.includes[values[randomIdx]]) {
      dogImages.push(values[randomIdx]);
    }
  }
  return dogImages;
}


function setRandomImagesInContainer(whichSlides){
  let dog = randomDog(1)[0]; // random pick a dog breed
  let images = getDogBreedImages(whichSlides.length, dog); // pick images

  for(let i=0; i < whichSlides.length; i++) {
    whichSlides[i].getElementsByTagName("img")[0].src = images[i]; // set image url to each img
  }
  console.log("Answer is : ", dog);
  return dog; // return the randomly picked name of a dog breed (ANSWER of the choices)
}



function showSlides(currentImgIndex, whichSlides) {

  let slideContainer = document.getElementsByClassName(slidesNum[whichSlides]);

  if (typeof currentSlidesIndex[whichSlides] === 'undefined') {currentSlidesIndex[whichSlides] = 1;}
  if (currentImgIndex > slideContainer.length) {currentSlidesIndex[whichSlides] = 1}    // set the index to 1 if the index move out the max range
  if (currentImgIndex < 1) {currentSlidesIndex[whichSlides] = slideContainer.length}   // set the index to max indx if the index move beloe the smallest index 1
  // set all images inside the current container to display none
  for (let i = 0; i < slideContainer.length; i++) {
    slideContainer[i].style.display = "none";  
  }
  // change the image to display
  slideContainer[currentSlidesIndex[whichSlides]-1].style.display = "block";  
}

// for onclick in HTML
function changeSlides(moveIndex, whichSlides) {
  showSlides(currentSlidesIndex[whichSlides] += moveIndex, whichSlides);
}


function setButtonChoicesValue(choices) {
  document.getElementById('op1').textContent=choices[0].replaceAll("-"," ");
  document.getElementById('op2').textContent=choices[1].replaceAll("-"," ");
  document.getElementById('op3').textContent=choices[2].replaceAll("-"," ");
  document.getElementById('op4').textContent=choices[3].replaceAll("-"," ");
}




function update() {
  // change to a different dog breed 
  currentslides1dog = setRandomImagesInContainer(document.getElementsByClassName('dogSlides1'));
  
  let randomOptionsForDog= randomDog(3);  // pick another 3 wrong answers
  randomOptionsForDog.push(currentslides1dog); // push the right answer to array
  randomOptionsForDog.sort(function(a,b){ return 0.5 - Math.random()}); // shuffle array
  setButtonChoicesValue(randomOptionsForDog); // update text content to choice buttons 

  console.log(randomOptionsForDog);
}




function addMoreImages(numberImages, dogName){
  let images = getDogBreedImages(numberImages, dogName); // pick images

  let whichContainer = document.querySelector('#slideshow-container3');

  for(let ele of images) {
    let addElement = document.createElement('div');
    addElement.className = "dogSlides3";
    addElement.style.display = "none";

    const addimg = document.createElement('img');
    addimg.src=ele;
    addimg.width = "500";
    addimg.height = "500";
    addElement.appendChild(addimg);
    whichContainer.appendChild(addElement);
  }
}

function setImagesInContainer(whichSlides, dogName){
  // this function will get a slides contaner and set to the input dogName images
  let dog = dogName;
  let images = getDogBreedImages(whichSlides.length, dog); // pick images

  for(let i=0; i < whichSlides.length; i++) {
    whichSlides[i].getElementsByTagName("img")[0].src = images[i]; // set image url to each img
  } 
}
