import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Users,
  RepeatIcon,
  AlertCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export interface DashboardDataProps {
  numberOfUsers: number;
  numberOfBooks: number;
  pendingRequest: number;
  numberOfTransactions: number;
}
export default function DashboardView({ data }: { data: DashboardDataProps }) {
  const stats = [
    {
      title: "Total Users",
      value: data.numberOfUsers,
      icon: <Users className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Total Books",
      value: data.numberOfBooks,
      icon: <BookOpen className="h-8 w-8 text-green-500" />,
    },
    {
      title: "Unattended Requests",
      value: data.pendingRequest,
      icon: <AlertCircle className="h-8 w-8 text-yellow-500" />,
    },
    {
      title: "Recent Transactions",
      value: data.numberOfTransactions,
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
      {/* <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Popular Books</CardTitle>
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
      </div> */}
    </div>
  );
}
