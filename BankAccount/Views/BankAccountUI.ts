    /// <reference path="../Models/BankAccount.ts" />
    var account: BankOfTypeScript.BankAccount;  

    window.onload = function () {
        var depositButton = document.getElementById('depositButton');
        depositButton.addEventListener("click", depositButtonClick);

        var withdrawButton = document.getElementById('withdrawButton');
        withdrawButton.addEventListener("click", withdrawButtonClick);

        var openButton = document.getElementById('openAccountButton');
        openButton.addEventListener("click", openAccountButtonClick);        
        
        function openAccountButtonClick() {
            var name = (<HTMLInputElement>document.getElementById("nameTextBox")).value;
            var amount = parseFloat((<HTMLInputElement>document.getElementById("amountTextBox")).value);
            var select = (<HTMLSelectElement>document.getElementById("accountTypeDropdown"));
            var accountType = select.options[select.selectedIndex].value; 
            if (accountType === "") {        
                errorMessage("Please choose an account type");
            }

            else
            {
                getAccountType();
                account.openAccount(name, amount);                                                                   
                updateAccountInfo();
                accountOpenedUI();
            }
        }

        function depositButtonClick() {
            var amount = parseFloat((<HTMLInputElement>document.getElementById("amountTextBox")).value);                         
            account.Deposit(amount);
            updateAccountInfo();
        }

        function withdrawButtonClick() {
            var amount = parseFloat((<HTMLInputElement>document.getElementById("amountTextBox")).value);
            if (account.Withdraw(amount)) 
            {
                updateAccountInfo();
            }
            else
            {
                errorMessage("Insufficient funds.");
            }
            
        }

        function updateAccountInfo() {                   
            (<HTMLSpanElement>document.getElementById('messageSpan')).innerText = "";
            (<HTMLSpanElement>document.getElementById("accountBalanceSpan")).innerText = 
                account.Balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            (<HTMLSpanElement>document.getElementById("accountHolderNameSpan")).innerText = account.AccountHolderName.toString();
            (<HTMLSpanElement>document.getElementById("accountIdSpan")).innerText = account.AccountId;            
            (<HTMLSpanElement>document.getElementById("accountTypeSpan")).innerText = account.AccountType;              
        }

        function getAccountType() 
        {
            var acctType: string="";
            
            var select = (<HTMLSelectElement>document.getElementById("accountTypeDropdown"));
            var accountType = select.options[select.selectedIndex].value;             
            
            switch (accountType) 
            {
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

        function errorMessage(message: string): void {
            document.getElementById('messageSpan').innerText = message;
        }

        function accountOpenedUI() {
            document.getElementById('depositButton').removeAttribute('disabled');
            document.getElementById('withdrawButton').removeAttribute('disabled');
            document.getElementById('openAccountButton').setAttribute('disabled', 'true');
            document.getElementById('accountTypeDropdown').setAttribute('disabled', 'true');   
        }
    }