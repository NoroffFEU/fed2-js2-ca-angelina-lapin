import { API_SOCIAL_POSTS } from '../constants.js';
import { headers } from '../headers.js';
import { API_KEY } from '../constants.js';
/**
 *
 * @param {string} id - The ID of the post to update
 * @param {object} params - The parameters to update a post
 * @param {string} params.title - The title of the post
 * @param {string} params.body - The body of the post
 * @param {string[]} params.tags - The tags of the post
 * @param {string} [params.media=""] - The media URL of the post
 * @returns {Promise<object>} The updated post
 * @throws {Error} An error
 */
export async function updatePost(id, { title, body, tags, media }) {
  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
      method: 'PUT',
      headers: {
        ...headers(),
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'X-Noroff-API-KEY': API_KEY,
      },
      body: JSON.stringify({
        title,
        body,
        tags,
        media,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update post');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}
