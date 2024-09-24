import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookIcon, BookmarkIcon, WarehouseIcon, Sun, Moon } from "lucide-react";
import { useTranslations } from "next-intl"; // Assuming you're using next-intl
import ThemeToggle from "@/components/ThemeToggle";
import LocaleSwitcher from "@/components/LocaleSwitcher";

export default function HomePage() {
  const t = useTranslations("homePage");
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <header className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
        <div className=" mx-auto px-4 sm:px-6">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center">
              <div className="animate-fade-in">
                <BookIcon className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="ml-3 text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                {t("header.title")}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors duration-300"
                >
                  {t("header.login")}
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-300">
                  {t("header.signup")}
                </Button>
              </Link>
              <ThemeToggle />
              <div className="">
                <LocaleSwitcher />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-gradient-to-b from-blue-100 via-indigo-100 to-purple-100 dark:from-gray-800 dark:via-gray-700 dark:to-indigo-900 py-24 transition-colors duration-500">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-center text-5xl font-extrabold tracking-tight text-indigo-900 dark:text-white sm:text-6xl md:text-7xl animate-fade-in-up">
              {t("main.hero.title")}
              <br />
              <span className="text-indigo-600 dark:text-indigo-400">
                {t("main.hero.withEase")}
              </span>
            </h1>
            <p className="mt-6 text-center text-xl text-indigo-800 dark:text-indigo-200 animate-fade-in-up animation-delay-200">
              {t("main.hero.description")}
            </p>
            <div className="mt-10 flex justify-center animate-fade-in-up animation-delay-400">
              <Button className="bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-lg px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
                {t("main.hero.getStarted")}
              </Button>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white dark:bg-gray-800 transition-colors duration-500">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="animate-fade-in-up border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-indigo-50 dark:bg-gray-700">
                <CardHeader>
                  <BookIcon className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
                  <CardTitle className="text-xl font-semibold text-indigo-900 dark:text-white transition-colors duration-300">
                    {t("main.features.bookCatalog.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-indigo-700 dark:text-indigo-200 transition-colors duration-300">
                    {t("main.features.bookCatalog.description")}
                  </p>
                </CardContent>
              </Card>
              <Card className="animate-fade-in-up border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-indigo-50 dark:bg-gray-700">
                <CardHeader>
                  <BookmarkIcon className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
                  <CardTitle className="text-xl font-semibold text-indigo-900 dark:text-white transition-colors duration-300">
                    {t("main.features.borrowingTracking.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-indigo-700 dark:text-indigo-200 transition-colors duration-300">
                    {t("main.features.borrowingTracking.description")}
                  </p>
                </CardContent>
              </Card>
              <Card className="animate-fade-in-up border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-indigo-50 dark:bg-gray-700">
                <CardHeader>
                  <WarehouseIcon className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
                  <CardTitle className="text-xl font-semibold text-indigo-900 dark:text-white transition-colors duration-300">
                    {t("main.features.inventoryManagement.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-indigo-700 dark:text-indigo-200 transition-colors duration-300">
                    {t("main.features.inventoryManagement.description")}
                  </p>
                </CardContent>
              </Card>
              <Card className="animate-fade-in-up border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-indigo-50 dark:bg-gray-700">
                <CardHeader>
                  <BookIcon className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
                  <CardTitle className="text-xl font-semibold text-indigo-900 dark:text-white transition-colors duration-300">
                    {t("main.features.notifications.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-indigo-700 dark:text-indigo-200 transition-colors duration-300">
                    {t("main.features.notifications.description")}
                  </p>
                </CardContent>
              </Card>
              <Card className="animate-fade-in-up border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-indigo-50 dark:bg-gray-700">
                <CardHeader>
                  <BookIcon className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
                  <CardTitle className="text-xl font-semibold text-indigo-900 dark:text-white transition-colors duration-300">
                    {t("main.features.accessibility.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-indigo-700 dark:text-indigo-200 transition-colors duration-300">
                    {t("main.features.accessibility.description")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 bg-indigo-50 dark:bg-gray-900 transition-colors duration-500">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:h-full animate-fade-in-left">
                <Image
                  src="/placeholder.svg"
                  alt="Library Interior"
                  layout="fill"
                  className="rounded-lg shadow-2xl"
                />
              </div>
              <div className="flex flex-col justify-center animate-fade-in-right">
                <h2 className="text-3xl font-bold tracking-tight text-indigo-900 dark:text-white sm:text-4xl">
                  {t("main.about.title")}
                </h2>
                <p className="mt-4 text-lg text-indigo-700 dark:text-indigo-200">
                  {t("main.about.description")}
                </p>
                <div className="mt-8">
                  <Button className="bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-300">
                    {t("main.about.learnMore")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-t from-indigo-200 to-blue-100 dark:from-gray-800 dark:to-gray-700 transition-colors duration-500">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-indigo-900 dark:text-white mb-4 transition-colors duration-300">
                {t("footer.aboutUs")}
              </h3>
              <p className="text-indigo-700 dark:text-indigo-200 transition-colors duration-300">
                {t("footer.aboutDescription")}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-indigo-900 dark:text-white mb-4 transition-colors duration-300">
                {t("footer.contact.title")}
              </h3>
              <p className="text-indigo-700 dark:text-indigo-200 transition-colors duration-300">
                {t("footer.contact.address")}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-indigo-900 dark:text-white mb-4 transition-colors duration-300">
                {t("footer.followUs")}
              </h3>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-indigo-700 dark:text-indigo-200 hover:text-indigo-900 dark:hover:text-indigo-100 transition-colors duration-300"
                >
                  {t("footer.socialLinks.facebook")}
                </Link>
                <Link
                  href="#"
                  className="text-indigo-700 dark:text-indigo-200 hover:text-indigo-900 dark:hover:text-indigo-100 transition-colors duration-300"
                >
                  {t("footer.socialLinks.twitter")}
                </Link>
                <Link
                  href="#"
                  className="text-indigo-700 dark:text-indigo-200 hover:text-indigo-900 dark:hover:text-indigo-100 transition-colors duration-300"
                >
                  {t("footer.socialLinks.instagram")}
                </Link>
                <Link
                  href="#"
                  className="text-indigo-700 dark:text-indigo-200 hover:text-indigo-900 dark:hover:text-indigo-100 transition-colors duration-300"
                >
                  {t("footer.socialLinks.linkedIn")}
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-indigo-300 dark:border-gray-600 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mt-4 md:mt-0">
              <p className="text-sm text-indigo-700 dark:text-indigo-200 transition-colors duration-300">
                {t("footer.rights")}
              </p>
              <Link
                href="#"
                className="text-sm text-indigo-700 dark:text-indigo-200 hover:text-indigo-900 dark:hover:text-white transition-colors duration-300"
              >
                {t("footer.terms")}
              </Link>
              <Link
                href="#"
                className="text-sm text-indigo-700 dark:text-indigo-200 hover:text-indigo-900 dark:hover:text-white transition-colors duration-300"
              >
                {t("footer.privacy")}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
