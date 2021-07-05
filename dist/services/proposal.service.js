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
const ERC20ABI = [{ "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleGranted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleRevoked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "Snapshot", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "DEFAULT_ADMIN_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DOMAIN_SEPARATOR", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MINTER_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PERMIT_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "SNAPSHOT_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "snapshotId", "type": "uint256" }], "name": "balanceOfAt", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burnFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "getRoleAdmin", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "getRoleMember", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "getRoleMemberCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "grantRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "hasRole", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "renounceRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "revokeRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "snapshot", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "snapshotId", "type": "uint256" }], "name": "totalSupplyAt", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }];
const snapshot_service_1 = __importDefault(require("./snapshot.service"));
// @ts-ignore
const ethers_1 = require("ethers");
const marked_1 = __importDefault(require("marked"));
const secrets_1 = require("../util/secrets");
let ErrorObject;
const fetch = require("node-fetch");
class ProposalService {
    constructor() {
        this.snapshots = new snapshot_service_1.default();
        this.Ethprovider = new ethers_1.ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/651d70d6548548bab0252e7ab1a96d36");
    }
    parseGovervors(proposal) {
        return __awaiter(this, void 0, void 0, function* () {
            proposal.endBlock = parseInt(proposal.endBlock);
            proposal.choices = ["Approved", "Rejected"];
            proposal.delegatesInFavor = proposal.votes.filter((p) => p.support);
            proposal.delegatesAgainst = proposal.votes.filter((p) => !p.support);
            proposal.delegatesTotal = proposal.delegatesInFavor.length + proposal.delegatesAgainst.length;
            proposal.delegatesInFavor.map((d) => {
                d.choice = (d.support) ? 1 : 2;
                d.voter = d.voter.id;
                d.balance = d.votes;
                delete d.id;
                delete d.support;
                delete d.votes;
                return d;
            });
            proposal.delegatesAgainst.map((d) => {
                d.choice = (d.support) ? 1 : 2;
                d.voter = d.voter.id;
                d.balance = d.votes;
                delete d.id;
                delete d.support;
                delete d.votes;
                return d;
            });
            const reducer = (accumulator, currentValue) => accumulator + parseFloat(currentValue.balance);
            proposal.votesInFavor = proposal.delegatesInFavor.reduce(reducer, 0);
            proposal.votesAgainst = proposal.delegatesAgainst.reduce(reducer, 0);
            proposal = yield this.addTimestampAndPriceData(proposal);
            yield this.avoidRateLimits();
            proposal.totalVoteCount = Math.round(proposal.votesInFavor + proposal.votesAgainst);
            const diff = proposal.votesInFavor - proposal.votesAgainst;
            proposal.disagreementLevel = 100 * diff / proposal.totalVoteCount;
            proposal.valueStaked = Math.round(proposal.totalVoteCount * proposal.tokenPriceUSD);
            proposal.title = proposal.excerpt = proposal["description"].replace("#", "").replace("##", ".").split(".")[0];
            proposal.description = marked_1.default(proposal.description);
            return proposal;
        });
    }
    parseAave(proposal) {
        return __awaiter(this, void 0, void 0, function* () {
            proposal.endBlock = parseInt(proposal.endBlock);
            proposal.choices = ["Approved", "Rejected"];
            proposal.delegatesInFavor = proposal.votes.filter((p) => p.support);
            proposal.delegatesAgainst = proposal.votes.filter((p) => !p.support);
            proposal.delegatesTotal = proposal.delegatesInFavor.length + proposal.delegatesAgainst.length;
            proposal.delegatesInFavor.map((d) => {
                d.choice = (d.support) ? 1 : 2;
                // d.voter = d.voter.id;
                d.balance = d.votingPower / 1000000000000000000;
                delete d.id;
                delete d.support;
                delete d.votingPower;
                return d;
            });
            proposal.delegatesAgainst.map((d) => {
                d.choice = (d.support) ? 1 : 2;
                // d.voter = d.voter.id;
                d.balance = d.votingPower / 1000000000000000000;
                delete d.id;
                delete d.support;
                delete d.votingPower;
                return d;
            });
            const reducer = (accumulator, currentValue) => accumulator + (parseFloat(currentValue.balance));
            proposal.votesInFavor = proposal.delegatesInFavor.reduce(reducer, 0);
            proposal.votesAgainst = proposal.delegatesAgainst.reduce(reducer, 0);
            proposal.totalVoteCount = Math.round(proposal.votesInFavor + proposal.votesAgainst);
            const diff = proposal.votesInFavor - proposal.votesAgainst;
            proposal.disagreementLevel = 100 * diff / proposal.totalVoteCount;
            proposal = yield this.addTimestampAndPriceData(proposal);
            proposal.valueStaked = Math.round(proposal.totalVoteCount * proposal.tokenPriceUSD);
            proposal.excerpt = proposal.title;
            proposal.description = proposal.shortDescription;
            return proposal;
        });
    }
    parseYearn(proposal) {
        return __awaiter(this, void 0, void 0, function* () {
            proposal.endBlock = parseInt(proposal.endBlock);
            proposal.votesInFavor = parseInt(proposal.forVotes);
            proposal.votesAgainst = parseInt(proposal.againstVotes);
            proposal.totalVoteCount = Math.round(proposal.votesInFavor + proposal.votesAgainst);
            const diff = proposal.votesInFavor - proposal.votesAgainst;
            proposal.disagreementLevel = (proposal.totalVoteCount > 0) ? 100 * diff / proposal.totalVoteCount : 0;
            proposal.excerpt = "on chain"; // proposal.title;
            proposal = yield this.addTimestampAndPriceData(proposal);
            if (isNaN(proposal.disagreementLevel)) {
                console.log(proposal);
            }
            return proposal;
        });
    }
    parseSnapshot(proposal) {
        return __awaiter(this, void 0, void 0, function* () {
            proposal.endBlock = parseInt(proposal.snapshot);
            proposal.excerpt = proposal.title;
            proposal.delegatesInFavor = proposal.votes.filter((p) => p.choice === 1);
            proposal.delegatesAgainst = proposal.votes.filter((p) => p.choice === 2);
            proposal.moreDelegates = proposal.votes.filter((p) => p.choice === 0);
            const delegates = proposal.votes.map((p) => p.voter);
            const scores = yield this.snapshots.getScores(proposal.space.id, delegates, parseInt(proposal.snapshot));
            console.log(scores.length);
            for (const d of proposal.delegatesInFavor) {
                let balance = 0;
                for (const strategyBalance of scores) {
                    balance = balance + strategyBalance[d.voter] || 0;
                }
                d.balance = balance;
            }
            for (const d of proposal.delegatesAgainst) {
                let balance = 0;
                for (const strategyBalance of scores) {
                    balance = balance + strategyBalance[d.voter] || 0;
                }
                d.balance = balance;
            }
            proposal.delegatesInFavor.filter((d) => d.balance > 0);
            proposal.delegatesAgainst.filter((d) => d.balance > 0);
            proposal.delegatesTotal = proposal.delegatesInFavor.length + proposal.delegatesAgainst.length;
            const reducer = (accumulator, currentValue) => accumulator + (parseFloat(currentValue.balance));
            proposal.votesInFavor = proposal.delegatesInFavor.reduce(reducer, 0);
            proposal.votesAgainst = proposal.delegatesAgainst.reduce(reducer, 0);
            proposal.totalVoteCount = proposal.votesInFavor + proposal.votesAgainst;
            const diff = proposal.votesInFavor - proposal.votesAgainst;
            proposal.disagreementLevel = (proposal.totalVoteCount > 0) ? 100 * diff / proposal.totalVoteCount : 0;
            proposal = yield this.addTimestampAndPriceData(proposal);
            proposal.valueStaked = Math.round(proposal.totalVoteCount * proposal.tokenPriceUSD);
            yield this.avoidRateLimits();
            // if(isNaN(proposal.disagreementLevel)) {
            //   console.log(proposal);
            // }
            return proposal;
        });
    }
    avoidRateLimits() {
        return __awaiter(this, void 0, void 0, function* () {
            setTimeout(() => {
                return;
            }, 10000);
        });
    }
    addTimestampAndPriceData(proposal) {
        return __awaiter(this, void 0, void 0, function* () {
            const block = yield this.Ethprovider.getBlock(proposal.endBlock);
            if (block && block.timestamp) {
                proposal.closingTimestamp = block.timestamp;
                const closingDate = new Date(proposal.closingTimestamp * 1000);
                proposal.closingDate = closingDate.getFullYear() + "-" + (closingDate.getMonth() + 1) + "-" + closingDate.getDate();
                const url = "https://data.messari.io/api/v1/assets/" + proposal.token + "/metrics/price/time-series?start=" + proposal.closingDate + "&end=" + proposal.closingDate + "&interval=1d";
                try {
                    const res = yield fetch(url, {
                        method: "GET",
                        headers: { "Content-Type": "application/json", "x-messari-api-key": secrets_1.MESSARI_API_KEY },
                    });
                    const obj = yield res.json();
                    if (obj.data && obj.data.values && obj.data.values[0]) {
                        proposal.tokenPriceUSD = obj.data.values[0][4];
                    }
                    else {
                        console.log(url);
                        console.log(obj);
                        proposal.tokenPriceUSD = false;
                    }
                    return proposal;
                }
                catch (e) {
                    return proposal;
                }
            }
            else {
                return proposal;
            }
        });
    }
}
exports.default = ProposalService;
//# sourceMappingURL=proposal.service.js.map