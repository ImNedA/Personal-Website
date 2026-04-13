console.log("script loaded");

document.addEventListener("DOMContentLoaded", () => {
  const printTextBtn = document.getElementById("printTextBtn");
  const imageInput = document.getElementById("imageInput");
  const printImageBtn = document.getElementById("printImageBtn");
  const imagePreview = document.getElementById("imagePreview");
  const previewContainer = document.getElementById("previewContainer");

  printTextBtn.addEventListener("click", sendText);
  imageInput.addEventListener("change", showPreview);
  printImageBtn.addEventListener("click", sendImage);

  function showPreview() {
    const file = imageInput.files[0];

    if (!file) {
      previewContainer.style.display = "none";
      imagePreview.src = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      imagePreview.src = e.target.result;
      previewContainer.style.display = "block";
    };

    reader.readAsDataURL(file);
  }

  async function sendText() {
    const text = document.getElementById("textInput").value;

    if (!text.trim()) {
      alert("Please enter some text.");
      return;
    }

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
    const file = imageInput.files[0];

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
});