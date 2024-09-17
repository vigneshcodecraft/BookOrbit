import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AccessibilityIcon,
  BookIcon,
  BookmarkIcon,
  InfoIcon,
  MailIcon,
  WarehouseIcon,
} from "lucide-react";

export default function Page() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <header className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="#" className="flex items-center">
          <BookIcon className="h-8 w-8 text-primary" />
          <span className="ml-2 text-xl font-bold">Book Orbit</span>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="default" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="bg-muted py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Manage Your Library with Ease
                </h1>
                <p className="mt-4 text-muted-foreground sm:text-xl">
                  Our library management system helps you organize your books,
                  track borrowings, and manage your library efficiently.
                </p>
                <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" asChild>
                    <Link href="signup">Sign Up</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div>
                <Image
                  src="/placeholder.svg"
                  alt="Library"
                  width={800}
                  height={600}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <BookIcon className="h-12 w-12 text-primary" />
                  <CardTitle>Book Catalog</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Easily manage your book collection with our comprehensive
                    catalog.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <BookmarkIcon className="h-12 w-12 text-primary" />
                  <CardTitle>Borrowing Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Keep track of who has borrowed what and when they need to
                    return it.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <WarehouseIcon className="h-12 w-12 text-primary" />
                  <CardTitle>Inventory Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Maintain a clear overview of your library's inventory and
                    stock levels.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <MailIcon className="h-12 w-12 text-primary" />
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Stay informed about due dates, overdue books, and other
                    important updates.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <AccessibilityIcon className="h-12 w-12 text-primary" />
                  <CardTitle>Accessibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our system is designed to be user-friendly and accessible
                    for all.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="bg-muted py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
              <div>
                <Image
                  src="/placeholder.svg"
                  alt="Library Interior"
                  width={800}
                  height={600}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  Streamline Your Library Management
                </h2>
                <p className="mt-4 text-muted-foreground sm:text-xl">
                  Our library management system provides a comprehensive
                  solution to help you organize, track, and optimize your
                  library's operations.
                </p>
                <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#">Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; 2024 Library Manager. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:underline"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:underline"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
