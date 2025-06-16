import { ChevronDown, ArrowRight, Mail } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Input } from "@/components/ui/input"
import { BlogCard } from "@/components/blog-card"
import { FeaturedBlogCard } from "@/components/featured-blog-card"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center py-24 md:py-32 text-center overflow-hidden">
          {/* Background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-background to-secondary/10" />

          <div className="container relative z-10 max-w-5xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Discover Insightful Stories
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Dive into a world of knowledge, creativity, and inspiration
              through our handpicked collection of thought-provoking articles.
            </p>
          </div>

          {/* Animated scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
            <span className="text-sm text-muted-foreground mb-2 hidden sm:block">
              Scroll Down
            </span>
            <div className="flex flex-col items-center gap-1">
              <ChevronDown className="h-5 w-5 text-primary animate-pulse" />
              <ChevronDown className="h-4 w-4 text-primary/60 animate-pulse [animation-delay:150ms]" />
              <ChevronDown className="h-3 w-3 text-primary/40 animate-pulse [animation-delay:300ms]" />
            </div>
          </div>
        </section>

        {/* Featured Blogs Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Featured Stories</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeaturedBlogCard
                image="/placeholder.svg?height=600&width=1000"
                category="Technology"
                title="The Future of AI in Content Creation"
                excerpt="Discover how artificial intelligence is revolutionizing the way we create and consume content in the digital age."
                author={{
                  name: "Alex Morgan",
                  avatar: "/placeholder.svg?height=100&width=100",
                }}
                date="May 15, 2023"
                readTime="8 min read"
              />

              <FeaturedBlogCard
                image="/placeholder.svg?height=600&width=1000"
                category="Design"
                title="Minimalist Design Principles for Modern Web"
                excerpt="Explore the key principles of minimalist design and how they can be applied to create stunning modern websites."
                author={{
                  name: "Samantha Lee",
                  avatar: "/placeholder.svg?height=100&width=100",
                }}
                date="April 28, 2023"
                readTime="6 min read"
              />

              <FeaturedBlogCard
                image="/placeholder.svg?height=600&width=1000"
                category="Productivity"
                title="Time Management Techniques for Creative Professionals"
                excerpt="Learn effective time management strategies specifically tailored for designers, writers, and other creative individuals."
                author={{
                  name: "David Chen",
                  avatar: "/placeholder.svg?height=100&width=100",
                }}
                date="May 5, 2023"
                readTime="10 min read"
              />
            </div>
          </div>
        </section>

        {/* Recent Blogs Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Latest Articles</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <BlogCard
                  key={i}
                  image={`/placeholder.svg?height=400&width=600&text=Blog+${i + 1}`}
                  title={`Blog Title ${i + 1}: Something Interesting About Technology`}
                  excerpt="This is a brief excerpt from the blog post that gives readers an idea of what the article is about."
                  author={{
                    name: `Author ${i + 1}`,
                    avatar: "/placeholder.svg?height=100&width=100",
                  }}
                  date={`May ${i + 1}, 2023`}
                  readTime={`${4 + i} min read`}
                />
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Button variant="outline" size="lg">
                View More Articles
              </Button>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-lg overflow-hidden aspect-square md:aspect-auto md:h-[500px]">
                <Image
                  src="/placeholder.svg?height=800&width=800&text=Our+Team"
                  alt="Our Team"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  At BlogFolio, we believe in the power of stories to inspire, educate, and connect. Our mission is to
                  create a platform where thoughtful writers can share their insights and readers can discover content
                  that matters to them.
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  Founded in 2023, we've grown into a community of passionate creators and curious minds. We curate
                  content across technology, design, productivity, lifestyle, and more.
                </p>

                <h3 className="text-xl font-bold mb-4">Meet Our Team</h3>
                <div className="flex space-x-4 mb-8">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mb-2">
                        <Image
                          src={`/placeholder.svg?height=100&width=100&text=${i + 1}`}
                          alt={`Team Member ${i + 1}`}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm">Team {i + 1}</span>
                    </div>
                  ))}
                </div>

                <Button>Contact Us</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
                <section className="py-16 bg-blue-100 dark:bg-[#000c29] dark:text-white">

          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Community of Readers</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest articles, resources, and insights delivered straight to
              your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 bg-primary-foreground text-foreground"
                />
              </div>
              <Button >Subscribe</Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
