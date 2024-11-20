// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WedLock is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    // Mapping to track whether a certificate has been issued for a wife's address
    mapping(address => bool) public certificateIssued;

    // Mapping from owner address to list of owned token IDs
    mapping(address => uint256[]) private _ownedTokens;

    // Mapping from token ID to index in the owner's list of tokens
    mapping(uint256 => uint256) private _ownedTokensIndex;

    constructor() ERC721("WedLock", "WedLockNFT")Ownable(msg.sender) {}

    /**
     * @dev Award a marriage certificate NFT to the provided player address.
     * The wife's address will be used as the unique tokenId.
     *
     * @param husbandAddress - The address of the recipient (husband).
     * @param wifeAddress - The address of the wife (used as the tokenId).
     * @param tokenURI - The metadata URI for the NFT.
     */
    function awardCertificate(
        address husbandAddress,
        address wifeAddress,
        string memory tokenURI
    ) public onlyOwner returns (uint256) {
        // Use the wife's address as the unique tokenId
        uint256 tokenId = uint256(uint160(wifeAddress));

        // Ensure a certificate has not already been issued for this wife's address
        require(!certificateIssued[wifeAddress], "Certificate already issued for this wife.");

        // Mint the NFT and set the metadata URI
        _mint(husbandAddress, tokenId);
        _setTokenURI(tokenId, tokenURI);

        // Mark the certificate as issued for this wife address
        certificateIssued[wifeAddress] = true;

        // Add the token to the list of tokens owned by the player
        _addTokenToOwnerEnumeration(husbandAddress, tokenId);

        return tokenId;
    }

    /**
     * @dev Check if a marriage certificate has been issued for a specific wife's address.
     *
     * @param wifeAddress - The address of the wife to check.
     * @return bool - Returns true if a certificate has been issued, otherwise false.
     */
    function isCertificateIssued(address wifeAddress) public view returns (bool) {
        return certificateIssued[wifeAddress];
    }

    /**
     * @dev Returns the token ID owned by `owner` at a given `index` of its token list.
     * Reverts if `index` is out of bounds.
     *
     * @param owner - The address to query.
     * @param index - The index of the token in the owner's list.
     * @return uint256 - The token ID at the specified index.
     */
    function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256) {
        require(index < _ownedTokens[owner].length, "Owner index out of bounds");
        return _ownedTokens[owner][index];
    }

    /**
     * @dev Private function to add a token to this extension's ownership-tracking data structures.
     *
     * @param to - Address representing the new owner of the given token ID.
     * @param tokenId - ID of the token to be added to the tokens list of the given address.
     */
    function _addTokenToOwnerEnumeration(address to, uint256 tokenId) private {
        _ownedTokensIndex[tokenId] = _ownedTokens[to].length;
        _ownedTokens[to].push(tokenId);
    }

    /**
     * @dev Private function to remove a token from this extension's ownership-tracking data structures.
     * Note that while the token is not assigned a new owner, the `_ownedTokensIndex` mapping is also cleaned up.
     *
     * @param from - Address representing the previous owner of the given token ID.
     * @param tokenId - ID of the token to be removed from the tokens list of the given address.
     */
    function _removeTokenFromOwnerEnumeration(address from, uint256 tokenId) private {
        uint256 lastTokenIndex = _ownedTokens[from].length - 1;
        uint256 tokenIndex = _ownedTokensIndex[tokenId];

        // When the token to delete is the last token, the swap is not necessary
        if (tokenIndex != lastTokenIndex) {
            uint256 lastTokenId = _ownedTokens[from][lastTokenIndex];

            _ownedTokens[from][tokenIndex] = lastTokenId; // Move the last token to the slot of the to-delete token
            _ownedTokensIndex[lastTokenId] = tokenIndex; // Update the moved token's index
        }

        // This also deletes the contents at the last position of the array
        _ownedTokens[from].pop();
        delete _ownedTokensIndex[tokenId];
    }

    
}
