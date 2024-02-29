import AdBanners from '@/components/home/AdBanners'
import ProductList from '@/components/home/ProductList'
import Top from '@/components/shared/Top'

function HomePage() {
  return (
    <div>
      <Top
        title="Exclusive Collections"
        subTitle="Welcome to a world of limited edition treasures"
      />
      <AdBanners />
      <Top title="Popular Items" subTitle="Discover what's trending!" />
      <ProductList />
    </div>
  )
}

export default HomePage
