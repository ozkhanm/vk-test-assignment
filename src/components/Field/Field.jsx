import FieldRow from "../FieldRow/FieldRow";

import { ROWS } from "../../constants";

import "./Field.css";

const Field = () => {
  return (
    <div className="field">
      { new Array(ROWS).fill(null).map((_, id) => <FieldRow key={`row-${id}`} row={id} />) }
    </div>
  );
};

export default Field;
