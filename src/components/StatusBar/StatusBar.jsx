import "./StatusBar.css";

const StatusBar = ({ children }) => {
  return (
    <div className="status-bar">
      { children }
    </div>
  );
};

export default StatusBar;
