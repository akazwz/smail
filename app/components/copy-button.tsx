import { CheckIcon, ClipboardIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";

export function CopyButton({ content }: { content: string }) {
	const [status, setStatus] = useState<"idle" | "copied">("idle");
	const icons = {
		idle: <ClipboardIcon strokeWidth="1.5px" />,
		copied: <CheckIcon strokeWidth="1.5px" />,
	};

	async function copy() {
		try {
			await navigator.clipboard.writeText(content);
			setStatus("copied");
		} catch (error) {
			console.error(error);
		} finally {
			setTimeout(() => setStatus("idle"), 1000);
		}
	}

	return (
		<Button variant="secondary" onClick={copy}>
			{icons[status]}
		</Button>
	);
}
