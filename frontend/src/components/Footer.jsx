import React from 'react'
import { Link } from "react-router-dom";
import { Package } from "lucide-react";

const Footer = () => {
  return (
      <footer className="border-t bg-gray-200/40 px-8 lg:px-24">
        <div className="flex flex-col gap-4 py-10 md:flex-row md:gap-8">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              <span className="text-lg font-semibold">PackageDesk</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Simplifying package management for residential buildings.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Help</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/support"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Support
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              © {new Date().getFullYear()} PackageDesk. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
  );
}

export default Footer