export function JsonLd(props: { data: unknown }) {
	return (
		<script type="application/ld+json" innerHTML={JSON.stringify(props.data)} />
	);
}
