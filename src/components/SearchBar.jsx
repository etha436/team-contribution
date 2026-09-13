import { Search, X } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder = 'Search players' }) {
  return (
    <div className="search-bar">
      <Search size={18} className="search-bar__icon" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
      {value && (
        <button className="search-bar__clear" onClick={() => onChange('')} aria-label="Clear search">
          <X size={16} />
        </button>
      )}
    </div>
  )
}
