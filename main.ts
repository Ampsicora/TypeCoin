
import { SHA256 } from "crypto-js";


class Block 
{
  private index: number;
  private timestamp: string;
  private data: string;
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


  public calculateHash(): string 
  {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}



class Blockchain
{
  private chain: Block[];


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
    newBlock.hash = newBlock.calculateHash();
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


let ampsicoraCoin = new Blockchain();
let block = new Block(1, "1/1/2018", "Amount: 5");
let block2 = new Block(2, "2/1/2018", "Amount: 10");
ampsicoraCoin.addBlock(block);
ampsicoraCoin.addBlock(block2);

console.log(JSON.stringify(ampsicoraCoin, null, 4));
console.log("Is chain valid? " + ampsicoraCoin.isChainValid());
