const card = document.getElementById("flip-card");
    let isFlipped = false;

    // Flip on click
    card.addEventListener("click", () => {
        if (!isFlipped) {
            card.classList.add("flipped");
            isFlipped = true;
        }
    });

    function checkPIN() {
        const pinInput = document.getElementById("pin-input").value;
        const correctPIN = "1234";
        if (pinInput === correctPIN) {
            document.getElementById("pin-area").style.display = "none";
            document.getElementById("secure-content").style.display = "block";
        } else {
            alert("❌ Incorrect PIN");
        }
    }
     function formatCurrency(amount) {
            return `₹${parseFloat(amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
        }

        function getCurrentDateTime() {
            const now = new Date();
            return now.toLocaleString("en-GB", {
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit'
            }).replace(",", "");
        }

        function updateBalance(change, type) {
            const amountEl = document.querySelector(".amount");
            let current = parseFloat(amountEl.textContent.replace(/[^\d.-]/g, ""));
            current += type === "deposit" ? change : -change;
            amountEl.innerHTML = `${formatCurrency(current)}<span class="currency">INR</span>`;
            amountEl.classList.add("updated");
            setTimeout(() => amountEl.classList.remove("updated"), 500);
        }

        function addTransactionRow(type, amount) {
            const tbody = document.getElementById("transactionTableBody");
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${getCurrentDateTime()}</td>
                <td class="${type}">${type.charAt(0).toUpperCase() + type.slice(1)}</td>
                <td class="${type}">${formatCurrency(amount)}</td>
            `;
            tbody.insertBefore(row, tbody.firstChild);
        }

        document.getElementById("deposit-btn").addEventListener("click", function () {
            const input = this.previousElementSibling;
            const amount = parseFloat(input.value);
            if (!isNaN(amount) && amount > 0) {
                updateBalance(amount, "deposit");
                addTransactionRow("deposit", amount);
                input.value = "";
            } else {
                alert("Please enter a valid amount.");
            }
        });

        document.getElementById("withdraw-btn").addEventListener("click", function () {
            const input = this.previousElementSibling;
            const amount = parseFloat(input.value);
            const balance = parseFloat(document.querySelector(".amount").textContent.replace(/[^\d.-]/g, ""));
            if (!isNaN(amount) && amount > 0) {
                if (amount > balance) {
                    alert("Insufficient funds.");
                    return;
                }
                updateBalance(amount, "withdraw");
                addTransactionRow("withdraw", amount);
                input.value = "";
            } else {
                alert("Please enter a valid amount.");
            }
        });

        document.querySelector(".close-btn").addEventListener("click", function () {
            if (confirm("Are you sure you want to exit?")) {
                alert("You have been logged out");
            }
        });