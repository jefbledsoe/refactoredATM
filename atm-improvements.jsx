const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ["Deposit", "Cash Back"];
  //console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" width="200" onChange={onChange}></input>
      <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid} ></input>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState('');
  const [validTransaction, setValidTransaction] = React.useState(false);
  const [transactionHistory, setTransactionHistory] = React.useState([]);

  let status = `Account Balance $ ${totalState} `;
  // console.log(`Account Rendered with isDeposit: ${isDeposit}`);

  const handleChange = (event) => {
    if (Number(event.target.value) <= 0) {
      return setValidTransaction(false);
    }
    if (atmMode === 'Cash Back' && Number(event.target.value) > totalState) {
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
    setDeposit(Number(event.target.value));
  };
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    setTransactionHistory([{dateTime:`${new Date()}`,transactionType:atmMode,balance:newTotal, transactionAmount:deposit}, ...transactionHistory]);
    console.log(transactionHistory);
    
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    let modeSelection = event.target.value;
    if (modeSelection === "Deposit") {
      setIsDeposit(true);
      setAtmMode(modeSelection);
    } else if (modeSelection === "Cash Back") {
      setIsDeposit(false);
      setAtmMode(modeSelection);
    }else{
      selectionMade = false;
      setAtmMode(modeSelection);
    }    
  };
  const transactionHistoryList = transactionHistory.map((transaction) => {
    return (
      <li id="transaction" >
        <h3>Date: {transaction.dateTime}</h3>
        <h3>Transaction Type: {transaction.transactionType}</h3>
        <h3>Amount: {transaction.transactionAmount}</h3>
        <h3>Remaining Balance: ${transaction.balance}</h3>
      </li>
    );
  });
  return (
    <form onSubmit={handleSubmit}>
      <>
        <h1>$ Jeff's Bank ATM $</h1>
        <h2 id="total">{status}</h2>
        <label>Select an action below to continue</label>
        <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">
            Deposit
          </option>
          <option id="cashback-selection" value="Cash Back">
            Cash Back
          </option>
        </select>
        {atmMode && (
          <ATMDeposit
            onChange={handleChange}
            isDeposit={isDeposit}
            isValid={validTransaction}
          ></ATMDeposit>
        )}
      </>
      <div id="transactionHistory">
        <h2>Transaction History</h2>
        <ul>{transactionHistoryList}</ul>
      </div>
    </form>
    
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
