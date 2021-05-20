// SPDX-License-Identifier: Samuel
pragma solidity >=0.5.0;

contract SimpleStorage{
    mapping(uint => Document) public Documents;
    
    mapping(address=>mapping(uint => mapping(uint=>Document) )) public userDocuments;
    uint[10] public count; 
    struct Document{
        
        uint catId;
        string name;
        string docType;
        string docHash;
        string catagoireName;
        
        
    }
    
    
    
    function addDocument(uint _docId,uint _catId, string memory _name, string memory _docType, string memory _docHash, string memory _catagoireName) public {
      require(_catId<10);
        userDocuments[msg.sender][_catId][_docId] = Document(_catId,_name, _docType, _docHash, _catagoireName);
      count[_catId]++;
    }
    function getDocument(address _add, uint _CatId, uint DocId) public view returns(uint, string memory, string memory, string memory, string memory){
        Document storage d =userDocuments[_add][_CatId][DocId]; 
        return(d.catId,d.name,d.docType,d.docHash,d.catagoireName);
        
    }
    
    function getCount()public view returns(uint[10] memory){
      return (count);
        
    }
    
}