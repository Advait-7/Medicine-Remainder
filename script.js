document.addEventListener("DOMContentLoaded", function() {
    displayMedicineList();
    initializeMedicineReminders();
});

function openAddMedicineModal() {
    document.getElementById("addMedicineModal").style.display = "block";
}

function closeAddMedicineModal() {
    document.getElementById("addMedicineModal").style.display = "none";
}

function addMedicine() {
    const medicineName = document.getElementById("medicineName").value;
    const medicineTime = document.getElementById("medicineTime").value;

    if (medicineName && medicineTime) {
        const medicine = {
            name: medicineName,
            time: medicineTime,
            taken: false
        };

        // Save to local storage
        const medicines = JSON.parse(localStorage.getItem("medicines")) || [];
        medicines.push(medicine);
        localStorage.setItem("medicines", JSON.stringify(medicines));

        // Close the modal and update the list
        closeAddMedicineModal();
        displayMedicineList();
    } else {
        alert("Please enter both medicine name and time.");
    }
}

function displayMedicineList() {
    const medicineListContainer = document.getElementById("medicineList");
    const medicines = JSON.parse(localStorage.getItem("medicines")) || [];

    if (medicines.length > 0) {
        let html = "<h2>Medicine Schedule</h2>";

        medicines.forEach(function(medicine, index) {
            const statusClass = medicine.taken ? "taken" : "";
            html += `<div class="medicine ${statusClass}">
                        <div>${index + 1}. ${medicine.name} - ${medicine.time}</div>
                        <button onclick="toggleMedicineStatus(${index})">${medicine.taken ? 'Undo' : 'Taken'}</button>
                        <button onclick="deleteMedicine(${index})">Delete</button>
                    </div>`;
        });

        medicineListContainer.innerHTML = html;
    } else {
        medicineListContainer.innerHTML = "<p>No medicines scheduled.</p>";
    }
}

function toggleMedicineStatus(index) {
    const medicines = JSON.parse(localStorage.getItem("medicines")) || [];
    medicines[index].taken = !medicines[index].taken;
    localStorage.setItem("medicines", JSON.stringify(medicines));
    displayMedicineList();
}

function deleteMedicine(index) {
    const medicines = JSON.parse(localStorage.getItem("medicines")) || [];
    medicines.splice(index, 1);
    localStorage.setItem("medicines", JSON.stringify(medicines));
    displayMedicineList();
}

// Add the following function to show the reminder popup
// function showReminderPopup() {
//     const popup = document.getElementById('reminderPopup');
//     popup.style.display = 'block';
// }

// Add the following function to close the reminder popup
// function closeReminderPopup() {
//     const popup = document.getElementById('reminderPopup');
//     popup.style.display = 'none';
// }
// function initializeMedicineReminders() {
//     // Assuming you have a list of medicines with their respective timings
//     const medicines = [
//         { name: 'Medicine A', time: '09:00' },
//         { name: 'Medicine B', time: '12:30' },
//         { name: 'Medicine C', time: '17:00' }
//         // Add more medicines and timings as needed
//     ];

//     // Set up reminders for each medicine
//     medicines.forEach(function(medicine) {
//         scheduleMedicineReminder(medicine.name, medicine.time);
//     });
// }

// function scheduleMedicineReminder(medicineName, medicineTime) {
//     const currentTime = new Date();
//     const reminderTime = new Date(currentTime.toDateString() + ' ' + medicineTime);

//     // Calculate the time difference in milliseconds
//     const timeDifference = reminderTime - currentTime;

//     // Ensure the reminder time is in the future
//     if (timeDifference > 0) {
//         setTimeout(function() {
//             // Show the reminder popup or send a notification
//             showReminderNotification(medicineName);
//         }, timeDifference);
//     }
// }

// // Modify the existing showReminderNotification function to call showReminderPopup
// function showReminderNotification(medicineName) {
//     if (Notification.permission === "granted") {
//         const notification = new Notification("Medicine Reminder", {
//             body: `It's time to take ${medicineName}!`,
//             icon: "pill-icon.png"
//         });

//         notification.onclick = function() {
//             showReminderPopup(); // Show the popup when the notification is clicked
//         };
//     } else if (Notification.permission !== "denied") {
//         Notification.requestPermission().then(function(permission) {
//             if (permission === "granted") {
//                 showReminderNotification(medicineName);
//             }
//         });
//     }
// }
// function showReminderPopup(medicineName) {
//     const popup = document.getElementById('reminderPopup');
//     const popupContent = document.querySelector('.popup-content');
//     popupContent.innerHTML = `<p>It's time to take ${medicineName}!</p>`;
//     popup.style.display = 'block';

//     setTimeout(function() {
//         popup.style.display = 'none'; // Hide the popup after a few seconds
//     }, 5000); // Adjust the time as needed
// }
// function initializeMedicineReminders() {
//     const medicines = [
//         { name: 'Medicine A', time: '09:00', mobileNumber: '+1234567890' },
//         { name: 'Medicine B', time: '12:30', mobileNumber: '+1987654321' },
//         { name: 'Medicine C', time: '17:00', mobileNumber: '+1555555555' }
//         // Add more medicines and details as needed
//     ];

//     medicines.forEach(function(medicine) {
//         scheduleMedicineReminder(medicine.name, medicine.time, medicine.mobileNumber);
//     });
// }

// function scheduleMedicineReminder(medicineName, medicineTime, mobileNumber) {
//     const currentTime = new Date();
//     const reminderTime = new Date(currentTime.toDateString() + ' ' + medicineTime);

//     const timeDifference = reminderTime - currentTime;

//     if (timeDifference > 0) {
//         setTimeout(function() {
//             // Send the SMS reminder
//             sendReminderSMS(medicineName, mobileNumber);
//             // Show the reminder popup or send a notification
//             showReminderNotification(medicineName);
//         }, timeDifference);
//     }
// }

// function sendReminderSMS(medicineName, mobileNumber) {
//     // Replace 'YOUR_NEXMO_API_KEY' and 'YOUR_NEXMO_API_SECRET' with your Nexmo credentials
//     const nexmoApiKey = '9UhItrEEhFQ8WfAw/9kqqcl/9EY8EBW42t4FGa6vCqzpciUpZ1lvFynePsRgUUDhPSpTlg4UYdS1QZrNy0L88g==';
//     const nexmoApiSecret = '9UhItrEEhFQ8WfAw/9kqqcl/9EY8EBW42t4FGa6vCqzpciUpZ1lvFynePsRgUUDhPSpTlg4UYdS1QZrNy0L88g==';

//     const message = `It's time to take ${medicineName}!`;

//     fetch(`https://rest.nexmo.com/sms/json`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         body: `api_key=${nexmoApiKey}&api_secret=${nexmoApiSecret}&to=${encodeURIComponent(mobileNumber)}&from=Nexmo&text=${encodeURIComponent(message)}`
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('SMS reminder sent:', data);
//     })
//     .catch(error => {
//         console.error('Error sending SMS reminder:', error);
//     });
// }