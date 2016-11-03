var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BankOfTypeScript;
(function (BankOfTypeScript) {
    var BankAccount = (function () {
        function BankAccount() {
            this._balance = 0;
            this._accountType = "";
        }
        Object.defineProperty(BankAccount.prototype, "AccountType", {
            get: function () {
                return this._accountType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BankAccount.prototype, "AccountHolderName", {
            get: function () {
                return this._accountHolderName;
            },
            set: function (v) {
                this._accountHolderName = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BankAccount.prototype, "Balance", {
            get: function () {
                return this._balance;
            },
            enumerable: true,
            configurable: true
        });
        BankAccount.prototype.ChargeFee = function (amount) {
            this._balance -= amount;
        };
        Object.defineProperty(BankAccount.prototype, "AccountId", {
            get: function () {
                return this._acctId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BankAccount.prototype, "InterestRate", {
            get: function () {
                return this._interestRate;
            },
            set: function (value) {
                this._interestRate = value;
            },
            enumerable: true,
            configurable: true
        });
        BankAccount.prototype.Deposit = function (amount) {
            var bal = this._balance;
            var amt = amount;
            this._balance = Number(bal) + Number(amt);
            return true;
        };
        BankAccount.prototype.Withdraw = function (amount) {
            if (this._balance > amount) {
                var bal = this._balance;
                var amt = amount;
                this._balance = Number(bal) - Number(amt);
                return true;
            }
            return false;
        };
        BankAccount.prototype.openAccount = function (accountHolderName, amount) {
            var rand = Math.floor((Math.random() * 10000) + 99999).toString();
            this._accountHolderName = accountHolderName;
            this._balance = amount;
            this._acctId = rand;
            return this._acctId;
        };
        return BankAccount;
    }());
    BankOfTypeScript.BankAccount = BankAccount;
    var SavingsAccount = (function (_super) {
        __extends(SavingsAccount, _super);
        function SavingsAccount() {
            _super.call(this);
            this._accountType = "Savings Account";
        }
        return SavingsAccount;
    }(BankAccount));
    BankOfTypeScript.SavingsAccount = SavingsAccount;
    var InvestmentAccount = (function (_super) {
        __extends(InvestmentAccount, _super);
        function InvestmentAccount() {
            _super.call(this);
            this._accountType = "Investment Account";
        }
        return InvestmentAccount;
    }(BankAccount));
    BankOfTypeScript.InvestmentAccount = InvestmentAccount;
    var CheckingAccount = (function (_super) {
        __extends(CheckingAccount, _super);
        function CheckingAccount() {
            _super.call(this);
            this._accountType = "Checking Account";
        }
        CheckingAccount.prototype.ChargeFee = function (amount) {
            if (this.Balance > 1000) {
                amount = 0;
            }
            else {
                amount += 1.00;
            }
            this._balance += amount;
            return this._balance;
        };
        return CheckingAccount;
    }(BankAccount));
    BankOfTypeScript.CheckingAccount = CheckingAccount;
})(BankOfTypeScript || (BankOfTypeScript = {}));
//# sourceMappingURL=BankAccount.js.map