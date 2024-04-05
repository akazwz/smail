import { format } from "date-fns/format";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Separator } from "~/components/ui/separator";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { load } from "cheerio";
import { getEmailDetail } from "database/dao";
import { NotSelected } from "~/components/mail/components/NotSelected";

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

  if (!mail) return <NotSelected></NotSelected>;

  return (
    <div className="flex flex-1 flex-col">
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
      <Separator className="mt-auto" />
    </div>
  );
}
