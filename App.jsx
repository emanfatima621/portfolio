import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUp, ArrowUpRight, Braces, BriefcaseBusiness,
  Check, ChevronDown, Code2, ExternalLink, Github, GraduationCap, Laptop, Linkedin, Mail,
  Menu, Moon, Send, Sparkles, Sun, X, Layers, Database, Terminal, Globe, Lightbulb, BookOpen
} from "lucide-react";
import SectionHeading from "./components/SectionHeading";
import { projects } from "./data/projects";
import { skillGroups, journey } from "./data/skills";
import { experience } from "./data/experience";
import { articles } from "./data/blog";

const email = "eman-fatima81101@gmail.com";
const linkedin = "https://www.linkedin.com/in/eman-fatima-77a395374";
const github = "https://github.com/emanfatima621";
const navItems = ["About", "Education", "Journey", "Projects", "Skills", "Experience", "Achievements", "Journal", "Testimonials", "Contact"];
const fade = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: .55 } } };

function Reveal({ children, className = "" }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} variants={fade} initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: .12 }}>{children}</motion.div>;
}
function Tag({ children }) { return <span className="tag">{children}</span>; }
function Section({ id, className = "", children }) { return <section id={id} className={`section-wrap ${className}`}>{children}</section>; }

function Navbar({ theme, setTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 18); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  const go = (id) => { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };
  return <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
    <div className="nav-inner">
      <button className="brand" onClick={() => go("home")} aria-label="Go to home"><span className="brand-mark">EF</span><span>Eman Fatima<span className="brand-dot">.</span></span></button>
      <nav className={`nav-links ${open ? "open" : ""}`} aria-label="Main navigation">
        {navItems.map(n => <button key={n} onClick={() => go(n)}>{n}</button>)}
      </nav>
      <div className="nav-actions">
        <button className="icon-btn theme-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle color theme">{theme === "dark" ? <Sun size={17}/> : <Moon size={17}/>}</button>
        <a className="nav-cta" href="#contact">Let's talk <ArrowUpRight size={15}/></a>
        <button className="icon-btn menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>{open ? <X/> : <Menu/>}</button>
      </div>
    </div>
  </header>;
}

function Hero() {
  const tech = ["HTML", "CSS", "JavaScript", "React", "Tailwind", "Python", "Flask", "MongoDB", "GitHub"];
  return <section id="home" className="hero section-wrap">
    <div className="hero-grid">
      <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: .12 } } }}>
        <motion.div variants={fade} className="availability"><span className="pulse-dot"/> Open to learning & opportunities</motion.div>
        <motion.p variants={fade} className="hero-kicker">HELLO, WORLD. I'M</motion.p>
        <motion.h1 variants={fade}>Eman <span>Fatima</span><i>.</i></motion.h1>
        <motion.h2 variants={fade}>Computer Science Student <b>|</b> <span>Aspiring Web Developer</span></motion.h2>
        <motion.p variants={fade} className="hero-copy">I design and build responsive, interactive and user-focused websites and web applications using modern web technologies.</motion.p>
        <motion.div variants={fade} className="hero-buttons">
          <a className="btn btn-primary" href="#projects">Explore my projects <ArrowUpRight size={17}/></a>
          <a className="btn btn-ghost" href="/Eman-Fatima-CV.pdf" download>Download CV <ArrowDown size={16}/></a>
        </motion.div>
        <motion.div variants={fade} className="hero-social"><a href={linkedin} target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn</a><a href={github} target="_blank" rel="noreferrer"><Github size={16}/> GitHub</a><a href={`mailto:${email}`}><Mail size={16}/> Email</a></motion.div>
      </motion.div>
      <motion.div className="hero-visual" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .25 }}>
        <div className="visual-orbit orbit-one"/><div className="visual-orbit orbit-two"/>
        <div className="code-window">
          <div className="window-top"><div className="window-dots"><i/><i/><i/></div><span>eman.dev / profile.js</span><span className="window-lock">●</span></div>
          <div className="code-content"><div className="code-line"><span className="line-no">01</span><span><em>const</em> developer <b>=</b> {"{"}</span></div>
            <div className="code-line indent"><span className="line-no">02</span><span>name: <strong>"Eman Fatima"</strong>,</span></div>
            <div className="code-line indent"><span className="line-no">03</span><span>role: <strong>"Web Developer"</strong>,</span></div>
            <div className="code-line indent"><span className="line-no">04</span><span>skills: [</span></div>
            <div className="code-line indent2"><span className="line-no">05</span><span><strong>"HTML"</strong>, <strong>"CSS"</strong>,</span></div>
            <div className="code-line indent2"><span className="line-no">06</span><strong>"JavaScript"</strong>, <strong>"React"</strong></div>
            <div className="code-line indent"><span className="line-no">07</span><span>],</span></div>
            <div className="code-line indent"><span className="line-no">08</span><span>passion: <strong>"Building for the Web"</strong></span></div>
            <div className="code-line"><span className="line-no">09</span><span>{"};"}</span></div>
            <div className="code-output"><span className="output-dot"/> Ready to build something meaningful<span className="cursor">▍</span></div>
          </div>
        </div>
        {tech.map((t, i) => <motion.span key={t} className={`float-tag float-${i}`} animate={{ y: [0, -7, 0] }} transition={{ duration: 3 + i * .24, repeat: Infinity, ease: "easeInOut" }}>{t}</motion.span>)}
      </motion.div>
    </div>
    <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={15}/></a>
  </section>;
}

