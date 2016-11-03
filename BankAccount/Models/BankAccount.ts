module BankOfTypeScript {
        export interface Fee {
            ChargeFee(amount: number): number;
        }

        export class BankAccount  {                   
            constructor() {
                this._balance = 0;
                this._accountType = "";
            }

            protected _accountType: string
            public get AccountType(): string 
            {
                return this._accountType
            }
             
            private _accountHolderName : string;
            public get AccountHolderName() : string {
                return this._accountHolderName;
            }
            public set AccountHolderName(v : string) {
                this._accountHolderName = v;
            }

            protected _balance: number;
            get Balance(): number {
                return this._balance;
            }            
            
            public ChargeFee(amount: number) {
                this._balance -= amount;
            }

            private _acctId: string;
            get AccountId(): string {
                return this._acctId;   
            }
        
            private _interestRate: number;
            get InterestRate(): number {
                return this._interestRate;
            }
            set InterestRate(value: number) {
                this._interestRate = value;
            }

            public Deposit(amount: number): boolean {                
                var bal: number = this._balance;
                var amt: number = amount;
                this._balance = Number(bal) + Number(amt);                
                return true;
            }

            public Withdraw(amount: number): boolean {                
                if (this._balance > amount) {
                    var bal: number = this._balance;
                    var amt: number = amount;
                    this._balance = Number(bal) - Number(amt);    
                    return true;
                }
                return false;
            }

            public openAccount(accountHolderName: string, amount: number): string {
                var rand = Math.floor((Math.random() * 10000) + 99999).toString();                  
                this._accountHolderName = accountHolderName;
                this._balance = amount;              
                this._acctId =  rand;                        
                return this._acctId;
            }
        }

        export class SavingsAccount extends BankAccount {
            constructor() {                
                super();
                this._accountType = "Savings Account";                
            }
        }
        export class InvestmentAccount extends BankAccount {
            constructor() {                
                super();
                this._accountType = "Investment Account";                
            }            
        }

        export class CheckingAccount  extends BankAccount implements Fee  {
            constructor() {                
                super();
                this._accountType = "Checking Account";                
            }
            ChargeFee(amount: number): number {
                if (this.Balance > 1000) 
                    { amount = 0; }
                else 
                    { amount += 1.00; }

                this._balance += amount;
                return this._balance;
            }

        }
}


