import Cell from "../Cell/Cell";

import "./FieldRow.css";

const FieldRow = () => {
  const CELLS = 16;

  return (
    <div className="row">
      { new Array(CELLS).fill(null).map((_, id) => <Cell key={`cell-${id}`} />)}
    </div>
  );
};

export default FieldRow;
