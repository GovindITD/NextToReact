import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Bell,
  LogOut,
  Users,
  ChevronDown,
  UserCog,
  HeartPulse,
  FileText,
  CalendarCheck,
  Home,
} from "lucide-react";

import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import NotificationsPanel from "./notifications-panel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Dialog, DialogTrigger } from "../ui/dialog";
import SwitchProfileDialog from "./switch-profile-dialog";

interface UserProfile {
  id: string;
  name: string;
  avatarUrl: string;
  initials: string;
  relation: string;
}

export default function DashboardHeader({
  currentUser,
  allUsers,
  onSwitchProfile,
}: {
  currentUser: UserProfile;
  allUsers: UserProfile[];
  onSwitchProfile: (user: UserProfile) => void;
}) {
  const [currentDate, setCurrentDate] = useState("");
  const [isSwitchProfileOpen, setIsSwitchProfileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  const handleLogout = () => {
    // Clear session logic here
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b p-2 sm:p-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/dashboard/profile">
            <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-primary">
              <AvatarImage
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                data-ai-hint="profile picture"
              />
              <AvatarFallback>{currentUser.initials}</AvatarFallback>
            </Avatar>
          </Link>
          <Link to="/dashboard/profile">
            <div>
              <p className="font-bold text-sm sm:text-base text-primary">
                ID: {currentUser.id}
              </p>
              <h1 className="text-base sm:text-xl font-bold text-primary font-headline">
                {currentUser.name}
              </h1>
              <p className="text-xs text-muted-foreground hidden md:block">
                {currentDate}
              </p>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <HeartPulse className="h-8 w-8 text-primary" />
          <p className="text-sm font-bold text-primary font-headline">
            MediCare Hospitals
          </p>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link to="/dashboard">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-accent text-accent-foreground shadow-lg hover:bg-accent/90"
            >
              <Home className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="sr-only">Home</span>
            </Button>
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full h-10 w-10"
              >
                <Bell />
                <span className="absolute top-1 right-1 h-3 w-3 flex">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                <span className="sr-only">View Notifications</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full max-w-sm sm:max-w-md p-0">
              <NotificationsPanel />
            </SheetContent>
          </Sheet>

          <Dialog
            open={isSwitchProfileOpen}
            onOpenChange={setIsSwitchProfileOpen}
          >
            <AlertDialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-10 gap-1 px-2 sm:px-3">
                    <User />
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">Open user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/profile">
                      <UserCog className="mr-2" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DialogTrigger asChild>
                    <DropdownMenuItem>
                      <Users className="mr-2" />
                      Switch Profile
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/reminder">
                      <CalendarCheck className="mr-2" />
                      Reminder
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/my-document">
                      <FileText className="mr-2" />
                      My Document
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem>
                      <LogOut className="mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to logout?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    You will be returned to the login page.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleLogout}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    Logout
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <SwitchProfileDialog
              allUsers={allUsers}
              currentUser={currentUser}
              onSwitchProfile={(user) => {
                onSwitchProfile(user);
                setIsSwitchProfileOpen(false);
              }}
            />
          </Dialog>
        </div>
      </div>
    </header>
  );
}
