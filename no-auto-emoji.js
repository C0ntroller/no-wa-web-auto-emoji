function prepareTable(deactivated) {
    deactivated = deactivated || [];
    const emojiTable = {
        "(y)": "👍",
        "(Y)": "👍",
        "(n)": "👎",
        "(N)": "👎",
        ":-)": "🙂",
        ":)": "🙂",
        ":-(": "🙁",
        ":(": "🙁",
        ":-p": "😛",
        ":-P": "😛",
        ":P": "😛",
        ":-\\": "😕",
        ":\\": "😕",
        ":-D": "😀",
        ":D": "😀",
        ":-o": "😮",
        ":O": "😮",
        ";-)": "😉",
        ";)": "😉",
        ":-*": "😘",
        ":-|": "😐",
        ":'(": "😢",
        "^_^": "😁",
        "<3": "❤️",
        ">_<": "😆",
        "8)": "😎"
    };

    for (const d of deactivated) {
        delete emojiTable[d];
    }

    return emojiTable;
}

let emojiTable = prepareTable([]);
chrome.storage.sync.get("deactivated", (result) => {
    emojiTable = prepareTable(result.deactivated);
});
chrome.storage.onChanged.addListener((changes, _areaName) => {
    if (changes.deactivated?.newValue) emojiTable = prepareTable(changes.deactivated.newValue);
});

function fakeInput(input, data) {
    input.innerText = data;
	input.dispatchEvent(new InputEvent('input', {
		inputType: 'insertText',
		data,
		bubbles: true,
		cancelable: false,
		composed: true,
		detail: 0,
	}));
}

new MutationObserver(() => {
    const divInput = document.querySelector("[data-testid=conversation-compose-box-input]");
    if (!divInput || divInput.getAttribute("data-noautoemote")) return;

    divInput.setAttribute("data-noautoemote", "true");

    divInput.parentElement.addEventListener("beforeinput", e => {
        const textField = divInput.querySelector("span");
        const text = (textField?.innerHTML || "") + e.data;

        if (text.substring(text.length - 2) in emojiTable || text.substring(text.length - 3) in emojiTable) {
            e.preventDefault();
            fakeInput(divInput, "\u200B");
            fakeInput(divInput, e.data);
        }
    });
}).observe(document, { childList: true, subtree: true });