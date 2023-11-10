let landingPage = document.querySelector('.landing-page');
// get Array Of Imgs 
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
// variable to control the interval
let backgroundInterval;
// random background option
let backgroundOption = true;
let isRandomizing = true;
/////////////////////////////////////////

// check if there's local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option");

if (backgroundLocalItem === null) {
  randomizeImgs();
}

//check if random background local storage is not empty
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
    isRandomizing = false;
    randomizeImgs();
  }
  else if (backgroundLocalItem === "false") {
    backgroundOption = false;
    isRandomizing = true;
    clearInterval(backgroundInterval);
  }
  // remove active class from all spans 
  document.querySelectorAll(".random-background span").forEach(element => {
    element.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    document.querySelector(".random-background .yes").classList.add("active");
  }
  else {
    document.querySelector(".random-background .no").classList.add("active");
  }
}

/////////////////////////////////////////

// functions to randomize imgs
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      //get random number
      let random = Math.floor(Math.random() * imgsArray.length);
      // change background image url
      landingPage.style.backgroundImage = `url(../../../imgs/${imgsArray[random]})`;
    }, 6000);
  }
}

//switch random background options
let randomBackEl = document.querySelectorAll(".random-background span");
//loop on all span
randomBackEl.forEach(function (span) {
  // click of every span
  span.addEventListener("click", function (e) {
    //  تقوم بحذف كلاس ال active
    handleActive(e);
    /////////////////////////////////////////
    if (e.target.dataset.background === "yes" && isRandomizing === false) {

      isRandomizing = true; //هل هي تعمل فعلا او لا لكي لا يتم تشغيلها اكثر من مرة randomizeImgs هذا المتغير لفحص حالة ال

      backgroundOption = true;

      randomizeImgs();

      localStorage.setItem("background_option", true);

    } else if (e.target.dataset.background === "no" && isRandomizing === true) {

      backgroundOption = false;

      isRandomizing = false;

      clearInterval(backgroundInterval);
      clearInterval(backgroundInterval);

      localStorage.setItem("background_option", false);
    }
  });
});

/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {

  bulletsSpan.forEach(span => {

    span.classList.remove("active");

  });

  if (bulletLocalItem === "block") {

    bulletsContainer.style.display = "block";

    document.querySelector(".bullets-option .yes").classList.add("active");

  } else {

    bulletsContainer.style.display = "none";

    document.querySelector(".bullets-option .no").classList.add("active");


  }

}

bulletsSpan.forEach(span => {

  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {

      bulletsContainer.style.display = "block";

      localStorage.setItem("bullets_option", "block")

    } else {

      bulletsContainer.style.display = 'none';

      localStorage.setItem("bullets_option", "none")


    }

    handleActive(e);

  })


})


/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////


// setting box
document.querySelector(".toggle-settings .fa-cog").onclick = function () {
  // toggle for icon gear for animation
  this.classList.toggle("fa-spin");
  /////////////////////////////////////////
  document.querySelector(".setting-box").classList.toggle("open");
}
/////////////////////////////////////////
// إضافة مستمع لحدث النقر على الواجهة الخلفية
document.body.addEventListener("click", function (event) {
  const settingBox = document.querySelector(".setting-box");
  // التحقق مما إذا كان النقر خارج العنصر ".setting-box"
  if (!settingBox.contains(event.target)) {
    // إزالة الكلاس "open" إذا كان مفتوحًا
    if (settingBox.classList.contains("open")) {
      settingBox.classList.remove("open");
      // إزالة كلاس "fa-spin" إذا كان مضافًا إلى زر الإعدادات
      document.querySelector(".toggle-settings .fa-cog").classList.remove("fa-spin");
    }
  }
});
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////

//switch colors
let colorList = document.querySelectorAll(".color-list li");
//loop on all list items
colorList.forEach(function (li) {
  // click of every list items
  li.addEventListener("click", function (e) {
    //set color on root
    document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
    //set color on local storage
    localStorage.setItem("color_option", e.target.dataset.color);

    //  تقوم بحذف كلاس ال active
    handleActive(e);

  });
});

/////////////////////////////////////////
//check if there is local storage color option
let mainColor = localStorage.getItem("color_option");

