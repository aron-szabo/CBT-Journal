

//Global App Variables
//Store Cognitive Distortion Selections
let selections = new Array();
let distortions = ['All-or-Nothing Thinking','Overgeneralization','Mental Filters','Discounting the Positive','Jumping to Conclusions','Magnification','Emotional Reasoning','Should Statements','Labeling','Personalization and Blame'];
let explanations = {'All-or-Nothing Thinking':'We have to be perfect or we’re a complete and abject failure — there is no middle ground. A person with polarized thinking places people or situations in “either/or” categories, with no shades of gray or allowing for the complexity of most people and most situations. A person with black-and-white thinking sees things only in extremes.',
'Overgeneralization':'In this cognitive distortion, a person comes to a general conclusion based on a single incident or a single piece of evidence. If something bad happens just once, they expect it to happen over and over again. A person may see a single, unpleasant event as part of a never-ending pattern of defeat.',
'Mental Filters':'A mental filter is an opposite overgeneralization, but with the same negative outcome.﻿ Instead of taking one small event and generalizing it inappropriately, the mental filter takes one small event and focuses on it exclusively, filtering out anything else.',
'Discounting the Positive':'Discounting the positive is a cognitive distortion that involves ignoring or invalidating good things that have happened to you﻿.',
'Jumping to Conclusions':'There are two ways of jumping to conclusions: 1.) Mind reading, where you think someone is going to react in a particular way, or you believe someone is thinking things that they aren\'t 2.) Fortune telling, when you predict events will unfold in a particular way, often to avoid trying something difficult',
'Magnification':'Magnification is exaggerating the importance of shortcomings and problems while minimizing the importance of desirable qualities. A person addicted to pain medication might magnify the importance of eliminating all pain, and exaggerate how unbearable his or her pain is. ',
'Emotional Reasoning':' Emotional reasoning is a way of judging yourself or your circumstances based on your emotions. For instance, Jenna used emotional reasoning to conclude that she was a worthless person, which in turn lead to binge eating. ',
'Should Statements':'"Should" statements are self-defeating ways we talk to ourselves that emphasize unattainable standards. Then, when we fall short of our own ideas, we fail in our own eyes. ',
'Labeling':' Labeling is a cognitive distortion that involves making a judgment about yourself or someone else as a person, rather than seeing the behavior as something the person did that doesn\'t define them as an individual.Here\'s an example of how labeling can lead to addiction or relapse: Shannon labeled herself a bad person unable to fit into mainstream society. ',
'Personalization and Blame':'Personalization and blame is a cognitive distortion whereby you entirely blame yourself, or someone else, for a situation that in reality involved many factors and was out of your control.'};
let replacments = [];
let originalParagraph = '';
let highlight = false;

function toggleHighlight(){
	if(highlight === false){
		highlight = true;
		document.getElementById("mainInput").setAttribute("contentEditable", false);
		document.getElementById("selectSentence").innerText = "Back";
	}
	else{
		let con = confirm('If you go back you will have to re-highlight your selections');
		if(con == false){
		return;
		}else{
		$('.closeButton').click();
		highlight = false;
		document.getElementById("mainInput").setAttribute("contentEditable", true);
		document.getElementById("selectSentence").innerText = "Start Highlighting";
		};
	}
	
}

function emptySelections(){
selections = [];
$('#listOfSelections').empty();
}



function createDiv(){
	return document.createElement('div');
	
}

function createParagraphTag(text){
	let p = document.createElement('P');
	p.appendChild(document.createTextNode(text));
	return p;
}

function createTextInput(){
	let input = document.createElement('input');
	input.setAttribute('type','text');
	input.setAttribute('class','replacementInput')
	return input;		
}

function createNextButton(){
	let nextButton = document.createElement('Button');
	nextButton.setAttribute('type','button');
	nextButton.innerText = 'Next';
	return nextButton;
}

function createButton(innerText){
	let nextButton = document.createElement('Button');
	nextButton.setAttribute('type','button');
	nextButton.innerText = innerText;
	return nextButton;
}

function createDistortionDropDown(){
	let select = document.createElement('select');
	distortions.forEach(function(element){
	   let option = document.createElement('option');
	   option.setAttribute("value",element);
	   option.appendChild(document.createTextNode(element));
		select.appendChild(option);
	});
	
	return select;
}

function storeParagraph(){
	originalParagraph = $('#mainInput')[0].innerText;
};

function clearParagraph(){
	originalParagraph = '';
};


