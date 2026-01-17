import { Container } from '../../shared/ui';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Send, Mail } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-gradient-to-b from-background to-muted/30 mt-auto">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* About Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl blur-sm opacity-50"></div>
                  <img
                    src="/logo.svg"
                    alt="منهاج"
                    className="relative h-10 w-10"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-lg leading-none bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                    منهاج
                  </span>
                  <span className="text-xs text-muted-foreground">العلوم الشرعية</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-md font-['Cairo']">
                منصة تعليمية متكاملة ومتخصصة في العلوم الإسلامية لطلاب جامعة حمه لخضر بالوادي، توفر محتوى علميًا منظمًا وفق نظام LMD لجميع الطلاب.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://github.com/Aboubaker001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-all duration-300 hover:scale-110"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/moussaoui-aboubaker-389a41249/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://t.me/just_contactbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-all duration-300 hover:scale-110"
                  aria-label="Telegram"
                >
                  <Send className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-heading font-bold text-base mb-4 text-foreground">روابط سريعة</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-emerald-600 dark:bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    الرئيسية
                  </Link>
                </li>
                <li>
                  <Link to="/programs" className="text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-emerald-600 dark:bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    البرامج الأكاديمية
                  </Link>
                </li>
                <li>
                  <Link to="/curriculum" className="text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-emerald-600 dark:bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    خريطة المنهج
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-emerald-600 dark:bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    عن المنصة
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-heading font-bold text-base mb-4 text-foreground">تواصل معنا</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-medium text-foreground">جامعة حمه لخضر</p>
                    <p>كلية العلوم الإسلامية</p>
                    <p>الوادي، الجزائر</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <a 
                    href="mailto:moussaouiaboubaker.sn@gmail.com" 
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors break-all"
                  >
                    moussaouiaboubaker.sn@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <a 
                    href="https://t.me/just_contactbot" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    بوت الدعم الفني
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-border/40">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-muted-foreground text-center md:text-right">
                <p className="mb-1">
                  © {currentYear} منهاج - جميع الحقوق محفوظة
                </p>
                <p className="text-xs">
                  تطوير وتصميم:{' '}
                  <span className="font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                    أبو البراء
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <Link to="/privacy-policy" className="text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  سياسة الخصوصية
                </Link>
                <Link to="/terms-of-use" className="text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  شروط الاستخدام
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
