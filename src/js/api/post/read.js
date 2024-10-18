import { API_SOCIAL_PROFILES, API_SOCIAL_POSTS } from '../constants.js';
import { headers } from '../headers.js';
/**
 *
 * @param {string} username - The username to fetch posts for
 * @returns {Promise<object[]>} The posts
 * @throws {Error} An error
 */
export async function loadUserPosts(username) {
  try {
    const response = await fetch(
      `${API_SOCIAL_PROFILES}/${username}/posts?limit=12`,
      {
        method: 'GET',
        headers: headers(),
      }
    );

    if (!response.ok) {
      const error = await response.json();

      throw new Error(error.message || 'Failed to load posts');
    }

    const posts = await response.json();

    return posts;
  } catch (error) {
    console.error('Error loading posts:', error);
    throw error;
  }
}
/**
 *
 * @param {number} limit - The number of posts to fetch
 * @returns {Promise<object[]>} The posts
 * @throws {Error} An error
 */
export async function readPosts(limit = 12) {
  try {
    const response = await fetch(`${API_SOCIAL_POSTS}?limit=${limit}`, {
      method: 'GET',
      headers: headers(),
    });

    if (!response.ok) {
      const error = await response.json();

      throw new Error(error.message || 'Failed to load posts');
    }

    const posts = await response.json();

    return posts;
  } catch (error) {
    console.error('Error loading all posts:', error);
    throw error;
  }
}
/**
 *
 * @param {string} id - The ID of the post to fetch
 * @returns {Promise<object>} The post
 * @throws {Error} An error
 */
export async function getPostById(id) {
  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
      method: 'GET',
      headers: headers(),
    });

    if (!response.ok) {
      const error = await response.json();

      throw new Error(error.message || 'Failed to fetch post');
    }

    const post = await response.json();

    return post.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
}
