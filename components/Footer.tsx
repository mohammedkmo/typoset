export default function Footer() {
  return (
    <footer className="mt-auto py-8 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
          <div>
            <p>Font Collection © {new Date().getFullYear()}</p>
          </div>
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank"
              rel="noopener noreferrer" 
              className="hover:text-foreground transition-colors"
            >
              Twitter
            </a>
            <a 
              href="/about"
              className="hover:text-foreground transition-colors"
            >
              About
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
