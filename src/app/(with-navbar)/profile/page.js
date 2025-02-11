import React from "react";
import { Card, CardContent } from "./_partials/card";
import { Button } from "./_partials/button";
import { Input } from "./_partials/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./_partials/tabs";
import LatestSection from "../_partials/LatestSection";

const ProfilePage = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <Card className="mb-6">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Full Name
              </label>
              <Input id="name" type="text" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
            <Button className="col-span-full mt-4" type="submit">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
