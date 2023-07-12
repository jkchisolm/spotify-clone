export const formatDate = (month: "long" | "short", date: Date) => {
  const d = new Date(date);
  const monthName = d.toLocaleString("default", { month: month });
  const day = d.getDate();
  const year = d.getFullYear();
  return `${monthName} ${day}, ${year}`;
};
