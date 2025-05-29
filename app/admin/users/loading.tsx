import { AdminLayout } from "@/components/admin/layout"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        {/* Header Section Skeleton */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="mt-2 h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="mt-2 h-8 w-16" />
                    </div>
                    <Skeleton className="h-12 w-12 rounded-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Filter Bar Skeleton */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <Skeleton className="h-10 w-full md:w-[400px]" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-10 w-[130px]" />
              <Skeleton className="h-10 w-[130px]" />
              <Skeleton className="h-10 w-[240px]" />
            </div>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-10 w-[130px]" />
              <Skeleton className="h-10 w-[80px]" />
              <Skeleton className="h-10 w-[120px]" />
              <Skeleton className="h-10 w-[80px]" />
            </div>
            <Skeleton className="h-10 w-[120px]" />
          </div>
        </div>

        {/* User Listing Skeleton */}
        <Skeleton className="h-[500px] w-full rounded-md" />

        {/* Load More Section Skeleton */}
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    </AdminLayout>
  )
}
