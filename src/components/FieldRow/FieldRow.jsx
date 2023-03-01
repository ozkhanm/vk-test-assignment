import Cell from "../Cell/Cell";

import { CELLS } from "../../constants";

import "./FieldRow.css";

const FieldRow = ({ row }) => {
  return (
    <div className="row">
      { new Array(CELLS).fill(null).map((_, cell) => <Cell key={`cell-${cell}`} row={row} cell={cell} />) }
    </div>
  );
};

export default FieldRow;
