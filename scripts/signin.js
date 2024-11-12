const signinForm = document.getElementById("signinForm");
signinForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            alert('Sign-in successful!');
            window.location.href = '../index.html';
        } else {
            document.getElementById('error-message').textContent = data.message || 'An error occurred during sign-in.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('error-message').textContent = 'An error occurred. Please try again later.';
    }

});


