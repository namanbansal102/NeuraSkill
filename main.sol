pragma solidity ^0.8.10;
contract SecurePass {
    struct passKey {
      string title;
       string password;
       string date;
    }
    mapping (address => passKey[]) arr;
    function storePass(address address_,string memory title_,string memory password_,string  memory date_) public {
        arr[address_].pus
    }
}