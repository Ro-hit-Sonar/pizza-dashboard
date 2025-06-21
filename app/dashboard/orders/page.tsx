"use client"

import { useState, useMemo } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ArrowUpDown } from "lucide-react"

// Mock data for pizza orders
const mockOrders = [
  {
    id: "PZA001",
    customerName: "John Doe",
    pizzaType: "Margherita",
    quantity: 2,
    orderDate: "2024-01-15 14:30",
    status: "Delivered",
  },
  {
    id: "PZA002",
    customerName: "Jane Smith",
    pizzaType: "Pepperoni",
    quantity: 1,
    orderDate: "2024-01-15 15:45",
    status: "Out for Delivery",
  },
  {
    id: "PZA003",
    customerName: "Mike Johnson",
    pizzaType: "Veggie Supreme",
    quantity: 3,
    orderDate: "2024-01-15 16:20",
    status: "Preparing",
  },
  {
    id: "PZA004",
    customerName: "Sarah Wilson",
    pizzaType: "Hawaiian",
    quantity: 1,
    orderDate: "2024-01-15 17:10",
    status: "Pending",
  },
  {
    id: "PZA005",
    customerName: "David Brown",
    pizzaType: "Meat Lovers",
    quantity: 2,
    orderDate: "2024-01-15 18:00",
    status: "Cancelled",
  },
  {
    id: "PZA006",
    customerName: "Emily Davis",
    pizzaType: "BBQ Chicken",
    quantity: 1,
    orderDate: "2024-01-15 18:30",
    status: "Delivered",
  },
  {
    id: "PZA007",
    customerName: "Chris Miller",
    pizzaType: "Four Cheese",
    quantity: 2,
    orderDate: "2024-01-15 19:15",
    status: "Preparing",
  },
  {
    id: "PZA008",
    customerName: "Lisa Anderson",
    pizzaType: "Margherita",
    quantity: 1,
    orderDate: "2024-01-15 19:45",
    status: "Pending",
  },
]

type SortField = "id" | "customerName" | "orderDate" | "status"
type SortDirection = "asc" | "desc"

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortField, setSortField] = useState<SortField>("orderDate")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      Pending: { variant: "secondary" as const, className: "bg-yellow-100 text-yellow-800" },
      Preparing: { variant: "secondary" as const, className: "bg-blue-100 text-blue-800" },
      "Out for Delivery": { variant: "secondary" as const, className: "bg-purple-100 text-purple-800" },
      Delivered: { variant: "secondary" as const, className: "bg-green-100 text-green-800" },
      Cancelled: { variant: "secondary" as const, className: "bg-red-100 text-red-800" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.Pending

    return (
      <Badge variant={config.variant} className={config.className}>
        {status}
      </Badge>
    )
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredAndSortedOrders = useMemo(() => {
    const filtered = mockOrders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.pizzaType.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || order.status === statusFilter

      return matchesSearch && matchesStatus
    })

    return filtered.sort((a, b) => {
      let aValue: string | number = a[sortField]
      let bValue: string | number = b[sortField]

      if (sortField === "orderDate") {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      }

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = (bValue as string).toLowerCase()
      }

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })
  }, [searchTerm, statusFilter, sortField, sortDirection])

  const statusCounts = useMemo(() => {
    return mockOrders.reduce(
      (acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )
  }, [])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Pizza Orders</h1>
          <p className="text-muted-foreground">Manage and track all your pizza orders in one place</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockOrders.length}</div>
            </CardContent>
          </Card>
          {Object.entries(statusCounts).map(([status, count]) => (
            <Card key={status}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{status}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{count}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>A list of all pizza orders with their current status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-full md:w-[300px]"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Preparing">Preparing</SelectItem>
                    <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-muted-foreground">
                Showing {filteredAndSortedOrders.length} of {mockOrders.length} orders
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort("id")} className="h-auto p-0 font-semibold">
                        Order ID
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("customerName")}
                        className="h-auto p-0 font-semibold"
                      >
                        Customer Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Pizza Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("orderDate")}
                        className="h-auto p-0 font-semibold"
                      >
                        Order Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort("status")} className="h-auto p-0 font-semibold">
                        Status
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.pizzaType}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{order.orderDate}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filteredAndSortedOrders.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No orders found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
