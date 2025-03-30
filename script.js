// Wait for the DOM to be fully loaded before attaching event handlers
document.addEventListener('DOMContentLoaded', function() {
    // Initialize form controls
    const instanceDropdown = document.getElementById('instanceDropdown');
    const uinInput = document.getElementById('uinInput');
    const mrnInput = document.getElementById('mrnInput');
    
    // Tab functionality
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Handle sidebar icon clicks
    document.querySelectorAll('.sidebar-icon').forEach(icon => {
        icon.addEventListener('click', () => {
            // Special handling for settings icon
            if (icon.id === 'settings-icon') {
                alert('Settings panel would open here');
                return;
            }
            
            // Remove active class from all icons
            document.querySelectorAll('.sidebar-icon').forEach(i => {
                i.classList.remove('active');
            });
            
            // Add active class to clicked icon
            icon.classList.add('active');
            
            // In a real app, you would show/hide content here
            console.log(`Clicked on ${icon.id}`);
        });
    });
    
    // Handle instance dropdown change
    instanceDropdown.addEventListener('change', function() {
        if (this.value === 'review') {
            // If "Review" is selected, enable the input fields
            uinInput.disabled = false;
            mrnInput.disabled = false;
        } else {
            // Otherwise, disable the input fields
            uinInput.disabled = true;
            mrnInput.disabled = true;
            // Clear any values
            uinInput.value = '';
            mrnInput.value = '';
        }
    });
    
    // Tab click functionality
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Log tab click for debugging
            console.log('Tab clicked:', tab.getAttribute('data-tab'));
            
            // Remove active class from all tabs and tab contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to current tab
            tab.classList.add('active');
            
            // Show the corresponding content
            const tabContentId = tab.getAttribute('data-tab');
            const tabContent = document.getElementById(tabContentId);
            
            if (tabContent) {
                tabContent.classList.add('active');
            } else {
                console.error('Tab content not found:', tabContentId);
            }
        });
    });
    
    // Form field validation
    const formControls = document.querySelectorAll('.form-control');
    
    formControls.forEach(control => {
        control.addEventListener('blur', function() {
            if (this.value.trim() === '' && this.hasAttribute('required')) {
                this.style.borderColor = '#e53e3e';
            } else {
                this.style.borderColor = '';
            }
        });
    });
    
    // Handle form action buttons
    const actionButtons = document.querySelectorAll('.form-actions .btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('btn-secondary') && this.textContent === 'Back') {
                // Find current active tab
                const activeTab = document.querySelector('.tab.active');
                const tabs = Array.from(document.querySelectorAll('.tab'));
                const currentIndex = tabs.indexOf(activeTab);
                
                // If there's a previous tab, click it
                if (currentIndex > 0) {
                    tabs[currentIndex - 1].click();
                }
            } else if (this.classList.contains('btn-primary') && this.textContent.includes('Continue')) {
                // Find current active tab
                const activeTab = document.querySelector('.tab.active');
                const tabs = Array.from(document.querySelectorAll('.tab'));
                const currentIndex = tabs.indexOf(activeTab);
                
                // If there's a next tab, click it
                if (currentIndex < tabs.length - 1) {
                    tabs[currentIndex + 1].click();
                }
            } else if (this.textContent === 'Save Patient Record') {
                alert('Patient record would be saved here');
            }
        });
    });
});