// Sign Up

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const data = {
        username,
        password
    };

    try {
        const response = await fetch("https://blog-api-f102.onrender.com/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const responseData = await response.json();
            alert("Sign-up successful! Please log in.");
            window.location.href = "./signin.html";
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        alert("An error occurred. Please try again later.");
    }

    
});
