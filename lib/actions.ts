"use server";
import bcrypt from "bcrypt";
import {
  BooksTable,
  MembersTable,
  ProfessorsTable,
  TransactionsTable,
} from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { IMemberBase, memberBaseSchema } from "./members/member.model";
import { MemberRepository } from "./members/member.repository";
import { redirect } from "next/navigation";
import { BookRepository } from "./books/book.repository";
import { db } from "@/drizzle/drizzleDB";
import { TransactionRepository } from "./transactions/transaction.repository";
import { revalidatePath } from "next/cache";
import { bookBaseSchema, IBook, IBookBase } from "./books/book.model";
import "dotenv/config";
import cloudinary from "@/lib/cloudinary";
import { formatDate, formatTime } from "./utils";
import { SortOptions } from "./repository";
import { ProfessorRepository } from "./professors/professor.repository";
import { professorBaseSchema } from "./professors/professor.model";
import Razorpay from "razorpay";
import { PaymentRepository } from "./payments/payment.repository";
import { IPaymentBase } from "./payments/payment.model";

// Create MySQL pool and connect to the database

export interface State {
  errors?: { [key: string]: string[] };
  message?: string;
  status?: string;
}

const memberRepo = new MemberRepository(db);
const bookRepo = new BookRepository(db);
const transactionRepo = new TransactionRepository(db);
const professorRepo = new ProfessorRepository(db);
const paymentRepo = new PaymentRepository(db);

const CALENDLY_API_TOKEN = process.env.NEXT_PUBLIC_CALENDLY_ACCESS_TOKEN!;

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function createOrder(
  amount: number,
  currency: string,
  receipt: string,
  notes: Record<string, string>
) {
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: currency,
      receipt: receipt,
      notes: notes,
    });

    return { success: true, order };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error: "Error creating order" };
  }
}

export async function fetchUserDetails() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  console.log(session.user);
  if (!session.user) {
    redirect("/login");
  }
  const user = await findUserByEmail(session.user.email!);
  if (!user) {
    redirect("/login");
  }
  const image = session.user.image as string | undefined;
  return { ...user, image };
}

export async function createUser(user: IMemberBase) {
  try {
    const newUser = await memberRepo.create(user);
    if (newUser) {
      console.log(`New user created successfully `);
    }
    return newUser;
  } catch (error) {
    console.error("Error :", error);
    throw new Error("Error during creating user");
  }
}
export async function registerUser(prevState: State, formData: FormData) {
  const validateFields = memberBaseSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phone: Number(formData.get("phone")),
    address: formData.get("address"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: "user",
    image: null,
  });
  const confirmPassword = formData.get("confirm-password");

  if (!validateFields.success) {
    console.log("Failure");
    console.log(validateFields.error);
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Member.",
    };
  }

  const { firstName, lastName, phone, address, email, password, role, image } =
    validateFields.data;

  if (
    !firstName ||
    !lastName ||
    !phone ||
    !address ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    console.log("All fields are required");
    return { message: "All Fields are required" };
  }
  if (password !== confirmPassword) {
    return { message: "Password not matching" };
  }
  try {
    const existingUser = await memberRepo.getByEmail(email);
    if (existingUser) {
      console.log("User already exists.");
      return { message: "User already exists." };
    }
    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser: IMemberBase = {
      firstName,
      lastName,
      phone,
      address,
      role,
      email,
      password: hashedPwd,
      image,
    };

    console.log(newUser);
    const createdUser = await memberRepo.create(newUser);

    console.log(`User ${createdUser.email} created successfully!`);
    return { status: "Success", message: "Login Successful" };
  } catch (error) {
    console.log("Error during registration:", error);
    return { status: "Error", message: "Error during registration:" };
  }
}

export async function updateUserProfile(prevState: State, formData: FormData) {
  console.log("updateUseProfile");
  const validateFields = memberBaseSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phone: Number(formData.get("phone")),
    address: formData.get("address"),
    image: formData.get("image"),
  });
  const id = Number(formData.get("id"));

  if (!validateFields.success) {
    console.log("Failure");
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Member.",
    };
  }

  const { firstName, lastName, phone, address, image } = validateFields.data;

  if (!firstName || !lastName || !phone || !address) {
    console.log("All fields are required");
    return { message: "All Fields are required" };
  }
  try {
    const updatedUser = {
      firstName,
      lastName,
      phone,
      address,
      image,
    };

    console.log("updatedUser", updatedUser);
    const createdUser = await memberRepo.update(id, updatedUser);

    console.log(`User Profile updated successfully!`);
    return { status: "Success", message: "Updated Successful" };
  } catch (error) {
    console.log("Error during registration:", error);
    return { status: "Error", message: "Error during updating profile:" };
  }
}

