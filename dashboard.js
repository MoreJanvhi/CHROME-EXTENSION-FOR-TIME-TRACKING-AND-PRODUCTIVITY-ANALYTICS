chrome.storage.local.get(["timeData"], (result) => {
  const timeData = result.timeData || {};

  let productive = 0;
  let unproductive = 0;

  const productivityMap = {
    "github.com": "productive",
    "whatsapp.com": "productive",
    "nptel.com": "productive",
    "youtube.com": "unproductive",
    "instagram.com": "unproductive",
    "facebook.com": "unproductive",
    "twitter.com": "unproductive"
  };
  // For bar chart
  const sites = [];
  const siteTimes = [];

  for (let site in timeData) {
    const time = timeData[site]; // milliseconds
    const category = productivityMap[site] || "unproductive";

    sites.push(site);
    siteTimes.push((time / 1000 / 60).toFixed(2)); // minutes

    if (category === "productive") productive += time;
    else unproductive += time;
  }
  // Text output
  document.getElementById("productive").innerText =
    "Productive Time: " + (productive / 1000 / 60).toFixed(2) + " min (" +
    (productive / 1000 / 60 / 60).toFixed(2) + " hrs)";
  document.getElementById("unproductive").innerText =
    "Unproductive Time: " + (unproductive / 1000 / 60).toFixed(2) + " min (" +
    (unproductive / 1000 / 60 / 60).toFixed(2) + " hrs)";
  // PIE CHART (Productive vs Unproductive)
  const pieCtx = document.getElementById("productivityChart").getContext("2d");
  new Chart(pieCtx, {
    type: "pie",
    align:["Left"],
    data: {
      labels: ["Productive", "Unproductive"],
      datasets: [{
        data: [productive, unproductive],
        backgroundColor: ["#4CAF50", "#F44336"]
         
      }]
    }
  });
  // BAR CHART (Site vs Time)
  const barCtx = document.getElementById("siteChart").getContext("2d");
  new Chart(barCtx, {
    type: "bar",
     align:["Left"],
    data: {
      labels: sites,
      datasets: [{
        label: "Time Spent (minutes)",
        data: siteTimes,
        barThickness:25,
        backgroundColor: "#2196F3"
      }]
    },
    options: {
        responsive:true,
        maintainAspectRatio:false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

});