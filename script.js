const balance = document.getElementById("balance")
const income = document.getElementById("income")
const expense = document.getElementById("expense")
const list = document.getElementById("list")
const form = document.getElementById("form")
const text = document.getElementById("text")
const amount = document.getElementById("amount")

let transactions = JSON.parse(localStorage.getItem("transactions")) || []

function updateValues(){

const amounts = transactions.map(t => t.amount)

const total = amounts.reduce((acc,item)=>acc+item,0).toFixed(2)

const inc = amounts
.filter(item=>item>0)
.reduce((acc,item)=>acc+item,0)
.toFixed(2)

const exp = (
amounts
.filter(item=>item<0)
.reduce((acc,item)=>acc+item,0)*-1
).toFixed(2)

balance.innerText = "₹"+total
income.innerText = "₹"+inc
expense.innerText = "₹"+exp

}

function addTransactionDOM(transaction){

const li = document.createElement("li")

li.innerHTML = `
${transaction.text}
<span>₹${transaction.amount}</span>
`

list.appendChild(li)

}

function addTransaction(e){

e.preventDefault()

const transaction = {
text:text.value,
amount:+amount.value
}

transactions.push(transaction)

addTransactionDOM(transaction)

updateValues()

localStorage.setItem("transactions",JSON.stringify(transactions))

text.value=""
amount.value=""

}

form.addEventListener("submit",addTransaction)

transactions.forEach(addTransactionDOM)

updateValues()