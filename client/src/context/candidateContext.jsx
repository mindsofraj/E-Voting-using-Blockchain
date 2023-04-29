import { createContext, useEffect, useState } from "react";

export const CandidateContext = createContext();

export const CandidateContextProvider = ({ children }) => {
  const [candidatesList, setCandidatesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contract, setContract] = useState(null);

  // Get Candidate
  const getCandidate = async (contract) => {
    setContract(contract);
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

  // Get Total Number of Candidates
  const numOfCandidates = async (contract) => {
    const candidateNum = await contract.methods.getNumOfCandidates().call();
    return candidateNum;
  };

  // Get Total Number of Voters
  const numOfVoters = async (contract) => {
    const voterNum = await contract.methods.getNumOfVoters().call();
    return voterNum;
  };

  return (
    <CandidateContext.Provider
      value={{
        getCandidate,
        candidatesList,
        setCandidatesList,
        loading,
        numOfCandidates,
        numOfVoters,
        contract,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};
