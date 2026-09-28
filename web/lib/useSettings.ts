'use client'

import { useEffect, useState } from "react";

export type ModelType = "v0-1.5-sm" | "v0-1.5-md" | "v0-1.5-lg";

export interface Settings {
	model: ModelType;
	imageGenerations: boolean;
	thinking: boolean;
}

const DEFAULT_SETTINGS: Settings = {
	model: "v0-1.5-sm",
	imageGenerations: false,
	thinking: false,
};

const SETTINGS_KEY = "v0-settings";

function getWebStorage(): Storage | null {
	if (typeof window === "undefined") return null;
	try {
		const ls = window.localStorage;
		if (
			!ls ||
			typeof ls.getItem !== "function" ||
			typeof ls.setItem !== "function"
		) {
			return null;
		}
		return ls;
	} catch {
		return null;
	}
}

export function useSettings() {
	const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

	// Load settings from localStorage on mount
	useEffect(() => {
		const ls = getWebStorage();
		if (!ls) return;
		try {
			const saved = ls.getItem(SETTINGS_KEY);
			if (saved) {
				const parsed = JSON.parse(saved);
				setSettings({ ...DEFAULT_SETTINGS, ...parsed });
			}
		} catch (error) {
			console.warn("Failed to load settings from localStorage:", error);
		}
	}, []);

	// Save settings to localStorage when they change
	const updateSettings = (newSettings: Partial<Settings>) => {
		const updated = { ...settings, ...newSettings };
		setSettings(updated);

		const ls = getWebStorage();
		if (!ls) return;
		try {
			ls.setItem(SETTINGS_KEY, JSON.stringify(updated));
		} catch (error) {
			console.warn("Failed to save settings to localStorage:", error);
		}
	};

	return {
		settings,
		updateSettings,
	};
}
