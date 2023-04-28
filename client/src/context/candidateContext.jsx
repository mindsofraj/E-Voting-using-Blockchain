import { createContext, useEffect, useState } from "react";

export const CandidateContext = createContext();

export const CandidateContextProvider = ({ children }) => {
  const [candidatesList, setCandidatesList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get Candidate
  const getCandidate = async (contract) => {
    setLoading(true);
    const candidateNum = await contract.methods.getNumOfCandidates().call();
    // console.log("candidateNum", candidateNum);
    for (let i = 0; i <= candidateNum; i++) {
      const candidate = await contract.methods.getCandidate(i).call();

      if (
        candidate[0] !== "404" &&
        candidate[1] !== "" &&
        candidate[2] !== ""
      ) {
        // console.log(candidate[0], candidate[1], candidate[2]);
        const count = await contract.methods.results(candidate[0]).call();
        let candDetail = {
          id: candidate[0],
          name: candidate[1],
          dept: candidate[2],
          voteCount: count,
        };
        setCandidatesList((prev) => [...prev, candDetail]);
      }
    }
    setLoading(false);
  };

  return (
    <CandidateContext.Provider
      value={{ getCandidate, candidatesList, setCandidatesList, loading }}
    >
      {children}
    </CandidateContext.Provider>
  );
};
