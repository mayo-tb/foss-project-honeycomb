class CustomHeader extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        header {
          background-color: #1f2937;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 0;
        }
        
        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 700;
          font-size: 1.5rem;
          color: #fff;
        }
        
        .logo-icon {
          color: #3B82F6;
        }
        
        .nav-links {
          display: flex;
          gap: 2rem;
        }
        
        .nav-link {
          color: #9CA3AF;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        
        .nav-link:hover, .nav-link.active {
          color: #3B82F6;
        }
        
        .auth-buttons {
          display: flex;
          gap: 1rem;
        }
        
        .btn {
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .btn-outline {
          background: transparent;
          border: 1px solid #3B82F6;
          color: #3B82F6;
        }
        
        .btn-outline:hover {
          background: #3B82F6;
          color: white;
        }
        
        .btn-primary {
          background: #3B82F6;
          border: 1px solid #3B82F6;
          color: white;
        }
        
        .btn-primary:hover {
          background: #2563EB;
          border-color: #2563EB;
        }
        
        .mobile-menu-button {
          display: none;
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
        }
        
        @media (max-width: 768px) {
          .nav-links, .auth-buttons {
            display: none;
          }
          
          .mobile-menu-button {
            display: block;
          }
        }
      </style>
      
      <header>
        <div class="container">
          <nav>
            <div class="logo">
              <span class="logo-icon">
                <i data-feather="truck"></i>
              </span>
              <span>CampusShuttle</span>
            </div>
            <div class="nav-links">
              <a href="/" class="nav-link active">Home</a>
              <a href="/routes.html" class="nav-link">Routes</a>
              <a href="/schedules.html" class="nav-link">Schedules</a>
              <a href="/about.html" class="nav-link">About</a>
            </div>
<div class="auth-buttons">
              <button class="btn btn-outline">
                <i data-feather="user"></i>
                Driver Login
              </button>
              <button class="btn btn-primary">
                <i data-feather="shield"></i>
                Admin
              </button>
            </div>
            
            <button class="mobile-menu-button">
              <i data-feather="menu"></i>
            </button>
          </nav>
        </div>
      </header>
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

customElements.define('custom-header', CustomHeader);