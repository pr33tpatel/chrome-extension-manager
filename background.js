// Listener for keyboard commands
chrome.commands.onCommand.addListener((command) => {
  console.log('Command received:', command); // Log command receipt
  if (command === 'toggle-extension') {
    chrome.storage.local.get('extensionId', (data) => {
      console.log('Retrieved data from storage:', data); // Log retrieved data
      if (chrome.runtime.lastError) {
        console.error('Error retrieving extension ID from storage:', chrome.runtime.lastError.message);
        return;
      }

      const extensionId = data.extensionId;
      if (extensionId) {
        console.log('Retrieved extension ID from storage:', extensionId);
        toggleExtension(extensionId);
      } else {
        console.error('No extension ID found in storage.');
      }
    });
  }
});

// Function to show notification
function showNotification(message) {
  chrome.notifications.create({
    type: 'basic',
    title: 'Extension Manager by Preet',
    priority: 1,
    message: message,
  });
}

// Function to toggle the extension state
function toggleExtension(extensionId) {
  console.log('Attempting to toggle extension with ID:', extensionId); // Log ID being toggled
  chrome.management.get(extensionId, (extension) => {
    if (chrome.runtime.lastError) {
      console.error('Error retrieving extension:', chrome.runtime.lastError.message);
      return;
    }

    console.log('Retrieved extension details:', extension); // Log extension details

    // Toggle the extension based on its current state
    if (extension.enabled) {
      console.log('Disabling extension:', extension.name);
      chrome.management.setEnabled(extensionId, false, () => {
        if (chrome.runtime.lastError) {
          console.error('Failed to disable the extension:', chrome.runtime.lastError.message);
        } else {
          console.log(`Successfully disabled extension: ${extension.name}`);
        }
      });
    } else {
      console.log('Enabling extension:', extension.name);
      chrome.management.setEnabled(extensionId, true, () => {
        if (chrome.runtime.lastError) {
          console.error('Failed to enable the extension:', chrome.runtime.lastError.message);
        } else {
          console.log(`Successfully enabled extension: ${extension.name}`);
        }
      });
    }
  });
}
