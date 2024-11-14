// General scripts or scripts common to all pages. 
// Logout
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async () => {
    try {
        const response = await fetch("http://localhost:3000/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (response.ok) {
            localStorage.removeItem("token");
            alert("You have been logged out.");
            window.location.href = "./pages/signin.html";
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        console.error("Error during logout:", error);
        alert("An error occurred while logging out. Please try again later.");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const loginLink = document.getElementById("loginLink");
    const signupLink = document.getElementById("signupLink");
    const logoutBtn = document.getElementById("logoutBtn");
  
    if (token) {
      loginLink.style.display = "none";
      signupLink.style.display = "none";
      logoutBtn.style.display = "block";
    } else {
      loginLink.style.display = "block";
      signupLink.style.display = "block";
      logoutBtn.style.display = "none";
    }    
});
  
