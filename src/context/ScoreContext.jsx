import { createContext, useContext } from "react";
import { callApi } from "../utils";

const ScoreContext = createContext();
const ScoreProvider = ({ children }) => {
  const fetchScoreInfo = async (id) => {
    try {
      const res = await callApi("get", `user/scores/${id}`, true);
      return res;
    } catch (err) {}
  };

  return (
    <ScoreContext.Provider value={{ fetchScoreInfo }}>
      {children}
    </ScoreContext.Provider>
  );
};

const useScore = () => useContext(ScoreContext);
export { useScore, ScoreProvider };
