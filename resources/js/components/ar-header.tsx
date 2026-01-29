import { Link } from "@inertiajs/react";
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "lucide-react";
import library from "@/routes/library";

export function ARHeader() {
  return (
    <header className="sticky top-0 z-40 transform">
      <div className="relative z-40 border-default border-b backdrop-blur-sm transition-opacity">
        <div className="relative flex justify-between h-16 mx-auto lg:container lg:px-16 xl:px-20">
          <div className="flex items-center">
            <Link href={library.index()}>
              <Button variant="outline" size="sm">
                <ArrowLeftIcon />
                <span>Back</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}