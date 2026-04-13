async function sendPrint() {
  const text = document.getElementById("text").value;

  try {
    const response = await fetch("/print", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.error || "Print failed");
      return;
    }

    alert(`Printed. Remaining today: ${result.remaining_today}`);
  } catch (err) {
    console.error(err);
    alert("Request failed");
  }
}