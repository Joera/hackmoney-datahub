
let ErrorObject : any;
const fetch = require("node-fetch");

export default class SnapshotService {

  network = "1";
 // provider;
  strategies: any[];

  constructor() {
 //   this.provider = snapshot.utils.getProvider(this.network);

  }

  async getScores(space: string, voters: any[], snapshot: number) {

    // return new Promise( async (resolve, reject) => {

      let strategies: any[] = [];

      switch(space) {

        case "yearn":

          strategies = [
            {
              "name": "erc20-balance-of",
              "params": {
                "symbol": "YFI",
                "address": "0xBa37B002AbaFDd8E89a1995dA52740bbC013D992",
                "decimals": 18
              }
            },
            {
              "name": "yearn-vault",
              "params": {
                "symbol": "YFI (yYFI)",
                "address": "0xBA2E7Fed597fd0E3e70f5130BcDbbFE06bB94fe1",
                "decimals": 18
              }
            },
            {
              "name": "delegation",
              "params": {
                "symbol": "YFI (delegated)",
                "strategies": [
                  {
                    "name": "erc20-balance-of",
                    "params": {
                      "address": "0xBa37B002AbaFDd8E89a1995dA52740bbC013D992",
                      "decimals": 18
                    }
                  },
                  {
                    "name": "yearn-vault",
                    "params": {
                      "address": "0xBA2E7Fed597fd0E3e70f5130BcDbbFE06bB94fe1",
                      "decimals": 18
                    }
                  }
                ]
              }
            }
          ];

      break;

      case "ybaby.eth":

        strategies = [
          {
            "name": "pagination",
            "params": {
              "symbol": "YFI",
              "strategy": {
                "name": "erc20-balance-of",
                "params": {
                  "address": "0x5584e034094BBC734751fE48A701e9758e1dDA88",
                  "decimals": 18
                }
              }
            }
          },
          {
            "name": "delegation",
            "params": {
              "symbol": "Delegated YFI",
              "strategies": [
                {
                  "name": "erc20-balance-of",
                  "params": {
                    "symbol": "YFI",
                    "address": "0x5584e034094BBC734751fE48A701e9758e1dDA88",
                    "decimals": 18
                  }
                }
              ]
            }
          }
        ];

      break;

      case "balancer":

        strategies = [
        {
          "name": "erc20-balance-of",
          "params": {
            "symbol": "BAL",
            "address": "0xba100000625a3754423978a60c9317c58a424e3D",
            "decimals": 18
          }
        },
        {
          "name": "balancer",
          "params": {
            "symbol": "BAL BPT",
            "address": "0xba100000625a3754423978a60c9317c58a424e3D"
          }
        },
        {
          "name": "delegation",
          "params": {
            "symbol": "BAL & BAL BPT (delegated)",
            "strategies": [
              {
                "name": "erc20-balance-of",
                "params": {
                  "address": "0xba100000625a3754423978a60c9317c58a424e3D",
                  "decimals": 18
                }
              },
              {
                "name": "balancer",
                "params": {
                  "address": "0xba100000625a3754423978a60c9317c58a424e3D"
                }
              }
            ]
          }
        }
      ];

      break;

      case "yam.eth":

        strategies = [
          {
            "name": "contract-call",
            "params": {
              "symbol": "YAM LP",
              "address": "0xc32f9b0292965c5dd4a0ea1abfcc1f5a36d66986",
              "decimals": 24,
              "methodABI": {
                "name": "getCurrentVotes",
                "type": "function",
                "inputs": [
                  {
                    "name": "owner",
                    "type": "address",
                    "internalType": "address"
                  }
                ],
                "outputs": [
                  {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                  }
                ],
                "payable": false,
                "constant": false,
                "stateMutability": "nonpayable"
              }
            }
          }
        ];

      break;

      case "curve.eth":

          strategies = [{
              "name": "erc20-balance-of",
              "params": {
                "symbol": "veCRV",
                "address": "0x5f3b5DfEb7B28CDbD7FAba78963EE202a494e2A2",
                "decimals": 18
              }
            }
          ];
      break;


      }

      const SNAPSHOT_SCORE_API = "https://score.snapshot.org/api/scores";
      const network = "1";

      const params = {
        space,
        network,
        snapshot,
        strategies,
        addresses : voters
      };

      try {

        const res = await fetch(SNAPSHOT_SCORE_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ params })
        });
        const obj = await res.json();
        if(obj.result) {

          return obj.result.scores;
        } else {
          console.log(obj);
          return [false,false];
        }

      } catch (e) {
        return Promise.reject(e);
      }
    // });
  }
}
