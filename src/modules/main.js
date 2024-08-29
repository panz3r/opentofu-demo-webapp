export async function castVote(voteString) {
  // retrieve Turnstile challenge response
  const turnstileChallengeResponse = turnstile.getResponse();

  // submit vote
  const res = await fetch("/votes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "CF-Turnstile-Response": turnstileChallengeResponse,
    },
    body: JSON.stringify({ vote: voteString }),
  });

  const responseBody = await res.json();

  // update UI based on backend response
  let buttonChoiceA = document.querySelector(".btn-choice-a");
  let buttonChoiceB = document.querySelector(".btn-choice-b");

  switch (responseBody.vote) {
    case "a":
      buttonChoiceA.setAttribute("disabled", true);
      buttonChoiceB.removeAttribute("disabled");

      document.body.classList.add("text-teal-50", "bg-teal-600");
      document.body.classList.remove("text-blue-50", "bg-blue-600");
      break;

    case "b":
      buttonChoiceB.setAttribute("disabled", true);
      buttonChoiceA.removeAttribute("disabled");

      document.body.classList.add("text-blue-50", "bg-blue-600");
      document.body.classList.remove("text-teal-50", "bg-teal-600");
      break;

    default:
      buttonChoiceA.removeAttribute("disabled");
      buttonChoiceB.removeAttribute("disabled");

      document.body.classList.remove("bg-blue-600", "text-blue-50", "bg-teal-600", "text-teal-50");
  }
}

function main() {
  document.querySelectorAll(".btn-choice").forEach((buttonChoice) => {
    buttonChoice.onclick = () => castVote(buttonChoice.getAttribute("value"));
  });
}

main();
