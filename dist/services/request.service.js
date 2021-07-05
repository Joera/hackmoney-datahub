"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graph_connector_1 = __importDefault(require("../connectors/graph.connector"));
const proposal_service_1 = __importDefault(require("./proposal.service"));
class RequestService {
    constructor() {
        this.theGraphConnector = new graph_connector_1.default();
        this.proposals = new proposal_service_1.default();
    }
    uniswap() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                // governorAlpha
                // https://thegraph.com/explorer/subgraph/messari/uniswap-governance
                const subgraph = "https://api.thegraph.com/subgraphs/name/messari/uniswap-governance";
                const proposalQuery = `{
          proposals(first :15, skip : 15) {
            id
            description
            status
            endBlock
            votes(first :1000) {
              id
              support
              votes
              voter {
                id
              }
            }
          }
        }`;
                const response = yield this.theGraphConnector.get(subgraph, { query: proposalQuery });
                if (response.data) {
                    const proposals = response.data.data.proposals.filter((p) => p.votes.length > 0);
                    for (let proposal of proposals) {
                        proposal.protocol = "uniswap";
                        proposal.token = "UNI";
                        proposal.onChain = true;
                        proposal = yield this.proposals.parseGovervors(proposal);
                    }
                    resolve(proposals);
                }
            }));
        });
    }
    compound() {
        return __awaiter(this, void 0, void 0, function* () {
            // governorAlpha  + governorBravo
            // https://thegraph.com/explorer/subgraph/arr00/compound-governance-2
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const subgraph = "https://api.thegraph.com/subgraphs/name/arr00/compound-governance-2";
                const proposalQuery = `{
          proposals(first :15, skip : 0) {
            id
            description
            status
            endBlock
            votes(first :1000) {
              id
              support
              votes
              voter {
                id
              }
            }
          }
        }`;
                const response = yield this.theGraphConnector.get(subgraph, { query: proposalQuery });
                const proposals = response.data.data.proposals.filter((p) => p.votes.length > 0 && parseInt(p.endBlock) > 10300000);
                for (let proposal of proposals) {
                    proposal.protocol = "compound";
                    proposal.token = "COMP";
                    proposal.onChain = true;
                    proposal = yield this.proposals.parseGovervors(proposal);
                }
                resolve(proposals);
            })).catch((error) => {
                return false;
            });
        });
    }
    aave() {
        return __awaiter(this, void 0, void 0, function* () {
            // ?
            // https://thegraph.com/explorer/subgraph/aave/governance-v2
            const subgraph = "https://api.thegraph.com/subgraphs/name/aave/governance-v2";
            const proposalQuery = `{
      proposals(first: 100) {
        id
        state
        ipfsHash
        endBlock
        currentYesVote
        currentNoVote
        votes {
          id
          voter
          support
          votingPower
        }
        title
        shortDescription
        author
      }
    }`;
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.theGraphConnector.get(subgraph, { query: proposalQuery });
                const proposals = response.data.data.proposals.filter((p) => p.votes.length > 0);
                for (let proposal of proposals) {
                    proposal.protocol = "aave";
                    proposal.onChain = true;
                    proposal.token = "AAVE";
                    proposal = yield this.proposals.parseAave(proposal);
                }
                resolve(proposals);
            })).catch((error) => {
                return false;
            });
        });
    }
    yearn() {
        return __awaiter(this, void 0, void 0, function* () {
            // ?
            // https://thegraph.com/explorer/subgraph/crazyrabbitltc/yearngovernance
            const subgraph = "https://api.thegraph.com/subgraphs/name/crazyrabbitltc/yearngovernance";
            const proposalQuery = `{
      proposals(first: 100) {
          id
          timestamp
          blockNumber
          forVotes
          againstVotes
          endBlock
          totalVotesAvailible
          quorumReached
          metadata
          timestamp
      }
      }`;
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.theGraphConnector.get(subgraph, { query: proposalQuery });
                const proposals = response.data.data.proposals.filter((p) => parseInt(p.endBlock) > 0 && p.quorumReached !== false);
                for (let proposal of proposals) {
                    proposal.protocol = "yearn";
                    proposal.onChain = true;
                    proposal.token = "YFI";
                    proposal = yield this.proposals.parseYearn(proposal);
                }
                resolve(proposals);
            })).catch((error) => {
                return false;
            });
        });
    }
    snapshotProposals() {
        return __awaiter(this, void 0, void 0, function* () {
            // off chain
            // https://hub.snapshot.page/graphql
            const apiUrl = "https://hub.snapshot.page/graphql";
            // ,,"yam.eth","curve.eth","balancer"
            // "yearn","ybaby.eth"
            const proposalQuery = `{
        proposals(
          first: 15,
          skip: 0,
          where: {
            space_in: ["curve.eth"] 
          },
          orderBy: "created",
          orderDirection: desc
        ) {
          id
          title
          body
          choices
          start
          end
          snapshot
          state
          author
          space {
            id
            name
          }
        }
      }
      `;
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.theGraphConnector.get(apiUrl, { query: proposalQuery });
                // for yearn only improvement proposals
                const proposals = response.data.data.proposals.filter((p) => {
                    return (p.space.id !== "ybaby.eth" && p.space.id !== "yearn" && p.space.id !== "yam.eth" && p.space.id !== "mstable" && p.space.id !== "curve.eth") || p.title.indexOf("YIP-") > -1 || p.title.indexOf("PDP-") > -1 || p.title.indexOf("sCIP#") > -1;
                });
                for (let proposal of proposals) {
                    proposal.votes = yield this.snapshotVotes(proposal.id);
                    console.log(proposal.space.id);
                    switch (proposal.space.id) {
                        case "yearn":
                        case "ybaby.eth":
                            proposal.protocol = "yearn";
                            proposal.token = "YFI";
                            break;
                        case "yam.eth":
                            proposal.protocol = "yam";
                            proposal.token = "YAM";
                            break;
                        case "curve.eth":
                            proposal.protocol = "curve";
                            proposal.token = "CRV";
                            break;
                        case "mstable":
                            proposal.protocol = "mstable";
                            proposal.token = "MTA";
                            break;
                        case "balancer":
                            proposal.protocol = "balancer";
                            proposal.token = "BAL";
                            break;
                    }
                    proposal.onChain = false;
                    proposal = yield this.proposals.parseSnapshot(proposal);
                }
                resolve(proposals);
            })).catch((error) => {
                return false;
            });
        });
    }
    snapshotVotes(proposalId) {
        return __awaiter(this, void 0, void 0, function* () {
            // off chain
            // https://hub.snapshot.page/graphql
            const apiUrl = "https://hub.snapshot.page/graphql";
            const votesQuery = `{
        votes (
          first: 10000
          where: {
            proposal: "` + proposalId + `"
          }
        ) {
          id
          voter
          created
          choice
        }
      }
      `;
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.theGraphConnector.get(apiUrl, { query: votesQuery });
                resolve(response.data.data.votes);
            })).catch((error) => {
                return false;
            });
        });
    }
}
exports.default = RequestService;
//# sourceMappingURL=request.service.js.map