import type { Metadata } from "next";
import AdminInbox from "./AdminInbox";

export const metadata: Metadata = {
  title: "Inbox",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminInbox />;
}
