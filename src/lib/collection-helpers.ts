import { type ContentEntryMap, getCollection } from "astro:content";

export async function getCollectionStaticPaths<CollectionName extends keyof ContentEntryMap>(
	collectionName: CollectionName,
): Promise<PathParams<CollectionName>[]> {
	const collection = await getCollection(collectionName);

	const visibleItems = collection.filter((item) => {
		return !item.data.hidden;
	});

	const paths = visibleItems.map((item) => {
		const [lang, ...slug] = item.slug.split("/");
		let localizedSlug = slug;

		if (collectionName === "pages") {
			localizedSlug = slug[0] === "homepage" || slug[0] === "index" ? [] : slug;
		}

		return {
			params: {
				lang,
				slug: localizedSlug.join("/") || undefined,
			},
			props: {
				data: item,
			},
		};
	});

	return paths;
}
