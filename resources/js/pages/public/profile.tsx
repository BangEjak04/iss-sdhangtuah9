import { AppLayout } from "@/layouts/app-layout";
import library from "@/routes/library";
import { type BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Home',
    href: library.index().url,
  },
]

export default function Profile() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Profile" />
      Profile
    </AppLayout>
  )
}