if (mainColor !== null) {
  //set color on root
  document.documentElement.style.setProperty("--main-color", mainColor);
  // remove active class from all colors list item
  colorList.forEach(function (element) {
    element.classList.remove("active");
    // add active class for element with data color === local storage item
    if (element.dataset.color === mainColor) {
      element.classList.add('active');
    }
  });
}
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

  // skills offset top 
  let skillsOffsetTop = ourSkills.offsetTop;

  // skills outer height 
  let skillsOuterHeight = ourSkills.offsetHeight;

  // window height
  let windowHeight = this.innerHeight;

  // window scrollTop
  let windowScrollTop = this.pageYOffset;

  // this.console.log(windowScrollTop);
  if ((windowScrollTop + 200) > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
    let allSKills = document.querySelectorAll(".skill-box .skill-progress span");

    allSKills.forEach(skill => {
      skill.style.width = skill.dataset.progress;
    });
  }
}

/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////

// create popup with the image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

  img.addEventListener("click", (e) => {

    //create overlay element
    let overlay = document.createElement("div");

    //add class to overlay
    overlay.className = "popup-overlay";

    // add overlay to the body
    document.body.appendChild(overlay);

    // create the popup
    let popupBox = document.createElement("div");

    //add class to popup box
    popupBox.className = "popup-box";

    if (img.alt !== null) {

      //create Heading
      let imgHeading = document.createElement('h3');

      // create next for heading
      let imgText = document.createTextNode(img.alt);

      // append the text for the heading
      imgHeading.appendChild(imgText);

      // append the heading to the popup box
      popupBox.appendChild(imgHeading);
    }

    //create image
    let popupImage = document.createElement("img");

    // set image source
    popupImage.src = img.src;

    //add image to popup box
    popupBox.appendChild(popupImage);

    // append the popup box to body
    document.body.appendChild(popupBox);

    // create the close span
    let closeButton = document.createElement('span');

    // create the close button text
    let closeButtonText = document.createTextNode('X');

    //append text to close button
    closeButton.appendChild(closeButtonText);

    //add class to close button 
    closeButton.className = "close-button";

    // add close button to the popup box
    popupBox.appendChild(closeButton);

    // Add click event listener to the overlay to close the popup
    overlay.addEventListener("click", () => {
      popupBox.remove();
      overlay.remove();
    });

  });

});

// close popup 

document.addEventListener("click", (e) => {

  if (e.target.classList == 'close-button') {

    //remove the current popup
    e.target.parentNode.remove();

    // remove overlay
    document.querySelector('.popup-overlay').remove();
  }

});

/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////

const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links a");


function scrollToSection(elements) {

  elements.forEach(ele => {

    ele.addEventListener("click", (e) => {

      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({

        behavior: "smooth",

      })

    })

  })
}


scrollToSection(allLinks);
scrollToSection(allBullets);
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////

// handel active state

function handleActive(ev) {
  // remove active class for all children
  ev.target.parentElement.querySelectorAll(".active").forEach(function (element) {
    element.classList.remove("active");
  })
  // add active class on target
  ev.target.classList.add("active");
}

/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////

// toggle menu 
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {

  e.stopPropagation();
  // toggle class "menu-active" on button
  this.classList.toggle("menu-active");

  // toggle class 'open' on links
  tLinks.classList.toggle("open");
}


// إضافة حدث النقر على الواجهة الخارجية للصفحة
document.addEventListener("click", function (e) {

  if (e.target !== toggleBtn && e.target !== tLinks) {

    // check if menu is open
    if (tLinks.classList.contains("open")) {

      // toggle class 'open' on links and 'menu-active' on button
      toggleBtn.classList.toggle("menu-active");
      tLinks.classList.toggle("open");
    }
  }
});

tLinks.onclick = function (e) {
  e.stopPropagation();
}
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////

document.querySelector(".reset-option").onclick = function () {

  localStorage.clear();
  window.location.reload();

  // localStorage.removeItem("color_option");
  // localStorage.removeItem("background_option");
  // localStorage.removeItem("bullets_option");
  // window.location.reload();

}

/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////

// localStorage.clear();


