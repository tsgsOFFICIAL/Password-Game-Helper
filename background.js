chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Handle messages from content scripts
    if (message.action === 'enable') {
        // Enable functionality
    } else if (message.action === 'disable') {
        // Disable functionality
    }
});
