import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
//import Frame from "react-frame-component";
import "./App.css";
import ipfs from "./ipfs";
import ListItems from "./components/listCatagories/ListItems";
import { CardList } from "./components/card-list/card-list";
import Button from "@material-ui/core/Button";
class App extends Component {
  state = {
    DocValue: [
      // {
      //   id: 1,
      //   name: "samuel",
      //   docHash: "svnskjfwfsds",
      //   catId: 1,
      // },
      // {
      //   id: 2,
      //   name: "prathik",
      //   docHash: "ssdjdffwfasd",
      //   catId: 1,
      // },
      // {
      //   id: 3,
      //   name: "pradhip",
      //   docHash: "svnskjfwfsdsxcch",
      //   catId: 2,
      // },
      // {
      //   id: 4,
      //   name: "shasank",
      //   docHash: "asdadnsvnskjfwfsds",
      //   catId: 2,
      // },
      // {
      //   id: 5,
      //   name: "Bull Shit",
      //   docHash: "ssdjdffwfasd",
      //   catId: 1,
      // },
      // {
      //   id: 6,
      //   name: "Man Shit",
      //   docHash: "ssdjdffwfasd",
      //   catId: 2,
      // },
      // {
      //   id: 7,
      //   name: "kapil sharma",
      //   docHash: "ssdjdffwfasd",
      //   catId: 1,
      // },
      // {
      //   id: 8,
      //   name: "dinchak pooja",
      //   docHash: "ssdjdffwfasd",
      //   catId: 3,
      // },
      // {
      //   id: 9,
      //   name: "iron man",
      //   docHash: "ssdjdffwfasd",
      //   catId: 3,
      // },
      // {
      //   id: 10,
      //   name: "captain america",
      //   docHash: "ssdjdffwfasd",
      //   catId: 3,
      // },
      // {
      //   id: 11,
      //   name: "black widow",
      //   docHash: "ssdjdffwfasd",
      //   catId: 1,
      // },
    ],
    buffer: null,
    DocumentID: null,
    CatID: null,
    CatName: null,
    fileName: null,
    fileType: null,
    ipfsHash: null,
    DocCopy: [],
    items: [],
    currentItem: {
      text: "",
      key: 1,
    },
    catCounter: 1,
    counter: [],
    web3: null,
    accounts: null,
    contract: null,
  };
  constructor(P) {
    super(P);
    this.addItem = this.addItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  addItem(e) {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if (newItem.text !== "") {
      const items = [...this.state.items, newItem];
      this.setState({
        items: items,
        currentItem: {
          text: "",
          key: this.state.catCounter + 1,
        },
      });
      this.setState({ catCounter: this.state.catCounter + 1 });
    }
  }

  handleInput(e) {
    this.setState({
      currentItem: {
        text: e.target.value,
        key: this.state.currentItem.key,
      },
    });
  }
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState(
        { web3, accounts: accounts, contract: instance },
        this.runExample
      );
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    // await contract.methods
    //   .addDocument(1, 2, "kamal", "pdf", "sjdfsdvmvnvkldfd", "notComman")
    //   .send({ from: accounts[0] });

    const response = await contract.methods.getCount().call();
    this.setState({ counter: response });
    console.log({ response });

    for (var j = 0; j < 10; j++) {
      for (var i = 0; i < this.state.counter[j]; i++) {
        if (this.state.counter[j] !== 0) {
          const docval = await contract.methods
            .userDocuments("0x411524bfcE6168f193b51EdFFB4E83ff8c5D3f30", j, i)
            .call();
          if (docval.catId > 0) {
            this.setState({ DocValue: [...this.state.DocValue, docval] });
            //var catPut = { text: docval.catagoireName, key: docval.catId };

            //this.setState({ items: [...this.state.items, catPut] });
            console.log("valueinside:", docval);
            // console.log("catPut: ", catPut);
          }
        }
      }
    }
    //console.log("value:", this.state.DocValue);
    //console.log(docval);
    // Get the value from the contract to prove it worked.

    // Update state with the result.
  };
  captureFile = (event) => {
    event.preventDefault();
    console.log("File capture...");
    const file = event.target.files[0];
    const fileName = file.name;
    const extension = fileName.split(".").pop();
    this.setState({ fileName, fileType: extension });
    console.log(fileName, extension);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
      console.log(this.state.buffer);
    };
  };

  onSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.buffer);
    ipfs.files.add(this.state.buffer, (error, result) => {
      if (error) {
        console.log(error);
        return;
      }

      this.setState({ ipfsHash: result[0].hash });
      console.log("Hash: ", result[0].hash);
    });
  };
  addDocument = () => {
    console.log("addDocument is clicked!");
    console.log(
      "checking one time",
      this.state.CatName,
      " ",
      this.state.CatID,
      " ",
      this.state.DocumentID,
      " ",
      this.state.fileType,
      " ",
      this.state.ipfsHash,
      " ",
      this.state.fileNames
    );

    if (
      this.state.CatName &&
      this.state.CatID &&
      this.state.DocumentID &&
      this.state.fileType &&
      this.state.ipfsHash &&
      this.state.fileName
    ) {
      this.state.contract.methods
        .addDocument(
          this.state.DocumentID,
          this.state.CatID,
          this.state.fileName,
          this.state.fileType,
          this.state.ipfsHash,
          this.state.CatName
        )
        .send({ from: this.state.accounts[0] })
        .then((r) => {
          console.log("Successfully add..");
        });
    } else alert("Some value are missing! please cheack once again");
  };

  //clicked on items
  handleItem = (i) => {
    let product;
    let filterVal = this.state.items[i - 1];
    console.log("items: ", filterVal.key);
    product = this.state.DocValue.filter((item) => item.catId == filterVal.key);
    this.setState({
      DocCopy: product,
    });
    this.setState({
      CatName: filterVal.text,
      CatID: filterVal.key,
      DocumentID: this.state.counter[i],
    });
  };
  // clicked on all
  allClicked = () => {
    console.log("All buttom is clicked");
    this.setState({ DocCopy: this.state.DocValue });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div className="topNav">
          {/* nav bar */}
          <header>
            <div>
              <form id="to-do-form" onSubmit={this.addItem}>
                <input
                  type="text"
                  placeholder="Enter the folder name"
                  value={this.state.currentItem.text}
                  onChange={this.handleInput}
                ></input>
                <Button type="submit" variant="contained" color="primary">
                  + Folder
                </Button>
              </form>
            </div>
          </header>
        </div>
        <div className="LeftMenu">
          {/* left Menu */}
          <h2 onClick={this.allClicked}>ALL</h2>
          <div className="container">
            <ListItems handleItem={this.handleItem} items={this.state.items} />
          </div>
        </div>
        <div className="Display">
          {/* card Display */}

          <CardList
            addDocument={this.addDocument}
            captureFile={this.captureFile}
            onSubmit={this.onSubmit}
            DocValue={this.state.DocCopy}
          />
        </div>

        {/* <p>{this.state.DocValue}</p> */}
      </div>
    );
  }
}

export default App;
