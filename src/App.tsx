import { useState } from 'react';
import DefaultHeader from './view/Header';
import MainScreen from './view/MainScreen';
import { MAIN_STATES, type MainState } from './view/utils/registries';

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
