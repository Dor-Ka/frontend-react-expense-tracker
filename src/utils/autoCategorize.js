import { CATEGORY_KEYWORDS } from "../constants/categoryKeywords";
import { CATEGORY_OPTIONS } from "../constants/categories";

export const autoCategorize = (title) => {
  if (!title || title.trim() === "") {
    return "Other";
  }

  const lowerTitle = title.toLowerCase();

  for (const category of CATEGORY_OPTIONS) {
    if (category === "Other") continue;

    const keywords = CATEGORY_KEYWORDS[category] || [];
    for (const keyword of keywords) {
      if (lowerTitle.includes(keyword.toLowerCase())) {
        return category;
      }
    }
  }

  return "Other";
};
