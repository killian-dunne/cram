function getContent() {
  // list of tags to get content from
  const tags = [
    // "p",
    // "div",
    // "span",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
  ];

  // array to store the content from the tags
  let content = [];

  // iterate over the tags and get the content from each one
  tags.forEach(function (tag) {
    // get all elements with the specified tag
    let elements = document.getElementsByTagName(tag);

    // iterate over the elements and get the content
    for (let i = 0; i < elements.length; i++) {
      content.push(
        elements[i].textContent.replaceAll("  ", "").replace(/[\t\r\n]+/g, "")
      );
    }
  });
  content = content.filter((c) => !!c).join(";");
  console.log("content", content);
  return content;
}

chrome.runtime.sendMessage({
  action: "sendContent",
  content: getContent(),
});

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log("getting listener");
//   if (request.action == "getContent") {
//     chrome.runtime.sendMessage({
//       action: "sendContent",
//       content: getContent(),
//     });
//   }
// });
