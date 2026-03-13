import { useEffect, useState } from "react";
import { type FormationDraft, defaultFormationDraft } from "./formationDraft";

const STORAGE_KEY = "uk-formations-draft";

export function useFormationDraft() {
  const [draft, setDraft] = useState<FormationDraft>(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error("Failed to load draft from session storage:", error);
    }
    return defaultFormationDraft;
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch (error) {
      console.error("Failed to save draft to session storage:", error);
    }
  }, [draft]);

  const updateDraft = (updates: Partial<FormationDraft>) => {
    setDraft((prev) => ({ ...prev, ...updates }));
  };

  const clearDraft = () => {
    setDraft(defaultFormationDraft);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear draft from session storage:", error);
    }
  };

  return { draft, updateDraft, clearDraft };
}
