
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  domain: z.string().min(2, {
    message: "Domain must be at least 2 characters.",
  }),
  experience: z.string({
    required_error: "Please select your experience level.",
  }),
  interviewTypes: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You must select at least one interview type.",
  }),
});

type InterviewFormValues = z.infer<typeof formSchema>;

const defaultValues: Partial<InterviewFormValues> = {
  name: "",
  domain: "",
  experience: "",
  interviewTypes: [],
};

interface InterviewFormProps {
  onSubmit: (values: InterviewFormValues) => void;
}

export function InterviewForm({ onSubmit }: InterviewFormProps) {
  const { toast } = useToast();
  const form = useForm<InterviewFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const interviewTypes = [
    { id: "technical", label: "Technical Interview" },
    { id: "panel", label: "Panel Interview" },
  ];

  function handleSubmit(values: InterviewFormValues) {
    onSubmit(values);
    toast({
      title: "Interview setup complete",
      description: "Starting your interview experience...",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="domain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Domain/Role</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Frontend Developer, Data Scientist" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                  <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                  <SelectItem value="senior">Senior Level (5+ years)</SelectItem>
                  <SelectItem value="manager">Management</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="interviewTypes"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Interview Types</FormLabel>
              </div>
              <div className="space-y-2">
                {interviewTypes.map((type) => (
                  <FormField
                    key={type.id}
                    control={form.control}
                    name="interviewTypes"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={type.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(type.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, type.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== type.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {type.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Start Interview</Button>
      </form>
    </Form>
  );
}
