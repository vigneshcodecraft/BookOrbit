import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Users,
  RepeatIcon,
  AlertCircle,
  Clock,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  Search,
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
  BarChart2,
  BookMarked,
} from "lucide-react";

// Mock API functions (unchanged)
const fetchDashboardData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalUsers: 1234,
        totalBooks: 5678,
        unattendedRequests: 23,
        recentTransactions: 45,
        popularBooks: [
          { title: "To Kill a Mockingbird", count: 42 },
          { title: "1984", count: 38 },
          { title: "Pride and Prejudice", count: 35 },
        ],
        userGrowth: 5.2,
        bookGrowth: -1.8,
      });
    }, 500);
  });
};

const fetchBooks = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          isbn: "9780446310789",
          status: "Available",
        },
        {
          id: 2,
          title: "1984",
          author: "George Orwell",
          isbn: "9780451524935",
          status: "Borrowed",
        },
        {
          id: 3,
          title: "Pride and Prejudice",
          author: "Jane Austen",
          isbn: "9780141439518",
          status: "Available",
        },
        {
          id: 4,
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          isbn: "9780743273565",
          status: "Borrowed",
        },
        {
          id: 5,
          title: "Moby-Dick",
          author: "Herman Melville",
          isbn: "9780142437247",
          status: "Available",
        },
      ]);
    }, 500);
  });
};

const fetchMembers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          membershipId: "M001",
          status: "Active",
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          membershipId: "M002",
          status: "Inactive",
        },
        {
          id: 3,
          name: "Bob Johnson",
          email: "bob@example.com",
          membershipId: "M003",
          status: "Active",
        },
        {
          id: 4,
          name: "Alice Brown",
          email: "alice@example.com",
          membershipId: "M004",
          status: "Active",
        },
        {
          id: 5,
          name: "Charlie Davis",
          email: "charlie@example.com",
          membershipId: "M005",
          status: "Suspended",
        },
      ]);
    }, 500);
  });
};

const fetchTransactions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          book: "To Kill a Mockingbird",
          member: "John Doe",
          type: "Borrow",
          date: "2023-05-01",
          status: "On Time",
        },
        {
          id: 2,
          book: "1984",
          member: "Jane Smith",
          type: "Return",
          date: "2023-05-02",
          status: "Late",
        },
        {
          id: 3,
          book: "Pride and Prejudice",
          member: "Bob Johnson",
          type: "Borrow",
          date: "2023-05-03",
          status: "On Time",
        },
        {
          id: 4,
          book: "The Great Gatsby",
          member: "Alice Brown",
          type: "Borrow",
          date: "2023-05-04",
          status: "On Time",
        },
        {
          id: 5,
          book: "Moby-Dick",
          member: "Charlie Davis",
          type: "Return",
          date: "2023-05-05",
          status: "On Time",
        },
      ]);
    }, 500);
  });
};

