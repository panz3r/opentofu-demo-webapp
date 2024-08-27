async function getVotes() {
  return { votesCount: 3, percentageCats: 66, percentageDogs: 34 };
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

async function init() {
  console.debug(">> INIT called...");

  let { votesCount, percentageCats, percentageDogs } = await getVotes();

  document.getElementById("stats-bg-cats").style.width = percentageCats + "vw";
  document.querySelector("#choice-cats .stat").textContent = percentageCats + "%";

  document.getElementById("stats-bg-dogs").style.width = percentageDogs + "vw";
  document.querySelector("#choice-dogs .stat").textContent = percentageDogs + "%";

  document.querySelector("#result > div").textContent = getVotesText(votesCount);
}

init();
