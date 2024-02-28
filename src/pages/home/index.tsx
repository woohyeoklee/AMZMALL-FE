import AdBanners from '@/components/home/AdBanners'
import ProductList from '@/components/home/ProductList'
import Top from '@/components/shared/Top'

function HomePage() {
  return (
    <div>
      <Top title="Home" subTitle="Welcome to the home page" />
      <AdBanners />
      <ProductList />
    </div>
  )
}

export default HomePage
