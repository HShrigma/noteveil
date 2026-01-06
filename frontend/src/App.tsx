import { useState } from 'react';
import DefaultHeader from './components/Header';
import MainScreen from './components/MainScreen';
import { MAIN_STATES, type MainState } from './utils/registries';

function App() {
  const [state, setState] = useState<MainState>(MAIN_STATES.PROJECTS_DISPLAY);

  const handleDisplayChange = (value: MainState) => {
    setState(value);
  };
  const handleProjectSelect = (state: MainState, id: number) => {
    handleDisplayChange(state);
  }
  return (
    <>
      <DefaultHeader onScreenChange={handleDisplayChange} currentState={state} />
      <MainScreen state={state} onProjectSelect={handleProjectSelect}/>
    </>
  );
}

export default App;
