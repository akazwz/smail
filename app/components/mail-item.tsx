import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface MailItemProps {
	id: string;
	name: string;
	email: string;
	subject: string;
	date: string;
	isRead?: boolean;
}

export function MailItem({
	id,
	name,
	email,
	subject,
	date,
	isRead = true,
}: MailItemProps) {
	const domain = email.split("@")[1];

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		const now = new Date();
		const diffTime = Math.abs(now.getTime() - date.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays === 1) return "今天";
		if (diffDays === 2) return "昨天";
		if (diffDays <= 7) return `${diffDays - 1}天前`;
		return date.toLocaleDateString("zh-CN", { month: "short", day: "numeric" });
	};

	return (
		<Button
			asChild
			size="sm"
			className={cn(
				"h-16 sm:h-20 w-full rounded-none justify-start gap-3 sm:gap-4 relative p-3 sm:p-4",
				isRead ? "opacity-80" : "bg-blue-50 hover:bg-blue-100",
			)}
			variant="ghost"
		>
			<Link to={`/mail/${id}`}>
				{!isRead && (
					<div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full" />
				)}
				<Avatar className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10">
					<AvatarImage src={`https://unavatar.io/${domain}`} />
					<AvatarFallback className="text-xs sm:text-sm">
						{name.slice(0, 2).toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<div className="flex-1 min-w-0 space-y-0.5 sm:space-y-1">
					<div className="flex items-center justify-between">
						<span
							className={cn(
								"text-sm font-medium truncate",
								!isRead && "font-semibold",
							)}
						>
							{name}
						</span>
						<span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
							{formatDate(date)}
						</span>
					</div>
					<div className="text-xs text-muted-foreground truncate">{email}</div>
					<div
						className={cn(
							"text-xs sm:text-sm truncate",
							isRead ? "text-muted-foreground" : "text-gray-900 font-medium",
						)}
					>
						{subject}
					</div>
				</div>
			</Link>
		</Button>
	);
}
