import './App.css'
import Button from './components/shared/Button'
import Input from './components/shared/Input'
import Spacing from './components/shared/Spacing'
import Text from './components/shared/Text'
import TextField from './components/shared/TextField'

function App() {
  return (
    <div>
      <Text typography="t1" display="block">
        t1
      </Text>
      <Text typography="t2" display="block">
        t2
      </Text>
      <Text typography="t3" display="block">
        t3
      </Text>
      <Text typography="t4" display="block">
        t4
      </Text>
      <Text typography="t5" display="block">
        t5
      </Text>

      <Spacing size={8} />
      <Button>클릭</Button>
      <Button color="success">클릭</Button>
      <Button color="error">클릭</Button>
      <Button>클릭</Button>

      <Spacing size={8} />
      <Input placeholder="입력해주세요" />
      <TextField label="이름" placeholder="이름을 입력해주세요" />
    </div>
  )
}

export default App
