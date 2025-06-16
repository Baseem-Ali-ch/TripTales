"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Paperclip,
  ChevronRight,
  Save,
  Eye,
  Check,
  Loader2,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MessageSquare,
  FileText,
  Plus,
  X,
  ImageIcon,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  LinkIcon,
  Calendar,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Sample team members data
const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Sarah Williams",
    role: "Editor in Chief",
    avatar: "/placeholder.svg?height=200&width=200&text=SW",
    email: "sarah@blogfolio.com",
  },
  {
    id: 2,
    name: "David Chen",
    role: "Technical Editor",
    avatar: "/placeholder.svg?height=200&width=200&text=DC",
    email: "david@blogfolio.com",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Content Manager",
    avatar: "/placeholder.svg?height=200&width=200&text=ER",
    email: "emily@blogfolio.com",
  },
  {
    id: 4,
    name: "Michael Johnson",
    role: "Community Manager",
    avatar: "/placeholder.svg?height=200&width=200&text=MJ",
    email: "michael@blogfolio.com",
  },
];

// Sample FAQ data
const FAQ_ITEMS = [
  {
    question: "How long does it take to review a blog submission?",
    answer:
      "We typically review blog submissions within 3-5 business days. If your submission is accepted, you'll receive an email notification with further instructions. If we need revisions, we'll provide detailed feedback to help you improve your content.",
  },
  {
    question: "What types of content are you looking for?",
    answer:
      "We're interested in original, insightful content related to technology, design, productivity, and lifestyle. We value well-researched articles with practical advice, unique perspectives, and engaging writing. Content should be between 1,000-2,500 words and not published elsewhere.",
  },
  {
    question: "Do you offer compensation for published articles?",
    answer:
      "Yes, we offer compensation for published articles based on quality, depth, and expertise. Rates vary depending on the complexity and research involved. We also offer exposure to our growing audience and backlinks to your personal website or portfolio.",
  },
  {
    question:
      "Can I include links to my website or social media in my article?",
    answer:
      "Yes, you can include relevant links to your website, portfolio, or social media profiles in your author bio. Within the article itself, links should be relevant to the content and add value for readers. Excessive self-promotion or affiliate links may be removed during editing.",
  },
  {
    question: "What happens after my blog is published?",
    answer:
      "After publication, we promote your article across our social media channels and newsletter. We encourage you to share it with your network as well. You'll have access to basic analytics about your article's performance, and we welcome you to engage with readers in the comments section.",
  },
];

