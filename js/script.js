function sendPrint() {
    const text = document.getElementById("text").value;

    fetch("https://imneda.com:5000/print", {
        method : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
    });
}