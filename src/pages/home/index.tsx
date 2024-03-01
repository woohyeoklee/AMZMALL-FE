import AdBanners from '@/components/home/AdBanners'
import ProductList from '@/components/home/ProductList'
import ListRow from '@/components/shared/ListRow'
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
      <Suspense
        fallback={[...new Array(10)].map((_, idx) => (
          <ListRow.Skeleton key={idx} />
        ))}
      >
        <ProductList />
      </Suspense>
    </div>
  )
}

export default HomePage
