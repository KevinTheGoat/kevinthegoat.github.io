export default function DemoFooter({ theme }) {
  return (
    <footer
      className="py-8 px-6 border-t mt-auto"
      style={{ borderColor: theme.border }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm" style={{ color: theme.muted }}>
          Website designed & developed by Kevin Moreau — Want a site like this?{' '}
          <a
            href="mailto:kevinmoreau@kevco.co"
            className="font-medium transition-colors duration-300 hover:underline"
            style={{ color: theme.accent }}
          >
            kevinmoreau@kevco.co
          </a>
        </p>
      </div>
    </footer>
  )
}
