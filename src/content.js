chrome.runtime.onMessage.addListener((request) => {
  if (request.type === "copy") {
    navigator.clipboard.writeText(request.data);
  }
});