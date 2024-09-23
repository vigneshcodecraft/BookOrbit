import Link from "next/link";
import Head from "next/head";
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
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("homePage");
  return (
    <>
      <div className="flex min-h-[100dvh] flex-col bg-background">
        <header className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="#" className="flex items-center">
            <BookIcon className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold">
              {t("header.siteTitle")}
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="default" asChild>
              <Link href="/login">{t("header.logIn")}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/signup">{t("header.signUp")}</Link>
            </Button>
          </div>
        </header>
        <main className="flex-1">
          <section className="bg-muted py-12 sm:py-16 lg:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                <div className="flex flex-col justify-center">
                  <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                    {t("heroSection.title")}
                  </h1>
                  <p className="mt-4 text-muted-foreground sm:text-xl">
                    {t("heroSection.description")}
                  </p>
                  <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                    <Button size="lg" asChild>
                      <Link href="signup">{t("heroSection.signUp")}</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="#">{t("heroSection.learnMore")}</Link>
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
                    <CardTitle>{t("features.bookCatalog.title")} </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {t("features.bookCatalog.description")}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <BookmarkIcon className="h-12 w-12 text-primary" />
                    <CardTitle>
                      {t("features.borrowingTracking.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {t("features.borrowingTracking.description")}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <WarehouseIcon className="h-12 w-12 text-primary" />
                    <CardTitle>
                      {t("features.inventoryManagement.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {t("features.inventoryManagement.description")}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <MailIcon className="h-12 w-12 text-primary" />
                    <CardTitle>{t("features.notifications.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {t("features.notifications.description")}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <AccessibilityIcon className="h-12 w-12 text-primary" />
                    <CardTitle>{t("features.accessibility.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {t("features.accessibility.description")}
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
                    {t("streamlineSection.title")}
                  </h2>
                  <p className="mt-4 text-muted-foreground sm:text-xl">
                    {t("streamlineSection.description")}
                  </p>
                  <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                    <Button size="lg" asChild>
                      <Link href="/signup">
                        {t("streamlineSection.signUp")}
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="#">{t("streamlineSection.learnMore")}</Link>
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
              {t("footer.copyright")}
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:underline"
              >
                {t("footer.terms")}
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:underline"
              >
                {t("footer.privacy")}
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
