import appLogo from "@/assets/images/logo.png"
import { PlusIcon } from "lucide-react"

export default function AppLogoIcon({ ...props }) {
  return (
    <img src={appLogo} alt="Company logo" className="h-10" {...props} />
  )
}