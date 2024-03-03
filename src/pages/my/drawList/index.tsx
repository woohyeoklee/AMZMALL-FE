import useDrawProducts from '@/components/drawList/hooks/useDrawProducts'
import ListRow from '@/components/shared/ListRow'
import addDelimiter from '@/utils/addDelimiter'

function DrawListPage() {
  const { data, isLoading } = useDrawProducts()
  if (data == null || isLoading === true) {
    return null
  }
  return (
    <div>
      {data.map(({ product, draw }) => (
        <ListRow
          key={draw.id}
          left={
            <img
              src={product.mainImageUrl}
              alt={product.name}
              width={80}
              height={80}
            />
          }
          contents={
            <ListRow.Texts
              title={product.name}
              subTitle={`${addDelimiter(product.price)}원`}
            />
          }
          withArrow
        />
      ))}
    </div>
  )
}

export default DrawListPage
