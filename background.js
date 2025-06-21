chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "resize") {
    chrome.windows.getCurrent((win) => {
      chrome.windows.update(win.id, {
        width: 420,
        height: 600 // Adjust to fit your form size
      });
    });
  }
});
