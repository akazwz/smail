import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

import { cn } from "~/lib/utils";
import { ScrollArea } from "~/components/ui/scroll-area";

import { Link, useParams } from "@remix-run/react";
import { Email } from "database/schema";
import { NoEmail } from "./NoEmail";

interface MailListProps {
  items: Email[];
}

export function MailList({ items }: MailListProps) {
  const params = useParams<{ id: string }>();
  if (!items.length) {
    return <NoEmail />;
  }
  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <Link
            key={item.id}
            to={`/${item.id}`}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              params.id === item.id && "bg-muted"
            )}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.from.name}</div>
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    params.id === item.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {formatDistanceToNow(new Date(item.date as string), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="text-xs font-medium">{item.subject}</div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {(item.text as string).substring(0, 300)}
            </div>
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
}
