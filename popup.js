document.getElementById('toggleButton').addEventListener('click', () => {
    const extensionId = document.getElementById('extensionId').value.trim(); // Trim spaces
    if (extensionId) {
      chrome.storage.local.set({ 'extensionId': extensionId }, () => {
        console.log('Stored extension ID:', extensionId); // Log storage success
        chrome.runtime.sendMessage({ command: 'toggle-extension' }, (response) => {
          console.log('Response from background:', response); // Log response
        });
      });
    } else {
      alert('Please enter a valid extension ID.');
    }
  });
  