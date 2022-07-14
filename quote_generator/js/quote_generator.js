//***************ELEMENTS****************//
const $quoteText 	= document.querySelector('#quote-text');
const $quoteAuthor 	= document.querySelector('#quote-author');

//***************VARIABLES***************//
let quote 			= '';
let author 			= '';
let text 			= '';
let firstTaskFlag	= false;

//************GETTING DATA****************//
fetch('https://api.goprogram.ai/inspiration', { method: 'GET' })
	.then(response => response.json())
	.then(response => {
		quote = response.quote;
		author = response.author;
		firstTaskFlag = false;
		typeText(quote, 'cursor-quote-type', $quoteText, 0);
	})
	.catch(err => console.error(err));

//********TYPING EFFECT FUNCTION*********//
function typeText(textToType, cursorClass, $textElement, iteration) {
	text = textToType.slice(0, iteration);
	$textElement.innerHTML = text + '<span class="' + cursorClass + '">|</span>';
	(iteration++ <= textToType.length) ? setTimeout(function () 
			{typeText(textToType, cursorClass, $textElement, iteration)}, 
				(10 + Math.floor(Math.random() * Math.floor(230)))) :
	 	 			newTypeTasks($textElement, text)
};

//****REMOVE CURSOR & ADD NEW TASKS****//
function newTypeTasks($textElement, text) {
	$textElement.innerHTML = text;
	if (!firstTaskFlag) {
		typeText(author, 'cursor-author-type', $quoteAuthor, 0);
		firstTaskFlag = true;
	}
};