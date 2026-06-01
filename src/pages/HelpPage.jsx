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
    <div className="min-h-screen bg-white font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header with Teal Background */}
      <div className="bg-linear-to-r from-teal-400 to-teal-500 text-white py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-2 mb-8 opacity-90 hover:opacity-100 transition-opacity">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-teal-500 font-bold text-base">A</span>
            </div>
            <span className="text-base font-semibold">Audtlist Help</span>
          </Link>

          <h1 className="text-4xl font-bold mb-2">How can we help you?</h1>
          <p className="text-teal-50 mb-10 text-sm">Find answers to your questions about Audtlist</p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mt-6">
            <div className="flex bg-white rounded-2xl shadow-lg overflow-hidden p-1.5 gap-1.5">
              <div className="flex items-center flex-1 gap-2 px-3">
                <Search className="w-4 h-4 text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search for help..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 py-2 text-gray-800 text-sm placeholder:text-gray-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-colors text-sm shrink-0"
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
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#fff", textDecoration: "none", fontSize: "13px", fontWeight: 600, background: "#14b8a6", borderRadius: "8px", padding: "8px 18px", letterSpacing: "0.03em", boxShadow: "0 2px 8px rgba(20,184,166,0.3)", transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background = "#0d9488"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#14b8a6"; }}
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
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Search Results ({searchResults.reduce((sum, r) => sum + r.articles.length, 0)})
                </h2>
                <div className="space-y-8">
                  {searchResults.map((result) => (
                    <div key={result.category}>
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">
                        {result.category}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {result.articles.map((article) => (
                          <Link
                            key={article.slug}
                            to={`/help/${article.slug}`}
                            className="p-4 border border-gray-200 rounded-lg hover:border-teal-400 hover:bg-teal-50 transition-colors group"
                          >
                            <div className="flex items-start justify-between">
                              <h4 className="font-medium text-gray-900 group-hover:text-teal-600">
                                {article.title}
                              </h4>
                              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 shrink-0" />
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
                <p className="text-gray-600 text-lg mb-4">
                  No results found for "{searchQuery}"
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setHasSearched(false);
                    setSearchResults([]);
                  }}
                  className="text-teal-600 hover:text-teal-700 font-medium"
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
            <h2 className="text-2xl font-bold text-gray-900 mb-8">General Help</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {helpCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <div
                    key={category.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    {/* Category Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-teal-50 rounded-lg">
                        <IconComponent className="w-6 h-6 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {category.title}
                        </h3>
                        <p className="text-sm text-gray-600">
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
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 group transition-colors"
                        >
                          <span className="text-gray-700 group-hover:text-teal-600 font-medium">
                            {article.title}
                          </span>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-teal-600" />
                        </Link>
                      ))}
                    </div>

                    {/* View All Link */}
                    <Link
                      to={`/help/category/${category.id}`}
                      className="mt-4 inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium text-sm"
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
        <div className="mt-16 bg-linear-to-r from-teal-400 to-teal-500 rounded-2xl p-10 text-center shadow-sm">
          <h3 className="text-2xl font-bold text-white mb-3">
            Can't find what you're looking for?
          </h3>
          <p className="text-teal-50 text-sm leading-relaxed text-center">
            Our support team is here to help. Get in touch with us and we'll be happy to assist you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
            <Link
              to="/contact"
              className="px-6 py-3 bg-white text-teal-600 font-semibold rounded-xl hover:bg-teal-50 transition-colors text-sm"
            >
              Contact Support
            </Link>
            <a
              href="mailto:support@audtlist.com"
              className="px-6 py-3 border border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors text-sm"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Audtlist</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link to="/" className="hover:text-teal-600">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/shop" className="hover:text-teal-600">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-teal-600">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">For Artists</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link to="/register/artist" className="hover:text-teal-600">
                    Register as Artist
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-600">
                    Artist Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-600">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-teal-600">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-600">
                    Forum
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-600">
                    Social Media
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-teal-600">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-600">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-600">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-300 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2026 Audtlist. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}