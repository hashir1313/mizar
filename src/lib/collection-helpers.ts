import { type ContentEntryMap, getCollection } from "astro:content";

export async function getCollectionStaticPaths<CollectionName extends keyof ContentEntryMap>(
	collectionName: CollectionName,
): Promise<PathParams<CollectionName>[]> {
	const collection = await getCollection(collectionName);

	const visibleItems = collection.filter((item) => {
		return !item.data.hidden;
	});

	const paths = visibleItems.map((item) => {
		let slug = item.slug;

		if (collectionName === "pages") {
			slug = slug === "homepage" || slug === "index" ? "" : slug;
		}

		return {
			params: {
				slug: slug || undefined,
			},
			props: {
				data: item,
			},
		};
	});

	return paths;
}
