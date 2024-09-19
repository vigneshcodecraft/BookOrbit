"use client";
import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useToast } from "../hooks/use-toast";
import { IBook } from "@/lib/books/book.model";
import { addBook, editBook, State, uploadImage } from "@/lib/actions";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

interface BookFormProps {
  book?: IBook;
  mode: "add" | "edit";
}

export default function BookForm({ book, mode }: BookFormProps) {
  const initialState: State = { message: "", errors: {}, status: "" };
  const action = mode === "add" ? addBook : editBook;
  const [state, formAction, isPending] = useActionState(action, initialState);
  const { toast } = useToast();
  const router = useRouter();
  const [imageURL, setImageURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const result = await uploadImage(file);
      console.log("result", result);
      setIsUploading(false);
      if (result.imageURL) {
        setImageURL(result.imageURL);
      } else if (result.error) {
        console.error(result.error);
      }
    }
  };

  useEffect(() => {
    console.log("status: ", state.status);
    if (state.status) {
      toast({
        title: state.status,
        description: state.message || "message",
        variant: state.status === "Success" ? "success" : "destructive",
        duration: 2000,
      });
      router.push("/admin/books");
    }
  }, [state.status, state.message]);

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>{mode === "add" ? "Add New Book" : "Edit Book"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mode === "edit" && (
                <Input id="id" name="id" type="hidden" value={book?.id} />
              )}
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  defaultValue={book?.title}
                  required
                />
                {state?.errors?.title && (
                  <span className="text-sm text-red-500">
                    {state?.errors?.title}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  name="author"
                  type="text"
                  defaultValue={book?.author}
                  required
                />
                {state?.errors?.author && (
                  <span className="text-sm text-red-500">
                    {state?.errors?.author}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="publisher">Publisher</Label>
                <Input
                  id="publisher"
                  name="publisher"
                  type="text"
                  defaultValue={book?.publisher}
                  required
                />
                {state?.errors?.publisher && (
                  <span className="text-sm text-red-500">
                    {state?.errors?.publisher}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="pages">Pages</Label>
                <Input
                  id="pages"
                  name="pages"
                  type="number"
                  defaultValue={book?.pages}
                  required
                />
                {state?.errors?.pages && (
                  <span className="text-sm text-red-500">
                    {state?.errors?.pages}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="genre">Genre</Label>
                <Select name="genre" defaultValue={book?.genre}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fiction">Fiction</SelectItem>
                    <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Computer">Computer</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                    <SelectItem value="Biography">Biography</SelectItem>
                  </SelectContent>
                </Select>
                {state?.errors?.genre && (
                  <span className="text-sm text-red-500">
                    {state?.errors?.genre}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="isbnNo">ISBN Number</Label>
                <Input
                  id="isbnNo"
                  name="isbnNo"
                  defaultValue={book?.isbnNo}
                  type="text"
                  required
                />
                {state?.errors?.isbnNo && (
                  <span className="text-sm text-red-500">
                    {state?.errors?.isbnNo}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  defaultValue={book?.price}
                  type="number"
                  required
                />
                {state?.errors?.price && (
                  <span className="text-sm text-red-500">
                    {state?.errors?.price}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalCopies">Total Copies</Label>
                <Input
                  id="totalCopies"
                  name="totalCopies"
                  type="number"
                  min={1}
                  defaultValue={book?.totalCopies}
                  required
                />
                {state?.errors?.totalCopies && (
                  <span className="text-sm text-red-500">
                    {state?.errors?.totalCopies}
                  </span>
                )}
              </div>
              <div>
                <Label
                  htmlFor="image"
                  className="text-sm font-medium text-gray-700"
                >
                  Book Cover Image
                </Label>
                <Input
                  id="image"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {isUploading && <p>Uploading image...</p>}

                <input type="hidden" name="imageURL" value={imageURL} />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Link href="/admin/books">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isPending}>
                {isPending
                  ? mode === "add"
                    ? "Adding..."
                    : "Updating..."
                  : mode === "add"
                  ? "Add Book"
                  : "Update Book"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
