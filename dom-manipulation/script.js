const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Do not wait to strike till the iron is hot; but make it hot by striking.", category: "Motivation" },
    { text: "Whether you think you can or you think you can’t, you’re right.", category: "Belief" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Dreams" },
    { text: "It does not matter how slowly you go as long as you do not stop.", category: "Perseverance" },
    { text: "The harder you work for something, the greater you’ll feel when you achieve it.", category: "Hard Work" },
    { text: "Success is not how high you have climbed, but how you make a positive difference to the world.", category: "Success" },
    { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Time" },
    { text: "Don’t let yesterday take up too much of today.", category: "Life" },
    { text: "You miss 100% of the shots you don’t take.", category: "Courage" }
]

function showRandomQuote(){
    const randomQuotes= Math.floor(Math.random()*quotes.length);
    const selectedQuotes= quotes[randomQuotes];
    const quoteDisplay= document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML= selectedQuotes.text;
}

document.getElementById('newQuote').addEventListener('click', showRandomQuote);

function createAddQuoteForm(){
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory= document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory){
        quotes.push({text: newQuoteText, category:newQuoteCategory});

        const newQuoteElement = document.createElement('p')
        newQuoteElement.innerHTML=`New Quote: ${newQuoteText} - category:${newQuoteCategory}`
        quoteDisplay.appendChild(newQuoteElement)

        quoteDisplay.innerHTML= newQuoteText;

        document.getElementById('newQuoteText').value='';
        document.getElementById('newQuoteCategory').value='';

        alert('Quote added');
    } else {
        alert('Please enter both a quote and a category');
    }
}



