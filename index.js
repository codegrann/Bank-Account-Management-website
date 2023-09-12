// Class to initialize instance of a bank account
class BankAccount {
  constructor(accountHolderName, accountType) {
    this.accountHolderName = accountHolderName;
    this.accountType = accountType;
    this.balance = 0;
  }

  //   Method to deposit funds
  deposit(amount) {
    if (amount <= 0) {
      throw new Error("Invalid deposit amount");
    }
    this.balance += amount;
    return `Deposited $${amount}. Current balance: $${this.balance}`;
  }

  //   Method to withdraw funds
  withdraw(amount) {
    if (amount <= 0) {
      throw new Error("Invalid withdrawal amount");
    }
    if (amount > this.balance) {
      throw new Error("Insufficient funds");
    }
    this.balance -= amount;
    return `Withdrawn $${amount}. Current balance: $${this.balance}`;
  }

  //   Method to check account balance
  checkBalance() {
    return `Account balance for ${this.accountHolderName}: $${this.balance}`;
  }
}

let currentAccount;

// function triggered on an onlick to create a bank account
function createAccount() {
  const accountHolder = document.getElementById("accountHolder").value;
  const accountType = document.getElementById("accountType").value;
  currentAccount = new BankAccount(accountHolder, accountType);
  document.getElementById(
    "resultMessage"
  ).textContent = `Account created for ${currentAccount.accountHolderName}.`;
}

// function triggered on an onlick to perform various transactions such as deposit and withdraw
// used try-catch-finally block to catch exceptions that may occur
// used switch statements to switch between between the types of transaction initiated by a user
function performTransaction(transactionType) {
  const amount = parseFloat(
    document.getElementById(`${transactionType}Amount`).value
  );
  let resultMessage = "";
  try {
    if (!currentAccount) {
      throw new Error("No account found. Create an account first.");
    }

    switch (transactionType) {
      case "deposit":
        resultMessage = currentAccount.deposit(amount);
        break;
      case "withdraw":
        resultMessage = currentAccount.withdraw(amount);
        break;
      case "checkBalance":
        resultMessage = currentAccount.checkBalance();
        break;
      default:
        throw new Error("Invalid transaction type");
    }
  } catch (error) {
    resultMessage = error.message;
  } finally {
    document.getElementById("resultMessage").textContent = resultMessage;
  }
}
