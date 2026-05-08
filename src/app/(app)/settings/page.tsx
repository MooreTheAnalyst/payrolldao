"use client";

import { useState } from "react";
import { Wallet, Globe, Bell, Shield, Copy, CheckCircle } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function SettingsPage() {
  const [copied, setCopied] = useState(false);
  const [network, setNetwork] = useState<"testnet" | "mainnet">("testnet");
  const [notifications, setNotifications] = useState({
    paymentSent: true,
    paymentFailed: true,
    newWorker: false,
  });

  const mockAddress = "GBXGQJWVLWOYHFLVTKWV5FGHA3LNYY2JQKM7OAJAUEQFU6LPCSEFVXON";

  const copyAddress = () => {
    navigator.clipboard.writeText(mockAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <DashboardHeader
        title="Settings"
        description="Manage your account and preferences"
      />

      <div className="p-6 space-y-6 max-w-2xl">
        {/* Wallet connection */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
              <Wallet className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-medium text-white">Wallet Connection</h3>
              <p className="text-sm text-gray-500">Connect your Stellar wallet to send payments</p>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-400" />
                  <span className="text-sm text-gray-400">Not connected</span>
                </div>
                <p className="mt-1 text-xs text-gray-600">
                  Install Freighter wallet extension to connect
                </p>
              </div>
              <Button size="sm">Connect Wallet</Button>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-600">
              Demo Address (testnet)
            </p>
            <div className="flex items-center justify-between gap-2">
              <code className="flex-1 truncate text-xs text-gray-400">{mockAddress}</code>
              <button
                onClick={copyAddress}
                className="shrink-0 rounded-lg p-1.5 text-gray-500 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Copy address"
              >
                {copied ? (
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Network */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10">
              <Globe className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-medium text-white">Network</h3>
              <p className="text-sm text-gray-500">Choose between Stellar testnet and mainnet</p>
            </div>
          </div>

          <div className="flex gap-3">
            {(["testnet", "mainnet"] as const).map((n) => (
              <button
                key={n}
                onClick={() => setNetwork(n)}
                className={`flex-1 rounded-xl border p-4 text-left transition-colors ${
                  network === n
                    ? "border-emerald-500/50 bg-emerald-500/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white capitalize">{n}</span>
                  {network === n && <Badge variant="success">Active</Badge>}
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {n === "testnet"
                    ? "Safe for development and testing"
                    : "Real transactions with real funds"}
                </p>
              </button>
            ))}
          </div>

          {network === "mainnet" && (
            <div className="mt-3 rounded-lg border border-red-500/20 bg-red-500/5 p-3">
              <p className="text-xs text-red-400">
                ⚠️ Mainnet mode sends real transactions. Ensure your wallet has sufficient funds.
              </p>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10">
              <Bell className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-medium text-white">Notifications</h3>
              <p className="text-sm text-gray-500">Configure payment and activity alerts</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { key: "paymentSent" as const, label: "Payment sent", description: "When a payment is successfully sent" },
              { key: "paymentFailed" as const, label: "Payment failed", description: "When a transaction fails or is rejected" },
              { key: "newWorker" as const, label: "New worker added", description: "When a new worker joins a payroll group" },
            ].map(({ key, label, description }) => (
              <div key={key} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
                <div>
                  <p className="text-sm font-medium text-white">{label}</p>
                  <p className="text-xs text-gray-500">{description}</p>
                </div>
                <button
                  onClick={() => setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    notifications[key] ? "bg-emerald-500" : "bg-white/10"
                  }`}
                  role="switch"
                  aria-checked={notifications[key]}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      notifications[key] ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10">
              <Shield className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="font-medium text-white">Security</h3>
              <p className="text-sm text-gray-500">Transaction signing and security settings</p>
            </div>
          </div>

          <div className="space-y-3 text-sm text-gray-400">
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
              <div>
                <p className="font-medium text-white">Transaction signing</p>
                <p className="text-xs text-gray-500">All transactions are signed client-side via Freighter</p>
              </div>
              <Badge variant="success">Secure</Badge>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
              <div>
                <p className="font-medium text-white">Private key storage</p>
                <p className="text-xs text-gray-500">Private keys never leave your device</p>
              </div>
              <Badge variant="success">Safe</Badge>
            </div>
          </div>
        </div>

        {/* Open source */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-gray-400">
            PayrollDAO is open-source under the MIT License.{" "}
            <a
              href="https://github.com/payrolldao/payrolldao"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              View source on GitHub →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