function About() {
  const cards = [[Code2, "Frontend Developer", "Building responsive and interactive user interfaces."], [Layers, "Web Application Developer", "Creating functional applications with thoughtful user flows."], [Lightbulb, "Problem Solver", "Turning ideas and requirements into practical solutions."], [Sparkles, "Continuous Learner", "Improving through hands-on projects and modern technologies."]];
  const learning = ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Responsive Design", "APIs", "Python", "Flask", "MongoDB", "Git & GitHub"];
  return <Section id="about"><Reveal><SectionHeading eyebrow="A LITTLE ABOUT ME" title="Building ideas into experiences." text="I enjoy the space where thoughtful design meets practical engineering."/>
    <div className="about-layout"><div className="about-copy"><p>I am a Computer Science student passionate about Web Development and creating modern digital experiences. I enjoy turning ideas into responsive, functional and visually engaging websites. I am continuously improving my frontend and backend development skills by building real projects and learning modern technologies.</p><div className="interest-note"><span className="interest-icon"><Sparkles size={18}/></span><div><b>Also exploring</b><span>AI / Machine Learning as a secondary technical interest.</span></div></div></div>
      <div className="about-cards">{cards.map(([Icon, title, desc]) => <div className="about-card" key={title}><Icon size={21}/><h3>{title}</h3><p>{desc}</p></div>)}</div></div>
    <div className="learning-block"><div><span className="eyebrow">CURRENTLY LEARNING</span><h3>Always curious. Always building.</h3></div><div className="tag-cloud">{learning.map(x => <Tag key={x}>{x}</Tag>)}</div></div>
  </Reveal></Section>;
}

