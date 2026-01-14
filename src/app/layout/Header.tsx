import { Link } from 'react-router-dom';
import { Container, ThemeToggle } from '../../shared/ui';

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img
    src="/logo.svg"
    alt="منهاج"
    className="h-10 w-10"
  />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg leading-none">منهاج</span>
              <span className="text-xs text-muted-foreground">العلوم الشرعية</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-primary-600"
            >
              الرئيسية
            </Link>
            <Link
              to="/manhaj"
              className="text-sm font-medium transition-colors hover:text-primary-600"
            >
              المنهج
            </Link>
            <Link
              to="/subjects"
              className="text-sm font-medium transition-colors hover:text-primary-600"
            >
              المواد الدراسية
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium transition-colors hover:text-primary-600"
            >
              عن المنصة
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
