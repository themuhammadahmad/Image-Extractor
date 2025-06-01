chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (!tab.url.startsWith('chrome://')) { // Check if the URL is not a Chrome internal page
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["content.js"]
        });
      } else {
        console.log("Extension functionality not executed because the current tab is a Chrome internal page.");
      }
    });
})

  



