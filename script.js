'use strict'

// Labels
const labelWelcome = document.querySelector('.welcome')
const labelDate = document.querySelector('.date')
const labelBalance = document.querySelector('.balance__value')
const labelSumIn = document.querySelector('.summary__value--in')
const labelSumOut = document.querySelector('.summary__value--out')
const labelSumInterest = document.querySelector('.summary__value--interest')
const labelTimer = document.querySelector('.timer')

// Containers
const containerApp = document.querySelector('.app')
const containerMovements = document.querySelector('.movements')

// Buttons
const btnLogin = document.querySelector('.login__btn')
const btnTransfer = document.querySelector('.form__btn--transfer')
const btnLoan = document.querySelector('.form__btn--loan')
const btnClose = document.querySelector('.form__btn--close')
const btnSort = document.querySelector('.btn--sort')

// Inputs
const inputLoginUsername = document.querySelector('.login__input--user')
const inputLoginPin = document.querySelector('.login__input--pin')
const inputTransferTo = document.querySelector('.form__input--to')
const inputTransferAmount = document.querySelector('.form__input--amount')
const inputLoanAmount = document.querySelector('.form__input--loan-amount')
const inputCloseUsername = document.querySelector('.form__input--user')
const inputClosePin = document.querySelector('.form__input--pin')

// Accounts
const account1 = {
  owner: 'Aman Mandal',
  movements: [200, 600, -327, 1400, -988, -362, 1500, -80],
  interestRate: 1.2, // in %
  pin: 1111,
}

const account2 = {
  owner: 'Tahera Khan',
  movements: [350, 600, -400, -500, 1500, 1300, -1200, -450, 80],
  interestRate: 1.5,
  pin: 2222,
}

const account3 = {
  owner: 'Rohinish Singh',
  movements: [5000, -3000, -1675, 2000, 300, -689, -90, 1200, -1100],
  interestRate: 0.7,
  pin: 3333,
}

const account4 = {
  owner: 'Deepshika Singh',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.3,
  pin: 4444,
}

const accounts = [account1, account2, account3, account4]

// Money Movements
const displayMovements = function (movements) {
  // Emptying the pre-defined movements
  containerMovements.innerHTML = ''

  movements.forEach(function (movement, index) {
    const type = movement > 0 ? 'deposit' : 'withdrawal'

    const html = `<div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
        <div class="movements__value">${movement}₤</div>
        </div>
        `
    containerMovements.insertAdjacentHTML('afterbegin', html)
  })
}

// Balance
const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0)
  labelBalance.textContent = `${balance}₤`
}

// Username
const createUserNames = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('')
  })
}
createUserNames(accounts)

// Summary
const calcDisplaySummary = function (accounts) {
  // Incoming
  const incomes = accounts.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0)
  labelSumIn.textContent = `${incomes}₤`

  // Outgoing
  const outcomes = accounts.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0)
  labelSumOut.textContent = `${Math.abs(outcomes)}₤`

  // Interest
  const interest = accounts.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * accounts.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int)
  labelSumInterest.textContent = `${interest}₤`
}

let currentAccount
// Event Handler
btnLogin.addEventListener('click', function (event) {
  event.preventDefault()

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  )
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = 100

    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`

    // Clear input fields
    inputLoginPin.value = inputLoginUsername.value = ''
    inputLoginPin.blur()

    // Display Movements
    displayMovements(currentAccount.movements)

    // Display Balance
    calcDisplayBalance(currentAccount.movements)

    // Display Summary
    calcDisplaySummary(currentAccount)
  } else {
    containerApp.style.opacity = 0
    inputLoginPin.value = inputLoginUsername.value = ''
    inputLoginPin.blur()
  }
})
