"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

type Dictionary = {
    name: string;
    email: string;
    subject: string;
    message: string;
    submitButton: string;
    placeholders: {
        name: string;
        email: string;
        subject: string;
        message: string;
    };
    validation: {
        name: string;
        email: string;
        subject: string;
        message: string;
    };
    toast: {
        title: string;
        description: string;
    };
};

const createFormSchema = (t: Dictionary['validation']) => z.object({
  name: z.string().min(2, {
    message: t.name,
  }),
  email: z.string().email({
    message: t.email,
  }),
  subject: z.string().min(5, {
    message: t.subject,
  }),
  message: z.string().min(10, {
    message: t.message,
  }),
});


export default function ContactForm({ dictionary }: { dictionary: Dictionary }) {
    const { toast } = useToast();
    const formSchema = createFormSchema(dictionary.validation);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: dictionary.toast.title,
      description: dictionary.toast.description,
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictionary.name}</FormLabel>
              <FormControl>
                <Input placeholder={dictionary.placeholders.name} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictionary.email}</FormLabel>
              <FormControl>
                <Input placeholder={dictionary.placeholders.email} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictionary.subject}</FormLabel>
              <FormControl>
                <Input placeholder={dictionary.placeholders.subject} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictionary.message}</FormLabel>
              <FormControl>
                <Textarea placeholder={dictionary.placeholders.message} {...field} className="min-h-[120px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" className="w-full">
          {dictionary.submitButton} <Send className="ml-2 h-5 w-5" />
        </Button>
      </form>
    </Form>
  );
}
