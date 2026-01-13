import { Container } from '../../shared/ui';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30 mt-auto">
      <Container>
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About */}
            <div>
              <h3 className="font-heading font-semibold text-lg mb-3">منهاج</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                منصة تعليمية متخصصة في العلوم الشرعية لطلاب جامعة الوادي - الجزائر
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-heading font-semibold text-lg mb-3">روابط سريعة</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/" className="text-muted-foreground hover:text-primary-600 transition-colors">
                    الرئيسية
                  </a>
                </li>
                <li>
                  <a href="/subjects" className="text-muted-foreground hover:text-primary-600 transition-colors">
                    المواد الدراسية
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-muted-foreground hover:text-primary-600 transition-colors">
                    عن المنصة
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-heading font-semibold text-lg mb-3">تواصل معنا</h3>
              <p className="text-sm text-muted-foreground">
                جامعة الوادي<br />
                كلية العلوم الإسلامية<br />
                الوادي، الجزائر
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
            <p>© {currentYear} منهاج - جميع الحقوق محفوظة</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
