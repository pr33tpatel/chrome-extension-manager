document.addEventListener('DOMContentLoaded', () => {
  const extensionIdInput = document.getElementById('extensionId');
  const toggleButton = document.getElementById('toggleButton');
  const messageDiv = document.getElementById('message');
  const extensionNameSpan = document.getElementById('extensionName');

  // Function to display the current extension details
  function displayCurrentExtension() {
    chrome.storage.local.get('extensionId', ({ extensionId }) => {
      if (extensionId) {
        // Fetch the extension details using the stored extension ID
        chrome.management.get(extensionId, (extension) => {
          if (chrome.runtime.lastError) {
            console.error('Error retrieving extension:', chrome.runtime.lastError.message);
            extensionNameSpan.textContent = 'Error retrieving extension';
            return;
          }
          // Display the extension name or ID
          extensionNameSpan.textContent = extension.name || extension.id;
        });
      } else {
        extensionNameSpan.textContent = 'None'; // Display 'None' if no extension is being managed
      }
    });
  }

  // Display the current extension when the popup loads
  displayCurrentExtension();

  // Handle the toggle button click event
  toggleButton.addEventListener('click', () => {
    const extensionId = extensionIdInput.value.trim();

    if (extensionId) {
      chrome.storage.local.set({ 'extensionId': extensionId }, () => {
        console.log('Stored extension ID:', extensionId);
        chrome.runtime.sendMessage({ command: 'toggle-extension' }, (response) => {
          if (response && response.success) {
            messageDiv.textContent = 'Extension toggled successfully!';
          } else {
            messageDiv.textContent = 'Failed to toggle the extension.';
          }
          messageDiv.style.display = 'block';
          setTimeout(() => { messageDiv.style.display = 'none'; }, 3000); // Hide message after 3 seconds
          // Update the displayed extension after toggling
          displayCurrentExtension();
        });
      });
    } else {
      alert('Please enter a valid extension ID.');
    }
  });
});
