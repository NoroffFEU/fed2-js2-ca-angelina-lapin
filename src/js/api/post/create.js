import { API_SOCIAL_POSTS } from '../constants.js';
import { headers } from '../headers.js';

/**
 * 
 * @param {object} params - The parameters to create a post
 * @param {string} params.title - The title of the post
 * @param {string} params.body - The body of the post
 * @param {string} [params.tags=""] - The tags of the post
 * @param {string} [params.mediaUrl=""] - The media URL of the post
 *  @param {string} [params.mediaAlt=""] - The media alt of the post
 * @param {string} [params.mediaAlt=""] - The media alt of the post
 *@returns {Promise<object>} The created post
 @throws {Error} An error 
 */

export async function createPost({
  title,
  body,
  tags = '',
  mediaUrl = '',
  mediaAlt = '',
}) {
  try {
    const requestBody = {
      title,
      body,
      tags: tags.split(',').map((tag) => tag.trim()),
    };

    if (mediaUrl) {
      requestBody.media = {
        url: mediaUrl,
        alt: mediaAlt || 'Image description',
      };
    }

    const response = await fetch(API_SOCIAL_POSTS, {
      method: 'POST',
      headers: {
        ...headers(),
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'X-Noroff-API-Key': '11cac378-6134-4713-89c2-121feef595fa',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create post');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}
