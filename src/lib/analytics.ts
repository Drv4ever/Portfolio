export async function incrementVisit(): Promise<number | null> {
  try {
    const res = await fetch(
      "https://api.countapi.xyz/hit/drv4ever-portfolio/visits",
    );
    if (!res.ok) return null;
    const json = await res.json();
    return typeof json.value === "number" ? json.value : null;
  } catch (e) {
    return null;
  }
}

export async function getVisitCount(): Promise<number | null> {
  try {
    const res = await fetch(
      "https://api.countapi.xyz/get/drv4ever-portfolio/visits",
    );
    if (!res.ok) return null;
    const json = await res.json();
    return typeof json.value === "number" ? json.value : null;
  } catch (e) {
    return null;
  }
}
