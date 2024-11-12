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
