export async function castVote(voteString) {
  console.debug(">>> Voted:", voteString);

  const res = await fetch("/vote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ vote: voteString }),
  });

  const responseBody = await res.json();
  console.debug(">>> res", responseBody);

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
      buttonChoiceA.setAttribute("disabled", false);
      buttonChoiceB.setAttribute("disabled", false);

      document.body.classList.remove("bg-blue-600", "text-blue-50", "bg-teal-600", "text-teal-50");
  }
}

function main() {
  document.querySelectorAll(".btn-choice").forEach((buttonChoice) => {
    buttonChoice.onclick = () => castVote(buttonChoice.getAttribute("value"));
  });
}

main();
