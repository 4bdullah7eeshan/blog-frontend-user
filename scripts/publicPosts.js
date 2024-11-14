// All Posts
document.addEventListener("DOMContentLoaded", async () => {
    const postsContainer = document.getElementById("posts");

    try {
        const response = await fetch("https://blog-api-f102.onrender.com/posts"); // Fetch all posts
        const posts = await response.json();

        if (response.ok) {
            // Create the table element
            const table = document.createElement("table");
            table.className = "table table-hover table-striped table-bordered";

            // Create the table header
            table.innerHTML = `
                            <thead class="table-dark">
                                <tr>
                                    <th>Title</th>
                                    <th>Content</th>
                                    <th>Author</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                        `;

            // Create the table body
            const tbody = document.createElement("tbody");

            // Populate each row with post data
            posts.forEach(post => {
                const row = document.createElement("tr");

                row.innerHTML = `
                                <td>${post.title}</td>
                                <td>${post.content.slice(0, 50)}...</td>
                                <td>${post.author.username}</td>
                                <td>
                                    <button class="btn btn-secondary btn-sm" onclick="window.location.href='pages/view-post.html?id=${post.id}'">
                                        Read More
                                    </button>
                                </td>
                            `;

                tbody.appendChild(row);
            });

            // Append tbody to the table
            table.appendChild(tbody);

            // Append table to the posts container
            postsContainer.appendChild(table);
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
