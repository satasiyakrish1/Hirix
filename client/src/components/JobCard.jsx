import { useNavigate } from 'react-router-dom'

const JobCard = ({ job }) => {
  const navigate = useNavigate()

  return (
    <div className='bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden'>
      <div className='p-6'>
        {/* Company Info */}
        <div className='flex items-center gap-4 mb-4'>
          <div className='w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden'>
            <img className='w-8 h-8 object-contain' src={job.companyId.image} alt={job.companyId.name} />
          </div>
          <div>
            <h3 className='font-semibold text-gray-900'>{job.companyId.name}</h3>
            <p className='text-sm text-gray-500'>{job.companyId.location}</p>
          </div>
        </div>

        {/* Job Title */}
        <h4 className='font-bold text-xl text-gray-900 mb-3 hover:text-purple-700 transition-colors cursor-pointer'
            onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }}>
          {job.title}
        </h4>

        {/* Job Tags */}
        <div className='flex flex-wrap gap-2 mb-4'>
          <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-50 text-purple-700'>
            {job.location}
          </span>
          <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700'>
            {job.level}
          </span>
          {job.category && (
            <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700'>
              {job.category}
            </span>
          )}
        </div>

        {/* Job Description */}
        <p className='text-gray-600 text-sm mb-6 line-clamp-3' 
           dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}>
        </p>

        {/* Action Buttons */}
        <div className='flex gap-3'>
          <button 
            onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }}
            className='flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors duration-200'
          >
            Apply Now
          </button>
          <button 
            onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }}
            className='flex-1 border border-gray-300 hover:border-purple-600 text-gray-700 hover:text-purple-700 px-4 py-2.5 rounded-lg font-medium transition-colors duration-200'
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}

export default JobCard