import { AppLayout } from "@/layouts/app-layout";
import { about } from "@/routes";
import { type BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'About',
    href: about().url,
  },
]

export default function About() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="About" />
      About
    </AppLayout>
  )
}