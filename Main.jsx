const { useState, useEffect, useRef } = React;

const Preloader = () => {
    const [fade, setFade] = useState(false);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFade(true);
            setTimeout(() => setHidden(true), 500);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (hidden) return null;

    return (
        <div id="preloader" className={fade ? 'fade-out' : ''}>
            <div className="loader-content">
                <div className="logo glitch">Paradoxai77</div>
                <div className="loading-bar">
                    <div className="loading-progress"></div>
                </div>
                <div className="loading-text">INITIALIZING_SYSTEM... <span className="blink">_</span></div>
            </div>
        </div>
    );
};

const Header = () => (
    <header>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="logo glitch" onClick={() => window.location.href = 'index.html'}>Paradoxai77</div>
            <nav>
                <ul style={{ display: 'flex', listStyle: 'none', gap: '2rem' }}>
                    <li><a href="index.html" className="active">// home</a></li>
                    <li><a href="about.html">// about</a></li>
                    <li><a href="skills.html">// skills</a></li>
                    <li><a href="projects.html">// projects</a></li>
                    <li><a href="credentials.html">// credentials</a></li>
                    <li><a href="contact.html">// contact</a></li>
                </ul>
            </nav>
        </div>
    </header>
);

const Character = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const eyeLRef = useRef(null);
    const eyeRRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const getEyeStyle = (ref) => {
        if (!ref.current) return {};
        const rect = ref.current.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;
        const angle = Math.atan2(mousePos.y - eyeY, mousePos.x - eyeX);
        const distance = Math.min(rect.width / 4, Math.hypot(mousePos.x - eyeX, mousePos.y - eyeY) / 15);
        const moveX = Math.cos(angle) * distance;
        const moveY = Math.sin(angle) * distance;
        return {
            transform: `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`
        };
    };

    return (
        <div className="avatar-container">
            <div className="character-wrapper css-avatar">
                <div className="shoulders"></div>
                <div className="face">
                    <div className="cap"></div>
                    <div className="ears">
                        <div className="ear"></div>
                        <div className="ear"></div>
                    </div>
                    <div className="eyes-container">
                        <div className="eye" ref={eyeLRef}>
                            <div className="pupil" style={getEyeStyle(eyeLRef)}></div>
                        </div>
                        <div className="eye" ref={eyeRRef}>
                            <div className="pupil" style={getEyeStyle(eyeRRef)}></div>
                        </div>
                    </div>
                    <div className="nose"></div>
                    <div className="mouth">
                        <div className="teeth"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TypingHero = () => {
    const [text, setText] = useState("");
    const words = ["Web Developer.", "AI Explorer.", "Problem Solver.", "AR/VR Enthusiast."];
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [speed, setSpeed] = useState(150);

    useEffect(() => {
        const handleTyping = () => {
            const currentWord = words[wordIndex];
            const shouldDelete = isDeleting;
            
            setText(prev => shouldDelete 
                ? currentWord.substring(0, prev.length - 1)
                : currentWord.substring(0, prev.length + 1)
            );

            if (!shouldDelete && text === currentWord) {
                setTimeout(() => setIsDeleting(true), 2000);
                setSpeed(100);
            } else if (shouldDelete && text === "") {
                setIsDeleting(false);
                setWordIndex((prev) => (prev + 1) % words.length);
                setSpeed(150);
            }
        };

        const timer = setTimeout(handleTyping, speed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, speed, wordIndex]);

    return (
        <div className="hero-left">
            <div className="intro-group">
                <span className="greeting">Hello! I'm</span>
                <h1 className="hero-name glitch" data-text="PRATIK NERPAGAR">PRATIK<br/>NERPAGAR</h1>
            </div>
            <div className="social-sidebar">
                <a href="https://github.com/Paradoxai77" className="social-icon"><i className="fab fa-github"></i></a>
                <a href="https://linkedin.com" className="social-icon"><i className="fab fa-linkedin"></i></a>
                <a href="https://twitter.com" className="social-icon"><i className="fab fa-twitter"></i></a>
            </div>
            <div className="typing-text" style={{marginTop: '2rem'}}>
                {text}<span className="cursor"></span>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <React.Fragment>
            <Preloader />
            <Header />
            <main>
                <section id="home" className="hero-premium">
                    <div className="hero-container">
                        <TypingHero />
                        <div className="hero-center">
                            <Character />
                        </div>
                        <div className="hero-right">
                            <div className="role-group">
                                <p className="role-subtitle">A Full Stack</p>
                                <h2 className="role-title">ENGINEER<br/><span className="highlight">DEVELOPER</span></h2>
                            </div>
                            <div className="resume-link">
                                <a href="#" className="resume-btn">RESUME <i className="far fa-file-pdf"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="hero-glow"></div>
                </section>
            </main>
            <footer>
                <div className="container">
                    <p>// © 2025 Paradoxai77 · SYSTEM_STATUS: OPERATIONAL · BUILT_WITH_CARE</p>
                </div>
            </footer>
        </React.Fragment>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
