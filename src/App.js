import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function BlockCard({block}) {
  return (
    <div className='block'>
      <h3>Block Number:</h3>
    </div>
  )
}

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });

  useEffect(() => {
    if (blockNumber) {
      const blocksList = [];
      for (let i = blockNumber; i > blockNumber-10; i--) {
        alchemy.core.getBlock(i).then(block => {
          blocksList.push(<BlockCard key={block.number} block={block} />);
          // console.log(block);
        });
      }
       
      setBlocks(blocksList);
    }
  }, [blockNumber])
  console.log(blocks)

  return (
    <div className="App">
      {
        Boolean(blocks.length) && blocks
      }
    </div>
  )
}

export default App;
