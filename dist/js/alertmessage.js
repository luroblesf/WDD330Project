fetch("alerts.json")
    .then(res => res.json())
    .then(data => showAlert(data))
    .catch(err => console.error("Error:", err));

function showAlert(data) {
    const container = document.getElementById("alert");

    const alertBox = document.createElement("div");
    alertBox.className = "alert-box";
    alertBox.style.backgroundColor = data.backgroundColor;

    alertBox.innerHTML = `
        <span class="alert-text">${data.message}</span>
        <button class="close-btn">&times;</button>
    `;

    container.appendChild(alertBox);

    const closeBtn = alertBox.querySelector(".close-btn");
    closeBtn.addEventListener("click", () => {
        alertBox.remove();
    });
}