function Education() {
  const items = [["BS Computer Science", "KICSIT University", "Currently in progress"], ["F.Sc.", "Punjab College", "Add completion year"], ["Matriculation", "Allama Iqbal Model School & College", "Add completion year"]];
  return <Section id="education" className="surface-section"><Reveal><SectionHeading eyebrow="THE FOUNDATION" title="Education & certifications" text="The academic foundation behind my interest in technology and building useful products."/>
    <div className="education-grid"><div className="timeline">{items.map(([degree, place, date], i) => <div className="timeline-item" key={degree}><span className="timeline-dot"/><span className="timeline-date">{i === 0 ? "IN PROGRESS" : "ACADEMIC BACKGROUND"}</span><h3>{degree}</h3><p>{place}</p><small>{date}</small></div>)}</div>
      <div className="certificate-panel"><div className="panel-icon"><GraduationCap size={23}/></div><span className="eyebrow">CERTIFICATIONS</span><h3>Certificates & credentials</h3><p>Verified certificate details can be added here as they become available.</p><div className="placeholder-row"><span>Certificate title</span><Tag>Details to be added</Tag></div><div className="placeholder-row"><span>Organization · Year</span><span className="muted">Not provided</span></div></div></div>
  </Reveal></Section>;
}

function Journey() {
  const [active, setActive] = useState(0);
  return <Section id="journey"><Reveal><SectionHeading eyebrow="GROWING STEP BY STEP" title="My web development journey" text="A learning path from the foundations of the web toward building complete, connected applications."/>
    <div className="journey-layout"><div className="journey-list">{journey.map(([name], i) => <button key={name} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} className={`journey-step ${active === i ? "active" : ""}`}><span className="journey-number">{String(i + 1).padStart(2, "0")}</span><span>{name}</span><ArrowUpRight size={15}/></button>)}</div>
      <div className="journey-detail"><div className="detail-symbol"><Code2 size={28}/></div><span className="eyebrow">CURRENT LEARNING PATH · {String(active + 1).padStart(2, "0")}</span><h3>{journey[active][0]}</h3><p>{journey[active][1]}</p><div className="journey-progress"><span style={{ width: `${(active + 1) / journey.length * 100}%` }}/></div><small>{active + 1} of {journey.length} stages</small></div></div>
  </Reveal></Section>;
}

function ProjectArt({ project }) {
  const art = {
    food: <><div className="art-top"><span>freshly.</span><span>MENU　 ABOUT　 CART</span></div><div className="food-hero"><div><small>GOOD FOOD, GOOD MOOD</small><b>Made fresh.<br/>Made for you.</b><span className="art-button">Explore menu ↗</span></div><div className="food-orb">🥗</div></div><div className="food-cards"><i>🍔</i><i>🍕</i><i>🥑</i></div></>,
    bloom: <><div className="art-top"><span>✿ bloomify</span><span>Discover　 Explore</span></div><div className="bloom-center"><div className="flower-emoji">🌸</div><small>FLOWER IDENTIFICATION</small><b>Discover the beauty<br/>around you.</b><span className="upload-pill">＋ Upload a flower</span></div></>,
    hostel: <><div className="dash-head"><span>Hostel<span className="accent-text">Hub</span></span><span>Overview　 Rooms　 Students</span></div><div className="dash-body"><small>OVERVIEW / DASHBOARD</small><b>Good morning, Admin</b><div className="dash-stats"><i>🏠 <b>04</b><small>Hostels</small></i><i>🛏️ <b>128</b><small>Rooms</small></i><i>👥 <b>86</b><small>Students</small></i></div><div className="dash-chart"><span/><span/><span/><span/><span/><span/><span/></div></div></>,
    chat: <><div className="chat-head">✦ assistant <small>● online</small></div><div className="chat-bubbles"><span>Hi! How can I help you today?</span><b>I'd like to know more.</b><span>Of course — ask me anything.</span></div><div className="chat-input">Type a message...　➤</div></>,
    movie: <><div className="movie-head">CINEMA<span> PICKS</span></div><div className="movie-posters"><i>🎬</i><i>🌌</i><i>🕵️</i></div><div className="movie-caption">Find your next favourite.</div></>,
    library: <><div className="library-icon">▤</div><b>Library Manager</b><small>BOOK RECORDS · C LANGUAGE</small><div className="library-lines"><i/><i/><i/></div></>,
    game: <><div className="game-title">TIC TAC TOE <small>PLAYER VS AI</small></div><div className="game-board">{["X","","O","","X","","O","","X"].map((v,i)=><i key={i}>{v}</i>)}</div></>
  };
  return <div className={`project-art art-${project.tone}`} aria-label={`${project.title} interface preview`}>{art[project.tone]}</div>;
}

