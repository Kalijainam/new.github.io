function sendSMS() {
    var medicineName = document.getElementById('medicineName').value;
    var reminderTime = document.getElementById("reminderTime").value;
    var currentTime = new Date().getTime();
    var selectedTime = new Date(reminderTime).getTime();
  
    if (selectedTime <= currentTime) {
      alert("Invalid reminder time. Please select a future time.");
      return;
    }
  
    // Rest of your code to send the SMS reminder
    // ...
  
  
    // Get the current date and time
    const currentDate = new Date();
    const currentDateTime = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate() + ' ' + currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();
  
    // Get the selected reminder date and time
    const reminderDateTime = currentDateTime.split(' ')[0] + ' ' + reminderTime;
  
    // Compare the current and reminder date and time
    if (currentDateTime < reminderDateTime) {
      const timeDifference = new Date(reminderDateTime) - new Date(currentDateTime);
      setTimeout(() => {
        sendMessage(medicineName);
      }, timeDifference);
    } else {
      console.error('Invalid reminder time. Please select a future time.');
    }
 }
  
  function sendMessage(medicineName) {
    fetch('https://api.twilio.com/2010-04-01/Accounts/AC55ef14cd0241d915fbef9081a1a7ebb5/Messages.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('AC55ef14cd0241d915fbef9081a1a7ebb5:884ef6a177517e77fc0c94c672b3dca3')
      },
      body: new URLSearchParams({
        From: '+12545564586',
        To: '+917000791799',
        Body: `Reminder: It's time to take your ${medicineName}.`
      })
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Message has been sent!');
    })
    .catch((error) => {
      console.error('Error sending message:', error);
    });
  }
  