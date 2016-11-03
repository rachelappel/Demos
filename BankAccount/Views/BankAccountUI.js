var account;
window.onload = function () {
    var depositButton = document.getElementById('depositButton');
    depositButton.addEventListener("click", depositButtonClick);
    var withdrawButton = document.getElementById('withdrawButton');
    withdrawButton.addEventListener("click", withdrawButtonClick);
    var openButton = document.getElementById('openAccountButton');
    openButton.addEventListener("click", openAccountButtonClick);
    function openAccountButtonClick() {
        var name = document.getElementById("nameTextBox").value;
        var amount = parseFloat(document.getElementById("amountTextBox").value);
        var select = document.getElementById("accountTypeDropdown");
        var accountType = select.options[select.selectedIndex].value;
        if (accountType === "") {
            errorMessage("Please choose an account type");
        }
        else {
            getAccountType();
            account.openAccount(name, amount);
            updateAccountInfo();
            accountOpenedUI();
        }
    }
    function depositButtonClick() {
        var amount = parseFloat(document.getElementById("amountTextBox").value);
        account.Deposit(amount);
        updateAccountInfo();
    }
    function withdrawButtonClick() {
        var amount = parseFloat(document.getElementById("amountTextBox").value);
        if (account.Withdraw(amount)) {
            updateAccountInfo();
        }
        else {
            errorMessage("Insufficient funds.");
        }
    }
    function updateAccountInfo() {
        document.getElementById('messageSpan').innerText = "";
        document.getElementById("accountBalanceSpan").innerText =
            account.Balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        document.getElementById("accountHolderNameSpan").innerText = account.AccountHolderName.toString();
        document.getElementById("accountIdSpan").innerText = account.AccountId;
        document.getElementById("accountTypeSpan").innerText = account.AccountType;
    }
    function getAccountType() {
        var acctType = "";
        var select = document.getElementById("accountTypeDropdown");
        var accountType = select.options[select.selectedIndex].value;
        switch (accountType) {
            case "Savings":
                account = new BankOfTypeScript.SavingsAccount();
                break;
            case "Checking":
                account = new BankOfTypeScript.CheckingAccount();
                break;
            case "Investment":
                account = new BankOfTypeScript.InvestmentAccount();
                break;
            default:
                account = new BankOfTypeScript.BankAccount();
                break;
        }
        return account;
    }
    function errorMessage(message) {
        document.getElementById('messageSpan').innerText = message;
    }
    function accountOpenedUI() {
        document.getElementById('depositButton').removeAttribute('disabled');
        document.getElementById('withdrawButton').removeAttribute('disabled');
        document.getElementById('openAccountButton').setAttribute('disabled', 'true');
        document.getElementById('accountTypeDropdown').setAttribute('disabled', 'true');
    }
};
//# sourceMappingURL=BankAccountUI.js.map