// Sample blog categories
const BLOG_CATEGORIES = [
  "Technology",
  "Design",
  "Productivity",
  "Lifestyle",
  "Health",
  "Travel",
  "Finance",
  "Education",
  "Marketing",
  "Career",
];

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState("contact");
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const featuredImageRef = useRef<HTMLInputElement>(null);
  const additionalImagesRef = useRef<HTMLInputElement>(null);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    attachment: null as File | null,
  });

  // Blog submission form state
  const [blogForm, setBlogForm] = useState({
    title: "",
    category: "",
    tags: [],
    status: "",
    excerpt: "",
    content: "",
    featuredImage: null as File | null,
    additionalImages: [] as File[],
  });

  // Form validation state
  const [errors, setErrors] = useState({
    contact: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    blog: {
      title: "",
      category: "",
      content: "",
      featuredImage: "",
    },
  });

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Handle contact form input change
  const handleContactInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setContactForm({ ...contactForm, [name]: value });

    // Clear error when user types
    setErrors({
      ...errors,
      contact: {
        ...errors.contact,
        [name]: "",
      },
    });
  };

  // Handle blog form input change
  const handleBlogInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setBlogForm({ ...blogForm, [name]: value });

    // Clear error when user types
    setErrors({
      ...errors,
      blog: {
        ...errors.blog,
        [name]: "",
      },
    });

    // Simulate autosave
    triggerAutosave();
  };

  // Handle file attachment for contact form
  const handleFileAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setContactForm({ ...contactForm, attachment: e.target.files[0] });
    }
  };

  // Handle featured image upload
  const handleFeaturedImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setBlogForm({ ...blogForm, featuredImage: e.target.files[0] });
      setErrors({
        ...errors,
        blog: {
          ...errors.blog,
          featuredImage: "",
        },
      });
      triggerAutosave();
    }
  };

  // Handle additional images upload
  const handleAdditionalImagesUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setBlogForm({
        ...blogForm,
        additionalImages: [...blogForm.additionalImages, ...newImages],
      });
      triggerAutosave();
    }
  };

  // Remove additional image
  const removeAdditionalImage = (index: number) => {
    const updatedImages = [...blogForm.additionalImages];
    updatedImages.splice(index, 1);
    setBlogForm({ ...blogForm, additionalImages: updatedImages });
    triggerAutosave();
  };

  // Handle tag input
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    setBlogForm({ ...blogForm, [name]: value });
    setErrors({
      ...errors,
      [name]: "",
    });
    triggerAutosave();
  };

  // Add tag
  const addTag = () => {
    if (
      tagInput.trim() &&
      !selectedTags.includes(tagInput.trim()) &&
      selectedTags.length < 5
    ) {
      setSelectedTags([...selectedTags, tagInput.trim()]);
      setTagInput("");
      triggerAutosave();
    }
  };

  // Remove tag
  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
    triggerAutosave();
  };

  // Handle key press for tag input
  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  // Trigger autosave
  const triggerAutosave = () => {
    // In a real app, you would save to localStorage or make an API call here
    setLastSaved(new Date());
  };

  // Format time for autosave indicator
  const formatLastSaved = () => {
    if (!lastSaved) return "";
    return lastSaved.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Validate contact form
  const validateContactForm = () => {
    let valid = true;
    const newErrors = { ...errors.contact };

    if (!contactForm.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!contactForm.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!contactForm.subject) {
      newErrors.subject = "Subject is required";
      valid = false;
    }

    if (!contactForm.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    }

    setErrors({ ...errors, contact: newErrors });
    return valid;
  };

  // Validate blog form for current step
  const validateBlogFormStep = (step: number) => {
    let valid = true;
    const newErrors = { ...errors.blog };

    if (step === 1) {
      if (!blogForm.title.trim()) {
        newErrors.title = "Title is required";
        valid = false;
      }

      if (!blogForm.category) {
        newErrors.category = "Category is required";
        valid = false;
      }
    } else if (step === 2) {
      if (!blogForm.content.trim() || blogForm.content.length < 100) {
        newErrors.content = "Content should be at least 100 characters";
        valid = false;
      }
    } else if (step === 3) {
      if (!blogForm.featuredImage) {
        newErrors.featuredImage = "Featured image is required";
        valid = false;
      }
    }

    setErrors({ ...errors, blog: newErrors });
    return valid;
  };

  // Handle contact form submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateContactForm()) {
      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);

        // Reset form after success
        setTimeout(() => {
          setContactForm({
            name: "",
            email: "",
            subject: "",
            message: "",
            attachment: null,
          });
          setSubmitSuccess(null);
        }, 3000);
      }, 1500);
    }
  };

  // Handle blog form next step
  const handleNextStep = () => {
    if (validateBlogFormStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle blog form previous step
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Handle blog form submission
  const handleBlogSubmit = () => {
    setShowConfirmDialog(false);
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setBlogForm({
          title: "",
          category: "",
          content: "",
          featuredImage: null,
          additionalImages: [],
        });
        setSelectedTags([]);
        setCurrentStep(1);
        setSubmitSuccess(null);
        setLastSaved(null);
      }, 3000);
    }, 1500);
  };

  // Toggle preview
  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  // Format text editor buttons
  const formatText = (command: string) => {
    document.execCommand(command, false);
    // Focus back on the editor
    const editor = document.getElementById("blog-content");
    if (editor) {
      editor.focus();
    }
  };

  // Initialize content editable div with placeholder
  useEffect(() => {
    const editor = document.getElementById("blog-content");
    if (editor) {
      editor.innerHTML = blogForm.content || "";

      // Add event listener to update state when content changes
      const handleInput = () => {
        setBlogForm({ ...blogForm, content: editor.innerHTML });
        triggerAutosave();
      };

      editor.addEventListener("input", handleInput);

      return () => {
        editor.removeEventListener("input", handleInput);
      };
    }
  }, [activeTab]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Header */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a question, feedback, or want to contribute? We'd love to
              hear from you. Choose an option below to get started.
            </p>
          </div>
        </section>

        {/* Tabs Navigation */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Tabs
              defaultValue="contact"
              className="w-full"
              onValueChange={handleTabChange}
            >
              <TabsList className="grid w-full grid-cols-2 mb-8 h-13">
                <TabsTrigger value="contact" className="text-base py-3">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Contact Team
                </TabsTrigger>
                <TabsTrigger value="submit-blog" className="text-base py-3">
                  <FileText className="mr-2 h-5 w-5" />
                  Submit Blog
                </TabsTrigger>
              </TabsList>

              {/* Contact Team Tab Content */}
              <TabsContent value="contact" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Contact Form */}
                  <div className="lg:col-span-2">
                    <div className="border rounded-lg p-6 bg-card">
                      <h2 className="text-2xl font-bold mb-6">
                        Send Us a Message
                      </h2>

                      <form
                        onSubmit={handleContactSubmit}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label
                              htmlFor="name"
                              className={
                                errors.contact.name ? "text-destructive" : ""
                              }
                            >
                              Name
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              value={contactForm.name}
                              onChange={handleContactInputChange}
                              className={
                                errors.contact.name ? "border-destructive" : ""
                              }
                              placeholder="Your full name"
                            />
                            {errors.contact.name && (
                              <p className="text-destructive text-sm">
                                {errors.contact.name}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label
                              htmlFor="email"
                              className={
                                errors.contact.email ? "text-destructive" : ""
                              }
                            >
                              Email
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={contactForm.email}
                              onChange={handleContactInputChange}
                              className={
                                errors.contact.email ? "border-destructive" : ""
                              }
                              placeholder="Your email address"
                            />
                            {errors.contact.email && (
                              <p className="text-destructive text-sm">
                                {errors.contact.email}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="subject"
                            className={
                              errors.contact.subject ? "text-destructive" : ""
                            }
                          >
                            Subject
                          </Label>
                          <Select
                            value={contactForm.subject}
                            onValueChange={(value) =>
                              handleContactInputChange({
                                target: { name: "subject", value },
                              } as React.ChangeEvent<HTMLSelectElement>)
                            }
                          >
                            <SelectTrigger
                              id="subject"
                              className={
                                errors.contact.subject
                                  ? "border-destructive"
                                  : ""
                              }
                            >
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">
                                General Inquiry
                              </SelectItem>
                              <SelectItem value="feedback">Feedback</SelectItem>
                              <SelectItem value="support">Support</SelectItem>
                              <SelectItem value="partnership">
                                Partnership
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.contact.subject && (
                            <p className="text-destructive text-sm">
                              {errors.contact.subject}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="message"
                            className={
                              errors.contact.message ? "text-destructive" : ""
                            }
                          >
                            Message
                          </Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={contactForm.message}
                            onChange={handleContactInputChange}
                            className={cn(
                              "min-h-32",
                              errors.contact.message ? "border-destructive" : ""
                            )}
                            placeholder="Your message"
                          />
                          {errors.contact.message && (
                            <p className="text-destructive text-sm">
                              {errors.contact.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="attachment" className="mb-2 block">
                            Attachment (optional)
                          </Label>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => fileInputRef.current?.click()}
                              className="w-full"
                            >
                              <Paperclip className="mr-2 h-4 w-4" />
                              {contactForm.attachment
                                ? "Change File"
                                : "Attach File"}
                            </Button>
                            <input
                              ref={fileInputRef}
                              id="attachment"
                              name="attachment"
                              type="file"
                              onChange={handleFileAttachment}
                              className="hidden"
                            />
                          </div>
                          {contactForm.attachment && (
                            <div className="mt-2 flex items-center gap-2 text-sm">
                              <Paperclip className="h-4 w-4" />
                              <span className="truncate">
                                {contactForm.attachment.name}
                              </span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() =>
                                  setContactForm({
                                    ...contactForm,
                                    attachment: null,
                                  })
                                }
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>

                        <div className="flex justify-end">
                          <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending...
                              </>
                            ) : (
                              <>
                                <Send className="mr-2 h-4 w-4" />
                                Send Message
                              </>
                            )}
                          </Button>
                        </div>

                        {/* Success Message */}
                        {submitSuccess === true && (
                          <div className="p-3 rounded-md bg-green-500/10 text-green-500 border border-green-500/20 flex items-center gap-2">
                            <Check className="h-4 w-4" />
                            Your message has been sent successfully! We'll get
                            back to you soon.
                          </div>
                        )}
                      </form>
                    </div>
                  </div>

                  {/* Contact Information Sidebar */}
                  <div className="lg:col-span-1">
                    <div className="border rounded-lg p-6 bg-card h-full">
                      <h2 className="text-xl font-bold mb-6">
                        Contact Information
                      </h2>

                      <div className="space-y-6">
                        <div className="flex items-start gap-3">
                          <Mail className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h3 className="font-medium">Email</h3>
                            <p className="text-muted-foreground">
                              <a
                                href="mailto:contact@blogfolio.com"
                                className="hover:text-primary"
                              >
                                contact@blogfolio.com
                              </a>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Phone className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h3 className="font-medium">Phone</h3>
                            <p className="text-muted-foreground">
                              <a
                                href="tel:+11234567890"
                                className="hover:text-primary"
                              >
                                +1 (123) 456-7890
                              </a>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h3 className="font-medium">Address</h3>
                            <p className="text-muted-foreground">
                              123 Blog Street
                              <br />
                              San Francisco, CA 94103
                              <br />
                              United States
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Clock className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h3 className="font-medium">Office Hours</h3>
                            <p className="text-muted-foreground">
                              Monday - Friday: 9:00 AM - 5:00 PM
                              <br />
                              Saturday - Sunday: Closed
                            </p>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Follow Us</h3>
                          <div className="flex gap-4">
                            <a
                              href="#"
                              className="text-muted-foreground hover:text-primary transition-colors"
                              aria-label="Facebook"
                            >
                              <Facebook className="h-5 w-5" />
                            </a>
                            <a
                              href="#"
                              className="text-muted-foreground hover:text-primary transition-colors"
                              aria-label="Twitter"
                            >
                              <Twitter className="h-5 w-5" />
                            </a>
                            <a
                              href="#"
                              className="text-muted-foreground hover:text-primary transition-colors"
                              aria-label="Instagram"
                            >
                              <Instagram className="h-5 w-5" />
                            </a>
                            <a
                              href="#"
                              className="text-muted-foreground hover:text-primary transition-colors"
                              aria-label="LinkedIn"
                            >
                              <Linkedin className="h-5 w-5" />
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Map Embed */}
                      <div className="mt-6 rounded-md overflow-hidden border">
                        <div className="relative aspect-video w-full">
                          <Image
                            src="/placeholder.svg?height=300&width=500&text=Map"
                            alt="Office Location Map"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Members Section */}
                <div className="mt-12">
                  <h2 className="text-2xl font-bold mb-6">Meet Our Team</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {TEAM_MEMBERS.map((member) => (
                      <Card key={member.id} className="overflow-hidden">
                        <div className="relative aspect-square w-full">
                          <Image
                            src={member.avatar || "/placeholder.svg"}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-4 text-center">
                          <h3 className="font-bold">{member.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {member.role}
                          </p>
                          <a
                            href={`mailto:${member.email}`}
                            className="text-sm text-primary hover:underline"
                          >
                            {member.email}
                          </a>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-12">
                  <h2 className="text-2xl font-bold mb-6">
                    Frequently Asked Questions
                  </h2>
                  <Accordion type="single" collapsible className="w-full">
                    {FAQ_ITEMS.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent>{item.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                {/* Support Resources */}
                <div className="mt-12">
                  <h2 className="text-2xl font-bold mb-6">Support Resources</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link
                      href="/help"
                      className="border rounded-lg p-6 bg-card hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-bold mb-2">Help Center</h3>
                      <p className="text-muted-foreground">
                        Browse our knowledge base for answers to common
                        questions.
                      </p>
                    </Link>
                    <Link
                      href="/guidelines"
                      className="border rounded-lg p-6 bg-card hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-bold mb-2">Submission Guidelines</h3>
                      <p className="text-muted-foreground">
                        Learn about our content standards and submission
                        process.
                      </p>
                    </Link>
                    <Link
                      href="/community"
                      className="border rounded-lg p-6 bg-card hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-bold mb-2">Community Forum</h3>
                      <p className="text-muted-foreground">
                        Connect with other writers and get help from the
                        community.
                      </p>
                    </Link>
                  </div>
                </div>
              </TabsContent>

              {/* Submit Blog Tab Content */}
              <TabsContent value="submit-blog" className="mt-0">
                <div className="border rounded-lg p-6 bg-card">
                  {/* Multi-step Form Progress */}
                  <div className="mb-8">
                    <div className="flex justify-between">
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className="flex flex-col items-center relative w-full"
                        >
                          <div
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center font-medium z-10",
                              currentStep === step
                                ? "bg-primary text-primary-foreground"
                                : currentStep > step
                                ? "bg-primary/20 text-primary"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {currentStep > step ? (
                              <Check className="h-5 w-5" />
                            ) : (
                              step
                            )}
                          </div>
                          <div className="text-xs mt-2 text-center">
                            {step === 1 && "Basic Info"}
                            {step === 2 && "Content"}
                            {step === 3 && "Media"}
                            {step === 4 && "Review"}
                          </div>
                          {step < 4 && (
                            <div
                              className={cn(
                                "absolute top-5 left-1/2 w-full h-0.5",
                                currentStep > step ? "bg-primary" : "bg-muted"
                              )}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Autosave Indicator */}
                  {lastSaved && (
                    <div className="flex items-center text-xs text-muted-foreground mb-4">
                      <Save className="h-3 w-3 mr-1" />
                      Draft saved at {formatLastSaved()}
                    </div>
                  )}

                  {/* Step 1: Basic Information */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold">Basic Information</h2>

                      <div className="space-y-2">
                        <Label
                          htmlFor="title"
                          className={
                            errors.blog.title ? "text-destructive" : ""
                          }
                        >
                          Blog Title
                        </Label>
                        <Input
                          id="title"
                          name="title"
                          value={blogForm.title}
                          onChange={handleBlogInputChange}
                          className={
                            errors.blog.title ? "border-destructive" : ""
                          }
                          placeholder="Enter a compelling title for your blog"
                        />
                        {errors.blog.title && (
                          <p className="text-destructive text-sm">
                            {errors.blog.title}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="category"
                            className={
                              errors.blog.category ? "text-destructive" : ""
                            }
                          >
                            Category
                          </Label>
                          <Select
                            value={blogForm.category}
                            onValueChange={(value) =>
                              handleBlogInputChange({
                                target: { name: "category", value },
                              } as React.ChangeEvent<HTMLSelectElement>)
                            }
                          >
                            <SelectTrigger
                              id="category"
                              className={
                                errors.blog.category ? "border-destructive" : ""
                              }
                            >
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              {BLOG_CATEGORIES.map((category) => (
                                <SelectItem
                                  key={category}
                                  value={category.toLowerCase()}
                                >
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.blog.category && (
                            <p className="text-destructive text-sm">
                              {errors.blog.category}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="status">Status</Label>
                          <Select
                            value={blogForm.status}
                            onValueChange={(value) =>
                              handleSelectChange("status", value)
                            }
                          >
                            <SelectTrigger id="status">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="published">
                                Published
                              </SelectItem>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="pending">
                                Pending Review
                              </SelectItem>
                              <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="excerpt">Excerpt</Label>
                        <Textarea
                          id="excerpt"
                          name="excerpt"
                          value={blogForm.excerpt}
                          onChange={handleBlogInputChange}
                          rows={3}
                          placeholder="Write a brief description of your blog post"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tags">Tags (up to 5)</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {selectedTags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              {tag}
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="ml-1 hover:text-destructive"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            id="tags"
                            value={tagInput}
                            onChange={handleTagInputChange}
                            onKeyDown={handleTagKeyPress}
                            placeholder="Add a tag and press Enter"
                            disabled={selectedTags.length >= 5}
                          />
                          <Button
                            type="button"
                            onClick={addTag}
                            disabled={
                              !tagInput.trim() || selectedTags.length >= 5
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Tags help readers find your content. Press Enter or
                          click the plus button to add a tag.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Content */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold">Write Your Content</h2>

                      <div className="space-y-2">
                        <Label
                          htmlFor="blog-content"
                          className={
                            errors.blog.content ? "text-destructive" : ""
                          }
                        >
                          Content
                        </Label>

                        {/* Text Editor Toolbar */}
                        <div className="flex flex-wrap gap-1 p-1 border rounded-t-md bg-muted">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => formatText("bold")}
                            title="Bold"
                          >
                            <Bold className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => formatText("italic")}
                            title="Italic"
                          >
                            <Italic className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => formatText("underline")}
                            title="Underline"
                          >
                            <Underline className="h-4 w-4" />
                          </Button>
                          <div className="w-px h-6 bg-border mx-1 self-center" />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => formatText("insertUnorderedList")}
                            title="Bullet List"
                          >
                            <List className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => formatText("insertOrderedList")}
                            title="Numbered List"
                          >
                            <ListOrdered className="h-4 w-4" />
                          </Button>
                          <div className="w-px h-6 bg-border mx-1 self-center" />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => formatText("justifyLeft")}
                            title="Align Left"
                          >
                            <AlignLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => formatText("justifyCenter")}
                            title="Align Center"
                          >
                            <AlignCenter className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => formatText("justifyRight")}
                            title="Align Right"
                          >
                            <AlignRight className="h-4 w-4" />
                          </Button>
                          <div className="w-px h-6 bg-border mx-1 self-center" />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                              const url = prompt("Enter URL:");
                              if (url)
                                document.execCommand("createLink", false, url);
                            }}
                            title="Insert Link"
                          >
                            <LinkIcon className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Content Editable Div */}
                        <div
                          id="blog-content"
                          className={cn(
                            "min-h-[300px] p-4 border rounded-b-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                            errors.blog.content ? "border-destructive" : ""
                          )}
                          contentEditable
                          dangerouslySetInnerHTML={{ __html: blogForm.content }}
                        />

                        {errors.blog.content && (
                          <p className="text-destructive text-sm">
                            {errors.blog.content}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          Write your blog content here. Use the toolbar to
                          format your text.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Media */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold">Add Media</h2>

                      <div className="space-y-2">
                        <Label
                          htmlFor="featured-image"
                          className={
                            errors.blog.featuredImage ? "text-destructive" : ""
                          }
                        >
                          Featured Image
                        </Label>
                        {blogForm.featuredImage ? (
                          <div className="relative aspect-video w-full rounded-md overflow-hidden border">
                            <Image
                              src={
                                URL.createObjectURL(blogForm.featuredImage) ||
                                "/placeholder.svg"
                              }
                              alt="Featured Image"
                              fill
                              className="object-cover"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 h-8 w-8"
                              onClick={() =>
                                setBlogForm({
                                  ...blogForm,
                                  featuredImage: null,
                                })
                              }
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div
                            className={cn(
                              "border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors",
                              errors.blog.featuredImage
                                ? "border-destructive"
                                : "border-muted"
                            )}
                            onClick={() => featuredImageRef.current?.click()}
                          >
                            <ImageIcon className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                            <p className="text-muted-foreground mb-1">
                              Click to upload your featured image
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Recommended size: 1200 x 630 pixels
                            </p>
                          </div>
                        )}
                        <input
                          ref={featuredImageRef}
                          id="featured-image"
                          type="file"
                          accept="image/*"
                          onChange={handleFeaturedImageUpload}
                          className="hidden"
                        />
                        {errors.blog.featuredImage && (
                          <p className="text-destructive text-sm">
                            {errors.blog.featuredImage}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="additional-images">
                          Additional Images (optional)
                        </Label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                          {blogForm.additionalImages.map((image, index) => (
                            <div
                              key={index}
                              className="relative aspect-square rounded-md overflow-hidden border"
                            >
                              <Image
                                src={
                                  URL.createObjectURL(image) ||
                                  "/placeholder.svg"
                                }
                                alt={`Additional Image ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-1 right-1 h-6 w-6"
                                onClick={() => removeAdditionalImage(index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                          <div
                            className="border-2 border-dashed rounded-md aspect-square flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                            onClick={() => additionalImagesRef.current?.click()}
                          >
                            <Plus className="h-8 w-8 text-muted-foreground mb-1" />
                            <p className="text-xs text-muted-foreground text-center px-2">
                              Add more images
                            </p>
                          </div>
                        </div>
                        <input
                          ref={additionalImagesRef}
                          id="additional-images"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleAdditionalImagesUpload}
                          className="hidden"
                        />
                        <p className="text-xs text-muted-foreground">
                          You can add multiple images to include in your blog
                          content.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Review & Submit */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold">Review & Submit</h2>

                      <div className="space-y-6">
                        {/* Preview Toggle */}
                        <div className="flex justify-end">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={togglePreview}
                            className="flex items-center gap-2"
                          >
                            <Eye className="h-4 w-4" />
                            {showPreview ? "Hide Preview" : "Show Preview"}
                          </Button>
                        </div>

                        {showPreview ? (
                          <div className="border rounded-md p-6">
                            {/* Blog Preview */}
                            <div className="prose prose-sm max-w-none dark:prose-invert">
                              <h1>{blogForm.title}</h1>

                              {blogForm.featuredImage && (
                                <div className="relative aspect-video w-full rounded-md overflow-hidden mb-6">
                                  <Image
                                    src={
                                      URL.createObjectURL(
                                        blogForm.featuredImage
                                      ) || "/placeholder.svg"
                                    }
                                    alt="Featured Image"
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}

                              <div className="flex flex-wrap gap-2 mb-4">
                                <Badge>
                                  {BLOG_CATEGORIES.find(
                                    (c) => c.toLowerCase() === blogForm.category
                                  ) || blogForm.category}
                                </Badge>
                                {selectedTags.map((tag) => (
                                  <Badge key={tag} variant="outline">
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>

                              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date().toLocaleDateString()}</span>
                              </div>

                              <div
                                dangerouslySetInnerHTML={{
                                  __html: blogForm.content,
                                }}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {/* Summary */}
                            <div className="border rounded-md p-6">
                              <h3 className="font-bold mb-4">Blog Summary</h3>
                              <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium">Title</p>
                                    <p className="text-muted-foreground">
                                      {blogForm.title}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">
                                      Category
                                    </p>
                                    <p className="text-muted-foreground">
                                      {BLOG_CATEGORIES.find(
                                        (c) =>
                                          c.toLowerCase() === blogForm.category
                                      ) || blogForm.category}
                                    </p>
                                  </div>
                                </div>

                                <div>
                                  <p className="text-sm font-medium">Tags</p>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    {selectedTags.length > 0 ? (
                                      selectedTags.map((tag) => (
                                        <Badge key={tag} variant="outline">
                                          #{tag}
                                        </Badge>
                                      ))
                                    ) : (
                                      <p className="text-muted-foreground">
                                        No tags added
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div>
                                  <p className="text-sm font-medium">
                                    Content Length
                                  </p>
                                  <p className="text-muted-foreground">
                                    {
                                      blogForm.content.replace(/<[^>]*>/g, "")
                                        .length
                                    }{" "}
                                    characters
                                  </p>
                                </div>

                                <div>
                                  <p className="text-sm font-medium">Media</p>
                                  <p className="text-muted-foreground">
                                    {blogForm.featuredImage
                                      ? "Featured image uploaded"
                                      : "No featured image"}{" "}
                                    • {blogForm.additionalImages.length}{" "}
                                    additional images
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Submission Guidelines */}
                            <div className="border rounded-md p-6 bg-muted/30">
                              <h3 className="font-bold mb-4">
                                Submission Guidelines
                              </h3>
                              <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                                  <span>
                                    Your submission will be reviewed by our
                                    editorial team within 3-5 business days.
                                  </span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                                  <span>
                                    We may suggest edits or revisions to improve
                                    clarity, formatting, or content.
                                  </span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                                  <span>
                                    By submitting, you confirm this is your
                                    original work and you have the rights to all
                                    content.
                                  </span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                                  <span>
                                    If published, your content will be shared on
                                    our platform and social media channels.
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Form Navigation */}
                  <div className="flex justify-between mt-8">
                    {currentStep > 1 ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrevStep}
                      >
                        Previous
                      </Button>
                    ) : (
                      <div></div>
                    )}

                    {currentStep < 4 ? (
                      <Button type="button" onClick={handleNextStep}>
                        Next <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={() => setShowConfirmDialog(true)}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Blog"
                        )}
                      </Button>
                    )}
                  </div>

                  {/* Confirmation Dialog */}
                  {showConfirmDialog && (
                    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                      <div className="bg-card border rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-xl font-bold mb-4">
                          Confirm Submission
                        </h3>
                        <p className="mb-6">
                          Are you sure you want to submit your blog? Once
                          submitted, it will be reviewed by our editorial team.
                        </p>
                        <div className="flex justify-end gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowConfirmDialog(false)}
                          >
                            Cancel
                          </Button>
                          <Button type="button" onClick={handleBlogSubmit}>
                            Confirm Submission
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Success Message */}
                  {submitSuccess === true && (
                    <div className="mt-6 p-4 rounded-md bg-green-500/10 text-green-500 border border-green-500/20 flex items-center gap-2">
                      <Check className="h-5 w-5" />
                      <div>
                        <p className="font-medium">
                          Blog submitted successfully!
                        </p>
                        <p className="text-sm">
                          Thank you for your submission. Our editorial team will
                          review your blog and get back to you soon.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
