import AdBanners from '@/components/home/AdBanners'
import ProductListColumn from '@/components/home/ProductListColumn'
import ProductListRow from '@/components/home/ProductListRow'
import ListRow from '@/components/shared/ListRow'
import Spacing from '@/components/shared/Spacing'
import Top from '@/components/shared/Top'
import { Suspense } from 'react'

function HomePage() {
  return (
    <div>
      <Top
        title="Exclusive Collections"
        subTitle="Welcome to a world of limited edition treasures"
      />
      <AdBanners />
      <Top title="Popular Items" subTitle="Discover what's trending!" />
      <ProductListColumn />
      <Spacing size={12} />
      <Top title="New Items" subTitle="Check out the latest trends!" />
      <Suspense
        fallback={[...new Array(10)].map((_, idx) => (
          <ListRow.Skeleton key={idx} />
        ))}
      >
        <ProductListRow />
      </Suspense>
    </div>
  )
}

export default HomePage
