import './style/App.css'
import DefaultHeader from './view/Header'
import MainScreen from './view/MainScreen'
import { MAIN_STATES } from './view/utils/registries'

function App() {
  return (
    <>
      < DefaultHeader />
      < MainScreen state={MAIN_STATES.TASK_DISPLAY} />
    </>
  )
}

export default App;