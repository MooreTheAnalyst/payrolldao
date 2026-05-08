import Link from "next/link";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
                <Zap className="h-4 w-4 text-black" />
              </div>
              <span className="text-lg font-bold text-white">PayrollDAO</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-gray-500">
              Open-source on-chain payroll infrastructure for Africa&apos;s informal workforce.
              Built on Stellar. Powered by the community.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/dashboard" className="text-sm text-gray-500 hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link href="/payroll" className="text-sm text-gray-500 hover:text-white transition-colors">Payroll</Link></li>
              <li><Link href="/workers" className="text-sm text-gray-500 hover:text-white transition-colors">Workers</Link></li>
              <li><Link href="/payments" className="text-sm text-gray-500 hover:text-white transition-colors">Payments</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Open Source</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com/MooreTheAnalyst/payrolldao" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-white transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://github.com/MooreTheAnalyst/payrolldao/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-white transition-colors">
                  Contributing
                </a>
              </li>
              <li>
                <a href="https://github.com/MooreTheAnalyst/payrolldao/issues" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-white transition-colors">
                  Issues
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} PayrollDAO. Open-source under MIT License.
          </p>
          <p className="text-xs text-gray-600">
            Built on{" "}
            <a href="https://stellar.org" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">
              Stellar
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
