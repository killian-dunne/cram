let content = "";

chrome.action.onClicked.addListener(function (tab) {
  // send a message to the active tab
  console.log("clicke");
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { action: "getContent" });
  });
});

// listen for messages from the content script
chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  console.log("gogt message", request);
  if (request.action == "sendContent") {
    // update the popup with the content
    // updatePopup(request.content);
    content = request.content;
  } else if (request.action == "hitApi") {
    // send the content to the popup
    console.log("content", content);
    // Check whether the environment is production or development
    // and use the appropriate URL

    let environment = "development";

    chrome.management.getSelf(function (info) {
      if (info.installType !== "development") {
        environment = "production";
      }
    });

    const url =
      environment === "production"
        ? `https://cram.killian-dunne.com/api/ask_openai/`
        : "http://localhost:8000/api/ask_openai/";
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: content }),
    });
    const data = await response.json();
    console.log("data", data);
    chrome.runtime.sendMessage({
      action: "addResult",
      content: data?.message,
    });
  }
});
