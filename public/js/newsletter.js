document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("newsletter-form");
    const emailInput = document.getElementById("email");
    const messageDiv = document.getElementById("message");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = emailInput.value.trim();

        if (email === "") {
            messageDiv.textContent = "Please enter your email address.";
            messageDiv.style.color = "red";
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            messageDiv.textContent = "The email address is not valid.";
            messageDiv.style.color = "red";
            return;
        }

        window.location.href = "/confirmation.html";
    });
});
