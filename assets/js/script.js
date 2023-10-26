//  BACK TO TOP ACTION //
window.addEventListener('scroll', function () {
    var button = document.getElementById('backToTopButton');
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
      button.style.display = 'block';
    } else {
      button.style.display = 'none';
    }
  });
  
  document.getElementById('backToTopButton').addEventListener('click', function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
  