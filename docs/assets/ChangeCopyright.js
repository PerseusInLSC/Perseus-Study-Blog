document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('footer1').innerHTML = document.getElementById('footer1').innerHTML.replace('Copyright © <span id=\"copyrightYear\">' + new Date(Date.now() + 8 * 60 * 60 * 1000).getUTCFullYear() + '</span>', 'CC0 1.0');
})
