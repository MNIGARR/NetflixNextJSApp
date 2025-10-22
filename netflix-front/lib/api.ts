const API_BASE = "http://localhost:8800/api/v1";

export const signup = async (user: {
  username: string;
  email: string;
  password: string;
}) => {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Signup failed");
  }

  return data;
};

export const login = async (user: {
  email: string;
  password: string;
}) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json();
};

export const getTrendingMovies = async () => {
  const res = await fetch(`${API_BASE}/movie/trending`);
  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch trending movies");
  }

  return data.content;
};

export const getTrendingTVShows = async () => {
  const res = await fetch(`${API_BASE}/tv/trending`);
  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch trending TV shows");
  }

  return data.content;
};