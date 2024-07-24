$(document).ready(function() {
  const apiUrl = 'articles.json';

  // Load articles for index.html
  function loadArticles() {
    $.getJSON(apiUrl, function(data) {
      let articlesHtml = '';
      data.articles.forEach(article => {
        articlesHtml += `
          <article>
            <h2><a href="detailed.html?id=${article.id}" class="article-link">${article.title}</a></h2>
            <p>${article.content.substring(0, 100)}...</p>
          </article>
        `;
      });
      $('#articles').html(articlesHtml).hide().fadeIn(1000); // jQuery animation added here

      // Adding tooltip to article links
      $('.article-link').tooltip({
        content: function() {
          return $(this).text();
        }
      });
    });
  }

  // Load overview articles
  function loadOverview() {
    $.getJSON(apiUrl, function(data) {
      let overviewHtml = '';
      data.articles.slice(0, 3).forEach(article => {
        overviewHtml += `
          <article>
            <h2><a href="detailed.html?id=${article.id}" class="article-link">${article.title}</a></h2>
            <p>${article.content.substring(0, 100)}...</p>
          </article>
        `;
      });
      $('#overview-articles').html(overviewHtml).hide().fadeIn(1000); // jQuery animation added here

      // Adding tooltip to article links
      $('.article-link').tooltip({
        content: function() {
          return $(this).text();
        }
      });
    });
  }

  // Load detailed article
  function loadArticleDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    $.getJSON(apiUrl, function(data) {
      const article = data.articles.find(article => article.id == articleId);
      if (article) {
        const articleHtml = `
          <article>
            <h1>${article.title}</h1>
            <p>${article.content}</p>
          </article>
        `;
        $('#article-detail').html(articleHtml).hide().fadeIn(1000); // jQuery animation added here
      } else {
        $('#article-detail').html('<p>Article not found.</p>');
      }
    });
  }

  // Add a new article
  function addArticle(title, content, date) { // Added date parameter
    $.ajax({
      url: apiUrl,
      method: 'POST',
      data: JSON.stringify({ title, content, date }), // Included date in the data
      contentType: 'application/json',
      success: function() {
        alert('Article added successfully!');
        window.location.href = 'index.html'; // Redirect to the main page
      },
      error: function() {
        alert('Failed to add article.');
      }
    });
  }

  // Initialize date picker
  function initializeDatePicker() {
    $("#date").datepicker(); // jQuery UI date picker
  }

  // Form validation
  function validateForm() {
    const title = $('#title').val();
    const content = $('#content').val();
    const date = $('#date').val();
    if (title === '' || content === '' || date === '') {
      alert('All fields are required.');
      return false;
    }
    return true;
  }

  // Smooth scroll to articles
  function smoothScrollTo(target) {
    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, 1000);
  }

  // Initialize page
  if (window.location.pathname.endsWith('index.html')) {
    loadArticles();
  } else if (window.location.pathname.endsWith('overview.html')) {
    loadOverview();
  } else if (window.location.pathname.endsWith('detailed.html')) {
    loadArticleDetail();
  } else if (window.location.pathname.endsWith('manage.html')) {
    initializeDatePicker();
    $('#add-article-form').on('submit', function(event) {
      event.preventDefault();
      if (validateForm()) { // Validate form before submitting
        const title = $('#title').val();
        const content = $('#content').val();
        const date = $('#date').val(); // Get date value
        addArticle(title, content, date);
      }
    });
  }

  // Smooth scroll to articles section on index page
  if (window.location.pathname.endsWith('index.html')) {
    $('#scroll-to-articles').on('click', function(event) {
      event.preventDefault();
      smoothScrollTo('#articles');
    });
  }
});
