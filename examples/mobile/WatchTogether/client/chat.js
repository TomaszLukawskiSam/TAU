(function () {
    function onChatPageBeforeShow(ev) {
        if (ev.target.id === "chat-page") {
            toogleButtons(!!user);
        }
    }

    document.addEventListener("pagebeforeshow", onChatPageBeforeShow);
})();