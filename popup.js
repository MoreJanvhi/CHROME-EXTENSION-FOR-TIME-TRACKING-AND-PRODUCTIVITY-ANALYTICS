const productivityMap = {
  "github.com": "productive",
  "youtube.com": "unproductive",
  "instagram.com": "unproductive",
  "NPTEL.com":"productive"
};
function calculateProductivity(timeData) {
  let productive = 0;
  let unproductive = 0;
  for (const site in timeData) {
    const category = productivityMap[site] || "unproductive";
    if (category === "productive") productive += timeData[site];
    else unproductive += timeData[site];
  }
  return {
    productiveHours: (productive / 60*60*1000).toFixed(2),
    unproductiveHours: (unproductive / 60*60*1000).toFixed(2)
  };
}
chrome.storage.local.get(["timeData"], (result) => {
  const stats = calculateProductivity(result.timeData || {});
  document.getElementById("productive").innerText =
    "Productive: " + stats.productiveHours + " hrs";
  document.getElementById("unproductive").innerText =
    "Unproductive: " + stats.unproductiveHours + " hrs";
});
document.getElementById("openDashboard").addEventListener("click", () => {
  chrome.tabs.create({
    url: chrome.runtime.getURL("dashboard/dashboard.html")
  });
});