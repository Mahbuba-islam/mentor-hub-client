import { tutorService } from "@/src/services/tutor.services"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default async function TutorProfilePage() {
  const { data: profile } = await tutorService.getTutorProfile()
  const { data: categories } = await tutorService.getCategories()

  if (!profile) {
    return <div className="p-10 text-red-500">Profile not found</div>
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold">Tutor Profile</h1>
        <p className="text-muted-foreground">Update your professional information</p>
      </div>

      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <img
              src={profile.user.image || "/placeholder.png"}
              className="w-20 h-20 rounded-full object-cover"
            />
            <Button variant="outline">Change Photo</Button>
          </div>

          <Input disabled value={profile.user.name} />
          <Input disabled value={profile.user.email} />
        </CardContent>
      </Card>

      {/* Professional Details */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Details</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          {/* Bio */}
          <Textarea
            defaultValue={profile.bio || ""}
            placeholder="Write a short bio about your teaching experience..."
          />

          {/* Price */}
          <Input
            type="number"
            defaultValue={profile.price || ""}
            placeholder="Hourly Price"
          />

          {/* Category */}
          <Select defaultValue={profile.categoryId}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((cat: any) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Subjects */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Subjects</p>
            <div className="flex flex-wrap gap-2">
              {profile.subject?.map((sub: string) => (
                <Badge key={sub} variant="secondary">{sub}</Badge>
              ))}
            </div>
          </div>

          {/* Experience */}
          <Textarea
            defaultValue={profile.experience || ""}
            placeholder="Experience (optional)"
          />
        </CardContent>
      </Card>

      {/* Save Button */}
      <Button className="w-full">Save Changes</Button>
    </div>
  )
}