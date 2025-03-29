let shifts = JSON.parse(localStorage.getItem('shifts')) || {};
        
function getCurrentMonthKey() {
    let now = new Date();
    return now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
}

function updateMonthDropdown() {
    let monthSelect = document.getElementById('monthSelect');
    monthSelect.innerHTML = "";

    let months = Object.keys(shifts)
        .filter(month => /^\d{4}-\d{2}$/.test(month)) 
        .sort().reverse();

    let currentMonth = getCurrentMonthKey();
    if (!months.includes(currentMonth)) {
        months.unshift(currentMonth);
    }

    months.forEach(month => {
        let date = new Date(month + "-01"); 
        if (!isNaN(date)) { 
            let option = document.createElement('option');
            option.value = month;
            option.textContent = date.toLocaleDateString('uk-UA', { month: 'long', year: 'numeric' });
            monthSelect.appendChild(option);
        }
    });

    monthSelect.value = currentMonth;
}


function maskTime(input) {
    input.value = input.value.replace(/[^0-9:]/g, "");
    if (input.value.length === 2 && !input.value.includes(":")) {
        input.value += ":";
    }
    if (/^([01]\d|2[0-3]):[0-5]\d$/.test(input.value)) {
        input.classList.remove('invalid');
    } else {
        input.classList.add('invalid');
    }
}

function addShift() {
    let date = document.getElementById('date').value;
    let start = document.getElementById('start').value;
    let end = document.getElementById('end').value;
    let timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;
    if (!date || !start || !end) return alert('Заповніть всі поля!');
    if (!timePattern.test(start) || !timePattern.test(end)) return alert('Введіть час в форматі HH:MM!');
    
    let startTime = new Date(`${date}T${start}:00`);
    let endTime = new Date(`${date}T${end}:00`);
    if (endTime <= startTime) return alert('Час закінчення має бути пізніше часу початку!');
    
    let hours = (endTime - startTime) / 3600000;
    let monthKey = date.slice(0, 7);

    if (!shifts[monthKey]) {
        shifts[monthKey] = [];
    }

    shifts[monthKey].push({ date, start, end, hours });
    localStorage.setItem('shifts', JSON.stringify(shifts));

    updateMonthDropdown();
    renderShifts();
}

function deleteShift(index) {
    let selectedMonth = document.getElementById('monthSelect').value;
    
    if (confirm('Ви впевнені, що хочете видалити цю зміну?')) {
        shifts[selectedMonth].splice(index, 1);
        
        if (shifts[selectedMonth].length === 0) {
            delete shifts[selectedMonth];
        }
        
        localStorage.setItem('shifts', JSON.stringify(shifts));
        
        updateMonthDropdown(); 
        
        document.getElementById('monthSelect').value = selectedMonth;
        
        renderShifts();
    }
}


function renderShifts() {
    let tbody = document.getElementById('shiftTable');
    tbody.innerHTML = '';
    let selectedMonth = document.getElementById('monthSelect').value;
    let total = 0;
    
    if (shifts[selectedMonth]) {
        shifts[selectedMonth].forEach((shift, index) => {
            total += shift.hours;
            tbody.innerHTML += `<tr>
                <td>${shift.date}</td>
                <td>${shift.start}</td>
                <td>${shift.end}</td>
                <td>${shift.hours.toFixed(2)}</td>
                <td><button class="delete-shift-btn" onclick="deleteShift(${index})">❌</button></td>
            </tr>`;
        });
    }

    document.getElementById('totalHours').textContent = total.toFixed(2);
}

function backupShifts() {
    if (!confirm("Зберегти дані як файл?")) return;

    let dataStr = JSON.stringify(shifts, null, 2);
    let blob = new Blob([dataStr], { type: "application/json" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "shifts_backup.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}


function restoreShifts(event) {
    if (!confirm("Ви впевнені, що хочете відновити дані з бекапу? Це перезапише поточні дані!")) return;

    let file = event.target.files[0];
    if (!file) return;

    let reader = new FileReader();
    reader.onload = function(e) {
        try {
            let restoredData = JSON.parse(e.target.result);
            if (typeof restoredData === "object") {
                shifts = restoredData;
                localStorage.setItem("shifts", JSON.stringify(shifts));
                updateMonthDropdown();
                renderShifts();
                alert("Дані успішно відновлено!");
            } else {
                alert("Невірний формат файлу!");
            }
        } catch (error) {
            alert("Помилка читання файлу!");
        }
    };
    reader.readAsText(file);
}




updateMonthDropdown();
renderShifts();