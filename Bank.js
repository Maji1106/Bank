class Customer {
  accounts = [];
  constructor(name, address, phone, email){
      this.name = name;
      this.address = address;
      this.phone = phone;
      this.email = email;
  }

  verify(name, address, phone, email){
      return name === this.name && address === this.address && phone === this.phone && email === this.email;
  }

  getAccounts(){
      return this.accounts;
  }

  createAccount(bank, accountType){
      let newAccount = bank.createAccount(accountType);
      this.accounts.push(newAccount);
      return newAccount;
  }

  toString(){
      return  `Name : ${this.name} \n Address : ${this.address} \n Phone : ${this.phone} \n Email : ${this.email} \n`;
  }
}


class Bank {
  account = null;
  customers = [];
  atm = [];
  constructor(name, address, code){
      this.name = name;
      this.address = address;
      this.code = code;
  }

  manage(){
      console.log(this.manage);
  }

  maintain(){
      console.log(this.maintain);
  }

  verify(name, code){
      return name === this.name && code === this.code;
  }

  openAccount(){
      return this.account != null;
  }

  closeAccount(){
      return this.account === null;
  }

  createTransaction(){
      return this.account.createTransaction();
  }

  createCustomer(name, address, phone, email){
      let newCustomer = new Customer(name, address, phone, email);
      this.customers.push(newCustomer);
      return newCustomer;
  }

  createATM(location, managedBy){
      let newATM = new ATM(location, managedBy);
      return newATM;
  }

  createAccount(accountNumber, balance){
      let newAccount = new Account(accountNumber, balance);
      return newAccount;
  }

  // ปรับเมธอดเพื่อเรียกใช้เมธอดใหม่ของ Customer
  createCustomerAccount(customer, bank, accountType) {
      return customer.createAccount(bank, accountType);
  }
  toString() {
    return `Name: ${this.name} \nAddress: ${this.address} \nCode: ${this.code} \n`;
  }
}

class Account {
  customer = null;
  bank = null;
  transactions = [];
  constructor(accountNumber, balance, pin) {
      this.accountNumber = accountNumber;
      this.balance = balance;
      this.pin = pin;
  }

  deposit(amount) {
      this.balance += amount;
      return `Deposited amount: ${amount} \nCurrent balance: ${this.balance}`;
  }

  withdraw(amount) {
      if (this.balance >= amount) {
          this.balance -= amount;
          return `Withdrawn amount: ${amount} \nCurrent balance: ${this.balance}`;
      } else {
          return "Insufficient balance.";
      }
  }

  createTransaction(transaction) {
      this.transactions.push(transaction);
  }

  getTransaction() {
      return this.transactions;
  }

  getBalance() {
      return this.balance;
  }

  getAccountType() {
      return this.accountType;
  }

  getCustomer() {
      return this.customer;
  }

  setCustomer(customer) {
      this.customer = customer;
  }

  setBank(bank) {
      this.bank = bank;
  }
  toString() {
    return `Account Number: ${this.accountNumber} \nBalance: ${this.balance} \n`;
  }

}

class Transaction {
  status = "";
  amount = 0;
  constructor(transactionID, transactionType, amount, transactionDate) {
      this.transactionID = transactionID;
      this.transactionType = transactionType;
      this.amount = amount;
      this.transactionDate = transactionDate;
  }

  getTransactionID() {
      return this.transactionID;
  }

  getTransactionType() {
      return this.transactionType;
  }

  getTransactionDate() {
      return this.transactionDate;
  }

  getAmount() {
      return this.amount;
  }

  getStatus() {
      return this.status;
  }

  setStatus(status) {
      this.status = status;
  }

  setAmount(amount) {
      this.amount = amount;
  }

  setTransactionDate(date) {
      this.transactionDate = date;
  }
}

class SavingAccount extends Account {
  constructor(interestRate, accountNumber, balance) {
      super(accountNumber, balance);
      this.interestRate = interestRate;
  }

  calculateInterest() {
      let interest = (this.balance * this.interestRate) / 100;
      return interest;
  }

  getInterestRate() {
      return this.interestRate;
  }

  setInterestRate(rate) {
      this.interestRate = rate;
  }
  toString() {
    return `Account Type: Saving Account \nInterest Rate: ${this.interestRate}% \n`;
  }
}

class CurrentAccount extends Account {
  constructor(overdraftLimit, overdraftInterest, accountNumber, balance) {
      super(accountNumber, balance);
      this.overdraftLimit = overdraftLimit;
      this.overdraftInterest = overdraftInterest;
  }

  calculateInterest() {
      let interest = (this.balance * this.overdraftInterest) / 100;
  }

  getOverdraftLimit() {
      return this.overdraftLimit;
  }

  setOverdraftLimit(limit) {
      this.overdraftLimit = limit;
  }
  toString() {
    return `Account Type: Current Account \nOverdraft Limit: ${this.overdraftLimit} \n`;
  }
}

class ATM {
  customer = null;
  account = null;
  bank = null;
  constructor(location, managedBy) {
      this.location = location;
      this.managedBy = managedBy;
  }

  identify(name, code){
      return name === this.name && code === this.code;
  }

  checkBalance(){
      console.log(this.account.getBalance()); 
  }

  withdraw(amount){
      console.log(this.account.withdraw(amount)); 
  }

  deposit(amount){
      console.log(this.account.deposit(amount)); 
  }

  changePin(oldPin, newPin){
      return this.account.pin === oldPin && newPin !== "";
  }

  transfer(accountNumber, amount){
      if (accountNumber === this.account.accountNumber){
          this.account.balance += amount;
          return `Transferred amount: ${amount} to account: ${accountNumber}.`;
      }
      return "Account not found. Please check the account number again.";
  }

  verify(accountNumber, pin){
      return accountNumber === this.account.accountNumber && pin === this.account.pin;
  }
  toString() {
    return `Location: ${this.location} \nManaged By: ${this.managedBy} \n`;
  }
}

const main = () => {
  // สร้างอินสแตนซ์
  const customer1 = new Customer("Perth", "264 NPRU", "123-456-7890", "Jacob@example.com");
  const bank1 = new Bank("Bank SE", "NPRU nakornpathom", "ABC123");
  const account1 = new Account("123456789", 1000, "1234");
  const atm1 = new ATM("ATM SE", "Bank SE");


  // แสดง toString() ของแต่ละคลาส
  console.log(customer1.toString());
  console.log(bank1.toString());
  console.log(account1.toString());
  console.log(atm1.toString());
}

// เรียกใช้ฟังก์ชัน main
main();
