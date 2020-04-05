const $jiraUrl = document.getElementById("jira_url");
const $jiraTicketRegex = document.getElementById("jira_ticket_regex");

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["jiraUrl", "jiraTicketRegex"], ({
    jiraUrl = "",
    jiraTicketRegex = "",
  }) => {
    $jiraUrl.value = jiraUrl;
    $jiraTicketRegex.value = jiraTicketRegex;
  });
});

$jiraUrl.addEventListener("input", e => {
  chrome.storage.sync.set({
    jiraUrl: e.target.value
  });
});

$jiraTicketRegex.addEventListener("input", e => {
  chrome.storage.sync.set({
    jiraTicketRegex: e.target.value
  });
});