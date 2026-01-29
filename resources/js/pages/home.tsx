import { AppLayout } from "@/layouts/app-layout"
import { home } from "@/routes"
import { type BreadcrumbItem } from "@/types"
import { Head } from "@inertiajs/react"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Home',
    href: home().url,
  },
]

export default function Home() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Home" />
      {/* Hero Section */}
      <section id="beranda" className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight">
                SD Hang Tuah 9
              </h2>
              <p className="text-lg text-gray-700">
                Bergabunglah dengan keluarga besar SD Hang Tuah 9 Candi, sekolah yang mengintegrasikan keunggulan akademik dengan pembentukan karakter dan wawasan maritim untuk generasi masa depan Indonesia.
              </p>
              <div className="flex flex-wrap gap-4">
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  {/* <CheckCircle className="w-5 h-5 text-green-600" /> */}
                  <span className="text-sm font-medium text-gray-700">Terakreditasi</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* <CheckCircle className="w-5 h-5 text-green-600" /> */}
                  <span className="text-sm font-medium text-gray-700">Guru Profesional</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* <CheckCircle className="w-5 h-5 text-green-600" /> */}
                  <span className="text-sm font-medium text-gray-700">Fasilitas Lengkap</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-amber-200 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
              <img
                src="https://customer-assets.emergentagent.com/job_hang-tuah-candi/artifacts/egkm5oh3_image.png"
                alt="SD Hang Tuah 9 Candi"
                className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">15+</div>
              <div className="text-sm text-blue-200">Tahun Berpengalaman</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">500+</div>
              <div className="text-sm text-blue-200">Siswa Aktif</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">30+</div>
              <div className="text-sm text-blue-200">Tenaga Pengajar</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">95%</div>
              <div className="text-sm text-blue-200">Kepuasan Orang Tua</div>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  )
}