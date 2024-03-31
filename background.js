// 插件状态初始化
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

// 插件点击开启
chrome.action.onClicked.addListener(async (tab) => {
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  const nextState = prevState === "ON" ? "OFF" : "ON";

  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  });

  if (tab.url.includes("chrome://")) {
    console.log("cant on start page");
  } else {
    if (nextState === "ON") {
      await chrome.scripting.executeScript({
        target: {
          tabId: tab.id,
        },
        files: ["content-script.js"],
      });
    }

    await chrome.tabs.sendMessage(tab.id, {
      extension: nextState,
    });
  }
});
