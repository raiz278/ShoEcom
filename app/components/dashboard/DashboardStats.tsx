import prisma from "@/app/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, PartyPopper, ShoppingBag, User2 } from "lucide-react";

async function getData (){

    const [user, products, order] = await Promise.all([
        prisma.user.findMany({
            select: {
                id: true,
            }
        }),
        prisma.product.findMany({
            select: {
                id: true,
            }
        }),
        prisma.order.findMany({
            select: {
                amount: true,
            }
        }),
    ]);
    return {
        user,
        products,
        order
    }
}

export  async function DashboardStats(){
    const {user, products, order} = await getData();

    const totalAmount = order.reduce((accumalator, currentValue) => {
        return accumalator + currentValue.amount;
    },0)
    return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${new Intl.NumberFormat('en-US').format(totalAmount / 100)}</div>
            <p className="text-xs text-muted-foreground">
              Based on 100 Charges
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{order.length}</div>
            <p className="text-xs text-muted-foreground">
              Total Sales on ShoEcom
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <PartyPopper className="h-4 w-4 text-muted-foreground text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">
              Total Products created
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <User2 className="h-4 w-4 text-muted-foreground text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.length}</div>
            <p className="text-xs text-muted-foreground">
              Total Users Signed Up
            </p>
          </CardContent>
        </Card>
      </div>
    )
}