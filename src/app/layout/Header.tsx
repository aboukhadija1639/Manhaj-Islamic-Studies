import { Link } from 'react-router-dom';
import { Container, ThemeToggle } from '../../shared/ui';
import { useState } from 'react';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <Container>
        <div className="flex h-20 items-center justify-between">
          {/* Logo - Enhanced */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <img
                src="/logo.svg"
                alt="منهاج"
                className="relative h-12 w-12 drop-shadow-lg"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl leading-none bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                منهاج
              </span>
              <span className="text-xs text-muted-foreground font-medium">العلوم الشرعية</span>
            </div>
          </Link>

          {/* Desktop Navigation - Enhanced */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="relative text-sm font-semibold transition-all duration-300 hover:text-emerald-600 dark:hover:text-emerald-400 group"
            >
              الرئيسية
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/programs"
              className="relative text-sm font-semibold transition-all duration-300 hover:text-emerald-600 dark:hover:text-emerald-400 group"
            >
              البرامج الأكاديمية
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/curriculum"
              className="relative text-sm font-semibold transition-all duration-300 hover:text-emerald-600 dark:hover:text-emerald-400 group"
            >
              خريطة المنهج
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/about"
              className="relative text-sm font-semibold transition-all duration-300 hover:text-emerald-600 dark:hover:text-emerald-400 group"
            >
              عن المنصة
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/40 animate-slide-up">
            <nav className="flex flex-col gap-3">
              <Link
                to="/"
                className="px-4 py-3 rounded-lg text-sm font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                الرئيسية
              </Link>
              <Link
                to="/programs"
                className="px-4 py-3 rounded-lg text-sm font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                البرامج الأكاديمية
              </Link>
              <Link
                to="/curriculum"
                className="px-4 py-3 rounded-lg text-sm font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                خريطة المنهج
              </Link>
              <Link
                to="/about"
                className="px-4 py-3 rounded-lg text-sm font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                عن المنصة
              </Link>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;
