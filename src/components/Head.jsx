export default function Head() {
  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-icon">▽</span>
        <span className="logo-text">AUDTLIST</span>
      </div>

      <div className="search-container">
        <form action="https://www.youtube.com/results" method="get" target="_blank">
          <div className="search-box">
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>search</span>
            <input type="text" placeholder="search" name="search_query" />
          </div>
        </form>
      </div>

      <div className="auth-buttons">
        <button className="btn-signin">Sign in</button>
        <button className="btn-register">Register</button>
      </div>
    </nav>
  );
}
