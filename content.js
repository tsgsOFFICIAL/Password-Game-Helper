function insertStringAfter(targetElement, searchString, stringToInsert) {
    // Convert the HTML string into a DOM element
    var tempElement = document.createElement('div');
    tempElement.innerHTML = targetElement;

    // Traverse through child nodes to find and insert the string
    traverseAndInsert(tempElement, searchString, stringToInsert);

    // Return the updated HTML string
    return tempElement.innerHTML;
}

function traverseAndInsert(node, searchString, stringToInsert) {
    if (node.nodeType === 3) { // Text node
        var text = node.nodeValue;
        var index = text.indexOf(searchString);
        if (index !== -1) {
            var newText = text.substring(0, index + searchString.length) + stringToInsert + text.substring(index + searchString.length);
            node.nodeValue = newText;
        }
    } else if (node.nodeType === 1) { // Element node
        for (var i = 0; i < node.childNodes.length; i++) {
            traverseAndInsert(node.childNodes[i], searchString, stringToInsert);
        }
    }
}

function removeStringFromParagraph(paragraph, stringToRemove) {
    // Convert the HTML string into a DOM element
    var tempElement = document.createElement('div');
    tempElement.innerHTML = paragraph;

    // Traverse through child nodes to find and remove the string
    traverseAndRemove(tempElement, stringToRemove);

    // Return the updated HTML string
    return tempElement.innerHTML;
}

function traverseAndRemove(node, stringToRemove) {
    if (node.nodeType === 3) { // Text node
        var text = node.nodeValue;
        var newText = text.replace(new RegExp(stringToRemove, 'g'), '');
        node.nodeValue = newText;
    } else if (node.nodeType === 1) { // Element node
        for (var i = 0; i < node.childNodes.length; i++) {
            traverseAndRemove(node.childNodes[i], stringToRemove);
        }
    }
}

function countOccurrences(targetString, searchString) {
    // Use a regular expression with the 'g' flag to match all occurrences of the search string
    var regex = new RegExp(searchString, 'g');
    // Use match method to get an array of all matches
    var matches = targetString.match(regex);
    // Return the number of matches
    return matches ? matches.length : 0;
}

// Start interval
const timer = setInterval(() => {
    // Get constants
    const div = document.querySelector('.ProseMirror');
    let innerHtml = div.innerHTML;
    let textContent = div.textContent;

    // Extinguish any fire imidiately!
    if (countOccurrences(textContent, '🔥') > 0) {
        innerHtml = removeStringFromParagraph(innerHtml, '🔥');

        div.innerHTML = innerHtml;
        textContent = div.textContent;
    }

    // Feed Paul!
    // 🐔🐛🐛🐛
    let worms = countOccurrences(textContent, '🐛');
    if (worms < 3) {
        innerHtml = insertStringAfter(innerHtml, '🐔', '🐛');

        div.innerHTML = innerHtml;
        textContent = div.textContent;
    }
}, 100);