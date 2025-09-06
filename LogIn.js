
        function togglePassword(inputId, toggleElement) {
            const input = document.getElementById(inputId);
            const icon = toggleElement.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        }
        
        function switchForm(formType) {
            const loginTab = document.getElementById('loginTab');
            const signupTab = document.getElementById('signupTab');
            const loginForm = document.getElementById('loginForm');
            const signupForm = document.getElementById('signupForm');
            const switchText = document.getElementById('switchText');
            const successMessage = document.getElementById('successMessage');
            
            if (formType === 'signup') {
                loginTab.classList.remove('active');
                signupTab.classList.add('active');
                loginForm.classList.remove('active');
                signupForm.classList.add('active');
                switchText.innerHTML = 'Already have an account? <span class="auth-link" onclick="switchForm(\'login\')">Sign in</span>';
                successMessage.style.display = 'none';
            } else {
                signupTab.classList.remove('active');
                loginTab.classList.add('active');
                signupForm.classList.remove('active');
                loginForm.classList.add('active');
                switchText.innerHTML = 'Don\'t have an account? <span class="auth-link" onclick="switchForm(\'signup\')">Sign up</span>';
            }
        }
        
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        function validatePassword(password) {
            return password.length >= 8;
        }
        
        function showError(inputId, message) {
            const formGroup = document.querySelector(`#${inputId}`).closest('.form-group');
            formGroup.classList.add('error');
            const errorElement = formGroup.querySelector('.form-error');
            errorElement.textContent = message;
        }
        
        function clearError(inputId) {
            const formGroup = document.querySelector(`#${inputId}`).closest('.form-group');
            formGroup.classList.remove('error');
        }
        
        // Login form validation
        document.getElementById('loginFormElement').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            let isValid = true;
            
            clearError('loginEmail');
            clearError('loginPassword');
            
            if (!validateEmail(email)) {
                showError('loginEmail', 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!password) {
                showError('loginPassword', 'Password is required');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate successful login
                alert('Login successful! Welcome back!');
                this.reset();
            }
        });
        
        // Signup form validation
        document.getElementById('signupFormElement').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            let isValid = true;
            
            clearError('signupName');
            clearError('signupEmail');
            clearError('signupPassword');
            clearError('confirmPassword');
            
            if (!name.trim()) {
                showError('signupName', 'Please enter your full name');
                isValid = false;
            }
            
            if (!validateEmail(email)) {
                showError('signupEmail', 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!validatePassword(password)) {
                showError('signupPassword', 'Password must be at least 8 characters');
                isValid = false;
            }
            
            if (password !== confirmPassword) {
                showError('confirmPassword', 'Passwords do not match');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate successful registration
                const successMessage = document.getElementById('successMessage');
                successMessage.style.display = 'block';
                successMessage.textContent = 'Account created successfully! You can now sign in.';
                
                // Switch to login form after successful registration
                setTimeout(() => {
                    switchForm('login');
                    this.reset();
                }, 2000);
            }
        });
        
        // Add event listeners for input validation
        document.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('input', function() {
                clearError(this.id);
            });
        });
        
        // Tab switching
        document.getElementById('loginTab').addEventListener('click', () => switchForm('login'));
        document.getElementById('signupTab').addEventListener('click', () => switchForm('signup'));
    