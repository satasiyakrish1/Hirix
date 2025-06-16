import Job from "../models/Job.js"
import JobApplication from "../models/JobApplication.js"
import User from "../models/User.js"
import { v2 as cloudinary } from "cloudinary"

// Get User Data
export const getUserData = async (req, res) => {
    try {
        const userId = req.auth.userId
        const sessionClaims = req.auth.sessionClaims || {}
        
        // Safely extract user data with fallbacks
        const firstName = sessionClaims.firstName || ''
        const lastName = sessionClaims.lastName || ''
        const emailAddresses = sessionClaims.emailAddresses || []
        const imageUrl = sessionClaims.imageUrl || ''

        let user = await User.findOne({ clerkId: userId })

        if (!user) {
            // Create new user if not exists
            user = await User.create({
                clerkId: userId,
                name: `${firstName} ${lastName}`.trim() || 'Anonymous User',
                email: emailAddresses[0]?.emailAddress || `${userId}@placeholder.com`,
                image: imageUrl || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
            })
        }

        res.json({ success: true, user })

    } catch (error) {
        console.error('Error in getUserData:', error)
        res.json({ success: false, message: error.message })
    }
}

// Apply For Job
export const applyForJob = async (req, res) => {
    const { jobId } = req.body
    const userId = req.auth.userId

    try {
        const user = await User.findOne({ clerkId: userId })
        if (!user) {
            return res.json({ success: false, message: 'User not found' })
        }

        const isAlreadyApplied = await JobApplication.find({ jobId, userId: user._id })

        if (isAlreadyApplied.length > 0) {
            return res.json({ success: false, message: 'Already Applied' })
        }

        const jobData = await Job.findById(jobId)

        if (!jobData) {
            return res.json({ success: false, message: 'Job Not Found' })
        }

        await JobApplication.create({
            companyId: jobData.companyId,
            userId: user._id,
            jobId,
            date: Date.now()
        })

        res.json({ success: true, message: 'Applied Successfully' })

    } catch (error) {
        console.error('Error in applyForJob:', error)
        res.json({ success: false, message: error.message })
    }
}

// Get User Applied Applications Data
export const getUserJobApplications = async (req, res) => {
    try {
        const userId = req.auth.userId
        const user = await User.findOne({ clerkId: userId })
        
        if (!user) {
            return res.json({ success: false, message: 'User not found' })
        }

        const applications = await JobApplication.find({ userId: user._id })
            .populate('companyId', 'name email image')
            .populate('jobId', 'title description location category level salary')
            .exec()

        if (!applications) {
            return res.json({ success: false, message: 'No job applications found for this user.' })
        }

        return res.json({ success: true, applications })

    } catch (error) {
        console.error('Error in getUserJobApplications:', error)
        res.json({ success: false, message: error.message })
    }
}

// Update User Resume
export const updateUserResume = async (req, res) => {
    try {
        const userId = req.auth.userId
        const user = await User.findOne({ clerkId: userId })
        
        if (!user) {
            return res.json({ success: false, message: 'User not found' })
        }

        const resumeFile = req.file

        if (resumeFile) {
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)
            user.resume = resumeUpload.secure_url
            await user.save()
        }

        return res.json({ success: true, message: 'Resume Updated' })

    } catch (error) {
        console.error('Error in updateUserResume:', error)
        res.json({ success: false, message: error.message })
    }
}