import { useState } from 'react';
import DefaultHeader from './components/Header';
import MainScreen from './components/MainScreen';
import { MAIN_STATES, type MainState } from './utils/registries';

function App() {
  const [state, setState] = useState<MainState>(MAIN_STATES.TASK_DISPLAY);

  const handleDisplayChange = (value: MainState) => {
    setState(value);
  };

  return (
    <>
      <DefaultHeader onScreenChange={handleDisplayChange} currentState={state} />
      <MainScreen state={state} />
    </>
  );
}

export default App;
