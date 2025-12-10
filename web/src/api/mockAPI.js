export const getUserPreferences = async (id) => {
  const PREFS = import.meta.env.VITE_PREFS_URL;
  const res = await fetch(`${PREFS}/user/${id}`);
  return res.json();
};
