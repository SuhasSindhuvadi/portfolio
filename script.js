document.addEventListener("DOMContentLoaded", () => {
	/* Progress Bar Effect */
	const navbar = document.querySelector(".navbar");
	const navbarOffsetTop = navbar.offsetTop;
	const sections = document.querySelectorAll("section");
	const navbarLinks = document.querySelectorAll(".navbar-link");
	const progress = document.querySelector(".progress-bars-wrapper");
	const progressBarPercents = [92, 85, 75, 70, 80, 60];
  
	const mainFn = () => {
	  if (window.pageYOffset >= navbarOffsetTop) {
		navbar.classList.add("sticky");
	  } else {
		navbar.classList.remove("sticky");
	  }
  
	  sections.forEach((section, i) => {
		if (window.pageYOffset >= section.offsetTop - 10) {
		  navbarLinks.forEach((navbarLink) => {
			navbarLink.classList.remove("change");
		  });
		  navbarLinks[i].classList.add("change");
		}
	  });
  
	  if (window.pageYOffset + window.innerHeight >= progress.offsetTop) {
		document.querySelectorAll(".progress-percent").forEach((el, i) => {
		  el.style.width = `${progressBarPercents[i]}%`;
		  el.previousElementSibling.firstElementChild.textContent =
			progressBarPercents[i];
		});
	  }
	};
  
	window.addEventListener("scroll", mainFn);
  
	window.addEventListener("resize", () => {
	  window.location.reload();
	});
  
	mainFn();
  
	/* Typing and Deleting Effect */
	const _CONTENT = [
	  "SOFTWARE ENGINEER",
	  "FULL-STACK DEVELOPER",
	];
  
	let _PART = 0; // Current sentence being processed
	let _PART_INDEX = 0; // Character number of the current sentence being processed 
	let _INTERVAL_VAL; // Holds the handle returned from setInterval
	const _ELEMENT = document.querySelector("#text-name"); // Element that holds the text
	const _CURSOR = document.querySelector("#cursor"); // Cursor element 
  
	// Implements typing effect
	function Type() {
	  // Get substring with 1 character added
	  const text = _CONTENT[_PART].substring(0, _PART_INDEX + 1);
	  _ELEMENT.innerHTML = text;
	  _PART_INDEX++;
  
	  // If full sentence has been displayed then start to delete the sentence after some time
	  if (text === _CONTENT[_PART]) {
		// Hide the cursor
		_CURSOR.style.display = 'none';
  
		clearInterval(_INTERVAL_VAL);
		setTimeout(() => {
		  _INTERVAL_VAL = setInterval(Delete, 50);
		}, 1000);
	  }
	}
  
	// Implements deleting effect
	function Delete() {
	  // Get substring with 1 character deleted
	  const text = _CONTENT[_PART].substring(0, _PART_INDEX - 1);
	  _ELEMENT.innerHTML = text;
	  _PART_INDEX--;
  
	  // If sentence has been deleted then start to display the next sentence
	  if (text === '') {
		clearInterval(_INTERVAL_VAL);
  
		// If current sentence was last then display the first one, else move to the next
		if (_PART === (_CONTENT.length - 1)) {
		  _PART = 0;
		} else {
		  _PART++;
		}
		_PART_INDEX = 0;
  
		// Start to display the next sentence after some time
		setTimeout(() => {
		  _CURSOR.style.display = 'inline-block';
		  _INTERVAL_VAL = setInterval(Type, 100);
		}, 200);
	  }
	}
  
	// Start the typing effect on load
	_INTERVAL_VAL = setInterval(Type, 100);
  });
  