import { useState } from "react";
import "./App.css";
import StartGameScreen from "./component/StartGameScreen";
import InGameScreen from "./component/InGameScreen";
import EndGameScreen from "./component/EndGameScreen";
import ReviewScreen from "./component/ReviewScreen";
import "./component/style.css";

const App = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const handlePageChange = (newPage: any, data: any) => {
    setData(data);
    setPage(newPage);
  };
  const content = (page: number) => {
    switch (page) {
      case 1:
        return <StartGameScreen data={data} onDataChange={handlePageChange} />;
      case 2:
        return <InGameScreen data={data} onDataChange={handlePageChange} />;
      case 3:
        return <EndGameScreen data={data} onDataChange={handlePageChange} />;
      case 4:
        return <ReviewScreen data={data} onDataChange={handlePageChange} />;
    }
  };
  return <div className="app-wrapper">{content(page)}</div>;
};

export default App;
