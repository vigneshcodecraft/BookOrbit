"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addProfessor } from "@/lib/actions";
import { useToast } from "@/components/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { PlusCircle, Loader2, Plus } from "lucide-react";

type FieldErrors = {
  [key: string]: string[] | undefined;
};

const ProfessorDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    setErrors({});
    setIsLoading(true);
    try {
      const result = await addProfessor(formData);
      if (result.success) {
        toast({
          title: "Professor added successfully",
          description: "The new professor has been added to the database.",
          variant: "success",
          duration: 3000,
        });
        setOpen(false);
      } else if (result.errors) {
        setErrors(result.errors);
      } else {
        toast({
          title: "Error",
          description: "An unknown error occurred",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error adding professor:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Professor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Add New Professor
          </DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {["name", "email", "department", "bio"].map((field) => (
              <div key={field} className="space-y-2">
                <Label htmlFor={field} className="text-sm font-medium">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Label>
                {field === "bio" ? (
                  <Textarea
                    id={field}
                    name={field}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <Input
                    id={field}
                    name={field}
                    type={field === "email" ? "email" : "text"}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                )}
                {errors[field] && (
                  <p className="text-red-500 text-xs">{errors[field]![0]}</p>
                )}
              </div>
            ))}
          </div>
          {errors.form && (
            <p className="text-red-500 text-sm">{errors.form[0]}</p>
          )}
          <DialogFooter>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Add Professor"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfessorDialog;
