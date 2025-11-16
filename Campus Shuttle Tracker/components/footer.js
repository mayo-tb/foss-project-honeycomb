class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          margin-top: 4rem;
        }
        
        footer {
          background-color: #1f2937;
          border-top: 1px solid #374151;
          padding: 3rem 0 2rem;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }
        
        .footer-column h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #fff;
        }
        
        .footer-column ul {
          list-style: none;
          padding: 0;
        }
        
        .footer-column ul li {
          margin-bottom: 0.75rem;
        }
        
        .footer-column ul li a {
          color: #9CA3AF;
          text-decoration: none;
          transition: color 0.2s;
        }
        
        .footer-column ul li a:hover {
          color: #3B82F6;
        }
        
        .social-links {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #374151;
          color: #9CA3AF;
          transition: all 0.2s;
        }
        
        .social-link:hover {
          background: #3B82F6;
          color: white;
          transform: translateY(-3px);
        }
        
        .copyright {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid #374151;
          color: #9CA3AF;
          font-size: 0.875rem;
        }
        
        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
          }
        }
      </style>
      
      <footer>
        <div class="container">
          <div class="footer-content">
            <div class="footer-column">
              <h3>CampusShuttle</h3>
              <p class="text-gray-400">
                Real-time tracking system for university campus shuttles. Never miss your ride again!
              </p>
              <div class="social-links">
                <a href="#" class="social-link">
                  <i data-feather="twitter"></i>
                </a>
                <a href="#" class="social-link">
                  <i data-feather="facebook"></i>
                </a>
                <a href="#" class="social-link">
                  <i data-feather="instagram"></i>
                </a>
                <a href="#" class="social-link">
                  <i data-feather="github"></i>
                </a>
              </div>
            </div>
            
            <div class="footer-column">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="#">Live Tracking</a></li>
                <li><a href="#">Routes</a></li>
                <li><a href="#">Schedules</a></li>
                <li><a href="#">Notifications</a></li>
              </ul>
            </div>
            
            <div class="footer-column">
              <h3>Resources</h3>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">User Guides</a></li>
                <li><a href="#">API Documentation</a></li>
                <li><a href="#">System Status</a></li>
                <li><a href="#">Release Notes</a></li>
              </ul>
            </div>
            
            <div class="footer-column">
              <h3>Contact Us</h3>
              <ul>
                <li class="text-gray-400">University Transport Office</li>
                <li class="text-gray-400">Email: transport@university.edu</li>
                <li class="text-gray-400">Phone: +1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          
          <div class="copyright">
            &copy; 2023 CampusShuttle Tracker. All rights reserved.
          </div>
        </div>
      </footer>
    `;
    
    // Initialize feather icons
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js";
    script.onload = () => {
      if (typeof feather !== 'undefined') {
        feather.replace();
      }
    };
    this.shadowRoot.appendChild(script);
  }
}

customElements.define('custom-footer', CustomFooter);