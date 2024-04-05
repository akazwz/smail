import type { Account, Mail } from "../data";

interface MailProps {
  accounts: Account[];
  mails: Mail[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function Mail({
  accounts,
  mails,
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
}: MailProps) {
  return <></>;
}
