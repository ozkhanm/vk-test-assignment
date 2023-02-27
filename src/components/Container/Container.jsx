import TimerDisplay from "../../components/TimerDisplay/TimerDisplay";
import Field from "../../components/Field/Field";
import SmileButton from "../../components/SmileButton/SmileButton";
import StatusBar from "../../components/StatusBar/StatusBar";
import MinesCounterDisplay from "../../components/MinesCounterDisplay/MinesCounterDisplay";

import "./Container.css";

const Container = () => {
  return (
    <div className="container">
      <StatusBar>
        <MinesCounterDisplay />

        <SmileButton />
        
        <TimerDisplay />
      </StatusBar>

      <Field />
    </div>
  );
};

export default Container;