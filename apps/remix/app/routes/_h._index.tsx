import { NotSelected } from "~/components/mail/components/NotSelected";
import { ResizableHandle, ResizablePanel } from "~/components/ui/resizable";
const defaultLayout = [265, 440, 655];

export default function Index() {
  return (
    <>
      <ResizableHandle className="hidden md:flex" />
      <ResizablePanel
        defaultSize={defaultLayout[2]}
        className={"hidden md:flex"}
      >
        <NotSelected />
      </ResizablePanel>
    </>
  );
}
