
import { sha256 } from "js-sha256";


class Block 
{
  private index: number;
  private timestamp: string;
  private data: string;
  private nonce: number = 0;
  public hash: string;
  public previousHash: string;


  public constructor(index: number, timestamp: string, data: string, previousHash = "")
  {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;

    this.hash = this.calculateHash();
  }


  public calculateHash (): string 
  {
    return sha256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
  }

  public mineBlock (difficulty: number): void
  {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0"))
    {
      this.hash = this.calculateHash();
      this.nonce++;
    }

    console.log("Block Mined: " + this.hash);
  }
}



class Blockchain
{
  private chain: Block[];
  private difficulty: number = 4;


  public constructor()
  {
    this.chain = new Array();
    this.chain[0] = this.createGenesisBlock();
  }


  public createGenesisBlock (): Block
  {
    return new Block(0, "1/1/2017", "Genesis Block", "0");
  }

  public getLatestBlock (): Block
  {
    return this.chain[this.chain.length - 1];
  }

  public addBlock (newBlock: Block): void
  {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  public isChainValid (): boolean
  {
    for (let i = 1; i < this.chain.length; i++)
    {
      let currentBlock  = this.chain[i];
      let previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash())     return false;

      if (currentBlock.previousHash !== previousBlock.hash)       return false;
    }

    return true;
  }
}


let typeCoin = new Blockchain();

let block = new Block(1, "1/1/2018", "Amount: 5");
console.log("Mine Block 1...");
typeCoin.addBlock(block);

let block2 = new Block(2, "2/1/2018", "Amount: 10");
console.log("Mine Block 2...");
typeCoin.addBlock(block2);


 console.log(JSON.stringify(typeCoin, null, 4));
// console.log("Is chain valid? " + typeCoin.isChainValid());