export async function findUserByEmail(email: string) {
  try {
    const user = await memberRepo.getByEmail(email);
    return user;
  } catch (error: any) {
    throw new Error("Internal server error");
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const result = await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
    });
    if (result) {
      redirect("/");
    }
  } catch (error) {
    if (error instanceof AuthError) {
      console.log("error type: ", error.type);
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Server Error,Try again later";
      }
    }
    throw error;
  }
}

export async function handleLogout() {
  try {
    await signOut({ redirectTo: "/login", redirect: true });
  } catch (error) {
    throw error;
  }
}

export async function fetchFilteredBooks(
  query: string | undefined,
  currentPage: number,
  booksPerPage: number,
  sortOptions?: SortOptions<IBook>
) {
  try {
    const offset = (currentPage - 1) * booksPerPage;
    const books = await bookRepo.list(
      {
        search: query,
        offset: offset,
        limit: booksPerPage,
      },
      sortOptions
    );
    return { books: books.items, totalCount: books.pagination.total };
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}

export async function fetchFilteredProfessors(
  query: string | undefined,
  currentPage: number,
  professorPerPage: number,
  status?: "Accepted" | "Pending"
) {
  try {
    const offset = (currentPage - 1) * professorPerPage;
    const professors = await professorRepo.list(
      {
        search: query,
        offset: offset,
        limit: professorPerPage,
      },
      status
    );
    return {
      professors: professors.items,
      totalCount: professors.pagination.total,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while fetching filtered professors");
  }
}

export async function fetchFilteredMembers(
  query: string | undefined,
  currentPage: number,
  booksPerPage: number
) {
  try {
    const offset = (currentPage - 1) * booksPerPage;
    const members = await memberRepo.list({
      search: query,
      offset: offset,
      limit: booksPerPage,
    });
    return { members: members.items, totalCount: members.pagination.total };
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}

export async function fetchFilteredTransactions(
  query: string | undefined,
  currentPage: number,
  booksPerPage: number
) {
  try {
    const offset = (currentPage - 1) * booksPerPage;
    const transactions = await transactionRepo.list({
      search: query,
      offset: offset,
      limit: booksPerPage,
    });
    return {
      transactions: transactions.items,
      totalCount: transactions.pagination.total,
    };
  } catch (error) {
    console.log("error", error);
    throw new Error("Something went wrong while fetching transaction details");
  }
}

export async function fetchFilteredRequest(
  query: string | undefined,
  currentPage: number,
  booksPerPage: number
) {
  try {
    const offset = (currentPage - 1) * booksPerPage;
    const requests = await transactionRepo.requestList({
      search: query,
      offset: offset,
      limit: booksPerPage,
    });
    return {
      requests: requests.items,
      totalCount: requests.pagination.total,
    };
  } catch (error) {
    console.log("error", error);
    throw new Error("Something went wrong while fetching request details");
  }
}

// export async function fetchBookPageCount(query: string, bookPerPage: number) {
//   try {
//     const totalCount = await bookRepo.pageCount(query, bookPerPage);
//     return totalCount;
//   } catch (error: any) {
//     console.error(error);
//     throw new Error("Internal server error");
//   }
// }

export async function handleDeleteBook(id: number) {
  try {
    const book = await bookRepo.delete(id);
    revalidatePath("/admin/book");
    return {
      success: true,
      message: `Book ${book?.title} deleted successfully`,
    };
  } catch (error: any) {
    console.error(error);
    return {
      error: true,
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function handleDeleteMember(id: number) {
  try {
    const member = await memberRepo.delete(id);
    revalidatePath("/admin/member");
    return {
      success: true,
      message: `Member ${member?.firstName} ${member?.lastName} deleted successfully`,
    };
  } catch (error: any) {
    console.error(error);
    return {
      error: true,
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function handleDeleteProfessor(id: number) {
  try {
    const professor = await removeProfessorFromOrganization(id);
    revalidatePath("/admin/professor");
    return {
      success: true,
      message: `Professor deleted successfully`,
    };
  } catch (error: any) {
    console.error(error);
    return {
      error: true,
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function handleDeleteTransaction(id: number) {
  try {
    const transaction = await transactionRepo.delete(id);
    revalidatePath("/admin/transactions");
    return {
      success: true,
      message: `Transaction Id ${transaction?.id} deleted successfully`,
    };
  } catch (error: any) {
    console.error(error);
    return {
      error: true,
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function addBook(prevState: State, formData: FormData) {
  console.log("Starting addBook function");

  const validateFields = bookBaseSchema.safeParse({
    title: formData.get("title"),
    author: formData.get("author"),
    publisher: formData.get("publisher"),
    genre: formData.get("genre"),
    totalCopies: Number(formData.get("totalCopies")),
    pages: Number(formData.get("pages")),
    isbnNo: formData.get("isbnNo"),
    price: Number(formData.get("price")),
  });

  const image = formData.get("imageURL") as string;
  if (!validateFields.success) {
    console.log("Validation failed:", validateFields.error);
    return {
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const { title, author, publisher, genre, pages, isbnNo, totalCopies, price } =
    validateFields.data;

  if (
    !title ||
    !author ||
    !publisher ||
    !isbnNo ||
    !genre ||
    !pages ||
    !totalCopies ||
    !price
  ) {
    console.log("All fields are required");
    return { message: "All Fields are required" };
  }
  try {
    const newBook: IBookBase = {
      title,
      author,
      publisher,
      genre,
      totalCopies,
      isbnNo,
      pages,
      price,
      image,
    };

    console.log("New book data:", newBook);

    const createdBook = await bookRepo.create(newBook);
    console.log("Created book:", createdBook);
    revalidatePath("/admin/books");
    return {
      status: "Success",
      message: `Book ${createdBook.title} added successfully!`,
    };
  } catch (error) {
    console.log("Error during adding book:", error);
    return { status: "Error", message: "Error during adding book...." };
  }
}

export async function editBook(prevState: State, formData: FormData) {
  const validateFields = bookBaseSchema.safeParse({
    title: formData.get("title"),
    author: formData.get("author"),
    publisher: formData.get("publisher"),
    genre: formData.get("genre"),
    totalCopies: Number(formData.get("totalCopies")),
    pages: Number(formData.get("pages")),
    isbnNo: formData.get("isbnNo"),
    price: Number(formData.get("price")),
  });
  const id = Number(formData.get("id"));
  const image = formData.get("imageURL") as string;
  if (!validateFields.success) {
    console.log("Failure");
    console.log(validateFields.error);
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Encountered error during validating data",
    };
  }

  const { title, author, publisher, genre, pages, isbnNo, totalCopies, price } =
    validateFields.data;
  if (
    !title ||
    !author ||
    !publisher ||
    !isbnNo ||
    !genre ||
    !pages ||
    !totalCopies ||
    !price
  ) {
    console.log("All fields are required");
    return { message: "All Fields are required" };
  }
  try {
    const updateBook: IBookBase = {
      title,
      author,
      publisher,
      genre,
      totalCopies,
      isbnNo,
      pages,
      price,
      image,
    };

    console.log(updateBook);
    const updatedBook = await bookRepo.update(id, updateBook);
    if (!updatedBook)
      return {
        status: "Error",
        message: "Something went wrong, try again....",
      };
    console.log(`Book ${updatedBook.title} updated successfully!`);
    revalidatePath("/admin/books");
    return {
      status: "Success",
      message: `Book ${updatedBook.title} updated successfully!`,
    };
  } catch (error) {
    console.log("Error during editing book:", error);
    return { status: "Error", message: "Failed to update book...." };
  }
}

export async function addMember(prevState: State, formData: FormData) {
  const validateFields = memberBaseSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    role: formData.get("role"),
    phone: Number(formData.get("phone")),
    address: formData.get("address"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  const image = formData.get("imageURL") as string;
  if (!validateFields.success) {
    console.log("Failure");
    console.log(validateFields.error);
    return {
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const { firstName, lastName, email, password, address, phone, role } =
    validateFields.data;
  if (
    !firstName ||
    !lastName ||
    !role ||
    !password ||
    !address ||
    !phone ||
    !email
  ) {
    console.log("All fields are required");
    return { message: "All Fields are required" };
  }
  try {
    const existingUser = await memberRepo.getByEmail(email);
    if (existingUser) {
      console.log("User already exists.");
      return { status: "Error", message: "User already exists." };
    }
    const hashedPwd = await bcrypt.hash(password, 10);

    const newMember: IMemberBase = {
      firstName,
      lastName,
      email,
      phone,
      password: hashedPwd,
      role,
      address,
      image,
    };

    console.log(newMember);
    const createdMember = await memberRepo.create(newMember);

    console.log(
      `Member ${createdMember.firstName} ${createdMember.lastName} Added successfully!`
    );
    return {
      status: "Success",
      message: `Member ${createdMember.firstName} ${createdMember.lastName} Added successfully!`,
    };
  } catch (error) {
    console.log("Error during adding member:", error);
    return { status: "Error", message: "Something went wrong...." };
  }
}

export async function editMember(prevState: State, formData: FormData) {
  const validateFields = memberBaseSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    role: formData.get("role"),
    phone: Number(formData.get("phone")),
    address: formData.get("address"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  const id = Number(formData.get("id"));
  const image = formData.get("imageURL") as string;
  if (!validateFields.success) {
    console.log("Failure");
    console.log(validateFields.error);
    return {
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const { firstName, lastName, email, password, address, phone, role } =
    validateFields.data;
  if (
    !firstName ||
    !lastName ||
    !role ||
    !password ||
    !address ||
    !phone ||
    !email
  ) {
    console.log("All fields are required");
    return { message: "All Fields are required" };
  }
  try {
    const updateMember = {
      firstName,
      lastName,
      email,
      phone,
      password,
      role,
      address,
      image,
    };

    console.log(updateMember);
    const updatedMember = await memberRepo.update(id, updateMember);
    if (!updatedMember) return { error: "Something went wrong, try again...." };
    console.log(
      `Member ${updatedMember.firstName} ${updatedMember.lastName} updated successfully!`
    );
    revalidatePath("/admin/members");
    return {
      status: "Success",
      message: `Member ${updatedMember.firstName} ${updatedMember.lastName} updated successfully!`,
    };
  } catch (error) {
    console.log("Error during editing member:", error);
    return { status: "Error", message: "Something went wrong...." };
  }
}

export async function fetchBookById(id: number) {
  try {
    const book = await bookRepo.getById(id);
    if (!book) {
      throw new Error("Book Not Found");
    }
    return book;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong...");
  }
}

export async function fetchProfessorById(id: number) {
  try {
    const professor = await professorRepo.getById(id);
    if (!professor) {
      throw new Error("Professor Not Found");
    }
    return professor;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while fetching professor details");
  }
}

export async function fetchMemberById(id: number) {
  try {
    const member = await memberRepo.getById(id);
    if (!member) {
      throw new Error("Member Not Found");
    }
    return member;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong...");
  }
}

export async function fetchUniqueGenre() {
  const books = (await bookRepo.list({ offset: 0, limit: 9999 })).items;
  const uniqueGenre = new Set(books.map((book) => book.genre));
  return uniqueGenre;
}

export async function handleRequestAccept(bookId: number, requestId: number) {
  try {
    const bookDetails = await bookRepo.getById(bookId);
    if (!bookDetails)
      return {
        status: "Error",
        message:
          "Unable to process request: The specified book could not be found.",
      };
    if (bookDetails.availableCopies > 0) {
      await db
        .update(TransactionsTable)
        .set({ status: "Issued" })
        .where(eq(TransactionsTable.id, requestId));
      await db
        .update(BooksTable)
        .set({ availableCopies: bookDetails.availableCopies - 1 })
        .where(eq(BooksTable.id, bookDetails.id));
      revalidatePath("/admin/requests");
    } else {
      return { status: "Error", message: "Book is not Available" };
    }
  } catch (error) {
    console.error(error);
    return { status: "Error", message: "Something went wrong, try again" };
  }
}

export async function handleRequestReject(requestId: number) {
  try {
    await db
      .update(TransactionsTable)
      .set({ status: "Rejected" })
      .where(eq(TransactionsTable.id, requestId));
    revalidatePath("/admin/requests");
  } catch (error) {
    console.error(error);
    return { status: "Error", message: "Something went wrong, try again" };
  }
}

export async function fetchMyTransactions(userId: number) {
  try {
    const myTransactions = await transactionRepo.listMyTransaction(userId);
    return myTransactions;
  } catch (error) {
    throw new Error("Something went wrong while fetching your transactions.");
  }
}

export async function fetchMyBooks(
  query: string | undefined,
  currentPage: number,
  booksPerPage: number,
  userId: number
) {
  try {
    const offset = (currentPage - 1) * booksPerPage;
    // const params = {search: query, offset: offset, limit: booksPerPage}
    const myBooks = await bookRepo.listMyBook(
      {
        search: query,
        offset: offset,
        limit: booksPerPage,
      },
      userId
    );
    return {
      books: myBooks.items,
      totalCount: myBooks.pagination.total,
    };
  } catch (error) {
    console.log("error", error);
    throw new Error("Something went wrong while fetching your books.");
  }
}

export async function borrowBook(bookId: number, memberId: number) {
  try {
    const borrowedBook = await transactionRepo.create({
      bookId,
      memberId,
      borrowDate: formatDate(new Date()),
      dueDate: formatDate(
        new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000)
      ),
    });
    return {
      status: "Success",
      message: "Book Requested Successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: "Error",
      message:
        "Unable to borrow the book at this time. Please try again later.",
    };
  }
}

export async function fetchBookStats(userId: number) {
  try {
    const totalBorrowed = await transactionRepo.totalBorrowed(userId);
    const totalReturned = await transactionRepo.totalReturned(userId);
    const data = await Promise.all([totalBorrowed, totalReturned]);
    return {
      totalBorrowed: Number(data[0] ?? 0),
      totalReturned: Number(data[1] ?? 0),
    };
  } catch (error) {
    console.log("database error: ", error);
    throw new Error("Failed to fetch book stats.");
  }
}

export async function fetchDashboardData() {
  try {
    const totalUsers = await memberRepo.totalMembers();
    const totalBooks = await bookRepo.totalBooks();
    const pendingRequests = await transactionRepo.pendingRequests();
    const totalTransactions = await transactionRepo.totalTransactions();
    const data = await Promise.all([
      totalUsers,
      totalBooks,
      pendingRequests,
      totalTransactions,
    ]);
    const numberOfUsers = Number(data[0] ?? "0");
    const numberOfBooks = Number(data[1] ?? "0");
    const pendingRequest = Number(data[2] ?? "0");
    const numberOfTransactions = Number(data[3] ?? "0");
    return {
      numberOfUsers,
      numberOfBooks,
      pendingRequest,
      numberOfTransactions,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}

export async function fetchMyRequest(
  query: string | undefined,
  currentPage: number,
  booksPerPage: number,
  userId: number
) {
  try {
    const offset = (currentPage - 1) * booksPerPage;
    // const params = {search: query, offset: offset, limit: booksPerPage}
    const myRequests = await transactionRepo.listMyRequest(
      {
        search: query,
        offset: offset,
        limit: booksPerPage,
      },
      userId
    );
    return {
      requests: myRequests.items,
      totalCount: myRequests.pagination.total,
    };
  } catch (error) {
    console.log("error", error);
    throw new Error("Something went wrong while fetching your books.");
  }
}

export async function handleReturnBook(id: number) {
  try {
    const returnDate = formatDate(new Date());
    const result = await transactionRepo.update(id, returnDate);
    return {
      success: true,
      message: `Book Returned Successfully`,
    };
  } catch (error: any) {
    console.error(error);
    return {
      error: true,
      message: "Book return failed, Please try again.",
    };
  } finally {
    revalidatePath("/admin/transactions");
  }
}

export async function uploadImage(file: File) {
  if (!file) return { imageURL: "" };

  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "book_covers" },
        (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      const reader = file.stream().getReader();
      const pump = async () => {
        const { done, value } = await reader.read();
        if (done) {
          uploadStream.end();
        } else {
          uploadStream.write(value);
          pump();
        }
      };
      pump();
    });

    if (result && typeof result === "object" && "secure_url" in result) {
      return { imageURL: result.secure_url as string };
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return { error: "Failed to upload image. Please try again." };
  }

  return { imageURL: "" };
}

interface IAppointment {
  date: string;
  time: string;
  status: string;
  eventName: string;
  professorName: string;
  meetingUrl: string;
  uri: string;
}

export async function getOrganizationUri() {
  try {
    const response = await fetch("https://api.calendly.com/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${CALENDLY_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching user info: ${response.statusText}`);
    }

    const data = await response.json();
    return data.resource.current_organization;
  } catch (error) {
    console.error("Error fetching organization URI", error);
    throw error;
  }
}

export async function getUsersAppointments(
  email: string
): Promise<IAppointment[]> {
  try {
    const userUri = await getOrganizationUri();
    const currentTime = new Date().toISOString();
    const futureTime = new Date(
      new Date().getTime() + 14 * 24 * 60 * 60 * 1000
    ).toISOString();
    const url = `https://api.calendly.com/scheduled_events?organization=${userUri}&min_start_time=${currentTime} &max_start_time=${futureTime}&invitee_email=${email}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${CALENDLY_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching user info: ${response.statusText}`);
    }

    const data = await response.json();

    const appointments = data.collection.map((info: any) => {
      const data = {
        date: new Date(info.start_time).toLocaleDateString(),
        time: `${formatTime(new Date(info.start_time))} - ${formatTime(
          new Date(info.end_time)
        )} `,
        status: info.status,
        eventName: info.name,
        professorName: info.event_memberships[0].user_name,
        meetingUrl: info.location.join_url,
        uri: info.uri.split("/")[4],
      };
      return data;
    });
    return appointments;
  } catch (error) {
    console.error("Error fetching user URI", error);
    throw error;
  }
}

export async function cancelAppointments(event_uuid: string) {
  try {
    const response = await fetch(
      `https://api.calendly.com/scheduled_events/${event_uuid}/cancellation`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${CALENDLY_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reason: "User canceled the event",
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Error fetching scheduled events:", errorText);
      throw new Error(`Error fetching Calendly events: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Canceled Data", data);
    return data;
  } catch (error) {
    console.error("Failed to cancel appointment");
  } finally {
    revalidatePath("/dashboard/appointments");
  }
}

export async function rescheduleAppointments(event_uuid: string) {
  try {
    const response = await fetch(
      `https://api.calendly.com/scheduled_events/${event_uuid}/invitees`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${CALENDLY_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Error fetching scheduled events:", errorText);
      throw new Error(`Error fetching Calendly events: ${response.statusText}`);
    }

    const data = await response.json();
    return data.collection[0].reschedule_url;
  } catch (error) {
    console.error("Failed to reschedule appointment");
  } finally {
    revalidatePath("/dashboard/appointments");
  }
}

export async function handleInviteProfessor(email: string) {
  try {
    const uuid = await getOrganizationUri();
    console.log("uuid:", uuid.split("/")[4]);
    const response = await fetch(
      `https://api.calendly.com/organizations/${
        uuid.split("/")[4]
      }/invitations`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${CALENDLY_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }
    const data = await response.json();

    console.log("Invitation response:", data);
    return data;
  } catch (error: any) {
    console.error("Full error object:", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Error response:", error.response);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Error request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error message:", error.message);
    }
    throw new Error(
      error.response?.data?.message || "Error sending invitation"
    );
  }
}

export async function handleCalendlyWebhook(payload: any) {
  console.log("payload:", payload);
  if (
    payload.event === "invitee.created" &&
    payload.payload.status === "active"
  ) {
    try {
      const newProfessor = await db
        .insert(ProfessorsTable)
        .values({
          name: payload.payload.name,
          email: payload.payload.email,
          department: "Not specified",
          bio: "",
          calendlyLink: payload.payload.scheduling_url || "",
        })
        .returning();

      console.log("New professor added:", newProfessor[0]);
      return {
        message: "Professor added successfully",
        professor: newProfessor[0],
      };
    } catch (error) {
      console.error("Error adding professor:", error);
      throw new Error("Error adding professor to database");
    }
  }

  return { message: "Webhook received" };
}

export async function addProfessor(formData: FormData) {
  const validatedFields = professorBaseSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    department: formData.get("department"),
    bio: formData.get("bio"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, department, bio } = validatedFields.data;

  try {
    // Check if the email already exists
    const existingProfessor = await professorRepo.getByEmail(email);

    if (existingProfessor) {
      return {
        success: false,
        errors: {
          email: ["This email is already associated with a professor"],
        },
      };
    }

    const newProfessor = await professorRepo.create({
      name,
      email,
      department,
      bio: bio || "",
    });

    await handleInviteProfessor(email);

    return { success: true };
  } catch (error) {
    console.error("Failed to add professor:", error);
    return { success: false, errors: { form: ["Failed to add professor"] } };
  }
}

export async function refreshProfessors() {
  try {
    const pendingProfessors = await professorRepo.getPendingProfessors();
    if (pendingProfessors.length === 0) {
      return { success: true };
    }

    const organizationUri = await getOrganizationUri();
    const uuid = organizationUri.split("/")[4];

    for (const professor of pendingProfessors) {
      const invitation = await getCalendlyInvitation(uuid, professor.email!);

      if (invitation) {
        const updatedProfessor = await professorRepo.update(professor.id, {
          calendlyLink: invitation,
          inviteStatus: "Accepted",
        });
      }
    }
    return { success: true };
  } catch (error) {
    console.error("Error refreshing professors:", error);
    return { success: false, error: "Failed to refresh professors" };
  }
}

async function getCalendlyInvitation(
  uuid: string,
  email: string
): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.calendly.com/organizations/${uuid}/invitations?email=${email}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${CALENDLY_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    const userInvitation =
      responseData.collection[responseData.collection.length - 1];

    if (userInvitation.status === "accepted") {
      const userUuid = userInvitation.user.split("/")[4];
      const userData = await fetch(
        `https://api.calendly.com/users/${userUuid}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${CALENDLY_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await userData.json();
      return data.resource.scheduling_url;
    }
    return null;
  } catch (error) {
    console.error("Error fetching Calendly invitations:", error);
    throw new Error("Error fetching Calendly invitations");
  }
}

export async function fetchMembershipUuid(email: string) {
  try {
    console.log("email while deleting", email);
    const orgUri = await getOrganizationUri();
    const response = await fetch(
      `https://api.calendly.com/organization_memberships?organization=${encodeURIComponent(
        orgUri
      )}&email=${encodeURIComponent(email)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${CALENDLY_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching membership UUID: ${response.statusText}`);
    }
    const data = await response.json();
    const membership = data.collection[0]; // Assuming the first entry is the required one
    return membership.uri.split("/").pop();
  } catch (error) {
    console.error("Error fetching membership UUID", error);
    throw error;
  }
}
export async function removeProfessorFromOrganization(professorId: number) {
  try {
    // Step 1: Fetch the professor from the database to get their email or UUID
    const professor = await professorRepo.getById(professorId);
    if (!professor) throw new Error("Professor not found");
    // Step 2: Fetch the organization membership UUID from Calendly
    const membershipUuid = await fetchMembershipUuid(professor.email);
    // Step 3: Call the Calendly API to remove the professor from the organization
    const response = await fetch(
      `https://api.calendly.com/organization_memberships/${membershipUuid}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CALENDLY_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to remove professor from organization:`);
    }
    // Step 4: After successful deletion, remove the professor from the database
    const deletedProfessor = await professorRepo.delete(professorId);
    return {
      success: true,
      message: "Professor successfully removed from organization and database",
      deletedProfessor,
    };
  } catch (error: any) {
    console.error("Error removing professor:", error);
    return {
      success: false,
      error: error.message || "Failed to remove professor",
    };
  } finally {
    revalidatePath("/admin/professors");
  }
}

export async function createPayment(data: IPaymentBase) {
  try {
    const payment = await paymentRepo.create(data);
    return { success: true, payment };
  } catch (error) {
    console.error("Error creating payment:", error);
    return { success: false, error: "Error creating payment" };
  }
}

export async function checkPaymentStatus(
  professorId: number,
  memberId: number
) {
  try {
    const paymentId = await paymentRepo.getByProfessorIdAndMemberId(
      professorId,
      memberId
    );
    if (paymentId) return { success: true, paymentId };
    else return { success: false };
  } catch (error) {
    console.error("Error checking payment status:", error);
    return { success: false, error: "Error checking payment status" };
  }
}

export async function updatePaymentWithAppointment(
  paymentId: number,
  appointmentUuid: string
) {
  try {
    await paymentRepo.update(paymentId, { appointmentId: appointmentUuid });
    return { success: true };
  } catch (error) {
    console.error("Error updating payment with appointment:", error);
  }
}
