async function getVotes() {
  const response = await fetch("/votes", { method: "GET" });
  return await response.json();
}

function getVotesText(votesCount) {
  if (votesCount === 0) {
    return "No votes yet";
  } else if (votesCount === 1) {
    return votesCount + " vote";
  } else {
    return votesCount + " votes";
  }
}

async function updateUI() {
  let { votesCount, percentageA, percentageB } = await getVotes();

  document.querySelector("#stats-bg-a").style.width = percentageA + "vw";
  document.querySelector("#choice-a .stat").textContent = percentageA + "%";

  document.querySelector("#stats-bg-b").style.width = percentageB + "vw";
  document.querySelector("#choice-b .stat").textContent = percentageB + "%";

  document.querySelector("#result > div").textContent = getVotesText(votesCount);
}

updateUI();
setInterval(updateUI, 30 * 1000);
