import { useMemo, useState } from 'react';

const places = [
  {
    name: 'Kennedy Space Center Visitor Complex',
    area: 'Merritt Island',
    category: 'Space & science',
    icon: '🚀',
    description: 'Meet the stories, people, and machines behind America’s journey into space.',
    query: 'Kennedy Space Center Visitor Complex Florida',
    tag: 'Out of this world',
  },
  {
    name: 'Brevard Zoo',
    area: 'Melbourne',
    category: 'Wildlife & nature',
    icon: '🦒',
    description: 'A family-friendly wildlife experience with shaded trails and animal encounters.',
    query: 'Brevard Zoo Melbourne Florida',
    tag: 'Family favorite',
  },
  {
    name: 'Enchanted Forest Sanctuary',
    area: 'Titusville',
    category: 'Wildlife & nature',
    icon: '🌿',
    description: 'Explore a quiet preserve with boardwalks through several native Florida habitats.',
    query: 'Enchanted Forest Sanctuary Titusville Florida',
    tag: 'Take it slow',
  },
  {
    name: 'Sebastian Inlet State Park',
    area: 'South Brevard',
    category: 'Coast & outdoors',
    icon: '🌊',
    description: 'Ocean views, fishing, and outdoor adventures at the southern edge of the county.',
    query: 'Sebastian Inlet State Park Florida',
    tag: 'Salt-air stop',
  },
  {
    name: 'The Skunk Ape Files',
    area: 'Somewhere in the swamp…',
    category: 'Mysteries',
    icon: '👣',
    description: 'A playful field note for curious explorers tracking Florida’s legendary swamp creature.',
    query: 'Florida Skunk Ape folklore',
    tag: 'Cryptid watch',
  },
  {
    name: 'Historic Cocoa Village',
    area: 'Cocoa',
    category: 'History & culture',
    icon: '🏛️',
    description: 'Stroll a historic riverfront district filled with independent shops and local character.',
    query: 'Historic Cocoa Village Florida',
    tag: 'Riverfront ramble',
  },
];

const categories = ['All places', ...new Set(places.map((place) => place.category))];

function mapUrl(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All places');
  const [search, setSearch] = useState('');

  const filteredPlaces = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return places.filter((place) => {
      const matchesCategory = activeCategory === 'All places' || place.category === activeCategory;
      const matchesSearch = !normalized || `${place.name} ${place.area} ${place.category} ${place.description}`.toLowerCase().includes(normalized);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Brevard Shadow Atlas home">
          <span className="brand-mark" aria-hidden="true">✦</span>
          <span>BREVARD <strong>SHADOW ATLAS</strong></span>
        </a>
        <a className="top-link" href="#explore">Explore the atlas <span aria-hidden="true">↓</span></a>
      </header>

      <section className="hero" id="home">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow"><span /> A FIELD GUIDE TO THE SPACE COAST</p>
          <h1>Find the wonder<br />in your own <em>backyard.</em></h1>
          <p className="hero-copy">From rocket launches to wild Florida legends, there’s always another story waiting just around the bend.</p>
          <a className="button button-light" href="#explore">Start exploring <span aria-hidden="true">↗</span></a>
        </div>
        <div className="hero-stamp" aria-hidden="true"><span>FLORIDA</span><strong>28° N</strong><span>FIELD NOTES · EST. 2025</span></div>
        <div className="hero-bottom"><span>BREVARD COUNTY, FLORIDA</span><span>27.96° N &nbsp; 80.66° W</span></div>
      </section>

      <section className="intro" id="explore">
        <div>
          <p className="eyebrow eyebrow-dark">THE ATLAS</p>
          <h2>Small detours.<br /><em>Big discoveries.</em></h2>
        </div>
        <p className="intro-copy">A starting point for getting outside, learning something new, and sharing a few local legends along the way. Pick a trail and see where the day takes you.</p>
      </section>

      <section className="directory" aria-label="Explore places">
        <div className="directory-header">
          <div>
            <p className="eyebrow eyebrow-dark">THE FIELD GUIDE</p>
            <h2>Choose your next <em>waypoint.</em></h2>
          </div>
          <label className="search-box">
            <span aria-hidden="true">⌕</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the atlas" aria-label="Search places" />
            {search && <button className="clear-search" onClick={() => setSearch('')} aria-label="Clear search">×</button>}
          </label>
        </div>

        <div className="filters" aria-label="Filter by category">
          {categories.map((category) => (
            <button key={category} className={`filter-chip ${activeCategory === category ? 'active' : ''}`} onClick={() => setActiveCategory(category)} aria-pressed={activeCategory === category}>
              {category}
            </button>
          ))}
        </div>

        <div className="place-grid">
          {filteredPlaces.map((place, index) => (
            <article className="place-card" key={place.name} style={{ '--delay': `${index * 55}ms` }}>
              <div className="card-topline"><span className="place-icon" aria-hidden="true">{place.icon}</span><span className="place-tag">{place.tag}</span></div>
              <p className="place-area">{place.area}</p>
              <h3>{place.name}</h3>
              <p className="place-description">{place.description}</p>
              <a className="card-link" href={mapUrl(place.query)} target="_blank" rel="noreferrer">View on map <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
        {filteredPlaces.length === 0 && <p className="empty-state">No waypoints found. Try another search or category.</p>}
        <p className="demo-note">These starter waypoints are examples. Check official sites for current hours, access, fees, and conditions before heading out.</p>
      </section>

      <section className="closing-note">
        <span className="closing-icon" aria-hidden="true">✦</span>
        <div><p className="eyebrow">YOUR NEXT STORY STARTS HERE</p><h2>Keep your eyes open.</h2><p>The best discoveries are sometimes the ones you weren’t looking for.</p></div>
        <a className="button button-dark" href="#explore">Back to the atlas <span aria-hidden="true">↑</span></a>
      </section>

      <footer><a className="brand footer-brand" href="#home"><span className="brand-mark" aria-hidden="true">✦</span><span>BREVARD <strong>SHADOW ATLAS</strong></span></a><span>MADE FOR CURIOUS EXPLORERS · FLORIDA</span></footer>
    </main>
  );
}
