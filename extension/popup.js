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

chrome.runtime.sendMessage({
  action: "popupOpened",
  content: true,
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("got message", request);
  if (request.action == "addResult") {
    // update the popup with the content
    updatePopup(request.content);
  }
});
