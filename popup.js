let getImagesClicked = false;
let getCookiesClicked = false;


document.addEventListener('DOMContentLoaded', function() {
  chrome.runtime.sendMessage("getImageUrls");
  document.getElementById("getImages").addEventListener('click', ()=>{
    if(!getImagesClicked){
       document.getElementById("cookiesList").innerHTML = ``;
        getData();
        getImagesClicked = true;
        getCookiesClicked = false;
    }
  });
  document.getElementById("getCookies").addEventListener('click', ()=>{
    if(getCookiesClicked){
      return
    }
    getCookiesClicked = true;
    getImagesClicked = false;
    document.getElementById("imageList").innerHTML = ``;
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.cookies.getAll({url: tabs[0].url}, (cookies) => {
        
        cookies.forEach(item => {
          document.getElementById("cookiesList").innerHTML += `
          <div title="click to copy" id="cookie" class="cookieCopy">
          <h3>${item.name}</h3>
          <p >${item.value}</p>
          </div>
          `;
        })
        Array.from(document.querySelectorAll(".cookieCopy")).forEach((item) => {
          item.addEventListener("click", () => copyToClipBoard(item));
        })
      });
    });
  })
});



function copyToClipBoard(item) {
  let text = item.innerText; 
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}


function getData() {
  
  chrome.storage.local.get("imageUrls", (data) => {
    if (data.imageUrls) {
      displayImages(data.imageUrls);
      attachDownloadListeners(); // Attach event listeners after adding buttons
      chrome.storage.local.remove("imageUrls")
    } else {
      document.getElementById('imageList').innerHTML += `<h1 style="color:red;fontSize:50px">There are no images available</h1>`;
    }
  });
}

function displayImages(data) {
  console.log(typeof(data));
  data.forEach(imageLink => {
    document.getElementById('imageList').innerHTML += `
      <div class="image">
        <img src="${imageLink}" alt="">
        <button id="Download-btn" class="download-buttons">&#x2193;</button>
      </div>
    `;
  });
}





function downloadImage(url) {
  chrome.downloads.download({url: url});
}

function attachDownloadListeners() {
  document.querySelectorAll('.download-buttons').forEach(btn => {
    btn.addEventListener('click', () => {
      const img = btn.previousElementSibling;
      if (img && img.tagName === "IMG") {
        downloadImage(img.src);
      }
    });
  });
}
