document.addEventListener('DOMContentLoaded', () => {
	// 0. Preloader Logic
	const preloader = document.getElementById('preloader');
	if (preloader) {
		setTimeout(() => {
			preloader.classList.add('fade-out');
			setTimeout(() => {
				preloader.style.display = 'none';
			}, 500);
		}, 2000); // the loading bar takes 2s to complete
	}


	// 1. Typing Effect for Hero
	const words = ["Web Developer.", "Patent Holder.", "SOC Researcher.", "AI & AR/VR Explorer.", "Problem Solver."];
	let i = 0;
	let j = 0;
	let currentWord = "";
	let isDeleting = false;
	const typingElement = document.querySelector(".typing-text");

	function type() {
		currentWord = words[i];
		let textToShow = isDeleting ? currentWord.substring(0, j - 1) : currentWord.substring(0, j + 1);
		typingElement.innerHTML = textToShow + '<span class="cursor"></span>';
		
		if (isDeleting) {
			j--;
			if (j === 0) {
				isDeleting = false;
				i = (i + 1) % words.length;
			}
		} else {
			j++;
			if (j === currentWord.length) {
				isDeleting = true;
				setTimeout(type, 2000); // Pause at end of word
				return;
			}
		}
		const speed = isDeleting ? 50 : 150;
		setTimeout(type, speed);
	}

	if (typingElement) type();

	// 2. Simple Scroll Reveal (AOS-like)
	const observerOptions = {
		threshold: 0.1
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('aos-animate');
			}
		});
	}, observerOptions);

	document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

	// 3. Smooth Scrolling for internal Nav Links (only if href starts with #)
	document.querySelectorAll('nav a').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			const href = this.getAttribute('href');
			if (href.startsWith('#')) {
				e.preventDefault();
				const targetSector = document.querySelector(href);
				if (targetSector) {
					window.scrollTo({
						top: targetSector.offsetTop - 80,
						behavior: 'smooth'
					});
				}
			}
		});
	});

	// 4. Contact Form Interaction
	const form = document.getElementById('contactForm');
	if (form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			const btn = form.querySelector('button');
			const originalText = btn.textContent;
			btn.textContent = "DECRYPTING_REQUEST...";
			btn.disabled = true;

			const formData = {
				name: form.querySelector('input[name="name"]').value,
				email: form.querySelector('input[name="email"]').value,
				message: form.querySelector('textarea[name="message"]').value
			};

			fetch("https://formsubmit.co/ajax/pratiknerpagar2@gmail.com", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json"
				},
				body: JSON.stringify(formData)
			})
			.then(response => response.json())
			.then(data => {
				btn.textContent = "SUCCESS: MESSAGE_RELAYED";
				btn.style.background = "#27c93f";
				form.reset();
				setTimeout(() => {
					btn.textContent = originalText;
					btn.style.background = "";
					btn.disabled = false;
				}, 3000);
			})
			.catch(error => {
				console.error(error);
				btn.textContent = "ERROR: TRANSMISSION_FAILED";
				btn.style.background = "#ff3b30";
				setTimeout(() => {
					btn.textContent = originalText;
					btn.style.background = "";
					btn.disabled = false;
				}, 3000);
			});
		});
	}

	// 5. Active Nav Highlight on Scroll (for single-page internal section anchors)
	window.addEventListener('scroll', () => {
		let current = "";
		const sections = document.querySelectorAll('section');
		sections.forEach(section => {
			const sectionTop = section.offsetTop;
			if (window.pageYOffset >= sectionTop - 100) {
				current = section.getAttribute('id');
			}
		});

		if (current) {
			document.querySelectorAll('nav a').forEach(a => {
				const href = a.getAttribute('href');
				if (href && href.startsWith('#')) {
					a.classList.remove('active');
					if (href === `#${current}`) {
						a.classList.add('active');
					}
				}
			});
		}
	});

	// 5b. Mobile Menu Toggle Logic
	const navToggle = document.getElementById('navToggle');
	const navMenu = document.getElementById('navMenu');
	if (navToggle && navMenu) {
		navToggle.addEventListener('click', () => {
			navMenu.classList.toggle('nav-open');
		});

		// Close mobile menu when a nav link is clicked
		document.querySelectorAll('nav a').forEach(link => {
			link.addEventListener('click', () => {
				navMenu.classList.remove('nav-open');
			});
		});
	}

	// 6. Rotating Eyes Logic
	const eyes = document.querySelectorAll('.eye');
	
	window.addEventListener('mousemove', (e) => {
		eyes.forEach(eye => {
			const pupil = eye.querySelector('.pupil');
			const rect = eye.getBoundingClientRect();
			
			// Center of the eye
			const eyeX = rect.left + rect.width / 2;
			const eyeY = rect.top + rect.height / 2;
			
			// Angle between mouse and eye center
			const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
			
			// Max distance the pupil can move from center
			const distance = Math.min(rect.width / 4, Math.hypot(e.clientX - eyeX, e.clientY - eyeY) / 10);
			
			// Calculate pupil position
			const moveX = Math.cos(angle) * distance;
			const moveY = Math.sin(angle) * distance;
			
			pupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
		});
	});

	// 7. Hero Parallax
	const heroRef = document.querySelector('.hero-container');
	if (heroRef) {
		window.addEventListener('mousemove', (e) => {
			const { clientX, clientY } = e;
			const { innerWidth, innerHeight } = window;
			const xRotation = ((clientY - innerHeight / 2) / innerHeight) * 20;
			const yRotation = ((clientX - innerWidth / 2) / innerWidth) * -20;
			heroRef.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
		});
	}

	// 8. Certificate Modal Image Viewer
	const certModal = document.getElementById('certModal');
	const certModalImg = document.getElementById('certModalImg');
	const certImageBtns = document.querySelectorAll('.cert-image-btn');

	if (certModal && certModalImg) {
		certImageBtns.forEach(btn => {
			btn.addEventListener('click', () => {
				const imgPath = btn.getAttribute('data-img');
				if (imgPath) {
					certModalImg.src = imgPath;
					certModal.classList.add('active');
				}
			});
		});

		window.closeCertModal = function() {
			certModal.classList.remove('active');
			setTimeout(() => {
				certModalImg.src = "";
			}, 300);
		};

		// Close modal on background click
		certModal.addEventListener('click', (e) => {
			if (e.target === certModal) {
				closeCertModal();
			}
		});

		// Close modal on Escape key
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && certModal.classList.contains('active')) {
				closeCertModal();
			}
		});
	}

	// 9. Custom Glowing Magnetic Cursor Logic
	const cursorDot = document.createElement('div');
	cursorDot.className = 'custom-cursor';
	const cursorFollower = document.createElement('div');
	cursorFollower.className = 'cursor-follower';
	document.body.appendChild(cursorDot);
	document.body.appendChild(cursorFollower);

	let mouseX = 0, mouseY = 0;
	let followerX = 0, followerY = 0;

	document.addEventListener('mousemove', (e) => {
		mouseX = e.clientX;
		mouseY = e.clientY;
		cursorDot.style.left = `${mouseX}px`;
		cursorDot.style.top = `${mouseY}px`;
	});

	function animateCursor() {
		followerX += (mouseX - followerX) * 0.15;
		followerY += (mouseY - followerY) * 0.15;
		cursorFollower.style.left = `${followerX}px`;
		cursorFollower.style.top = `${followerY}px`;
		requestAnimationFrame(animateCursor);
	}
	animateCursor();

	// Add cursor hover effect to interactive elements
	const attachCursorHover = () => {
		const interactiveSelectors = 'a, button, input, textarea, .project-card, .skill-card, .achievement-card, .social-item, .cert-item, .accordion-header, .status-badge';
		document.querySelectorAll(interactiveSelectors).forEach(el => {
			el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
			el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
		});
	};
	attachCursorHover();

	// 10. Interactive Expandable Accordion Interactivity
	document.querySelectorAll('.accordion-header').forEach(header => {
		header.addEventListener('click', () => {
			const item = header.parentElement;
			const isActive = item.classList.contains('active');
			
			// Close other items in the same container
			const parentContainer = item.parentElement;
			if (parentContainer) {
				parentContainer.querySelectorAll('.accordion-item').forEach(child => child.classList.remove('active'));
			}
			
			if (!isActive) {
				item.classList.add('active');
			}
		});
	});

	// 11. Background Watermark Parallax Effect
	const watermarks = document.querySelectorAll('.watermark-bg');
	if (watermarks.length > 0) {
		window.addEventListener('scroll', () => {
			const scrolled = window.pageYOffset;
			watermarks.forEach(watermark => {
				const speed = 0.12;
				watermark.style.transform = `translateX(-50%) translateY(${scrolled * speed}px)`;
			});
		});
	}

	// 12. 3D Card Tilt Physics
	const tiltCards = document.querySelectorAll('.project-card, .skill-card, .achievement-card');
	tiltCards.forEach(card => {
		card.addEventListener('mousemove', (e) => {
			const rect = card.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			const centerX = rect.width / 2;
			const centerY = rect.height / 2;
			const rotateX = ((y - centerY) / centerY) * -10;
			const rotateY = ((x - centerX) / centerX) * 10;
			card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
		});

		card.addEventListener('mouseleave', () => {
			card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
		});
	});
});