function createModals(){
	if(selections.length===0){
	alert("You have no highlighted any phrases or sentence to rewrite");
	return;
	}
		
	storeParagraph();
	$('#step1').hide();
	selections.forEach(function(element){
		//Make Div
		let div = createDiv();
		div.setAttribute('class','distortionDiv');
		
		let divRow1 = createDiv();
		divRow1.setAttribute('class','distortionRow1');
		//Create Highlighted Text
		let pTag = createParagraphTag(element);
		pTag.setAttribute('class','distortionPTag');
		divRow1.appendChild(pTag);
		//Add drop down for Distortion
		let selectContainer = createDiv();
		selectContainer.setAttribute('class','distortionSelectContainer');
		let select = createDistortionDropDown();
		select.setAttribute('class','distortionSelectTag');
		selectContainer.appendChild(select);
		divRow1.appendChild(selectContainer);
		
		let divRow2= createDiv();
		divRow2.setAttribute('class','distortionRow2');
		//Create Text Book For new Input
		let replacementText = createTextInput();
		let replacementTextContainer = createDiv();
		
		replacementTextContainer.setAttribute('class','replacementTextContainer');
		replacementTextContainer.appendChild(replacementText);
		divRow2.appendChild(replacementTextContainer);
		
		let descriptionP = createParagraphTag('We have to be perfect or we’re a complete and abject failure — there is no middle ground. A person with polarized thinking places people or situations in “either/or” categories, with no shades of gray or allowing for the complexity of most people and most situations. A person with black-and-white thinking sees things only in extremes.');
		descriptionP.setAttribute('class','descriptionP');
		divRow2.appendChild(descriptionP);
		//Append all to Divs
		div.appendChild(divRow1);
		div.appendChild(divRow2);
		document.getElementById('modalHolder').appendChild(div);
		//
	});
	
	let finishButtonDiv = createDiv();
	finishButtonDiv.setAttribute('class','finishButtonDiv');
	
	let backbutton = createButton('Back');
	backbutton.setAttribute('id','backButton');
	finishButtonDiv.appendChild(backbutton);
	
	let finishButton = createButton('Done');
	finishButton.setAttribute('id','finishButton');
	finishButtonDiv.appendChild(finishButton);
	
	document.getElementById('modalHolder').appendChild(finishButtonDiv);
	
	$('.distortionSelectTag').change(function() {
		$(this).closest('.distortionDiv').find('.descriptionP').text(explanations[$(this).children("option:selected").val()]);
	});
	
	$('#finishButton').click(function(){
		let replacementsArray = [];
		
		$('.replacementInput').each(function(elm){
			replacementsArray.push($('.replacementInput')[elm].value);
		});
		
		finishButtonFunction(replacementsArray);
	});
	
	$('#backButton').click(function(){
				
				
				$('#step1').show();
				$('#modalHolder').empty();
	});
	
}

function finishButtonFunction(inputArray){
	let newParagraph =  originalParagraph.slice(0);

	for(let i = 0; i<inputArray.length; i++){
			let newSentence = inputArray[i];
			let oldSentence = selections[i];
			newParagraph = newParagraph.replace(oldSentence,newSentence);
			
	}
				let finishedText=createDiv();
				finishedText.setAttribute('id','finishedText');
				finishedText.setAttribute('class','modal');
				
				document.getElementById('modalHolder').appendChild(finishedText);
				$('#finishedText').text(newParagraph);	
				let openModalButton = document.createElement('A')
				openModalButton.setAttribute('id','openModalButton');
				openModalButton.setAttribute('href','#finishedText');
				openModalButton.setAttribute('rel','modal:open');
				openModalButton.setAttribute('style','display:none;');
				document.getElementById('modalHolder').appendChild(openModalButton);
				highlightFinal(inputArray);
				$('#openModalButton').click();
			
}


document.querySelector('div[contenteditable="true"]').addEventListener("paste", function(e) {
	e.preventDefault();
	let text = e.clipboardData.getData("text/plain");
	document.execCommand("insertHTML", false, text);
});




//Does not work with parragpagh tags in the editable div?
function gText(e) {
	//Get Slection only from Main Div
	if(document.getSelection().anchorNode.parentElement.id.toString() === "mainInput"
	&& document.getSelection().toString().length >3 && highlight === true){
		
		let currentSelection = document.getSelection().toString().trim();
		//Push to an Array to store
		selections.push(currentSelection);

		//Get UL
		let ul = document.getElementById("listOfSelections")
		//Create Li Node
		let li = document.createElement("li");
		//Fill Text Node and Set Class
		li.appendChild(document.createTextNode(currentSelection));
		li.setAttribute("class", "selectionListItem");
		
		//Create a Close Button 
		let closeButton = document.createElement("img");
		closeButton.setAttribute("class","closeButton");
		closeButton.setAttribute("src","images/cancel.png");
		
		//Create a Click Event Listener on Close Button
		closeButton.addEventListener('click',function(){
			
			//Remove List Item
			li.remove();
			//Remove from Array
			selections.splice( selections.indexOf(currentSelection), 1 );
			//Update Highlights in Div
			highlightSelection();
			
		});
		
		//Final Appends and Updated Highlights
		li.appendChild(closeButton);
		ul.appendChild(li);
		//highlightSelection();
		$("#mainInput").highlight(currentSelection);
		//Automatically Clear Selection
		window.getSelection().removeAllRanges();
	}
}

