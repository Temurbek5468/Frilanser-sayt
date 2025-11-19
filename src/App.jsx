import { useState } from 'react'
import './App.css'

const emptyProject = {
  name: '',
  description: '',
  link: '',
  stack: '',
}

function App() {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    website: '',
  })

  const [projects, setProjects] = useState([{ ...emptyProject }])
  const [skills, setSkills] = useState([])
  const [skillInput, setSkillInput] = useState('')

  const handlePersonalChange = (field, value) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleProjectChange = (index, field, value) => {
    setProjects((prev) =>
      prev.map((project, i) =>
        i === index ? { ...project, [field]: value } : project
      )
    )
  }

  const addProject = () => {
    setProjects((prev) => [...prev, { ...emptyProject }])
  }

  const removeProject = (index) => {
    setProjects((prev) => prev.filter((_, i) => i !== index))
  }

  const addSkill = () => {
    const trimmed = skillInput.trim()
    if (!trimmed || skills.includes(trimmed)) return
    setSkills((prev) => [...prev, trimmed])
    setSkillInput('')
  }

  const removeSkill = (skillToRemove) => {
    setSkills((prev) => prev.filter((skill) => skill !== skillToRemove))
  }

  const preferredName = personalInfo.fullName || 'Sizning Ismingiz'
  const preferredTitle = personalInfo.title || 'Mutaxassisligingiz'

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Frilanser Portfolio Generator</p>
          <h1>Qisqa forma orqali tayyor sahifa yarating</h1>
        </div>
        <p className="hero-hint">
          Chap panelda maʼlumotlarni toʻldiring, o‘ng tomonda esa portfolio
          qanday ko‘rinishini bir vaqtning o‘zida ko‘ring.
        </p>
      </header>

      <main className="layout">
        <section className="panel">
          <h2 className="panel-title">Maʼlumotlarni kiritish</h2>

          <div className="section">
            <h3>Shaxsiy maʼlumotlar</h3>
            <div className="form-grid">
              <label>
                Toʻliq ism
                <input
                  type="text"
                  value={personalInfo.fullName}
                  onChange={(event) =>
                    handlePersonalChange('fullName', event.target.value)
                  }
                  placeholder="Masalan, N. Temur"
                />
              </label>
              <label>
                Lavozim / yoʻnalish
                <input
                  type="text"
                  value={personalInfo.title}
                  onChange={(event) =>
                    handlePersonalChange('title', event.target.value)
                  }
                  placeholder="Frontend dasturchi"
                />
              </label>
              <label className="full-width">
                Qisqa bio
                <textarea
                  rows={3}
                  value={personalInfo.bio}
                  onChange={(event) =>
                    handlePersonalChange('bio', event.target.value)
                  }
                  placeholder="Taʼlim, tajriba va motivatsiya haqida 2-3 gap."
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={personalInfo.email}
                  onChange={(event) =>
                    handlePersonalChange('email', event.target.value)
                  }
                  placeholder="hello@email.com"
                />
              </label>
              <label>
                Telefon
                <input
                  type="tel"
                  value={personalInfo.phone}
                  onChange={(event) =>
                    handlePersonalChange('phone', event.target.value)
                  }
                  placeholder="+998 XX XXX XX XX"
                />
              </label>
              <label>
                Manzil
                <input
                  type="text"
                  value={personalInfo.location}
                  onChange={(event) =>
                    handlePersonalChange('location', event.target.value)
                  }
                  placeholder="Toshkent, Oʻzbekiston"
                />
              </label>
              <label>
                Portfolio / link
                <input
                  type="url"
                  value={personalInfo.website}
                  onChange={(event) =>
                    handlePersonalChange('website', event.target.value)
                  }
                  placeholder="https://namet.dev"
                />
              </label>
            </div>
          </div>

          <div className="section">
            <h3>Loyihalar</h3>
            <p className="section-hint">
              Har bir loyihaga nom, qisqacha izoh va texnologiyalarni kiriting.
            </p>
            <div className="stacked-list">
              {projects.map((project, index) => (
                <article key={`project-${index}`} className="project-form">
                  <div className="project-form__header">
                    <strong>Loyiha #{index + 1}</strong>
                    {projects.length > 1 && (
                      <button
                        type="button"
                        className="ghost"
                        onClick={() => removeProject(index)}
                      >
                        Oʻchirish
                      </button>
                    )}
                  </div>
                  <label>
                    Nomi
                    <input
                      type="text"
                      value={project.name}
                      onChange={(event) =>
                        handleProjectChange(index, 'name', event.target.value)
                      }
                      placeholder="Masalan, E-commerce dashboard"
                    />
                  </label>
                  <label>
                    Taʼrif
                    <textarea
                      rows={2}
                      value={project.description}
                      onChange={(event) =>
                        handleProjectChange(
                          index,
                          'description',
                          event.target.value
                        )
                      }
                      placeholder="Muammoni qanday hal qilganingiz haqida."
                    />
                  </label>
                  <label>
                    Texnologiyalar
                    <input
                      type="text"
                      value={project.stack}
                      onChange={(event) =>
                        handleProjectChange(index, 'stack', event.target.value)
                      }
                      placeholder="React, Node.js, PostgreSQL"
                    />
                  </label>
                  <label>
                    Havola
                    <input
                      type="url"
                      value={project.link}
                      onChange={(event) =>
                        handleProjectChange(index, 'link', event.target.value)
                      }
                      placeholder="https://project-link.com"
                    />
                  </label>
                </article>
              ))}
            </div>
            <button type="button" className="primary" onClick={addProject}>
              + Yangi loyiha
            </button>
          </div>

          <div className="section">
            <h3>Koʻnikmalar</h3>
            <div className="skills-input">
              <input
                type="text"
                value={skillInput}
                onChange={(event) => setSkillInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    addSkill()
                  }
                }}
                placeholder="React"
              />
              <button type="button" onClick={addSkill}>
                Qoʻshish
              </button>
            </div>
            <div className="pill-group">
              {skills.length === 0 && (
                <span className="placeholder">Hozircha qoʻshilmagan</span>
              )}
              {skills.map((skill) => (
                <span className="pill" key={skill}>
                  {skill}
                  <button
                    type="button"
                    aria-label={`${skill} ni o‘chirish`}
                    onClick={() => removeSkill(skill)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="panel preview-panel">
          <h2 className="panel-title">Portfolio natijasi</h2>
          <article className="portfolio-card">
            <header className="portfolio-header">
              <div>
                <h2>{preferredName}</h2>
                <p className="subtitle">{preferredTitle}</p>
              </div>
              <div className="contact-list">
                {personalInfo.email && <span>{personalInfo.email}</span>}
                {personalInfo.phone && <span>{personalInfo.phone}</span>}
                {personalInfo.location && <span>{personalInfo.location}</span>}
                {personalInfo.website && (
                  <a href={personalInfo.website} target="_blank">
                    {personalInfo.website.replace(/^https?:\/\//, '')}
                  </a>
                )}
              </div>
            </header>

            {personalInfo.bio && (
              <section>
                <h3>Men haqimda</h3>
                <p>{personalInfo.bio}</p>
              </section>
            )}

            {skills.length > 0 && (
              <section>
                <h3>Koʻnikmalar</h3>
                <div className="pill-group compact">
                  {skills.map((skill) => (
                    <span className="pill static" key={`preview-${skill}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h3>Tanlangan loyihalar</h3>
              {projects.filter((proj) => proj.name || proj.description).length ===
              0 ? (
                <p className="placeholder">
                  Loyiha maʼlumotlari kiritilishi bilan shu yerda paydo bo‘ladi.
                </p>
              ) : (
                <div className="project-grid">
                  {projects.map((project, index) => (
                    <article className="project-card" key={`preview-${index}`}>
                      <div className="project-card__header">
                        <h4>{project.name || `Loyiha #${index + 1}`}</h4>
                        {project.link && (
                          <a href={project.link} target="_blank" rel="noreferrer">
                            Ko‘rish →
                          </a>
                        )}
                      </div>
                      {project.description && <p>{project.description}</p>}
                      {project.stack && (
                        <p className="stack">{project.stack}</p>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </section>
          </article>
        </section>
      </main>
    </div>
  )
}

export default App
