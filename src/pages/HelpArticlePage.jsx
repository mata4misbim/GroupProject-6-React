import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ThumbsUp, ThumbsDown, Search } from "lucide-react";

export default function HelpArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [helpful, setHelpful] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const articles = {
    "getting-started-artist": {
      title: "Getting started as an artist",
      category: "Artists & Labels",
      lastUpdated: "2025-01-15",
      content: `<h2>Welcome to Audtlist!</h2><p>Audtlist is a platform designed to help independent artists share their music directly with fans. Here's how to get started:</p><h3>Step 1: Create Your Account</h3><p>First, you'll need to create an artist account on Audtlist. Visit our registration page and select "Register as Artist".</p><h3>Step 2: Set Up Your Profile</h3><p>Add your artist name, bio, profile picture, and links to your social media. This helps fans learn more about you.</p><h3>Step 3: Upload Your Music</h3><p>Once your profile is set up, you can start uploading your music. We support MP3, WAV, FLAC, and other common formats.</p><h3>Step 4: Set Your Prices</h3><p>Decide how much you want to charge for your music. You can also offer it for free if you prefer.</p><h3>Step 5: Promote Your Music</h3><p>Share your music on social media and with your fans. Audtlist provides tools to help you reach more listeners.</p>`,
      relatedArticles: [
        { title: "How to upload your music", slug: "upload-music" },
        { title: "Setting up your artist profile", slug: "artist-profile" },
        { title: "Understanding royalties and payments", slug: "royalties" },
      ],
    },
    "upload-music": {
      title: "How to upload your music",
      category: "Artists & Labels",
      lastUpdated: "2025-01-10",
      content: `<h2>Uploading Your Music to Audtlist</h2><p>Follow these steps to upload your music:</p><h3>Supported Formats</h3><ul><li>MP3 (128 kbps or higher)</li><li>WAV</li><li>FLAC</li><li>AAC</li><li>OGG</li></ul><h3>File Size Limits</h3><p>Maximum file size is 500MB per track.</p><h3>Upload Process</h3><p>1. Go to your dashboard and click "Upload Music"</p><p>2. Select your audio file</p><p>3. Add track information (title, artist, genre, etc.)</p><p>4. Upload cover art</p><p>5. Set pricing and availability</p><p>6. Click "Publish"</p>`,
      relatedArticles: [
        { title: "File format requirements", slug: "file-formats" },
        { title: "Upload errors and solutions", slug: "upload-errors" },
      ],
    },
    "create-account": {
      title: "How to create an account",
      category: "Fans & Listeners",
      lastUpdated: "2025-01-12",
      content: `<h2>Creating Your Audtlist Account</h2><p>It's easy to get started on Audtlist. Follow these simple steps:</p><h3>Step 1: Go to Registration</h3><p>Visit the Audtlist website and click on "Register" or "Sign Up".</p><h3>Step 2: Choose Your Account Type</h3><p>Select whether you want to register as a Fan or an Artist.</p><h3>Step 3: Enter Your Information</h3><p>Provide your email address and create a strong password.</p><h3>Step 4: Verify Your Email</h3><p>Check your email for a verification link and click it to confirm your account.</p><h3>Step 5: Complete Your Profile</h3><p>Add a profile picture and bio to personalize your account.</p><h3>You're All Set!</h3><p>You can now start exploring music and supporting artists on Audtlist.</p>`,
      relatedArticles: [
        { title: "Account settings and preferences", slug: "account-settings" },
        { title: "Password reset and security", slug: "password-security" },
      ],
    },
  };

  const article = articles[slug];

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 font-['Plus_Jakarta_Sans',sans-serif] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Article not found</h1>
          <p className="text-gray-500 mb-6">The article you're looking for doesn't exist.</p>
          <Link to="/help" className="inline-block px-6 py-3 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-colors">
            Back to Help
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-['Plus_Jakarta_Sans',sans-serif]">

      {/* Header */}
      <div className="bg-gradient-to-r from-teal-400 to-teal-500">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <button
            onClick={() => navigate("/help")}
            className="flex items-center gap-1.5 text-white/80 hover:text-white mb-6 transition-colors text-sm font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Help
          </button>
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-teal-100 mb-3">
            {article.category}
          </span>
          <h1 className="text-3xl font-bold text-white leading-snug">{article.title}</h1>
          <p className="mt-2 text-sm text-white/60">Last updated: {article.lastUpdated}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Article body */}
          <div className="lg:col-span-2 space-y-10">
            <div
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 prose prose-gray prose-headings:font-bold prose-h2:text-xl prose-h3:text-base prose-p:leading-relaxed prose-p:text-gray-600 max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Helpful */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <p className="font-semibold text-gray-800 mb-4">Was this article helpful?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setHelpful(true)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    helpful === true ? "bg-teal-500 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-teal-50 hover:text-teal-600"
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" /> Yes
                </button>
                <button
                  onClick={() => setHelpful(false)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    helpful === false ? "bg-red-500 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500"
                  }`}
                >
                  <ThumbsDown className="w-4 h-4" /> No
                </button>
              </div>
            </div>

            {/* Related */}
            {article.relatedArticles?.length > 0 && (
              <div>
                <h3 className="text-base font-bold text-gray-800 mb-4">Related Articles</h3>
                <div className="space-y-2">
                  {article.relatedArticles.map((r) => (
                    <Link
                      key={r.slug}
                      to={`/help/${r.slug}`}
                      className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:border-teal-300 hover:bg-teal-50/50 transition-all group no-underline"
                    >
                      <span className="text-sm font-medium text-gray-700 group-hover:text-teal-700">{r.title}</span>
                      <ChevronLeft className="w-4 h-4 rotate-180 text-gray-300 group-hover:text-teal-400" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search help..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                />
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="bg-teal-500 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-1">Still need help?</h3>
              <p className="text-sm text-teal-100 mb-5">Our support team is ready to assist you.</p>
              <a
                href="mailto:support@audtlist.com"
                className="block w-full text-center px-4 py-2.5 bg-white text-teal-600 font-semibold rounded-xl hover:bg-teal-50 transition-colors text-sm no-underline"
              >
                Email Support
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
