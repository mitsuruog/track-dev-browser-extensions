// top menu item
const topItem = chrome.contextMenus.create({
  title: "track-dev",
  contexts: ["link", "page", "selection"],
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
  onclick: (info) => handleCopy(info.linkUrl),
});

chrome.contextMenus.create({
  title: "transform %s to Jira URL",
  contexts: ["selection"],
  parentId: topItem,
  onclick: (info) => handleCreateLink(info.selectionText),
});

function handleOpen(url) {
  const parser = document.createElement("a");
  parser.href = url;
  const {
    pathname,
    search,
    hash
  } = parser;
  chrome.tabs.create({
    url: `http://localhost:3000${pathname}${search}${hash}`,
    active: true,
  });
}

function handleCreateLink(selectionText) {

  chrome.storage.sync.get(["jiraUrl", "jiraTicketRegex"], ({
    jiraUrl = "",
    jiraTicketRegex = "",
  }) => {
    if (!jiraUrl || !jiraTicketRegex) {
      return;
    }
    const regex = new RegExp(jiraTicketRegex);
    const isMatch = regex.test(selectionText);
    if (!isMatch) {
      return;
    }
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id, {
          type: "copy",
          data: `${jiraUrl}${selectionText}`,
        }
      );
    });
  });
}