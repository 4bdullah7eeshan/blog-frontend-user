// General scripts or scripts common to all pages. 
// Logout
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async () => {
    try {
        const response = await fetch("https://blog-api-f102.onrender.com/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (response.ok) {
            localStorage.removeItem("token");

            const currentPath = window.location.pathname;
            console.log(currentPath);
            const isHomePage = currentPath.endsWith("/index.html"); 
            const redirectPath = isHomePage ? "./index.html" : "../index.html";
            window.location.href = redirectPath;
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
  