function Projects() {
  const filters = ["All", "Frontend", "Full Stack", "JavaScript", "React", "Python", "AI/Web"];
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const filtered = useMemo(() => projects.filter(p => filter === "All" || p.category.includes(filter) || p.stack.includes(filter)), [filter]);
  const shown = showAll ? filtered : filtered.slice(0, 6);
  return <Section id="projects" className="surface-section"><Reveal><SectionHeading eyebrow="SELECTED WORK" title="Featured web projects" text="A collection of websites and applications exploring frontend, backend, databases and modern web technologies."/>
    <div className="filter-row" role="group" aria-label="Filter projects">{filters.map(f => <button key={f} onClick={() => {setFilter(f); setShowAll(false);}} className={filter === f ? "selected" : ""}>{f}</button>)}</div>
    <motion.div layout className="project-grid">{shown.map((p, i) => <motion.article layout key={p.id} className={`project-card ${p.featured ? "featured-project" : ""}`} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.045}}>
      <div className="project-preview"><ProjectArt project={p}/><span className="preview-index">0{p.id}</span></div>
      <div className="project-info"><div className="project-meta"><span>{p.role}</span><span className="project-arrow"><ArrowUpRight size={17}/></span></div><h3>{p.title}</h3><p>{p.description}</p><div className="project-tags">{p.stack.map(t => <Tag key={t}>{t}</Tag>)}</div>
        <div className="project-actions"><button className="text-action" onClick={() => setSelected(p)}>Case study <ArrowUpRight size={15}/></button>{p.github ? <a href={p.github} target="_blank" rel="noreferrer" className="mini-link"><Github size={15}/> Code</a> : <span className="pending-link">GitHub link pending</span>}{p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="mini-link">Live demo <ExternalLink size={14}/></a>}</div>
      </div>
    </motion.article>)}</motion.div>
    {filtered.length > 6 && <button className="btn btn-ghost view-all" onClick={() => setShowAll(!showAll)}>{showAll ? "Show fewer" : "View all projects"} <ArrowRight size={16}/></button>}
  </Reveal>
  <AnimatePresence>{selected && <motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={e => {if(e.target === e.currentTarget) setSelected(null);}}><motion.div className="case-modal" role="dialog" aria-modal="true" aria-labelledby="case-title" initial={{opacity:0,y:25,scale:.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:20}}><button className="modal-close icon-btn" onClick={() => setSelected(null)} aria-label="Close case study"><X/></button><span className="eyebrow">PROJECT CASE STUDY</span><h2 id="case-title">{selected.title}</h2><p className="modal-lead">{selected.description}</p><div className="case-grid">{[["The challenge",selected.problem],["The approach",selected.solution],["My role",selected.role],["Development process",selected.process],["Key features",selected.features.join(" · ")],["Outcome",selected.outcome]].map(([a,b])=><div key={a}><span>{a}</span><p>{b}</p></div>)}</div><div className="project-tags">{selected.stack.map(t=><Tag key={t}>{t}</Tag>)}</div><p className="modal-note">Add verified screenshots, repository and live-demo URLs before publishing this case study.</p></motion.div></motion.div>}</AnimatePresence>
  </Section>;
}

