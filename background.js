// Listener for keyboard commands
chrome.commands.onCommand.addListener((command) => {
  console.log('Command received:', command); // Log command receipt
  if (command === 'toggle-extension') {
    chrome.storage.local.get('extensionId', (data) => {
      console.log('Retrieved data from storage:', data); // Log retrieved data
      if (chrome.runtime.lastError) {
        console.error('Error retrieving extension ID from storage:', chrome.runtime.lastError.message);
        showNotification('Error retrieving extension ID.');
        return;
      }

      const extensionId = data.extensionId;
      if (extensionId) {
        console.log('Retrieved extension ID from storage:', extensionId);
        toggleExtension(extensionId);
      } else {
        console.error('No extension ID found in storage.');
        showNotification('No extension ID found.');
      }
    });
  }
});

// Function to show notification
function showNotification(message) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'redsage32.png',
    title: 'RedSage Extension Manager',
    message: message,
    priority: 1,
  });

  // Auto-close notification after 3 seconds
  setTimeout(() => {
    chrome.notifications.getAll((notifications) => {
      Object.keys(notifications).forEach((id) => {
        chrome.notifications.clear(id);
      });
    });
  }, 3000);
}

// Function to toggle the extension state
function toggleExtension(extensionId) {
  console.log('Attempting to toggle extension with ID:', extensionId); // Log ID being toggled
  chrome.management.get(extensionId, (extension) => {
    if (chrome.runtime.lastError) {
      console.error('Error retrieving extension:', chrome.runtime.lastError.message);
      showNotification('Error retrieving extension details.');
      return;
    }

    console.log('Retrieved extension details:', extension); // Log extension details

    // Toggle the extension based on its current state
    if (extension.enabled) {
      console.log('Disabling extension:', extension.name);
      chrome.management.setEnabled(extensionId, false, () => {
        if (chrome.runtime.lastError) {
          console.error('Failed to disable the extension:', chrome.runtime.lastError.message);
          showNotification('Failed to disable the extension.')
        } else {
          console.log(`Successfully disabled extension: ${extension.name}`);
          showNotification('Disabled: ${extension.name}');
        }
      });
    } else {
      console.log('Enabling extension:', extension.name);
      chrome.management.setEnabled(extensionId, true, () => {
        if (chrome.runtime.lastError) {
          console.error('Failed to enable the extension:', chrome.runtime.lastError.message);
          showNotification('Failed to enable the extension.');
        } else {
          console.log(`Successfully enabled extension: ${extension.name}`);
          showNotification('Enabled: ${extension.name}');
        }
      });
    }
  });
}
