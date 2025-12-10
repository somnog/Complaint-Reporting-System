export async function getComplaints() {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch("http://localhost:3001/api/complaints", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  const rawData = await res.json();

  // ALWAYS return array
  return Array.isArray(rawData)
    ? rawData
    : rawData && typeof rawData === "object"
    ? [rawData]
    : [];
}
