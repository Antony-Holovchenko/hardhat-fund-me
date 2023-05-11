// SPDX-License-Identifier: MIT
// 1. Pragma
pragma solidity 0.8.8;
// 2. Imports
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";

// 3. Interfaces, Libraries, Contracts
error FundMe__NotOwner();

/**
 * @title A contract for crowd funding
 * @author Anton Holovchenko
 * @notice This is a sample demo funding contract
 * @dev This implements price feeds as out library
 */
contract FundMe {
    using PriceConverter for uint256;

    //State variables
    uint256 public constant MINIMUM_USD = 50 * 10**18; // 50 * 1e18
    address private immutable i_owner;
    address[] private s_funders;
    mapping(address => uint256) private s_addressToAmountFunded; //mapping for users funds(address - our user; uint256 - how much this user funded)
    
    AggregatorV3Interface private s_priceFeed; // This is our global variable


    modifier onlyOwner() {
        //require(msg.sender == i_owner , "Sender is not owner!");
        if (msg.sender != i_owner) {
            revert FundMe__NotOwner();
        }
        _;
    }

    constructor(address priceFeed) {
        s_priceFeed = AggregatorV3Interface(priceFeed); //priceFeed address is saved to a global AggregatorV3Interface 
        i_owner = msg.sender;
    }


    function fund() public payable {
        require(
            msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD,
            "You need to spend more ETH"
        ); //1e18 == 1 * 10 ** 18 = 10000000000 or 1 ETH
        s_funders.push(msg.sender);
        s_addressToAmountFunded[msg.sender] += msg.value;
    }

    function withdraw() public payable onlyOwner {
        for (
            uint256 funderIndex = 0;
            funderIndex < s_funders.length;
            funderIndex++
        ) {
            address funder = s_funders[funderIndex];
            s_addressToAmountFunded[funder] = 0;
        }

        //After all adresses funds are 0, we need to reset the array
        s_funders = new address[](0); //now the funders array = new address array with 0 objects inside

        (bool success, ) = i_owner.call{value: address(this).balance}("");
        require(success); //call return us bool value if our function pass or fail
    }

    function cheaperWithdraw() public payable onlyOwner {
        address[] memory funders = s_funders;
        for (uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++) {
            address funder = funders[funderIndex];
            s_addressToAmountFunded[funder] = 0;
        }
        s_funders = new address[](0);
        (bool success, ) = i_owner.call{value: address(this).balance}("");
        require(success); 
    }

    function getAddressToAmountFunded(address fundingAddress)
        public
        view
        returns (uint256)
    {
        return s_addressToAmountFunded[fundingAddress];
    }

    function getVersion() public view returns (uint256) {
        return s_priceFeed.version();
    }

    function getFunder(uint256 index) public view returns (address) {
        return s_funders[index];
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getPriceFeed() public view returns (AggregatorV3Interface) {
        return s_priceFeed;
    }

    
}
