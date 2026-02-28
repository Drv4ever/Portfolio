export default function Footer() {
  return (
    <footer id="footer" className="border-t border-border-light py-6 text-center text-xs uppercase tracking-editorial text-neutral-600 dark:border-border-dark dark:text-neutral-400">
      © {new Date().getFullYear()} Dhruv Jain. All rights reserved.
    </footer>
  );
}