function Skills() {
  const icons = [Code2, Terminal, Database, Laptop];
  return <Section id="skills"><Reveal><SectionHeading eyebrow="TOOLS OF THE TRADE" title="My tech stack" text="A growing toolkit centred on frontend development, with the backend foundations to bring web ideas to life."/>
    <div className="skill-groups">{skillGroups.map((g, idx) => <div className={`skill-group ${g.featured ? "skill-featured" : ""}`} key={g.title}><div className="skill-group-head"><span className="skill-group-icon">{(()=>{const I=icons[idx];return <I size={19}/>})()}</span><div><span className="eyebrow">0{idx+1} / TOOLKIT</span><h3>{g.title}</h3></div></div><div className="skill-items">{g.items.map(([name,desc])=><div className="skill-item" key={name}><span className="skill-check"><Check size={13}/></span><div><b>{name}</b><small>{desc}</small></div><ArrowUpRight size={14}/></div>)}</div></div>)}</div>
  </Reveal></Section>;
}

function Experience() {
  const [expanded, setExpanded] = useState(0);
  return <Section id="experience" className="surface-section"><Reveal><SectionHeading eyebrow="PROFESSIONAL GROWTH" title="Experience" text="Additional exposure to AI and technology alongside my main focus on web development."/>
    <div className="experience-list">{experience.map((e,i)=><div className={`experience-card ${expanded===i?"expanded":""}`} key={e.company}><button className="experience-toggle" onClick={()=>setExpanded(expanded===i?-1:i)} aria-expanded={expanded===i}><span className="experience-mark">{e.company.slice(0,1)}</span><span className="experience-main"><b>{e.company}</b><small>{e.role} · {e.type}</small></span><span className="experience-date">{e.duration}</span><ChevronDown size={18}/></button><AnimatePresence>{expanded===i&&<motion.div className="experience-details" initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}><p>{e.note}</p></motion.div>}</AnimatePresence></div>)}</div>
  </Reveal></Section>;
}

function Achievements() {
  const items = [[BriefcaseBusiness,"Internships","Add verified details"],[GraduationCap,"Certifications","Add certificate titles and issuers"],[Sparkles,"Academic achievements","Add confirmed awards or milestones"],[Code2,"Project milestones","Add completed and verifiable outcomes"]];
  return <Section id="achievements"><Reveal><SectionHeading eyebrow="MILESTONES" title="Achievements & milestones" text="A space for meaningful progress and accomplishments — only verified details will be published."/><div className="achievement-grid">{items.map(([I,t,d])=><div className="achievement-card" key={t}><I size={21}/><h3>{t}</h3><p>{d}</p><span>Details to be added</span></div>)}</div></Reveal></Section>;
}

function Journal() {
  return <Section id="journal" className="surface-section"><Reveal><SectionHeading eyebrow="NOTES FROM THE BUILD" title="Web development journal" text="What I'm learning, building and discovering as I grow as a Web Developer."/><div className="journal-grid">{articles.map((a,i)=><article className="journal-card" key={a.title}><div className="journal-top"><span>0{i+1}</span><BookOpen size={18}/></div><Tag>{a.category}</Tag><h3>{a.title}</h3><div className="journal-bottom"><span>{a.status}</span><ArrowUpRight size={17}/></div></article>)}</div></Reveal></Section>;
}

function Testimonials() {
  return <Section id="testimonials"><Reveal><div className="testimonial-box"><span className="eyebrow">KIND WORDS</span><div className="quote-mark">“</div><h2>Good work is built together.</h2><p>Testimonials will be added as I continue collaborating on web projects, internships and professional opportunities.</p><span className="testimonial-line"/></div></Reveal></Section>;
}

