pragma solidity ^0.8.24;

import "fhevm/lib/TFHE.sol";

contract SimpleVoting {

    // A very simple struct for maintaining proposal info 
    // not much of an info tbh 😅
    struct Proposal {
        euint16 totalVotes;
        string proposalName;
    }

    // maintaing proposal for each candidate
    mapping(address => Proposal) public Proposals;

    // A very simple function to add a proposal
    function addProposal(string calldata _proposalName) public {
        Proposals[msg.sender] = Proposal(TFHE.asEuint16(0), _proposalName);
        Proposal memory _proposal = Proposals[msg.sender];
        TFHE.allow(_proposal.totalVotes, address(this));
        TFHE.allow(_proposal.totalVotes, msg.sender);
    }

    // A very non-sensical voting function 😅
    function voteProposal(address candidate, einput _vote, bytes calldata _inputProof) public {
        // user vote (true / false) was encrypted
        ebool userVote = TFHE.asEbool(_vote, _inputProof);

        // selecting the proposal to vote for 
        Proposal memory _candidateProposal = Proposals[candidate];

        // allow msg.sender to use this encrypted total votes value
        // rememeber something like ACL (Access Control List) table in docs
        TFHE.allowTransient(_candidateProposal.totalVotes, msg.sender);

        // updating votes
        _candidateProposal.totalVotes = TFHE.select(userVote, TFHE.add(_candidateProposal.totalVotes, 1), TFHE.add(_candidateProposal.totalVotes, 0));
    }
}