import AppLogoIcon from "@/components/app-logo-icon";

export default function AppLogo({...props}) {
  return (
    <div className="flex items-center">
      <AppLogoIcon {...props}/>
      <div className="flex flex-col ml-2">
        <span className="text-lg font-bold text-slate-900 dark:text-white leading-tight">SD HANG TUAH 9</span>
        <span className="text-sm leading-tight text-slate-500 dark:text-slate-400">YAYASAN HANG TUAH</span>
      </div>
    </div>
  )
}