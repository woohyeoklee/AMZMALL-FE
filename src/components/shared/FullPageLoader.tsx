import Flex from './Flex'
import Spacing from './Spacing'
import Text from './Text'

function FullPageLoader({ message }: { message?: string }) {
  return (
    <Flex
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
      justify="center"
      align="center"
    >
      <Flex direction="column" align="center">
        <img
          width={120}
          src="https://cdn2.iconfinder.com/data/icons/thesquid-ink-40-free-flat-icon-pack/64/nike-dunk-512.png"
          alt=""
        />

        {message != null ? (
          <>
            <Spacing size={120} />
            <Text bold={true} typography="t4">
              {message}
            </Text>
          </>
        ) : null}
      </Flex>
    </Flex>
  )
}

export default FullPageLoader
