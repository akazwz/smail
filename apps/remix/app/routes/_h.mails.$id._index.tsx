import { type LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData, useRouteError } from "@remix-run/react";
import { getEmail } from "database/dao";
import { getWebTursoDBFromEnv } from "database/db";
import { format } from "date-fns/format";
import { ArrowUturnLeft, UserCircleIcon } from "icons";
import { load } from "cheerio";

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id;
  const db = getWebTursoDBFromEnv();
  if (!id) {
    throw new Error("No mail id provided");
  }
  const mail = await getEmail(db, id);
  if (!mail) {
    throw new Error("No mail found");
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

export default function MailViewer() {
  const mail = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-1 flex-col p-2 gap-10">
      <Link
        to="/"
        className="flex w-fit font-semibold items-center border p-2 rounded-md gap-2"
      >
        <ArrowUturnLeft />
        Back Home
      </Link>
      <div className="flex items-start">
        <div className="flex items-start gap-4 text-sm">
          <div>
            <UserCircleIcon />
          </div>
          <div className="grid gap-1">
            <div className="font-semibold">{mail.from.name}</div>
            <div className="line-clamp-1 text-xs">{mail.subject}</div>
            <div className="line-clamp-1 text-xs">
              <span className="font-medium">Reply-To:</span> {mail.from.address}
            </div>
          </div>
        </div>
        {mail.date && (
          <div className="ml-auto text-xs text-muted-foreground">
            {format(new Date(mail.date), "PPpp")}
          </div>
        )}
      </div>
      <div className="flex-1 flex text-sm min-h-0 overflow-y-auto">
        <article
          className="prose"
          dangerouslySetInnerHTML={{ __html: mail.html || "" }}
        />
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError() as Error;
  return (
    <div className="flex flex-1 flex-col gap-10">
      <Link
        to="/"
        className="flex w-fit font-semibold items-center border p-2 rounded-md gap-2"
      >
        <ArrowUturnLeft />
        Back Home
      </Link>

      <div className="flex items-center justify-center font-semibold text-xl text-red-500">
        {error.message}
      </div>
    </div>
  );
}
