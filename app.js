import inspirationalQuotes from 'https://cdn.skypack.dev/inspirational-quotes';

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    const quoteElement = document.getElementById('quote');
    const newQuoteBtn = document.getElementById('new-quote-btn');

    console.log('quoteElement:', quoteElement);
    console.log('newQuoteBtn:', newQuoteBtn);

    const loadQuote = () => {
        const quote = inspirationalQuotes.getQuote().text;
        console.log('New quote:', quote);
        quoteElement.textContent = quote;
    };

    newQuoteBtn.addEventListener('click', loadQuote);

    // Load the initial quote
    loadQuote();
});
