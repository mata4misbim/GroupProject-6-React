import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronRight, MessageCircle, BookOpen, Music, Users } from "lucide-react";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const helpCategories = [
    {
      id: "artists-labels",
      title: "Artists & Labels",
      description: "Information for musicians and labels",
      icon: Music,
      articles: [
        { title: "Getting started as an artist", slug: "getting-started-artist" },
        { title: "How to upload your music", slug: "upload-music" },
        { title: "Setting up your artist profile", slug: "artist-profile" },
        { title: "Understanding royalties and payments", slug: "royalties" },
        { title: "Promoting your music on Audtlist", slug: "promote-music" },
        { title: "Managing your releases", slug: "manage-releases" },
      ],
    },
    {
      id: "fans-listeners",
      title: "Fans & Listeners",
      description: "Help for music fans and listeners",
      icon: Users,
      articles: [
        { title: "How to create an account", slug: "create-account" },
        { title: "Purchasing music and merchandise", slug: "purchasing" },
        { title: "Managing your library", slug: "manage-library" },
        { title: "Downloading your purchases", slug: "downloading" },
        { title: "Creating playlists", slug: "playlists" },
        { title: "Following artists", slug: "following-artists" },
      ],
    },
    {
      id: "account-billing",
      title: "Account & Billing",
      description: "Account management and payment information",
      icon: BookOpen,
      articles: [
        { title: "Account settings and preferences", slug: "account-settings" },
        { title: "Payment methods and billing", slug: "payment-methods" },
        { title: "Refund policy", slug: "refund-policy" },
        { title: "Password reset and security", slug: "password-security" },
        { title: "Deleting your account", slug: "delete-account" },
        { title: "Two-factor authentication", slug: "2fa" },
      ],
    },
    {
      id: "technical-support",
      title: "Technical Support",
      description: "Troubleshooting and technical issues",
      icon: MessageCircle,
      articles: [
        { title: "Troubleshooting playback issues", slug: "playback-issues" },
        { title: "Browser compatibility", slug: "browser-compatibility" },
        { title: "Mobile app troubleshooting", slug: "mobile-troubleshooting" },
        { title: "File format requirements", slug: "file-formats" },
        { title: "Upload errors and solutions", slug: "upload-errors" },
        { title: "Reporting bugs and issues", slug: "report-bugs" },
      ],
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setHasSearched(true);

    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    // ค้นหาในทุก categories
    const results = [];
    helpCategories.forEach((category) => {
      const matchedArticles = category.articles.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matchedArticles.length > 0) {
        results.push({
          category: category.title,
          articles: matchedArticles,
        });
      }
    });

    setSearchResults(results);
  };

  return (
    <div className="min-h-screen bg-[#f7f8fc] font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <div className="py-14 px-4" style={{ background: "linear-gradient(135deg, #f0f1fb 0%, #eef0fb 100%)" }}>
        <div className="max-w-2xl mx-auto text-center">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-2 mb-8 opacity-90 hover:opacity-100 transition-opacity">
            <div className="w-8 h-8 bg-[#1a1a40] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-base">A</span>
            </div>
            <span className="text-base font-semibold text-[#1a1a2e]">Audtlist Help</span>
          </Link>

          <h1 className="text-4xl font-bold mb-2 text-[#1a1a2e]">How can we help you?</h1>
          <p className="mb-10 text-sm text-[#5a5a7a]">Find answers to your questions about Audtlist</p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mt-6">
            <div className="flex bg-white rounded-2xl shadow-sm overflow-hidden p-1.5 gap-1.5 border border-[#e4e4ef]">
              <div className="flex items-center flex-1 gap-2 px-3">
                <Search className="w-4 h-4 text-[#8585a8] shrink-0" />
                <input
                  type="text"
                  placeholder="Search for help..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 py-2 text-[#1a1a2e] text-sm placeholder:text-[#8585a8] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#1a1a40] text-white font-semibold rounded-xl hover:bg-[#0a0a1a] transition-colors text-sm shrink-0"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Back button */}
      <div className="px-4 pt-6">
        <Link
          to="/"
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#fff", textDecoration: "none", fontSize: "13px", fontWeight: 600, background: "#1a1a40", borderRadius: "8px", padding: "8px 18px", letterSpacing: "0.03em", boxShadow: "0 2px 8px rgba(26,26,64,0.2)", transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background = "#0a0a1a"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#1a1a40"; }}
        >
          ← Back to home
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Search Results */}
        {hasSearched && (
          <div className="mb-12">
            {searchResults.length > 0 ? (
              <div>
                <h2 className="text-2xl font-bold text-[#1a1a2e] mb-6">
                  Search Results ({searchResults.reduce((sum, r) => sum + r.articles.length, 0)})
                </h2>
                <div className="space-y-8">
                  {searchResults.map((result) => (
                    <div key={result.category}>
                      <h3 className="text-lg font-semibold text-[#5a5a7a] mb-4">
                        {result.category}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {result.articles.map((article) => (
                          <Link
                            key={article.slug}
                            to={`/help/${article.slug}`}
                            className="p-4 border border-[#e4e4ef] rounded-lg hover:border-[#c8c8ef] hover:bg-[#f0f1fb] transition-colors group"
                          >
                            <div className="flex items-start justify-between">
                              <h4 className="font-medium text-[#1a1a2e] group-hover:text-[#4a47c4]">
                                {article.title}
                              </h4>
                              <ChevronRight className="w-5 h-5 text-[#8585a8] group-hover:text-[#4a47c4] shrink-0" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-[#5a5a7a] text-lg mb-4">
                  No results found for "{searchQuery}"
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setHasSearched(false);
                    setSearchResults([]);
                  }}
                  className="text-[#1a1a40] hover:text-[#4a47c4] font-medium"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        )}

        {/* Categories Grid */}
        {!hasSearched && (
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a2e] mb-8">General Help</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {helpCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <div
                    key={category.id}
                    className="border border-[#e4e4ef] rounded-lg p-6 hover:shadow-lg transition-shadow bg-white"
                  >
                    {/* Category Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-[#f0f1fb] rounded-lg">
                        <IconComponent className="w-6 h-6 text-[#1a1a40]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#1a1a2e]">
                          {category.title}
                        </h3>
                        <p className="text-sm text-[#5a5a7a]">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    {/* Articles List */}
                    <div className="space-y-2">
                      {category.articles.map((article) => (
                        <Link
                          key={article.slug}
                          to={`/help/${article.slug}`}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-[#f0f1fb] group transition-colors"
                        >
                          <span className="text-[#5a5a7a] group-hover:text-[#1a1a2e] font-medium">
                            {article.title}
                          </span>
                          <ChevronRight className="w-4 h-4 text-[#8585a8] group-hover:text-[#4a47c4]" />
                        </Link>
                      ))}
                    </div>

                    {/* View All Link */}
                    <Link
                      to={`/help/category/${category.id}`}
                      className="mt-4 inline-flex items-center gap-2 text-[#1a1a40] hover:text-[#4a47c4] font-medium text-sm"
                    >
                      View all articles
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Contact Support Section */}
        <div className="mt-16 rounded-2xl p-10 text-center" style={{ background: "#f0f1fb", border: "1px solid #d0d2f0" }}>
          <h3 className="text-2xl font-bold text-[#1a1a2e] mb-3">
            Can't find what you're looking for?
          </h3>
          <p className="text-sm leading-relaxed text-center text-[#5a5a7a]">
            Our support team is here to help. Get in touch with us and we'll be happy to assist you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
            <Link
              to="/contact"
              className="px-6 py-3 bg-[#1a1a40] text-white font-semibold rounded-xl hover:bg-[#0a0a1a] transition-colors text-sm"
            >
              Contact Support
            </Link>
            <a
              href="mailto:support@audtlist.com"
              className="px-6 py-3 border border-[#c8c8ef] text-[#1a1a2e] font-semibold rounded-xl hover:bg-[#e4e4ef] transition-colors text-sm"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#f3f3fb] border-t border-[#e4e4ef] mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-[#1a1a2e] mb-4">Audtlist</h4>
              <ul className="space-y-2 text-sm text-[#5a5a7a]">
                <li>
                  <Link to="/" className="hover:text-[#1a1a40]">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/shop" className="hover:text-[#1a1a40]">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-[#1a1a40]">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#1a1a2e] mb-4">For Artists</h4>
              <ul className="space-y-2 text-sm text-[#5a5a7a]">
                <li>
                  <Link to="/register/artist" className="hover:text-[#1a1a40]">
                    Register as Artist
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-[#1a1a40]">
                    Artist Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#1a1a40]">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#1a1a2e] mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-[#5a5a7a]">
                <li>
                  <a href="#" className="hover:text-[#1a1a40]">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#1a1a40]">
                    Forum
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#1a1a40]">
                    Social Media
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#1a1a2e] mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-[#5a5a7a]">
                <li>
                  <a href="#" className="hover:text-[#1a1a40]">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#1a1a40]">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#1a1a40]">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#e4e4ef] pt-8 text-center text-sm text-[#5a5a7a]">
            <p>&copy; 2026 Audtlist. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
