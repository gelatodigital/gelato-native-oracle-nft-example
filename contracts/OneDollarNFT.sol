// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {
    L2PriceOracle
} from "@gelatonetwork/gelato-native-oracle-sdk/contracts/L2PriceOracle.sol";
import {PythStructs} from "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {PriceFeeds} from "./constants/PriceFeeds.sol";

contract OneDollarNFT is ERC721, L2PriceOracle {
    uint256 private _nextTokenId;

    error InsufficientFee();
    error TransferFailed();

    constructor() ERC721("OneDollarNFT", "1USD") {}

    function mint() external payable {
        PythStructs.Price memory price = _getPriceUnsafe(PriceFeeds._ETH_USD);

        uint256 ethPrice18Decimals = (uint256(uint64(price.price)) *
            (10 ** 18)) / (10 ** uint8(uint32(-1 * price.expo)));
        uint256 oneDollarInWei = ((10 ** 18) * (10 ** 18)) / ethPrice18Decimals;

        if (msg.value < oneDollarInWei) revert InsufficientFee();

        _mint(msg.sender, _nextTokenId++);
        _transfer(msg.sender, msg.value - oneDollarInWei);
    }

    function _transfer(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        if (!success) revert TransferFailed();
    }
}
