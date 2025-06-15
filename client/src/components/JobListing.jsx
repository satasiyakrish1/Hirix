import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets'
import JobCard from './JobCard'

const JobListing = () => {
    const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext)
    const [showFilter, setShowFilter] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedLocations, setSelectedLocations] = useState([])
    const [filteredJobs, setFilteredJobs] = useState(jobs)

    const handleCategoryChange = (category) => {
        setSelectedCategories(
            prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        )
    }

    const handleLocationChange = (location) => {
        setSelectedLocations(
            prev => prev.includes(location) ? prev.filter(c => c !== location) : [...prev, location]
        )
    }

    useEffect(() => {
        const matchesCategory = job => selectedCategories.length === 0 || selectedCategories.includes(job.category)
        const matchesLocation = job => selectedLocations.length === 0 || selectedLocations.includes(job.location)
        const matchesTitle = job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
        const matchesSearchLocation = job => searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())

        const newFilteredJobs = jobs.slice().reverse().filter(
            job => matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job)
        )

        setFilteredJobs(newFilteredJobs)
        setCurrentPage(1)
    }, [jobs, selectedCategories, selectedLocations, searchFilter])

    return (
        <div className='container 2xl:px-20 mx-auto py-16 px-4'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex flex-col lg:flex-row gap-8'>
            {/* Sidebar */}
                    <div className='w-full lg:w-1/4'>
                        <div className='bg-white rounded-xl shadow-sm p-6 sticky top-24'>
                            {/* Search Filter from Hero Component */}
                            {isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
                                <div className='mb-6'>
                                    <h3 className='font-semibold text-lg mb-4 text-gray-800'>Current Search</h3>
                                    <div className='flex flex-wrap gap-2'>
                                {searchFilter.title && (
                                            <span className='inline-flex items-center gap-2 bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1.5 rounded-full text-sm'>
                                        {searchFilter.title}
                                                <button 
                                                    onClick={() => setSearchFilter(prev => ({ ...prev, title: "" }))}
                                                    className='hover:bg-purple-100 rounded-full p-0.5 transition-colors'
                                                >
                                                    <img className='w-4 h-4' src={assets.cross_icon} alt="Remove" />
                                                </button>
                                    </span>
                                )}
                                {searchFilter.location && (
                                            <span className='inline-flex items-center gap-2 bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1.5 rounded-full text-sm'>
                                        {searchFilter.location}
                                                <button 
                                                    onClick={() => setSearchFilter(prev => ({ ...prev, location: "" }))}
                                                    className='hover:bg-purple-100 rounded-full p-0.5 transition-colors'
                                                >
                                                    <img className='w-4 h-4' src={assets.cross_icon} alt="Remove" />
                                                </button>
                                    </span>
                                )}
                            </div>
                                </div>
                            )}

                            {/* Mobile Filter Toggle */}
                            <button 
                                onClick={() => setShowFilter(prev => !prev)} 
                                className='lg:hidden w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors mb-4'
                            >
                                <span>{showFilter ? "Hide Filters" : "Show Filters"}</span>
                                <svg className={`w-5 h-5 transition-transform ${showFilter ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                </button>

                {/* Category Filter */}
                            <div className={`${showFilter ? 'block' : 'hidden lg:block'}`}>
                                <h4 className='font-semibold text-lg text-gray-800 mb-4'>Categories</h4>
                                <div className='space-y-3'>
                                    {JobCategories.map((category, index) => (
                                        <label key={index} className='flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors'>
                                    <input
                                        type="checkbox"
                                                className='w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500'
                                        onChange={() => handleCategoryChange(category)}
                                        checked={selectedCategories.includes(category)}
                                    />
                                            <span className='text-gray-600'>{category}</span>
                                        </label>
                                    ))}
                                </div>
                </div>

                {/* Location Filter */}
                            <div className={`${showFilter ? 'block' : 'hidden lg:block'} mt-8`}>
                                <h4 className='font-semibold text-lg text-gray-800 mb-4'>Locations</h4>
                                <div className='space-y-3'>
                                    {JobLocations.map((location, index) => (
                                        <label key={index} className='flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors'>
                                    <input
                                        type="checkbox"
                                                className='w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500'
                                        onChange={() => handleLocationChange(location)}
                                        checked={selectedLocations.includes(location)}
                                    />
                                            <span className='text-gray-600'>{location}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                </div>
            </div>

            {/* Job listings */}
                    <section className='w-full lg:w-3/4'>
                        <div className='bg-white rounded-xl shadow-sm p-6 mb-6'>
                            <h3 className='text-2xl font-bold text-gray-800 mb-2'>Latest Jobs</h3>
                            <p className='text-gray-600'>Find your perfect match from top companies</p>
                        </div>

                        {filteredJobs.length > 0 ? (
                            <>
                                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                    {filteredJobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (
                        <JobCard key={index} job={job} />
                    ))}
                </div>

                                {/* Pagination */}
                                <div className='flex items-center justify-center gap-2 mt-10'>
                                    <button
                                        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                                        disabled={currentPage === 1}
                                        className='p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                                    >
                                        <img src={assets.left_arrow_icon} alt="Previous" />
                                    </button>
                                    
                        {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentPage(index + 1)}
                                            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                                                currentPage === index + 1
                                                    ? 'bg-purple-600 text-white'
                                                    : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                                            }`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 6)))}
                                        disabled={currentPage === Math.ceil(filteredJobs.length / 6)}
                                        className='p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                                    >
                                        <img src={assets.right_arrow_icon} alt="Next" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className='bg-white rounded-xl shadow-sm p-8 text-center'>
                                <div className='text-gray-500 mb-4'>No jobs found matching your criteria</div>
                                <button
                                    onClick={() => {
                                        setSelectedCategories([])
                                        setSelectedLocations([])
                                        setSearchFilter({ title: "", location: "" })
                                    }}
                                    className='text-purple-600 hover:text-purple-700 font-medium'
                                >
                                    Clear all filters
                                </button>
                    </div>
                )}
            </section>
                </div>
            </div>
        </div>
    )
}

export default JobListing