function Contact() {
  const [form,setForm] = useState({name:"",email:"",subject:"",message:""});
  const [error,setError] = useState("");
  const [sent,setSent] = useState(false);
  const [loading,setLoading] = useState(false);
  const update = e => setForm({...form,[e.target.name]:e.target.value});
  const submit = e => {
    e.preventDefault(); setError(""); setSent(false);
    if(!form.name.trim()||!form.email.trim()||!form.subject.trim()||!form.message.trim()){setError("Please complete every field.");return;}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)){setError("Please enter a valid email address.");return;}
    setLoading(true);
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    const href = `mailto:${email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setTimeout(()=>{setLoading(false);setSent(true);},350);
  };
  return <Section id="contact" className="contact-section"><Reveal><div className="contact-heading"><div><span className="eyebrow">HAVE A PROJECT IN MIND?</span><h2>Let's build something <span>together.</span></h2><p>I'm always interested in learning, building new projects and connecting with people in the technology and web-development community.</p></div><div className="contact-orb"><Send size={34}/></div></div>
    <div className="contact-layout"><div className="contact-details"><a href={`mailto:${email}`}><span><Mail size={18}/></span><div><small>EMAIL</small><b>{email}</b></div><ArrowUpRight size={16}/></a><a href={linkedin} target="_blank" rel="noreferrer"><span><Linkedin size={18}/></span><div><small>LINKEDIN</small><b>Connect professionally</b></div><ArrowUpRight size={16}/></a><a href={github} target="_blank" rel="noreferrer"><span><Github size={18}/></span><div><small>GITHUB</small><b>Explore my code</b></div><ArrowUpRight size={16}/></a></div>
      <form className="contact-form" onSubmit={submit} noValidate><div className="form-row"><label>Your name<input name="name" value={form.name} onChange={update} placeholder="Jane Smith"/></label><label>Email address<input name="email" type="email" value={form.email} onChange={update} placeholder="jane@example.com"/></label></div><label>Subject<input name="subject" value={form.subject} onChange={update} placeholder="Let's work together"/></label><label>Message<textarea name="message" value={form.message} onChange={update} rows="4" placeholder="Tell me a little about your idea..."/></label>{error&&<p className="form-error" role="alert">{error}</p>}{sent&&<p className="form-success" role="status">Your email app should open with the message ready to send. This site does not send messages through a backend.</p>}<button className="btn btn-primary" type="submit" disabled={loading}>{loading?"Preparing...":"Send message"} <ArrowUpRight size={16}/></button><small className="form-note">Frontend-only form · opens your default email application</small></form>
    </div>
  </Reveal></Section>;
}

function Footer() {
  const links = ["Home","About","Projects","Skills","Experience","Contact"];
  return <footer className="footer"><div className="footer-main"><div><a className="brand" href="#home"><span className="brand-mark">EF</span><span>Eman Fatima<span className="brand-dot">.</span></span></a><p>Computer Science Student<br/>Aspiring Web Developer</p></div><div className="footer-links">{links.map(x=><a key={x} href={`#${x.toLowerCase()}`}>{x}</a>)}</div><div className="footer-social"><a href={github} aria-label="GitHub" target="_blank" rel="noreferrer"><Github/></a><a href={linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin/></a><a href={`mailto:${email}`} aria-label="Email"><Mail/></a></div></div><div className="footer-bottom"><span>© 2026 Eman Fatima. All rights reserved.</span><a href="#home">Back to top ↑</a></div></footer>;
}

export default function App() {
  const [theme,setTheme] = useState(()=>localStorage.getItem("eman-theme")||"dark");
  const [progress,setProgress] = useState(0);
  const [top,setTop] = useState(false);
  useEffect(()=>{document.documentElement.dataset.theme=theme;localStorage.setItem("eman-theme",theme);},[theme]);
  useEffect(()=>{const fn=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;setProgress(max>0?window.scrollY/max*100:0);setTop(window.scrollY>550);};window.addEventListener("scroll",fn,{passive:true});fn();return()=>window.removeEventListener("scroll",fn);},[]);
  return <div className="app-shell"><div className="scroll-progress" style={{width:`${progress}%`}}/><Navbar theme={theme} setTheme={setTheme}/><main><Hero/><About/><Education/><Journey/><Projects/><Skills/><Experience/><Achievements/><Journal/><Testimonials/><Contact/></main><Footer/>{top&&<button className="back-top" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} aria-label="Back to top"><ArrowUp size={18}/></button>}</div>;
}
