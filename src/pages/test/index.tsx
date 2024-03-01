import Spacing from '@/components/shared/Spacing'
import AdBannerAddButton from '@/components/test/AdBannerAddButton'
import ProudctListAddButton from '@components/test/ProudctListAddButton'

function TestPage() {
  return (
    <div>
      <ProudctListAddButton />
      <AdBannerAddButton />
      <Spacing size={20} />
      {/* <CountdownTimer  /> */}
    </div>
  )
}

export default TestPage
