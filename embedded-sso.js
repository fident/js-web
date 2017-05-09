/**
 * Fident embedded SSO namespace
 */
var fidentEmbedded = fidentEmbedded || {};

// MFA message key
fidentEmbedded.mfaKey = "mfar";

// Login message key
fidentEmbedded.loginKey = "lgis";

fidentEmbedded.mfaPath = "/mfa";
fidentEmbedded.destinationParam = "destination";
fidentEmbedded.serviceURL = "";
fidentEmbedded.callback = null;

// Listener is called when a message with a fident key is recieved
fidentEmbedded.listener = function (evn) {
    if (evn.isTrusted) {
        if (evn.data == fidentEmbedded.loginKey) {
            // User did login (token is now set)
            if (fidentEmbedded.callback != null) {
                fidentEmbedded.callback();
            }
        } else if (evn.data == fidentEmbedded.mfaKey) {
            // User requires MFA to complete login (forward user to Fident MFA)
            window.location.href = (fidentEmbedded.serviceURL
                + fidentEmbedded.mfaPath + "?" +
                fidentEmbedded.destinationParam + "=" +
                window.location.href);
        }
    }
};

// Call this method with your fident service URL (example: "http://localhost:8080/") along with your 'loggedin' method
fidentEmbedded.start = function (fidentServiceURL, loggedInCallback) {
    fidentEmbedded.serviceURL = fidentServiceURL;
    fidentEmbedded.callback = loggedInCallback;
    if (window.addEventListener) {
        window.addEventListener("message", fidentEmbedded.listener, false);
    } else {
        window.attachEvent("onmessage", fidentEmbedded.listener);
    }
};