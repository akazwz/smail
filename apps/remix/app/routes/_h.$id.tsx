import { addDays } from "date-fns/addDays";
import { addHours } from "date-fns/addHours";
import { format } from "date-fns/format";
import { nextSaturday } from "date-fns/nextSaturday";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Separator } from "~/components/ui/separator";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { load } from "cheerio";
import { getEmailDetail } from "database/dao";
import { NotSelected } from "~/components/mail/components/NotSelected";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Forward,
  MoreVertical,
  Reply,
  ReplyAll,
  Archive,
  ArchiveX,
  Clock,
  Trash2,
  MoveLeft,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Calendar } from "~/components/ui/calendar";
import { useNavigation } from "react-day-picker";
export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id;

  if (!id) {
    throw new Error("No mail id provided");
  }

  const mail = await getEmailDetail(id);
  if (!mail) {
    throw new Error(`No mail: ${id} found`);
  }

  const $ = load(mail.html || "");
  $("img").each((idx, item) => {
    const src = $(item).attr("src");
    if (src?.startsWith("cid:")) {
      const cid = src.slice(4);
      mail.attachments?.forEach((attachment) => {
        if (attachment.contentId === `<${cid}>`) {
          const base64Src = `data:${attachment.mimeType};base64,${attachment.content}`;
          $(item).attr("src", base64Src);
        }
      });
    }
  });
  mail.html = $.html();

  return mail;
};

export default function MailDetail() {
  const mail = useLoaderData<typeof loader>();
  const today = new Date();
  const navigate = useNavigate();
  if (!mail) return <NotSelected />;

  return (
    <TooltipProvider>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center p-2">
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={!mail}
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <MoveLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Back</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={!mail}>
                  <Archive className="h-4 w-4" />
                  <span className="sr-only">Archive</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Archive</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={!mail}>
                  <ArchiveX className="h-4 w-4" />
                  <span className="sr-only">Move to junk</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Move to junk</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={!mail}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Move to trash</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Move to trash</TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="mx-1 h-6" />
            <Tooltip>
              <Popover>
                <PopoverTrigger asChild>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" disabled={!mail}>
                      <Clock className="h-4 w-4" />
                      <span className="sr-only">Snooze</span>
                    </Button>
                  </TooltipTrigger>
                </PopoverTrigger>
                <PopoverContent className="flex w-[535px] p-0">
                  <div className="flex flex-col gap-2 border-r px-2 py-4">
                    <div className="px-4 text-sm font-medium">Snooze until</div>
                    <div className="grid min-w-[250px] gap-1">
                      <Button
                        variant="ghost"
                        className="justify-start font-normal"
                      >
                        Later today{" "}
                        <span className="ml-auto text-muted-foreground">
                          {format(addHours(today, 4), "E, h:m b")}
                        </span>
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start font-normal"
                      >
                        Tomorrow
                        <span className="ml-auto text-muted-foreground">
                          {format(addDays(today, 1), "E, h:m b")}
                        </span>
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start font-normal"
                      >
                        This weekend
                        <span className="ml-auto text-muted-foreground">
                          {format(nextSaturday(today), "E, h:m b")}
                        </span>
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start font-normal"
                      >
                        Next week
                        <span className="ml-auto text-muted-foreground">
                          {format(addDays(today, 7), "E, h:m b")}
                        </span>
                      </Button>
                    </div>
                  </div>
                  <div className="p-2">
                    <Calendar />
                  </div>
                </PopoverContent>
              </Popover>
              <TooltipContent>Snooze</TooltipContent>
            </Tooltip>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={!mail}>
                  <Reply className="h-4 w-4" />
                  <span className="sr-only">Reply</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reply</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={!mail}>
                  <ReplyAll className="h-4 w-4" />
                  <span className="sr-only">Reply all</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reply all</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={!mail}>
                  <Forward className="h-4 w-4" />
                  <span className="sr-only">Forward</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Forward</TooltipContent>
            </Tooltip>
          </div>
          <Separator orientation="vertical" className="mx-2 h-6" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Mark as unread</DropdownMenuItem>
              <DropdownMenuItem>Star thread</DropdownMenuItem>
              <DropdownMenuItem>Add label</DropdownMenuItem>
              <DropdownMenuItem>Mute thread</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Separator />
        <div className="flex items-start p-4">
          <div className="flex items-start gap-4 text-sm">
            <Avatar>
              <AvatarImage alt={mail.name} />
              <AvatarFallback>
                {mail.from.name
                  .split(" ")
                  .map((chunk) => chunk[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="font-semibold">{mail.name}</div>
              <div className="line-clamp-1 text-xs">{mail.subject}</div>
              <div className="line-clamp-1 text-xs">
                <span className="font-medium">Reply-To:</span>{" "}
                {mail.to[0].address}
              </div>
            </div>
          </div>
          {mail.date && (
            <div className="ml-auto text-xs text-muted-foreground">
              {format(new Date(mail.date), "PPpp")}
            </div>
          )}
        </div>
        <Separator />
        <div
          className="flex-1 whitespace-pre-wrap p-4 text-sm"
          dangerouslySetInnerHTML={{
            __html: mail.html || "",
          }}
        ></div>
      </div>
    </TooltipProvider>
  );
}
