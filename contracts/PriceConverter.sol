// SPDX-License-Identifier: MIT

pragma solidity 0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

//if we want to use a library, we should set each function as "internal"
library PriceConverter {

    //Get the price of ETH in USD
    function getPrice(AggregatorV3Interface priceFeed) internal view returns (uint256) {      
        (, int256 answer, , , ) = priceFeed.latestRoundData();
        return uint256(answer * 10000000000); // or 1e10
    }

    function getConversionRate(uint256 ethAmount, AggregatorV3Interface priceFeed) internal view returns (uint256) {
        uint256 ethPrice = getPrice(priceFeed);
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18; //we need to devide by 1e18 because ETH price number receive with 18 zeros
        return ethAmountInUsd;
    }
}
