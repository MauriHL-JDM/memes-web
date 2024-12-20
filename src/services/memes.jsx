const baseUrl = "https://memes-api.grye.org";

export const login = async (username, password) => {
  try {
    const response = await fetch(`${baseUrl}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
      },
      body: new URLSearchParams({ username, password }).toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      return [null, "Usuario o contraseña incorrectos"];
    }

    return [data, null];
  } catch (error) {
    return [null, error.message];
  }
};

export const register = async (username, password) => {
  try {
    const response = await fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
      },
      body: new URLSearchParams({ username, password }).toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      return [null, "Error al registrar usuario"];
    }

    return [data, null];
  } catch (error) {
    return [null, error.message];
  }
};

export const getMemes = async (page, limit) => {
  try {
    const url = `${baseUrl}/memes/?page=${page}&limit=${limit}`;
    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
      return [null, "Error al obtener memes"];
    }

    return [data, null];
  } catch (error) {
    return [null, error.message];
  }
};

export const postMeme = async (token, title, description, image) => {
  try {
    if (!token) {
      return [null, "Debes iniciar sesión para subir un meme!"];
    }

    const url = `${baseUrl}/memes/?title=${encodeURIComponent(
      title
    )}&description=${encodeURIComponent(description)}`;

    const formData = new FormData();
    formData.append("file", image.file);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: formData,
    });

    if (!response.ok) {
      return [null, "Error al subir meme."];
    }

    return ["Meme subido con éxito!", null];
  } catch (error) {
    return [null, error.message || "Ha ocurrido un error al subir meme"];
  }
};

export const likeMeme = async (token, memeId, currentLikes) => {
  try {
    if (!token) {
      return [null, "Debes iniciar sesión para dar like a un meme."];
    }

    const url = `${baseUrl}/memes/${memeId}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ likes: currentLikes + 1 }),
    });

    const { likes } = await response.json();

    if (!response.ok) {
      return [null, "Error al dar like a meme"];
    }

    return [likes, null];
  } catch (error) {
    return [null, error.message || "Error al subir meme"];
  }
};
