export const BOOK_COLORS = [
  // Reds
  "#fee2e2",
  "#fecaca",
  "#fca5a5",
  "#f87171",
  "#ef4444",
  "#dc2626",
  "#b91c1c",
  // Oranges
  "#fff7ed",
  "#ffedd5",
  "#fed7aa",
  "#fdba74",
  "#fb923c",
  "#f97316",
  "#ea580c",
  // Ambers / Yellows
  "#fef3c7",
  "#fde68a",
  "#fcd34d",
  "#fbbf24",
  "#f59e0b",
  "#d97706",
  "#b45309",
  // Limes / Greens
  "#ecfccb",
  "#d9f99d",
  "#bef264",
  "#a3e635",
  "#84cc16",
  "#65a30d",
  "#4d7c0f",
  // Emerald / Teal
  "#d1fae5",
  "#a7f3d0",
  "#6ee7b7",
  "#34d399",
  "#10b981",
  "#059669",
  "#047857",
  // Cyan / Light Blue
  "#cffafe",
  "#a5f3fc",
  "#67e8f9",
  "#22d3ee",
  "#06b6d4",
  "#0891b2",
  "#0e7490",
  // Blues
  "#dbeafe",
  "#bfdbfe",
  "#93c5fd",
  "#60a5fa",
  "#3b82f6",
  "#2563eb",
  "#1d4ed8",
  // Indigo / Violet
  "#e0e7ff",
  "#c7d2fe",
  "#a5b4fc",
  "#818cf8",
  "#6366f1",
  "#4f46e5",
  "#4338ca",
  // Purple / Fuchsia
  "#ede9fe",
  "#ddd6fe",
  "#c4b5fd",
  "#a78bfa",
  "#8b5cf6",
  "#7c3aed",
  "#6d28d9",
  // Pink / Rose
  "#ffe4e6",
  "#fecdd3",
  "#fda4af",
  "#fb7185",
  "#f43f5e",
  "#e11d48",
  "#be123c",
  // Neutrals / Slate
  "#f8fafc",
  "#f1f5f9",
  "#e2e8f0",
  "#cbd5e1",
  "#94a3b8",
  "#64748b",
  "#475569",
  // Warm grays / browns
  "#f5f5f4",
  "#e7e5e4",
  "#d6d3d1",
  "#a8a29e",
  "#78716c",
  "#57534e",
  "#44403c",
];

export function colorForTitle(title: string) {
  let hash = 5381;
  for (let i = 0; i < title.length; i++) {
    hash = (hash << 5) + hash + title.charCodeAt(i);
  }
  const idx = Math.abs(hash) % BOOK_COLORS.length;
  return BOOK_COLORS[idx];
}
