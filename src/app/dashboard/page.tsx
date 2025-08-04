import React from "react";
import { Link } from "react-router-dom";
import {
  Stethoscope,
  FlaskConical,
  FileText,
  HeartPulse,
  MessageCircleWarning,
  Video,
  Ambulance,
  Phone,
  Package,
  ClipboardPlus,
  Ticket,
  MessageSquare,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/components/ui/card";
import PromoCarousel from "../../components/components/dashboard/promo-carousel";

const features = [
  {
    title: "Doctor Appointment",
    icon: Stethoscope,
    href: "/dashboard/appointments/book",
    description: "Book & view appointments",
    color: "bg-red-100 text-red-600",
    bgColor: "bg-red-50",
  },
  {
    title: "My Token",
    icon: Ticket,
    href: "/dashboard/token",
    description: "View your token status",
    color: "bg-blue-100 text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Clinical Record",
    icon: ClipboardPlus,
    href: "/dashboard/clinical-record",
    description: "View your health records",
    color: "bg-green-100 text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Health Tracker",
    icon: HeartPulse,
    href: "/dashboard/health-tracker",
    description: "Track your vitals",
    color: "bg-yellow-100 text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    title: "Investigation",
    icon: FlaskConical,
    href: "/dashboard/investigations/book",
    description: "Schedule investigations",
    color: "bg-purple-100 text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Package Information",
    icon: Package,
    href: "/dashboard/packages",
    description: "View health packages",
    color: "bg-indigo-100 text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    title: "Bill Report",
    icon: FileText,
    href: "/dashboard/bill-report",
    description: "View past bills",
    color: "bg-orange-100 text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    title: "Send Message",
    icon: MessageSquare,
    href: "/dashboard/send-message",
    description: "hospital enquiry",
    color: "bg-sky-100 text-sky-600",
    bgColor: "bg-sky-50",
  },
  {
    title: "Complaints",
    icon: MessageCircleWarning,
    href: "/dashboard/complaints",
    description: "Submit feedback",
    color: "bg-teal-100 text-teal-600",
    bgColor: "bg-teal-50",
  },
  {
    title: "Teleconsultation",
    icon: Video,
    href: "/dashboard/teleconsultation/book",
    description: "Online video consults",
    color: "bg-pink-100 text-pink-600",
    bgColor: "bg-pink-50",
  },
  {
    title: "Ambulance",
    icon: Ambulance,
    href: "/dashboard/ambulance",
    description: "Request an ambulance",
    color: "bg-cyan-100 text-cyan-600",
    bgColor: "bg-cyan-50",
  },
  {
    title: "Contact Us",
    icon: Phone,
    href: "/dashboard/contact",
    description: "Find our locations",
    color: "bg-red-100 text-red-600",
    bgColor: "bg-red-50",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 bg-background p-2">
      <div className="banner-container">
        <div className="marquee">
          <span className="banner-title">
            Welcome to the Patient Mobile App Powered by ITdose Healthcare
            Solutions
          </span>
          <span className="banner-subtitle">
            Manage your health easily and securely—anytime, anywhere.
          </span>
        </div>
        <div className="marquee marquee2">
          <span className="banner-title">
            Welcome to the Patient Mobile App Powered by ITdose Healthcare
            Solutions
          </span>
          <span className="banner-subtitle">
            Manage your health easily and securely—anytime, anywhere.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {features.map((feature) => (
          <Link to={feature.href} key={feature.title}>
            <Card
              className={`h-full hover:shadow-lg transition-all transform hover:-translate-y-1 flex flex-col items-center justify-center text-center p-2 sm:p-4 ${feature.bgColor} hover:bg-opacity-80`}
            >
              <CardHeader className="p-1 sm:p-2">
                <div
                  className={`mx-auto p-3 sm:p-4 rounded-full mb-2 sm:mb-3 ${feature.color}`}
                >
                  <feature.icon className="h-8 w-8 sm:h-10 sm:w-10" />
                </div>
                <CardTitle className="text-sm sm:text-lg font-semibold">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">
          Hospital notice board
        </h2>
        <PromoCarousel />
      </div>
    </div>
  );
}
