import { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Hero = () => {
    const { setSearchFilter, setIsSearched } = useContext(AppContext)
    const titleRef = useRef(null)
    const locationRef = useRef(null)

    const onSearch = () => {
        setSearchFilter({
            title: titleRef.current.value,
            location: locationRef.current.value
        })
        setIsSearched(true)
    }

    return (
        <div className='relative overflow-hidden'>
            {/* Background Elements */}
            <div className='absolute inset-0 bg-gradient-to-br from-purple-50 to-white -z-10'></div>
            <div className='absolute inset-0 bg-[url("/pattern.svg")] opacity-5 -z-10'></div>
            
            {/* Decorative Elements */}
            <div className='absolute top-0 left-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob'></div>
            <div className='absolute top-0 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000'></div>
            <div className='absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000'></div>

            <div className='container 2xl:px-20 mx-auto py-20 px-4'>
                <div className='max-w-6xl mx-auto'>
                    {/* Main Content */}
                    <div className='text-center mb-16'>
                        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight'>
                            Find Your Dream <span className='text-purple-700 relative'>
                                Job
                                <svg className='absolute -bottom-2 left-0 w-full' height="8" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 5.5C1 5.5 50.5 -2 199 5.5" stroke="#400D69" strokeWidth="3" strokeLinecap="round"/>
                                </svg>
                            </span> Today
                        </h1>
                        <p className='text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed'>
                            Discover thousands of job opportunities with all the information you need. Your next career move starts here.
                        </p>
                    </div>

                    {/* Search Section */}
                    <div className='bg-white rounded-2xl shadow-xl p-6 mb-12 max-w-4xl mx-auto'>
                        <div className='grid md:grid-cols-3 gap-4'>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <img className='h-5 w-5 text-gray-400' src={assets.search_icon} alt="Search" />
                                </div>
                                <input
                                    type="text"
                                    placeholder='Job title or keyword'
                                    className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none'
                                    ref={titleRef}
                                />
                            </div>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <img className='h-5 w-5 text-gray-400' src={assets.location_icon} alt="Location" />
                                </div>
                                <input
                                    type="text"
                                    placeholder='Location'
                                    className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none'
                                    ref={locationRef}
                                />
                            </div>
                            <button
                                onClick={onSearch}
                                className='bg-purple-700 hover:bg-purple-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]'
                            >
                                Search Jobs
                            </button>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-12'>
                        <div className='bg-white p-6 rounded-xl shadow-sm text-center'>
                            <h3 className='text-3xl font-bold text-purple-700 mb-2'>10K+</h3>
                            <p className='text-gray-600'>Active Jobs</p>
                        </div>
                        <div className='bg-white p-6 rounded-xl shadow-sm text-center'>
                            <h3 className='text-3xl font-bold text-purple-700 mb-2'>5K+</h3>
                            <p className='text-gray-600'>Companies</p>
                        </div>
                        <div className='bg-white p-6 rounded-xl shadow-sm text-center'>
                            <h3 className='text-3xl font-bold text-purple-700 mb-2'>15K+</h3>
                            <p className='text-gray-600'>Active Users</p>
                        </div>
                        <div className='bg-white p-6 rounded-xl shadow-sm text-center'>
                            <h3 className='text-3xl font-bold text-purple-700 mb-2'>8K+</h3>
                            <p className='text-gray-600'>Success Stories</p>
                        </div>
                    </div>

                    {/* Trusted By Section */}
                    <div className='bg-white rounded-xl shadow-sm p-8'>
                        <p className='text-center text-gray-500 mb-8'>Trusted by leading companies</p>
                        <div className='flex flex-wrap justify-center items-center gap-8 md:gap-16'>
                            <img className='h-8 opacity-60 hover:opacity-100 transition-opacity' src={assets.microsoft_logo} alt="Microsoft" />
                            <img className='h-8 opacity-60 hover:opacity-100 transition-opacity' src={assets.walmart_logo} alt="Walmart" />
                            <img className='h-8 opacity-60 hover:opacity-100 transition-opacity' src={assets.accenture_logo} alt="Accenture" />
                            <img className='h-8 opacity-60 hover:opacity-100 transition-opacity' src={assets.samsung_logo} alt="Samsung" />
                            <img className='h-8 opacity-60 hover:opacity-100 transition-opacity' src={assets.amazon_logo} alt="Amazon" />
                            <img className='h-8 opacity-60 hover:opacity-100 transition-opacity' src={assets.adobe_logo} alt="Adobe" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero