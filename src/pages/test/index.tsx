import Spacing from '@/components/shared/Spacing'
import AdBannerAddButton from '@/components/test/AdBannerAddButton'
import ProudctListAddButton from '@components/test/ProudctListAddButton'
import RecommendProductButton from '@components/test/RecommendProductButton'

function TestPage() {
  return (
    <div>
      <ProudctListAddButton />
      <AdBannerAddButton />
      <Spacing size={20} />
      {/* <CountdownTimer  /> */}
      <RecommendProductButton />
    </div>
  )
}

export default TestPage
