const postId = new URLSearchParams(window.location.search).get('id');
const token = localStorage.getItem('token'); // To check if user is signed in

async function loadPostAndComments() {
    try {
        // Fetch post details
        const response = await fetch(`http://localhost:3000/posts/${postId}`);
        const post = await response.json();

        // Render post details
        document.getElementById('postContainer').innerHTML = `
                    <div class="bg-dark text-white p-5">
                        <h1 class="display-3">${post.title}</h1>
                    </div>
                    <div class="px-5 py-3">
                        <small>AUTHOR</small>
                        <p>${post.author.username}</p>
                        
                    </div>
            
                    <div class="post-content mt-1 px-5 mb-1">
                        <p class="lead mb-2">${post.content}</p>
                    </div>

                    
                `;

        // Render comments
        const commentsHTML = post.comments.map(comment => `
                    <div class="comment card mb-3 p-3 bg-light">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <p class="mb-1">${comment.content}</p>
                                <small class="text-muted">By: ${comment.username}</small>
                            </div>
                            ${token && comment.userId === post.username
                ? `<button class="btn btn-danger btn-sm" onclick="deleteComment('${comment.id}')"><i class="bi bi-trash"></i></button>`
                : ''
            }
                        </div>
                    </div>
                `).join('');
        document.getElementById('commentsContainer').innerHTML = `
                    <hr />
                    <h3>Comments:</h3>
                    <div class="comments-list">${commentsHTML}</div>
                `;

        // If user is signed in, show the comment form
        if (token) {
            document.getElementById('commentsContainer').innerHTML += `
                        <form id="addCommentForm" onsubmit="addComment(event)" class="mt-4">
                            <div class="mb-3">
                                <textarea id="commentContent" class="form-control" placeholder="Add a comment" rows="4" required></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary">Post Comment</button>
                        </form>
                    `;
        }
    } catch (error) {
        console.error("Error fetching post:", error);
    }
}

loadPostAndComments();

async function addComment(event) {
    event.preventDefault();
    const content = document.getElementById("commentContent").value;

    try {
        const response = await fetch(`http://localhost:3000/posts/${postId}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ content })
        });

        if (response.ok) {
            loadPostAndComments(); // Reload to show new comment
        } else {
            alert("Failed to add comment. Make sure you are signed in.");
        }
    } catch (error) {
        console.error("Error adding comment:", error);
    }
}

async function deleteComment(commentId) {
    try {
        const response = await fetch(`http://localhost:3000/posts/${postId}/comments/${commentId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            loadPostAndComments(); // Reload to reflect deletion
        } else {
            alert("Failed to delete comment.");
        }
    } catch (error) {
        console.error("Error deleting comment:", error);
    }
}