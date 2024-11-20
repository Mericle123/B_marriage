# Weblock Blockchain-based Marriage Certificate System

# Deployment Link: https://wedmarriagelock.netlify.app/

# Overview

The Weblock Blockchain-based Marriage Certificate System is a secure, decentralized application (dApp) that issues and manages marriage certificates using blockchain technology. The system ensures transparency, immutability, and easy accessibility while preventing forgery or tampering. It provides a reliable solution for individuals and authorities to manage marriage records effectively.

# Overall Working of the System

1. Registration:
   Couples can apply for a blockchain-based marriage certificate by submitting their details (e.g., names, date, witnesses) to the platform.

2. Certificate Issuance:
   Once the marriage application is verified, a blockchain-based marriage certificate is issued and stored as a non-fungible token (NFT) on the Ethereum blockchain. The NFT includes metadata such as the names, date, and location of the marriage, along with a unique certificate ID.

3. Certificate Management:
   Couples can view their certificates through a wallet or dApp interface. Certificate ownership resides with the couple, who can securely share the certificate for verification purposes.

# Features

1. Secure Certificate Storage: Marriage certificates are stored as NFTs on the blockchain, ensuring immutability and protection against tampering.

2. Decentralized Access: Couples and authorized entities can access certificates from anywhere using the dApp.
   Ownership and Privacy: Certificates remain under the ownership of the married individuals, ensuring privacy.
   Revocation and Updates: The issuing authority retains the ability to revoke or update certificates when necessary.

# Technical Specifications

# Smart Contract

The Weblock system is implemented using an Ethereum smart contract and conforms to the ERC-721 NFT standard for certificate issuance.

# Public Functions

1.  awardCertificate(address husbandAddress, address wifeAddress, string memory tokenURI)

    Purpose: Issues a marriage certificate as an NFT to the specified husband address using the wife's address as a unique token ID.

    Access Control: Only the contract owner can call this function.

    Requirements:
    A certificate has not already been issued for the given wife’s address.

    Returns: The newly minted token ID.

2.  isCertificateIssued(address wifeAddress)

    Purpose: Checks whether a certificate has been issued for a specific wife's address.

    Returns:
    true if a certificate has been issued.
    false otherwise.

3.  tokenOfOwnerByIndex(address owner, uint256 index)

    Purpose: Retrieves the token ID owned by a user at a specific index.

    Parameters:
    owner: Address of the user.
    index: Position of the token in the user’s list of owned tokens.

        Returns: The token ID at the specified index.

# Internal Functions

4. \_addTokenToOwnerEnumeration(address to, uint256 tokenId)

Purpose: Tracks ownership of tokens by adding a token ID to the list of tokens owned by a user.

5. \_removeTokenFromOwnerEnumeration(address from, uint256 tokenId)

Purpose: Updates the ownership record by removing a token from the user’s list of tokens.

# Test Cases

1. Deployment
   Test Case: Contract Deployment
   Description: Verifies that the contract deploys successfully and initializes correctly.
   Expected Outcome: Contract owner should be set correctly, and initial state should match specifications.
   Certificate Issuance

2. Test Case: Issue Certificate

Description: Validates that a certificate can be issued to a specified address.
Expected Outcome: A new NFT with correct metadata is minted and assigned to the couple’s address.

3. Test Case: Prevent Duplicate Certificates

Description: Ensures that a duplicate certificate cannot be issued for the same couple.
Expected Outcome: Transaction should revert with an error message.

# Conclusion

The Weblock Blockchain-based Marriage Certificate System revolutionizes traditional marriage record management by leveraging blockchain for transparency, security, and accessibility. With its NFT-based architecture, the system ensures reliability and tamper-proof storage of marriage certificates, setting a new standard for digital documentation.
