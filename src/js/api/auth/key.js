import { API_AUTH_KEY } from "../constants";

export async function getKey() {
  try {
    const response = await fetch(API_AUTH_KEY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "My API Key name",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create API Key");
    }

    const data = await response.json();

    return data.data.key;
  } catch (error) {
    console.error("Error creating API Key:", error);
  }
}

getKey();
