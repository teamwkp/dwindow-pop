console.log("hello world !!");

// 创建pop窗口
const createWindow = async () => {
  await chrome.windows.create(
    {
      url: "https://www.baidu.com",
      focused: true,
      type: "popup",
      width: 355,
      height: 472,
    },
    () => {
      console.log("callback");
    }
  );
};

// 定位页面dom
const findWebComponents = (event) => {
  if (!event.altKey) {
    return;
  }
  const host = event.composedPath()[0];
  console.log("host", host);
  //   console.log("event", event.target);
};

// 信息传输
chrome.runtime.onMessage.addListener((msg) => {
  console.log(msg);
});
