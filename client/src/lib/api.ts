const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchHello = async () => {
  const res = await fetch(`${API_URL}/`);
  return await res.text();
};
