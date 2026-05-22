export function displayNameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? email;
  if (!local) {
    return email;
  }

  return local.charAt(0).toUpperCase() + local.slice(1);
}

export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    const first = parts[0]?.[0] ?? "";
    const last = parts[parts.length - 1]?.[0] ?? "";
    return `${first}${last}`.toUpperCase();
  }

  return name.trim().slice(0, 2).toUpperCase() || "?";
}
