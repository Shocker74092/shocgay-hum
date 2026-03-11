// ===============================
// ซื้อสินค้า
// ===============================

function buy(name, price){

let order = {
name: name,
price: price,
qty: 1,
total: price,
status: "ยังไม่ชำระ"
}

localStorage.setItem("currentOrder", JSON.stringify(order))

window.location = "payment.html"

}



// ===============================
// โหลดหน้าชำระเงิน
// ===============================

function loadPayment(){

let order = JSON.parse(localStorage.getItem("currentOrder"))

if(!order){
return
}

document.getElementById("productName").innerText = order.name
document.getElementById("productPrice").innerText = order.price

document.getElementById("qty").value = order.qty

updateTotal()

}



// ===============================
// คำนวณราคารวม
// ===============================

function updateTotal(){

let price = parseInt(document.getElementById("productPrice").innerText)

let qty = parseInt(document.getElementById("qty").value)

if(qty < 1){
qty = 1
document.getElementById("qty").value = 1
}

let total = price * qty

document.getElementById("totalPrice").innerText = total

}



// ===============================
// ยืนยันการชำระเงิน
// ===============================

function confirmPay(){

let order = JSON.parse(localStorage.getItem("currentOrder"))

let qty = parseInt(document.getElementById("qty").value)

let total = parseInt(document.getElementById("totalPrice").innerText)

order.qty = qty
order.total = total
order.status = "ชำระแล้ว"

let orders = JSON.parse(localStorage.getItem("orders")) || []

orders.push(order)

localStorage.setItem("orders", JSON.stringify(orders))

localStorage.removeItem("currentOrder")

window.location = "history.html"

}



// ===============================
// โหลดประวัติการสั่งซื้อ
// ===============================

function loadOrders(){

let orders = JSON.parse(localStorage.getItem("orders")) || []

let html = ""

if(orders.length === 0){

html = "<p>ยังไม่มีประวัติการสั่งซื้อ</p>"

}else{

orders.forEach(o => {

html += `
<div class="card">
<h3>${o.name}</h3>
<p>ราคา : ${o.price} บาท</p>
<p>จำนวน : ${o.qty}</p>
<p>รวม : ${o.total} บาท</p>
<p>สถานะ : ${o.status}</p>
</div>
`

})

}

document.getElementById("orders").innerHTML = html

}