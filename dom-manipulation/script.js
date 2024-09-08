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
        // quoteDisplay=''
        quoteDisplay.appendChild(newQuoteElement)

        // Save the updated quotes array to local storage
        localStorage.setItem('quotes', JSON.stringify(quotes))

        // quoteDisplay.innerHTML= newQuoteText;

        document.getElementById('newQuoteText').value='';
        document.getElementById('newQuoteCategory').value='';

        alert('Quote added');
    } else {
        alert('Please enter both a quote and a category');
    }

}

function loadQuotesLocalStorage(){
    const storedQuotes= localStorage.getItem('quotes')
    if(storedQuotes){
        quotes.push(...JSON.parse(storedQuotes))
        displayAllQuotes();
    }
}

function displayAllQuotes(){
    quoteDisplay.innerHTML='';
    for (const quote of quotes){
        const displayQuotesPara= document.createElement('p')
        displayQuotesPara.innerHTML=`Quote: ${quote.text} - Category: ${quote.category}`;
        quoteDisplay.appendChild(displayQuotesPara);
    }
}

window.onload=function(){
    loadQuotesLocalStorage();
}

function exportQuotesToJson() {
    const dataStr = JSON.stringify(quotes, null, 2); // Convert to JSON format
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Create a link and trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quotes.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    // saveQuotes();
    displayAllQuotes();
    populateCategories();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

function populateCategories(){
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';  // Clear the dropdown first

    const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];

    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    quoteDisplay.innerHTML = '';

    const filteredQuotes = selectedCategory === 'all'
        ? quotes
        : quotes.filter(quote => quote.category === selectedCategory);

    filteredQuotes.forEach(quote => {
        const quoteElement = document.createElement('p');
        quoteElement.textContent = `Quote: ${quote.text} - Category: ${quote.category}`;
        quoteDisplay.appendChild(quoteElement);
    });
}

document.getElementById('categoryFilter').addEventListener('change', filterQuotes);

// Simulate server interaction
function fetchServerData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { text: "New server quote 1", category: "Inspiration" },
                { text: "New server quote 2", category: "Motivation" }
            ]);
        }, 1000);
    });
}

function postToServer(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 1000);
    });
}

async function syncWithServer() {
    try {
        const serverQuotes = await fetchServerData();
        const serverQuoteTexts = new Set(serverQuotes.map(q => q.text));

        const mergedQuotes = [...serverQuotes, ...quotes.filter(q => !serverQuoteTexts.has(q.text))];

        quotes.length = 0;
        quotes.push(...mergedQuotes);
        localStorage.setItem('quotes', JSON.stringify(quotes));

        displayAllQuotes();
        alert('Data synced with server successfully!');
    } catch (error) {
        console.error('Error syncing with server:', error);
    }
}

const syncButton = document.createElement('button');
syncButton.id = 'syncWithServer';
syncButton.textContent = 'Sync with Server';
document.body.appendChild(syncButton);
document.getElementById('syncWithServer').addEventListener('click', syncWithServer);