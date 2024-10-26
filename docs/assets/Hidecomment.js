document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('content').innerHTML = document.getElementById('content').innerHTML.replace(
`<button class="btn btn-block" type="button" onclick="openComments()" id="cmButton">`, 
`<button class="btn btn-block" type="button" onclick="openComments()" id="cmButton" style="display: none;">`);
})
