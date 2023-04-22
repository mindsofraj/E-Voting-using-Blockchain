// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Voting {

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    struct Voter {
        uint candidateIDVote;
        bool voted;
    }

    struct Candidate {
        string name;
        string dept;
        bool doesExist; 
    }

    
    uint numCandidates;
    uint numVoters;

    mapping (uint => Candidate) candidates;
    mapping (uint => Voter) voters;

    // Add Candidates
    function addCandidate(string memory _name, string memory _dept) onlyOwner public {
        uint candidateID = numCandidates++;
        candidates[candidateID] = Candidate(_name, _dept, true);
    }

    // Voter for Candidates
    function doVote(uint _candidateID, uint _aadhaarID) public {
        if (candidates[_candidateID].doesExist == true) {
            if (voters[_aadhaarID].voted == false) {
                numVoters++; 
                voters[_aadhaarID] = Voter(_candidateID, true);
            }
        }
    }


    // Get Candidates
    function getCandidate(uint _candidateID) public view returns (uint, string memory, string memory) {
        return (_candidateID,candidates[_candidateID].name, candidates[_candidateID].dept);
    }

    // Get Number Of Candidates
    function getNumOfCandidates() public view returns(uint) {
        return numCandidates;
    }

    // Get Number of Voters
    function getNumOfVoters() public view returns(uint) {
        return numVoters;
    }

    // Results
    function results(uint _candidateID, uint _aadhaarID) view public returns (uint) {
        uint numOfVotes = 0; 
        for (uint i = 0; i < numVoters; i++) {
            if (voters[_aadhaarID].candidateIDVote == _candidateID) {
                numOfVotes++;
            }
        }
        return numOfVotes; 
    }

}