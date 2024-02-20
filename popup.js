document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggleButton");

    // Retrieve the current toggle state from local storage
    chrome.storage.local.get('enabled', (data) => {
        toggleButton.textContent = data.enabled ? 'Disable Extension' : 'Enable Extension';
    });

    toggleButton.addEventListener("click", () => {
        // Toggle the extension state
        chrome.storage.local.get('enabled', (data) => {
            const isEnabled = !data.enabled;
            chrome.storage.local.set({ 'enabled': isEnabled });
            toggleButton.textContent = isEnabled ? 'Disable Extension' : 'Enable Extension';

            // Send message to content script to enable/disable functionality
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { action: isEnabled ? 'enable' : 'disable' });
            });
        });
    });
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'enable') {
        // Enable extension functionality
        // Your code to enable functionality on the specified website goes here
        alert('Extension enabled');
        document.body.style.border = "5px solid green";
    } else if (message.action === 'disable') {
        // Disable extension functionality
        // Your code to disable functionality on the specified website goes here
        alert('Extension disabled');
        document.body.style.border = "5px solid red";
    }
});
