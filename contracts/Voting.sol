// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Voting {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
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
    uint[] public aadhaarList;
    bool public publishResults = false;

    mapping(uint => Candidate) candidates;
    mapping(uint => Voter) voters;

    // Add Candidates
    function addCandidate(
        string memory _name,
        string memory _dept
    ) public onlyOwner {
        uint candidateID = numCandidates++;
        candidates[candidateID] = Candidate(_name, _dept, true);
    }

    // Remove Candidate
    function removeCandidate() public onlyOwner {
        for (uint i = 0; i <= numCandidates; i++) {
            delete candidates[i];
        }
        for (uint i = 0; i < numVoters; i++) {
            delete voters[aadhaarList[i]];
        }
        numVoters = 0;
        numCandidates = 0;
        delete aadhaarList;
        publish(false);
    }

    // Voter for Candidates
    function doVote(uint _candidateID, uint _aadhaarID) public {
        if (candidates[_candidateID].doesExist == true) {
            if (voters[_aadhaarID].voted == false) {
                numVoters++;
                aadhaarList.push(_aadhaarID);
                voters[_aadhaarID] = Voter(_candidateID, true);
            }
        }
    }

    // Check if voter has voted or not
    function checkIfVoted(uint _aadhaarID) public view returns (bool) {
        return voters[_aadhaarID].voted;
    }

    // Get Candidates
    function getCandidate(
        uint _candidateID
    ) public view returns (uint, string memory, string memory) {
        if (candidates[_candidateID].doesExist == true) {
            return (
                _candidateID,
                candidates[_candidateID].name,
                candidates[_candidateID].dept
            );
        } else {
            return (404, "", "");
        }
    }

    // Get Number Of Candidates
    function getNumOfCandidates() public view returns (uint) {
        return numCandidates;
    }

    // Get Number of Voters
    function getNumOfVoters() public view returns (uint) {
        return numVoters;
    }

    // Results
    function results(uint _candidateID) public view returns (uint) {
        uint numOfVotes = 0;
        for (uint i = 0; i < numVoters; i++) {
            if (voters[aadhaarList[i]].candidateIDVote == _candidateID) {
                numOfVotes++;
            }
        }
        return numOfVotes;
    }

    // Store Result Published State
    function publish(bool status) public returns (bool) {
        publishResults = status;
        return publishResults;
    }
}
