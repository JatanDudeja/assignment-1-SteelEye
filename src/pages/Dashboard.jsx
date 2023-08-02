import { useState } from "react"
import React from "react"

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [showCards, setShowCards] = React.useState(false) // state to diplay the Cards component
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});
  const [modifiedRows, setModifiedRow] = React.useState([]) // this state that stores the modified array i.e. the modification of the mockData.results array with matching timestamps data
  const [alwaysStoreModifiedRow, setAlwaysStoreModifiedRow] = React.useState([]) // this state that always stores the modified array i.e. the modification
                                                                                // of the mockData.results array with matching timestamps data


  // the very first time the code runs the modifiedRows array and alwaysStoreModifiedRow array will be filled with
  // values of mockData.results and timestamps.results array with same matching id
  React.useEffect(() => {
    const updatedArray = mockData.results.map((row) => {
      return(
        {
          ...row, 
          timeStamp : timestamps.results.find((timestamp) => {
             if (timestamp['&id'] === row['&id']) return timestamp.timestamps.orderSubmitted
          })
        }
      )
    })

    setModifiedRow(updatedArray)
    setAlwaysStoreModifiedRow(updatedArray)


  },[])





  // function for searching with the order id's

  function searchingWithId(e) {
    e.preventDefault()
    // console.log(e.target.value)
    // console.log(modifiedRows)
    setSearchText(e.target.value) // updating searchText State whenever user types a letter


    // constantly matching the entered characters by the user in the alwaysStoreModifiedRow array and show the search
    // results or the rows with matching ids
    const matchingSearchResultsArray = alwaysStoreModifiedRow.filter((row) => {
      if (row['&id'].includes(e.target.value)) return { ...row }
    })

    // here we check if searchText is empty i.e. the user has deleted all the entered text so now we initialize the
    // modifiedArray with alwaysStoreModifiedRow because if we do not do this the line of code after will set the
    // modifiedArray with an empty array because matchingSearchResultsArray variable holds nothing
    if (e.target.value === '') {
      setModifiedRow(alwaysStoreModifiedRow)
      return
    }


    // if the searchText is not empty we simply update modifiedArray with the matchingSearchResultsArray
    setModifiedRow(matchingSearchResultsArray)

  }



  // function to make cards component visible 

  function makeCardVisibleOnItemClick(id) {

    // variable to store orderData object
    let selectOrderData

    // variable to store timestamps data object
    let seletTimeStampData

    for (let i = 0; i < modifiedRows.length; i++) {
      // here we match the id of the row user clicked with all the elements in the modifiedArray
      if (modifiedRows[i]['&id'] === id) {
        // then we store the data in these variables created above
        selectOrderData = modifiedRows[i].executionDetails 
        seletTimeStampData = modifiedRows[i].timeStamp.timestamps
        break;
      }
    }



    // then at last we update the already created state with the data we just stored in the above variables selectOrderData and seletTimeStampData
    setSelectedOrderDetails(selectOrderData)
    setSelectedOrderTimeStamps(seletTimeStampData)


    // and also make the showCards state to true so that we can conditionally render the Card Components
    setShowCards(true)

  }


  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle={`${modifiedRows.length == 0 ? '6' : modifiedRows.length} orders`} />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            // onChange={(e) => setSearchText(e.target.value)}
            searchingWithId={searchingWithId} // this is the new onChange function and also the searching function
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        {/* Conditionally Rendering the Card Components */}
        {showCards && <div className={`${styles.section} cards-containter`}> 
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>}
      <List rows={modifiedRows} selectedItem={currency} onClick={makeCardVisibleOnItemClick} />
      </div>
    </div>
  );
};

export default Dashboard;
