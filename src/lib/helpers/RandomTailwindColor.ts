const colors = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
  "stone",
];

const categoryColors = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  // "#ffeb3b",
  // "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#9e9e9e",
  "#607d8b",
];

const intensities = ["500", "600", "700", "800", "900"];

export const getRandomTailwindColor = () => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomIntensity =
    intensities[Math.floor(Math.random() * intensities.length)];
  return `${randomColor}-${randomIntensity}`;
};

export const getRandomCategoryBackgroundColor = () => {
  return categoryColors[Math.floor(Math.random() * categoryColors.length)];
};
