import { deletePost } from "../../api/post/delete.js";

export async function onDeletePost(event) {
  event.preventDefault();

  const postId = event.target.getAttribute("data-post-id");
  if (!postId) {
    console.error("Post ID not found.");
    return;
  }

  if (!confirm("Are you sure you want to delete this post?")) {
    return;
  }

  try {
    await deletePost(postId);

    const postElement = document.getElementById(`post-${postId}`);
    if (postElement) {
      postElement.remove();
    }
  } catch (error) {
    console.error("Error deleting post from UI:", error);
    alert("Failed to delete post: " + error.message);
  }
}
