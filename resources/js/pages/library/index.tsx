import { AppLayout } from "@/layouts/app-layout";
import library from "@/routes/library";
import { Link } from "@inertiajs/react";

export default function Index() {
  return (
    <AppLayout>
      <Link href={library.feature.solarSystem()}>
        <div className="px-4 py-6 bg-linear-to-br from-blue-950 to-blue-700 rounded-2xl">
          <div className="font-bold text-white">AR Solar System</div>
        </div>
      </Link>
    </AppLayout>
  )
}