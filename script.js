// Sample job data
const jobsData = [
    {
        id: 1,
        title: "Bank Probationary Officer",
        organization: "State Bank of India",
        category: "banking",
        location: "Pan India",
        salary: "₹40,000 - ₹60,000",
        vacancies: 2000,
        deadline: "2024-03-15",
        type: "Full Time",
        education: "Graduate",
        featured: true,
        new: true
    },
    {
        id: 2,
        title: "Indian Railway Assistant Loco Pilot",
        organization: "Indian Railways",
        category: "railway",
        location: "Multiple Zones",
        salary: "₹35,000 - ₹50,000",
        vacancies: 5000,
        deadline: "2024-03-20",
        type: "Full Time",
        education: "ITI/Diploma",
        featured: true,
        urgent: true
    },
    {
        id: 3,
        title: "Indian Army Soldier General Duty",
        organization: "Indian Army",
        category: "defence",
        location: "All India",
        salary: "₹30,000 - ₹45,000",
        vacancies: 8000,
        deadline: "2024-03-25",
        type: "Full Time",
        education: "10th Pass",
        featured: true,
        new: true
    },
    {
        id: 4,
        title: "Primary School Teacher",
        organization: "Education Department",
        category: "teaching",
        location: "State Wise",
        salary: "₹35,000 - ₹55,000",
        vacancies: 3000,
        deadline: "2024-04-01",
        type: "Full Time",
        education: "B.Ed/D.El.Ed",
        featured: true
    },
    {
        id: 5,
        title: "Police Constable",
        organization: "State Police Department",
        category: "police",
        location: "State Wise",
        salary: "₹25,000 - ₹40,000",
        vacancies: 4500,
        deadline: "2024-03-30",
        type: "Full Time",
        education: "12th Pass",
        featured: true,
        urgent: true
    },
    {
        id: 6,
        title: "Staff Nurse",
        organization: "AIIMS",
        category: "healthcare",
        location: "Delhi, Mumbai",
        salary: "₹40,000 - ₹60,000",
        vacancies: 1200,
        deadline: "2024-04-05",
        type: "Full Time",
        education: "B.Sc Nursing",
        featured: true,
        new: true
    },
    {
        id: 7,
        title: "Junior Engineer (Civil)",
        organization: "Public Works Department",
        category: "engineering",
        location: "Pan India",
        salary: "₹35,000 - ₹55,000",
        vacancies: 2500,
        deadline: "2024-04-10",
        type: "Full Time",
        education: "B.Tech/Diploma",
        featured: false
    },
    {
        id: 8,
        title: "Lower Division Clerk",
        organization: "Central Government",
        category: "clerk",
        location: "Multiple States",
        salary: "₹20,000 - ₹35,000",
        vacancies: 6000,
        deadline: "2024-03-28",
        type: "Full Time",
        education: "12th Pass",
        featured: false
    },
    {
        id: 9,
        title: "Bank Clerk",
        organization: "IBPS",
        category: "banking",
        location: "Pan India",
        salary: "₹25,000 - ₹40,000",
        vacancies: 3500,
        deadline: "2024-04-15",
        type: "Full Time",
        education: "Graduate",
        featured: false,
        new: true
    },
    {
        id: 10,
        title: "Assistant Station Master",
        organization: "Indian Railways",
        category: "railway",
        location: "All Zones",
        salary: "₹35,000 - ₹50,000",
        vacancies: 1800,
        deadline: "2024-04-20",
        type: "Full Time",
        education: "Graduate",
        featured: false
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedJobs();
    loadLatestJobs();
    initializeEventListeners();
});

// Initialize event listeners
function initializeEventListeners() {
    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Quick filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            filterByCategory(category);
        });
    });

    // Search on Enter key
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchJobs();
            }
        });
    }
}

// Load featured jobs
function loadFeaturedJobs() {
    const featuredJobsContainer = document.getElementById('featuredJobs');
    if (!featuredJobsContainer) return;

    const featuredJobs = jobsData.filter(job => job.featured);
    featuredJobsContainer.innerHTML = '';

    featuredJobs.forEach(job => {
        const jobCard = createJobCard(job);
        featuredJobsContainer.innerHTML += jobCard;
    });
}

// Load latest jobs
function loadLatestJobs() {
    const latestJobsContainer = document.getElementById('latestJobs');
    if (!latestJobsContainer) return;

    latestJobsContainer.innerHTML = '';

    jobsData.slice(0, 8).forEach(job => {
        const jobListItem = createJobListItem(job);
        latestJobsContainer.innerHTML += jobListItem;
    });
}

