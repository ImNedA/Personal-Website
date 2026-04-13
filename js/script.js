document.getElementById("printImageBtn").addEventListener("click", sendImage);

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

async function sendImage() {
  const input = document.getElementById("imageInput");
  const file = input.files[0];

  if (!file) {
    alert("Please choose an image first.");
    return;
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch("/print-image", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.error || "Image print failed");
      return;
    }

    alert(`Printed. Remaining today: ${result.remaining_today}`);
  } catch (err) {
    console.error(err);
    alert("Request failed");
  }
}