import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ThumbsUp, ThumbsDown, Share2, Search } from "lucide-react";

export default function HelpArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [helpful, setHelpful] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock article data - ในจริงจะดึงจาก API
  const articles = {
    "getting-started-artist": {
      title: "Getting started as an artist",
      category: "Artists & Labels",
      lastUpdated: "2025-01-15",
      content: `
        <h2>Welcome to Audtlist!</h2>
        <p>Audtlist is a platform designed to help independent artists share their music directly with fans. Here's how to get started:</p>
        
        <h3>Step 1: Create Your Account</h3>
        <p>First, you'll need to create an artist account on Audtlist. Visit our registration page and select "Register as Artist".</p>
        
        <h3>Step 2: Set Up Your Profile</h3>
        <p>Add your artist name, bio, profile picture, and links to your social media. This helps fans learn more about you.</p>
        
        <h3>Step 3: Upload Your Music</h3>
        <p>Once your profile is set up, you can start uploading your music. We support MP3, WAV, FLAC, and other common formats.</p>
        
        <h3>Step 4: Set Your Prices</h3>
        <p>Decide how much you want to charge for your music. You can also offer it for free if you prefer.</p>
        
        <h3>Step 5: Promote Your Music</h3>
        <p>Share your music on social media and with your fans. Audtlist provides tools to help you reach more listeners.</p>
      `,
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
      content: `
        <h2>Uploading Your Music to Audtlist</h2>
        <p>Follow these steps to upload your music:</p>
        
        <h3>Supported Formats</h3>
        <p>We support the following audio formats:</p>
        <ul>
          <li>MP3 (128 kbps or higher)</li>
          <li>WAV</li>
          <li>FLAC</li>
          <li>AAC</li>
          <li>OGG</li>
        </ul>
        
        <h3>File Size Limits</h3>
        <p>Maximum file size is 500MB per track.</p>
        
        <h3>Upload Process</h3>
        <p>1. Go to your dashboard and click "Upload Music"</p>
        <p>2. Select your audio file</p>
        <p>3. Add track information (title, artist, genre, etc.)</p>
        <p>4. Upload cover art</p>
        <p>5. Set pricing and availability</p>
        <p>6. Click "Publish"</p>
      `,
      relatedArticles: [
        { title: "File format requirements", slug: "file-formats" },
        { title: "Upload errors and solutions", slug: "upload-errors" },
      ],
    },
    "create-account": {
      title: "How to create an account",
      category: "Fans & Listeners",
      lastUpdated: "2025-01-12",
      content: `
        <h2>Creating Your Audtlist Account</h2>
        <p>It's easy to get started on Audtlist. Follow these simple steps:</p>
        
        <h3>Step 1: Go to Registration</h3>
        <p>Visit the Audtlist website and click on "Register" or "Sign Up".</p>
        
        <h3>Step 2: Choose Your Account Type</h3>
        <p>Select whether you want to register as a Fan or an Artist.</p>
        
        <h3>Step 3: Enter Your Information</h3>
        <p>Provide your email address and create a strong password.</p>
        
        <h3>Step 4: Verify Your Email</h3>
        <p>Check your email for a verification link and click it to confirm your account.</p>
        
        <h3>Step 5: Complete Your Profile</h3>
        <p>Add a profile picture and bio to personalize your account.</p>
        
        <h3>You're All Set!</h3>
        <p>You can now start exploring music and supporting artists on Audtlist.</p>
      `,
      relatedArticles: [
        { title: "Account settings and preferences", slug: "account-settings" },
        { title: "Password reset and security", slug: "password-security" },
      ],
    },
  };

  const article = articles[slug];

  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <button
            onClick={() => navigate("/help")}
            className="flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-8"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Help
          </button>
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Article not found</h1>
            <p className="text-gray-600 mb-6">
              The article you're looking for doesn't exist.
            </p>
            <Link
              to="/help"
              className="inline-block px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700"
            >
              Go back to Help
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate("/help")}
            className="flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-4"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Help
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{article.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{article.category}</span>
            <span>•</span>
            <span>Last updated: {article.lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-2">
            <div
              className="prose prose-sm max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Helpful Section */}
            <div className="bg-gray-50 rounded-lg p-6 mb-12">
              <p className="text-gray-900 font-semibold mb-4">Was this article helpful?</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setHelpful(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    helpful === true
                      ? "bg-teal-600 text-white"
                      : "bg-white border border-gray-300 text-gray-700 hover:border-teal-600"
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  Yes
                </button>
                <button
                  onClick={() => setHelpful(false)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    helpful === false
                      ? "bg-red-600 text-white"
                      : "bg-white border border-gray-300 text-gray-700 hover:border-red-600"
                  }`}
                >
                  <ThumbsDown className="w-4 h-4" />
                  No
                </button>
              </div>
            </div>

            {/* Related Articles */}
            {article.relatedArticles && article.relatedArticles.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Related Articles</h3>
                <div className="space-y-3">
                  {article.relatedArticles.map((relatedArticle) => (
                    <Link
                      key={relatedArticle.slug}
                      to={`/help/${relatedArticle.slug}`}
                      className="block p-4 border border-gray-200 rounded-lg hover:border-teal-400 hover:bg-teal-50 transition-colors group"
                    >
                      <p className="text-gray-900 group-hover:text-teal-600 font-medium">
                        {relatedArticle.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Search */}
            <div className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search help..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-teal-50 rounded-lg p-6 border border-teal-200">
              <h3 className="font-bold text-gray-900 mb-2">Still need help?</h3>
              <p className="text-sm text-gray-700 mb-4">
                Our support team is ready to assist you.
              </p>
              <Link
                to="/contact"
                className="block w-full text-center px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors mb-3"
              >
                Contact Support
              </Link>
              <a
                href="mailto:support@audtlist.com"
                className="block w-full text-center px-4 py-2 border border-teal-600 text-teal-600 font-semibold rounded-lg hover:bg-teal-50 transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}