// Create job card HTML
function createJobCard(job) {
    const badgeClass = job.new ? 'badge-new' : job.urgent ? 'badge-urgent' : 'badge-new';
    const badgeText = job.new ? 'New' : job.urgent ? 'Urgent' : 'New';
    
    return `
        <div class="job-card" onclick="viewJobDetails(${job.id})">
            <div class="job-header">
                <div class="job-logo">
                    <i class="fas fa-building"></i>
                </div>
                <span class="job-badge ${badgeClass}">${badgeText}</span>
            </div>
            <h3 class="job-title">${job.title}</h3>
            <p class="job-organization">
                <i class="fas fa-landmark"></i>
                ${job.organization}
            </p>
            <div class="job-details">
                <span class="job-detail">
                    <i class="fas fa-map-marker-alt"></i>
                    ${job.location}
                </span>
                <span class="job-detail">
                    <i class="fas fa-rupee-sign"></i>
                    ${job.salary}
                </span>
                <span class="job-detail">
                    <i class="fas fa-users"></i>
                    ${job.vacancies} Vacancies
                </span>
            </div>
            <div class="job-footer">
                <span class="job-deadline">
                    <i class="far fa-calendar-alt"></i>
                    Apply by: ${formatDate(job.deadline)}
                </span>
                <button class="job-apply-btn" onclick="event.stopPropagation(); applyJob(${job.id})">
                    Apply Now
                </button>
            </div>
        </div>
    `;
}

// Create job list item HTML
function createJobListItem(job) {
    return `
        <div class="job-list-item" onclick="viewJobDetails(${job.id})">
            <div class="job-list-content">
                <h3 class="job-list-title">${job.title}</h3>
                <div class="job-list-meta">
                    <span><i class="fas fa-landmark"></i> ${job.organization}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                    <span><i class="fas fa-users"></i> ${job.vacancies} Vacancies</span>
                    <span><i class="far fa-calendar-alt"></i> ${formatDate(job.deadline)}</span>
                </div>
            </div>
            <div class="job-list-action">
                <button class="btn btn-primary" onclick="event.stopPropagation(); applyJob(${job.id})">
                    Apply
                </button>
            </div>
        </div>
    `;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Search jobs function
function searchJobs() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (!searchTerm) {
        alert('Please enter a search term');
        return;
    }

    const filteredJobs = jobsData.filter(job => {
        return job.title.toLowerCase().includes(searchTerm) ||
               job.organization.toLowerCase().includes(searchTerm) ||
               job.location.toLowerCase().includes(searchTerm) ||
               job.category.toLowerCase().includes(searchTerm);
    });

    displaySearchResults(filteredJobs, searchTerm);
}

// Filter by category
function filterByCategory(category) {
    const filteredJobs = jobsData.filter(job => 
        job.category.toLowerCase() === category.toLowerCase()
    );
    
    displaySearchResults(filteredJobs, category);
}

// Display search results
function displaySearchResults(jobs, searchTerm) {
    if (jobs.length === 0) {
        alert(`No jobs found for "${searchTerm}"`);
        return;
    }

    // Store results in sessionStorage
    sessionStorage.setItem('searchResults', JSON.stringify(jobs));
    sessionStorage.setItem('searchTerm', searchTerm);

    // Redirect to jobs page or display results
    alert(`Found ${jobs.length} job(s) for "${searchTerm}". In a full implementation, this would redirect to a results page.`);
}

// View job details
function viewJobDetails(jobId) {
    const job = jobsData.find(j => j.id === jobId);
    if (!job) return;

    // Store job details in sessionStorage
    sessionStorage.setItem('selectedJob', JSON.stringify(job));

    // In a full implementation, this would redirect to job details page
    alert(`Viewing details for: ${job.title}\n\nOrganization: ${job.organization}\nLocation: ${job.location}\nSalary: ${job.salary}\nVacancies: ${job.vacancies}\nEducation: ${job.education}\nDeadline: ${formatDate(job.deadline)}\n\nIn a full implementation, this would open a detailed job page.`);
}

// Apply for job
function applyJob(jobId) {
    const job = jobsData.find(j => j.id === jobId);
    if (!job) return;

    // Store job details in sessionStorage
    sessionStorage.setItem('applyingJob', JSON.stringify(job));

    // In a full implementation, this would redirect to application form
    alert(`Applying for: ${job.title}\n\nIn a full implementation, this would redirect to the application form.`);
}

// Subscribe to newsletter
function subscribeNewsletter(event) {
    event.preventDefault();
    
    const emailInput = document.getElementById('newsletterEmail');
    const email = emailInput.value.trim();

    if (!email) {
        alert('Please enter your email address');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // In a full implementation, this would send data to backend
    alert(`Thank you for subscribing!\n\nYou will receive job alerts at: ${email}`);
    emailInput.value = '';
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animation to elements
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.job-card, .category-card, .stat-card');
    elements.forEach(element => {
        if (isElementInViewport(element)) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for animation
window.addEventListener('load', function() {
    const elements = document.querySelectorAll('.job-card, .category-card, .stat-card');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        element.style.transitionDelay = `${index * 0.1}s`;
    });
    
    setTimeout(animateOnScroll, 100);
});

window.addEventListener('scroll', animateOnScroll);

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Refresh layout if needed
        console.log('Window resized');
    }, 250);
});

// Add loading state management
function showLoading() {
    // In a full implementation, show loading spinner
    console.log('Loading...');
}

function hideLoading() {
    // In a full implementation, hide loading spinner
    console.log('Loading complete');
}

// Export functions for use in other pages
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        jobsData,
        searchJobs,
        filterByCategory,
        viewJobDetails,
        applyJob
    };
}