document.onmouseup = gText;
	
//Not Sure what this did, from stackoverflow code? Seems Depreacted?
//if (!document.all) document.captureEvents(Event.MOUSEUP);


//Highlight what is in Selection Array
function highlightSelection(){
	$("#mainInput").unhighlight();

	 selections.forEach(function(element){
		$("#mainInput").highlight(element);    
	});
}

function highlightFinal(replacementSentences){

replacementSentences.forEach(function(element){
		$("#finishedText").highlight(element);    
	});
}


/*
* jQuery Highlight plugin
*
* Based on highlight v3 by Johann Burkard
* http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html
*
* Code a little bit refactored and cleaned (in my humble opinion).
* Most important changes:
*  - has an option to highlight only entire words (wordsOnly - false by default),
*  - has an option to be case sensitive (caseSensitive - false by default)
*  - highlight element tag and class names can be specified in options
*
* Usage:
*   // wrap every occurrance of text 'lorem' in content
*   // with <span class='highlight'> (default options)
*   $('#content').highlight('lorem');
*
*   // search for and highlight more terms at once
*   // so you can save some time on traversing DOM
*   $('#content').highlight(['lorem', 'ipsum']);
*   $('#content').highlight('lorem ipsum');
*
*   // search only for entire word 'lorem'
*   $('#content').highlight('lorem', { wordsOnly: true });
*
*   // don't ignore case during search of term 'lorem'
*   $('#content').highlight('lorem', { caseSensitive: true });
*
*   // wrap every occurrance of term 'ipsum' in content
*   // with <em class='important'>
*   $('#content').highlight('ipsum', { element: 'em', className: 'important' });
*
*   // remove default highlight
*   $('#content').unhighlight();
*
*   // remove custom highlight
*   $('#content').unhighlight({ element: 'em', className: 'important' });
*
*
* Copyright (c) 2009 Bartek Szopka
*
* Licensed under MIT license.
*
*/

//Annoying Bug is regex can't handle extra spaces...

jQuery.extend({
highlight: function (node, re, nodeName, className) {
	
	if (node.nodeType === 3) {
		let match = node.data.match(re);
	
		if (match) {
			let highlight = document.createElement(nodeName || 'span');
			highlight.className = className || 'highlight';
			let wordNode = node.splitText(match.index);
			wordNode.splitText(match[0].length);
			let wordClone = wordNode.cloneNode(true);
			highlight.appendChild(wordClone);
			wordNode.parentNode.replaceChild(highlight, wordNode);
			return 1; //skip added node in parent
		}
	} else if ((node.nodeType === 1 && node.childNodes) && // only element nodes that have children
			!/(script|style)/i.test(node.tagName) && // ignore script and style nodes
			!(node.tagName === nodeName.toUpperCase() && node.className === className)) { // skip if already highlighted
		for (let i = 0; i < node.childNodes.length; i++) {
			i += jQuery.highlight(node.childNodes[i], re, nodeName, className);
		}
	}
	return 0;
}
});

jQuery.fn.unhighlight = function (options) {
let settings = { className: 'highlight', element: 'span' };
jQuery.extend(settings, options);

return this.find(settings.element + "." + settings.className).each(function () {
	let parent = this.parentNode;
	parent.replaceChild(this.firstChild, this);
	parent.normalize();
}).end();
};

jQuery.fn.highlight = function (words, options) {
let settings = { className: 'highlight', element: 'span', caseSensitive: false, wordsOnly: false };
jQuery.extend(settings, options);

if (words.constructor === String) {
	words = [words];
}
words = jQuery.grep(words, function(word, i){
  return word != '';
});


//words = jQuery.map(words, function(word, i) {
  //return word.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
//});

if (words.length == 0) { return this; };

let flag = settings.caseSensitive ? "" : "i";
let pattern = "(" + words.join("|") + ")";
if (settings.wordsOnly) {
	pattern = "\\b" + pattern + "\\b";
}
let re = new RegExp(pattern);

return this.each(function () {
	jQuery.highlight(this, re, settings.element, settings.className);
});
};

