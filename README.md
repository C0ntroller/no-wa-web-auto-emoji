# Deactivate WA Web Auto Emojis

This is a small browser addon, that deactivates the auto replacement of smileys with emojis in WhatsApp Web.
When typing `:D` in WhatsApp Web, instead of just keeping it as text `😀` will be injected.
I don't like that.

This extensions disables it, by putting an zero-width-space between `:` and `D`.

There is an option page where you can toggle the behaviour for individual emojis.

## Known issues
As WhatsApp Web does not use an HTML `<input>` but had the "great idea" to have some div listening to keypresses, it is hard to inject stuff.

* It does only work, when you are typing at the end of the text. Adding a smiley in the middle of the text will not be disabled.
* It does not work when pasting text.