export default function Dashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const [dashboardData, setDashboardData] = useState(null);
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  const sidebarItems = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
      value: "dashboard",
    },
    { icon: <BookOpen className="h-5 w-5" />, label: "Books", value: "books" },
    { icon: <Users className="h-5 w-5" />, label: "Members", value: "members" },
    {
      icon: <RepeatIcon className="h-5 w-5" />,
      label: "Transactions",
      value: "transactions",
    },
    {
      icon: <AlertCircle className="h-5 w-5" />,
      label: "Requests",
      value: "requests",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      label: "Due Today",
      value: "dueToday",
    },
    { icon: <Clock className="h-5 w-5" />, label: "Overdue", value: "overdue" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [dashboardData, books, members, transactions] = await Promise.all(
          [
            fetchDashboardData(),
            fetchBooks(),
            fetchMembers(),
            fetchTransactions(),
          ]
        );
        setDashboardData(dashboardData);
        setBooks(books);
        setMembers(members);
        setTransactions(transactions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white ${
          isSidebarCollapsed ? "w-16" : "w-64"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          {!isSidebarCollapsed && (
            <h2 className="text-xl font-semibold">Library Admin</h2>
          )}
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {isSidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
        <nav className="p-2">
          {sidebarItems.map((item) => (
            <Button
              key={item.value}
              variant={activeView === item.value ? "secondary" : "ghost"}
              className={`w-full justify-start mb-1 ${
                isSidebarCollapsed ? "px-2" : "px-4"
              }`}
              onClick={() => setActiveView(item.value)}
            >
              {item.icon}
              {!isSidebarCollapsed && (
                <span className="ml-2">{item.label}</span>
              )}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900 capitalize">
              {activeView}
            </h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <AlertCircle className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="John Doe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="profile">Profile</SelectItem>
                  <SelectItem value="settings">Settings</SelectItem>
                  <SelectItem value="logout">Logout</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <>
              {activeView === "dashboard" && (
                <DashboardView data={dashboardData} />
              )}
              {activeView === "books" && (
                <BooksView books={books} setBooks={setBooks} />
              )}
              {activeView === "members" && (
                <MembersView members={members} setMembers={setMembers} />
              )}
              {activeView === "transactions" && (
                <TransactionsView
                  transactions={transactions}
                  setTransactions={setTransactions}
                />
              )}
              {/* Add other views here */}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function DashboardView({ data }) {
  const stats = [
    {
      title: "Total Users",
      value: data.totalUsers,
      icon: <Users className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Total Books",
      value: data.totalBooks,
      icon: <BookOpen className="h-8 w-8 text-green-500" />,
    },
    {
      title: "Unattended Requests",
      value: data.unattendedRequests,
      icon: <AlertCircle className="h-8 w-8 text-yellow-500" />,
    },
    {
      title: "Recent Transactions",
      value: data.recentTransactions,
      icon: <RepeatIcon className="h-8 w-8 text-purple-500" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Popular Books</CardTitle>
            <CardDescription>
              Top 3 most borrowed books this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.popularBooks.map((book, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{book.title}</span>
                  <Badge variant="secondary">{book.count} borrows</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Growth Statistics</CardTitle>
            <CardDescription>Month-over-month growth</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-500" />
                <span>User Growth</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-1 text-green-500" />
                <span className="text-green-500">{data.userGrowth}%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-green-500" />
                <span>Book Acquisition</span>
              </div>
              <div className="flex items-center">
                <TrendingDown className="h-5 w-5 mr-1 text-red-500" />
                <span className="text-red-500">{data.bookGrowth}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function BooksView({ books, setBooks }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredBooks = books.filter(
    (book) =>
      (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.includes(searchTerm)) &&
      (statusFilter === "all" ||
        book.status.toLowerCase() === statusFilter.toLowerCase())
  );

  const handleDelete = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Inventory</CardTitle>
        <CardDescription>Manage your library's book collection</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search books"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="borrowed">Borrowed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Book
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        book.status === "Available" ? "success" : "secondary"
                      }
                    >
                      {book.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(book.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-center mt-4">
          <Button variant="outline" className="mx-1">
            Previous
          </Button>
          <Button variant="outline" className="mx-1">
            1
          </Button>
          <Button variant="outline" className="mx-1">
            2
          </Button>
          <Button variant="outline" className="mx-1">
            3
          </Button>
          <Button variant="outline" className="mx-1">
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function MembersView({ members, setMembers }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredMembers = members.filter(
    (member) =>
      (member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.membershipId.includes(searchTerm)) &&
      (statusFilter === "all" ||
        member.status.toLowerCase() === statusFilter.toLowerCase())
  );

  const handleDelete = (id) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Member Management</CardTitle>
        <CardDescription>View and manage library members</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search members"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Member
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Membership ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.membershipId}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        member.status === "Active"
                          ? "success"
                          : member.status === "Inactive"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(member.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-center mt-4">
          <Button variant="outline" className="mx-1">
            Previous
          </Button>
          <Button variant="outline" className="mx-1">
            1
          </Button>
          <Button variant="outline" className="mx-1">
            2
          </Button>
          <Button variant="outline" className="mx-1">
            3
          </Button>
          <Button variant="outline" className="mx-1">
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function TransactionsView({ transactions, setTransactions }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredTransactions = transactions.filter(
    (transaction) =>
      (transaction.book.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.member.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.date.includes(searchTerm)) &&
      (typeFilter === "all" ||
        transaction.type.toLowerCase() === typeFilter.toLowerCase())
  );

  const handleDelete = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>View and manage book transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search transactions"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="borrow">Borrow</SelectItem>
                <SelectItem value="return">Return</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Transaction
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book</TableHead>
                <TableHead>Member</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.book}</TableCell>
                  <TableCell>{transaction.member}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        transaction.status === "On Time"
                          ? "success"
                          : "destructive"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(transaction.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-center mt-4">
          <Button variant="outline" className="mx-1">
            Previous
          </Button>
          <Button variant="outline" className="mx-1">
            1
          </Button>
          <Button variant="outline" className="mx-1">
            2
          </Button>
          <Button variant="outline" className="mx-1">
            3
          </Button>
          <Button variant="outline" className="mx-1">
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
