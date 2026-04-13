console.log("script loaded");

document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const printImageBtn = document.getElementById("printImageBtn");
  const imagePreview = document.getElementById("imagePreview");
  const previewContainer = document.getElementById("previewContainer");

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