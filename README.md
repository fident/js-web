# js-web
Front-end helpers for Fident services

#### Embedded SSO
Use this helper to embed SSO login buttons on your page, clicking these will log the user directly into your app automating the account creation process.
Usage

Assuming your fident instance is already setup, all you need to do is add your sites URL to your fident configs 'sso_embed_urls'. You can then embed the SSO buttons in your page using the following markup and HTML replacing references to 'localhost' with your own Fident service URL

```html
<script type="text/javascript" src="embedded-sso-min.js"></script>

<iframe src="http://localhost:8080/sso" frameBorder="0"></iframe>
```

```js
fidentEmbedded.start("http://localhost:8080/", function(){
	// Example: Refresh page once user is logged in
	 window.location.reload();
});
```
