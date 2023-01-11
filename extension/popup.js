console.log("popup loaded", chrome, new Date());

function updatePopup(content) {
  console.log("update", content);

  // set the innerHTML of the content element
  const summaryDiv = document.getElementById("summary");
  summaryDiv.style.display = "block";
  summaryDiv.innerHTML = content;
  const loadingDiv = document.querySelector(".loading-container");
  loadingDiv.style.display = "none";
}

function sendToApi() {
  chrome.runtime.sendMessage({
    action: "hitApi",
    content: true,
  });
}

sendToApi();

function cleanInput() {
  const summaryDiv = document.getElementById("summary");
  summaryDiv.style.display = "none";
  const loadingDiv = document.querySelector(".loading-container");
  loadingDiv.style.display = "flex";
}

function refreshInput() {
  cleanInput();
  sendToApi();
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("got message", request);
  if (request.action == "addResult") {
    // update the popup with the content
    updatePopup(request.content);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var link = document.getElementById("refresh");
  // onClick's logic below:
  link.addEventListener("click", function () {
    refreshInput();
  });
});
