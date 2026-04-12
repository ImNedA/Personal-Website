function sendPrint() {
    const text = document.getElementById("text").value;

    fetch("/print", {
        method : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
    });
}