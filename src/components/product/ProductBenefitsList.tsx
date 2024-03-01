import ListRow from '@/components/shared/ListRow'
import { motion } from 'framer-motion'

function ProductBenefitsList({ benefit }: { benefit: string[]; id: string }) {
  return (
    <ul>
      {benefit.map((text, idx) => (
        <motion.li
          key={text}
          initial={{
            opacity: 0,
            translateX: -90,
          }}
          whileInView={{
            opacity: 1,
            translateX: 0,
          }}
          transition={{
            duration: 0.7,
            ease: 'easeInOut',
            delay: idx * 0.1,
          }}
        >
          <ListRow
            as="div"
            key={text}
            left={<IconCheck />}
            contents={
              <ListRow.Texts title={`응모 관련 ${idx + 1}`} subTitle={text} />
            }
          />
        </motion.li>
      ))}
    </ul>
  )
}

function IconCheck() {
  return (
    <img
      src="https://cdn2.iconfinder.com/data/icons/thesquid-ink-40-free-flat-icon-pack/64/nike-dunk-512.png"
      alt="check"
      width={24}
      height={24}
    />
  )
}

export default ProductBenefitsList
