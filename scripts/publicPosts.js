// All Posts
document.addEventListener("DOMContentLoaded", async () => {
    const postsContainer = document.getElementById("posts");

    try {
        const response = await fetch("http://localhost:3000/posts"); // Fetch all posts
        const posts = await response.json();

        if (response.ok) {
            posts.forEach(post => {
                const postDiv = document.createElement("div");
                postDiv.className = "post";
                postDiv.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.content}</p>
                    <small>Author: ${post.author.username}</small>
                    <button onclick="viewPost('${post.id}')">Read More</button>
                `;
                postsContainer.appendChild(postDiv);
            });
        } else {
            alert("Failed to fetch posts.");
        }
    } catch (error) {
        console.error("Error fetching posts:", error);
        alert("An error occurred while fetching posts.");
    }
});

function viewPost(postId) {
    window.location.href = `/post.html?id=${postId}`; // Redirect to a detailed view page
}
