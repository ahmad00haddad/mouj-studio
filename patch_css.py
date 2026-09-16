with open('src/styles.css', 'a', encoding='utf-8') as f:
    f.write('''\n
/* --- RTL Support --- */
[dir="rtl"] body {
  font-family: 'Cairo', 'Sora', 'Manrope', sans-serif;
  text-align: right;
}
[dir="rtl"] .nav-inner {
  flex-direction: row-reverse;
}
[dir="rtl"] .nav-links {
  flex-direction: row-reverse;
}
[dir="rtl"] .footer-grid {
  direction: rtl;
}
[dir="rtl"] .footer-col {
  text-align: right;
}
[dir="rtl"] .page-head {
  text-align: center;
}
[dir="rtl"] .section-head {
  text-align: right;
}
[dir="rtl"] .about-hero h1 {
  text-align: right;
}
[dir="rtl"] .btn i {
  margin-right: 0;
  margin-left: 0.5rem;
}
[dir="rtl"] .work-overlay {
  text-align: right;
}
[dir="rtl"] .hero-actions {
  flex-direction: row-reverse;
  justify-content: flex-end;
}
''')
