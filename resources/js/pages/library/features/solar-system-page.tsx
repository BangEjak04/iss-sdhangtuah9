import { ARLayout } from "@/layouts/ar-layout"
import { ModelViewer } from "@/components/model-viewer"
import EarthModel from "@/components/model/earth"
import SunModel from "@/components/model/sun"
import MercuryModel from "@/components/model/mercury"
import VenusModel from "@/components/model/venus"
import MarsModel from "@/components/model/mars"
import JupiterModel from "@/components/model/jupiter"
import SaturnModel from "@/components/model/saturn"
import UranusModel from "@/components/model/uranus"
import NeptuneModel from "@/components/model/neptune"

export default function SolarSystemPage() {
  return (
    <ARLayout>
      <ModelViewer>
        <SunModel />
      </ModelViewer>
      
      <ModelViewer>
        <MercuryModel />
      </ModelViewer>
      
      <ModelViewer>
        <VenusModel />
      </ModelViewer>

      <ModelViewer>
        <EarthModel />
      </ModelViewer>

      <ModelViewer>
        <MarsModel />
      </ModelViewer>

      <ModelViewer>
        <JupiterModel />
      </ModelViewer>

      <ModelViewer>
        <SaturnModel />
      </ModelViewer>

      <ModelViewer>
        <UranusModel />
      </ModelViewer>

      <ModelViewer>
        <NeptuneModel />
      </ModelViewer>
    </ARLayout>
  )
}