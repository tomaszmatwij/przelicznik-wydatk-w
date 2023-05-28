const addTransaction = document.querySelector('.add-transactions')
const delAllTransactionBtn = document.querySelector('.delete-all')
const btnLightColor = document.querySelector('.light')
const btnDarkColor = document.querySelector('.dark')
const availableMoney = document.querySelector('.available-money')
const income = document.querySelector('.income-area')
const expenses = document.querySelector('.expenses-area')
const addTransactionPanel = document.querySelector('.add-transaction-panel')
const nameInput = document.querySelector('#name')
const amountInput = document.querySelector('#amount')
const categorySelect = document.querySelector('#category')
const saveBtn = document.querySelector('.save')
const cancelBtn = document.querySelector('.cancel')
const deleteBtn = document.querySelector('.delete')

let root = document.documentElement
let ID = 0
let categoryIcon
let selectedCategory
let moneyArr = [0]

const clearInput = () => {
	nameInput.value = ''
	amountInput.value = ''
	categorySelect.selectedIndex = 0
}
const checkForm = () => {
	if (nameInput.value === '' || amountInput.value === '' || categorySelect.value === 'none') {
		alert('Uzupełnij wszystkie pola!')
	} else {
		createNewTransaction()
		contentWallet(moneyArr)
	}
}

const closeTransactionPanel = () => {
	addTransactionPanel.style.display = 'none'
	clearInput()
}

const newTransaction = () => {
	addTransactionPanel.style.display = 'flex'
}
const checkCategory = transaction => {
	switch (transaction) {
		case '[ + ] Przychód':
			categoryIcon = '<i class="fas fa-money-bill-wave"></i>'
			break
		case '[ - ] Zakupy':
			categoryIcon = '<i class="fas fa-cart-arrow-down"></i>'
			break
		case '[ - ] Jedzenie':
			categoryIcon = '<i class="fas fa-hamburger"></i>'
			break
		case '[ - ] Kino':
			categoryIcon = '<i class="fas fa-film"></i>'
			break
	}
}

const selectCategory = () => {
	selectedCategory = categorySelect.options[categorySelect.selectedIndex].text
}

const createNewTransaction = () => {
	const newTransaction = document.createElement('div')
	checkCategory(selectedCategory)
	newTransaction.classList.add('transaction')
	newTransaction.setAttribute('id', ID)
	newTransaction.innerHTML = ` <p class="transaction-name">${categoryIcon} ${nameInput.value}</p>
	<p class="transaction-amount">${amountInput.value}zł <button class="delete" onclick = "deleteTransaction(${ID})"><i class="fas fa-times"></i></button>`

	if (amountInput.value > 0) {
		income.append(newTransaction)
		newTransaction.classList.add('income')
	} else {
		expenses.append(newTransaction)
		newTransaction.classList.add('expens')
	}
	moneyArr.push(parseFloat(amountInput.value))
	ID++
	closeTransactionPanel()
}
const contentWallet = money => {
	const newMoney = money.reduce((a, b) => a + b)
	availableMoney.textContent = `${newMoney} zł`
	// console.log(newMoney)
}
const deleteTransaction = id => {
	const transactonToDelete = document.getElementById(id)
	const transactionAmount = parseFloat(transactonToDelete.childNodes[3].innerHTML)
	const indexOfTransaction = moneyArr.indexOf(transactionAmount)
	moneyArr.splice(indexOfTransaction, 1)
	contentWallet(moneyArr)
	if (transactonToDelete.classList.contains('income')) {
		income.removeChild(transactonToDelete)
	} else {
		expenses.removeChild(transactonToDelete)
	}
}
const deleteAllTransactions = () => {
	income.innerHTML = '<h3>Przychód</h3>'
	expenses.innerHTML = '<h3>Wydatki</h3>'
	moneyArr.splice(1)
	contentWallet(moneyArr)
}
const changeStyleToLight = () => {
	root.style.setProperty('--first-color', '#f9f9f9')
	root.style.setProperty('--second-color', '#14161f')
	root.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.2)')
}
const changeStyleToDark = () => {
	root.style.setProperty('--first-color', '#14161f')
	root.style.setProperty('--second-color', '#f9f9f9')
	root.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.2)')
}

addTransaction.addEventListener('click', newTransaction)
cancelBtn.addEventListener('click', closeTransactionPanel)
saveBtn.addEventListener('click', checkForm)
delAllTransactionBtn.addEventListener('click', deleteAllTransactions)
btnLightColor.addEventListener('click', changeStyleToLight)
btnDarkColor.addEventListener('click', changeStyleToDark)

// --first-color: #f9f9f9;
// --second-color: #14161f;
// --border-color: rgba(0, 0, 0, 0.2);
