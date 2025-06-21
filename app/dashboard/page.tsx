"use client"

import { useSession } from "next-auth/react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Pizza, TrendingUp, Users, Clock } from "lucide-react"

export default function DashboardPage() {
  const { data: session } = useSession()

  const stats = [
    {
      name: "Total Orders",
      value: "1,234",
      icon: Pizza,
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      name: "Active Customers",
      value: "892",
      icon: Users,
      change: "+8%",
      changeType: "positive" as const,
    },
    {
      name: "Avg. Delivery Time",
      value: "28 min",
      icon: Clock,
      change: "-3 min",
      changeType: "positive" as const,
    },
    {
      name: "Revenue Growth",
      value: "23.5%",
      icon: TrendingUp,
      change: "+4.2%",
      changeType: "positive" as const,
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Hello, {session?.user?.name || "User"}! 👋</h1>
          <p className="text-orange-100 text-lg">
            Welcome back to your pizza dashboard. Here's what's happening with your orders today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.name}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks you might want to perform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 rounded-lg border p-4">
                <Pizza className="h-8 w-8 text-orange-500" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">View Pizza Orders</p>
                  <p className="text-sm text-muted-foreground">Check all your pizza orders and their status</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 rounded-lg border p-4">
                <TrendingUp className="h-8 w-8 text-green-500" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Sales Analytics</p>
                  <p className="text-sm text-muted-foreground">View detailed sales reports and trends</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from your pizza business</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Order #PZA123 delivered</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">New order #PZA124 received</p>
                  <p className="text-xs text-muted-foreground">5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Order #PZA122 out for delivery</p>
                  <p className="text-xs text-muted-foreground">12 minutes ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
