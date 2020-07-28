// top menu item
const topItem = chrome.contextMenus.create({
  title: "track-dev",
  contexts: ["link", "page"],
});

chrome.contextMenus.create({
  title: "open on localhost",
  contexts: ["page"],
  parentId: topItem,
  onclick: (info) => handleOpen(info.pageUrl),
});

chrome.contextMenus.create({
  title: "open on localhost",
  contexts: ["link"],
  parentId: topItem,
  onclick: (info) => handleOpen(info.linkUrl),
});

function handleOpen(url) {
  const parser = document.createElement("a");
  parser.href = url;
  const { pathname, search, hash } = parser;
  chrome.tabs.create({
    url: `http://localhost:3000${pathname}${search}${hash}`,
    active: true,
  });
}
