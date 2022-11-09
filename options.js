async function updateDeactivated(element, isDeactivated) {
    console.log(element, isDeactivated);

    let { deactivated } = await chrome.storage.sync.get("deactivated");
    deactivated = deactivated || [];

    if (isDeactivated) {
        if (!deactivated.includes(element)) deactivated.push(element);
    } else {
        if (deactivated.includes(element)) deactivated.splice(deactivated.indexOf(element), 1);
    }
    await chrome.storage.sync.set({deactivated})
}

(async () => {
    const listE = document.getElementById("list");
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
    let { deactivated } = await chrome.storage.sync.get("deactivated");
    deactivated = deactivated || [];
    for (const [key, value] of Object.entries(emojiTable)) {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = key;
        checkbox.checked = !deactivated.includes(key);
        checkbox.addEventListener("change", (e) => {
            updateDeactivated(key, !e.target.checked);
        });
        const label = document.createElement("label");
        label.htmlFor = key;
        label.innerText = `${key} → ${value}`;
        li.appendChild(checkbox);
        li.appendChild(label);
        listE.appendChild(li);
    }
})();