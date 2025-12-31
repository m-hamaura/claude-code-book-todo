export const TodoFilter = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { value: 'all', label: '🌈 All', gradient: 'from-pink-400 to-purple-400' },
    { value: 'active', label: '⚡ Active', gradient: 'from-yellow-400 to-orange-400' },
    { value: 'completed', label: '✅ Done', gradient: 'from-green-400 to-blue-400' }
  ]

  return (
    <div className="flex gap-3 mb-6 justify-center flex-wrap">
      {filters.map(filter => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-6 py-3 rounded-2xl font-bold text-lg transition-all duration-200 ${
            currentFilter === filter.value
              ? `bg-gradient-to-r ${filter.gradient} text-white shadow-xl scale-110`
              : 'bg-white/70 text-gray-600 hover:bg-white hover:scale-105 shadow-md'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
