import FieldRow from "../FieldRow/FieldRow";

import "./Field.css";

const Field = () => {
  const ROWS = 16;

  return (
    <div className="field">
      { new Array(ROWS).fill(null).map((_, id) => <FieldRow key={`row-${id}`} />) }
    </div>
  );
};

export default Field;
