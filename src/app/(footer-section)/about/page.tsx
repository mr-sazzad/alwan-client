import MaxWidth from "@/components/max-width";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Award, Heart, Leaf, ShoppingBag, Sun, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <MaxWidth className="mt-[100px]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Alwan</h1>
          <p className="text-xl text-muted-foreground">
            Embracing the vibrant spirit of Bangladesh through mindful fashion
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <Card>
            <CardHeader>
              <Heart className="w-10 h-10 mb-2 text-primary" />
              <CardTitle>Our Story</CardTitle>
            </CardHeader>
            <CardContent>
              Born from a passion to blend traditional Bangladeshi aesthetics
              with modern fashion needs, Alwan was founded in 2023. Our name,
              meaning &quot;colors&quot; in Arabic, reflects the vibrant
              diversity of our culture.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Leaf className="w-10 h-10 mb-2 text-primary" />
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              At Alwan, we`&apos;re committed to enhancing the everyday style of
              Bangladeshis through thoughtfully designed clothing that promotes
              comfort, confidence, and a connection to our rich cultural
              heritage.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Sun className="w-10 h-10 mb-2 text-primary" />
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              We envision a Bangladesh where every individual expresses their
              unique identity through fashion that respects tradition while
              embracing modernity, balancing cultural values with contemporary
              style.
            </CardContent>
          </Card>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Our Products</CardTitle>
            <CardDescription>
              Crafted with care, designed for comfort and style
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src="/placeholder.svg?height=50&width=50"
                    alt="T-Shirts"
                  />
                  <AvatarFallback>TS</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">T-Shirts</h3>
                  <p className="text-sm text-muted-foreground">
                    Made with soft, locally sourced cotton
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src="/placeholder.svg?height=50&width=50"
                    alt="Hoodies"
                  />
                  <AvatarFallback>HD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Hoodies</h3>
                  <p className="text-sm text-muted-foreground">
                    Cozy designs with Bangladeshi-inspired patterns
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src="/placeholder.svg?height=50&width=50"
                    alt="Panjabis"
                  />
                  <AvatarFallback>PJ</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Panjabis</h3>
                  <p className="text-sm text-muted-foreground">
                    Traditional wear with a modern twist
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src="/placeholder.svg?height=50&width=50"
                    alt="Limited Editions"
                  />
                  <AvatarFallback>LE</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Limited Editions</h3>
                  <p className="text-sm text-muted-foreground">
                    Seasonal collections inspired by Bengali culture
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <Card>
            <CardHeader>
              <Users className="w-10 h-10 mb-2 text-primary" />
              <CardTitle>Our Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Alwan is more than just a clothing brand; we`&apos;re a growing
                community of style-conscious individuals across Bangladesh. We
                regularly:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Collaborate with local artists for unique designs</li>
                <li>
                  Host fashion shows featuring upcoming Bangladeshi designers
                </li>
                <li>Organize style workshops for young professionals</li>
                <li>
                  Participate in cultural events to showcase our
                  heritage-inspired designs
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Award className="w-10 h-10 mb-2 text-primary" />
              <CardTitle>Our Commitment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">At Alwan, we`&apos;re dedicated to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Supporting local textile industries and artisans</li>
                <li>Promoting sustainable fashion practices in Bangladesh</li>
                <li>Preserving and celebrating our rich textile heritage</li>
                <li>Empowering local communities through fair employment</li>
                <li>
                  Minimizing our environmental impact through eco-friendly
                  production methods
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <ShoppingBag className="w-10 h-10 mb-2 text-primary" />
            <CardTitle>Shop Alwan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Experience the Alwan style:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Browse our full collection on our website</li>
              <li>
                Follow us on social media for the latest designs and offers
              </li>
              <li>
                Sign up for our newsletter to get early access to new releases
              </li>
              <li>
                Contact our customer service for personalized styling advice
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </MaxWidth>
  );
}
