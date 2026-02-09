let currentSite = null;
let startTime = null;
function getDomain(url) {
  try {
    return new URL(url).hostname;
    return hostname.replace("www.","");
  } catch {
    return null;
  }
}
function saveTimeSpent() {
  if (!currentSite || !startTime) return;

  const timeSpent = Date.now() - startTime;

  chrome.storage.local.get(["timeData"], (result) => {
    const timeData = result.timeData || {};
    timeData[currentSite] = (timeData[currentSite] || 0) + timeSpent;

    chrome.storage.local.set({ timeData });
  });
}
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  saveTimeSpent();

  const tab = await chrome.tabs.get(activeInfo.tabId);
  currentSite = getDomain(tab.url);
  startTime = Date.now();
});
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === "complete") {
    saveTimeSpent();
    currentSite = getDomain(tab.url);
    startTime = Date.now();
  }
});
chrome.windows.onFocusChanged.addListener(() => {
  saveTimeSpent();
  startTime = Date.now();
})