import contacts from "@/content/global/contacts.json";
import footer from "@/content/global/en/footer.json";
import header from "@/content/global/en/header.json";
import seo from "@/content/global/en/seo.json";
import style from "@/content/global/style.json";
import widget from "@/content/global/widget.json";

const settings: LocalizedSettings = {
	header,
	footer,
	contacts,
	seo,
	style,
	widget,
};

export function getLocalizedSettings(): LocalizedSettings {
	return settings;
}

export function isLocalizedUrl(url: string): boolean {
	return false;
}

export function unlocalizedUrl(url: string): string {
	return url;
}

export function translatePath(pathOrLocale: string, path?: string) {
	return path ?? pathOrLocale;
}
