
        // Sample job data
        const jobs = [
            {
                id: 1,
                title: "Frontend Developer",
                company: "TechCorp Inc.",
                type: "full-time",
                location: "San Francisco, CA",
                salary: "$80,000 - $120,000",
                posted: "2 days ago",
                description: "We're looking for a skilled Frontend Developer to join our dynamic team. You'll work on cutting-edge web applications using React, Vue.js, and modern JavaScript frameworks."
            },
            {
                id: 2,
                title: "UX/UI Designer",
                company: "Design Studio",
                type: "full-time",
                location: "New York, NY",
                salary: "$70,000 - $100,000",
                posted: "1 day ago",
                description: "Join our creative team as a UX/UI Designer. Create beautiful, user-friendly interfaces and exceptional user experiences for web and mobile applications."
            },
            {
                id: 3,
                title: "Marketing Intern",
                company: "StartupXYZ",
                type: "internship",
                location: "Remote",
                salary: "$15/hour",
                posted: "3 days ago",
                description: "Gain hands-on experience in digital marketing, social media management, and content creation. Perfect opportunity for students or recent graduates."
            },
            {
                id: 4,
                title: "Backend Developer",
                company: "CloudTech Solutions",
                type: "full-time",
                location: "Seattle, WA",
                salary: "$90,000 - $130,000",
                posted: "1 week ago",
                description: "Develop and maintain server-side applications using Node.js, Python, and cloud technologies. Experience with AWS/Azure preferred."
            },
            {
                id: 5,
                title: "Data Analyst",
                company: "Analytics Pro",
                type: "part-time",
                location: "Chicago, IL",
                salary: "$25/hour",
                posted: "4 days ago",
                description: "Analyze large datasets to provide business insights. Proficiency in SQL, Python, and data visualization tools required."
            },
            {
                id: 6,
                title: "Remote Content Writer",
                company: "ContentMasters",
                type: "remote",
                location: "Remote",
                salary: "$40,000 - $60,000",
                posted: "5 days ago",
                description: "Create engaging content for various digital platforms. Strong writing skills and SEO knowledge essential."
            }
        ];

        let currentJobs = jobs;

        // Display jobs
        function displayJobs(jobsToShow) {
            const jobsGrid = document.getElementById('jobsGrid');
            jobsGrid.innerHTML = '';

            jobsToShow.forEach(job => {
                const jobCard = `
                    <div class="job-card" data-type="${job.type}">
                        <div class="job-header">
                            <div>
                                <div class="job-title">${job.title}</div>
                                <div class="company-name">${job.company}</div>
                            </div>
                            <div class="job-type">${job.type.replace('-', ' ').toUpperCase()}</div>
                        </div>
                        <div class="job-details">
                            <div class="job-detail">
                                <i>📍</i> ${job.location}
                            </div>
                            <div class="job-detail">
                                <i>💰</i> ${job.salary}
                            </div>
                            <div class="job-detail">
                                <i>⏰</i> Posted ${job.posted}
                            </div>
                        </div>
                        <div class="job-description">
                            ${job.description}
                        </div>
                        <button class="apply-btn" onclick="openApplicationModal('${job.title}', '${job.company}')">
                            Apply Now
                        </button>
                    </div>
                `;
                jobsGrid.innerHTML += jobCard;
            });
        }

        // Filter jobs
        function filterJobs(type) {
            // Update active filter button
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');

            // Filter jobs
            if (type === 'all') {
                currentJobs = jobs;
            } else {
                currentJobs = jobs.filter(job => job.type === type);
            }
            
            displayJobs(currentJobs);
        }

        // Search jobs
        function searchJobs() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            if (searchTerm.trim() === '') {
                currentJobs = jobs;
            } else {
                currentJobs = jobs.filter(job => 
                    job.title.toLowerCase().includes(searchTerm) ||
                    job.company.toLowerCase().includes(searchTerm) ||
                    job.description.toLowerCase().includes(searchTerm) ||
                    job.location.toLowerCase().includes(searchTerm)
                );
            }
            displayJobs(currentJobs);
        }

        // Modal functionality
        const modal = document.getElementById('applicationModal');
        const closeBtn = document.querySelector('.close');

        function openApplicationModal(jobTitle, company) {
            document.getElementById('jobTitle').value = `${jobTitle} at ${company}`;
            document.getElementById('successMessage').style.display = 'none';
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        closeBtn.onclick = function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }

        // Form submission
        document.getElementById('applicationForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            setTimeout(() => {
                document.getElementById('successMessage').style.display = 'block';
                this.reset();
                document.getElementById('jobTitle').value = document.getElementById('jobTitle').value; // Keep job title
                
                // Close modal after 3 seconds
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 3000);
            }, 1000);
        });

        // File upload label update
        document.getElementById('resume').addEventListener('change', function() {
            const fileName = this.files[0]?.name || 'Choose Resume File (PDF, DOC, DOCX)';
            this.nextElementSibling.textContent = `📄 ${fileName}`;
        });

        // Mobile navigation
        document.querySelector('.hamburger').addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
        });

        // Search on Enter key
        document.getElementById('searchInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchJobs();
            }
        });

        // Smooth scrolling for navigation links
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

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            displayJobs(jobs);
        });