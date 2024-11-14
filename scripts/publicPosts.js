// All Posts
document.addEventListener("DOMContentLoaded", async () => {
    const postsContainer = document.getElementById("posts");

    try {
        const response = await fetch("http://localhost:3000/posts"); // Fetch all posts
        const posts = await response.json();

        if (response.ok) {
            posts.forEach(post => {
                const postDiv = document.createElement("div");
                postDiv.className = "post col-12 col-md-6 col-lg-4 mb-4";
                postDiv.innerHTML = `
                    <div class="card h-100 text-bg-dark border-dark">
                        <div class="card-body">
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-text">${post.content.slice(0, 100)}...</p>
                            <small>AUTHOR: ${post.author.username}</small>
                        </div>
                        <div class="card-footer mx-auto">
                            <button class="btn btn-secondary" onclick="window.location.href='pages/view-post.html?id=${post.id}'">Read More</button>
                        </div>
                    </div>
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
